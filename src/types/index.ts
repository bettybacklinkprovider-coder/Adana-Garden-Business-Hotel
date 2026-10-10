export interface Room {
  id: string;
  name: string;
  category: 'standard' | 'deluxe' | 'superior' | 'suite';
  shortDescription: string;
  fullDescription: string;
  capacity: string;
  bed: string;
  size: string;
  pricePlaceholder: string;
  priceNote: string;
  image: string;
  amenities: string[];
  floor: string;
  view: string;
}

export interface ReservationInquiry {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  specialRequests?: string;
}

export interface AmenityHighlight {
  title: string;
  description: string;
  category: string;
  verified: boolean;
  image?: string;
  tag?: string;
  featureNote?: string;
  highlight?: string;
}

export interface AdanaAttraction {
  title: string;
  subtitle: string;
  description: string;
  distance: string;
  category: string;
}
