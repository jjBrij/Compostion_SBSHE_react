import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Competition from './pages/Competition'
import Gallery from './pages/Gallery'
import Championship from './pages/Championship'
import Contact from './pages/Contact'
import ApplyNow from './pages/ApplyNow'
import NotFound from './pages/NotFound'
import CompetitionDetails from './pages/CompetitionDetails'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/competition" element={<Competition />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/championship" element={<Championship />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/apply-now" element={<ApplyNow />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/competition" element={<Competition />} />
              <Route path="/competition/:id" element={<CompetitionDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}