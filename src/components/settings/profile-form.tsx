import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { LuUpload } from 'react-icons/lu'
import Input from '../common/ui/inputs/input'
import Select from '../common/ui/inputs/select'
import Button from '../common/ui/buttons/button'
import Field from '../common/ui/inputs/field'
import { profileSchema } from '../../schemas/user.schema'
import { updateProfile } from '../../api/user.api'
import { useAuth } from '../../context/auth.context'
import { Gender } from '../../@types/global.types'
import type { IUpdateProfile } from '../../@types/user.types'
import type { IUser } from '../../@types/auth.types'

const genderOptions = Object.values(Gender).map((value) => ({
    value,
    label: value.charAt(0) + value.slice(1).toLowerCase()
}))

type IProps = { user: IUser }

const ProfileForm: React.FC<IProps> = ({ user }) => {
    const { setUser } = useAuth()
    const queryClient = useQueryClient()
    const [preview, setPreview] = useState<string | null>(null)

    const { register, handleSubmit, watch, reset, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone ?? '',
            gender: user.gender ?? Gender.MALE,
            profile_image: undefined
        },
        resolver: yupResolver(profileSchema),
        mode: 'all'
    })

    const picked = watch('profile_image')

    // object URLs leak unless revoked, so tie each one to the file that made it
    useEffect(() => {
        const file = picked?.[0]
        if (!file) {
            setPreview(null)
            return
        }
        const url = URL.createObjectURL(file)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [picked])

    const { mutate, isPending } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (response) => {
            toast.success(response?.message || 'Profile updated')
            setUser(response.data)
            queryClient.invalidateQueries({ queryKey: ['check_auth'] })
            reset({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                phone: response.data.phone ?? '',
                gender: response.data.gender,
                profile_image: undefined
            })
        },
        onError: (error) => {
            toast.error(error?.message || 'Something went wrong')
        }
    })

    const onSubmit = (data: IUpdateProfile) => mutate({ user_id: user._id, data })
    const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1'>
            {/* avatar */}
            <div className='mb-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center'>
                <span className='grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-100 text-xl font-bold text-brand-700 ring-4 ring-white shadow-card'>
                    {preview || user.profile_image?.path ? (
                        <img
                            src={preview ?? user.profile_image?.path}
                            alt='Profile photo'
                            className='size-full object-cover'
                        />
                    ) : (
                        initials || '?'
                    )}
                </span>

                <div>
                    <label
                        htmlFor='profile_image'
                        className='inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 transition-colors hover:bg-brand-50'
                    >
                        <LuUpload size={16} />
                        <span>{preview ? 'Choose another' : 'Change photo'}</span>
                    </label>
                    <input
                        id='profile_image'
                        type='file'
                        accept='image/*'
                        className='sr-only'
                        {...register('profile_image')}
                    />
                    <p className='mt-2 text-xs text-slate-400'>png, jpg, webp, svg, gif or avif. 5MB max.</p>
                    <p className='min-h-4 text-xs text-red-600'>{errors?.profile_image?.message}</p>
                </div>
            </div>

            <div className='grid gap-x-4 sm:grid-cols-2'>
                <Input
                    required
                    label='First Name'
                    id='profile_first_name'
                    name='first_name'
                    placeholder='John'
                    register={register}
                    error={errors?.first_name?.message}
                />
                <Input
                    required
                    label='Last Name'
                    id='profile_last_name'
                    name='last_name'
                    placeholder='Doe'
                    register={register}
                    error={errors?.last_name?.message}
                />
            </div>

            <div className='grid gap-x-4 sm:grid-cols-2'>
                <Input
                    label='Phone Number'
                    id='profile_phone'
                    name='phone'
                    type='tel'
                    placeholder='9865374070'
                    register={register}
                    error={errors?.phone?.message}
                />
                <Select
                    required
                    label='Gender'
                    id='profile_gender'
                    name='gender'
                    options={genderOptions}
                    register={register}
                    error={errors?.gender?.message}
                />
            </div>

            {/* email is the login identity and the account is keyed on it */}
            <Field id='profile_email' label='Email' hint='Email cannot be changed here.'>
                <input
                    id='profile_email'
                    value={user.email}
                    disabled
                    className='h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-[15px] text-slate-500'
                />
            </Field>

            <div className='mt-4 flex justify-end'>
                <Button
                    type='submit'
                    fullWidth={false}
                    loading={isPending}
                    disabled={!isDirty}
                    label={isPending ? 'Saving...' : 'Save changes'}
                    className='w-full sm:w-auto'
                />
            </div>
        </form>
    )
}

export default ProfileForm
