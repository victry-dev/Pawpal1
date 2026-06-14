import { useState } from 'react'
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { getListing } from '../data.js'
import { useApp, makeBookingId } from '../store.jsx'

export default function Booking() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, addBooking } = useApp()
  const listing = getListing(id)

  const booked = location.state || {}
  const serviceName = booked.serviceName || (listing && listing.services[0].name)
  const price = booked.price ?? (listing && listing.services[0].price)
  const slot = booked.slot || (listing && listing.slots[0])
  const pickup = booked.pickup === true
  const pickupFee = pickup ? 149 : 0
  const total = (price || 0) + pickupFee
  const isTrainer =
    booked.category === 'Trainer' ||
    (typeof serviceName === 'string' && serviceName.includes('Training Session'))

  const [form, setForm] = useState({
    owner: '',
    phone: '',
    petName: user.petName,
    breed: '',
    notes: '',
    address: '',
  })
  const [addressError, setAddressError] = useState('')
  const [confirmed, setConfirmed] = useState(null) // booking id once confirmed

  if (!listing) return <Navigate to="/home" replace />

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onConfirm = (e) => {
    e.preventDefault()
    if (isTrainer && !form.address.trim()) {
      setAddressError('Please enter your address so the trainer knows where to go')
      return
    }
    const bookingId = makeBookingId()
    addBooking({
      id: bookingId,
      listing: listing.name,
      category: listing.category,
      service: serviceName,
      slot,
      price: total,
    })
    setConfirmed(bookingId)
  }

  if (confirmed) {
    return (
      <Confirmed
        bookingId={confirmed}
        listing={listing}
        serviceName={serviceName}
        slot={slot}
        price={total}
        pickupFee={pickupFee}
        address={isTrainer ? form.address : ''}
      />
    )
  }

  return (
    <div className="animate-fade-up flex flex-col px-5 pb-8 pt-12">
      <header className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-surface text-brand-green active:scale-95"
          aria-label="Back"
        >
          ←
        </button>
        <h1 className="text-xl font-extrabold text-gray-900">Confirm Booking</h1>
      </header>

      {/* Order summary */}
      <div className="mt-5 rounded-2xl bg-brand-surface p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-green/70">
          Order Summary
        </p>
        <p className="mt-2 text-base font-bold text-gray-900">{listing.name}</p>
        <p className="text-xs text-gray-500">📍 {listing.area}</p>
        <div className="mt-3 space-y-1.5 border-t border-brand-green/10 pt-3 text-sm">
          <Row label="Service" value={serviceName} />
          <Row label="Time slot" value={slot} />
          {isTrainer && (
            <Row label="Trainer visits at" value={`📍 ${form.address.trim() || 'Not added yet'}`} />
          )}
          {pickupFee > 0 && <Row label="Pickup & Drop" value={`₹${pickupFee}`} />}
          <Row label="Amount" value={total === 0 ? 'Free' : `₹${total}`} bold />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onConfirm} className="mt-5 flex flex-col gap-4">
        <Field label="Owner Name" placeholder="Your name" value={form.owner} onChange={set('owner')} required />
        <Field
          label="Phone"
          type="tel"
          placeholder="10-digit mobile"
          value={form.phone}
          onChange={set('phone')}
          required
        />
        <Field label="Pet Name" value={form.petName} onChange={set('petName')} required />
        <Field label="Breed" placeholder="e.g. Labrador" value={form.breed} onChange={set('breed')} />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-gray-600">Notes (optional)</span>
          <textarea
            rows={3}
            placeholder="Anything we should know?"
            value={form.notes}
            onChange={set('notes')}
            className="resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-green focus:bg-white"
          />
        </label>

        {isTrainer && (
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-600">Your Address *</span>
            <textarea
              rows={3}
              placeholder="Enter your full address — the trainer will come to you"
              value={form.address}
              onChange={(e) => {
                set('address')(e)
                if (addressError) setAddressError('')
              }}
              className={`resize-none rounded-2xl border bg-gray-50 px-4 py-3 text-base outline-none transition focus:bg-white ${
                addressError
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-gray-200 focus:border-brand-green'
              }`}
            />
            {addressError && (
              <span className="text-xs font-medium text-red-500">{addressError}</span>
            )}
          </label>
        )}

        <button
          type="submit"
          className="mt-2 rounded-2xl bg-brand-orange py-3.5 text-base font-bold text-white shadow-lg shadow-brand-orange/30 transition active:scale-[0.99]"
        >
          Pay & Confirm {total === 0 ? '' : `· ₹${total}`}
        </button>
        <p className="text-center text-[11px] text-gray-400">
          🔒 Demo only — no real payment is processed.
        </p>
      </form>
    </div>
  )
}

function Confirmed({ bookingId, listing, serviceName, slot, price, pickupFee = 0, address = '' }) {
  const navigate = useNavigate()
  return (
    <div className="animate-fade-up flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-surface text-5xl">
        ✅
      </div>
      <h1 className="mt-5 text-2xl font-extrabold text-brand-green">Booking Confirmed!</h1>
      <p className="mt-1 text-sm text-gray-500">
        Your spot at <span className="font-semibold text-gray-700">{listing.name}</span> is locked in.
      </p>

      <div className="mt-6 w-full rounded-2xl border border-dashed border-brand-green/30 bg-white p-5 text-left shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400">Booking ID</span>
          <span className="rounded-full bg-brand-green px-3 py-1 text-sm font-bold text-white">
            {bookingId}
          </span>
        </div>
        <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3 text-sm">
          <Row label="Service" value={serviceName} />
          <Row label="Time slot" value={slot} />
          {address && <Row label="Trainer visits at" value={address} />}
          {pickupFee > 0 && <Row label="Pickup & Drop" value={`₹${pickupFee}`} />}
          <Row label="Amount paid" value={price === 0 ? 'Free' : `₹${price}`} bold />
        </div>
      </div>

      <button
        onClick={() => navigate('/home', { replace: true })}
        className="mt-7 w-full rounded-2xl bg-brand-green py-3.5 text-base font-bold text-white shadow-lg transition active:scale-[0.99]"
      >
        Back to Home
      </button>
    </div>
  )
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? 'font-bold text-brand-green' : 'font-semibold text-gray-800'}>
        {value}
      </span>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <input
        {...props}
        className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-green focus:bg-white"
      />
    </label>
  )
}
