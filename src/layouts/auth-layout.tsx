import React from 'react'
import { Link } from 'react-router'
import { IoArrowBack } from 'react-icons/io5'
import { useContent } from '../hooks/use-content'

type IProps = {
    title: string
    subtitle: string
    children: React.ReactNode
    wide?: boolean
}

/**
 * Split screen: the brand panel is decorative and drops out below lg, so a
 * phone gets the form at full width instead of a squeezed two-column layout.
 */
const AuthLayout: React.FC<IProps> = ({ title, subtitle, children, wide = false }) => {
    const { content } = useContent()
    const auth = content?.auth

    return (
        <div className='grid min-h-dvh lg:grid-cols-2'>
            {/* brand panel */}
            <aside className='relative hidden lg:block'>
                <img
                    src={content?.hero?.cover_image?.path || '/cover.jpg'}
                    alt=''
                    aria-hidden
                    className='absolute inset-0 size-full object-cover'
                />
                <div
                    aria-hidden
                    className='absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/75 to-slate-900/70'
                />
                <div className='relative flex h-full flex-col justify-between p-12'>
                    <Link to='/' aria-label={content?.brand ?? 'Home'}>
                        <img
                            src={content?.logo?.light_path ?? '/logo-light.png'}
                            alt={content?.brand ?? ''}
                            className='h-12 w-auto'
                        />
                    </Link>

                    <div className='max-w-md'>
                        <p className='text-3xl font-bold leading-tight text-white'>{auth?.heading}</p>
                        <p className='mt-4 text-[15px] leading-relaxed text-brand-100'>{auth?.body}</p>
                    </div>

                    <p className='text-sm text-brand-200'>{auth?.footnote}</p>
                </div>
            </aside>

            {/* form panel */}
            <main className='flex items-center justify-center bg-canvas px-4 py-10 sm:px-6 lg:py-16'>
                <div className={`w-full ${wide ? 'max-w-xl' : 'max-w-md'}`}>
                    <Link
                        to='/'
                        className='mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600'
                    >
                        <IoArrowBack size={16} />
                        Back to site
                    </Link>

                    <div className='rounded-card border border-line bg-surface p-6 shadow-card sm:p-8'>
                        <h1 className='text-2xl'>{title}</h1>
                        <p className='mt-1.5 text-sm text-slate-500'>{subtitle}</p>

                        <div className='mt-7'>{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AuthLayout
