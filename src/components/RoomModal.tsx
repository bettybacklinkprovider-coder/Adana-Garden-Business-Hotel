import React from 'react';
import { X, Check, Users, Maximize, BedDouble, Eye, Layers, Calendar } from 'lucide-react';
import { Room } from '../types';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onReserve: (roomId: string) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onReserve }) => {
  if (!room) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#071629] border border-[#123B69] rounded-xl shadow-2xl text-slate-200 overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#123B69] to-[#071629] border-b border-[#123B69]">
          <div>
            <h3 id="room-modal-title" className="font-serif text-xl font-bold text-white tracking-wide">
              {room.name}
            </h3>
            <p className="text-xs text-[#D4AF65] tracking-wide font-medium">
              Adana Garden Business Hotel · {room.floor}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Room Image */}
          <div className="relative rounded-lg overflow-hidden border border-[#123B69] h-64 sm:h-80 w-full group">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="bg-[#071629]/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#123B69] text-xs font-semibold text-[#D4AF65]">
                {room.pricePlaceholder} / night <span className="text-slate-400 font-normal">(placeholder)</span>
              </div>
              <div className="bg-[#071629]/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#123B69] text-xs font-medium text-slate-200">
                {room.size}
              </div>
            </div>
          </div>

          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0c203b] p-3 rounded-lg border border-[#123B69] flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#D4AF65] shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-slate-400">Capacity</p>
                <p className="text-xs font-semibold text-white">{room.capacity}</p>
              </div>
            </div>
            <div className="bg-[#0c203b] p-3 rounded-lg border border-[#123B69] flex items-center gap-2.5">
              <BedDouble className="w-4 h-4 text-[#D4AF65] shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-slate-400">Bedding</p>
                <p className="text-xs font-semibold text-white truncate">{room.bed}</p>
              </div>
            </div>
            <div className="bg-[#0c203b] p-3 rounded-lg border border-[#123B69] flex items-center gap-2.5">
              <Maximize className="w-4 h-4 text-[#D4AF65] shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-slate-400">Dimensions</p>
                <p className="text-xs font-semibold text-white">{room.size}</p>
              </div>
            </div>
            <div className="bg-[#0c203b] p-3 rounded-lg border border-[#123B69] flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-[#D4AF65] shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-slate-400">View</p>
                <p className="text-xs font-semibold text-white truncate">{room.view}</p>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">
              Room Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {room.fullDescription}
            </p>
          </div>

          {/* Room Amenities Grid */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">
              Key Features & Amenities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-slate-300 bg-[#0c203b]/60 px-3 py-2 rounded border border-[#123B69]/40"
                >
                  <Check className="w-3.5 h-3.5 text-[#D4AF65] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation Policy Note */}
          <div className="text-xs text-slate-400 border-t border-[#123B69] pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span>Check-in: 14:00 · Check-out: 12:00</span>
            <span className="italic text-slate-400">{room.priceNote}</span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onReserve(room.id);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B21F3A] to-[#8B1538] hover:from-[#c72543] hover:to-[#9f1940] rounded-md border border-[#D4AF65]/50 shadow-md transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF65]" />
              <span>Reserve This Room</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
