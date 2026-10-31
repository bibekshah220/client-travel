import React from 'react'
import type { IPackageResponse } from '../../../@types/package.types'
import { TiStarFullOutline } from 'react-icons/ti'
import { MdOutlineAirlineSeatReclineNormal, MdOutlinePlace } from 'react-icons/md'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoBed } from 'react-icons/io5'
import { CiShoppingTag } from 'react-icons/ci'
import moment from 'moment'
import Badge from '../../common/ui/badge'

type IProps = {
  pkg: IPackageResponse
}

const DetailSection: React.FC<IProps> = ({ pkg }) => {
  const startDate = moment(pkg.start_date)
  const endDate = moment(pkg.end_date)
  const totalDays = endDate.diff(startDate, 'days')
  const daysToGo = startDate.diff(moment(), 'days')

  const facts = [
    {
      icon: <FaRegCalendarAlt size={16} />,
      label: 'Departs',
      value: `${startDate.format('D MMM YYYY')}${daysToGo > 0 ? ` · in ${daysToGo} days` : ''}`
    },
    { icon: <IoBed size={17} />, label: 'Duration', value: `${totalDays} days` },
    {
      icon: <MdOutlineAirlineSeatReclineNormal size={17} />,
      label: 'Seats',
      value: `${pkg.seats_available} of ${pkg.total_seats} available`
    },
    { icon: <CiShoppingTag size={18} />, label: 'Category', value: pkg.category?.name }
  ]

  return (
    <div className='w-full'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <h1 className='text-2xl leading-tight sm:text-3xl'>{pkg.name}</h1>
        <Badge tone='warning' icon={<TiStarFullOutline size={14} />}>
          4.5
        </Badge>
      </div>

      {/* facts table — a definition list, not a row of pills */}
      <dl className='mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2'>
        {facts.map((fact) => (
          <div key={fact.label} className='flex items-start gap-3 bg-surface p-4'>
            <span className='mt-0.5 text-brand-600'>{fact.icon}</span>
            <div>
              <dt className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                {fact.label}
              </dt>
              <dd className='mt-0.5 text-sm font-semibold text-slate-800'>{fact.value}</dd>
            </div>
          </div>
        ))}
      </dl>

      {/* description */}
      <div className='mt-8'>
        <h2 className='text-lg'>About this trip</h2>
        <p className='mt-2 text-[15px] leading-relaxed text-slate-600'>{pkg.description}</p>
      </div>

      {/* itinerary */}
      {!!pkg.destinations?.length && (
        <div className='mt-8'>
          <h2 className='text-lg'>Itinerary</h2>
          <ol className='mt-4 space-y-0'>
            {pkg.destinations.map((stop, index) => (
              <li key={`${stop.location}-${index}`} className='flex gap-4'>
                {/* timeline rail */}
                <div className='flex flex-col items-center'>
                  <span className='grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600'>
                    <MdOutlinePlace size={16} />
                  </span>
                  {index < pkg.destinations!.length - 1 && (
                    <span aria-hidden className='w-px flex-1 bg-line' />
                  )}
                </div>
                <div className='pb-6'>
                  <p className='text-sm font-semibold text-slate-800'>{stop.location}</p>
                  <p className='text-xs text-slate-500'>{stop.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default DetailSection
