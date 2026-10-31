import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { GiMountainRoad } from 'react-icons/gi'
import SectionHeading from '../common/section-heading'
import PackageCard from '../landing/package/card'
import PackageCardSkeleton from '../landing/package/card-skeleton'
import PackageFilters from './filters'
import Pagination from './pagination'
import EmptyState from '../common/ui/feedback/empty-state'
import ErrorState from '../common/ui/feedback/error-state'
import Container from '../common/ui/layout/container'
import { getPopularPackage } from '../../api/package.api'
import type { IPackageResponse } from '../../@types/package.types'

const PAGE_SIZE = 9

const AllPackages = () => {
  const [params] = useSearchParams()

  const filters = {
    query: params.get('query') ?? undefined,
    type: params.get('type') ?? undefined,
    min_price: params.get('min_price') ? Number(params.get('min_price')) : undefined,
    max_price: params.get('max_price') ? Number(params.get('max_price')) : undefined,
    page: Number(params.get('page') ?? 1),
    limit: PAGE_SIZE
  }

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryFn: () => getPopularPackage(filters),
    queryKey: ['get_popular_package', 'all', filters],
    // hold the previous page on screen while the next one loads, so the
    // grid does not collapse to skeletons on every filter change
    placeholderData: keepPreviousData
  })

  const packages: IPackageResponse[] = data?.data ?? []
  const pagination = data?.pagination

  return (
    <Container as='section' className='py-10 lg:py-14'>
      <SectionHeading
        title='All packages'
        subTitle='Every departure we are currently taking bookings for.'
      />

      <div className='mt-6'>
        <PackageFilters />
      </div>

      <div
        className={[
          'mt-8 grid gap-5 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3',
          isFetching && !isLoading ? 'opacity-60' : 'opacity-100'
        ].join(' ')}
      >
        {isLoading && !isError &&
          Array.from({ length: 6 }).map((_, index) => <PackageCardSkeleton key={index} />)}

        {!isLoading &&
          packages.map((tourPackage) => (
            <PackageCard key={tourPackage._id} tourPackage={tourPackage} />
          ))}
      </div>

      {!isLoading && !isError && packages.length === 0 && (
        <div className='mt-8'>
          <EmptyState
            icon={<GiMountainRoad size={36} />}
            title='No packages match those filters'
            description='Try a wider price range, or clear the filters to see everything we run.'
            action={{ label: 'Clear filters', to: '/packages' }}
          />
        </div>
      )}

      {isError && (
        <div className='mt-8'>
          <ErrorState onRetry={() => refetch()} />
        </div>
      )}

      {!isError && pagination && (
        <Pagination
          current_page={pagination.current_page}
          total_pages={pagination.total_pages}
          total_count={pagination.total_count}
        />
      )}
    </Container>
  )
}

export default AllPackages
