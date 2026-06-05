import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/Landing/HeroSection'
import FeaturesSection from '../components/Landing/FeaturesSection'
import TestimonialsSection from '../components/Landing/TestimonialsSection'
import CTASection from '../components/Landing/CTASection'
import Footer from '../components/Footer/Footer'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
