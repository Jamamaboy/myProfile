import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
