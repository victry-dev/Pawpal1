import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Auto-rotating "upcoming event near you" banner shown at the top of Home.
export default function BannerCarousel({ events }) {
  const navigate = useNavigate()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (events.length <= 1) return
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % events.length)
    }, 3000)
    return () => clearInterval(t)
  }, [events.length])

  return (
    <div>
      <div
        onClick={() => navigate('/events')}
        className="relative cursor-pointer overflow-hidden bg-brand-green"
      >
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {events.map((ev) => (
            <div key={ev.id} className="w-full shrink-0 px-5 pb-4 pt-9 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-surface/80">
                Upcoming near you
              </p>
              <div className="mt-1 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-extrabold">{ev.title}</h3>
                  <p className="truncate text-xs text-white/85">
                    📍 {ev.venue} · 🗓️ {ev.date}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">
                  {ev.priceLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 pt-2">
        {events.map((ev, i) => (
          <span
            key={ev.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? 'w-4 bg-brand-green' : 'w-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
