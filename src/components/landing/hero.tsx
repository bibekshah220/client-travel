import { Link } from 'react-router';
import { IoArrowForward } from 'react-icons/io5';
import { useContent } from '../../hooks/use-content';
import Container from '../common/ui/layout/container';
import { buttonStyles } from '../common/ui/buttons/button-styles';
import Skeleton from '../common/ui/feedback/skeleton';
import ErrorState from '../common/ui/feedback/error-state';

const HeroSection = () => {
    const { content, isLoading, isError, refetch } = useContent();
    const hero = content?.hero;

    return (
        <section className='relative isolate min-h-[520px] overflow-hidden sm:min-h-[580px] lg:min-h-[660px]'>
            {/* cover */}
            <img
                className='absolute inset-0 -z-10 size-full object-cover'
                src={hero?.cover_image?.path || '/cover.jpg'}
                alt=''
                aria-hidden
            />
            {/* a directional scrim instead of a flat 60% black — keeps the
                photograph readable while the text stays high contrast */}
            <div
                aria-hidden
                className='absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/85 via-slate-900/60 to-slate-900/30'
            />

            <Container className='flex min-h-[520px] items-center py-20 sm:min-h-[580px] lg:min-h-[660px]'>
                {isError ? (
                    <div className='w-full max-w-md'>
                        <ErrorState
                            compact
                            title='We could not load the page content'
                            description='The booking service is not responding right now. Tours may still be browsable.'
                            onRetry={() => refetch()}
                        />
                    </div>
                ) : isLoading ? (
                    <div className='w-full max-w-xl space-y-4'>
                        <Skeleton className='h-5 w-40 bg-white/20' />
                        <Skeleton className='h-14 w-full bg-white/20' />
                        <Skeleton className='h-6 w-4/5 bg-white/20' />
                        <Skeleton className='h-12 w-48 bg-white/20' />
                    </div>
                ) : (
                    <div className='max-w-xl animate-fade-up'>
                        {hero?.badge && (
                            <span className='inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm'>
                                {hero.badge}
                            </span>
                        )}

                        <h1 className='mt-5 text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl'>
                            {hero?.title}
                        </h1>

                        <p className='mt-5 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg'>
                            {hero?.subtitle}
                        </p>

                        <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                            <Link
                                to={hero?.cta_link || '/packages'}
                                className={buttonStyles('primary', 'lg', false, 'group')}
                            >
                                <span>{hero?.cta_label}</span>
                                <IoArrowForward
                                    size={18}
                                    className='transition-transform duration-200 group-hover:translate-x-0.5'
                                />
                            </Link>
                            {hero?.secondary_cta_label && (
                                <Link
                                    to={hero.secondary_cta_link || '/about-us'}
                                    className={buttonStyles(
                                        'secondary',
                                        'lg',
                                        false,
                                        'bg-white/10 text-white ring-white/30 backdrop-blur-sm hover:bg-white/20'
                                    )}
                                >
                                    {hero.secondary_cta_label}
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </section>
    )
};

export default HeroSection;
