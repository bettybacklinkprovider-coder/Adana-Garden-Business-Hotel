import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Briefcase,
  Compass,
  Phone,
  Calendar,
  Sparkles,
  Maximize2,
  X,
  Building,
  CheckCircle,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const galleryImages = [
    {
      src: HOTEL_INFO.images.exterior,
      title: 'Architectural Exterior at Dusk',
      subtitle: 'Modern business facade in Reşatbey, Seyhan',
    },
    {
      src: HOTEL_INFO.images.lobby,
      title: 'Reception & Welcome Lounge',
      subtitle: 'Serene contemporary hospitality interior',
    },
    {
      src: HOTEL_INFO.images.bedroom,
      title: 'Deluxe Guest Quarters',
      subtitle: 'Acoustically insulated executive bedroom',
    },
    {
      src: HOTEL_INFO.images.suite,
      title: 'Executive Garden Suite Salon',
      subtitle: 'Spacious meeting and relaxation area',
    },
    {
      src: HOTEL_INFO.images.city,
      title: 'Adana & Seyhan River Vista',
      subtitle: 'Historic Roman Taşköprü and Sabancı Mosque',
    },
    {
      src: HOTEL_INFO.images.amenityBreakfast,
      title: 'Traditional Turkish Breakfast',
      subtitle: 'Artisan cheeses, olives, pastries & Turkish tea',
    },
  ];

  return (
    <div className="w-full bg-[#071629] pt-24 pb-20">
      {/* Lightbox for gallery inspection */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl border border-[#123B69]" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Gallery Preview" className="max-h-[85vh] w-auto object-contain" referrerPolicy="no-referrer" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:text-[#D4AF65] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative py-20 bg-gradient-to-b from-[#0a1c33] via-[#071629] to-[#071629] border-b border-[#123B69]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF65]/40 bg-[#071629]/90 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF65] font-semibold">
              Hospitality & Vision
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            About Adana Garden Business Hotel
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A refined hospitality destination designed for business leaders, international executives,
            and discerning travelers seeking understated elegance in Adana, Türkiye.
          </p>
        </div>
      </section>

      {/* ========================================================
          EDITORIAL BRAND STORY & HOSPITALITY PHILOSOPHY
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
                Our Story & Origins
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Refined Comfort in Reşatbey, Seyhan
              </h2>
            </div>

            <div className="w-20 h-[2px] bg-gradient-to-r from-[#D4AF65] to-[#B21F3A]" />

            <p className="text-base text-slate-300 leading-relaxed">
              Adana is one of Türkiye’s historic economic capitals, renowned for its agricultural vitality,
              industrial commerce, and deep-rooted Mediterranean heritage. In the heart of this energetic
              hub lies <strong className="text-white">Adana Garden Business Hotel</strong>, conceived as a
              thoughtful alternative to impersonal corporate chains.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Located on 62013. Sk. in Reşatbey, our hotel balances accessibility with tranquility. While
              the bustling avenues, banks, and corporate headquarters of Seyhan operate just moments away,
              our doors open to acoustic calm, warm walnut textures, and sincere Turkish attentiveness.
            </p>

            {/* Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0c203b] border border-[#123B69]">
                <div className="flex items-center gap-2 mb-2 text-[#D4AF65]">
                  <Briefcase className="w-4 h-4" />
                  <h4 className="font-serif text-sm font-bold text-white">Business Purpose</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fast fiber Wi-Fi, ergonomic work desks, universal power adapters, and soundproof
                  rooms designed for executive productivity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0c203b] border border-[#123B69]">
                <div className="flex items-center gap-2 mb-2 text-[#D4AF65]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-serif text-sm font-bold text-white">Turkish Warmth</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Authentic Anatolian hospitality where every guest is greeted by name, assisted with
                  transport, and served fresh morning teas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-[#123B69] shadow-2xl relative group">
              <img
                src={HOTEL_INFO.images.lobby}
                alt="Hotel Reception Lobby"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-sm font-bold text-white">
                  Adana Garden Business Hotel
                </p>
                <p className="text-xs text-[#D4AF65] mt-0.5">
                  Reşatbey, Seyhan, Adana
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          HOTEL PHOTOGRAPHY GALLERY
          ======================================================== */}
      <section className="py-20 bg-[#0a1a30] border-t border-b border-[#123B69]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
              Visual Showcase
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Hotel & Destination Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Explore our architectural design, comfortable rooms, and the captivating beauty of Adana.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(img.src)}
                className={`relative rounded-xl overflow-hidden border border-[#123B69] group cursor-pointer shadow-lg hover:border-[#D4AF65]/60 transition-all ${
                  idx === 0 ? 'sm:col-span-2 lg:col-span-2 h-72 sm:h-80' : 'h-72 sm:h-80'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/80 via-[#071629]/20 to-transparent group-hover:from-[#071629]/95 transition-all" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF65] transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">{img.subtitle}</p>
                  </div>
                  <div className="p-2 rounded-full bg-[#123B69]/80 text-[#D4AF65] group-hover:bg-[#B21F3A] group-hover:text-white transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          LOCATION & REŞATBEY NEIGHBORHOOD GUIDE
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF65]">
                Neighborhood Context
              </p>
              <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
                The Reşatbey District in Seyhan
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Reşatbey is widely recognized as one of the most distinguished, pedestrian-friendly, and
              central quarters in Adana. Lined with leafy boulevards, specialty cafes, local artisan
              bakeries, and high-end businesses, the neighborhood is safe, vibrant, and thoroughly enjoyable.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0c203b] border border-[#123B69]">
                <MapPin className="w-4 h-4 text-[#D4AF65] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">Central Business Proximity</strong>
                  Quick taxi access to regional corporate headquarters, Seyhan governmental buildings, and exhibition centers.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0c203b] border border-[#123B69]">
                <Compass className="w-4 h-4 text-[#D4AF65] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">Riverside Promenade Access</strong>
                  Short transit or energetic walk to the scenic Seyhan River banks and riverside walking parks.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0c203b] border border-[#123B69]">
                <Building className="w-4 h-4 text-[#D4AF65] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">Airport & Transit Connections</strong>
                  Convenient access for regional highway connections, high-speed rail lines, and regional Adana transit routes.
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0c203b] p-6 sm:p-8 rounded-2xl border border-[#123B69] space-y-6 shadow-xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Hotel Coordinates & Address
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reşatbey, 62013. Sk. No:35, 01300 Seyhan/Adana, Türkiye
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#071629] border border-[#123B69] space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Postal Code:</span>
                  <span className="font-mono text-white">01300</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>District / Province:</span>
                  <span className="text-white">Seyhan / Adana</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Phone:</span>
                  <a href={`tel:${HOTEL_INFO.phoneClean}`} className="text-[#D4AF65] font-semibold">
                    {HOTEL_INFO.phone}
                  </a>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Front Desk:</span>
                  <span className="text-emerald-400 font-medium">Open 24/7</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-100 bg-[#123B69] hover:bg-[#1d4e89] rounded-md transition-colors text-center"
                >
                  <MapPin className="w-4 h-4 text-[#D4AF65]" />
                  <span>Open in Google Maps</span>
                </a>

                <Link
                  to="/contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#B21F3A] hover:bg-[#8B1538] rounded-md border border-[#D4AF65]/40 transition-colors text-center"
                >
                  <span>Inquire Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CALL TO ACTION STRIP
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#123B69] to-[#071629] p-8 sm:p-12 border border-[#123B69] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Experience Refined Hospitality in Adana
            </h3>
            <p className="text-sm text-slate-300">
              Reserve your room or get in touch with our team for corporate bookings.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] rounded-md border border-[#D4AF65]/50 shadow-lg"
            >
              <Calendar className="w-4 h-4 text-[#D4AF65]" />
              <span>Book Your Stay</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
