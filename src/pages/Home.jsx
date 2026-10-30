import { useEffect, useState } from 'react'
import { Trophy, Medal, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import CompetitionCard from '../components/CompetitionCard'
import TestimonialCard from '../components/TestimonialCard'
import Button from '../components/Button'
import api from '../utils/api'
import '../styles/Home.css'
import { getImageUrl } from '../utils/getImageUrl'

export default function Home() {
  const [data, setData] = useState({
    settings: null,
    sponsors: [],
    competitions: [],
    testimonials: [],
    gallery: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all data in parallel
    Promise.all([
      api.get('/settings/'),
      api.get('/sponsors/'),
      api.get('/competitions/'),
      api.get('/testimonials/'),
      api.get('/gallery/')
    ]).then(([settingsRes, sponsorsRes, compsRes, testRes, galleryRes]) => {
      setData({
        settings: settingsRes.data[0] || null, // assuming you only have one settings entry
        sponsors: sponsorsRes.data,
        competitions: compsRes.data.filter(c => c.is_featured).slice(0, 3),
        testimonials: testRes.data.slice(0, 3),
        gallery: galleryRes.data.slice(0, 4)
      })
      setLoading(false)
    }).catch(err => {
      console.error("Error fetching data:", err)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="text-center py-20">Loading...</div>

  const { settings, sponsors, competitions, testimonials, gallery } = data

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <img
          src={getImageUrl(settings?.hero_image)}
          alt="Hero Background"
          className="hero-image"
        />
        <div className="hero-content container-page">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            <Trophy size={14} /> Professional Sports Competitions
          </p>
          <h1 className="hero-headline max-w-3xl">
            {settings?.hero_title || "Where Champions Are Born"}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {settings?.hero_subtitle || "A professional sports competition company."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/competition">Explore Competitions</Button>
            <Button to="/apply-now" variant="secondary" className="!border-white/40 !text-white hover:!border-brand-red hover:!text-brand-red">
              Apply Now
            </Button>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8">
            <div className="hero-stat">
              <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">{settings?.total_events || "120+"}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-300">Total Events</p>
            </div>
            <div className="hero-stat">
              <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">{settings?.total_athletes || "8,500+"}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-300">Registered Athletes</p>
            </div>
            <div className="hero-stat">
              <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">{settings?.total_championships || "45+"}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-300">Championships</p>
            </div>
          </div>
        </div>
      </section>

            {/* Powered By */}
      <section className="container-page py-16">
        <SectionHeading align="center" eyebrow="Our Partners" title="Powered By" subtitle="Brands and organizations that help us deliver world-class sporting events." />
        
        <div className="sponsor-scroll-container mt-10">
          {sponsors.map((s) => (
            <div key={s.id} className="sponsor-card group">
              {s.logo ? (
                <img 
                  src={getImageUrl(s.logo)} 
                  alt={s.name} 
                  className="sponsor-logo" 
                  onError={(e) => {
                    // If image fails to load, hide it and show text instead
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
              ) : null}
              {/* Fallback text (always in DOM, but hidden if image loads) */}
              <span className="sponsor-text" style={{ display: s.logo ? 'none' : 'block' }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="bg-slate-100 py-16 dark:bg-slate-950">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Featured" title="Upcoming Competitions" subtitle="From the pitch to the stage — compete in events built for serious athletes." />
            <Link to="/competition" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {competitions.map((c) => (
              <CompetitionCard key={c.id} competition={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="container-page py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Gallery" title="Moments of Glory" subtitle="Highlights from our latest competitions, championships, and ceremonies." />
          <Button to="/gallery" variant="secondary">View Full Gallery</Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((item) => (
            <img
              key={item.id}
              src={getImageUrl(item.image)}
              alt={item.title}
              loading="lazy"
              className="h-40 w-full rounded-2xl object-cover sm:h-48"
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-100 py-16 dark:bg-slate-950">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Testimonials" title="What Athletes Say" subtitle="Real feedback from competitors who have taken part in our events." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="cta-band flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
          <Medal size={40} />
          <h2 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">Ready to Compete?</h2>
          <p className="max-w-xl text-sm text-white/90 sm:text-base">Register for upcoming competitions and take your shot at the championship stage.</p>
          <Button to="/apply-now" className="!bg-white !text-brand-red hover:!bg-slate-100">Apply Now</Button>
        </div>
      </section>
    </div>
  )
}