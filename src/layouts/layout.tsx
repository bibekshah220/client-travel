import { Outlet } from 'react-router'
import NavBar from '../components/header'
import Footer from '../components/footer/footer'

const ClientLayout = () => {
    return (
        <>
            {/* first stop for a keyboard user, hidden until focused */}
            <a
                href='#main'
                className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white'
            >
                Skip to content
            </a>

            <NavBar />

            <div id='main' className='flex flex-1 flex-col'>
                <Outlet />
            </div>

            <Footer />
        </>
    )
}

export default ClientLayout
