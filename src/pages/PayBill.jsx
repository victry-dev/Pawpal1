import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'

export default function PayBill() {
  const location = useLocation()
  const navigate = useNavigate()
  const { storeName, storeAddress } = location.state || {}
  const [amount, setAmount] = useState('')

  if (!storeName) return <Navigate to="/home" replace />

  const num = parseFloat(amount) || 0
  const discount = (num * 10) / 100
  const finalAmount = num - discount

  const proceed = () => {
    if (num <= 0) return
    navigate('/payment-confirm', {
      state: {
        storeName,
        storeAddress,
        billAmount: num,
        discount,
        finalAmount,
        transactionId: 'PW-PAY-' + Math.floor(Math.random() * 9000 + 1000),
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="bg-brand-green px-5 pb-5 pt-12 text-white">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 active:scale-95"
        >
          ←
        </button>
        <h1 className="text-lg font-extrabold leading-tight">{storeName}</h1>
        <p className="text-sm text-white/85">{storeAddress}</p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 px-5 pt-6">
        {/* Amount input */}
        <div>
          <label className="text-base font-bold text-gray-900">Enter bill amount</label>
          <div className="mt-2 flex items-center rounded-2xl border border-gray-300 px-4 py-3">
            <span className="text-3xl font-bold text-gray-400">₹</span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              className="w-full bg-transparent pl-2 text-[32px] font-bold text-gray-900 outline-none placeholder:text-gray-300"
            />
          </div>
          <div
            className="mt-2 rounded-xl px-3 py-2 text-[12px]"
            style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}
          >
            ⓘ 10% discount will be applied automatically
          </div>
        </div>

        {/* Offer badge — only when amount > 0 */}
        {num > 0 && (
          <div className="animate-fade-up rounded-2xl border border-brand-green/20 bg-brand-surface p-4">
            <p className="font-bold text-brand-green">10% OFF applied 🎉</p>
            <p className="mt-0.5 text-xs text-gray-600">You save ₹{discount.toFixed(2)}</p>
            <p className="mt-1 font-bold text-brand-orange">
              Final amount: ₹{finalAmount.toFixed(2)}
            </p>
          </div>
        )}

        {/* Proceed */}
        <button
          onClick={proceed}
          disabled={num <= 0}
          className={`mb-6 mt-auto w-full rounded-2xl py-3.5 text-base font-bold text-white shadow-lg transition active:scale-[0.99] ${
            num > 0
              ? 'bg-brand-orange shadow-brand-orange/30'
              : 'cursor-not-allowed bg-gray-300 shadow-none'
          }`}
        >
          Proceed →
        </button>
      </div>
    </div>
  )
}
