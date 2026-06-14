import { useRef } from 'react'
import { usePhotos } from '../context/PhotoContext.jsx'

// Hero photo slot used on detail pages.
// Uploading is open to any logged-in user (easy demo flow). Photos are compressed
// before storing so they reliably fit in localStorage and persist across accounts.
export default function PhotoGallery({ listingId }) {
  const { photosMap, addPhoto, removePhotos } = usePhotos()
  const photos = photosMap[listingId] || []
  const inputRef = useRef(null)

  const openPicker = () => inputRef.current?.click()

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataURL = await compressImage(file)
      addPhoto(listingId, dataURL)
    } catch {
      // Fallback to the raw file if compression fails for any reason.
      const reader = new FileReader()
      reader.onload = () => addPhoto(listingId, reader.result)
      reader.readAsDataURL(file)
    }
    e.target.value = '' // allow re-selecting the same file
  }

  const clearPhotos = () => {
    if (window.confirm('Remove all photos for this listing?')) {
      removePhotos(listingId)
    }
  }

  const hiddenInput = (
    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
  )

  // No photos yet → gradient placeholder with an upload button.
  if (photos.length === 0) {
    return (
      <div className="relative h-[220px] w-full bg-gradient-to-br from-[#1B5E3B] to-[#2D7A4F]">
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <CameraIcon />
          <p className="mt-2 text-[13px] font-medium text-white">Photos coming soon</p>
        </div>
        <button
          onClick={openPicker}
          aria-label="Upload photo"
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-brand-green shadow-lg active:scale-95"
        >
          <span className="text-base leading-none">＋</span> Add Photo
        </button>
        {hiddenInput}
      </div>
    )
  }

  // Photos exist → horizontal scrollable strip.
  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto bg-gray-100">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Photo ${i + 1}`}
            className="h-[200px] w-full shrink-0 rounded-xl border border-gray-200 object-cover"
          />
        ))}
        <button
          onClick={openPicker}
          aria-label="Add another photo"
          className="flex h-[200px] w-20 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-green/40 bg-white text-3xl font-bold text-brand-green active:scale-95"
        >
          ＋
        </button>
        {hiddenInput}
      </div>
      <div className="flex justify-end px-1 pt-1">
        <button
          onClick={clearPhotos}
          className="text-xs font-semibold text-red-500 active:opacity-70"
        >
          Clear Photos
        </button>
      </div>
    </div>
  )
}

// Downscale + JPEG-compress an image File to a small data URL via canvas.
function compressImage(file, maxDim = 1200, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        let { width, height } = img
        if (width >= height && width > maxDim) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else if (height > width && height > maxDim) {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('no canvas context'))
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

function CameraIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8a2 2 0 0 1 2-2h2l1.4-2h7.2L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>
  )
}
