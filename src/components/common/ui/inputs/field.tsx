import React from 'react'

type IProps = {
    id: string
    label: string
    required?: boolean
    error?: string
    hint?: string
    children: React.ReactNode
}

/**
 * Label, hint and error wrapper shared by every control, so a field looks and
 * announces itself the same way whatever it wraps.
 */
const Field: React.FC<IProps> = ({ id, label, required, error, hint, children }) => (
    <div className='w-full'>
        <label htmlFor={id} className='mb-1.5 block text-sm font-semibold text-slate-700'>
            {label}
            {required && (
                <span className='ml-0.5 text-red-500' aria-hidden>
                    *
                </span>
            )}
            {required && <span className='sr-only'> (required)</span>}
        </label>

        {children}

        {/* reserve the row so validation never shifts the layout */}
        <p
            id={`${id}-message`}
            className={`mt-1.5 min-h-4 text-xs ${error ? 'text-red-600' : 'text-slate-400'}`}
        >
            {error || hint}
        </p>
    </div>
)

export default Field
