import { CATEGORY_META } from '../data.js'

export default function CategoryBadge({ category }) {
  const meta = CATEGORY_META[category] || { icon: '🐾', color: '#1B5E3B' }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
    >
      <span>{meta.icon}</span>
      {category}
    </span>
  )
}
