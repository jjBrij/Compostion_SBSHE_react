import { useMemo, useState, useEffect } from 'react'
import { X } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import GalleryCard from '../components/GalleryCard'
import { getImageUrl } from '../utils/getImageUrl'
import api from '../utils/api'
import '../styles/Gallery.css'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeItem, setActiveItem] = useState(null)
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/gallery/')
      .then(res => {
        setGalleryItems(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // Extract unique categories dynamically from the backend data
  const dynamicCategories = useMemo(() => {
    if (!galleryItems.length) return ['All']
    const uniqueCategories = [...new Set(galleryItems.map(item => item.category))]
    return ['All', ...uniqueCategories]
  }, [galleryItems])

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((g) => g.category === activeCategory),
    [activeCategory, galleryItems]
  )

  return (
    <div>
      <PageBanner
        title="Gallery"
        subtitle="Photos from our competitions, ceremonies, and training events."
      />

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2">
          {/* Render dynamic categories */}
          {dynamicCategories.map((cat) => (
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

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading gallery...</div>
        ) : (
          <div className="gallery-grid mt-8">
            {filtered.map((item, index) => (
              <GalleryCard key={item.id} item={item} onClick={setActiveItem} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItem(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close image viewer"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X size={20} />
            </button>
            <img
              src={getImageUrl(activeItem.image)}
              alt={activeItem.title}
              className="max-h-[70vh] w-full object-contain bg-black"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                {activeItem.category}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold uppercase">
                {activeItem.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}