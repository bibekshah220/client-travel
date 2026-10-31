/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'
import moment from 'moment'
import { MdCheckCircle } from 'react-icons/md'
import type { IPackageResponse } from '../../@types/package.types'
import { PACKAGE_COST_TYPE } from '../../@types/global.types'
import Button from '../common/ui/buttons/button'
import { buttonStyles } from '../common/ui/buttons/button-styles'
import Input from '../common/ui/inputs/input'
import Card from '../common/ui/card'
import { bookSchema } from '../../schemas/booking.schema'
import { useAuth } from '../../context/auth.context'
import { bookPackage } from '../../api/book.api'

type IProps = {
    pkg: IPackageResponse
}

const npr = new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
})

const BookForm: React.FC<IProps> = ({ pkg }) => {
    const navigate = useNavigate()
    const [total_price, setTotalPrice] = useState(0)
    const { user, isLoading } = useAuth()
    const queryClient = useQueryClient()

    const { reset, register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            full_name: '',
            phone: '',
            total_person: 1,
            tour_package: pkg?._id || ''
        },
        resolver: yupResolver(bookSchema),
        mode: 'all'
    })

    const total_person = watch('total_person')
    const totalDays = moment(pkg.end_date).diff(moment(pkg.start_date), 'days')

    const calcuateAmount = useCallback(() => {
        const people = Number(total_person)

        if (!people || people < 0) {
            setTotalPrice(0)
            return
        }

        setTotalPrice(
            pkg.cost_type === PACKAGE_COST_TYPE.PER_PERSON
                ? people * pkg.price
                : totalDays * pkg.price * people
        )
    }, [pkg.cost_type, pkg.price, total_person, totalDays])

    useEffect(() => {
        calcuateAmount()
    }, [calcuateAmount])

    useEffect(() => {
        if (!isLoading && !user) {
            toast.error('Login required')
            navigate('/sign-in')
        }
    }, [user, isLoading, navigate])

    useEffect(() => {
        reset({
            full_name: user ? `${user.first_name} ${user.last_name}` : '',
            phone: user?.phone ?? '',
            total_person: 1,
            tour_package: pkg?._id
        })
    }, [isLoading, pkg?._id, reset, user])

    const { mutate, isPending, data, isSuccess } = useMutation({
        mutationFn: bookPackage,
        onSuccess: (response) => {
            toast.success(response.message || 'Package booked.')
            queryClient.invalidateQueries({ queryKey: ['get_pkg_by_id'] })
            queryClient.invalidateQueries({ queryKey: ['get_my_bookings'] })
        },
        onError: (error) => {
            toast.error(error.message || 'Something went wrong')
        }
    })

    const onSubmit = (values: any) => mutate(values)

    if (isLoading) {
        return (
            <Card className='p-6'>
                <p className='text-sm text-slate-500'>Loading....</p>
            </Card>
        )
    }

    // confirmation replaces the form; leaving a submitted form on screen
    // invites a second booking of the same seats
    if (isSuccess) {
        return (
            <Card className='p-8 text-center'>
                <span className='mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600'>
                    <MdCheckCircle size={30} />
                </span>
                <h2 className='mt-4 text-xl'>Booking confirmed</h2>
                <p className='mt-2 text-sm text-slate-500'>
                    {data?.data?.total_person} seat(s) on {pkg.name} reserved for{' '}
                    {data?.data?.full_name}.
                </p>
                <p className='mt-4 text-2xl font-extrabold text-slate-900'>
                    {npr.format(Number(data?.data?.total_price ?? 0))}
                </p>

                <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
                    <Link to='/my-bookings' className={buttonStyles('primary', 'md', true)}>
                        View my bookings
                    </Link>
                    <Link to='/packages' className={buttonStyles('secondary', 'md', true)}>
                        Browse more trips
                    </Link>
                </div>
            </Card>
        )
    }

    return (
        <Card className='p-6 sm:p-7'>
            <h2 className='text-xl'>Reserve your seat</h2>
            <p className='mt-1 text-sm text-slate-500'>
                Booking <span className='font-semibold text-brand-700'>{pkg.name}</span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col gap-1'>
                <Input
                    label='Full Name'
                    name='full_name'
                    id='full_name'
                    placeholder='John Doe'
                    error={errors.full_name?.message}
                    register={register}
                    required
                />
                <Input
                    label='Phone Number'
                    name='phone'
                    id='phone'
                    type='tel'
                    placeholder='9865374070'
                    register={register}
                    error={errors.phone?.message}
                    required
                />
                <Input
                    label='Number of Seats'
                    name='total_person'
                    id='total_person'
                    type='number'
                    register={register}
                    error={errors.total_person?.message}
                    hint={`${pkg.seats_available} seats available`}
                    placeholder='2'
                    required
                />

                {/* price breakdown — shows the arithmetic rather than a bare total */}
                <div className='mt-3 rounded-card bg-slate-50 p-4'>
                    <dl className='space-y-2 text-sm'>
                        <div className='flex justify-between text-slate-600'>
                            <dt>
                                {npr.format(pkg.price)} ×{' '}
                                {Number(total_person) || 0} {Number(total_person) === 1 ? 'person' : 'people'}
                                {pkg.cost_type === PACKAGE_COST_TYPE.PER_DAY && ` × ${totalDays} days`}
                            </dt>
                            <dd>{npr.format(total_price)}</dd>
                        </div>
                        <div className='flex justify-between border-t border-line pt-2 text-base font-bold text-slate-900'>
                            <dt>Total</dt>
                            <dd>{npr.format(total_price)}</dd>
                        </div>
                    </dl>
                </div>

                <div className='mt-5 flex flex-col gap-3 sm:flex-row-reverse'>
                    <Button
                        type='submit'
                        loading={isPending}
                        label={isPending ? 'Submitting...' : 'Confirm booking'}
                    />
                    <Button
                        type='button'
                        variant='ghost'
                        onClick={() => navigate(-1)}
                        label='Cancel'
                    />
                </div>
            </form>
        </Card>
    )
}

export default BookForm
