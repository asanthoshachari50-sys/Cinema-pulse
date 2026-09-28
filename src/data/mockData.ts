import { Movie, CinemaVenue, SnackItem, Seat, SeatTier } from '../types/booking';

import heroBannerImg from '../assets/images/hero_movie_banner_1790572542548.jpg';
import heroTeluguBannerImg from '../assets/images/hero_telugu_epic_banner_1790573005874.jpg';
import posterScifiImg from '../assets/images/poster_scifi_odyssey_1790572557371.jpg';
import posterCyberImg from '../assets/images/poster_cyber_action_1790572572293.jpg';
import posterFantasyImg from '../assets/images/poster_epic_fantasy_1790572582762.jpg';
import posterDevaraImg from '../assets/images/poster_devara_telugu_1790572950638.jpg';
import posterPushpaImg from '../assets/images/poster_pushpa_telugu_1790572965087.jpg';
import posterKalkiImg from '../assets/images/poster_kalki_telugu_1790572981919.jpg';
import posterSalaarImg from '../assets/images/poster_salaar_telugu_1790572993872.jpg';
import posterSaripodhaaImg from '../assets/images/poster_saripodhaa_telugu_1790573025295.jpg';

export const CITIES = [
  'Hyderabad',
  'Bengaluru',
  'Mumbai',
  'Visakhapatnam',
  'Vijayawada',
  'Chennai',
  'Delhi-NCR',
  'Pune',
  'Kolkata'
];

export const MOVIES: Movie[] = [
  {
    id: 'devara-part-1',
    title: 'Devara: Part 1',
    genre: ['Action', 'Drama', 'Period'],
    rating: 9.4,
    votesCount: '286.4K',
    duration: '2h 58m',
    releaseDate: 'Sep 27, 2024',
    formats: ['IMAX 2D', '4DX', 'Dolby Atmos'],
    languages: ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'],
    director: 'Koratala Siva',
    cast: ['NTR Jr', 'Janhvi Kapoor', 'Saif Ali Khan', 'Prakash Raj', 'Srikanth'],
    synopsis:
      'In a tempestuous coastal fortress community, a fearless clan leader wages an unyielding battle against sea weapon smugglers to safeguard his people, creating an indelible legend that echoes across generations.',
    posterUrl: posterDevaraImg,
    backdropUrl: heroTeluguBannerImg,
    certificate: 'UA 16+',
    accentColor: '#e11d48'
  },
  {
    id: 'pushpa-2-the-rule',
    title: 'Pushpa 2: The Rule',
    genre: ['Action', 'Crime', 'Thriller'],
    rating: 9.7,
    votesCount: '342.1K',
    duration: '3h 05m',
    releaseDate: 'Dec 05, 2024',
    formats: ['IMAX 2D', '4DX', 'Dolby Atmos'],
    languages: ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'],
    director: 'Sukumar',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil', 'Jagapathi Babu', 'Sunil'],
    synopsis:
      'Pushpa Raj cements his reign as the undisputed kingpin of the global red sandalwood network. However, his unyielding rule faces a high-stakes tactical showdown from ruthless enemies and law enforcement.',
    posterUrl: posterPushpaImg,
    backdropUrl: heroTeluguBannerImg,
    certificate: 'A',
    accentColor: '#ea580c'
  },
  {
    id: 'kalki-2898-ad',
    title: 'Kalki 2898 AD',
    genre: ['Sci-Fi', 'Mythology', 'Action'],
    rating: 9.5,
    votesCount: '418.9K',
    duration: '3h 01m',
    releaseDate: 'Jun 27, 2024',
    formats: ['IMAX 3D', '4DX 3D', 'Dolby Atmos', '2D Laser'],
    languages: ['Telugu', 'Hindi', 'Tamil', 'Malayalam', 'Kannada'],
    director: 'Nag Ashwin',
    cast: ['Prabhas', 'Amitabh Bachchan', 'Kamal Haasan', 'Deepika Padukone', 'Disha Patani'],
    synopsis:
      'Set in a post-apocalyptic dystopian year 2898 in the city of Kasi under Supreme Yaskin’s Complex, the legendary warrior Ashwatthama awakens to protect the unborn avatar from cunning bounty hunter Bhairava.',
    posterUrl: posterKalkiImg,
    backdropUrl: heroBannerImg,
    certificate: 'UA 13+',
    accentColor: '#f59e0b'
  },
  {
    id: 'salaar-part-1-ceasefire',
    title: 'Salaar: Part 1 – Ceasefire',
    genre: ['Action', 'Thriller', 'Crime'],
    rating: 9.2,
    votesCount: '274.6K',
    duration: '2h 55m',
    releaseDate: 'Dec 22, 2023',
    formats: ['IMAX 2D', 'Dolby Atmos', '2D Laser'],
    languages: ['Telugu', 'Hindi', 'Tamil', 'Malayalam', 'Kannada'],
    director: 'Prashanth Neel',
    cast: ['Prabhas', 'Prithviraj Sukumaran', 'Shruti Haasan', 'Jagapathi Babu', 'Bobby Simha'],
    synopsis:
      'In the brutal, fortified walled state of Khansaar, a fateful childhood bond turns Deva into an unstoppable human war machine when his brother-in-arms Varadha calls upon him to reclaim the throne.',
    posterUrl: posterSalaarImg,
    backdropUrl: heroTeluguBannerImg,
    certificate: 'A',
    accentColor: '#ef4444'
  },
  {
    id: 'saripodhaa-sanivaaram',
    title: 'Saripodhaa Sanivaaram',
    genre: ['Action', 'Thriller', 'Drama'],
    rating: 9.0,
    votesCount: '102.5K',
    duration: '2h 54m',
    releaseDate: 'Aug 29, 2024',
    formats: ['2D Laser', 'Dolby Atmos'],
    languages: ['Telugu', 'Hindi', 'Tamil', 'Malayalam'],
    director: 'Vivek Athreya',
    cast: ['Nani', 'S. J. Suryah', 'Priyanka Mohan', 'Abhirami'],
    synopsis:
      'Surya can unleash his simmering anger only on Saturdays according to his mother’s decree. When he discovers ruthless Inspector Daya tormenting innocent citizens in Sokulapalem, a high-octane battle of wits and brawn begins.',
    posterUrl: posterSaripodhaaImg,
    backdropUrl: heroTeluguBannerImg,
    certificate: 'UA 16+',
    accentColor: '#38bdf8'
  },
  {
    id: 'scifi-odyssey',
    title: 'Aethelgard: The Edge of Light',
    genre: ['Sci-Fi', 'Adventure', 'Mystery'],
    rating: 9.3,
    votesCount: '142.8K',
    duration: '2h 48m',
    releaseDate: 'Sep 25, 2026',
    formats: ['IMAX 3D', '4DX', '2D Laser'],
    languages: ['Telugu', 'English', 'Hindi', 'Tamil'],
    director: 'Denis Villeneuve',
    cast: ['Cillian Murphy', 'Florence Pugh', 'Oscar Isaac', 'Rebecca Ferguson'],
    synopsis:
      'When deep-space sensor telemetry detects an anomalous signal pulsing beyond the Kuiper Belt, an elite interstellar survey crew embarks on humanity’s farthest voyage through a spatial rupture that bends both gravity and memory.',
    posterUrl: posterScifiImg,
    backdropUrl: heroBannerImg,
    certificate: 'UA 16+',
    accentColor: '#38bdf8'
  },
  {
    id: 'cyber-pulse',
    title: 'Neon Drift: Protocol Zero',
    genre: ['Action', 'Cyberpunk', 'Thriller'],
    rating: 8.8,
    votesCount: '98.4K',
    duration: '2h 15m',
    releaseDate: 'Sep 18, 2026',
    formats: ['IMAX 2D', '4DX', 'Dolby Atmos'],
    languages: ['Telugu', 'English', 'Hindi'],
    director: 'Chad Stahelski',
    cast: ['Keanu Reeves', 'Hiroyuki Sanada', 'Ana de Armas', 'Donnie Yen'],
    synopsis:
      'In a rain-drenched megacity controlled by algorithmic syndicates, a rogue courier must deliver a bio-encrypted neural key across militarized sky-bridges before the dawn grid shutdown.',
    posterUrl: posterCyberImg,
    backdropUrl: heroBannerImg,
    certificate: 'A',
    accentColor: '#f43f5e'
  },
  {
    id: 'mythic-sanctuary',
    title: 'Chronicles of the Sky Citadel',
    genre: ['Fantasy', 'Action', 'Mythology'],
    rating: 9.1,
    votesCount: '115.2K',
    duration: '2h 35m',
    releaseDate: 'Sep 12, 2026',
    formats: ['IMAX 3D', '3D', '2D'],
    languages: ['Telugu', 'English', 'Hindi', 'Kannada'],
    director: 'Peter Jackson',
    cast: ['Tom Hiddleston', 'Cate Blanchett', 'Dev Patel', 'Zendaya'],
    synopsis:
      'An ancient floating sanctuary awakens above the misted peaks of the Karakoram. An exiled cartographer and a guardian dragon knight race to seal the primordial rift before dusk swallows the realm.',
    posterUrl: posterFantasyImg,
    backdropUrl: heroBannerImg,
    certificate: 'UA 13+',
    accentColor: '#fbbf24'
  }
];

