import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import ClientLayout from './layouts/layout'
import LandingPage from './pages/landing'
import RouteFallback from './components/common/ui/feedback/route-fallback'

// the landing page ships in the entry chunk; everything else is fetched on
// first visit, which keeps the initial download to what the first screen needs
const LoginPage = lazy(() => import('./pages/auth/login'))
const RegisterPage = lazy(() => import('./pages/auth/register'))
const Packages = lazy(() => import('./pages/package/packages'))
const PackageDetailpage = lazy(() => import('./pages/package/detail-pacge'))
const BookPackage = lazy(() => import('./pages/book'))
const MyBookings = lazy(() => import('./pages/my_bookings'))
const Settings = lazy(() => import('./pages/settings'))
const AboutUs = lazy(() => import('./pages/about_us'))
const ContactUs = lazy(() => import('./pages/contact_us'))
const NotFound = lazy(() => import('./pages/not-found'))

function App() {
  return (
    <div className='flex min-h-dvh flex-1 flex-col'>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path='/sign-in' element={<LoginPage />} />
            <Route path='/sign-up' element={<RegisterPage />} />

            <Route path='/' element={<ClientLayout />}>
              <Route index element={<LandingPage />} />
              <Route path='packages' element={<Packages />} />
              <Route path='packages/:id' element={<PackageDetailpage />} />
              <Route path='book/:id' element={<BookPackage />} />
              <Route path='about-us' element={<AboutUs />} />
              <Route path='contact-us' element={<ContactUs />} />
              <Route path='my-bookings' element={<MyBookings />} />
              <Route path='settings' element={<Settings />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>

        <Toaster
          position='top-right'
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: '12px',
              background: '#0f172a',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500
            }
          }}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
