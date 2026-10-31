import { twMerge } from 'tailwind-merge'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
    primary:
        'bg-brand-600 text-white shadow-card hover:bg-brand-700 active:bg-brand-800',
    secondary:
        'bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 active:bg-brand-100',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200',
    danger:
        'bg-white text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50 active:bg-red-100'
}

const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-3.5 text-sm gap-1.5',
    md: 'h-11 px-5 text-[15px] gap-2',
    lg: 'h-12 px-6 text-base gap-2'
}

/** Shared so a <Link> can be styled as a button without nesting one in the other. */
export const buttonStyles = (
    variant: ButtonVariant = 'primary',
    size: ButtonSize = 'md',
    fullWidth = false,
    className?: string
) =>
    twMerge(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none',
        'active:scale-[0.99]',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
    )
