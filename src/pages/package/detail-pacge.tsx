import { Link, useParams } from 'react-router'
import { IoChevronForward } from 'react-icons/io5'
import Details from '../../components/packages/packeDetail'
import Container from '../../components/common/ui/layout/container'

const PackageDetailpage = () => {
  const { id } = useParams()

  return (
    <main className='flex-1'>
      <Container className='py-8 lg:py-12'>
        <nav aria-label='Breadcrumb' className='mb-6 flex items-center gap-1.5 text-sm text-slate-500'>
          <Link to='/' className='transition-colors hover:text-brand-600'>
            Home
          </Link>
          <IoChevronForward size={14} aria-hidden className='text-slate-300' />
          <Link to='/packages' className='transition-colors hover:text-brand-600'>
            Tours
          </Link>
          <IoChevronForward size={14} aria-hidden className='text-slate-300' />
          <span className='truncate font-medium text-slate-700'>Package details</span>
        </nav>

        <Details id={id || ''} />
      </Container>
    </main>
  )
}

export default PackageDetailpage
