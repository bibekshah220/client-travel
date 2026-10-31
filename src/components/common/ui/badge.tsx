import React from 'react'
import { twMerge } from 'tailwind-merge'

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'

const tones: Record<Tone, string> = {
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
    brand: 'bg-brand-50 text-brand-700 ring-brand-100',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    warning: 'bg-accent-50 text-accent-600 ring-accent-100',
    danger: 'bg-red-50 text-red-700 ring-red-100'
}

type IProps = {
    children: React.ReactNode
    tone?: Tone
    icon?: React.ReactNode
    className?: string
}

const Badge: React.FC<IProps> = ({ children, tone = 'neutral', icon, className }) => (
    <span
        className={twMerge(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
            tones[tone],
            className
        )}
    >
        {icon}
        {children}
    </span>
)

export default Badge
