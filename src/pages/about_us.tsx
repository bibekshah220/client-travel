import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GiMountainRoad } from 'react-icons/gi'
import { MdOutlineGroups, MdOutlineVerifiedUser, MdOutlineInfo } from 'react-icons/md'
import SectionHeading from '../components/common/section-heading'
import Container from '../components/common/ui/layout/container'
import Card from '../components/common/ui/card'
import Skeleton from '../components/common/ui/feedback/skeleton'
import { getCategories } from '../api/category.api'
import { getPopularPackage } from '../api/package.api'
import { useContent } from '../hooks/use-content'
import type { ICategoryResponse } from '../@types/package.types'
import type { IHighlight } from '../@types/content.types'

// the icon key stored on the highlight maps to a component here; the DB
// keeps the key, not the markup
const icons: Record<string, React.ReactNode> = {
  packages: <GiMountainRoad size={24} />,
  categories: <MdOutlineGroups size={24} />,
  verified: <MdOutlineVerifiedUser size={24} />
}

const AboutUs = () => {
  const { content, isLoading } = useContent()

  const { data: categories } = useQuery({
    queryFn: getCategories,
    queryKey: ['get_package_category']
  })

  const { data: packages } = useQuery({
    queryFn: () => getPopularPackage({ limit: 1 }),
    queryKey: ['get_package_count']
  })

  // a highlight with no stored value is a live counter; the icon key says
  // which collection it counts
  const liveValues: Record<string, string | number> = {
    packages: packages?.pagination?.total_count ?? '-',
    categories: categories?.data?.length ?? '-'
  }

  const about = content?.about

  return (
    <main className='flex-1'>
      <Container className='py-10 lg:py-16'>
        <SectionHeading title={about?.title ?? 'About Us'} subTitle={about?.subtitle} />

        <div className='mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]'>
          <div className='flex flex-col gap-5 text-[16px] leading-7 text-slate-600'>
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-11/12' />
                  <Skeleton className='h-4 w-4/5' />
                </div>
              ))}

            {about?.paragraphs?.map((paragraph: string) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className='flex flex-col gap-4'>
            {about?.highlights?.map((highlight: IHighlight) => (
              <Card key={highlight.label} className='flex items-center gap-4 p-5'>
                <span className='grid size-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600'>
                  {icons[highlight.icon] ?? <MdOutlineInfo size={24} />}
                </span>
                <div>
                  <p className='text-xl font-extrabold tracking-tight text-slate-900'>
                    {highlight.value || liveValues[highlight.icon] || '-'}
                  </p>
                  <p className='text-sm text-slate-500'>{highlight.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* what we run — straight off the live category list */}
      <section className='border-t border-line bg-white'>
        <Container className='py-14 lg:py-20'>
          <SectionHeading
            title={content?.sections?.about_categories?.title ?? ''}
            subTitle={content?.sections?.about_categories?.subtitle}
            link='/packages'
          />

          <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {categories?.data?.map((category: ICategoryResponse) => (
              <Card key={category._id} className='p-5'>
                <div className='flex items-center gap-3'>
                  <div className='size-12 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
                    <img
                      src={category.logo?.path}
                      alt=''
                      loading='lazy'
                      className='size-full object-cover'
                    />
                  </div>
                  <p className='text-base font-bold text-slate-900'>{category.name}</p>
                </div>
                <p className='mt-3 text-sm leading-relaxed text-slate-500'>{category.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}

export default AboutUs
