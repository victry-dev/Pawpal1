import { createContext, useContext, useState } from 'react'
import { PAST_BOOKINGS } from './data.js'

const AppContext = createContext(null)

// Hardcoded accounts (no backend). Logging in with a known email
// restores that account's pet name; varshik@gmail.com is the admin.
const USERS = {
  'buddy@pawpal.app': { petName: 'Buddy', password: 'buddy' },
  'varshik@gmail.com': { petName: 'Bruno', password: 'pass' },
}

export function AppProvider({ children }) {
  // Local-only "auth" + profile state. No backend.
  const [user, setUser] = useState({
    petName: 'Buddy',
    email: 'buddy@pawpal.app',
    isAuthed: false,
  })

  // Bookings made during this session, prepended to the dummy history.
  const [bookings, setBookings] = useState(PAST_BOOKINGS)

  const login = (email) => {
    const known = USERS[(email || '').trim().toLowerCase()]
    setUser((u) => ({
      petName: known ? known.petName : u.petName,
      email: email || u.email,
      isAuthed: true,
    }))
  }

  const signup = (email, petName) => {
    setUser({
      petName: petName || 'Buddy',
      email: email || 'buddy@pawpal.app',
      isAuthed: true,
    })
  }

  const logout = () => setUser((u) => ({ ...u, isAuthed: false }))

  const addBooking = (booking) => {
    setBookings((b) => [booking, ...b])
  }

  return (
    <AppContext.Provider value={{ user, setUser, login, signup, logout, bookings, addBooking }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function makeBookingId() {
  return 'PW-' + Math.floor(1000 + Math.random() * 9000)
}
