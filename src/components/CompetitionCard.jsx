import { CalendarDays, MapPin, Tag } from 'lucide-react'
import Button from './Button'
import api from '../utils/api'
import { getImageUrl } from '../utils/getImageUrl'



function statusClass(status) {
  switch (status) {
    case 'Registration Open':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
    case 'Coming Soon':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
    case 'Registration Closed':
      return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
    default:
      return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
  }
}

export default function CompetitionCard({ competition }) {
  const { title, description, image, category, location, date, status, sport } = competition

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(competition.image)}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
          <Tag size={12} /> {sport || category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0 text-brand-red" /> {location}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays size={14} className="shrink-0 text-brand-red" />
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
              status
            )}`}
          >
            {status}
          </span>
          <Button to={`/competition/${competition.id}`} variant="primary" className="!px-4 !py-2 text-sm">
            View Details
          </Button>
        </div>
      </div>
    </article>
  )
}