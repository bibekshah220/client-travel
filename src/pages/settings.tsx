import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { MdOutlinePerson, MdOutlineLock } from 'react-icons/md'
import SectionHeading from '../components/common/section-heading'
import ProfileForm from '../components/settings/profile-form'
import PasswordForm from '../components/settings/password-form'
import Card from '../components/common/ui/card'
import Container from '../components/common/ui/layout/container'
import Skeleton from '../components/common/ui/feedback/skeleton'
import { useAuth } from '../context/auth.context'

const tabs = [
  { id: 'profile', label: 'Profile', icon: <MdOutlinePerson size={18} /> },
  { id: 'password', label: 'Password', icon: <MdOutlineLock size={18} /> }
] as const

type TabId = (typeof tabs)[number]['id']

const Settings = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()
  const [active, setActive] = useState<TabId>('profile')

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('Login required')
      navigate('/sign-in')
    }
  }, [user, isLoading, navigate])

  return (
    <main className='flex-1'>
      <Container className='py-10 lg:py-14'>
        <SectionHeading
          title='Account settings'
          subTitle='Update your details, photo and password.'
        />

        {isLoading || !user ? (
          <Skeleton className='mt-8 h-[460px] w-full rounded-card' />
        ) : (
          <div className='mt-8 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]'>
            {/* tabs — a row on mobile, a rail on desktop */}
            <div
              role='tablist'
              aria-label='Settings sections'
              className='flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible'
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role='tab'
                  type='button'
                  id={`tab-${tab.id}`}
                  aria-selected={active === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActive(tab.id)}
                  className={[
                    'inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors lg:w-full',
                    active === tab.id
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  ].join(' ')}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <Card className='p-6 sm:p-8'>
              {active === 'profile' && (
                <div role='tabpanel' id='panel-profile' aria-labelledby='tab-profile'>
                  <h2 className='text-lg'>Profile</h2>
                  <p className='mb-6 mt-1 text-sm text-slate-500'>
                    This is how your name and photo appear across the site.
                  </p>
                  <ProfileForm user={user} />
                </div>
              )}

              {active === 'password' && (
                <div role='tabpanel' id='panel-password' aria-labelledby='tab-password'>
                  <h2 className='text-lg'>Password</h2>
                  <p className='mb-6 mt-1 text-sm text-slate-500'>
                    Changing your password does not sign you out of this device.
                  </p>
                  <PasswordForm user_id={user._id} />
                </div>
              )}
            </Card>
          </div>
        )}
      </Container>
    </main>
  )
}

export default Settings
