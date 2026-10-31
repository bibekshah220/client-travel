import React from 'react'
import { Link } from 'react-router'
import { IoArrowForward } from 'react-icons/io5'

type IProps = {
  title: string
  subTitle?: string
  link?: string
  linkLabel?: string
  align?: 'start' | 'center'
}

const SectionHeading: React.FC<IProps> = ({
  subTitle,
  title,
  link,
  linkLabel = 'Explore all',
  align = 'start'
}) => (
  <div
    className={[
      'flex w-full gap-4',
      align === 'center'
        ? 'flex-col items-center text-center'
        : 'flex-col items-start sm:flex-row sm:items-end sm:justify-between'
    ].join(' ')}
  >
    <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
      <h2 className='text-2xl leading-tight sm:text-3xl'>{title}</h2>
      {subTitle && <p className='mt-2 text-[15px] leading-relaxed text-slate-500'>{subTitle}</p>}
    </div>

    {link && (
      <Link
        to={link}
        className='group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700'
      >
        <span>{linkLabel}</span>
        <IoArrowForward
          size={16}
          className='transition-transform duration-200 group-hover:translate-x-0.5'
        />
      </Link>
    )}
  </div>
)

export default SectionHeading
