import { useEffect } from 'react'
import { NavLink, Link } from 'react-router'
import { LuX } from 'react-icons/lu'
import { useNavLinks } from './use-nav-links'
import { useAuth } from '../../context/auth.context'
import { useContent } from '../../hooks/use-content'
import { buttonStyles } from '../common/ui/buttons/button-styles'

type IProps = {
    open: boolean
    onClose: () => void
}

const MobileMenu: React.FC<IProps> = ({ open, onClose }) => {
    const links = useNavLinks()
    const { user } = useAuth()
    const { content } = useContent()

    // a drawer that leaves the page scrollable behind it reads as a bug
    useEffect(() => {
        if (!open) return
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.overflow = previous
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open, onClose])

    if (!open) return null

    return (
        <div className='lg:hidden'>
            <div
                className='fixed inset-0 z-40 animate-fade-in bg-slate-900/40 backdrop-blur-[2px]'
                onClick={onClose}
                aria-hidden
            />
            <div
                role='dialog'
                aria-modal='true'
                aria-label='Menu'
                className='fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-sm flex-col bg-white shadow-pop'
            >
                <div className='flex items-center justify-between border-b border-line px-5 py-4'>
                    <img
                        src={content?.logo?.path}
                        alt={content?.brand ?? ''}
                        className='h-8 w-auto'
                    />
                    <button
                        type='button'
                        onClick={onClose}
                        aria-label='Close menu'
                        className='rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100'
                    >
                        <LuX size={20} />
                    </button>
                </div>

                <nav aria-label='Mobile' className='flex flex-1 flex-col gap-1 overflow-y-auto p-4'>
                    {links.map((item) => (
                        <NavLink
                            key={item.link}
                            to={item.link}
                            end={item.link === '/'}
                            onClick={onClose}
                            className={({ isActive }) =>
                                [
                                    'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                                    isActive
                                        ? 'bg-brand-50 text-brand-700'
                                        : 'text-slate-700 hover:bg-slate-100'
                                ].join(' ')
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {!user && (
                    <div className='border-t border-line p-4'>
                        <Link to='/sign-in' onClick={onClose} className={buttonStyles('primary', 'md', true)}>
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MobileMenu
