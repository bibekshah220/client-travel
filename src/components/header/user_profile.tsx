import React, { useEffect, useRef, useState } from 'react'
import type { IUser } from '../../@types/auth.types'
import { useMutation } from '@tanstack/react-query'
import { logout } from '../../api/auth.api'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../context/auth.context'
import { IoChevronDownOutline } from 'react-icons/io5'
import { MdOutlineSettings, MdOutlineLogout, MdOutlineListAlt } from 'react-icons/md'
import Spinner from '../common/ui/feedback/spinner'

interface IProps {
    user: IUser
}

const UserProfile: React.FC<IProps> = ({ user }) => {
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // close on an outside click or Escape, otherwise the menu survives
    // navigation and sits over the next page
    useEffect(() => {
        if (!open) return

        const onPointerDown = (event: PointerEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) setOpen(false)
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
        }

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open])

    const { mutate, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: (response) => {
            toast.success(response.message || 'Successfully loggedout')
            setUser(null)
            setOpen(false)
            navigate('/sign-in')
        },
        onError: (error) => {
            toast.error(error.message || 'Something went wrong')
        }
    })

    const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()

    const items = [
        { to: '/my-bookings', label: 'My Bookings', icon: <MdOutlineListAlt size={18} /> },
        { to: '/settings', label: 'Settings', icon: <MdOutlineSettings size={18} /> }
    ]

    return (
        <div ref={menuRef} className='relative'>
            <button
                type='button'
                onClick={() => setOpen((isOpen) => !isOpen)}
                aria-haspopup='menu'
                aria-expanded={open}
                className='flex items-center gap-2 rounded-full p-1 pr-1 transition-colors hover:bg-slate-100 sm:pr-2.5'
            >
                <span className='grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-100 text-xs font-bold text-brand-700 ring-2 ring-white'>
                    {user.profile_image?.path ? (
                        <img
                            src={user.profile_image.path}
                            alt=''
                            className='size-full object-cover'
                        />
                    ) : (
                        initials || '?'
                    )}
                </span>
                <span className='hidden max-w-[120px] truncate text-sm font-semibold text-slate-700 sm:block'>
                    {user.first_name}
                </span>
                <IoChevronDownOutline
                    size={15}
                    aria-hidden
                    className={`hidden text-slate-400 transition-transform duration-200 sm:block ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div
                    role='menu'
                    className='absolute right-0 top-full z-50 mt-2 w-60 origin-top-right animate-fade-in overflow-hidden rounded-xl border border-line bg-white py-1 shadow-pop'
                >
                    <div className='border-b border-line px-4 py-3'>
                        <p className='truncate text-sm font-semibold text-slate-800'>
                            {user.first_name} {user.last_name}
                        </p>
                        <p className='truncate text-xs text-slate-500'>{user.email}</p>
                    </div>

                    {items.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            role='menuitem'
                            onClick={() => setOpen(false)}
                            className='flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50'
                        >
                            <span className='text-brand-600'>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}

                    <button
                        type='button'
                        role='menuitem'
                        disabled={isPending}
                        onClick={() => mutate()}
                        className='flex w-full items-center gap-2.5 border-t border-line px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60'
                    >
                        {isPending ? <Spinner className='size-[18px]' /> : <MdOutlineLogout size={18} />}
                        {isPending ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserProfile
