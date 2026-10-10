import { Room, AmenityHighlight, AdanaAttraction } from '../types';

// Direct asset imports so Vite properly processes, optimizes, and bundles images for production (Vercel, Netlify, etc.)
import exteriorImg from '../assets/images/hotel_exterior_dusk_1791626445124.jpg';
import lobbyImg from '../assets/images/hotel_lobby_lounge_1791626458862.jpg';
import deluxeBedroomImg from '../assets/images/deluxe_bedroom_1791626474826.jpg';
import executiveSuiteImg from '../assets/images/executive_suite_1791626487388.jpg';
import adanaCityImg from '../assets/images/adana_seyhan_view_1791626499977.jpg';
import amenityBedImg from '../assets/images/amenity_comfortable_bed_1791630267340.jpg';
import amenityDeskImg from '../assets/images/amenity_business_desk_1791630278211.jpg';
import amenityLocationImg from '../assets/images/amenity_adana_location_1791630290408.jpg';
import amenityFrontDeskImg from '../assets/images/amenity_front_desk_1791630300966.jpg';
import amenityBreakfastImg from '../assets/images/amenity_dining_breakfast_1791630311725.jpg';
import amenityParkingImg from '../assets/images/amenity_hotel_parking_1791630323250.jpg';

export const HOTEL_INFO = {
  name: 'Adana Garden Business Hotel',
  tagline: 'Experience Comfort. Discover Adana.',
  shortDescription:
    'A refined hotel experience combining modern comfort, warm hospitality, and convenient business travel in Adana, Türkiye.',
  phone: '+90 322 459 8222',
  phoneClean: '+903224598222',
  email: 'reservations@adanagardenbusinesshotel.com',
  address: 'Reşatbey, 62013. Sk. No:35, 01300 Seyhan/Adana, Türkiye',
  district: 'Seyhan, Adana',
  country: 'Türkiye',
  checkInTime: '14:00',
  checkOutTime: '12:00',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Re%C5%9Fatbey%2C+62013.+Sk.+No%3A35%2C+01300+Seyhan%2FAdana%2C+T%C3%BCrkiye',
  images: {
    exterior: exteriorImg,
    lobby: lobbyImg,
    bedroom: deluxeBedroomImg,
    suite: executiveSuiteImg,
    city: adanaCityImg,
    amenityBed: amenityBedImg,
    amenityDesk: amenityDeskImg,
    amenityLocation: amenityLocationImg,
    amenityFrontDesk: amenityFrontDeskImg,
    amenityBreakfast: amenityBreakfastImg,
    amenityParking: amenityParkingImg,
  },
};

export const ROOMS_DATA: Room[] = [
  {
    id: 'standard-room',
    name: 'Standard Room',
    category: 'standard',
    shortDescription:
      'A quiet, thoughtfully designed city retreat offering ergonomic workspace, plush queen bedding, and modern bathroom amenities.',
    fullDescription:
      'Engineered specifically for business travelers who value serene focus and uncompromising rest. Features high-speed fiber Wi-Fi, acoustic soundproofing, an ergonomic work desk with universal connectivity, and premium orthopedic bedding.',
    capacity: '2 Guests',
    bed: '1 Queen Bed or 2 Twin Beds',
    size: '26 m² / 280 sq ft',
    pricePlaceholder: '€75 – €95',
    priceNote: 'Estimated seasonal rates · Subject to direct confirmation',
    image: deluxeBedroomImg,
    amenities: [
      'High-Speed Fiber Wi-Fi',
      'Ergonomic Work Desk',
      'Smart HDTV with Streaming',
      'Walk-in Rain Shower',
      'Tea & Coffee Station',
      'In-Room Laptop Safe',
      'Soundproof Triple Glazing',
      'Individual Climate Control',
    ],
    floor: 'Floors 2 – 4',
    view: 'Courtyard & Urban View',
  },
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    category: 'deluxe',
    shortDescription:
      'Spacious business accommodation featuring a plush king-size bed, cozy reading armchair, and elevated views over central Seyhan.',
    fullDescription:
      'Combining refined walnut architectural finishes with ample room to unwind after a productive day in Adana. Enjoy a dedicated workspace, Nespresso coffee machine, plush bathrobes, and blackout drapes for restorative sleep.',
    capacity: '2 Guests',
    bed: '1 King Bed',
    size: '34 m² / 365 sq ft',
    pricePlaceholder: '€95 – €120',
    priceNote: 'Estimated seasonal rates · Subject to direct confirmation',
    image: deluxeBedroomImg,
    amenities: [
      'Fiber Wi-Fi (200 Mbps)',
      'Executive Desk with USB-C Hub',
      'Nespresso Coffee Machine',
      'Marble Vanity & Rain Shower',
      'Plush Bathrobes & Slippers',
      '50-inch 4K Smart TV',
      'Stocked Refreshment Bar',
      'Soundproof Glazing',
    ],
    floor: 'Floors 3 – 6',
    view: 'Seyhan District Skyline',
  },
  {
    id: 'superior-room',
    name: 'Superior Room',
    category: 'superior',
    shortDescription:
      'Enhanced floor plan with an expanded lounge nook, deluxe marble bathroom, and panoramic upper-floor city vistas.',
    fullDescription:
      'A spacious sanctuary designed for extended stays or discerning corporate guests. Features generous seating, upgraded vanity amenities, evening turndown service, and seamless room automation.',
    capacity: '3 Guests',
    bed: '1 King Bed + 1 Daybed',
    size: '42 m² / 450 sq ft',
    pricePlaceholder: '€125 – €155',
    priceNote: 'Estimated seasonal rates · Subject to direct confirmation',
    image: executiveSuiteImg,
    amenities: [
      'High-Speed Fiber Wi-Fi',
      'Dedicated Lounge Corner',
      'Double Marble Vanity',
      'Nespresso & Herbal Teas',
      'Complimentary Mineral Water',
      'Smart Climate Automation',
      '55-inch 4K Smart TV',
      'Full Ironing Set & Valet Stand',
    ],
    floor: 'Floors 5 – 7',
    view: 'City & Avenue Panorama',
  },
  {
    id: 'suite',
    name: 'Executive Garden Suite',
    category: 'suite',
    shortDescription:
      'The premier hotel accommodation with a separate living salon, executive boardroom desk, walk-in dressing area, and VIP amenities.',
    fullDescription:
      'The ultimate business residence in Adana. A separate salon provides a sophisticated venue for private meetings or relaxed hosting, accompanied by floor-to-ceiling windows, an expansive marble bathroom with soaking tub and walk-in rain shower, and priority concierge privileges.',
    capacity: '4 Guests',
    bed: '1 Master King Bed + Sofa Bed',
    size: '58 m² / 625 sq ft',
    pricePlaceholder: '€175 – €220',
    priceNote: 'Estimated seasonal rates · Subject to direct confirmation',
    image: executiveSuiteImg,
    amenities: [
      'Separate Living & Meeting Salon',
      'Executive Boardroom Table',
      'Deep Soaking Tub & Rain Shower',
      'Walk-in Wardrobe',
      'Complimentary Refreshment Bar',
      'VIP Turndown Service',
      'Premium Espresso Station',
      'Priority Concierge & Late Check-out',
    ],
    floor: 'Executive Top Floor',
    view: 'Panoramic Seyhan River & City Skyline',
  },
];

