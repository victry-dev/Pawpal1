# 🐾 PawPal — *Your pet's city, explored.*

A mobile-first web app — "Playo for pets". Discover daycares, vet hospitals, pet
stores and groomers across Delhi NCR, book a slot, and join pet meetups.

All data is hardcoded dummy JSON — **no backend, no real auth, no real payment.**

## Tech
- React (Vite)
- Tailwind CSS
- React Router

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

The app is optimised for phone browsers and capped at **430px** wide, centred on
desktop. Open your browser's device toolbar for the best experience.

## Screens
1. **Splash** — logo + tagline, auto-redirects to Auth after 2s.
2. **Auth** — Sign Up (Email, Pet Name, Password) / Log In. Local state only.
3. **Home** — greeting, location chip, search, category pills (live filter),
   map placeholder with coloured pins, Nearby Services + Top Rated cards.
4. **Listing Detail** — hero, services, timings, selectable slot chips, sticky Book Now.
5. **Booking** — owner form + order summary → instant Booking Confirmed (`PW-XXXX`).
6. **Events** — featured meetup (Buy Pass → QR pass), upcoming "Coming Soon" cards.
7. **Profile** — pet avatar, bookings history, log out.

Bottom nav: **Home · Explore · Events · Profile**

## Structure
```
src/
  data.js              # all dummy data
  store.jsx            # local auth + bookings context
  App.jsx              # phone shell + routes
  components/          # ServiceCard, BottomNav, MapPlaceholder, pills, etc.
  pages/               # Splash, Auth, Home, Explore, ListingDetail, Booking, Events, Profile
```
