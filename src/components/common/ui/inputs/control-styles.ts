/** Shared border, focus and disabled treatment for every form control. */
export const controlStyles = (error?: string, extra?: string) =>
    [
        'w-full rounded-lg border bg-white px-3.5 text-[15px] text-slate-900 transition-colors duration-200',
        'placeholder:text-slate-400',
        'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
        error
            ? 'border-red-400 focus:border-red-500 focus-visible:outline-red-500'
            : 'border-slate-300 hover:border-slate-400 focus:border-brand-500 focus-visible:outline-brand-600',
        extra
    ]
        .filter(Boolean)
        .join(' ')