export const HOTEL_AMENITIES: AmenityHighlight[] = [
  {
    title: 'Comfortable Accommodation',
    description:
      'Orthopedic mattresses, hypoallergenic pillows, blackout drapery, and acoustic insulation ensuring uninterrupted slumber throughout your trip.',
    category: 'Rooms & Rest',
    verified: true,
    image: amenityBedImg,
    tag: 'Rest & Comfort',
    featureNote: 'Acoustically Insulated',
    highlight: 'Orthopedic Mattress',
  },
  {
    title: 'Business-Friendly Environment',
    description:
      'Dedicated workstations, ergonomic desk seating, accessible multi-plug hubs, and quiet executive corners for productive workflow.',
    category: 'Business Services',
    verified: true,
    image: amenityDeskImg,
    tag: 'Productivity',
    featureNote: 'Fiber Wi-Fi & USB-C',
    highlight: 'Ergonomic Desk',
  },
  {
    title: 'Convenient Location',
    description:
      'Prime placement on Reşatbey 62013 Sk., moments away from Seyhan financial centers, prestigious boutiques, and rapid transit connections.',
    category: 'Location',
    verified: true,
    image: amenityLocationImg,
    tag: 'Seyhan District',
    featureNote: 'Reşatbey 62013 Sk.',
    highlight: 'Prime Position',
  },
  {
    title: '24/7 Guest Assistance',
    description:
      'Always-on front desk personnel for late check-in coordination, taxi requests, luggage storage, and regional destination recommendations.',
    category: 'Hospitality',
    verified: true,
    image: amenityFrontDeskImg,
    tag: 'Front Desk',
    featureNote: 'Round-the-Clock Team',
    highlight: '24/7 Concierge',
  },
  {
    title: 'Dining & Morning Breakfast',
    description:
      'Enjoy rich Turkish breakfast assortments with traditional cheeses, olives, fresh bread, and hot tea or freshly roasted espresso.',
    category: 'Culinary',
    verified: true,
    image: amenityBreakfastImg,
    tag: 'Turkish Breakfast',
    featureNote: 'Artisan Assortment',
    highlight: 'Served Daily',
  },
  {
    title: 'Wi-Fi & Parking Support',
    description:
      'High-bandwidth wireless internet access covered throughout all guest rooms and public lounges, paired with parking assistance.',
    category: 'Facilities',
    verified: true,
    image: amenityParkingImg,
    tag: 'Connectivity & Parking',
    featureNote: 'Secure Guest Area',
    highlight: 'Complimentary Access',
  },
];

export const ADANA_ATTRACTIONS: AdanaAttraction[] = [
  {
    title: 'Sabancı Central Mosque',
    subtitle: 'One of the Middle East’s Largest & Most Magnificent Mosques',
    description:
      'Standing proudly along the Seyhan River with its iconic six towering minarets and grand classical Ottoman dome architecture.',
    distance: 'Central Seyhan',
    category: 'Architecture & Culture',
  },
  {
    title: 'Taşköprü (Historic Stone Bridge)',
    subtitle: 'Ancient Roman Engineering Marvel',
    description:
      'Spanning the Seyhan River, this historic 4th-century Roman bridge is among the world’s oldest bridges still standing.',
    distance: 'Historical District',
    category: 'Historic Landmark',
  },
  {
    title: 'Seyhan River & Central Park',
    subtitle: 'Lush Waterside Walking Promenades',
    description:
      'Adana’s picturesque riverbank trails and expansive riverside gardens, ideal for morning jogs, sunset strolls, or quiet reflection.',
    distance: 'Short drive / stroll',
    category: 'Nature & Parks',
  },
  {
    title: 'Adana Culinary Heritage',
    subtitle: 'World-Renowned Gastronomy & Kebabs',
    description:
      'Renowned worldwide for legendary spicy minced lamb kebabs, şalgam (turnip juice), and rich Mediterranean mezze traditions.',
    distance: 'Surrounding Reşatbey & Seyhan',
    category: 'Gastronomy',
  },
];
