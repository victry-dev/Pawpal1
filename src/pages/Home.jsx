import { useMemo, useState } from 'react'
import { LISTINGS, FEATURED_EVENT, UPCOMING_EVENTS } from '../data.js'
import { useApp } from '../store.jsx'
import BannerCarousel from '../components/BannerCarousel.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryPills from '../components/CategoryPills.jsx'
import MapPlaceholder from '../components/MapPlaceholder.jsx'
import ServiceCard from '../components/ServiceCard.jsx'

export default function Home() {
  const { user } = useApp()
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LISTINGS.filter((l) => {
      const matchCat = category === 'All' || l.category === category
      const matchQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.area.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [category, query])

  const nearby = useMemo(
    () => [...filtered].sort((a, b) => a.distance - b.distance),
    [filtered],
  )
  const topRated = useMemo(
    () => [...filtered].sort((a, b) => b.rating - a.rating),
    [filtered],
  )

  const bannerEvents = useMemo(
    () => [
      {
        id: FEATURED_EVENT.id,
        title: FEATURED_EVENT.title,
        venue: FEATURED_EVENT.venue,
        date: FEATURED_EVENT.date,
        priceLabel: `₹${FEATURED_EVENT.price}`,
      },
      ...UPCOMING_EVENTS.map((ev) => ({ ...ev, priceLabel: 'Free' })),
    ],
    [],
  )

  return (
    <div className="animate-fade-up flex flex-col gap-5 px-5 pt-12">
      {/* Auto-scrolling events banner — full bleed at the very top */}
      <div className="-mx-5 -mt-12">
        <BannerCarousel events={bannerEvents} />
      </div>

      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Hi {user.petName} 🐾
          </h1>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-green">
            📍 DLF Cyberpark, Sec 20, Gurugram
            <span className="text-[10px] opacity-60">▼</span>
          </span>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white">
          {initials(user.petName)}
        </div>
      </header>

      <SearchBar value={query} onChange={setQuery} />

      <CategoryPills active={category} onChange={setCategory} />

      <MapPlaceholder listings={filtered} />

      {/* Nearby Services */}
      <Section title="Nearby Services" subtitle="Closest to you">
        {nearby.length === 0 ? (
          <Empty />
        ) : (
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
            {nearby.map((l) => (
              <ServiceCard key={l.id} listing={l} variant="nearby" />
            ))}
          </div>
        )}
      </Section>

      {/* Top Rated */}
      <Section title="Top Rated" subtitle="Loved by Delhi pets">
        {topRated.length === 0 ? (
          <Empty />
        ) : (
          <div className="flex flex-col gap-3">
            {topRated.map((l) => (
              <ServiceCard key={l.id} listing={l} variant="list" />
            ))}
          </div>
        )}
      </Section>

      <div className="h-2" />
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <span className="text-xs font-medium text-gray-400">{subtitle}</span>
      </div>
      {children}
    </section>
  )
}

function Empty() {
  return (
    <div className="rounded-2xl bg-brand-surface px-4 py-8 text-center text-sm text-brand-green">
      No services found 🐾
    </div>
  )
}

function initials(name) {
  return (name || 'P')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
