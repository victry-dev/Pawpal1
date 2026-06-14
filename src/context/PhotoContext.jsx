import { createContext, useContext, useState } from 'react'

// localStorage-backed photo store keyed by listing/event id: { [id]: [dataURL, ...] }.
// Persists across refreshes, logins, and accounts on the same device (no backend).
const PhotoContext = createContext(null)
const STORAGE_KEY = 'pawpal_photos'

export function PhotoProvider({ children }) {
  const [photosMap, setPhotosMap] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  const addPhoto = (id, dataURL) => {
    setPhotosMap((prev) => {
      const updated = {
        ...prev,
        [id]: [...(prev[id] || []), dataURL],
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // localStorage full or unavailable — fail silently
      }
      return updated
    })
  }

  const removePhotos = (id) => {
    setPhotosMap((prev) => {
      const updated = { ...prev }
      delete updated[id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // localStorage unavailable — fail silently
      }
      return updated
    })
  }

  return (
    <PhotoContext.Provider value={{ photosMap, addPhoto, removePhotos }}>
      {children}
    </PhotoContext.Provider>
  )
}

export function usePhotos() {
  const ctx = useContext(PhotoContext)
  if (!ctx) throw new Error('usePhotos must be used within PhotoProvider')
  return ctx
}
