import { useState } from 'react'
import axios from 'axios'
import PageBanner from '../components/PageBanner'
import Button from '../components/Button'
import { siteConfig } from '../config/siteConfig'
import '../styles/Contact.css'
import { Mail, Phone, MapPin, Globe, Camera, MessageCircle, Play } from 'lucide-react'

const socialIcons = {
  instagram: Camera,
  facebook: Globe,
  twitter: MessageCircle,
  youtube: Play,
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState('success')

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required.'
    if (!form.email.trim()) {
      next.email = 'Email address is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (form.phone && !/^[\d\s+()-]{7,20}$/.test(form.phone)) {
      next.phone = 'Please enter a valid phone number.'
    }
    if (!form.subject.trim()) next.subject = 'Subject is required.'
    if (!form.message.trim()) next.message = 'Message is required.'
    return next
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const next = validate()
    setErrors(next)

    if (Object.keys(next).length > 0) return

    setLoading(true)
    setShowPopup(false)

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/contact/',
        form
      )

      setSuccess(true)
      setForm(initialForm)
      setErrors({})

      setPopupType('success')
      setPopupMessage(
        'Your message has been submitted successfully! We will contact you soon.'
      )
      setShowPopup(true)

    } catch (error) {
      console.error('Contact submission failed:', error)

      setPopupType('error')
      setPopupMessage(
        'Unable to send your message. Please try again.'
      )
      setShowPopup(true)

    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <PageBanner
        title="Contact Us"
        subtitle="Questions about competitions or partnerships? Get in touch."
      />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <h2 className="font-display text-2xl font-bold uppercase text-slate-900 dark:text-white">
            Send a Message
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            This demo form validates on the client only. Connect a backend or form
            service (e.g., Formspree, EmailJS) to actually deliver messages.
          </p>

          {success && (
            <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <p className="font-semibold">Message Sent Successfully!</p>
              <p>We have received your message and will get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="label-field">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="jjbrij"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="label-field">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="baddies@example.com"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="label-field">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 1437143714"
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="label-field">Subject *</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                className="input-field"
                placeholder="Competition inquiry"
              />
              {errors.subject && <p className="error-text">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="label-field">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="input-field"
                placeholder="Write your message here..."
              />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {showPopup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-slate-900">

              {/* Icon */}
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${popupType === 'success'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                  }`}
              >
                {popupType === 'success' ? '✓' : '✕'}
              </div>

              {/* Title */}
              <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                {popupType === 'success'
                  ? 'Message Sent!'
                  : 'Submission Failed'}
              </h2>

              {/* Message */}
              <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {popupMessage}
              </p>

              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className={`rounded-lg px-6 py-3 font-semibold text-white transition hover:opacity-90 ${popupType === 'success'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                  }`}
              >
                {popupType === 'success' ? 'Great!' : 'Try Again'}
              </button>

            </div>
          </div>
        )}

        {/* Info */}
        <div className="space-y-4 lg:col-span-2">
          <div className="contact-card">
            <div className="contact-icon mb-3"><Mail size={20} /></div>
            <h3 className="font-display text-lg font-bold uppercase text-slate-900 dark:text-white">Email</h3>
            <a href={`mailto:${siteConfig.contact.email}`} className="mt-1 block text-sm text-brand-red hover:underline">
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="contact-card">
            <div className="contact-icon mb-3"><Phone size={20} /></div>
            <h3 className="font-display text-lg font-bold uppercase text-slate-900 dark:text-white">Phone</h3>
            <a href={`tel:${siteConfig.contact.phone}`} className="mt-1 block text-sm text-brand-red hover:underline">
              {siteConfig.contact.phone}
            </a>
          </div>
          <div className="contact-card">
            <div className="contact-icon mb-3"><MapPin size={20} /></div>
            <h3 className="font-display text-lg font-bold uppercase text-slate-900 dark:text-white">Office</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {siteConfig.contact.address}
            </p>
          </div>
          <div className="contact-card">
            <h3 className="font-display text-lg font-bold uppercase text-slate-900 dark:text-white">Follow Us</h3>
            <div className="mt-3 flex gap-2">
              {siteConfig.socials.map((s) => {
                const Icon = socialIcons[s.icon] || Instagram
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-brand-red hover:text-brand-red dark:border-slate-700 dark:text-slate-300"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="contact-card flex h-40 items-center justify-center border-dashed text-center text-sm text-slate-400">
            Map placeholder — embed a map here
          </div>
        </div>
      </section>
    </div>
  )
}