export const CINEMAS: CinemaVenue[] = [
  {
    id: 'amb-cinemas',
    name: 'AMB Cinemas (Superplex & VIP M-Lounge)',
    city: 'Hyderabad',
    location: 'Sarath City Capital Mall, Gachibowli',
    distance: '1.8 km away',
    facilities: ['Dolby Atmos', 'RGB Laser Screen 1', 'VIP M-Lounge', 'Valet Parking'],
    showtimes: [
      { id: 'st-amb-1', time: '10:30 AM', period: 'Morning', format: 'IMAX 2D', language: 'Telugu', priceMultiplier: 1.0 },
      { id: 'st-amb-2', time: '01:45 PM', period: 'Afternoon', format: 'Dolby Atmos', language: 'Telugu', priceMultiplier: 1.15 },
      { id: 'st-amb-3', time: '05:15 PM', period: 'Evening', format: 'IMAX 2D', language: 'Telugu', priceMultiplier: 1.3 },
      { id: 'st-amb-4', time: '07:45 PM', period: 'Evening', format: 'IMAX 2D', language: 'Telugu', priceMultiplier: 1.35 },
      { id: 'st-amb-5', time: '10:50 PM', period: 'Night', format: 'Dolby Atmos', language: 'Telugu', priceMultiplier: 1.2 }
    ]
  },
  {
    id: 'prasads-multiplex',
    name: 'Prasad’s Multiplex & PCX Giant Screen',
    city: 'Hyderabad',
    location: 'Necklace Road, Khairatabad',
    distance: '3.5 km away',
    facilities: ['PCX Giant Screen', 'Dual 4K Laser', 'Dolby Atmos', 'Lake View Food Court'],
    showtimes: [
      { id: 'st-pcx-1', time: '11:15 AM', period: 'Morning', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.05 },
      { id: 'st-pcx-2', time: '02:30 PM', period: 'Afternoon', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.2 },
      { id: 'st-pcx-3', time: '06:00 PM', period: 'Evening', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.35 },
      { id: 'st-pcx-4', time: '09:30 PM', period: 'Night', format: 'Dolby Atmos', language: 'Telugu', priceMultiplier: 1.25 }
    ]
  },
  {
    id: 'pvr-nexus-hyd',
    name: 'PVR Nexus Mall & 4DX',
    city: 'Hyderabad',
    location: 'Nexus Mall, Kukatpally',
    distance: '4.2 km away',
    facilities: ['4DX Motion Cinema', 'Dolby 7.1', 'Recliner Gold', 'Fast Gourmet Counter'],
    showtimes: [
      { id: 'st-nex-1', time: '10:00 AM', period: 'Morning', format: '4DX', language: 'Telugu', priceMultiplier: 1.1 },
      { id: 'st-nex-2', time: '01:15 PM', period: 'Afternoon', format: 'Dolby Atmos', language: 'Telugu', priceMultiplier: 1.15 },
      { id: 'st-nex-3', time: '04:30 PM', period: 'Evening', format: '4DX', language: 'Telugu', priceMultiplier: 1.3 },
      { id: 'st-nex-4', time: '08:00 PM', period: 'Evening', format: 'Dolby Atmos', language: 'Telugu', priceMultiplier: 1.3 },
      { id: 'st-nex-5', time: '11:15 PM', period: 'Night', format: '2D Laser', language: 'Telugu', priceMultiplier: 1.1 }
    ]
  },
  {
    id: 'pvr-superplex',
    name: 'PVR ICON Superplex & Gold Class',
    city: 'Mumbai',
    location: 'Phoenix Palladium, Lower Parel',
    distance: '2.4 km away',
    facilities: ['Dolby Atmos', 'Recliner Seating', 'Gourmet Kitchen', 'Valet Parking'],
    showtimes: [
      { id: 'st-1', time: '10:15 AM', period: 'Morning', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.0 },
      { id: 'st-2', time: '01:30 PM', period: 'Afternoon', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.15 },
      { id: 'st-3', time: '04:45 PM', period: 'Evening', format: '4DX', language: 'Hindi', priceMultiplier: 1.25 },
      { id: 'st-4', time: '07:30 PM', period: 'Evening', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.3 },
      { id: 'st-5', time: '10:45 PM', period: 'Night', format: 'Dolby Atmos', language: 'Hindi', priceMultiplier: 1.1 }
    ]
  },
  {
    id: 'inox-insignia',
    name: 'INOX Megaplex & Insignia Lounge',
    city: 'Mumbai',
    location: 'R-City Mall, Ghatkopar West',
    distance: '4.8 km away',
    facilities: ['IMAX with Laser', 'In-Seat Butler', 'Laser Projection', 'Food Court'],
    showtimes: [
      { id: 'st-6', time: '11:00 AM', period: 'Morning', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.0 },
      { id: 'st-7', time: '02:15 PM', period: 'Afternoon', format: 'Dolby Atmos', language: 'English', priceMultiplier: 1.1 },
      { id: 'st-8', time: '05:30 PM', period: 'Evening', format: 'IMAX 3D', language: 'Telugu', priceMultiplier: 1.25 },
      { id: 'st-9', time: '08:45 PM', period: 'Night', format: 'IMAX 3D', language: 'Hindi', priceMultiplier: 1.35 }
    ]
  }
];

