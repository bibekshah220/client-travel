import { Link } from 'react-router'
import { MdOutlineLocationOn, MdOutlineMailOutline, MdOutlinePhone } from 'react-icons/md'
import { useContent } from '../../hooks/use-content'
import Container from '../common/ui/layout/container'

const explore = [
  { label: 'Tours', to: '/packages' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' }
]

const Footer = () => {
  const { content } = useContent()
  const footer = content?.footer
  const contact = content?.contact

  return (
    <footer className='mt-auto bg-slate-900 text-slate-400'>
      <Container className='py-12 lg:py-16'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='sm:col-span-2 lg:col-span-1'>
            <img
              src={content?.logo?.light_path}
              alt={content?.brand ?? ''}
              className='h-11 w-auto'
            />
            <p className='mt-3 max-w-sm text-sm leading-relaxed'>{footer?.tagline}</p>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-wider text-white'>Reach us</p>
            <ul className='mt-4 flex flex-col gap-3 text-sm'>
              {contact?.address && (
                <li className='flex gap-2'>
                  <MdOutlineLocationOn size={18} className='mt-0.5 shrink-0 text-brand-400' />
                  <span>{contact.address}</span>
                </li>
              )}
              {contact?.phone && (
                <li className='flex gap-2'>
                  <MdOutlinePhone size={18} className='mt-0.5 shrink-0 text-brand-400' />
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className='transition-colors hover:text-white'>
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li className='flex gap-2'>
                  <MdOutlineMailOutline size={18} className='mt-0.5 shrink-0 text-brand-400' />
                  <a href={`mailto:${contact.email}`} className='transition-colors hover:text-white'>
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-wider text-white'>Explore</p>
            <ul className='mt-4 flex flex-col gap-2.5 text-sm'>
              {explore.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className='transition-colors hover:text-white'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-wider text-white'>Follow</p>
            <ul className='mt-4 flex flex-col gap-2.5 text-sm'>
              {footer?.socials?.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target='_blank'
                    rel='noreferrer'
                    className='transition-colors hover:text-white'
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className='mt-12 border-t border-slate-800 pt-6 text-xs'>{footer?.copyright}</p>
      </Container>
    </footer>
  )
}

export default Footer
