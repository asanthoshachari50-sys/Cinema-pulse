import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Building,
  ShieldCheck,
  Tag,
  Plus,
  Minus,
  CheckCircle,
  Loader2,
  Lock,
} from 'lucide-react';
import { Movie, CinemaVenue, Seat, SnackItem, BookingRecord, CustomerInfo, ShowDateItem } from '../types/booking';
import { SNACK_ITEMS } from '../data/mockData';
import { getSessionKey, saveBookedSeatsForSession, saveBookingToHistory } from '../utils/storage';

interface CheckoutModalProps {
  movie: Movie;
  cinema: CinemaVenue;
  showDate: ShowDateItem;
  showtime: { id: string; time: string; format: string; language: string; priceMultiplier: number };
  selectedSeats: Seat[];
  onClose: () => void;
  onBookingConfirmed: (booking: BookingRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  movie,
  cinema,
  showDate,
  showtime,
  selectedSeats,
  onClose,
  onBookingConfirmed,
}) => {
  // Customer details
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: 'Alex Reynolds',
    email: 'alex.reynolds@example.com',
    phone: '+91 98765 43210',
  });

  // Snacks selected: map of snackId -> quantity
  const [snackQuantities, setSnackQuantities] = useState<Record<string, number>>({});

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Payment tab
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('alex@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9012');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('883');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Snacks calculations
  const updateSnackQuantity = (id: string, delta: number) => {
    setSnackQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const selectedSnacksList = Object.entries(snackQuantities).map(([id, qty]) => {
    const item = SNACK_ITEMS.find((s) => s.id === id)!;
    return { item, quantity: qty };
  });

  const snackAmount = selectedSnacksList.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0
  );

  // Financial calculations
  const seatAmount = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const convenienceFee = Math.round(selectedSeats.length * 32.5);
  const taxes = Math.round((convenienceFee + seatAmount * 0.05));
  const discount = promoApplied ? promoApplied.discount : 0;
  const totalAmount = Math.max(0, seatAmount + snackAmount + convenienceFee + taxes - discount);

  const applyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'CINEPASS50' || code === 'FIRST50') {
      setPromoApplied({ code, discount: 50 });
    } else if (code === 'BLOCKBUSTER' || code === 'SAVE100') {
      setPromoApplied({ code, discount: 100 });
    } else {
      setPromoError('Invalid coupon code. Try CINEPASS50 or SAVE100');
    }
  };

  const handlePayAndBook = () => {
    if (!customer.fullName || !customer.email || !customer.phone) {
      alert('Please fill in your contact information');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('Connecting to secure payment gateway...');

    setTimeout(() => {
      setProcessingStatus('Verifying transaction & card authentication...');
    }, 800);

    setTimeout(() => {
      setProcessingStatus('Locking seat reservations with theater server...');
    }, 1600);

    setTimeout(() => {
      // 1. Permanent seat reservation
      const sessionKey = getSessionKey(movie.id, cinema.id, showDate.isoDate, showtime.id);
      const bookedIds = selectedSeats.map((s) => s.id);
      saveBookedSeatsForSession(sessionKey, bookedIds);

      // 2. Generate confirmed booking record
      const randomBookingId = 'BMS-' + Math.floor(100000 + Math.random() * 900000);
      const newRecord: BookingRecord = {
        id: randomBookingId,
        bookingCode: randomBookingId,
        movie: {
          id: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          certificate: movie.certificate,
          duration: movie.duration,
        },
        cinema: {
          id: cinema.id,
          name: cinema.name,
          location: cinema.location,
          screen: 'Audi 03 (IMAX Laser)',
        },
        showDate: showDate.fullFormatted,
        showTime: showtime.time,
        format: showtime.format,
        language: showtime.language,
        seats: bookedIds,
        seatTiers: selectedSeats.map((s) => ({
          seatId: s.id,
          tier: s.tier,
          price: s.price,
        })),
        snacks: selectedSnacksList,
        baseAmount: seatAmount,
        snackAmount,
        convenienceFee,
        taxes,
        totalAmount,
        customer,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI (' + upiId + ')'
            : paymentMethod === 'card'
            ? 'Credit Card (' + cardNumber.slice(-4) + ')'
            : 'NetBanking (HDFC Bank)',
        bookedAt: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        status: 'confirmed',
      };

      // 3. Save to booking history
      saveBookingToHistory(newRecord);

      setIsProcessing(false);

      // 4. Trigger the Booking Confirmed Window!
      onBookingConfirmed(newRecord);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative my-8 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#12141f] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0d0f17]">
          <div>
            <h2 className="font-['Syne',sans-serif] text-lg font-bold text-white flex items-center gap-2">
              <span>Checkout & Instant Reservation</span>
              <span className="rounded bg-rose-600/30 text-rose-300 border border-rose-500/40 text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                Live Seat Lock
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Review your movie tickets, add gourmet concessions, and complete booking
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Order Summary Card */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-14 w-11 overflow-hidden rounded bg-slate-800 shrink-0">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{movie.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{showtime.format}</span>
                    <span>·</span>
                    <span>{showtime.language}</span>
                    <span>·</span>
                    <span className="text-rose-400 font-semibold">{cinema.name}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {showDate.label} ({showDate.subLabel}) at {showtime.time}
                  </div>
                </div>
              </div>

              {/* Seats Badge list */}
              <div className="flex flex-col sm:items-end">
                <span className="text-[11px] uppercase tracking-wider text-slate-400">
                  Selected Seats ({selectedSeats.length})
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedSeats.map((s) => (
                    <span
                      key={s.id}
                      className="rounded bg-rose-600/30 border border-rose-500/50 px-2 py-0.5 text-xs font-bold text-rose-300"
                    >
                      {s.id}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Snacks Add-on Selector */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Add Gourmet Snacks & Beverages
                </h4>
                <span className="text-[11px] text-slate-500">Delivered directly to your seat</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {SNACK_ITEMS.slice(0, 3).map((snack) => {
                  const qty = snackQuantities[snack.id] || 0;
                  return (
                    <div
                      key={snack.id}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
                    >
                      <div className="pr-2">
                        <div className="text-xs font-semibold text-white line-clamp-1">
                          {snack.name}
                        </div>
                        <div className="text-[11px] text-rose-400 font-bold tabular-nums">
                          ₹{snack.price}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 bg-white/5 rounded-lg p-1 border border-white/10">
                        {qty > 0 && (
                          <button
                            type="button"
                            onClick={() => updateSnackQuantity(snack.id, -1)}
                            className="rounded p-1 text-slate-300 hover:bg-white/10 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                        )}
                        <span className="w-5 text-center text-xs font-bold text-white tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateSnackQuantity(snack.id, 1)}
                          className="rounded p-1 text-rose-400 hover:bg-rose-600/20"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Contact Details (For E-Ticket Delivery)
            </h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector & Promo Code */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Payment Section (7 cols) */}
            <div className="md:col-span-7 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                <span>Select Payment Method</span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-normal">
                  <ShieldCheck className="h-3.5 w-3.5" /> 256-bit Encrypted
                </span>
              </h4>

              {/* Payment Tabs */}
              <div className="flex gap-2 border-b border-white/10 pb-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    paymentMethod === 'upi'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    paymentMethod === 'card'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    paymentMethod === 'netbanking'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Building className="h-3.5 w-3.5" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* UPI Tab */}
              {paymentMethod === 'upi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Enter UPI VPA / ID (Google Pay, PhonePe, Paytm)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Instant payment approval with zero convenience surcharge</span>
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NetBanking Tab */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <label className="block text-[11px] text-slate-400">Popular Banks</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-left text-slate-300 hover:border-rose-500 hover:text-white"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bill Summary (5 cols) */}
            <div className="md:col-span-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Price Breakdown
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Tickets ({selectedSeats.length})</span>
                    <span className="tabular-nums">₹{seatAmount}</span>
                  </div>

                  {snackAmount > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span>Gourmet Food & Drinks</span>
                      <span className="tabular-nums">₹{snackAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>Convenience Fee</span>
                    <span className="tabular-nums">₹{convenienceFee}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Integrated GST (18%)</span>
                    <span className="tabular-nums">₹{taxes}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount ({promoApplied.code})</span>
                      <span className="tabular-nums">-₹{promoApplied.discount}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code input */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon: CINEPASS50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs text-white placeholder-slate-500 uppercase focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="text-[11px] text-emerald-400 mt-1">
                      Coupon applied successfully!
                    </p>
                  )}
                </div>
              </div>

              {/* Total & Pay button */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Amount Payable
                  </span>
                  <span className="text-xl font-extrabold text-white tabular-nums">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePayAndBook}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition shadow-lg ${
                    isProcessing
                      ? 'bg-rose-700/60 text-white cursor-wait'
                      : 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/30 active:scale-95'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>{processingStatus}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Pay & Book ₹{totalAmount.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
