import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'

export default function PaymentConfirm() {
  const location = useLocation()
  const navigate = useNavigate()
  const s = location.state || {}
  const [toast, setToast] = useState(false)

  if (!s.storeName) return <Navigate to="/home" replace />

  const dateTime = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const showToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 pb-8 pt-16">
      {/* Success tick */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-5xl font-bold text-white shadow-lg">
        ✓
      </div>
      <h1 className="mt-5 text-xl font-extrabold text-gray-900">Payment Successful!</h1>
      <p className="mt-1 text-[13px] text-gray-500">Thank you for paying through PawPal</p>

      {/* Summary card */}
      <div className="mt-6 w-full rounded-2xl border border-gray-200 p-5 text-left shadow-card">
        <p className="text-base font-bold text-gray-900">{s.storeName}</p>
        <p className="text-xs text-gray-500">{s.storeAddress}</p>

        <div className="my-3 border-t border-gray-100" />

        <Row label="Bill Amount" value={`₹${Number(s.billAmount).toFixed(2)}`} />
        <Row label="10% Discount" value={`-₹${Number(s.discount).toFixed(2)}`} valueClass="text-brand-green" />
        <Row label="Amount Paid" value={`₹${Number(s.finalAmount).toFixed(2)}`} bold />

        <div className="my-3 border-t border-gray-100" />

        <Row label="Transaction ID" value={s.transactionId} valueClass="font-mono text-gray-600" />
        <Row label="Date & Time" value={dateTime} valueClass="text-gray-600" />
      </div>

      {/* Buttons */}
      <button
        onClick={() => navigate('/home')}
        className="mt-6 w-full rounded-2xl bg-brand-orange py-3.5 text-base font-bold text-white shadow-lg shadow-brand-orange/30 transition active:scale-[0.99]"
      >
        Back to Home
      </button>
      <button
        onClick={showToast}
        className="mt-3 w-full rounded-2xl border border-brand-green py-3.5 text-base font-bold text-brand-green transition active:scale-[0.99]"
      >
        Download Receipt
      </button>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          Receipt feature coming soon
        </div>
      )}
    </div>
  )
}

function Row({ label, value, bold, valueClass = '' }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={`${bold ? 'font-bold text-brand-orange' : 'font-semibold text-gray-800'} ${valueClass}`}>
        {value}
      </span>
    </div>
  )
}
