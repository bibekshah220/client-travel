import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdOutlineListAlt } from 'react-icons/md'
import SectionHeading from '../components/common/section-heading'
import BookingCard from '../components/bookings/booking-card'
import EmptyState from '../components/common/ui/feedback/empty-state'
import Skeleton from '../components/common/ui/feedback/skeleton'
import Container from '../components/common/ui/layout/container'
import { cancelBooking, getMyBookings } from '../api/book.api'
import { useAuth } from '../context/auth.context'
import type { IBookingResponse } from '../@types/booking.types'

const MyBookings = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Login required')
      navigate('/sign-in')
    }
  }, [user, authLoading, navigate])

  const { data, isLoading } = useQuery({
    queryFn: getMyBookings,
    queryKey: ['get_my_bookings'],
    enabled: !!user
  })

  const { mutate, isPending, variables } = useMutation({
    mutationFn: cancelBooking,
    onSuccess: (response) => {
      toast.success(response?.message || 'Booking cancelled')
      queryClient.invalidateQueries({ queryKey: ['get_my_bookings'] })
      queryClient.invalidateQueries({ queryKey: ['get_popular_package'] })
      queryClient.invalidateQueries({ queryKey: ['get_pkg_by_id'] })
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong')
    }
  })

  const bookings: IBookingResponse[] = data?.data ?? []

  return (
    <main className='flex-1'>
      <Container className='py-10 lg:py-14'>
        <SectionHeading
          title='My bookings'
          subTitle='Every seat you have reserved, newest first.'
          link='/packages'
          linkLabel='Book another trip'
        />

        <div className='mt-8 flex flex-col gap-4'>
          {(isLoading || authLoading) &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className='h-44 w-full rounded-card' />
            ))}

          {!isLoading &&
            bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={mutate}
                isCancelling={isPending && variables === booking._id}
              />
            ))}
        </div>

        {!isLoading && !authLoading && bookings.length === 0 && (
          <EmptyState
            icon={<MdOutlineListAlt size={36} />}
            title='You have not booked a trip yet'
            description='Browse the packages and reserve a seat to see it here.'
            action={{ label: 'Browse packages', to: '/packages' }}
          />
        )}
      </Container>
    </main>
  )
}

export default MyBookings
