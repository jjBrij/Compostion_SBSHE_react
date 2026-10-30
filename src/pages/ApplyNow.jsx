import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react' // Import an icon for the popup
import PageBanner from '../components/PageBanner'
import Button from '../components/Button'
import '../styles/ApplyNow.css'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  city: '',
  state: '',
  sport: '',
  competitionId: '',
  experience: '',
  achievements: '',
  intro: '',
  terms: false,
}

const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional']

export default function ApplyNow() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm)

  
  const [photo, setPhoto] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [showPopup, setShowPopup] = useState(false) // State for popup
  
  const [competitions, setCompetitions] = useState([])

  useEffect(() => {
    api.get('/competitions/')
      .then(res => {
        const openCompetitions = res.data.filter(c => c.status === 'Open')
        setCompetitions(openCompetitions)
      })
      .catch(err => console.error("Error fetching competitions:", err))
  }, [])

  const dynamicSports = Array.from(new Set(competitions.map(c => c.sport))).filter(Boolean)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'sport') {
      setForm((prev) => ({ 
        ...prev, 
        sport: value, 
        competitionId: '' 
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }
    
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setPhoto(null)
      setErrors((prev) => ({ ...prev, photo: 'Profile photo is required.' }))
      return
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, photo: 'Photo must be JPG, PNG, or WEBP.' }))
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: 'Photo must be smaller than 4MB.' }))
      return
    }
    setErrors((prev) => ({ ...prev, photo: undefined }))
    setPhoto(file)
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) {
      next.phone = 'Phone number is required.'
    } else if (!/^[\d\s+()-]{7,20}$/.test(form.phone)) {
      next.phone = 'Enter a valid phone number.'
    }
    if (!form.dob) next.dob = 'Date of birth is required.'
    if (!form.city.trim()) next.city = 'City is required.'
    if (!form.state.trim()) next.state = 'State is required.'
    if (!form.sport) next.sport = 'Select a sport category.'
    if (!form.competitionId) next.competitionId = 'Select a competition.'
    if (!form.experience) next.experience = 'Select your experience level.'
    if (!form.terms) next.terms = 'You must agree to the terms.'
    
    if (!photo) {
      next.photo = 'Profile photo is required.'
    }

    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus('error')
      return
    }
    setStatus('loading')

    const formData = new FormData();
    formData.append('full_name', form.fullName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('dob', form.dob);
    formData.append('gender', form.gender);
    formData.append('city', form.city);
    formData.append('state', form.state);
    formData.append('sport', form.sport);
    
    const selectedComp = competitions.find(c => c.id.toString() === form.competitionId);
    formData.append('competition', selectedComp ? selectedComp.title : form.competitionId);
    
    formData.append('experience', form.experience);
    formData.append('achievements', form.achievements);
    formData.append('intro', form.intro);
    formData.append('terms_agreed', form.terms);
    formData.append('profile_photo', photo);

    try {
      await api.post('/apply/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('success')
      setShowPopup(true) // Show the popup!
      setForm(initialForm)
      setPhoto(null)
    } catch (error) {
      console.error(error.response?.data);
      if (error.response?.data?.profile_photo) {
        setErrors(prev => ({ ...prev, photo: error.response.data.profile_photo[0] }));
      }
      setStatus('error')
    }
  }

  const competitionOptions = form.sport
    ? competitions.filter((c) => c.sport === form.sport)
    : []

  return (
    <div className="relative"> {/* Added relative here for absolute popup */}
      <PageBanner
        title="Apply Now"
        subtitle="Register your interest for an upcoming competition."
      />

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Removed the top green banner and replaced with popup below */}

          <form onSubmit={handleSubmit} className="mt-8 space-y-8" noValidate>
            {/* Personal info */}
            <div>
              <h2 className="form-section-title">Personal Information</h2>
              <div className="apply-form-grid mt-4">
                <div>
                  <label htmlFor="fullName" className="label-field">Full Name *</label>
                  <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} className="input-field" />
                  {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="label-field">Email *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="label-field">Phone *</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="input-field" />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="dob" className="label-field">Date of Birth *</label>
                  <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} className="input-field" />
                  {errors.dob && <p className="error-text">{errors.dob}</p>}
                </div>
                <div>
                  <label htmlFor="gender" className="label-field">Gender</label>
                  <select id="gender" name="gender" value={form.gender} onChange={handleChange} className="input-field">
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="label-field">City *</label>
                  <input id="city" name="city" type="text" value={form.city} onChange={handleChange} className="input-field" />
                  {errors.city && <p className="error-text">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="label-field">State *</label>
                  <input id="state" name="state" type="text" value={form.state} onChange={handleChange} className="input-field" />
                  {errors.state && <p className="error-text">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Sport info */}
            <div>
              <h2 className="form-section-title">Competition Details</h2>
              <div className="apply-form-grid mt-4">
                
                <div>
                  <label htmlFor="sport" className="label-field">Sport Category *</label>
                  <select id="sport" name="sport" value={form.sport} onChange={handleChange} className="input-field">
                    <option value="">Select Sport...</option>
                    {dynamicSports.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.sport && <p className="error-text">{errors.sport}</p>}
                </div>

                <div>
                  <label htmlFor="competitionId" className="label-field">Competition *</label>
                  <select 
                    id="competitionId" 
                    name="competitionId" 
                    value={form.competitionId} 
                    onChange={handleChange} 
                    className="input-field"
                    disabled={!form.sport}
                  >
                    {!form.sport ? (
                      <option value="">Select a sport first...</option>
                    ) : competitionOptions.length === 0 ? (
                      <option value="">No open competitions available</option>
                    ) : (
                      <>
                        <option value="">Select Competition...</option>
                        {competitionOptions.map((c) => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </>
                    )}
                  </select>
                  {errors.competitionId && <p className="error-text">{errors.competitionId}</p>}
                </div>

                <div>
                  <label htmlFor="experience" className="label-field">Experience Level *</label>
                  <select id="experience" name="experience" value={form.experience} onChange={handleChange} className="input-field">
                    <option value="">Select...</option>
                    {experienceLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                  {errors.experience && <p className="error-text">{errors.experience}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="achievements" className="label-field">Previous Achievements</label>
                <textarea id="achievements" name="achievements" rows={3} value={form.achievements} onChange={handleChange} className="input-field" placeholder="List notable achievements..." />
              </div>
              <div className="mt-4">
                <label htmlFor="intro" className="label-field">Short Introduction</label>
                <textarea id="intro" name="intro" rows={3} value={form.intro} onChange={handleChange} className="input-field" placeholder="Tell us about yourself..." />
              </div>
            </div>

            {/* Photo upload */}
            <div>
              <h2 className="form-section-title">Profile Photo *</h2>
              <div className="mt-4">
                <label htmlFor="photo" className="label-field">Profile Photograph (JPG/PNG/WEBP, max 4MB)</label>
                <input 
                  id="photo" 
                  name="photo" 
                  type="file" 
                  accept="image/jpeg,image/png,image/webp" 
                  onChange={handlePhoto} 
                  className="input-field" 
                />
                {errors.photo && <p className="error-text">{errors.photo}</p>}
                {photo && (
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                    Selected: {photo.name}
                  </p>
                )}
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-1" />
                <span>I agree to the terms and conditions and confirm the information provided is accurate. *</span>
              </label>
              {errors.terms && <p className="error-text">{errors.terms}</p>}
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-4">
              <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-display font-bold uppercase text-slate-900 dark:text-white mb-2">
              Success!
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Application submitted successfully! Our team will review it and get back to you.
            </p>
            <Button 
              onClick={() => {
                setShowPopup(false);
                navigate('/'); // <-- Navigates to Home Page
              }} 
              className="w-full"
            >
              Close & Go Home
            </Button>
          </div>
        </div>
      )}

    </div>
  )
}