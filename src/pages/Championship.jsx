
import { useMemo, useState, useEffect } from 'react'
import { Trophy } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import ChampionCard from '../components/ChampionCard'
import SectionHeading from '../components/SectionHeading'
import { championSports, championYears } from '../data/champions'
import api from '../utils/api'

import '../styles/Championship.css'

export default function Championship() {
  const [sport, setSport] = useState('All')
  const [year, setYear] = useState('All')
  const [champions, setChampions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const fetchChampions = async () => {
      try {
        const res = await api.get('/champions/')

        if (!cancelled) {
          // Support both an array and Django REST Framework pagination.
          const data = Array.isArray(res.data)
            ? res.data
            : res.data.results

          setChampions(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error('Failed to fetch champions:', err)

        if (!cancelled) {
          setError('Unable to load champions. Please try again later.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchChampions()

    return () => {
      cancelled = true
    }
  }, [])

  const featured =
    champions.find((c) => c.featured) || champions[0] || null

  const filtered = useMemo(() => {
    return champions.filter((c) => {
      const matchesSport = sport === 'All' || c.sport === sport
      const matchesYear = year === 'All' || String(c.year) === year

      return matchesSport && matchesYear
    })
  }, [champions, sport, year])

  return (
    <div>
      <PageBanner
        title="Championship"
        subtitle="Honoring the athletes who rose above the competition."
      />

      {/* Featured champion */}
      <section className="container-page py-12">
        {loading ? (
          <div className="card-surface p-10 text-center">
            Loading champions...
          </div>
        ) : error ? (
          <div className="card-surface p-10 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : featured ? (
          <div className="featured-champion grid items-center gap-0 md:grid-cols-2">
            <div className="relative h-64 md:h-full md:min-h-[320px]">
              <img
                src={
                  featured.image ||
                  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop'
                }
                alt={featured.name || 'Featured champion'}
                className="featured-champion-image"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop'
                }}
              />
            </div>

            <div className="relative p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase">
                <Trophy size={14} /> Featured Champion
              </span>

              <h2 className="mt-4 font-display text-3xl font-extrabold uppercase">
                {featured.name || 'Champion'}
              </h2>

              <p className="mt-1 text-brand-orange font-semibold">
                {featured.title || 'Championship Winner'}
                {' · '}
                {featured.year || 'Year unavailable'}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {featured.description || 'Champion details coming soon.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="card-surface p-10 text-center">
            No champions available yet.
          </div>
        )}
      </section>

      {/* Filters + grid */}
      <section className="container-page pb-16">
        <SectionHeading
          eyebrow="Hall of Fame"
          title="Previous Champions"
          subtitle="Filter by sport and year to explore our championship records."
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {championSports.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSport(s)}
                className={`filter-chip ${
                  sport === s ? 'filter-chip--active' : ''
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <label className="sr-only" htmlFor="year-filter">
              Filter by year
            </label>

            <select
              id="year-filter"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="input-field !w-auto"
            >
              {championYears.map((y) => (
                <option key={y} value={y}>
                  {y === 'All' ? 'All Years' : y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 p-10 text-center">
            Loading champion records...
          </div>
        ) : error ? (
          <div className="mt-8 p-10 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="champion-grid mt-8">
            {filtered.map((c, index) => (
              <ChampionCard
                key={c.id ?? `${c.name}-${c.year}-${index}`}
                champion={c}
              />
            ))}
          </div>
        ) : (
          <div className="card-surface mt-8 p-10 text-center">
            <p className="text-slate-600 dark:text-slate-300">
              No champions match the selected filters.
            </p>
          </div>
        )}

        <p className="mt-8 text-xs text-slate-400">
          Champion records shown are placeholders for demonstration and will be
          replaced with verified results.
        </p>
      </section>
    </div>
  )
}
