import { Link, useParams } from 'react-router'
import { IoChevronForward } from 'react-icons/io5'
import BookPkg from '../components/book'
import Container from '../components/common/ui/layout/container'

const BookPackage = () => {
  const { id } = useParams()

  return (
    <main className='flex-1'>
      <Container className='py-8 lg:py-12'>
        <nav aria-label='Breadcrumb' className='mb-6 flex items-center gap-1.5 text-sm text-slate-500'>
          <Link to='/packages' className='transition-colors hover:text-brand-600'>
            Tours
          </Link>
          <IoChevronForward size={14} aria-hidden className='text-slate-300' />
          <Link to={`/packages/${id}`} className='transition-colors hover:text-brand-600'>
            Package
          </Link>
          <IoChevronForward size={14} aria-hidden className='text-slate-300' />
          <span className='font-medium text-slate-700'>Book</span>
        </nav>

        <BookPkg id={id || ''} />
      </Container>
    </main>
  )
}

export default BookPackage
