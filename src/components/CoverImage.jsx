import { useState } from 'react'

// Renders an <img> that quietly removes itself if the src is missing or fails
// to load — letting whatever gradient/placeholder sits behind it show through.
export default function CoverImage({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}
