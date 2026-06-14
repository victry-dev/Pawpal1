import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/explore', label: 'Explore', icon: '🔍' },
  { to: '/events', label: 'Events', icon: '🎉' },
  { to: '/profile', label: 'Profile', icon: '🐾' },
]

export default function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-gray-100 bg-white/95 px-2 pb-2 pt-2 backdrop-blur shadow-nav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1 text-[11px] font-semibold transition ${
              isActive ? 'text-brand-green' : 'text-gray-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`text-lg leading-none transition ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              <span
                className={`h-1 w-1 rounded-full transition ${
                  isActive ? 'bg-brand-green' : 'bg-transparent'
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
