import React from 'react'
import { Link } from 'react-router'

type IProps = {
    icon?: React.ReactNode
    title: string
    description?: string
    action?: { label: string; to: string }
}

const EmptyState: React.FC<IProps> = ({ icon, title, description, action }) => (
    <div className='flex flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center'>
        {icon && <div className='mb-3 text-slate-400'>{icon}</div>}
        <p className='text-base font-semibold text-slate-800'>{title}</p>
        {description && <p className='mt-1 max-w-sm text-sm text-slate-500'>{description}</p>}
        {action && (
            <Link
                to={action.to}
                className='mt-5 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700'
            >
                {action.label}
            </Link>
        )}
    </div>
)

export default EmptyState
