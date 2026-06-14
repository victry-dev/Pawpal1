import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, makeBookingId } from '../store.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'

const EVENT_ID = 'sunday-dog-meetup'

const COMPETITIONS = [
  { icon: '🎯', title: 'Best Trick', subtitle: 'Show us what your dog can do' },
  { icon: '👗', title: 'Best Dressed', subtitle: 'Dress your dog to impress' },
  { icon: '🏆', title: 'Cutest Dog', subtitle: 'Let the crowd decide' },
  { icon: '📢', title: 'Loudest Bark', subtitle: "Who's the loudest in the park?" },
]

const BRING = [
  'Your dog on a leash',
  'Water bowl and water',
  'Poop bags',
  "Dog's favourite treat for the competitions",
  'A good mood',
]

const RULES = [
  'All dogs must be vaccinated',
  'No aggressive dogs allowed',
  'Keep your dog leashed at all times during entry',
  'Clean up after your dog',
  'Respect other dogs and owners',
]

export default function EventDetail() {
  const navigate = useNavigate()
  const { user } = useApp()
  const isAdmin = user?.email === 'varshik@gmail.com'
  const [pass, setPass] = useState(null)

  if (pass) return <EventPassConfirmed passId={pass} onClose={() => navigate('/events')} />

  return (
    <div className="animate-fade-up flex flex-col pb-24">
      {/* Hero — photo gallery with overlaid back button + event name */}
      <div className="relative">
        <PhotoGallery listingId={EVENT_ID} isAdmin={isAdmin} />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-12 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur active:scale-95"
          aria-label="Back"
        >
          ←
        </button>
        <div className="pointer-events-none absolute bottom-3 left-4 right-4">
          <h1
            className="text-2xl font-extrabold text-white"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.45)' }}
          >
            Sunday Dog Meetup
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-5">
        {/* Event info card */}
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-4 shadow-card">
          <InfoRow icon="📅" label="Date & Time" value="Sunday, Jun 22 · 7:00 AM – 10:00 AM" />
          <InfoRow icon="📍" label="Location" value="Lodhi Garden, New Delhi" />
          <InfoRow icon="🐕" label="Attendees" value="34 dogs attending" />
        </div>

        {/* About */}
        <section>
          <h2 className="mb-1.5 text-base font-bold text-gray-900">About this meetup</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Join us for a morning of play, sniffs, and new friendships at the beautiful Lodhi
            Garden. All friendly dogs welcome. Owners must keep dogs on leash during entry and
            exit. Water bowls and waste bags will be provided.
          </p>
        </section>

        {/* Competitions */}
        <section>
          <h2 className="mb-3 text-base font-bold text-brand-green">Competitions</h2>
          <div className="grid grid-cols-2 gap-3">
            {COMPETITIONS.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border-[0.5px] border-brand-green bg-white p-3"
              >
                <div className="text-2xl leading-none">{c.icon}</div>
                <p className="mt-2 text-[13px] font-bold text-gray-900">{c.title}</p>
                <p className="text-[11px] text-gray-500">{c.subtitle}</p>
                <p className="mt-1 text-[11px] font-bold text-brand-orange">Prize: ₹500 voucher</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to bring */}
        <section>
          <h2 className="mb-2 text-base font-bold text-gray-900">What to bring</h2>
          <BulletList items={BRING} />
        </section>

        {/* Rules */}
        <section>
          <h2 className="mb-2 text-base font-bold text-gray-900">Rules</h2>
          <BulletList items={RULES} />
        </section>
      </div>

      {/* Sticky bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
        <span className="text-lg font-extrabold text-brand-green">₹199 per dog</span>
        <button
          onClick={() => setPass(makeBookingId())}
          className="rounded-2xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition active:scale-[0.99]"
        >
          Buy Pass →
        </button>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg leading-none">{icon}</span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

function BulletList({ items }) {
  return (
    <ul className="flex flex-col gap-1.5 text-sm text-gray-600">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span className="text-brand-green">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function EventPassConfirmed({ passId, onClose }) {
  return (
    <div className="animate-fade-up flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-surface text-4xl">
        🎟️
      </div>
      <h1 className="mt-4 text-2xl font-extrabold text-brand-green">Pass Confirmed!</h1>
      <p className="mt-1 text-sm text-gray-500">See you there! 🐾</p>

      <div className="mt-6 w-full rounded-3xl bg-white p-6 text-center shadow-card">
        <QrPlaceholder />
        <p className="mt-3 text-sm font-bold text-gray-900">Sunday Dog Meetup</p>
        <p className="text-xs text-gray-500">🗓️ Sunday, Jun 22 · 📍 Lodhi Garden, New Delhi</p>
        <p className="mt-2 text-sm font-bold text-brand-orange">Amount paid · ₹199</p>
        <p className="mt-1 text-xs font-semibold text-brand-green">Pass ID · {passId}</p>
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
  const cells = Array.from({ length: 121 }, (_, i) => {
    const r = Math.floor(i / 11)
    const c = i % 11
    const corner = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3)
    return corner || (i * 7) % 3 === 0
  })
  return (
    <div className="mx-auto grid h-40 w-40 grid-cols-11 gap-0.5 rounded-xl bg-white p-2">
      {cells.map((on, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[1px] ${on ? 'bg-brand-green' : 'bg-transparent'}`}
        />
      ))}
    </div>
  )
}
