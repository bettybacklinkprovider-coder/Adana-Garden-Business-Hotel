/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { RoomModal } from './components/RoomModal';
import { FloatingCallButton } from './components/FloatingCallButton';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Room } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingRoomType, setBookingRoomType] = useState<string | undefined>(undefined);
  const [inspectedRoom, setInspectedRoom] = useState<Room | null>(null);

  const handleOpenBooking = (roomType?: string) => {
    setBookingRoomType(roomType);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingRoomType(undefined);
  };

  const handleSelectRoom = (room: Room) => {
    setInspectedRoom(room);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#071629] text-slate-100 font-sans selection:bg-[#B21F3A] selection:text-white">
        {/* Sticky Top Navigation */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* 4 Separate Routes */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenBooking={handleOpenBooking}
                  onSelectRoom={handleSelectRoom}
                />
              }
            />
            <Route
              path="/rooms"
              element={
                <RoomsPage
                  onOpenBooking={handleOpenBooking}
                  onSelectRoom={handleSelectRoom}
                />
              }
            />
            <Route
              path="/about"
              element={<AboutPage onOpenBooking={handleOpenBooking} />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Shared Luxury Footer */}
        <Footer onOpenBooking={() => handleOpenBooking()} />

        {/* Reservation Inquiry Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          initialRoomType={bookingRoomType}
        />

        {/* Quick Room Specs Inspection Modal */}
        <RoomModal
          room={inspectedRoom}
          onClose={() => setInspectedRoom(null)}
          onReserve={(roomId) => handleOpenBooking(roomId)}
        />

        {/* Mobile Floating Hotline Button */}
        <FloatingCallButton />
      </div>
    </BrowserRouter>
  );
}
