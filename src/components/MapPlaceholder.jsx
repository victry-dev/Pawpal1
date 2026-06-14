import { CATEGORY_META } from '../data.js'

export default function MapPlaceholder({ listings }) {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-brand-surface shadow-card">
      {/* Fake street grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(#c8e6c9 1px, transparent 1px), linear-gradient(90deg, #c8e6c9 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Diagonal "road" */}
      <div className="absolute -left-10 top-1/2 h-3 w-[140%] -rotate-12 rounded-full bg-white/70" />
      <div className="absolute left-1/3 top-0 h-[140%] w-3 rotate-6 rounded-full bg-white/70" />

      {/* Coloured pin dots */}
      {listings.map((l) => {
        const color = CATEGORY_META[l.category]?.color || '#1B5E3B'
        return (
          <div
            key={l.id}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
            style={{ top: l.pin.top, left: l.pin.left }}
          >
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] shadow-md ring-2 ring-white"
              style={{ backgroundColor: color }}
            >
              <span>{CATEGORY_META[l.category]?.icon || '🐾'}</span>
            </div>
            <div
              className="h-2 w-2 -mt-1 rotate-45"
              style={{ backgroundColor: color }}
            />
          </div>
        )
      })}

      {/* "You are here" */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-green shadow">
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
        You are here
      </div>
    </div>
  )
}
