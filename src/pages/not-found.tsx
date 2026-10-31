import { Link } from 'react-router'
import Container from '../components/common/ui/layout/container'
import { buttonStyles } from '../components/common/ui/buttons/button-styles'

const NotFound = () => (
  <main className='flex flex-1 items-center'>
    <Container className='py-20 text-center'>
      <p className='text-sm font-bold uppercase tracking-widest text-brand-600'>404</p>
      <h1 className='mt-3 text-3xl sm:text-4xl'>This page went off-route</h1>
      <p className='mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-500'>
        The link may be out of date, or the trip it pointed to has finished.
      </p>
      <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
        <Link to='/packages' className={buttonStyles('primary', 'lg')}>
          Browse packages
        </Link>
        <Link to='/' className={buttonStyles('secondary', 'lg')}>
          Back home
        </Link>
      </div>
    </Container>
  </main>
)

export default NotFound
