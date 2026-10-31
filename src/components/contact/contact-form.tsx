import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdOutlineMailOutline } from 'react-icons/md'
import Input from '../common/ui/inputs/input'
import TextArea from '../common/ui/inputs/textarea'
import Button from '../common/ui/buttons/button'
import { contactSchema } from '../../schemas/contact.schema'
import { submitContact } from '../../api/contact.api'
import type { IContact } from '../../@types/contact.types'
import { useAuth } from '../../context/auth.context'

const ContactForm = () => {
    const { user } = useAuth()

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        },
        values: user
            ? {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                phone: user.phone ?? '',
                subject: '',
                message: ''
            }
            : undefined,
        resolver: yupResolver(contactSchema),
        mode: 'all'
    })

    const { mutate, isPending } = useMutation({
        mutationFn: submitContact,
        onSuccess: (response) => {
            toast.success(response?.message || 'Message sent')
            reset({ name: '', email: '', phone: '', subject: '', message: '' })
        },
        onError: (error) => {
            toast.error(error?.message || 'Something went wrong')
        }
    })

    const onSubmit = (data: IContact) => mutate(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1'>
            <div className='grid gap-x-4 sm:grid-cols-2'>
                <Input
                    required
                    label='Full Name'
                    id='name'
                    name='name'
                    placeholder='John Doe'
                    register={register}
                    error={errors?.name?.message}
                />
                <Input
                    required
                    label='Email'
                    id='contact_email'
                    name='email'
                    type='email'
                    placeholder='johndoe@gmail.com'
                    register={register}
                    error={errors?.email?.message}
                    icon={<MdOutlineMailOutline size={17} />}
                />
            </div>

            <div className='grid gap-x-4 sm:grid-cols-2'>
                <Input
                    label='Phone Number'
                    id='contact_phone'
                    name='phone'
                    type='tel'
                    placeholder='9865374070'
                    register={register}
                    error={errors?.phone?.message}
                />
                <Input
                    required
                    label='Subject'
                    id='subject'
                    name='subject'
                    placeholder='Everest Base Camp, October'
                    register={register}
                    error={errors?.subject?.message}
                />
            </div>

            <TextArea
                required
                label='Message'
                id='message'
                name='message'
                rows={6}
                placeholder='Tell us what you are planning and when you would like to travel.'
                register={register}
                error={errors?.message?.message}
            />

            <div className='mt-4 flex justify-end'>
                <Button
                    type='submit'
                    fullWidth={false}
                    loading={isPending}
                    icon={<MdOutlineMailOutline size={19} />}
                    label={isPending ? 'Sending...' : 'Send message'}
                    className='w-full sm:w-auto'
                />
            </div>
        </form>
    )
}

export default ContactForm
