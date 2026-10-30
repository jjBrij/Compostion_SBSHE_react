import { siteConfig } from '../config/siteConfig'

/**
 * Reusable page banner for interior pages.
 */
export default function PageBanner({ title, subtitle, image }) {
  const bg = image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop'
  return (
    <section
      className="relative overflow-hidden bg-brand-navy text-white"
      aria-label={`${title} banner`}
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="eager"
      />
      <div className="relative container-page flex min-h-[220px] flex-col justify-center py-16 sm:min-h-[280px]">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-orange">
          {siteConfig.companyName}
        </p>
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-slate-200 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  )
}