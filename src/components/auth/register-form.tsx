import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuUserPlus } from "react-icons/lu";
import Input from "../common/ui/inputs/input";
import Button from "../common/ui/buttons/button";
import { registerSchema } from "../../schemas/auth.schema";
import { registerUser } from "../../api/auth.api";
import type { IRegister } from "../../@types/auth.types";

const RegisterForm = () => {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            confirm_password: '',
            phone: ''
        },
        resolver: yupResolver(registerSchema),
        mode: 'all'
    })

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: (response) => {
            toast.success(response?.message || 'Account registered.')
            navigate('/sign-in', { replace: true })
        },
        onError: (error) => {
            toast.error(error?.message || 'something went wrong')
        }
    })

    const onSubmit = (data: IRegister) => mutate(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1'>
            <div className='grid gap-x-4 sm:grid-cols-2'>
                <Input
                    required
                    name='first_name'
                    error={errors?.first_name?.message}
                    register={register}
                    label='First Name'
                    id='first_name'
                    placeholder='John'
                />
                <Input
                    required
                    label='Last Name'
                    id='last_name'
                    error={errors?.last_name?.message}
                    register={register}
                    name='last_name'
                    placeholder='Doe'
                />
            </div>

            <Input
                required
                name='email'
                error={errors?.email?.message}
                register={register}
                label='Email'
                id='email'
                placeholder='johndoe@gmail.com'
                type='email'
                icon={<MdOutlineMailOutline size={17} />}
            />

            <div className='grid gap-x-4 sm:grid-cols-2'>
                <Input
                    required
                    name='password'
                    error={errors?.password?.message}
                    register={register}
                    label='Password'
                    id='password'
                    placeholder='Create a password'
                    type='password'
                    hint='8+ characters, a number and a symbol.'
                />
                <Input
                    required
                    name='confirm_password'
                    error={errors?.confirm_password?.message}
                    register={register}
                    label='Retype Password'
                    id='confirm_password'
                    placeholder='Repeat it'
                    type='password'
                />
            </div>

            <Input
                name='phone'
                error={errors?.phone?.message}
                register={register}
                label='Phone Number'
                id='phone'
                type='tel'
                placeholder='9865374070'
            />

            <div className='mt-4'>
                <Button
                    type='submit'
                    size='lg'
                    loading={isPending}
                    icon={<LuUserPlus size={20} />}
                    label={isPending ? 'Creating account...' : 'Sign Up'}
                />
            </div>

            <p className='mt-6 text-center text-sm text-slate-500'>
                Already have an account?
                <Link to='/sign-in' className='ml-1.5 font-semibold text-brand-600 transition-colors hover:text-brand-700'>
                    Sign In
                </Link>
            </p>
        </form>
    )
}

export default RegisterForm
