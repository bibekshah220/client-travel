import React from 'react'
import { MdOutlineCloudOff } from 'react-icons/md'
import Button from '../buttons/button'

type IProps = {
    title?: string
    description?: string
    onRetry?: () => void
    compact?: boolean
}

/** Shown when a request fails, so a dead API degrades to something readable. */
const ErrorState: React.FC<IProps> = ({
    title = 'We could not load this',
    description = 'The server did not respond. It may be a connection problem on your side, or the service may be briefly unavailable.',
    onRetry,
    compact = false
}) => (
    <div
        role='alert'
        className={`flex flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-white/60 text-center ${compact ? 'px-5 py-8' : 'px-6 py-14'}`}
    >
        <MdOutlineCloudOff size={compact ? 26 : 34} className='text-slate-400' />
        <p className='mt-3 text-base font-semibold text-slate-800'>{title}</p>
        <p className='mt-1 max-w-sm text-sm text-slate-500'>{description}</p>
        {onRetry && (
            <div className='mt-5'>
                <Button variant='secondary' size='sm' fullWidth={false} onClick={onRetry} label='Try again' />
            </div>
        )}
    </div>
)

export default ErrorState
