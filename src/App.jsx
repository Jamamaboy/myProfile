import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VisionGrid from './components/VisionGrid'
import Experience from './components/Experience'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <VisionGrid />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
