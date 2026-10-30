import { getImageUrl } from '../utils/getImageUrl'

export default function GalleryCard({ item, onClick, index }) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group relative block w-full overflow-hidden rounded-2xl bg-slate-900 text-left shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      // Stagger the animation start time based on index (e.g., 0.2s, 0.4s, etc.)
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <img
        src={getImageUrl(item.image)}
        alt={item.title}
        loading="lazy"
        // We apply the 'animate-random-motion' class here
        className="animate-random-motion h-56 w-full object-cover transition duration-500 group-hover:scale-105 group-hover:!rotate-0 group-hover:!translate-x-0 group-hover:!translate-y-0 sm:h-64"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white pointer-events-none">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
          {item.category}
        </p>
        <h3 className="font-display text-lg font-bold uppercase">{item.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-200">{item.description}</p>
      </div>
    </button>
  )
}