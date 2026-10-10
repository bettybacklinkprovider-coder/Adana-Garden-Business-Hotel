import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, ExternalLink, Calendar } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#050f1d] border-t border-[#123B69]/70 text-slate-300">
      {/* Upper Footer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF65]/40 bg-gradient-to-br from-[#123B69] to-[#071629] flex items-center justify-center shadow-inner">
                <svg
                  className="w-5 h-5 text-[#D4AF65]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-3 8-7 1 4 4 7 8 7 0-5.5-4.5-10-10-10z" />
                  <path d="M12 22V12" />
                  <path d="M7 16c2-1 3.5-3 4-5" />
                  <path d="M17 16c-2-1-3.5-3-4-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-white tracking-tight">
                  Adana Garden
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#D4AF65]">
                  Business Hotel
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              Combining modern business hospitality with authentic Turkish warmth. Your peaceful,
              well-connected sanctuary in the heart of Seyhan, Adana.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#B21F3A] hover:bg-[#8B1538] rounded border border-[#D4AF65]/40 transition-colors shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF65]" />
                <span>Reserve Room</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white border-b border-[#123B69] pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#D4AF65] transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-[#D4AF65] text-xs">·</span> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className="hover:text-[#D4AF65] transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-[#D4AF65] text-xs">·</span> Rooms & Suites
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#D4AF65] transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-[#D4AF65] text-xs">·</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#D4AF65] transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-[#D4AF65] text-xs">·</span> Contact & Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white border-b border-[#123B69] pb-2">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF65] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {HOTEL_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF65] shrink-0" />
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="hover:text-[#D4AF65] transition-colors font-medium text-white"
                >
                  {HOTEL_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF65] shrink-0" />
                <span className="text-slate-300 text-xs break-all">
                  {HOTEL_INFO.email}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Location Action */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white border-b border-[#123B69] pb-2">
              Front Desk & Access
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF65] shrink-0" />
                <span>Front Desk: 24 Hours / 7 Days</span>
              </div>
              <div className="pl-6 space-y-1">
                <p>Check-in: <strong className="text-white">From 14:00</strong></p>
                <p>Check-out: <strong className="text-white">Until 12:00</strong></p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={HOTEL_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#D4AF65] hover:text-white transition-colors bg-[#123B69]/40 hover:bg-[#123B69] px-3.5 py-2 rounded border border-[#123B69]"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#123B69]/50 bg-[#030914] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Adana Garden Business Hotel. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Reşatbey, Seyhan, Adana</span>
            <span>·</span>
            <span>Tel: +90 322 459 8222</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
