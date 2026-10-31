/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { UseFormRegister } from 'react-hook-form'
import Field from './field'
import { controlStyles } from './control-styles'

interface IProps {
    label: string
    id: string
    name: string
    placeholder?: string
    rows?: number
    error?: string
    hint?: string
    register: UseFormRegister<any>
    required?: boolean
}

const TextArea: React.FC<IProps> = ({
    id,
    label,
    placeholder = '',
    register,
    name,
    error,
    hint,
    rows = 5,
    required = false
}) => (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
        <textarea
            className={controlStyles(error, 'resize-y py-3 leading-relaxed')}
            placeholder={placeholder}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={`${id}-message`}
            {...register(name)}
            id={id}
        />
    </Field>
)

export default TextArea
