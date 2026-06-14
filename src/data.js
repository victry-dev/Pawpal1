// All dummy data for PawPal. No backend.

export const CATEGORIES = ['All', 'Daycare', 'Veterinary', 'Store', 'Groomer', 'Trainer']

export const CATEGORY_META = {
  Daycare: { icon: '🏠', color: '#1B5E3B' },
  Veterinary: { icon: '🩺', color: '#2E7D8A' },
  Store: { icon: '🛍️', color: '#C77800' },
  Groomer: { icon: '✂️', color: '#8E44AD' },
  Trainer: { icon: '🐕‍🦺', color: '#2563EB' },
}

export const LISTINGS = [
  {
    id: 'happy-paws',
    name: 'Happy Paws Daycare',
    category: 'Daycare',
    area: 'Hauz Khas',
    address: 'M-12, Hauz Khas Village, New Delhi',
    rating: 4.8,
    reviews: 312,
    distance: 1.2,
    priceLabel: 'From ₹400/day',
    priceFrom: 400,
    pin: { top: '32%', left: '28%' },
    description:
      'A bright, supervised play space where your pet spends the day socialising, napping and getting pampered. Trained handlers, live updates and a cosy nap zone.',
    services: [
      { name: 'Full Day Care', price: 400 },
      { name: 'Half Day Care', price: 250 },
      { name: 'Overnight Boarding', price: 700 },
    ],
    timings: 'Mon–Sun · 8:00 AM – 8:00 PM',
    slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
  },
  {
    id: 'furever-friends',
    name: 'Furever Friends',
    category: 'Daycare',
    area: 'Vasant Kunj',
    address: 'C-4, Vasant Kunj, New Delhi',
    rating: 4.6,
    reviews: 198,
    distance: 3.5,
    priceLabel: 'From ₹350/day',
    priceFrom: 350,
    pin: { top: '58%', left: '22%' },
    description:
      'Home-style daycare with a large fenced garden. Small groups, lots of belly rubs, and a webcam so you never miss a zoomie.',
    services: [
      { name: 'Full Day Care', price: 350 },
      { name: 'Half Day Care', price: 220 },
      { name: 'Pick & Drop Add-on', price: 150 },
    ],
    timings: 'Mon–Sat · 9:00 AM – 7:00 PM',
    slots: ['9:30 AM', '11:30 AM', '2:00 PM', '4:00 PM'],
  },
  {
    id: 'petcure',
    name: 'PetCure Clinic',
    category: 'Veterinary',
    area: 'GK2',
    address: 'S-Block, Greater Kailash 2, New Delhi',
    rating: 4.9,
    reviews: 540,
    distance: 2.1,
    priceLabel: 'From ₹300',
    priceFrom: 300,
    pin: { top: '40%', left: '60%' },
    description:
      'Full-service veterinary clinic with in-house diagnostics, vaccinations and emergency care. Compassionate doctors and a calm, pet-friendly waiting area.',
    services: [
      { name: 'General Consultation', price: 300 },
      { name: 'Vaccination', price: 600 },
      { name: 'Dental Cleaning', price: 1200 },
    ],
    timings: 'Mon–Sun · 10:00 AM – 9:00 PM',
    slots: ['10:00 AM', '12:00 PM', '2:30 PM', '5:00 PM', '7:00 PM'],
  },
  {
    id: 'delhi-pet-hospital',
    name: 'Delhi Vet Clinic',
    category: 'Veterinary',
    area: 'Saket',
    address: 'District Centre, Saket, New Delhi',
    rating: 4.7,
    reviews: 421,
    distance: 4.0,
    priceLabel: 'From ₹250',
    priceFrom: 250,
    pin: { top: '66%', left: '54%' },
    description:
      'Trusted neighbourhood hospital offering surgery, grooming add-ons and round-the-clock emergency support. Over 15 years of caring for Delhi pets.',
    services: [
      { name: 'General Consultation', price: 250 },
      { name: 'X-Ray', price: 900 },
      { name: 'Surgery Consult', price: 500 },
    ],
    timings: 'Open 24×7',
    slots: ['9:00 AM', '11:00 AM', '4:00 PM', '8:00 PM'],
  },
  {
    id: 'heads-up-for-tails',
    name: 'Heads Up For Tails',
    category: 'Store',
    categories: ['Pet Food', 'Pet Clothes'],
    phone: '+91 98765 43210',
    area: 'Select Citywalk',
    address: 'Select Citywalk Mall, Saket, New Delhi',
    rating: 4.5,
    reviews: 276,
    distance: 3.8,
    priceLabel: 'Pet supplies',
    priceFrom: 0,
    pin: { top: '50%', left: '74%' },
    description:
      'Premium pet store stocked with food, toys, beds and stylish accessories. Personal shopping assistance and custom name tags available in-store.',
    services: [
      { name: 'Personal Shopping Slot', price: 0 },
      { name: 'Custom Name Tag', price: 350 },
      { name: 'Nutrition Consult', price: 200 },
    ],
    timings: 'Mon–Sun · 11:00 AM – 9:00 PM',
    slots: ['11:30 AM', '1:00 PM', '4:00 PM', '6:30 PM'],
  },
  {
    id: 'petzone',
    name: 'PetZone',
    category: 'Store',
    categories: ['Pet Utilities', 'Pet Toys'],
    phone: '+91 91234 56789',
    area: 'Lajpat Nagar',
    address: 'Central Market, Lajpat Nagar, New Delhi',
    rating: 4.4,
    reviews: 189,
    distance: 2.6,
    priceLabel: 'Pet supplies',
    priceFrom: 0,
    pin: { top: '44%', left: '40%' },
    description:
      'Your everyday pet essentials shop — affordable food, grooming kits and aquarium supplies. Friendly staff who know every regular by name.',
    services: [
      { name: 'In-store Pickup Slot', price: 0 },
      { name: 'Aquarium Setup Advice', price: 150 },
      { name: 'Bulk Food Order', price: 0 },
    ],
    timings: 'Mon–Sun · 10:00 AM – 8:30 PM',
    slots: ['10:30 AM', '12:30 PM', '3:30 PM', '6:00 PM'],
  },
  {
    id: 'snip-wag',
    name: 'Snip & Wag',
    category: 'Groomer',
    area: 'Defence Colony',
    address: 'A-Block, Defence Colony, New Delhi',
    rating: 4.8,
    reviews: 364,
    distance: 1.9,
    priceLabel: 'From ₹599',
    priceFrom: 599,
    pin: { top: '54%', left: '48%' },
    description:
      'Boutique grooming salon for cats and dogs. Hypoallergenic shampoos, breed-specific styling and a stress-free, gentle handling promise.',
    services: [
      { name: 'Bath & Brush', price: 599 },
      { name: 'Full Grooming', price: 999 },
      { name: 'Nail Trim & Ear Clean', price: 350 },
    ],
    timings: 'Tue–Sun · 10:00 AM – 7:00 PM',
    slots: ['10:00 AM', '12:00 PM', '2:00 PM', '4:30 PM'],
  },
  {
    id: 'groom-room',
    name: 'The Groom Room',
    category: 'Groomer',
    area: 'Punjabi Bagh',
    address: 'West Avenue, Punjabi Bagh, New Delhi',
    rating: 4.6,
    reviews: 241,
    distance: 5.2,
    priceLabel: 'From ₹499',
    priceFrom: 499,
    pin: { top: '24%', left: '46%' },
    description:
      'Spacious grooming studio with spa packages, de-shedding treatments and a calming play area for nervous first-timers.',
    services: [
      { name: 'Express Wash', price: 499 },
      { name: 'Spa Package', price: 1099 },
      { name: 'De-shedding Treatment', price: 750 },
    ],
    timings: 'Mon–Sun · 9:30 AM – 6:30 PM',
    slots: ['9:30 AM', '11:00 AM', '1:30 PM', '5:00 PM'],
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    category: 'Trainer',
    isTrainer: true,
    speciality: 'Obedience & Agility Training',
    petType: 'Dogs only',
    area: 'South Delhi',
    address: 'South Delhi, New Delhi',
    rating: 4.9,
    reviews: 128,
    distance: 3.0,
    priceLabel: '₹1,000/day',
    priceFrom: 1000,
    pin: { top: '62%', left: '50%' },
    description:
      'Certified dog trainer with 6 years experience. Specialises in obedience, leash training, and agility for all breeds.',
    services: [{ name: 'Training Session — Arjun Mehta', price: 1000 }],
    timings: 'Mon–Sat · 7:00 AM – 6:00 PM',
    slots: ['7:00 AM', '10:00 AM', '4:00 PM'],
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    category: 'Trainer',
    isTrainer: true,
    speciality: 'Puppy Socialisation & Basic Commands',
    petType: 'Dogs only',
    area: 'West Delhi',
    address: 'West Delhi, New Delhi',
    rating: 4.7,
    reviews: 96,
    distance: 6.1,
    priceLabel: '₹1,000/day',
    priceFrom: 1000,
    pin: { top: '28%', left: '30%' },
    description:
      'Gentle, reward-based training for puppies and young dogs. Focuses on building confidence and good habits early.',
    services: [{ name: 'Training Session — Priya Nair', price: 1000 }],
    timings: 'Mon–Sun · 8:00 AM – 7:00 PM',
    slots: ['8:00 AM', '11:00 AM', '5:00 PM'],
  },
]

