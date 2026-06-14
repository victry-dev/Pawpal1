// Yellow paw icon used inline before rating numbers (replaces the ⭐ emoji).
export default function PawIcon({ size = 18, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#FBBF24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="17" rx="4" ry="3" />
      <ellipse cx="7" cy="13" rx="2" ry="2.5" />
      <ellipse cx="17" cy="13" rx="2" ry="2.5" />
      <ellipse cx="9" cy="9.5" rx="2" ry="2.5" />
      <ellipse cx="15" cy="9.5" rx="2" ry="2.5" />
    </svg>
  )
}
