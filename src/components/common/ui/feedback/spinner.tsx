import React from 'react'
import { twMerge } from 'tailwind-merge'

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
    <span
        role='status'
        aria-label='Loading'
        className={twMerge(
            'inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent',
            className
        )}
    />
)

export default Spinner