export const FEATURED_EVENT = {
  id: 'sunday-dog-meetup',
  title: 'Sunday Dog Meetup',
  venue: 'Lodhi Garden',
  date: 'Jun 22',
  price: 199,
  attending: 34,
  emoji: '🐕',
  description:
    'Bring your pup for a morning of play, treats and new furry friends at Lodhi Garden. Trainers on site, goodie bags for the first 50 dogs.',
}

export const UPCOMING_EVENTS = [
  {
    id: 'labrador-playdate',
    title: 'Labrador Playdate',
    venue: 'Sunder Nursery',
    date: 'Jun 28',
    emoji: '🦮',
  },
]

// Two dummy past bookings shown on the Profile screen.
export const PAST_BOOKINGS = [
  {
    id: 'PW-4821',
    listing: 'Snip & Wag',
    category: 'Groomer',
    service: 'Full Grooming',
    slot: 'Jun 2 · 12:00 PM',
    price: 999,
  },
  {
    id: 'PW-3390',
    listing: 'PetCure Clinic',
    category: 'Veterinary',
    service: 'Vaccination',
    slot: 'May 18 · 5:00 PM',
    price: 600,
  },
]

export function getListing(id) {
  return LISTINGS.find((l) => l.id === id)
}

// Bundled photos that ship with the app (visible to everyone on the live site).
// Each place gets its OWN photo. Drop files in /public/photos named by id + ".jpg".
// If a place's own file is missing, it falls back to its category photo, then to
// the green gradient placeholder — so nothing ever breaks.
const LISTING_PHOTOS = {
  'happy-paws': '/photos/happy-paws.jpg',
  'furever-friends': '/photos/furever-friends.jpg',
  petcure: '/photos/petcure.jpg',
  'delhi-pet-hospital': '/photos/delhi-pet-hospital.jpg',
  'heads-up-for-tails': '/photos/heads-up-for-tails.jpg',
  petzone: '/photos/petzone.jpg',
  'snip-wag': '/photos/snip-wag.jpg',
  'groom-room': '/photos/groom-room.jpg',
  'arjun-mehta': '/photos/arjun-mehta.jpg',
  'priya-nair': '/photos/priya-nair.jpg',
}

// Optional per-category fallback (only used if a place has no own photo above).
const CATEGORY_PHOTOS = {
  Daycare: '/photos/daycare.jpg',
  Veterinary: '/photos/vet.jpg',
  Store: '/photos/store.jpg',
  Groomer: '/photos/groomer.jpg',
  Trainer: '/photos/trainer.jpg',
}
const EVENT_PHOTO = '/photos/sunday-dog-meetup.jpg'

export function getPhoto(id) {
  if (LISTING_PHOTOS[id]) return LISTING_PHOTOS[id]
  if (id === FEATURED_EVENT.id) return EVENT_PHOTO
  const listing = LISTINGS.find((l) => l.id === id)
  return listing ? CATEGORY_PHOTOS[listing.category] || null : null
}
