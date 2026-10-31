import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { LiaSignInAltSolid } from "react-icons/lia"
import { MdOutlineMailOutline } from "react-icons/md"
import Input from "../common/ui/inputs/input"
import Button from "../common/ui/buttons/button"
import { loginSchema } from "../../schemas/auth.schema"
import { loginUser } from "../../api/auth.api"
import type { ILogin } from "../../@types/auth.types"
import { useAuth } from "../../context/auth.context"

const LoginForm = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(loginSchema),
        mode: 'all'
    })

    const { mutate, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            toast.success(response?.message || 'Login successful')
            setUser(response.data)
            navigate('/', { replace: true })
        },
        onError: (error) => {
            toast.error(error?.message || 'Something went wrong')
        }
    })

    const onSubmit = (data: ILogin) => mutate(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1'>
            <Input
                required
                error={errors?.email?.message}
                name='email'
                register={register}
                label='Email'
                id='email'
                placeholder='johndoe@gmail.com'
                type='email'
                icon={<MdOutlineMailOutline size={17} />}
            />

            <Input
                required
                error={errors?.password?.message}
                name='password'
                register={register}
                label='Password'
                id='password'
                placeholder='Your password'
                type='password'
            />

            <div className='mt-4'>
                <Button
                    type='submit'
                    size='lg'
                    loading={isPending}
                    icon={<LiaSignInAltSolid size={22} />}
                    label={isPending ? 'Signing in...' : 'Sign In'}
                />
            </div>

            <p className='mt-6 text-center text-sm text-slate-500'>
                Don't have an account?
                <Link to='/sign-up' className='ml-1.5 font-semibold text-brand-600 transition-colors hover:text-brand-700'>
                    Sign Up
                </Link>
            </p>
        </form>
    )
}

export default LoginForm
