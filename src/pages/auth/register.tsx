import RegisterForm from "../../components/auth/register-form"
import AuthLayout from "../../layouts/auth-layout"

const RegisterPage = () => (
    <AuthLayout
        wide
        title='Create your account'
        subtitle='Takes a minute. You will need it to reserve a seat.'
    >
        <RegisterForm />
    </AuthLayout>
)

export default RegisterPage
