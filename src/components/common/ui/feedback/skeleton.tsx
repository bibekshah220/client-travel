import React from 'react'
import { twMerge } from 'tailwind-merge'

/** Shape-matched placeholder. Keeps layout stable while data lands. */
const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div aria-hidden className={twMerge('skeleton rounded-md', className)} />
)

export default Skeleton
