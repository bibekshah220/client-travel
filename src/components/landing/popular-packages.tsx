import { useQuery } from '@tanstack/react-query'
import SectionHeading from '../common/section-heading'
import PackageCard from './package/card'
import PackageCardSkeleton from './package/card-skeleton'
import EmptyState from '../common/ui/feedback/empty-state'
import ErrorState from '../common/ui/feedback/error-state'
import Container from '../common/ui/layout/container'
import { getPopularPackage } from '../../api/package.api'
import type { IPackageResponse } from '../../@types/package.types'
import { GiMountainRoad } from 'react-icons/gi'
import { useContent } from '../../hooks/use-content'

const PopularPackages = () => {
  const { content } = useContent()
  const copy = content?.sections?.popular_packages

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getPopularPackage({ limit: 4 }),
    queryKey: ['get_popular_package', 'landing']
  })

  const packages: IPackageResponse[] = data?.data ?? []

  return (
    <Container as='section' className='py-14 lg:py-20'>
      <SectionHeading
        title={copy?.title ?? ''}
        subTitle={copy?.subtitle}
        link='/packages'
      />

      {isError && (
        <div className='mt-8'>
          <ErrorState onRetry={() => refetch()} />
        </div>
      )}

      <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {isLoading && !isError &&
          Array.from({ length: 4 }).map((_, index) => <PackageCardSkeleton key={index} />)}

        {!isLoading &&
          packages.map((tourPackage) => (
            <PackageCard key={tourPackage._id} tourPackage={tourPackage} />
          ))}
      </div>

      {!isLoading && !isError && packages.length === 0 && (
        <div className='mt-8'>
          <EmptyState
            icon={<GiMountainRoad size={36} />}
            title='No packages available right now'
            description='New departures are added every season. Check back shortly.'
          />
        </div>
      )}
    </Container>
  )
}

export default PopularPackages
