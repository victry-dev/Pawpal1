import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/auth', { replace: true }), 2000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-green text-white">
      <div className="animate-fade-up flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-6xl shadow-lg">
          🐾
        </div>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight">PawPal</h1>
        <p className="mt-2 text-sm font-medium text-brand-surface/90">
          Your pet's city, explored.
        </p>
      </div>
      <div className="absolute bottom-12 flex gap-1.5">
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70" />
      </div>
    </div>
  )
}
