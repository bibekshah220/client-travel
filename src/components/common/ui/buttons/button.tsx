import React from 'react'
import Spinner from '../feedback/spinner'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './button-styles'

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    label: string
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: React.ReactNode
    loading?: boolean
    fullWidth?: boolean
}

const Button: React.FC<IProps> = ({
    label,
    type = 'button',
    variant = 'primary',
    size = 'md',
    icon,
    loading = false,
    fullWidth = true,
    disabled,
    className,
    ...rest
}) => (
    <button
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={buttonStyles(variant, size, fullWidth, className)}
        {...rest}
    >
        {loading ? <Spinner /> : icon}
        <span>{label}</span>
    </button>
)

export default Button
