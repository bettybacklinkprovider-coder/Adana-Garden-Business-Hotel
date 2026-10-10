import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomType?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomType,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('deluxe-room');
  const [specialRequests, setSpecialRequests] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSummary, setSubmittedSummary] = useState<{
    referenceId: string;
    fullName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: string;
    roomName: string;
    specialRequests: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Set default dates on open
  useEffect(() => {
    if (isOpen) {
      if (initialRoomType) {
        setRoomType(initialRoomType);
      }
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const toISO = (d: Date) => d.toISOString().split('T')[0];
      if (!checkIn) setCheckIn(toISO(today));
      if (!checkOut) setCheckOut(toISO(tomorrow));
      setErrors({});
      setSubmittedSummary(null);
    }
  }, [isOpen, initialRoomType]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = 'Please enter a valid email address';
    if (!phone.trim() || phone.trim().length < 7)
      newErrors.phone = 'Please provide a valid phone number';
    if (!checkIn) newErrors.checkIn = 'Please select a check-in date';
    if (!checkOut) newErrors.checkOut = 'Please select a check-out date';

    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      if (outDate <= inDate) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const selectedRoom = ROOMS_DATA.find((r) => r.id === roomType) || ROOMS_DATA[1];
    const refCode = `AGBH-${Math.floor(100000 + Math.random() * 900000)}`;

    setSubmittedSummary({
      referenceId: refCode,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      checkIn,
      checkOut,
      nights,
      guests,
      roomName: selectedRoom.name,
      specialRequests: specialRequests.trim() || 'None specified',
    });
  };

  const handleCopySummary = () => {
    if (!submittedSummary) return;
    const text = `ADANA GARDEN BUSINESS HOTEL - RESERVATION INQUIRY
Inquiry Code: ${submittedSummary.referenceId}
Guest: ${submittedSummary.fullName}
Phone: ${submittedSummary.phone}
Email: ${submittedSummary.email}
Dates: ${submittedSummary.checkIn} to ${submittedSummary.checkOut} (${submittedSummary.nights} nights)
Room: ${submittedSummary.roomName} (${submittedSummary.guests} Guests)
Requests: ${submittedSummary.specialRequests}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#071629] border border-[#123B69] rounded-xl shadow-2xl text-slate-200 overflow-hidden my-8">
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#123B69] to-[#071629] border-b border-[#123B69]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#D4AF65]/50 flex items-center justify-center bg-[#071629]">
              <Calendar className="w-4 h-4 text-[#D4AF65]" />
            </div>
            <div>
              <h3 id="modal-headline" className="font-serif text-lg font-bold text-white tracking-wide">
                Reservation Inquiry
              </h3>
              <p className="text-[11px] text-[#D4AF65] tracking-wider uppercase font-semibold">
                Adana Garden Business Hotel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {!submittedSummary ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-[#123B69]/30 border border-[#123B69] rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#D4AF65] shrink-0 mt-0.5" />
                <p>
                  Direct reservation inquiries are reviewed by our front desk. For immediate same-day
                  bookings, please call{' '}
                  <a href={`tel:${HOTEL_INFO.phoneClean}`} className="text-[#D4AF65] underline font-medium">
                    +90 322 459 8222
                  </a>
                  .
                </p>
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-checkin" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Check-in Date *
                  </label>
                  <input
                    id="modal-checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] transition-colors"
                  />
                  {errors.checkIn && (
                    <p className="text-xs text-[#B21F3A] mt-1">{errors.checkIn}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-checkout" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Check-out Date *
                  </label>
                  <input
                    id="modal-checkout"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] transition-colors"
                  />
                  {errors.checkOut && (
                    <p className="text-xs text-[#B21F3A] mt-1">{errors.checkOut}</p>
                  )}
                </div>
              </div>

              {/* Room & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-room-type" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Room Category *
                  </label>
                  <select
                    id="modal-room-type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] transition-colors"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-guests" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Number of Guests *
                  </label>
                  <select
                    id="modal-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] transition-colors"
                  >
                    <option value="1">1 Adult (Solo Business)</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-1">
                <div>
                  <label htmlFor="modal-fullname" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="modal-fullname"
                    type="text"
                    placeholder="e.g. Ahmet Yılmaz / John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] placeholder-slate-500"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#B21F3A] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] placeholder-slate-500"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      placeholder="+90 5XX XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] placeholder-slate-500"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-requests" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="modal-requests"
                    rows={2}
                    placeholder="Late arrival, high floor preference, airport taxi coordination..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65] placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md border border-[#D4AF65]/50 shadow-lg transition-all"
                >
                  Submit Reservation Inquiry
                </button>
              </div>
            </form>
          ) : (
            /* Inquiry Summary State with Explicit Demo Notice (Zero Fake Confirmation) */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-white">
                  Reservation Inquiry Generated
                </h4>
                <p className="text-xs font-mono text-[#D4AF65] tracking-wider">
                  Reference: {submittedSummary.referenceId}
                </p>
              </div>

              {/* Mandatory Honest Notice as required by prompt */}
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-1">
                <p className="font-semibold text-amber-300">
                  Notice: Demonstration Inquiry Mode
                </p>
                <p>
                  This inquiry has been generated and validated locally on your device. Since an automated
                  central reservation API is not currently connected, no booking charge has been made and
                  this message has not been transmitted over an external CRS server.
                </p>
                <p>
                  To finalize and guarantee your reservation, please contact our Front Desk directly via
                  telephone or present your inquiry reference code below.
                </p>
              </div>

              {/* Inquiry Summary Card */}
              <div className="p-5 rounded-lg bg-[#0c203b] border border-[#123B69] space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#123B69] pb-2">
                  <span className="text-slate-400">Guest Name</span>
                  <span className="font-medium text-white">{submittedSummary.fullName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#123B69] pb-2">
                  <span className="text-slate-400">Selected Room</span>
                  <span className="font-medium text-white">{submittedSummary.roomName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#123B69] pb-2">
                  <span className="text-slate-400">Dates</span>
                  <span className="font-medium text-white">
                    {submittedSummary.checkIn} to {submittedSummary.checkOut} ({submittedSummary.nights} nights)
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#123B69] pb-2">
                  <span className="text-slate-400">Guests</span>
                  <span className="font-medium text-white">{submittedSummary.guests} Person(s)</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#123B69] pb-2">
                  <span className="text-slate-400">Contact</span>
                  <span className="font-medium text-white">{submittedSummary.phone} · {submittedSummary.email}</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="text-slate-400">Special Notes</span>
                  <span className="font-medium text-white text-right max-w-xs">{submittedSummary.specialRequests}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleCopySummary}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-200 bg-[#123B69] hover:bg-[#1d4e89] rounded-md transition-colors"
                >
                  <Copy className="w-4 h-4 text-[#D4AF65]" />
                  <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${HOTEL_INFO.phoneClean}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#B21F3A] hover:bg-[#8B1538] rounded-md border border-[#D4AF65]/40 transition-colors shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF65]" />
                    <span>Call +90 322 459 8222</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
