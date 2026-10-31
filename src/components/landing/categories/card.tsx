import React from 'react'
import { Link } from 'react-router'
import type { ICategoryResponse } from '../../../@types/package.types'

type IProps = {
    category: ICategoryResponse
}

const CategoryCard: React.FC<IProps> = ({ category }) => (
    <Link
        to={`/packages?query=${encodeURIComponent(category.name)}`}
        className='card-hover group flex items-center gap-3 rounded-card border border-line bg-surface p-3 shadow-card'
    >
        <div className='size-12 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
            <img
                src={category?.logo?.path}
                alt=''
                loading='lazy'
                className='size-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
        </div>
        <div className='min-w-0'>
            <p className='truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-700'>
                {category.name}
            </p>
            <p className='line-clamp-1 text-xs text-slate-500'>{category.description}</p>
        </div>
    </Link>
)

export default CategoryCard