export const SNACK_ITEMS: SnackItem[] = [
  {
    id: 'snack-mirchi-bajji',
    name: 'Crispy Andhra Mirchi Bajji Platter',
    category: 'Snacks',
    description: 'Hot batter-fried stuffed chili fritters served with tangy peanut chutney and spiced onion salad.',
    price: 190,
    calories: '320 kcal',
    isVeg: true
  },
  {
    id: 'snack-peri-corn',
    name: 'Spiced Peri Peri Butter Corn',
    category: 'Snacks',
    description: 'Steaming tender sweet corn tossed in creamy Amul butter, zesty lime, and house peri peri seasoning.',
    price: 160,
    calories: '210 kcal',
    isVeg: true
  },
  {
    id: 'snack-popcorn-caramel',
    name: 'Golden Caramel Gourmet Popcorn',
    category: 'Popcorn',
    description: 'Freshly popped jumbo corn kernels tossed in artisanal caramelized butter sugar.',
    price: 290,
    calories: '420 kcal',
    isVeg: true
  },
  {
    id: 'snack-combo-blockbuster',
    name: 'Tollywood Blockbuster Duo Combo',
    category: 'Combos',
    description: '1 Large Cheese Popcorn + 2 Chilled Drinks (500ml) + 1 Loaded Nachos with warm cheese & salsa dip.',
    price: 480,
    calories: '680 kcal',
    isVeg: true
  },
  {
    id: 'snack-irani-chai',
    name: 'Hyderabad Irani Chai & Osmania Duo',
    category: 'Beverages',
    description: 'Rich slow-brewed spiced milk tea served with 4 melt-in-mouth traditional Osmania bakery biscuits.',
    price: 140,
    calories: '180 kcal',
    isVeg: true
  },
  {
    id: 'snack-beverage-coldbrew',
    name: 'Vanilla Nitro Cold Brew',
    category: 'Beverages',
    description: 'Smooth slow-steeped Arabica coffee infused with nitro foam and Madagascar vanilla.',
    price: 210,
    calories: '110 kcal',
    isVeg: true
  }
];

// Generate theater seats
export function generateTheaterSeats(): Seat[] {
  const seats: Seat[] = [];
  
  // VIP Rows (A, B) - 12 seats each
  const vipRows = ['A', 'B'];
  vipRows.forEach((row) => {
    for (let num = 1; num <= 12; num++) {
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        tier: 'vip',
        price: 450
      });
    }
  });

  // Prime Rows (C, D, E, F) - 14 seats each
  const primeRows = ['C', 'D', 'E', 'F'];
  primeRows.forEach((row) => {
    for (let num = 1; num <= 14; num++) {
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        tier: 'prime',
        price: 280
      });
    }
  });

  // Classic Rows (G, H, I) - 14 seats each
  const classicRows = ['G', 'H', 'I'];
  classicRows.forEach((row) => {
    for (let num = 1; num <= 14; num++) {
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        tier: 'classic',
        price: 190
      });
    }
  });

  return seats;
}

// Generate upcoming dates (today + next 4 days)
export function getAvailableDates() {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const dayNumber = d.getDate();
    const isoDate = d.toISOString().split('T')[0];

    dates.push({
      isoDate,
      label: dayName,
      subLabel: `${dayNumber} ${month}`,
      fullFormatted: d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
    });
  }
  return dates;
}
