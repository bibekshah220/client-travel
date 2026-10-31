/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import Field from './field'
import { controlStyles } from './control-styles'

interface IProps {
    label: string
    id: string
    name: string
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'tel'
    error?: string
    hint?: string
    icon?: React.ReactNode
    register: UseFormRegister<any>
    required?: boolean
    disabled?: boolean
}

const Input: React.FC<IProps> = ({
    id,
    label,
    type = 'text',
    placeholder = '',
    register,
    name,
    error,
    hint,
    icon,
    required = false,
    disabled = false
}) => {
    const [show, setShow] = React.useState(false)
    const isPassword = type === 'password'

    return (
        <Field id={id} label={label} required={required} error={error} hint={hint}>
            <div className='relative'>
                {icon && (
                    <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
                        {icon}
                    </span>
                )}
                <input
                    className={controlStyles(
                        error,
                        ['h-11', icon && 'pl-10', isPassword && 'pr-11'].filter(Boolean).join(' ')
                    )}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={`${id}-message`}
                    {...register(name)}
                    type={isPassword && show ? 'text' : type}
                    id={id}
                />
                {isPassword && (
                    <button
                        type='button'
                        onClick={() => setShow((s) => !s)}
                        aria-label={show ? 'Hide password' : 'Show password'}
                        aria-pressed={show}
                        className='absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600'
                    >
                        {show ? <LuEyeOff size={17} /> : <LuEye size={17} />}
                    </button>
                )}
            </div>
        </Field>
    )
}

export default Input
