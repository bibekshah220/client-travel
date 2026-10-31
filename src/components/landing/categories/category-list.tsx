import { useQuery } from '@tanstack/react-query'
import SectionHeading from '../../common/section-heading'
import CategoryCard from './card'
import Container from '../../common/ui/layout/container'
import Skeleton from '../../common/ui/feedback/skeleton'
import type { ICategoryResponse } from '../../../@types/package.types'
import { getCategories } from '../../../api/category.api'
import { useContent } from '../../../hooks/use-content'

const CategoryList = () => {
  const { content } = useContent()
  const copy = content?.sections?.categories

  const { data, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ['get_package_category']
  })

  const categories: ICategoryResponse[] = data?.data ?? []

  return (
    <Container as='section' className='py-14 lg:py-20'>
      <SectionHeading
        title={copy?.title ?? ''}
        subTitle={copy?.subtitle}
        link='/packages'
      />

      <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className='h-[72px] rounded-card' />
          ))}

        {!isLoading &&
          categories.map((category) => <CategoryCard key={category._id} category={category} />)}
      </div>

      {!isLoading && categories.length === 0 && (
        <p className='mt-8 text-sm text-slate-500'>No categories have been set up yet.</p>
      )}
    </Container>
  )
}

export default CategoryList
