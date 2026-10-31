import { useState } from 'react'
import { Link } from 'react-router'
import { LuMenu } from 'react-icons/lu'
import { useAuth } from '../../context/auth.context'
import NavLinks from './nav_links'
import MobileMenu from './mobile_menu'
import UserProfile from './user_profile'
import Container from '../common/ui/layout/container'
import Skeleton from '../common/ui/feedback/skeleton'
import { useContent } from '../../hooks/use-content'
import { buttonStyles } from '../common/ui/buttons/button-styles'

const NavBar = () => {
    const { isLoading, user } = useAuth()
    const { content, isLoading: contentLoading, isError: contentError } = useContent()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className='sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-md'>
            <Container fluid className='flex h-16 items-center justify-between gap-4 lg:h-[72px]'>
                <Link to='/' className='shrink-0' aria-label={content?.brand ?? 'Home'}>
                    {contentLoading && !contentError ? (
                        <Skeleton className='h-9 w-36' />
                    ) : (
                        <img
                            src={content?.logo?.path ?? '/logo-full.png'}
                            alt={content?.brand ?? ''}
                            className='h-9 w-auto lg:h-10'
                        />
                    )}
                </Link>

                <NavLinks />

                <div className='flex items-center gap-2'>
                    {isLoading && <Skeleton className='h-10 w-28 rounded-lg' />}

                    {!isLoading && !user && (
                        <Link to='/sign-in' className={buttonStyles('primary', 'md', false, 'hidden sm:inline-flex')}>
                            Login
                        </Link>
                    )}

                    {!isLoading && user && <UserProfile user={user} />}

                    <button
                        type='button'
                        onClick={() => setMenuOpen(true)}
                        aria-label='Open menu'
                        aria-expanded={menuOpen}
                        className='rounded-lg p-2.5 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden'
                    >
                        <LuMenu size={22} />
                    </button>
                </div>
            </Container>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    )
}

export default NavBar
