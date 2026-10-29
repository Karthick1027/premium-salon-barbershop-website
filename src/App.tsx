import { useState } from 'react'
import About from './components/About'
import BookingForm from './components/BookingForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Journal from './components/Journal'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import Services from './components/Services'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import { packageOptionValue, serviceOptionValue } from './data/bookingOptions'
import { scrollToSection } from './lib/scroll'

export default function App() {
  const [bookingService, setBookingService] = useState('')

  /** Preselects a service or package in the booking form and brings the form into view. */
  const requestBooking = (optionValue: string) => {
    setBookingService(optionValue)
    scrollToSection('booking', { focus: document.querySelector<HTMLInputElement>('#booking input') })
  }

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Stats />
        <Services onBook={(id) => requestBooking(serviceOptionValue(id))} />
        <Pricing onSelect={(id) => requestBooking(packageOptionValue(id))} />
        <Gallery />
        <Journal />
        <Testimonials />
        <BookingForm service={bookingService} onServiceChange={setBookingService} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
