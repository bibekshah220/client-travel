/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { IoChevronDownOutline } from 'react-icons/io5'
import Field from './field'
import { controlStyles } from './control-styles'

interface IProps {
    label: string
    id: string
    name: string
    options: { label: string; value: string }[]
    error?: string
    hint?: string
    register: UseFormRegister<any>
    required?: boolean
}

const Select: React.FC<IProps> = ({ id, label, name, options, register, error, hint, required = false }) => (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
        <div className='relative'>
            <select
                className={controlStyles(error, 'h-11 appearance-none pr-10')}
                aria-invalid={!!error}
                aria-describedby={`${id}-message`}
                {...register(name)}
                id={id}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <IoChevronDownOutline
                size={17}
                aria-hidden
                className='pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400'
            />
        </div>
    </Field>
)

export default Select
