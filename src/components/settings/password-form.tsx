import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdOutlineLockReset } from 'react-icons/md'
import Input from '../common/ui/inputs/input'
import Button from '../common/ui/buttons/button'
import { passwordSchema } from '../../schemas/user.schema'
import { changePassword } from '../../api/user.api'
import type { IChangePassword } from '../../@types/user.types'

type IProps = { user_id: string }

const PasswordForm: React.FC<IProps> = ({ user_id }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_password: ''
        },
        resolver: yupResolver(passwordSchema),
        mode: 'all'
    })

    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: (response) => {
            toast.success(response?.message || 'Password changed')
            reset({ current_password: '', new_password: '', confirm_password: '' })
        },
        onError: (error) => {
            toast.error(error?.message || 'Something went wrong')
        }
    })

    const onSubmit = (data: IChangePassword) => mutate({ user_id, data })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-md flex-col gap-1'>
            <Input
                required
                type='password'
                label='Current Password'
                id='current_password'
                name='current_password'
                register={register}
                error={errors?.current_password?.message}
            />
            <Input
                required
                type='password'
                label='New Password'
                id='new_password'
                name='new_password'
                register={register}
                error={errors?.new_password?.message}
                hint='At least 8 characters, with a number and a special character.'
            />
            <Input
                required
                type='password'
                label='Retype New Password'
                id='confirm_new_password'
                name='confirm_password'
                register={register}
                error={errors?.confirm_password?.message}
            />

            <div className='mt-4 flex justify-end'>
                <Button
                    type='submit'
                    fullWidth={false}
                    loading={isPending}
                    icon={<MdOutlineLockReset size={20} />}
                    label={isPending ? 'Updating...' : 'Change password'}
                    className='w-full sm:w-auto'
                />
            </div>
        </form>
    )
}

export default PasswordForm
