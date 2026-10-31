import { NavLink } from 'react-router'
import { useNavLinks } from './use-nav-links'

const NavLinks = () => {
    const links = useNavLinks()

    return (
        <nav aria-label='Main' className='hidden items-center gap-1 lg:flex'>
            {links.map((item) => (
                <NavLink
                    key={item.link}
                    to={item.link}
                    end={item.link === '/'}
                    className={({ isActive }) =>
                        [
                            'relative rounded-lg px-3 py-2 text-[15px] font-medium transition-colors',
                            isActive
                                ? 'text-brand-700'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        ].join(' ')
                    }
                >
                    {({ isActive }) => (
                        <>
                            <span>{item.label}</span>
                            {/* the active marker is drawn, not a colour change alone */}
                            <span
                                aria-hidden
                                className={[
                                    'absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-600 transition-transform duration-200',
                                    isActive ? 'scale-x-100' : 'scale-x-0'
                                ].join(' ')}
                            />
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}

export default NavLinks
