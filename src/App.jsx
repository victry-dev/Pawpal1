import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Splash from './pages/Splash.jsx'
import Auth from './pages/Auth.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import ListingDetail from './pages/ListingDetail.jsx'
import Booking from './pages/Booking.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Profile from './pages/Profile.jsx'
import PayBill from './pages/PayBill.jsx'
import PaymentConfirm from './pages/PaymentConfirm.jsx'
import { PhotoProvider } from './context/PhotoContext.jsx'

// Routes that show the bottom tab bar.
const TAB_ROUTES = ['/home', '/explore', '/events', '/profile']

export default function App() {
  const location = useLocation()
  const showNav = TAB_ROUTES.includes(location.pathname)

  return (
    <PhotoProvider>
    <div className="flex min-h-screen justify-center">
      <div className="relative flex min-h-screen w-full max-w-app flex-col overflow-hidden bg-white shadow-2xl">
        <div className={`flex-1 overflow-y-auto no-scrollbar ${showNav ? 'pb-[76px]' : ''}`}>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/paybill" element={<PayBill />} />
            <Route path="/payment-confirm" element={<PaymentConfirm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {showNav && <BottomNav />}
      </div>
    </div>
    </PhotoProvider>
  )
}
