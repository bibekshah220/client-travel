import Skeleton from '../../common/ui/feedback/skeleton'

const PackageCardSkeleton = () => (
    <div className='overflow-hidden rounded-card border border-line bg-surface'>
        <Skeleton className='aspect-[4/3] w-full rounded-none' />
        <div className='space-y-3 p-4'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-3.5 w-full' />
            <Skeleton className='h-3.5 w-5/6' />
            <div className='space-y-2 pt-2'>
                <Skeleton className='h-3 w-2/3' />
                <Skeleton className='h-3 w-1/2' />
            </div>
            <div className='flex items-center justify-between pt-3'>
                <Skeleton className='h-7 w-24' />
                <Skeleton className='h-9 w-16 rounded-lg' />
            </div>
        </div>
    </div>
)

export default PackageCardSkeleton
