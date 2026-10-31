import type React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPackageById } from '../../api/package.api'
import DetailSection from '../packages/packeDetail/detail-section'
import BookForm from './book-form'
import Skeleton from '../common/ui/feedback/skeleton'
import EmptyState from '../common/ui/feedback/empty-state'
import Card from '../common/ui/card'
import type { IPackageResponse } from '../../@types/package.types'

type IProps = {
    id: string
}

const BookPkg: React.FC<IProps> = ({ id }) => {
    const { isLoading, data, isError } = useQuery({
        queryFn: () => getPackageById(id),
        queryKey: ['get_pkg_by_id', id]
    })

    if (isLoading) {
        return (
            <div className='grid gap-8 lg:grid-cols-2'>
                <Skeleton className='h-96 w-full rounded-card' />
                <Skeleton className='h-96 w-full rounded-card' />
            </div>
        )
    }

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

    return (
        <div className='grid items-start gap-8 lg:grid-cols-2 lg:gap-10'>
            {/* form first on mobile — it is what the page is for */}
            <div className='order-1 lg:order-2'>
                <BookForm pkg={pkg} />
            </div>

            <Card className='order-2 p-6 lg:order-1'>
                <DetailSection pkg={pkg} />
            </Card>
        </div>
    )
}

export default BookPkg
