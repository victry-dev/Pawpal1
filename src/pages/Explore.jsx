import { useMemo, useState } from 'react'
import { LISTINGS } from '../data.js'
import SearchBar from '../components/SearchBar.jsx'
import CategoryPills from '../components/CategoryPills.jsx'
import ServiceCard from '../components/ServiceCard.jsx'

export default function Explore() {
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
    }).sort((a, b) => b.rating - a.rating)
  }, [category, query])

  return (
    <div className="animate-fade-up flex flex-col gap-4 px-5 pt-12">
      <header>
        <h1 className="text-2xl font-extrabold text-gray-900">Explore</h1>
        <p className="text-sm text-gray-400">
          {filtered.length} place{filtered.length === 1 ? '' : 's'} near DLF Cyberpark, Gurugram
        </p>
      </header>

      <SearchBar value={query} onChange={setQuery} placeholder="Search places, areas…" />
      <CategoryPills active={category} onChange={setCategory} />

      <div className="flex flex-col gap-3 pt-1">
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-brand-surface px-4 py-10 text-center text-sm text-brand-green">
            No services found 🐾
          </div>
        ) : (
          filtered.map((l) => <ServiceCard key={l.id} listing={l} variant="list" />)
        )}
      </div>
      <div className="h-2" />
    </div>
  )
}
