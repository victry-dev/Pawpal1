import { useNavigate } from 'react-router-dom'
import { CATEGORY_META, getPhoto } from '../data.js'
import { usePhotos } from '../context/PhotoContext.jsx'
import PawIcon from './PawIcon.jsx'
import CoverImage from './CoverImage.jsx'

// `variant` = 'nearby' (compact horizontal card) | 'list' (full-width row card)
export default function ServiceCard({ listing, variant = 'list' }) {
  const navigate = useNavigate()
  const goDetail = () => navigate(`/listing/${listing.id}`)
  const goBook = (e) => {
    e.stopPropagation()
    navigate(`/listing/${listing.id}`)
  }
  const goPayBill = (e) => {
    e.stopPropagation()
    navigate('/paybill', {
      state: { storeName: listing.name, storeAddress: listing.address },
    })
  }
  const isStore = listing.category === 'Store'

  // Trainers keep their distinct avatar-based card.
  if (listing.category === 'Trainer' && variant === 'list') {
    return <TrainerCard listing={listing} navigate={navigate} />
  }

  if (variant === 'nearby') {
    return (
      <button
        onClick={goDetail}
        className="flex w-56 shrink-0 flex-col overflow-hidden rounded-2xl bg-white text-left shadow-card active:scale-[0.98] transition"
      >
        <PhotoPlaceholder listingId={listing.id} category={listing.category} />
        {isStore && <OffBanner />}
        <div className="flex flex-col p-3">
          <h3 className="truncate text-sm font-bold text-gray-900">{listing.name}</h3>
          <p className="truncate text-xs text-gray-500">📍 {listing.area} · {listing.distance} km</p>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-600">
              <PawIcon /> {listing.rating}
            </span>
            <span className="text-xs font-bold text-brand-green">{listing.priceLabel}</span>
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={goDetail}
      className="flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-card active:scale-[0.99] transition"
    >
      <PhotoPlaceholder category={listing.category} />
      {isStore && <OffBanner />}
      <div className="flex flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-bold text-gray-900">{listing.name}</h3>
          <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-amber-600">
            <PawIcon /> {listing.rating}
          </span>
        </div>
        <p className="truncate text-xs text-gray-500">📍 {listing.area} · {listing.distance} km away</p>

        {isStore ? (
          <>
            {listing.categories?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {listing.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-brand-surface px-2 py-0.5 text-[11px] font-semibold text-brand-green"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-2 flex justify-end">
              <span
                onClick={goPayBill}
                className="rounded-full bg-brand-orange px-4 py-1.5 text-xs font-bold text-white active:opacity-90"
              >
                Pay Bill
              </span>
            </div>
          </>
        ) : (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-brand-green">{listing.priceLabel}</span>
            <span
              onClick={goBook}
              className="rounded-full bg-brand-orange px-4 py-1.5 text-xs font-bold text-white active:opacity-90"
            >
              Book
            </span>
          </div>
        )}
      </div>
    </button>
  )
}

// Full-width orange promo strip shown on Store cards (between photo and text).
function OffBanner() {
  return (
    <div className="w-full bg-brand-orange py-1 text-center text-[11px] font-semibold text-white">
      10% off when you pay through the app
    </div>
  )
}

// Photo slot: shows the uploaded photo if one exists for this listing,
// otherwise a green gradient. Category badge stays overlaid top-left.
function PhotoPlaceholder({ listingId, category }) {
  const { photosMap } = usePhotos()
  const photoSrc = photosMap[listingId]?.[0] || getPhoto(listingId)
  const meta = CATEGORY_META[category] || { icon: '🐾', color: '#1B5E3B' }
  return (
    <div className="relative h-[120px] w-full overflow-hidden bg-gradient-to-br from-[#1B5E3B] to-[#2D7A4F]">
      <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
        {meta.icon}
      </span>
      <CoverImage src={photoSrc} alt={category} className="absolute inset-0 h-full w-full object-cover" />
      <span
        className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold shadow"
        style={{ color: meta.color }}
      >
        <span>{meta.icon}</span>
        {category}
      </span>
    </div>
  )
}

function TrainerCard({ listing, navigate }) {
  const { photosMap } = usePhotos()
  const photoSrc = photosMap[listing.id]?.[0] || getPhoto(listing.id)
  const service = listing.services[0]
  const goDetail = () => navigate(`/listing/${listing.id}`)
  const goBook = (e) => {
    e.stopPropagation()
    navigate(`/booking/${listing.id}`, {
      state: {
        serviceName: service.name,
        price: service.price,
        slot: listing.slots[0],
        category: listing.category,
      },
    })
  }

  return (
    <div
      onClick={goDetail}
      className="flex cursor-pointer gap-3 rounded-2xl bg-white p-3 shadow-card active:scale-[0.99] transition"
    >
      {/* Avatar — photo if available, else initials */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand-green">
        <div className="flex h-full w-full items-center justify-center text-base font-extrabold text-white">
          {initials(listing.name)}
        </div>
        <CoverImage
          src={photoSrc}
          alt={listing.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate text-[15px] font-bold text-gray-900">{listing.name}</h3>
        <p className="truncate text-xs font-medium text-brand-green">{listing.speciality}</p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-surface px-2 py-0.5 text-[11px] font-semibold text-brand-green">
            {listing.petType}
          </span>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-600">
            <PawIcon /> {listing.rating}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-brand-orange">₹1,000 / day</span>
          <button
            onClick={goBook}
            className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow active:scale-95 transition"
          >
            Book Session
          </button>
        </div>
      </div>
    </div>
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
