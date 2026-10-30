export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>
      )}
    </div>
  )
}