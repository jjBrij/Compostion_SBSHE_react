import { Trophy } from 'lucide-react'
import { getImageUrl } from '../utils/getImageUrl'
export default function ChampionCard({ champion }) {
  const { name, sport, title, year, position, description, image } = champion
  return (
    <article className="card-surface flex h-full flex-col overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <img
          src={getImageUrl(champion.image)}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white">
          <Trophy size={12} /> {position}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">
          {sport} · {year}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold uppercase text-slate-900 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </p>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>
    </article>
  )
}