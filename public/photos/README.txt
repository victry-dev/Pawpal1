PawPal bundled photos
=====================

Put your image files in THIS folder (public/photos/) and name each one
EXACTLY as listed below (all lowercase, ending in .jpg).

Each place gets its OWN photo. They ship with the app, so they appear for
EVERYONE on the live Vercel site. A missing/misnamed file falls back to its
category photo, then to the green gradient placeholder — nothing breaks.

PER-PLACE PHOTOS (11 files):
  happy-paws.jpg          → Happy Paws Daycare
  furever-friends.jpg     → Furever Friends
  petcure.jpg             → PetCure Clinic
  delhi-pet-hospital.jpg  → Delhi Vet Clinic
  heads-up-for-tails.jpg  → Heads Up For Tails
  petzone.jpg             → PetZone
  snip-wag.jpg            → Snip & Wag
  groom-room.jpg          → The Groom Room
  arjun-mehta.jpg         → Arjun Mehta (trainer)
  priya-nair.jpg          → Priya Nair (trainer)
  sunday-dog-meetup.jpg   → Sunday Dog Meetup event

OPTIONAL category fallbacks (only used if a place's own file above is missing):
  daycare.jpg · vet.jpg · store.jpg · groomer.jpg · trainer.jpg

ABOUT JFIF FILES:
JFIF is just JPEG with a different extension. Right-click each file > Rename
and change the extension from ".jfif" to ".jpg" — the image data is identical,
so it displays perfectly. (If you don't see extensions, enable
"File name extensions" in File Explorer's View menu first.)

After adding the files: commit them and push — Vercel redeploys and the
photos go live for all visitors.

To change a mapping, edit LISTING_PHOTOS in src/data.js.
