import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FEATURED_EVENT, UPCOMING_EVENTS, getPhoto } from '../data.js'
import { makeBookingId } from '../store.jsx'
import { usePhotos } from '../context/PhotoContext.jsx'
import CoverImage from '../components/CoverImage.jsx'

export default function Events() {
  const navigate = useNavigate()
  const { photosMap } = usePhotos()
  const featuredPhoto = photosMap[FEATURED_EVENT.id]?.[0] || getPhoto(FEATURED_EVENT.id)
  const [pass, setPass] = useState(null) // pass id once bought

  if (pass) return <PassConfirmed passId={pass} onClose={() => setPass(null)} />

  return (
    <div className="animate-fade-up flex flex-col gap-5 px-5 pt-12">
      <header>
        <h1 className="text-2xl font-extrabold text-gray-900">Events</h1>
        <p className="text-sm text-gray-400">Meetups & pawties near you</p>
      </header>

      {/* Featured event — tap to open detail */}
      <div
        onClick={() => navigate(`/event/${FEATURED_EVENT.id}`)}
        className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-card active:scale-[0.99] transition"
      >
        <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-green to-emerald-500">
          <span className="text-7xl">{FEATURED_EVENT.emoji}</span>
          <CoverImage
            src={featuredPhoto}
            alt={FEATURED_EVENT.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold text-white">
            ⭐ Featured
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-brand-green">
            🐾 {FEATURED_EVENT.attending} dogs attending
          </span>
        </div>
        <div className="p-5">
          <h2 className="text-lg font-extrabold text-gray-900">{FEATURED_EVENT.title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            📍 {FEATURED_EVENT.venue} · 🗓️ {FEATURED_EVENT.date}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {FEATURED_EVENT.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-extrabold text-brand-green">
              ₹{FEATURED_EVENT.price}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPass(makeBookingId())
              }}
              className="rounded-2xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition active:scale-[0.99]"
            >
              Buy Pass
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-900">Upcoming</h2>
        {UPCOMING_EVENTS.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-surface text-3xl">
              {ev.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-bold text-gray-900">{ev.title}</h3>
                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                  Coming Soon
                </span>
              </div>
              <p className="truncate text-xs text-gray-500">
                📍 {ev.venue} · 🗓️ {ev.date}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-400">
              Soon
            </span>
          </div>
        ))}
      </section>
      <div className="h-2" />
    </div>
  )
}

function PassConfirmed({ passId, onClose }) {
  return (
    <div className="animate-fade-up flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-surface text-4xl">
        🎟️
      </div>
      <h1 className="mt-4 text-2xl font-extrabold text-brand-green">Pass Confirmed!</h1>
      <p className="mt-1 text-sm text-gray-500">
        See you at <span className="font-semibold text-gray-700">{FEATURED_EVENT.title}</span>
      </p>

      {/* QR placeholder */}
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-card">
        <QrPlaceholder />
        <p className="mt-3 text-xs font-semibold text-gray-400">Show this at the gate</p>
        <p className="text-sm font-bold text-brand-green">Pass ID · {passId}</p>
      </div>

      <div className="mt-5 w-full rounded-2xl bg-brand-surface px-4 py-3 text-sm text-brand-green">
        🗓️ {FEATURED_EVENT.date} · 📍 {FEATURED_EVENT.venue}
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full rounded-2xl bg-brand-green py-3.5 text-base font-bold text-white shadow-lg transition active:scale-[0.99]"
      >
        Back to Events
      </button>
    </div>
  )
}

function QrPlaceholder() {
  // Deterministic-looking QR grid built from a fixed pattern.
  const cells = Array.from({ length: 121 }, (_, i) => {
    const r = Math.floor(i / 11)
    const c = i % 11
    const corner =
      (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3)
    return corner || (i * 7) % 3 === 0
  })
  return (
    <div className="grid h-40 w-40 grid-cols-11 gap-0.5 rounded-xl bg-white p-2">
      {cells.map((on, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[1px] ${on ? 'bg-brand-green' : 'bg-transparent'}`}
        />
      ))}
    </div>
  )
}
