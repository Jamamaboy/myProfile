import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollProgress from './components/ScrollProgress'
import KonamiEaster from './components/KonamiEaster'

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <KonamiEaster />
      <main>
        <Hero />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
