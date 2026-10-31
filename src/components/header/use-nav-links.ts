import { useAuth } from '../../context/auth.context'

export const navlinks: { label: string; link: string }[] = [
    { label: 'Home', link: '/' },
    { label: 'Tours', link: '/packages' },
    { label: 'About Us', link: '/about-us' },
    { label: 'Contact Us', link: '/contact-us' }
]

/** Signed-in users get one extra entry; everyone sees the same base set. */
export const useNavLinks = () => {
    const { user } = useAuth()
    return user ? [...navlinks, { label: 'My Bookings', link: '/my-bookings' }] : navlinks
}
