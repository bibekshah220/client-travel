import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { LuSearch, LuX } from 'react-icons/lu'
import { PACKAGE_COST_TYPE } from '../../@types/global.types'

const costOptions = [
    { label: 'Any pricing', value: '' },
    { label: 'Per person', value: PACKAGE_COST_TYPE.PER_PERSON },
    { label: 'Per day', value: PACKAGE_COST_TYPE.PER_DAY }
]

/**
 * Filter state lives in the URL, so a filtered list is shareable and the
 * back button behaves. Maps onto the query params the API already accepts.
 */
const PackageFilters = () => {
    const [params, setParams] = useSearchParams()
    const [term, setTerm] = useState(params.get('query') ?? '')

    // keep the box in step when the URL changes from elsewhere (a category tile)
    useEffect(() => {
        setTerm(params.get('query') ?? '')
    }, [params])

    const apply = (next: Record<string, string>) => {
        const merged = new URLSearchParams(params)
        Object.entries(next).forEach(([key, value]) => {
            if (value) merged.set(key, value)
            else merged.delete(key)
        })
        merged.delete('page') // a new filter starts at page one
        setParams(merged, { replace: true })
    }

    // debounce so typing does not fire a request per keystroke
    useEffect(() => {
        const current = params.get('query') ?? ''
        if (term === current) return

        const timer = setTimeout(() => apply({ query: term }), 350)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term])

    const activeCount = ['query', 'type', 'min_price', 'max_price'].filter((key) =>
        params.get(key)
    ).length

    return (
        <div className='rounded-card border border-line bg-surface p-4 shadow-card'>
            <div className='grid gap-3 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto]'>
                {/* search */}
                <div className='relative'>
                    <LuSearch
                        size={17}
                        aria-hidden
                        className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                    />
                    <input
                        type='search'
                        value={term}
                        onChange={(event) => setTerm(event.target.value)}
                        aria-label='Search packages'
                        placeholder='Search a route, a peak, a park...'
                        className='h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-[15px] text-slate-900 transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-500'
                    />
                </div>

                <select
                    aria-label='Pricing type'
                    value={params.get('type') ?? ''}
                    onChange={(event) => apply({ type: event.target.value })}
                    className='h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-[15px] text-slate-900 transition-colors hover:border-slate-400 focus:border-brand-500'
                >
                    {costOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <input
                    type='number'
                    min={0}
                    inputMode='numeric'
                    aria-label='Minimum price'
                    placeholder='Min price'
                    defaultValue={params.get('min_price') ?? ''}
                    onBlur={(event) => apply({ min_price: event.target.value })}
                    className='h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-[15px] text-slate-900 transition-colors hover:border-slate-400 focus:border-brand-500'
                />

                <input
                    type='number'
                    min={0}
                    inputMode='numeric'
                    aria-label='Maximum price'
                    placeholder='Max price'
                    defaultValue={params.get('max_price') ?? ''}
                    onBlur={(event) => apply({ max_price: event.target.value })}
                    className='h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-[15px] text-slate-900 transition-colors hover:border-slate-400 focus:border-brand-500'
                />

                {activeCount > 0 && (
                    <button
                        type='button'
                        onClick={() => setParams(new URLSearchParams(), { replace: true })}
                        className='inline-flex h-11 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100'
                    >
                        <LuX size={16} />
                        Clear ({activeCount})
                    </button>
                )}
            </div>
        </div>
    )
}

export default PackageFilters
