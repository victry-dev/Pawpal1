import { CATEGORIES } from '../data.js'

export default function CategoryPills({ active, onChange }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-brand-green text-white shadow'
                : 'bg-brand-surface text-brand-green'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
