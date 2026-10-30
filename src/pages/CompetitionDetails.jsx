import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarDays, MapPin, Mail, Phone, Info, ShieldAlert, ArrowLeft } from 'lucide-react'
import api from '../utils/api'
import { getImageUrl } from '../utils/getImageUrl'
import Button from '../components/Button'
import PageBanner from '../components/PageBanner'
import '../styles/CompetitionDetails.css'

export default function CompetitionDetails() {
  const { id } = useParams()
  const [competition, setCompetition] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all and filter by ID (or you can create a detail API endpoint)
    api.get('/competitions/')
      .then(res => {
        const found = res.data.find(c => c.id === parseInt(id))
        setCompetition(found)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!competition) return <div className="text-center py-20">Competition not found.</div>

  return (
    <div>
      <PageBanner title={competition.title} subtitle={`${competition.sport} • ${competition.status}`} />

      <section className="container-page py-12">
        <Link to="/competition" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:underline mb-8">
          <ArrowLeft size={16} /> Back to Competitions
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96">
              <img 
                src={getImageUrl(competition.image)} 
                alt={competition.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase text-slate-900 dark:text-white mb-4">About the Event</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{competition.description}</p>
            </div>

            {competition.rules && (
              <div className="card-surface p-6">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-slate-900 dark:text-white mb-3">
                  <ShieldAlert size={20} className="text-brand-red" /> Rules & Regulations
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">{competition.rules}</p>
              </div>
            )}

            {competition.instructions && (
              <div className="card-surface p-6">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-slate-900 dark:text-white mb-3">
                  <Info size={20} className="text-brand-orange" /> Instructions
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">{competition.instructions}</p>
              </div>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            <div className="card-surface p-6">
              <h3 className="font-display text-lg font-bold uppercase text-slate-900 dark:text-white mb-4">Event Details</h3>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CalendarDays className="text-brand-red shrink-0" size={18} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Date</p>
                    <p>{new Date(competition.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-brand-red shrink-0" size={18} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Location</p>
                    <p>{competition.location}</p>
                    {competition.location_link && (
                      <a href={competition.location_link} target="_blank" rel="noreferrer" className="text-brand-red hover:underline block mt-1">View on Map</a>
                    )}
                  </div>
                </li>
              </ul>
            </div>

            <div className="card-surface p-6">
              <h3 className="font-display text-lg font-bold uppercase text-slate-900 dark:text-white mb-4">Contact Organizer</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {competition.contact_email && (
                  <li className="flex items-center gap-3">
                    <Mail className="text-brand-red" size={18} />
                    <a href={`mailto:${competition.contact_email}`} className="hover:underline">{competition.contact_email}</a>
                  </li>
                )}
                {competition.contact_phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="text-brand-red" size={18} />
                    <a href={`tel:${competition.contact_phone}`} className="hover:underline">{competition.contact_phone}</a>
                  </li>
                )}
              </ul>
            </div>

            {competition.status === 'Open' && (
              <div className="cta-band p-6 text-center rounded-2xl">
                <h3 className="font-display text-xl font-bold uppercase text-white mb-2">Ready to Join?</h3>
                <p className="text-sm text-white/90 mb-4">Registration is currently open.</p>
                <Button to="/apply-now" className="!bg-white !text-brand-red hover:!bg-slate-100 w-full">Apply Now</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}