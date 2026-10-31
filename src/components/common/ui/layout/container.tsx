import React from 'react'
import { twMerge } from 'tailwind-merge'

type IProps = {
    children: React.ReactNode
    className?: string
    as?: 'div' | 'main' | 'section' | 'header' | 'footer' | 'nav'
    /** Keep the gutters but drop the max width — for full-bleed bars like the header. */
    fluid?: boolean
}

/** Page gutter and max width. Replaces the per-page px-22 / px-24 guesses. */
const Container: React.FC<IProps> = ({ children, className, as: Tag = 'div', fluid = false }) => (
    <Tag className={twMerge(fluid ? 'container-fluid' : 'container-page', className)}>
        {children}
    </Tag>
)

export default Container
