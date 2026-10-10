import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  onOpenBooking: (roomType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact & Reservations', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#071629]/95 backdrop-blur-md shadow-xl border-b border-[#123B69]/60 py-3'
            : 'bg-gradient-to-b from-[#071629]/90 via-[#071629]/60 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Hotel Brand Wordmark & Garden Symbol */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF65] rounded-sm shrink-0"
            >
              {/* Refined Garden Leaf / Lotus Crest */}
              <div className="w-10 h-10 rounded-full border border-[#D4AF65]/40 bg-gradient-to-br from-[#123B69] to-[#071629] flex items-center justify-center shadow-inner group-hover:border-[#D4AF65] transition-colors">
                <svg
                  className="w-5 h-5 text-[#D4AF65]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-3 8-7 1 4 4 7 8 7 0-5.5-4.5-10-10-10z" />
                  <path d="M12 22V12" />
                  <path d="M7 16c2-1 3.5-3 4-5" />
                  <path d="M17 16c-2-1-3.5-3-4-5" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF65] transition-colors whitespace-nowrap">
                  Adana Garden
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#D4AF65]">
                  Business Hotel
                </span>
              </div>
            </Link>

            {/* Zone 2: Navigation Links (Single-line, clean typography) */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-1 transition-colors whitespace-nowrap tracking-wide ${
                      isActive
                        ? 'text-[#D4AF65] font-semibold'
                        : 'text-slate-200 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF65] rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Zone 3: Direct Actions (Call & Book Stay) */}
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-200 hover:text-[#D4AF65] transition-colors py-2 px-3 rounded-md hover:bg-white/5 border border-transparent hover:border-[#123B69]"
                title="Call Hotel Front Desk"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF65]" />
                <span className="whitespace-nowrap font-medium tracking-wide">
                  +90 322 459 8222
                </span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md shadow-lg shadow-black/30 border border-[#D4AF65]/40 hover:border-[#D4AF65] transition-all transform hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF65]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF65]" />
                <span>Book Your Stay</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onOpenBooking()}
                className="sm:hidden px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white bg-[#B21F3A] rounded border border-[#D4AF65]/40"
              >
                Book
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-200 hover:text-white rounded-md hover:bg-[#123B69] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#D4AF65]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071629] border-b border-[#123B69] px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#123B69] text-[#D4AF65] font-semibold'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-[#123B69]/60 flex flex-col gap-2.5">
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-semibold text-slate-200 bg-[#123B69]/50 border border-[#123B69] hover:bg-[#123B69]"
              >
                <Phone className="w-4 h-4 text-[#D4AF65]" />
                <span>Call Front Desk: +90 322 459 8222</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-md text-xs font-bold uppercase tracking-wider text-white bg-[#B21F3A] hover:bg-[#8B1538] border border-[#D4AF65]/50 shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#D4AF65]" />
                <span>Book Your Stay Now</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
