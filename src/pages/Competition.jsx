import { useMemo, useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import CompetitionCard from '../components/CompetitionCard'
import api from '../utils/api'
import '../styles/Competition.css'

// Best to extract categories dynamically from the backend, but hardcoded is fine for now
const categories = ['All', 'Cricket', 'Bodybuilding', 'Football', 'Athletics', 'Other']

export default function Competition() {
  const [competitions, setCompetitions] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/competitions/')
      .then(res => {
        setCompetitions(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    return competitions.filter((c) => {
      // NOTE: In your Django backend, the field is called 'sport', not 'category'
      const matchesCategory =
        activeCategory === 'All' || c.sport === activeCategory
      
      const matchesQuery =
        query.trim() === '' ||
        c.title.toLowerCase().includes(query.trim().toLowerCase())
      
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query, competitions]) // <-- FIXED: Added competitions here

  return (
    <div>
      <PageBanner
        title="Competitions"
        subtitle="Explore our full calendar of professional sporting events."
      />

      <section className="container-page py-12">
        {/* Filters + search */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`filter-chip ${activeCategory === cat ? 'filter-chip--active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search competitions..."
              aria-label="Search competitions by title"
              className="input-field !pl-10"
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading competitions...</div>
        ) : (
          <>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Showing {filtered.length} competition{filtered.length === 1 ? '' : 's'}
            </p>

            {filtered.length > 0 ? (
              <div className="competition-grid mt-4">
                {filtered.map((c) => (
                  <CompetitionCard key={c.id} competition={c} />
                ))}
              </div>
            ) : (
              <div className="card-surface mt-6 p-10 text-center">
                <p className="text-slate-600 dark:text-slate-300">
                  No competitions match your filters. Try a different category or search term.
                </p>
              </div>
            )}
          </>
        )}

        <p className="mt-8 text-xs text-slate-400">
          Note: Event dates and locations shown are placeholders and will be updated
          with confirmed details.
        </p>
      </section>
    </div>
  )
}