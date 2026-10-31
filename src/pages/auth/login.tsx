import LoginForm from "../../components/auth/login-form"
import AuthLayout from "../../layouts/auth-layout"

const LoginPage = () => (
    <AuthLayout title='Welcome back' subtitle='Sign in to manage your bookings.'>
        <LoginForm />
    </AuthLayout>
)

export default LoginPage
