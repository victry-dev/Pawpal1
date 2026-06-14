import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store.jsx'
import { usePhotos } from '../context/PhotoContext.jsx'
import { LISTINGS, CATEGORY_META, getPhoto } from '../data.js'
import CategoryBadge from '../components/CategoryBadge.jsx'
import CoverImage from '../components/CoverImage.jsx'

export default function Profile() {
  const navigate = useNavigate()
  const { user, bookings, logout } = useApp()
  const { photosMap } = usePhotos()
  // Bookings store the place name, not its id — map name → id to find its photo.
  const idByName = useMemo(
    () => Object.fromEntries(LISTINGS.map((l) => [l.name, l.id])),
    [],
  )

  const onLogout = () => {
    logout()
    navigate('/auth', { replace: true })
  }

  return (
    <div className="animate-fade-up flex flex-col gap-5 px-5 pt-12">
      <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>

      {/* Avatar card */}
      <div className="flex items-center gap-4 rounded-3xl bg-brand-green p-5 text-white shadow-card">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-extrabold">
          {initials(user.petName)}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-extrabold">{user.petName} 🐾</h2>
          <p className="truncate text-sm text-brand-surface/90">{user.email}</p>
          <span className="mt-1 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold">
            📍 DLF Cyberpark, Sec 20, Gurugram
          </span>
        </div>
      </div>

      {/* Refer & Earn */}
      <ReferEarn petName={user.petName} />

      {/* My Bookings */}
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-gray-900">My Bookings</h2>
          <span className="text-xs font-medium text-gray-400">{bookings.length} total</span>
        </div>

        {bookings.map((b) => {
          const listingId = idByName[b.listing]
          const photoSrc = photosMap[listingId]?.[0] || getPhoto(listingId)
          return (
            <div key={b.id} className="flex gap-3 rounded-2xl bg-white p-3 shadow-card">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1B5E3B] to-[#2D7A4F] text-2xl">
                  {CATEGORY_META[b.category]?.icon || '🐾'}
                </div>
                <CoverImage
                  src={photoSrc}
                  alt={b.listing}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <CategoryBadge category={b.category} />
                  <span className="shrink-0 text-xs font-bold text-gray-400">{b.id}</span>
                </div>
                <h3 className="mt-1 truncate text-sm font-bold text-gray-900">{b.listing}</h3>
                <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                  <p className="truncate text-xs text-gray-500">
                    {b.service} · {b.slot}
                  </p>
                  <span className="shrink-0 text-sm font-bold text-brand-green">
                    {b.price === 0 ? 'Free' : `₹${b.price}`}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Menu */}
      <section className="overflow-hidden rounded-2xl bg-white shadow-card">
        <MenuRow icon="🐶" label="Pet Details" />
        <MenuRow icon="❤️" label="Saved Places" />
        <MenuRow icon="🔔" label="Notifications" />
        <MenuRow icon="❓" label="Help & Support" />
      </section>

      <button
        onClick={onLogout}
        className="rounded-2xl border border-red-200 bg-red-50 py-3.5 text-base font-bold text-red-500 transition active:scale-[0.99]"
      >
        Log Out
      </button>

      <p className="pb-2 text-center text-[11px] text-gray-300">PawPal v1.0 · Demo build</p>
    </div>
  )
}

function ReferEarn({ petName }) {
  const code = (petName || 'PAWPAL').toUpperCase().replace(/\s+/g, '') + '200'
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Clipboard may be unavailable (e.g. insecure context) — still show feedback.
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="flex flex-col gap-1.5">
      <div className="rounded-3xl bg-brand-green p-5 text-white shadow-card">
        <h2 className="text-lg font-extrabold">Refer a friend, earn ₹200</h2>
        <p className="mt-1 text-sm leading-relaxed text-brand-surface/90">
          Share your code. When they book their first service, you both get ₹200 off.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-xl border-2 border-dashed border-white/50 px-4 py-2 text-base font-extrabold tracking-widest">
            {code}
          </span>
          <button
            onClick={copy}
            className="shrink-0 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow active:scale-95 transition"
          >
            {copied ? 'Copied ✓' : 'Copy Code'}
          </button>
        </div>
      </div>
      <p className="px-1 text-xs text-gray-400">0 friends referred so far</p>
    </section>
  )
}

function MenuRow({ icon, label }) {
  return (
    <button className="flex w-full items-center justify-between border-b border-gray-50 px-4 py-3.5 text-left last:border-0 active:bg-gray-50">
      <span className="flex items-center gap-3 text-sm font-semibold text-gray-700">
        <span className="text-lg">{icon}</span>
        {label}
      </span>
      <span className="text-gray-300">›</span>
    </button>
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
