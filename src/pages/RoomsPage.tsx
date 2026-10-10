import React, { useState } from 'react';
import {
  Bed,
  Users,
  Maximize,
  Check,
  Calendar,
  Phone,
  Eye,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';
import { Room } from '../types';

interface RoomsPageProps {
  onOpenBooking: (roomType?: string) => void;
  onSelectRoom: (room: Room) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenBooking, onSelectRoom }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'standard' | 'deluxe' | 'superior' | 'suite'>('all');

  const filteredRooms = activeCategory === 'all'
    ? ROOMS_DATA
    : ROOMS_DATA.filter((r) => r.category === activeCategory);

  return (
    <div className="w-full bg-[#071629] pt-24 pb-20">
      {/* ========================================================
          HERO BANNER FOR ROOMS & SUITES
          ======================================================== */}
      <section className="relative py-20 bg-gradient-to-b from-[#0a1c33] via-[#071629] to-[#071629] border-b border-[#123B69]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF65]/40 bg-[#071629]/90 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF65] font-semibold">
              Adana Accommodation
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF65]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Rooms & Suites
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Engineered for restorative sleep, acoustic silence, and business productivity.
            Select from our four distinct accommodation tiers in central Seyhan, Adana.
          </p>

          {/* Quick Check-in Policy Strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300 border-t border-[#123B69]/60 pt-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF65]" />
              <span>Check-in: <strong>14:00</strong> · Check-out: <strong>12:00</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF65]" />
              <span>Acoustic Double & Triple Glazing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FILTER TABS (Functional buttons, clean segmented control)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-[#0c203b] p-1.5 rounded-xl border border-[#123B69] max-w-xl mx-auto flex items-center justify-between shadow-xl">
          {[
            { id: 'all', label: 'All Rooms' },
            { id: 'standard', label: 'Standard' },
            { id: 'deluxe', label: 'Deluxe' },
            { id: 'superior', label: 'Superior' },
            { id: 'suite', label: 'Suites' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg transition-all text-center whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-[#B21F3A] to-[#8B1538] text-white shadow-md border border-[#D4AF65]/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================
          ROOM LISTING / INDIVIDUAL SECTIONS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {filteredRooms.map((room, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={room.id}
              id={room.id}
              className="bg-[#0c203b] rounded-2xl border border-[#123B69] overflow-hidden shadow-2xl hover:border-[#D4AF65]/60 transition-all duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                {/* Visual Area */}
                <div className={`lg:col-span-6 relative min-h-[320px] sm:min-h-[400px] ${isReversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c203b]/90 via-transparent to-transparent lg:hidden" />

                  <div className="absolute top-4 left-4 bg-[#071629]/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#123B69] text-xs font-semibold text-[#D4AF65]">
                    {room.floor}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-[#071629]/90 backdrop-blur-md px-3 py-1 rounded border border-[#123B69] text-xs text-slate-200">
                      {room.view}
                    </span>
                    <span className="bg-[#071629]/90 backdrop-blur-md px-3 py-1 rounded border border-[#123B69] text-xs font-semibold text-[#D4AF65]">
                      {room.size}
                    </span>
                  </div>
                </div>

                {/* Information Area */}
                <div className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs text-[#D4AF65] font-semibold uppercase tracking-wider mb-2">
                      <span>Category: {room.category}</span>
                      <span className="text-slate-400 font-normal">Cap: {room.capacity}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                      {room.name}
                    </h2>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {room.fullDescription}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-3 mb-6 p-3.5 rounded-lg bg-[#071629] border border-[#123B69]/60 text-xs">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#D4AF65] shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase">Guests</p>
                          <p className="font-semibold text-white truncate">{room.capacity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#D4AF65] shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase">Bed</p>
                          <p className="font-semibold text-white truncate">{room.bed}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize className="w-4 h-4 text-[#D4AF65] shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase">Size</p>
                          <p className="font-semibold text-white truncate">{room.size}</p>
                        </div>
                      </div>
                    </div>

                    {/* Amenities Checklist */}
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                        Included Room Amenities
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {room.amenities.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-[#D4AF65] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Strip */}
                  <div className="pt-6 border-t border-[#123B69] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider">
                        Rate Placeholder
                      </p>
                      <p className="font-serif text-xl font-bold text-white">
                        {room.pricePlaceholder}{' '}
                        <span className="text-xs font-normal text-slate-400">/ night</span>
                      </p>
                      <p className="text-[10px] text-slate-400 italic mt-0.5">
                        {room.priceNote}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => onSelectRoom(room)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-[#123B69] hover:bg-[#1d4e89] rounded-md transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF65]" />
                        <span>Specs</span>
                      </button>

                      <button
                        onClick={() => onOpenBooking(room.id)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md border border-[#D4AF65]/40 shadow-md transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF65]" />
                        <span>Reserve Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================
          ROOM COMPARISON TABLE
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#0c203b] rounded-2xl border border-[#123B69] p-6 sm:p-8 shadow-xl">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-white">
              Room Comparison Summary
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Side-by-side technical specifications for corporate group booking or extended business stays.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#123B69] text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bed Setup</th>
                  <th className="py-3 px-4">Max Guests</th>
                  <th className="py-3 px-4">Floor</th>
                  <th className="py-3 px-4">Workstation</th>
                  <th className="py-3 px-4 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#123B69]/50 text-slate-200">
                {ROOMS_DATA.map((r) => (
                  <tr key={r.id} className="hover:bg-[#123B69]/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white font-serif">{r.name}</td>
                    <td className="py-4 px-4 font-mono">{r.size}</td>
                    <td className="py-4 px-4">{r.bed}</td>
                    <td className="py-4 px-4">{r.capacity}</td>
                    <td className="py-4 px-4">{r.floor}</td>
                    <td className="py-4 px-4 text-emerald-400">Included</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onOpenBooking(r.id)}
                        className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white bg-[#B21F3A] hover:bg-[#8B1538] rounded border border-[#D4AF65]/40"
                      >
                        Inquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CTA
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#123B69] via-[#0c203b] to-[#071629] p-8 sm:p-12 border border-[#123B69] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Need Assistance with Corporate Room Blocks?
            </h3>
            <p className="text-sm text-slate-300">
              Our front desk provides personalized assistance for corporate invoicing, group arrangements,
              and special arrival times.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-100 bg-[#071629] hover:bg-black rounded-md border border-[#123B69]"
            >
              <Phone className="w-4 h-4 text-[#D4AF65]" />
              <span>+90 322 459 8222</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] rounded-md border border-[#D4AF65]/50 shadow-lg"
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
