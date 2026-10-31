import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { MdOutlineAirlineSeatReclineNormal, MdOutlinePhone } from 'react-icons/md'
import { FaRegCalendarAlt } from 'react-icons/fa'
import type { IBookingResponse } from '../../@types/booking.types'
import Card from '../common/ui/card'
import Badge from '../common/ui/badge'
import Button from '../common/ui/buttons/button'
import { buttonStyles } from '../common/ui/buttons/button-styles'

type IProps = {
    booking: IBookingResponse
    onCancel: (id: string) => void
    isCancelling: boolean
}

const npr = new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
})

const BookingCard: React.FC<IProps> = ({ booking, onCancel, isCancelling }) => {
    const pkg = booking.tour_package
    const startDate = moment(pkg?.start_date)
    const hasDeparted = pkg ? startDate.isBefore(moment()) : false

    return (
        <Card as='article' className='overflow-hidden'>
            <div className='flex flex-col sm:flex-row'>
                {/* media */}
                <div className='aspect-[16/9] w-full shrink-0 bg-slate-100 sm:aspect-auto sm:w-52'>
                    <img
                        src={pkg?.cover_image?.path ?? '/cover.jpg'}
                        alt=''
                        loading='lazy'
                        className='size-full object-cover'
                    />
                </div>

                {/* body */}
                <div className='flex min-w-0 flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between'>
                    <div className='min-w-0'>
                        <div className='flex flex-wrap items-center gap-2'>
                            <h3 className='text-base font-bold text-slate-900'>
                                {pkg?.name ?? 'Package no longer available'}
                            </h3>
                            <Badge tone={hasDeparted ? 'neutral' : 'success'}>
                                {hasDeparted ? 'Departed' : 'Confirmed'}
                            </Badge>
                        </div>

                        <p className='mt-0.5 text-xs text-slate-400'>
                            Booked {moment(booking.createdAt).fromNow()}
                        </p>

                        <dl className='mt-4 grid gap-2 text-[13px] text-slate-600 sm:grid-cols-2'>
                            <div className='flex items-center gap-2'>
                                <MdOutlineAirlineSeatReclineNormal size={15} className='shrink-0 text-slate-400' />
                                <dt className='sr-only'>Seats</dt>
                                <dd>
                                    {booking.total_person} seat(s) · {booking.full_name}
                                </dd>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MdOutlinePhone size={15} className='shrink-0 text-slate-400' />
                                <dt className='sr-only'>Phone</dt>
                                <dd>{booking.phone}</dd>
                            </div>
                            {pkg && (
                                <div className='flex items-center gap-2'>
                                    <FaRegCalendarAlt size={14} className='shrink-0 text-slate-400' />
                                    <dt className='sr-only'>Departs</dt>
                                    <dd>Departs {startDate.format('D MMM YYYY')}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* price and actions */}
                    <div className='flex shrink-0 flex-col gap-3 sm:w-44 sm:items-end'>
                        <p className='text-xl font-extrabold tracking-tight text-slate-900'>
                            {npr.format(booking.total_price)}
                        </p>

                        <div className='flex w-full gap-2 sm:flex-col'>
                            {pkg && (
                                <Link
                                    to={`/packages/${pkg._id}?name=${encodeURIComponent(pkg.name)}&d=${encodeURIComponent(pkg.description)}`}
                                    className={buttonStyles('secondary', 'sm', true)}
                                >
                                    View package
                                </Link>
                            )}
                            {!hasDeparted && (
                                <Button
                                    variant='danger'
                                    size='sm'
                                    loading={isCancelling}
                                    onClick={() => onCancel(booking._id)}
                                    label={isCancelling ? 'Cancelling...' : 'Cancel'}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default BookingCard
