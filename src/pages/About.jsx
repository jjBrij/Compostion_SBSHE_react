import { useEffect, useState } from 'react'
import { Target, Eye, ShieldCheck, Users, Flag, Heart } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import api from '../utils/api'
import { getImageUrl } from '../utils/getImageUrl' // <-- IMPORT HELPER
import '../styles/About.css'

const values = [
  { icon: ShieldCheck, title: 'Integrity', text: 'Fair play, transparent judging, and respect for every athlete.' },
  { icon: Flag, title: 'Excellence', text: 'Professional event standards from registration to award ceremony.' },
  { icon: Users, title: 'Community', text: 'A welcoming environment for athletes, fans, and partners.' },
  { icon: Heart, title: 'Passion', text: 'Everything we do is driven by a love of sport and competition.' },
]

export default function About() {
  const [about, setAbout] = useState(null)
  const [team, setTeam] = useState([])

  useEffect(() => {
    Promise.all([
      api.get('/about/'),
      api.get('/team/')
    ]).then(([aboutRes, teamRes]) => {
      setAbout(aboutRes.data[0] || null)
      setTeam(teamRes.data)
    }).catch(err => console.error("Error fetching About data:", err))
  }, [])

  return (
    <div>
      <PageBanner
        title="About Us"
        subtitle="The team, mission, and values behind every Apex Sports competition."
      />

      {/* Intro */}
      <section className="container-page py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title={about?.title || "Building the Stage for Champions"}
              subtitle="A professional sports competition company."
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {about?.intro || "Since our founding, Apex Sports has organized..."}
            </p>
            <div className="mt-6">
              <Button to="/competition">Browse Competitions</Button>
            </div>
          </div>
          {/* UPDATED IMAGE TAG */}
          <img
            src={getImageUrl(about?.image)}
            alt="Athletes competing"
            loading="lazy"
            className="team-photo shadow-card"
          />
        </div>
      </section>

      {/* History */}
      <section className="bg-slate-100 py-16 dark:bg-slate-950">
        <div className="container-page max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow="Our History"
            title={about?.history_title || "A Decade of Competition"}
            subtitle={about?.history_subtitle || "From a single local tournament..."}
          />
          <p className="mt-6 text-center text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {about?.history_content || "What started as a weekend cricket league..."}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="value-card">
            <div className="contact-icon mb-4"><Target size={22} /></div>
            <h3 className="font-display text-xl font-bold uppercase text-slate-900 dark:text-white">Our Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {about?.mission || "To organize professional, fair, and unforgettable sporting competitions..."}
            </p>
          </div>
          <div className="value-card">
            <div className="contact-icon mb-4"><Eye size={22} /></div>
            <h3 className="font-display text-xl font-bold uppercase text-slate-900 dark:text-white">Our Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {about?.vision || "To become the most trusted multi-sport competition company..."}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-100 py-16 dark:bg-slate-950">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Our Values" title="What We Stand For" />
          <div className="about-values-grid mt-10">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="value-card">
                  <div className="contact-icon mb-4"><Icon size={22} /></div>
                  <h3 className="font-display text-lg font-bold uppercase text-slate-900 dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{v.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}

      <section className="container-page py-16">
        <SectionHeading align="center" eyebrow="Organizers" title="Meet the Team" subtitle="Experienced event professionals dedicated to athlete success." />

        {/* Scrollable Container */}
        <div className="team-scroll-container mt-10">
          {team.map((m) => (
            <div key={m.id} className="value-card text-center shrink-0 w-64">
              <img
                src={getImageUrl(m.image)}
                alt={m.name}
                loading="lazy"
                className="mx-auto h-28 w-28 rounded-full object-cover"
              />
              <h3 className="mt-4 font-display text-lg font-bold uppercase text-slate-900 dark:text-white">{m.name}</h3>
              <p className="text-sm text-brand-red">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
      {/* CTA */}
      <section className="container-page pb-16">
        <div className="cta-band flex flex-col items-center gap-4 px-6 py-10 text-center sm:px-12">
          <h2 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">Join Our Next Competition</h2>
          <Button to="/apply-now" className="!bg-white !text-brand-red hover:!bg-slate-100">Apply Now</Button>
        </div>
      </section>
    </div>
  )
}