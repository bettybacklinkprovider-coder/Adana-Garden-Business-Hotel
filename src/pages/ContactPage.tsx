import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  ExternalLink,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Building2,
  Users,
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roomParam = searchParams.get('room');

  const [inquiryType, setInquiryType] = useState<'individual' | 'corporate'>('individual');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('deluxe-room');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (roomParam && ROOMS_DATA.some((r) => r.id === roomParam)) {
      setRoomType(roomParam);
    }

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const toISO = (d: Date) => d.toISOString().split('T')[0];

    if (!checkIn) setCheckIn(toISO(today));
    if (!checkOut) setCheckOut(toISO(tomorrow));
  }, [roomParam]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      errs.email = 'Valid email is required';
    if (!phone.trim() || phone.trim().length < 7)
      errs.phone = 'Valid phone number is required';
    if (!checkIn) errs.checkIn = 'Check-in date is required';
    if (!checkOut) errs.checkOut = 'Check-out date is required';

    if (checkIn && checkOut) {
      if (new Date(checkOut) <= new Date(checkIn)) {
        errs.checkOut = 'Check-out must be after check-in';
      }
    }

    if (inquiryType === 'corporate' && !companyName.trim()) {
      errs.companyName = 'Company name is required for corporate inquiries';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
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

    setSubmittedData({
      refCode,
      inquiryType,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      companyName: companyName.trim(),
      checkIn,
      checkOut,
      nights,
      guests,
      roomName: selectedRoom.name,
      message: message.trim() || 'No additional instructions',
    });
  };

  const handleCopySummary = () => {
    if (!submittedData) return;
    const txt = `ADANA GARDEN BUSINESS HOTEL INQUIRY
Reference: ${submittedData.refCode}
Type: ${submittedData.inquiryType.toUpperCase()}
Guest: ${submittedData.fullName}
${submittedData.companyName ? `Company: ${submittedData.companyName}\n` : ''}Phone: ${submittedData.phone}
Email: ${submittedData.email}
Dates: ${submittedData.checkIn} to ${submittedData.checkOut} (${submittedData.nights} nights)
Room: ${submittedData.roomName}
Guests: ${submittedData.guests}
Notes: ${submittedData.message}`;

    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full bg-[#071629] pt-24 pb-20">
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative py-20 bg-gradient-to-b from-[#0a1c33] via-[#071629] to-[#071629] border-b border-[#123B69]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF65]/40 bg-[#071629]/90 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF65] font-semibold">
              Front Desk & Concierge
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Contact & Reservations
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Reach our reception desk in Seyhan, Adana for immediate booking requests, corporate rates,
            and personalized guest travel assistance.
          </p>
        </div>
      </section>

      {/* ========================================================
          CONTACT CARDS & DIRECT HOTLINES
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="bg-[#0c203b] p-6 rounded-xl border border-[#123B69] space-y-3 shadow-xl hover:border-[#D4AF65]/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#123B69] flex items-center justify-center text-[#D4AF65]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-white">Direct Phone Link</h3>
            <p className="text-xs text-slate-400">Available 24 hours daily for direct calls and inquiries:</p>
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="inline-block font-mono text-base font-bold text-[#D4AF65] hover:underline"
            >
              {HOTEL_INFO.phone}
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-[#0c203b] p-6 rounded-xl border border-[#123B69] space-y-3 shadow-xl hover:border-[#D4AF65]/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#123B69] flex items-center justify-center text-[#D4AF65]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-white">Hotel Address</h3>
            <p className="text-xs text-slate-300 leading-snug">
              {HOTEL_INFO.address}
            </p>
            <a
              href={HOTEL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#D4AF65] hover:text-white font-medium transition-colors"
            >
              <span>Get Driving Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Timings Card */}
          <div className="bg-[#0c203b] p-6 rounded-xl border border-[#123B69] space-y-3 shadow-xl hover:border-[#D4AF65]/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#123B69] flex items-center justify-center text-[#D4AF65]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-white">Reception & Check-in</h3>
            <div className="text-xs text-slate-300 space-y-1">
              <p>Front Desk: <strong className="text-white">24/7 Always Open</strong></p>
              <p>Check-in: <strong className="text-white">From 14:00</strong></p>
              <p>Check-out: <strong className="text-white">Until 12:00</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN FORM & INTERACTIVE MAP VIEW
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Reservation & Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0c203b] p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#123B69] shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#123B69] pb-6 mb-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Reservation & Contact Form
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Submit your travel dates or corporate inquiry to our team.
                </p>
              </div>

              {/* Inquiry Type Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#071629] rounded-lg border border-[#123B69]">
                <button
                  type="button"
                  onClick={() => setInquiryType('individual')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    inquiryType === 'individual'
                      ? 'bg-[#123B69] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('corporate')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    inquiryType === 'corporate'
                      ? 'bg-[#123B69] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Corporate
                </button>
              </div>
            </div>

            {!submittedData ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Notice */}
                <div className="p-3.5 rounded-lg bg-[#071629] border border-[#123B69] text-xs text-slate-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#D4AF65] shrink-0 mt-0.5" />
                  <p>
                    All reservations receive direct review. For urgent same-day bookings, call{' '}
                    <a href={`tel:${HOTEL_INFO.phoneClean}`} className="text-[#D4AF65] font-semibold underline">
                      +90 322 459 8222
                    </a>
                    .
                  </p>
                </div>

                {/* Corporate Company Name Field */}
                {inquiryType === 'corporate' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anadolu Logistics A.Ş."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    />
                    {errors.companyName && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.companyName}</p>
                    )}
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Contact Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ali Demir"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+90 5XX XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Number of Guests *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    >
                      <option value="1">1 Adult (Solo Traveler)</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Guests</option>
                      <option value="4+">4+ Guests / Delegation</option>
                    </select>
                  </div>
                </div>

                {/* Dates & Room Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    />
                    {errors.checkIn && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.checkIn}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    />
                    {errors.checkOut && (
                      <p className="text-xs text-[#B21F3A] mt-1">{errors.checkOut}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Room Category *
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                    >
                      {ROOMS_DATA.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message & Special Requests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Message or Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Late flight arrival, high floor preference, airport taxi transfer, corporate tax ID for invoicing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#071629] border border-[#123B69] rounded-md text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md border border-[#D4AF65]/50 shadow-xl transition-all"
                  >
                    <Send className="w-4 h-4 text-[#D4AF65]" />
                    <span>Submit Reservation Inquiry</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Submission Result & Clear Honest Notice */
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">
                      Reservation Inquiry Recorded ({submittedData.refCode})
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Thank you, {submittedData.fullName}. Your dates for {submittedData.roomName} have been recorded.
                    </p>
                  </div>
                </div>

                {/* Prompt-mandated transparency notice: no fake booking confirmation */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-1.5">
                  <p className="font-semibold text-amber-300">
                    Transparent Notice: Demonstration Mode
                  </p>
                  <p>
                    This hotel website inquiry interface is in demonstration mode. While the form has verified
                    and formatted your input, no automated external messaging service or live CRS is connected to this client preview.
                  </p>
                  <p>
                    To confirm availability and finalize your stay right now, please call our Front Desk
                    at <strong className="text-white">+90 322 459 8222</strong> and quote your reference code: <span className="font-mono text-white">{submittedData.refCode}</span>.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#071629] border border-[#123B69] space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#123B69] pb-2">
                    <span className="text-slate-400">Guest / Contact</span>
                    <span className="font-semibold text-white">
                      {submittedData.fullName} {submittedData.companyName ? `(${submittedData.companyName})` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#123B69] pb-2">
                    <span className="text-slate-400">Stay Dates</span>
                    <span className="font-semibold text-white">
                      {submittedData.checkIn} to {submittedData.checkOut} ({submittedData.nights} nights)
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#123B69] pb-2">
                    <span className="text-slate-400">Selected Room</span>
                    <span className="font-semibold text-white">{submittedData.roomName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#123B69] pb-2">
                    <span className="text-slate-400">Guests</span>
                    <span className="font-semibold text-white">{submittedData.guests} Person(s)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#123B69] pb-2">
                    <span className="text-slate-400">Contact Info</span>
                    <span className="font-semibold text-white">{submittedData.phone} · {submittedData.email}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Requests</span>
                    <span className="text-white text-right max-w-xs">{submittedData.message}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-200 bg-[#123B69] hover:bg-[#1d4e89] rounded-md"
                  >
                    <Copy className="w-4 h-4 text-[#D4AF65]" />
                    <span>{copied ? 'Summary Copied!' : 'Copy Inquiry Summary'}</span>
                  </button>

                  <a
                    href={`tel:${HOTEL_INFO.phoneClean}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#B21F3A] hover:bg-[#8B1538] rounded-md border border-[#D4AF65]/40"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF65]" />
                    <span>Call +90 322 459 8222</span>
                  </a>

                  <button
                    onClick={() => setSubmittedData(null)}
                    className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                  >
                    New Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Verified Location, Map Guide & Corporate Services */}
          <div className="lg:col-span-5 space-y-6">
            {/* Map & Directions Card */}
            <div className="bg-[#0c203b] p-6 sm:p-8 rounded-2xl border border-[#123B69] space-y-6 shadow-2xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Location & Map Guide
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reşatbey, 62013. Sk. No:35, 01300 Seyhan/Adana, Türkiye
                </p>
              </div>

              {/* Styled interactive map preview */}
              <div className="relative rounded-xl overflow-hidden border border-[#123B69] h-52 bg-[#071629] flex flex-col items-center justify-center p-6 text-center group">
                <div className="w-12 h-12 rounded-full bg-[#123B69] border border-[#D4AF65]/50 flex items-center justify-center text-[#D4AF65] mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-sm font-bold text-white">
                  Reşatbey, Seyhan, Adana
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Coordinates: 36.99° N, 35.32° E · Central Adana Business Core
                </p>
                <div className="mt-3">
                  <span className="text-[11px] text-[#D4AF65] underline font-semibold">
                    Click below to open verified Google Maps directions
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-100 bg-[#123B69] hover:bg-[#1d4e89] rounded-md border border-[#123B69] transition-all text-center"
                >
                  <MapPin className="w-4 h-4 text-[#D4AF65]" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] rounded-md border border-[#D4AF65]/40 transition-all text-center"
                >
                  <Phone className="w-4 h-4 text-[#D4AF65]" />
                  <span>Call Hotel: +90 322 459 8222</span>
                </a>
              </div>
            </div>

            {/* Corporate & Long Stay Inquiries */}
            <div className="bg-[#0c203b] p-6 rounded-2xl border border-[#123B69] space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF65]">
                <Building2 className="w-5 h-5" />
                <h4 className="font-serif text-sm font-bold text-white">
                  Corporate & Extended Stays
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Traveling with a team for industrial projects, conventions, or government delegations in
                Adana? Contact our corporate coordinator for negotiated company rates, direct billing
                agreements, and group reservations.
              </p>
              <div className="pt-1 text-xs text-slate-400">
                Email inquiries: <span className="text-white font-mono">{HOTEL_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
