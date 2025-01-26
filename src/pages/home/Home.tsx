import BannerSection from './components/banner-section'
import ProfileSection from './components/profile-section'
import ServicesSection from './components/service-section'

const Home = () => {
  return (
    <div className="space-y-8">
      <ProfileSection />
      <ServicesSection />
      <BannerSection />
    </div>
  )
}

export default Home
