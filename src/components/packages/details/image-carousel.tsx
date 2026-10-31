import { useEffect, useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import type { IImage } from '../../../@types/global.types'

type IProps = {
    pkgImages: IImage[]
    alt?: string
}

/**
 * Main image plus a thumbnail strip. Replaces the autoplaying slider — a
 * gallery that moves on its own fights the reader on a page they came to study.
 */
const ImageCarousel: React.FC<IProps> = ({ pkgImages, alt = '' }) => {
    const images = (pkgImages ?? []).filter(Boolean)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setIndex(0)
    }, [pkgImages])

    if (images.length === 0) {
        return <div className='aspect-[4/3] w-full rounded-card bg-slate-100' />
    }

    const go = (next: number) => setIndex((next + images.length) % images.length)

    return (
        <div
            className='w-full'
            onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') go(index - 1)
                if (event.key === 'ArrowRight') go(index + 1)
            }}
        >
            <div className='group relative aspect-[4/3] w-full overflow-hidden rounded-card bg-slate-100 shadow-card'>
                <img
                    src={images[index]?.path}
                    alt={`${alt} — image ${index + 1} of ${images.length}`}
                    className='size-full object-cover'
                />

                {images.length > 1 && (
                    <>
                        <button
                            type='button'
                            onClick={() => go(index - 1)}
                            aria-label='Previous image'
                            className='absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow-card transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100'
                        >
                            <IoChevronBack size={18} />
                        </button>
                        <button
                            type='button'
                            onClick={() => go(index + 1)}
                            aria-label='Next image'
                            className='absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow-card transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100'
                        >
                            <IoChevronForward size={18} />
                        </button>

                        <span className='absolute bottom-3 right-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
                            {index + 1} / {images.length}
                        </span>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className='mt-3 flex gap-2.5 overflow-x-auto pb-1'>
                    {images.map((image, position) => (
                        <button
                            key={image.public_id ?? position}
                            type='button'
                            onClick={() => setIndex(position)}
                            aria-label={`Show image ${position + 1}`}
                            aria-current={position === index}
                            className={[
                                'size-16 shrink-0 overflow-hidden rounded-lg transition-all sm:size-20',
                                position === index
                                    ? 'ring-2 ring-brand-600 ring-offset-2'
                                    : 'opacity-60 hover:opacity-100'
                            ].join(' ')}
                        >
                            <img src={image.path} alt='' loading='lazy' className='size-full object-cover' />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageCarousel
