import CategoryList from '../components/landing/categories/category-list'
import HeroSection from '../components/landing/hero'
import PopularPackages from '../components/landing/popular-packages'
import TrustStrip from '../components/landing/trust-strip'

const LandingPage = () => {
  return (
    <main className='flex-1'>
      <HeroSection />
      <TrustStrip />
      <PopularPackages />
      <CategoryList />
    </main>
  )
}

export default LandingPage
