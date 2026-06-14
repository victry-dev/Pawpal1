import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { getListing } from '../data.js'
import PawIcon from '../components/PawIcon.jsx'
import CategoryBadge from '../components/CategoryBadge.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = getListing(id)

  const [slot, setSlot] = useState(null)
  const [serviceIdx, setServiceIdx] = useState(0)
  const [pickup, setPickup] = useState(false)
  const [daycareSlot, setDaycareSlot] = useState('')
  const [showCall, setShowCall] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!listing) return <Navigate to="/home" replace />

  const isTrainer = listing.category === 'Trainer'
  const isDaycare = listing.category === 'Daycare'
  const isStore = listing.category === 'Store'
  const allowsPickup = ['Daycare', 'Veterinary', 'Groomer'].includes(listing.category)
  const effectiveSlot = isDaycare ? daycareSlot : slot

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${listing.name} ${listing.area} Delhi`,
  )}`
  const openDirections = () => window.open(mapsUrl, '_blank', 'noopener')
  const goPayBill = () =>
    navigate('/paybill', {
      state: { storeName: listing.name, storeAddress: listing.address },
    })
  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(listing.phone)
    } catch {
      /* clipboard may be unavailable */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const goBook = () => {
    const service = listing.services[serviceIdx]
    navigate(`/booking/${listing.id}`, {
      state: {
        serviceName: service.name,
        price: service.price,
        slot: effectiveSlot,
        pickup: allowsPickup ? pickup : false,
        category: listing.category,
      },
    })
  }

  return (
    <div className="animate-fade-up flex flex-col pb-28">
      {/* Hero — photo gallery (admin can upload) with overlaid back button */}
      <div className="relative">
        <PhotoGallery listingId={listing.id} />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-12 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur active:scale-95"
          aria-label="Back"
        >
          ←
        </button>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-5">
        {/* Title block */}
        <div>
          <CategoryBadge category={listing.category} />
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-gray-900">
            {listing.name}
          </h1>
          {isTrainer && (
            <p className="text-sm font-medium text-brand-green">{listing.speciality}</p>
          )}
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <PawIcon /> {listing.rating}
            {isTrainer ? (
              <span> · 📍 {listing.area}</span>
            ) : (
              <span> · {listing.reviews} reviews · {listing.distance} km away</span>
            )}
          </p>
        </div>

        {/* Store action buttons + offer banner */}
        {isStore && (
          <>
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white p-3 shadow-card">
              <ActionBtn icon="📍" label="Directions" onClick={openDirections} />
              <ActionBtn icon="📞" label="Call" onClick={() => setShowCall(true)} />
              <ActionBtn icon="💳" label="Pay Bill" onClick={goPayBill} />
            </div>
            <div className="rounded-xl bg-brand-orange py-1.5 text-center text-[11px] font-semibold text-white">
              10% off when you pay through the app
            </div>
          </>
        )}

        {/* Address */}
        <div className="flex items-start gap-2 rounded-2xl bg-brand-surface px-4 py-3">
          <span>📍</span>
          <p className="text-sm font-medium text-brand-green">{listing.address}</p>
        </div>

        {/* Description */}
        <section>
          <h2 className="mb-1.5 text-base font-bold text-gray-900">About</h2>
          <p className="text-sm leading-relaxed text-gray-600">{listing.description}</p>
          {isStore && listing.categories?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {listing.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-brand-surface px-2.5 py-1 text-[11px] font-semibold text-brand-green"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Trainer: pet type + price (no multi-service selection) */}
        {isTrainer && (
          <section className="flex items-center gap-3">
            <span className="rounded-full bg-brand-surface px-3 py-1.5 text-xs font-semibold text-brand-green">
              🐕 {listing.petType}
            </span>
            <span className="text-base font-bold text-brand-orange">₹1,000 / day</span>
          </section>
        )}

        {/* Services with prices (not for trainers or stores) */}
        {!isTrainer && !isStore && (
          <section>
            <h2 className="mb-2 text-base font-bold text-gray-900">Services</h2>
            <div className="flex flex-col gap-2">
              {listing.services.map((s, i) => {
                const active = serviceIdx === i
                return (
                  <button
                    key={s.name}
                    onClick={() => setServiceIdx(i)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? 'border-brand-green bg-brand-surface'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                          active
                            ? 'border-brand-green bg-brand-green text-white'
                            : 'border-gray-300 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      {s.name}
                    </span>
                    <span className="text-sm font-bold text-brand-green">
                      {s.price === 0 ? 'Free' : `₹${s.price}`}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {/* Timings */}
        <section className="flex items-center gap-2 rounded-2xl border border-gray-100 px-4 py-3 shadow-card">
          <span className="text-lg">🕒</span>
          <div>
            <p className="text-xs font-semibold text-gray-400">Timings</p>
            <p className="text-sm font-semibold text-gray-800">{listing.timings}</p>
          </div>
        </section>

        {/* Pickup & Drop — daycare, veterinary, groomer */}
        {allowsPickup && (
          <PickupDrop pickup={pickup} setPickup={setPickup} category={listing.category} />
        )}

        {/* Time selection (not shown for stores) */}
        {!isStore &&
          (isDaycare ? (
          <section>
            <h2 className="mb-3 text-base font-bold text-gray-900">Select date &amp; time</h2>
            <DaycareTimePicker onChange={setDaycareSlot} />
          </section>
        ) : (
          <section>
            <h2 className="mb-2 text-base font-bold text-gray-900">Select a time slot</h2>
            <div className="flex flex-wrap gap-2">
              {listing.slots.map((s) => {
                const active = slot === s
                return (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? 'border-brand-green bg-brand-green text-white shadow'
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
            {!slot && <p className="mt-2 text-xs text-gray-400">Pick a slot to continue.</p>}
          </section>
          ))}
      </div>

      {/* Sticky CTA */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
        {isStore ? (
          <button
            onClick={goPayBill}
            className="w-full rounded-2xl bg-brand-orange py-3.5 text-base font-bold text-white shadow-lg shadow-brand-orange/30 transition active:scale-[0.99]"
          >
            💳 Pay Bill
          </button>
        ) : (
          <button
            onClick={goBook}
            disabled={!effectiveSlot}
            className={`w-full rounded-2xl py-3.5 text-base font-bold text-white shadow-lg transition active:scale-[0.99] ${
              effectiveSlot
                ? 'bg-brand-orange shadow-brand-orange/30'
                : 'cursor-not-allowed bg-gray-300 shadow-none'
            }`}
          >
            {effectiveSlot
              ? `${isTrainer ? 'Book Session' : 'Book Now'}${isDaycare ? '' : ` · ${slot}`}`
              : 'Select a slot first'}
          </button>
        )}
      </div>

      {/* Call bottom sheet */}
      {showCall && (
        <div
          className="absolute inset-0 z-30 flex items-end"
          onClick={() => setShowCall(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="animate-fade-up relative z-10 w-full rounded-t-3xl bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" />
            <h3 className="text-lg font-bold text-gray-900">{listing.name}</h3>
            <p className="mt-1 text-sm font-medium text-gray-500">{listing.phone}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={copyNumber}
                className="flex-1 rounded-2xl bg-brand-green py-3 text-sm font-bold text-white active:scale-[0.99]"
              >
                {copied ? 'Copied ✓' : 'Copy Number'}
              </button>
              <button
                onClick={() => setShowCall(false)}
                className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 active:scale-[0.99]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ActionBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-xl border-[0.5px] border-brand-green bg-white py-3 text-brand-green active:scale-95 transition"
    >
      <span className="text-xl leading-none">{icon}</span>
      <span className="text-[12px] font-semibold">{label}</span>
    </button>
  )
}

/* ---------- Pickup & Drop (daycare only) ---------- */

function PickupDrop({ pickup, setPickup, category }) {
  const isVet = category === 'Veterinary'
  const icon = isVet ? '🏥' : '🚗'
  const subtitle = isVet
    ? 'We pick up your pet and bring them back after the visit'
    : 'We pick up and drop your pet'
  return (
    <section>
      <h2 className="mb-2 text-base font-bold text-gray-900">Pickup &amp; Drop</h2>
      <div className="rounded-2xl border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <span className="text-xl">{icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Door-to-door service</p>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setPickup((v) => !v)}
            role="switch"
            aria-checked={pickup}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              pickup ? 'bg-brand-green' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
                pickup ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
        {pickup && (
          <p className="mt-3 text-xs font-semibold text-brand-orange">
            Flat ₹149 for pickup + drop
          </p>
        )}
      </div>
    </section>
  )
}

/* ---------- Playo-style daycare time picker ---------- */

const START_HOUR = 7
const END_HOUR = 19
const PX_PER_HOUR = 34
const DURATION_MAX = 8

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

function formatHour(h) {
  const period = h >= 12 ? 'PM' : 'AM'
  let hr = h % 12
  if (hr === 0) hr = 12
  return `${hr}:00 ${period}`
}

function shortHour(h) {
  if (h === 12) return '12p'
  if (h < 12) return `${h}a`
  return `${h - 12}p`
}

function dateLabel(d) {
  return `${WEEKDAY_SHORT[d.getDay()]} ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`
}

function DaycareTimePicker({ onChange }) {
  const days = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      return d
    })
  }, [])

  const [dateIdx, setDateIdx] = useState(0)
  const [start, setStart] = useState(9)
  const [end, setEnd] = useState(10) // default 9–10 AM (1 hour)
  const trackRef = useRef(null)
  const dragRef = useRef(null)

  const selDate = days[dateIdx]
  const duration = end - start

  useEffect(() => {
    onChange(`${dateLabel(selDate)} · ${formatHour(start)} – ${formatHour(end)}`)
  }, [dateIdx, start, end, onChange, selDate])

  const decDuration = () => setEnd((e) => Math.max(start + 1, e - 1))
  const incDuration = () =>
    setEnd((e) => {
      const next = e + 1
      if (next > END_HOUR || next - start > DURATION_MAX) return e
      return next
    })

  const hours = []
  for (let h = START_HOUR; h <= END_HOUR; h++) hours.push(h)
  const trackWidth = (END_HOUR - START_HOUR) * PX_PER_HOUR

  const hourFromClientX = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    return Math.round(x / PX_PER_HOUR) + START_HOUR
  }

  const onMarkerDown = (which) => (e) => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = which
  }
  const onMarkerMove = (e) => {
    if (!dragRef.current || !trackRef.current) return
    const h = Math.max(START_HOUR, Math.min(END_HOUR, hourFromClientX(e.clientX)))
    if (dragRef.current === 'start') {
      setStart(Math.min(h, end - 1))
    } else {
      setEnd(Math.max(h, start + 1))
    }
  }
  const onMarkerUp = (e) => {
    dragRef.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* no-op */
    }
  }

  const setFullDay = () => {
    setStart(8)
    setEnd(19)
  }
  const setHalfDay = () => {
    setStart(8)
    setEnd(13)
  }
  const fullActive = start === 8 && end === 19
  const halfActive = start === 8 && end === 13

  return (
    <div className="flex flex-col gap-4">
      {/* PART A — date strip */}
      <div>
        <p className="text-xs font-bold tracking-wide text-gray-500">
          {MONTHS_LONG[selDate.getMonth()]} {selDate.getFullYear()}
        </p>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
          {days.map((d, i) => {
            const active = i === dateIdx
            return (
              <button
                key={i}
                onClick={() => setDateIdx(i)}
                className="flex shrink-0 flex-col items-center gap-1"
              >
                <span className="text-[11px] font-semibold text-gray-400">
                  {DAY_NAMES[d.getDay()]}
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
                    active ? 'bg-brand-green text-white shadow' : 'text-gray-700'
                  }`}
                >
                  {d.getDate()}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* PART B — duration selector */}
      <div className="flex items-center justify-between rounded-2xl bg-brand-surface p-4">
        <div>
          <p className="text-xs font-bold tracking-wide text-brand-green">TIME</p>
          <p className="mt-0.5 text-base font-bold text-gray-900">
            {formatHour(start)} - {formatHour(end)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={decDuration}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-brand-green shadow active:scale-95"
            aria-label="Decrease duration"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-bold text-gray-900">{duration} Hrs</span>
          <button
            onClick={incDuration}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white shadow active:scale-95"
            aria-label="Increase duration"
          >
            +
          </button>
        </div>
      </div>

      {/* PART C — time scrubber */}
      <div className="no-scrollbar overflow-x-auto pb-1">
        <div ref={trackRef} className="relative" style={{ width: trackWidth, height: 56 }}>
          {/* hour labels */}
          {hours.map((h, idx) => (
            <span
              key={`l-${h}`}
              className="absolute top-0 -translate-x-1/2 text-[9px] font-medium text-gray-400"
              style={{ left: idx * PX_PER_HOUR }}
            >
              {shortHour(h)}
            </span>
          ))}
          {/* ticks */}
          {hours.map((h, idx) => (
            <div
              key={`t-${h}`}
              className="absolute w-px bg-gray-300"
              style={{ left: idx * PX_PER_HOUR, top: 16, height: 8 }}
            />
          ))}
          {/* baseline */}
          <div className="absolute left-0 right-0 bg-gray-200" style={{ top: 18, height: 2 }} />
          {/* selected range bar */}
          <div
            className="absolute rounded-full bg-brand-green"
            style={{
              left: (start - START_HOUR) * PX_PER_HOUR,
              width: (end - start) * PX_PER_HOUR,
              top: 16,
              height: 6,
            }}
          />
          {/* start marker */}
          <div
            onPointerDown={onMarkerDown('start')}
            onPointerMove={onMarkerMove}
            onPointerUp={onMarkerUp}
            className="absolute -translate-x-1/2 cursor-ew-resize select-none text-[14px] leading-none text-gray-800 touch-none"
            style={{ left: (start - START_HOUR) * PX_PER_HOUR, top: 26 }}
          >
            ▲
          </div>
          {/* end marker */}
          <div
            onPointerDown={onMarkerDown('end')}
            onPointerMove={onMarkerMove}
            onPointerUp={onMarkerUp}
            className="absolute -translate-x-1/2 cursor-ew-resize select-none text-[14px] leading-none text-gray-800 touch-none"
            style={{ left: (end - START_HOUR) * PX_PER_HOUR, top: 26 }}
          >
            ▲
          </div>
        </div>
      </div>

      {/* Quick-select session cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={setFullDay}
          className={`flex flex-col items-start rounded-2xl border p-3 text-left transition ${
            fullActive ? 'border-brand-green bg-brand-surface' : 'border-gray-200 bg-white'
          }`}
        >
          <span className="text-sm font-bold text-gray-900">Full Day</span>
          <span className="text-xs text-gray-500">8 AM – 7 PM</span>
        </button>
        <button
          onClick={setHalfDay}
          className={`flex flex-col items-start rounded-2xl border p-3 text-left transition ${
            halfActive ? 'border-brand-green bg-brand-surface' : 'border-gray-200 bg-white'
          }`}
        >
          <span className="text-sm font-bold text-gray-900">Half Day</span>
          <span className="text-xs text-gray-500">8 AM – 1 PM</span>
        </button>
      </div>
    </div>
  )
}
