export default function SearchBar({ value, onChange, placeholder = 'Search services…' }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
      <span className="text-gray-400">🔍</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
    </div>
  )
}
