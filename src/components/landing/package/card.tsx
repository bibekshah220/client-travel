import React from 'react'
import type { IPackageResponse } from '../../../@types/package.types'
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoBed } from 'react-icons/io5'
import { Link } from 'react-router'
import moment from 'moment'
import Badge from '../../common/ui/badge'

type IProps = {
    tourPackage: IPackageResponse
}

const npr = new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
})

const PackageCard: React.FC<IProps> = ({ tourPackage }) => {
    const startDate = moment(tourPackage.start_date)
    const endDate = moment(tourPackage.end_date)
    const daysToGo = startDate.diff(moment(), 'days')
    const totalDays = endDate.diff(startDate, 'days')

    const seatsLeft = tourPackage.seats_available
    const soldOut = seatsLeft === 0
    const almostGone = !soldOut && seatsLeft <= Math.max(2, Math.round(tourPackage.total_seats * 0.25))

    const detailHref = `/packages/${tourPackage._id}?name=${encodeURIComponent(
        tourPackage.name
    )}&d=${encodeURIComponent(tourPackage.description)}`

    return (
        <article className='card-hover group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card'>
            {/* media */}
            <Link to={detailHref} className='relative block aspect-[4/3] overflow-hidden bg-slate-100'>
                <img
                    src={tourPackage?.cover_image?.path}
                    alt={tourPackage.name}
                    loading='lazy'
                    className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute left-3 top-3 flex flex-wrap gap-1.5'>
                    <Badge tone='brand' className='bg-white/95 text-brand-700 ring-white/60 backdrop-blur-sm'>
                        {tourPackage.category?.name}
                    </Badge>
                    {soldOut && <Badge tone='danger'>Sold out</Badge>}
                    {almostGone && <Badge tone='warning'>{seatsLeft} seats left</Badge>}
                </div>
            </Link>

            {/* body */}
            <div className='flex flex-1 flex-col p-4'>
                <h3 className='text-base font-bold leading-snug text-slate-900'>
                    <Link to={detailHref} className='transition-colors hover:text-brand-700'>
                        {tourPackage.name}
                    </Link>
                </h3>

                <p className='mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500'>
                    {tourPackage.description}
                </p>

                {/* facts */}
                <dl className='mt-4 grid grid-cols-1 gap-2 text-[13px] text-slate-600'>
                    <div className='flex items-center gap-2'>
                        <FaRegCalendarAlt size={14} className='shrink-0 text-slate-400' />
                        <dt className='sr-only'>Departs</dt>
                        <dd>
                            {startDate.format('D MMM YYYY')}
                            <span className='text-slate-400'>
                                {' '}
                                · {daysToGo > 0 ? `in ${daysToGo} days` : 'departed'}
                            </span>
                        </dd>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IoBed size={15} className='shrink-0 text-slate-400' />
                        <dt className='sr-only'>Duration</dt>
                        <dd>{totalDays} days</dd>
                    </div>
                    <div className='flex items-center gap-2'>
                        <MdOutlineAirlineSeatReclineNormal size={15} className='shrink-0 text-slate-400' />
                        <dt className='sr-only'>Seats</dt>
                        <dd>
                            {seatsLeft} of {tourPackage.total_seats} seats available
                        </dd>
                    </div>
                </dl>

                {/* price sits on the baseline so cards in a row align */}
                <div className='mt-auto flex items-end justify-between gap-3 pt-5'>
                    <div>
                        <p className='text-lg font-extrabold tracking-tight text-slate-900'>
                            {npr.format(tourPackage.price)}
                        </p>
                        <p className='text-xs text-slate-400'>
                            {tourPackage.cost_type === 'PER_DAY' ? 'per day' : 'per person'}
                        </p>
                    </div>
                    <Link
                        to={detailHref}
                        className='rounded-lg bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100'
                    >
                        View
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default PackageCard
