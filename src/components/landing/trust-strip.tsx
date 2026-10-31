import React from 'react'
import { MdOutlineVerifiedUser, MdOutlineGroups, MdOutlineSupportAgent, MdOutlineInfo } from 'react-icons/md'
import { GiMountainRoad } from 'react-icons/gi'
import Container from '../common/ui/layout/container'
import Skeleton from '../common/ui/feedback/skeleton'
import { useContent } from '../../hooks/use-content'
import type { ITrustPoint } from '../../@types/content.types'

// the DB stores an icon key; the markup for it lives here
const icons: Record<string, React.ReactNode> = {
    verified: <MdOutlineVerifiedUser size={22} />,
    groups: <MdOutlineGroups size={22} />,
    route: <GiMountainRoad size={22} />,
    support: <MdOutlineSupportAgent size={22} />
}

/** Sits directly under the hero to answer "why book here" before the catalogue. */
const TrustStrip = () => {
    const { content, isLoading } = useContent()
    const points: ITrustPoint[] = content?.trust_points ?? []

    if (!isLoading && points.length === 0) return null

    return (
        <Container as='section' className='relative z-10 -mt-10 pb-2 sm:-mt-12'>
            <div className='grid gap-px overflow-hidden rounded-card border border-line bg-line shadow-raised sm:grid-cols-2 lg:grid-cols-4'>
                {isLoading &&
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className='space-y-3 bg-surface p-5'>
                            <Skeleton className='size-10 rounded-lg' />
                            <Skeleton className='h-4 w-2/3' />
                            <Skeleton className='h-3 w-full' />
                        </div>
                    ))}

                {points.map((point) => (
                    <div key={point.title} className='bg-surface p-5'>
                        <span className='grid size-10 place-items-center rounded-lg bg-brand-50 text-brand-600'>
                            {icons[point.icon] ?? <MdOutlineInfo size={22} />}
                        </span>
                        <p className='mt-3 text-sm font-bold text-slate-900'>{point.title}</p>
                        <p className='mt-1 text-[13px] leading-relaxed text-slate-500'>
                            {point.description}
                        </p>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default TrustStrip
