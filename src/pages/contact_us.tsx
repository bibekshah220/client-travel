import SectionHeading from '../components/common/section-heading'
import ContactForm from '../components/contact/contact-form'
import Container from '../components/common/ui/layout/container'
import Card from '../components/common/ui/card'
import Skeleton from '../components/common/ui/feedback/skeleton'
import { useContent } from '../hooks/use-content'
import {
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineSchedule
} from 'react-icons/md'

const ContactUs = () => {
  const { content, isLoading } = useContent()
  const contact = content?.contact

  const details = [
    {
      icon: <MdOutlineLocationOn size={20} />,
      label: 'Office',
      value: contact?.address,
      href: contact?.map_url
    },
    {
      icon: <MdOutlinePhone size={20} />,
      label: 'Phone',
      value: contact?.phone,
      href: contact?.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : undefined
    },
    {
      icon: <MdOutlineMailOutline size={20} />,
      label: 'Email',
      value: contact?.email,
      href: contact?.email ? `mailto:${contact.email}` : undefined
    },
    {
      icon: <MdOutlineSchedule size={20} />,
      label: 'Office hours',
      value: contact?.office_hours
    }
  ].filter((item) => item.value)

  return (
    <main className='flex-1'>
      <Container className='py-10 lg:py-16'>
        <SectionHeading
          title={contact?.title ?? 'Contact Us'}
          subTitle={contact?.subtitle}
        />

        <div className='mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10'>
          {/* contact details */}
          <div className='flex flex-col gap-4'>
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-20 w-full rounded-card' />
              ))}

            {details.map((item) => (
              <Card key={item.label} className='flex items-start gap-3.5 p-4'>
                <span className='grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600'>
                  {item.icon}
                </span>
                <div className='min-w-0'>
                  <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target='_blank'
                      rel='noreferrer'
                      className='mt-0.5 block text-sm font-medium text-slate-700 transition-colors hover:text-brand-600'
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className='mt-0.5 text-sm font-medium text-slate-700'>{item.value}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* form */}
          <Card className='p-6 sm:p-8'>
            <h2 className='text-lg'>{contact?.form_title}</h2>
            <p className='mb-6 mt-1 text-sm text-slate-500'>{contact?.form_subtitle}</p>
            <ContactForm />
          </Card>
        </div>
      </Container>
    </main>
  )
}

export default ContactUs
