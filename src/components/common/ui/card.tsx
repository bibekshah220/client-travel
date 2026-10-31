import React from 'react'
import { twMerge } from 'tailwind-merge'

type IProps = {
    children: React.ReactNode
    className?: string
    as?: 'div' | 'article' | 'section'
}

const Card: React.FC<IProps> = ({ children, className, as: Tag = 'div' }) => (
    <Tag
        className={twMerge(
            'rounded-card border border-line bg-surface shadow-card',
            className
        )}
    >
        {children}
    </Tag>
)

export default Card
