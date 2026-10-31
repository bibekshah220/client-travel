import Spinner from './spinner'

/** Shown while a lazily-loaded route chunk is in flight. */
const RouteFallback = () => (
    <div className='grid min-h-dvh place-items-center text-brand-600'>
        <Spinner className='size-7' />
    </div>
)

export default RouteFallback
