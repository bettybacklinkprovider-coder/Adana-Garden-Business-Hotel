import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Calendar,
  ArrowRight,
  MapPin,
  Wifi,
  Briefcase,
  Clock,
  Coffee,
  Car,
  Bed,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA, HOTEL_AMENITIES, ADANA_ATTRACTIONS } from '../data/hotelData';
import { Room } from '../types';

interface HomePageProps {
  onOpenBooking: (roomType?: string) => void;
  onSelectRoom: (room: Room) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking, onSelectRoom }) => {
  // Inline reservation form in Section 6
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCheckIn, setFormCheckIn] = useState('');
  const [formCheckOut, setFormCheckOut] = useState('');
  const [formGuests, setFormGuests] = useState('2');
  const [formRoomType, setFormRoomType] = useState('deluxe-room');
  const [formRequests, setFormRequests] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formName.trim()) errs.name = 'Full name is required';
    if (!formEmail.trim() || !/^\S+@\S+\.\S+$/.test(formEmail))
      errs.email = 'Valid email is required';
    if (!formPhone.trim() || formPhone.trim().length < 7)
      errs.phone = 'Valid telephone is required';
    if (!formCheckIn) errs.checkIn = 'Check-in date is required';
    if (!formCheckOut) errs.checkOut = 'Check-out date is required';

    if (formCheckIn && formCheckOut) {
      if (new Date(formCheckOut) <= new Date(formCheckIn)) {
        errs.checkOut = 'Check-out must be after check-in';
      }
    }

    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const selectedRoom = ROOMS_DATA.find((r) => r.id === formRoomType) || ROOMS_DATA[1];
    const code = `AGBH-${Math.floor(100000 + Math.random() * 900000)}`;
    setFormSubmitted({
      code,
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      checkIn: formCheckIn,
      checkOut: formCheckOut,
      guests: formGuests,
      roomName: selectedRoom.name,
      requests: formRequests.trim() || 'No special requests',
    });
  };

  const handleCopyCode = () => {
    if (!formSubmitted) return;
    const txt = `ADANA GARDEN BUSINESS HOTEL INQUIRY: ${formSubmitted.code} | Guest: ${formSubmitted.name} | Dates: ${formSubmitted.checkIn} to ${formSubmitted.checkOut} | Room: ${formSubmitted.roomName} | Phone: ${formSubmitted.phone}`;
    navigator.clipboard.writeText(txt);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="flex flex-col w-full bg-[#071629]">
      {/* ========================================================
          SECTION 1: Luxury Hero Banner
          ======================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Slow Ambient Zoom */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOTEL_INFO.images.exterior}
            alt="Adana Garden Business Hotel Exterior Dusk"
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            style={{ animationDuration: '14s' }}
            referrerPolicy="no-referrer"
          />
          {/* Dark navy overlay with crimson & gold gradient accents */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/75 to-[#071629]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071629]/80 via-transparent to-[#8B1538]/25 mix-blend-multiply" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Refined Brand Crest / Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF65]/40 bg-[#071629]/80 backdrop-blur-md mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF65] font-semibold">
              Seyhan · Adana · Türkiye
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6 drop-shadow-md text-balance">
            Experience Comfort. <br />
            <span className="bg-gradient-to-r from-white via-[#F3F5F8] to-[#D4AF65] bg-clip-text text-transparent">
              Discover Adana.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed mb-10 text-balance drop-shadow">
            A refined hotel experience combining modern comfort, warm hospitality, and convenient
            business travel in Adana, Türkiye.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/rooms"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-100 bg-[#123B69]/90 hover:bg-[#1d4e89] border border-[#123B69] hover:border-[#D4AF65]/60 rounded-md backdrop-blur-md transition-all shadow-lg hover:-translate-y-0.5"
            >
              <span>Explore Our Rooms</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF65]" />
            </Link>

            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md border border-[#D4AF65]/50 shadow-xl shadow-black/40 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#D4AF65]" />
              <span>Book Your Stay</span>
            </button>

            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-[#071629]/70 hover:bg-[#071629] border border-white/20 hover:border-[#D4AF65] rounded-md transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4AF65]" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Location & Distinction Strip */}
          <div className="mt-14 pt-6 border-t border-white/10 w-full max-w-3xl flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF65]" />
              <span>Reşatbey, Seyhan Central Location</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF65]" />
              <span>24/7 Dedicated Reception</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-[#D4AF65]" />
              <span>Fiber High-Speed Connectivity</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: Welcome to Adana Garden Business Hotel
          ======================================================== */}
      <section className="py-24 bg-[#0a1a30] border-t border-b border-[#123B69]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-xl overflow-hidden border border-[#123B69] shadow-2xl group">
                <img
                  src={HOTEL_INFO.images.lobby}
                  alt="Adana Garden Business Hotel Elegant Reception & Lobby"
                  className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#071629]/90 backdrop-blur-md p-4 rounded-lg border border-[#123B69] max-w-sm">
                    <p className="font-serif text-sm font-semibold text-white">
                      Executive Lounge & Welcome Area
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Designed for tranquil check-ins, informal client talks, and quiet morning coffee.
                    </p>
                  </div>
                </div>
              </div>
              {/* Subtle decorative gold accent frame */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-48 h-48 border border-[#D4AF65]/30 rounded-xl -z-10 pointer-events-none" />
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
                  Welcome to Seyhan
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight text-balance">
                  Your Comfortable Stay in the Heart of Adana
                </h2>
              </div>

              <div className="w-16 h-[2px] bg-gradient-to-r from-[#D4AF65] to-transparent" />

              <p className="text-base text-slate-300 leading-relaxed">
                Situated in the prestigious Reşatbey neighborhood of Seyhan,{' '}
                <strong className="text-white font-semibold">Adana Garden Business Hotel</strong>{' '}
                was established to offer modern professionals and travelers a serene, high-comfort sanctuary.
                We bridge the functional requirements of contemporary business travelers with the authentic
                warmth of Turkish hospitality.
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you arrive in Adana for high-stakes corporate engagements, regional industrial conferences,
                or cultural exploration along the historic Seyhan River, our rooms offer restorative peace,
                ergonomic workstations, and round-the-clock personal assistance.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#071629] border border-[#123B69]">
                  <p className="font-serif text-xl font-bold text-[#D4AF65]">Central</p>
                  <p className="text-xs text-slate-300 mt-0.5">Reşatbey business district position</p>
                </div>
                <div className="p-4 rounded-lg bg-[#071629] border border-[#123B69]">
                  <p className="font-serif text-xl font-bold text-[#D4AF65]">24 / 7</p>
                  <p className="text-xs text-slate-300 mt-0.5">Reception & concierge support</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#123B69] hover:bg-[#1d4e89] border border-[#D4AF65]/50 hover:border-[#D4AF65] rounded-md transition-all shadow-md group"
                >
                  <span>Discover Our Hotel</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF65] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: Rooms & Accommodation
          ======================================================== */}
      <section className="py-24 bg-[#071629]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
                Accommodation & Suites
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Rooms Designed for Quiet Rest & Productivity
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Thoughtfully appointed guest rooms tailored for business professionals and visitors seeking
                superior rest, acoustic quietness, and modern connectivity.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF65] hover:text-white transition-colors border-b border-[#D4AF65] pb-1 self-start md:self-end"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Room Cards Grid (4 categories) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ROOMS_DATA.map((room) => (
              <div
                key={room.id}
                className="bg-[#0c203b] rounded-xl border border-[#123B69] overflow-hidden flex flex-col group hover:border-[#D4AF65]/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Photo container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c203b] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 bg-[#071629]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#123B69] text-[11px] font-medium text-slate-200">
                    {room.size}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#D4AF65] font-semibold uppercase tracking-wider mb-1">
                      <span>{room.category}</span>
                      <span className="text-slate-400 font-normal">{room.capacity}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF65] transition-colors">
                      {room.name}
                    </h3>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {room.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#123B69]/60">
                    {/* Price Placeholder */}
                    <div className="mb-4">
                      <p className="text-[10px] uppercase text-slate-400 tracking-wider">
                        Rate placeholder
                      </p>
                      <p className="font-serif text-sm font-bold text-white">
                        {room.pricePlaceholder}{' '}
                        <span className="text-[11px] font-normal text-slate-400">/ night</span>
                      </p>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectRoom(room)}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-[#123B69]/70 hover:bg-[#123B69] rounded border border-[#123B69] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF65]" />
                        <span>View Room</span>
                      </button>

                      <button
                        onClick={() => onOpenBooking(room.id)}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-[#B21F3A] hover:bg-[#8B1538] rounded border border-[#D4AF65]/40 transition-colors shadow-sm"
                      >
                        <span>Reserve</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-100 bg-[#123B69] hover:bg-[#1d4e89] border border-[#D4AF65]/40 hover:border-[#D4AF65] rounded-md transition-all shadow-md"
            >
              <span>Explore Full Room Portfolio & Amenities</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF65]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: Comfort & Guest Experience
          ======================================================== */}
      <section className="py-24 bg-[#0a1a30] border-t border-b border-[#123B69]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
              Hospitality Standards
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Comfort & Guest Experience
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Designed around the exact needs of corporate guests, independent executives, and leisure visitors.
            </p>
          </div>

          {/* Modern Feature Cards with High-Fidelity Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {HOTEL_AMENITIES.map((item, idx) => {
              const icons = [Bed, Briefcase, MapPin, Clock, Coffee, Car];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="bg-[#071629] rounded-xl border border-[#123B69] overflow-hidden flex flex-col group hover:border-[#D4AF65]/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Photo Container with Gradient and Badges */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0a1c33]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/20 to-transparent" />

                    {/* Tag Badge */}
                    <div className="absolute top-3 right-3 bg-[#071629]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#123B69] text-[10px] font-semibold text-[#D4AF65] uppercase tracking-wider shadow-sm">
                      {item.tag || item.category}
                    </div>

                    {/* Floating Icon Badge */}
                    <div className="absolute bottom-3 left-4 w-11 h-11 rounded-lg bg-[#071629]/95 backdrop-blur-md border border-[#D4AF65]/50 flex items-center justify-center text-[#D4AF65] shadow-lg group-hover:bg-[#123B69] group-hover:border-[#D4AF65] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF65] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Feature Highlight Footer */}
                    <div className="pt-3 border-t border-[#123B69]/60 flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF65] shrink-0" />
                        <span>{item.featureNote || 'Standard Amenity'}</span>
                      </span>
                      <span className="text-[#D4AF65] font-semibold tracking-wide">
                        {item.highlight || 'Included'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: Explore Adana
          ======================================================== */}
      <section className="py-24 bg-[#071629]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
                  Destination & Heritage
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  Discover the Beauty of Adana
                </h2>
              </div>

              <div className="w-16 h-[2px] bg-gradient-to-r from-[#D4AF65] to-transparent" />

              <p className="text-sm text-slate-300 leading-relaxed">
                Adana is an enchanting synthesis of ancient Cilician heritage, energetic commerce, and one
                of the world’s most celebrated culinary traditions. From the Roman stone arches of Taşköprü
                to the serene waters of the Seyhan River, visitors will find a vibrant city that leaves lasting impressions.
              </p>

              <div className="space-y-3 pt-2">
                {ADANA_ATTRACTIONS.map((attraction, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-[#0c203b] border border-[#123B69]/70">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-white font-serif">{attraction.title}</strong>
                      <span className="text-[11px] text-[#D4AF65]">{attraction.category}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{attraction.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-100 bg-[#123B69] hover:bg-[#1d4e89] border border-[#D4AF65]/40 rounded-md transition-all shadow-md"
                >
                  <span>Explore Adana & Neighborhood Guide</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF65]" />
                </Link>
              </div>
            </div>

            {/* Right Large Image */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl overflow-hidden border border-[#123B69] shadow-2xl group">
                <img
                  src={HOTEL_INFO.images.city}
                  alt="Seyhan River and Historical Adana Stone Bridge at Sunset"
                  className="w-full h-[450px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-[#071629]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#071629]/85 backdrop-blur-md p-4 rounded-lg border border-[#123B69]">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF65]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Seyhan River & Historic Taşköprü</span>
                    </div>
                    <p className="text-xs text-slate-200 mt-1">
                      One of the world’s oldest operational bridges, flanked by the iconic minarets of Sabancı Central Mosque.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: Contact, Reservations & Footer
          ======================================================== */}
      <section className="py-24 bg-[#0a1a30] border-t border-[#123B69]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
              Direct Inquiries & Bookings
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Make Your Next Stay Special
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Plan your corporate journey or leisurely visit to Adana. Contact our reservations desk
              or submit an inquiry below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Hotel Direct Details & Quick Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#071629] p-6 sm:p-8 rounded-xl border border-[#123B69] space-y-6 shadow-xl">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {HOTEL_INFO.name}
                  </h3>
                  <p className="text-xs text-[#D4AF65] tracking-widest uppercase font-semibold mt-1">
                    Seyhan · Adana · Türkiye
                  </p>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D4AF65] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs uppercase tracking-wider mb-0.5">
                        Address
                      </strong>
                      <p className="text-xs leading-relaxed">{HOTEL_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#D4AF65] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs uppercase tracking-wider mb-0.5">
                        Phone Number
                      </strong>
                      <a
                        href={`tel:${HOTEL_INFO.phoneClean}`}
                        className="text-[#D4AF65] hover:underline font-semibold text-sm"
                      >
                        {HOTEL_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#D4AF65] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs uppercase tracking-wider mb-0.5">
                        Reception Hours
                      </strong>
                      <p className="text-xs">24 Hours / 7 Days a week</p>
                    </div>
                  </div>
                </div>

                {/* The 3 Required Action Buttons */}
                <div className="pt-2 flex flex-col gap-3">
                  <a
                    href={`tel:${HOTEL_INFO.phoneClean}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md border border-[#D4AF65]/40 shadow-md transition-all text-center"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF65]" />
                    <span>Call the Hotel (+90 322 459 8222)</span>
                  </a>

                  <a
                    href={HOTEL_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-100 bg-[#123B69] hover:bg-[#1d4e89] rounded-md border border-[#123B69] transition-all text-center"
                  >
                    <MapPin className="w-4 h-4 text-[#D4AF65]" />
                    <span>Get Directions in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#D4AF65] hover:text-white bg-[#0c203b] hover:bg-[#123B69] rounded-md border border-[#123B69] transition-all text-center"
                  >
                    <span>Contact & Reservations Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Interactive Reservation Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#071629] p-6 sm:p-8 rounded-xl border border-[#123B69] shadow-xl">
                <div className="border-b border-[#123B69] pb-4 mb-6">
                  <h3 className="font-serif text-xl font-bold text-white">
                    Direct Reservation Inquiry Form
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out your dates and contact details to generate your reservation inquiry.
                  </p>
                </div>

                {!formSubmitted ? (
                  <form onSubmit={handleInlineSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mehmet Kaya"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                        />
                        {formErrors.name && (
                          <p className="text-xs text-[#B21F3A] mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="name@business.com"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                        />
                        {formErrors.email && (
                          <p className="text-xs text-[#B21F3A] mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+90 5XX XXX XXXX"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-[#B21F3A] mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Check-in Date *
                        </label>
                        <input
                          type="date"
                          value={formCheckIn}
                          onChange={(e) => setFormCheckIn(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                        />
                        {formErrors.checkIn && (
                          <p className="text-xs text-[#B21F3A] mt-1">{formErrors.checkIn}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Check-out Date *
                        </label>
                        <input
                          type="date"
                          value={formCheckOut}
                          onChange={(e) => setFormCheckOut(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                        />
                        {formErrors.checkOut && (
                          <p className="text-xs text-[#B21F3A] mt-1">{formErrors.checkOut}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Room Category *
                        </label>
                        <select
                          value={formRoomType}
                          onChange={(e) => setFormRoomType(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                        >
                          {ROOMS_DATA.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                          Number of Guests
                        </label>
                        <select
                          value={formGuests}
                          onChange={(e) => setFormGuests(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Special Requests or Business Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Estimated arrival hour, invoice company name, quiet room..."
                        value={formRequests}
                        onChange={(e) => setFormRequests(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#0c203b] border border-[#123B69] rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF65]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md border border-[#D4AF65]/50 shadow-lg transition-all"
                      >
                        Submit Reservation Inquiry
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Form Submission Summary */
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white">
                          Inquiry Prepared: {formSubmitted.code}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          Your reservation details for {formSubmitted.name} have been registered.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-[#D4AF65] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 block">Demonstration Notice:</strong>
                        This website inquiry demo is operating without an external PMS/CRS webhook. To
                        guarantee your booking dates directly, please contact the hotel reception at{' '}
                        <a href={`tel:${HOTEL_INFO.phoneClean}`} className="underline font-bold text-white">
                          +90 322 459 8222
                        </a>
                        .
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0c203b] border border-[#123B69] text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Room:</span>
                        <span className="text-white font-medium">{formSubmitted.roomName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dates:</span>
                        <span className="text-white font-medium">
                          {formSubmitted.checkIn} to {formSubmitted.checkOut}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Guests:</span>
                        <span className="text-white font-medium">{formSubmitted.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Contact:</span>
                        <span className="text-white font-medium">{formSubmitted.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        onClick={handleCopyCode}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-[#123B69] hover:bg-[#1d4e89] rounded"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#D4AF65]" />
                        <span>{copiedCode ? 'Inquiry Copied' : 'Copy Inquiry Summary'}</span>
                      </button>

                      <a
                        href={`tel:${HOTEL_INFO.phoneClean}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#B21F3A] hover:bg-[#8B1538] rounded border border-[#D4AF65]/40"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#D4AF65]" />
                        <span>Call Front Desk Now</span>
                      </a>

                      <button
                        onClick={() => setFormSubmitted(null)}
                        className="text-xs text-slate-400 hover:text-white px-3 py-2"
                      >
                        New Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
