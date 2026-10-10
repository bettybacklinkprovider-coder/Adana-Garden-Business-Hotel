import React from 'react';
import { Phone } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const FloatingCallButton: React.FC = () => {
  return (
    <a
      href={`tel:${HOTEL_INFO.phoneClean}`}
      aria-label="Call Adana Garden Business Hotel Reception"
      className="fixed bottom-5 right-5 z-40 sm:hidden flex items-center gap-2 bg-[#B21F3A] hover:bg-[#8B1538] text-white px-4 py-3 rounded-full shadow-2xl border border-[#D4AF65]/60 active:scale-95 transition-all text-xs font-bold tracking-wider uppercase"
    >
      <Phone className="w-4 h-4 text-[#D4AF65]" />
      <span>Call Reception</span>
    </a>
  );
};
