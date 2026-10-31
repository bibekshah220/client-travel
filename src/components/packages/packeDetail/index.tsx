import type React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPackageById } from '../../../api/package.api'
import ImageCarousel from '../details/image-carousel'
import DetailSection from './detail-section'
import BookingSummary from './booking-summary'
import Skeleton from '../../common/ui/feedback/skeleton'
import EmptyState from '../../common/ui/feedback/empty-state'
import type { IPackageResponse } from '../../../@types/package.types'

type IProps = {
    id: string
}

const DetailSkeleton = () => (
    <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]'>
        <div className='space-y-6'>
            <Skeleton className='aspect-[4/3] w-full rounded-card' />
            <Skeleton className='h-9 w-2/3' />
            <Skeleton className='h-32 w-full rounded-card' />
            <Skeleton className='h-24 w-full' />
        </div>
        <Skeleton className='h-80 w-full rounded-card' />
    </div>
)

const Details: React.FC<IProps> = ({ id }) => {
    const { isLoading, data, isError } = useQuery({
        queryFn: () => getPackageById(id),
        queryKey: ['get_pkg_by_id', id]
    })

    if (isLoading) return <DetailSkeleton />

    const pkg: IPackageResponse | undefined = data?.data

    if (isError || !pkg) {
        return (
            <EmptyState
                title='We could not load this package'
                description='It may have been removed, or the link is out of date.'
                action={{ label: 'Browse all packages', to: '/packages' }}
            />
        )
    }

    const gallery = pkg.images?.length ? pkg.images : pkg.cover_image ? [pkg.cover_image] : []

    return (
        <div className='grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10'>
            <div className='min-w-0 space-y-8'>
                <ImageCarousel pkgImages={gallery} alt={pkg.name} />
                <DetailSection pkg={pkg} />
            </div>

            <BookingSummary pkg={pkg} />
        </div>
    )
}

export default Details
