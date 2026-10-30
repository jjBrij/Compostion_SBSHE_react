import { Star } from 'lucide-react'
import { getImageUrl } from '../utils/getImageUrl'


export default function TestimonialCard({ testimonial }) {
  const { name, sport, rating, quote, image } = testimonial
  return (
    <figure className="card-surface flex h-full flex-col p-6">
      <div className="flex items-center gap-1 text-amber-400" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
      <img
  src={getImageUrl(testimonial.image)}
  alt={testimonial.name}
  loading="lazy"
  className="h-11 w-11 rounded-full object-cover"
/>

        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{sport}</p>
        </div>
      </figcaption>
    </figure>
  )
}