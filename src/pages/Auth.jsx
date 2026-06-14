import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store.jsx'

export default function Auth() {
  const navigate = useNavigate()
  const { login, signup } = useApp()
  const [mode, setMode] = useState('signup') // 'signup' | 'login'
  const [form, setForm] = useState({ email: '', petName: '', password: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (mode === 'signup') {
      signup(form.email, form.petName)
    } else {
      login(form.email)
    }
    navigate('/home', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col px-6 pb-8 pt-14">
      <div className="animate-fade-up flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-surface text-4xl">
          🐾
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-brand-green">PawPal</h1>
        <p className="text-xs font-medium text-gray-400">Your pet's city, explored.</p>
      </div>

      {/* Mode toggle */}
      <div className="mt-8 flex rounded-full bg-brand-surface p-1">
        {['signup', 'login'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
              mode === m ? 'bg-brand-green text-white shadow' : 'text-brand-green'
            }`}
          >
            {m === 'signup' ? 'Sign Up' : 'Log In'}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-6 flex flex-1 flex-col gap-4">
        <Field
          label="Email"
          type="email"
          placeholder="you@email.com"
          value={form.email}
          onChange={set('email')}
          required
        />
        {mode === 'signup' && (
          <Field
            label="Pet Name"
            type="text"
            placeholder="e.g. Buddy"
            value={form.petName}
            onChange={set('petName')}
            required
          />
        )}
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={set('password')}
          required
        />

        <button
          type="submit"
          className="mt-4 rounded-2xl bg-brand-orange py-3.5 text-base font-bold text-white shadow-lg shadow-brand-orange/30 active:scale-[0.99] transition"
        >
          {mode === 'signup' ? 'Create Account' : 'Log In'}
        </button>

        <p className="mt-auto text-center text-xs text-gray-400">
          {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="font-bold text-brand-green"
          >
            {mode === 'signup' ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </form>
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
