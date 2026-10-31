import { useSearchParams } from 'react-router'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

type IProps = {
    current_page: number
    total_pages: number
    total_count: number
}

const Pagination: React.FC<IProps> = ({ current_page, total_pages, total_count }) => {
    const [params, setParams] = useSearchParams()

    if (total_pages <= 1) return null

    const goTo = (page: number) => {
        const merged = new URLSearchParams(params)
        merged.set('page', String(page))
        setParams(merged)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const pages = Array.from({ length: total_pages }, (_, index) => index + 1).filter(
        (page) =>
            page === 1 ||
            page === total_pages ||
            Math.abs(page - current_page) <= 1
    )

    return (
        <nav
            aria-label='Pagination'
            className='mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row'
        >
            <p className='text-sm text-slate-500'>
                Page {current_page} of {total_pages}
                <span className='text-slate-400'> · {total_count} packages</span>
            </p>

            <div className='flex items-center gap-1'>
                <button
                    type='button'
                    onClick={() => goTo(current_page - 1)}
                    disabled={current_page <= 1}
                    aria-label='Previous page'
                    className='grid size-9 place-items-center rounded-lg border border-line bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                    <IoChevronBack size={16} />
                </button>

                {pages.map((page, index) => (
                    <span key={page} className='flex items-center gap-1'>
                        {index > 0 && page - pages[index - 1] > 1 && (
                            <span className='px-1 text-slate-400'>...</span>
                        )}
                        <button
                            type='button'
                            onClick={() => goTo(page)}
                            aria-current={page === current_page ? 'page' : undefined}
                            className={[
                                'size-9 rounded-lg text-sm font-semibold transition-colors',
                                page === current_page
                                    ? 'bg-brand-600 text-white'
                                    : 'border border-line bg-white text-slate-600 hover:bg-slate-50'
                            ].join(' ')}
                        >
                            {page}
                        </button>
                    </span>
                ))}

                <button
                    type='button'
                    onClick={() => goTo(current_page + 1)}
                    disabled={current_page >= total_pages}
                    aria-label='Next page'
                    className='grid size-9 place-items-center rounded-lg border border-line bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                    <IoChevronForward size={16} />
                </button>
            </div>
        </nav>
    )
}

export default Pagination
