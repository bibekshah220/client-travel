import React from 'react'
import { Link } from 'react-router'
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md'
import type { IPackageResponse } from '../../../@types/package.types'
import Card from '../../common/ui/card'
import { buttonStyles } from '../../common/ui/buttons/button-styles'

type IProps = { pkg: IPackageResponse }

const npr = new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
})

const BookingSummary: React.FC<IProps> = ({ pkg }) => {
    const soldOut = pkg.seats_available === 0
    const filled = pkg.total_seats - pkg.seats_available
    const filledPercent = pkg.total_seats ? Math.round((filled / pkg.total_seats) * 100) : 0

    return (
        <Card className='p-5 lg:sticky lg:top-24'>
            <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>From</p>
            <p className='mt-1 text-3xl font-extrabold tracking-tight text-slate-900'>
                {npr.format(pkg.price)}
            </p>
            <p className='text-sm text-slate-500'>
                {pkg.cost_type === 'PER_DAY' ? 'per person, per day' : 'per person'}
            </p>

            {/* seat pressure, shown rather than stated */}
            <div className='mt-5'>
                <div className='flex items-center justify-between text-xs font-medium text-slate-500'>
                    <span className='inline-flex items-center gap-1.5'>
                        <MdOutlineAirlineSeatReclineNormal size={15} />
                        {pkg.seats_available} of {pkg.total_seats} left
                    </span>
                    <span>{filledPercent}% booked</span>
                </div>
                <div
                    role='progressbar'
                    aria-valuenow={filledPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label='Seats booked'
                    className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100'
                >
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${filledPercent > 75 ? 'bg-accent-500' : 'bg-brand-600'}`}
                        style={{ width: `${filledPercent}%` }}
                    />
                </div>
            </div>

            {soldOut ? (
                <p className='mt-6 rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700'>
                    This departure is full
                </p>
            ) : (
                <Link
                    to={`/book/${pkg._id}?name=${encodeURIComponent(pkg.name)}&d=${encodeURIComponent(pkg.description)}`}
                    className={buttonStyles('primary', 'lg', true, 'mt-6')}
                >
                    Book now
                </Link>
            )}

            <p className='mt-3 text-center text-xs text-slate-400'>
                Permits, lodging and the support team included.
            </p>
        </Card>
    )
}

export default BookingSummary
