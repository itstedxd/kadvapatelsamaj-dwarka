// ============================================================
//  Uma Atithi Gruh — Kadva Patel Samaj, Dwarka
//  Full React App with Multi-Page & Dedicated Category Routing
// ============================================================

const { useState, useEffect, useRef, useCallback } = React;

// ─── DATA ───────────────────────────────────────────────────

const ROOMS = [
  {
    id: 1,
    name: "Standard Room",
    nameGuj: "સ્ટાન્ડર્ડ રૂમ",
    beds: 1,
    type: "Non-AC",
    price: 1250,
    popular: false,
    desc: "Comfortable single-bed room with attached bathroom, clean bedding, and all basic amenities. Perfect for solo pilgrims.",
    features: ["1 Bed", "Attached Bath", "Hot Water", "Fan"],
    img: "assets/images/patel_rooms-1.webp",
    capacity: 2,
    size: "180 sq ft",
  },
  {
    id: 2,
    name: "Twin Sharing Room",
    nameGuj: "ટ્વીન રૂમ",
    beds: 2,
    type: "Non-AC",
    price: 1500,
    popular: false,
    desc: "Spacious room with two beds, ideal for couples or close friends on a pilgrimage to Dwarka.",
    features: ["2 Beds", "Attached Bath", "Hot Water", "Fan", "Balcony"],
    img: "assets/images/patel_rooms-2.webp",
    capacity: 3,
    size: "220 sq ft",
  },
  {
    id: 3,
    name: "Family Room (3 Bed)",
    nameGuj: "ફેમિલી રૂમ",
    beds: 3,
    type: "Non-AC",
    price: 1800,
    popular: true,
    desc: "Popular family room with 3 beds, balcony with sea or city views, and spacious layout for comfortable family stays.",
    features: ["3 Beds", "Attached Bath", "Balcony", "Hot Water", "Fan"],
    img: "assets/images/patel_rooms-4.webp",
    capacity: 4,
    size: "280 sq ft",
  },
  {
    id: 4,
    name: "Deluxe Family Room",
    nameGuj: "ડિલક્સ ફેમિલી",
    beds: 4,
    type: "Non-AC",
    price: 2200,
    popular: false,
    desc: "Generous 4-bed family accommodation with elevated amenities. Sea-facing balcony with panoramic views available.",
    features: ["4 Beds", "Attached Bath", "Sea View", "Hot Water", "Fan"],
    img: "assets/images/patel_rooms-5.webp",
    capacity: 5,
    size: "340 sq ft",
  },
  {
    id: 5,
    name: "Premium AC Room",
    nameGuj: "પ્રીમિયમ AC",
    beds: 2,
    type: "AC",
    price: 2800,
    popular: true,
    desc: "Air-conditioned room with modern furnishings, premium bedding, and 24-hour hot water. Best comfort at this property.",
    features: ["2 Beds", "AC", "Attached Bath", "Hot Water", "TV"],
    img: "assets/images/patel_rooms-3.webp",
    capacity: 3,
    size: "240 sq ft",
  },
  {
    id: 6,
    name: "Group Hall / Dormitory",
    nameGuj: "ગ્રૂપ હૉલ",
    beds: 15,
    type: "Non-AC",
    price: 5000,
    popular: false,
    desc: "Large dormitory-style hall for pilgrim groups, societies, and large families. Separate halls for ladies and gents.",
    features: ["15 Beds", "Common Bath", "Fan", "Group Pricing", "CCTV"],
    img: "assets/images/patel_07.webp",
    capacity: 15,
    size: "1200 sq ft",
  },
];

const AMENITIES = [
  { icon: "utensils",        name: "Pure Veg Restaurant",    desc: "No onion, no garlic. Gujarati home food." },
  { icon: "car",             name: "Free Parking",           desc: "Ample space for cars & tour buses." },
  { icon: "wifi",            name: "High-Speed Wi-Fi",       desc: "Free Wi-Fi across the property." },
  { icon: "elevator",        name: "Lift / Elevator",        desc: "Elevator access to all floors." },
  { icon: "droplets",        name: "24/7 Hot Water",         desc: "Continuous hot water supply." },
  { icon: "shield-check",    name: "CCTV Security",          desc: "Round-the-clock surveillance." },
  { icon: "zap",             name: "Power Backup",           desc: "Generator backup during outages." },
  { icon: "leaf",            name: "Drinking Water",         desc: "Purified RO drinking water supply." },
  { icon: "phone",           name: "24h Reception",          desc: "Staff assistance at all times." },
  { icon: "calendar-check",  name: "Easy Booking",           desc: "Direct calling & WhatsApp support." },
  { icon: "users",           name: "Group Bookings",         desc: "Special rates for pilgrim sanghs." },
  { icon: "temple",          name: "Temple Proximity",       desc: "Minutes from Dwarkadhish & Bhadkeshwar." },
];

const REVIEWS = [
  {
    name: "Rajesh Patel",
    initials: "RP",
    rating: 5,
    text: "Excellent stay during our Dwarka Yatra. Rooms were clean, food was delicious pure veg Gujarati thali. The location is fantastic — sea breeze in the morning was truly divine. Will definitely return!",
    source: "Google",
    date: "October 2026",
  },
  {
    name: "Meena Shah",
    initials: "MS",
    rating: 5,
    text: "Perfect dharamshala for families. The staff was very polite and helpful. Parking space was more than adequate for our bus. The restaurant serves amazing gujarati food without onion-garlic. Highly recommended for pilgrims.",
    source: "Google",
    date: "September 2026",
  },
  {
    name: "Suresh Desai",
    initials: "SD",
    rating: 4,
    text: "Good value for money. Clean rooms with hot water. The location near Bhadkeshwar Mahadev Temple and sea is a big plus. Easy to get to Dwarkadhish Temple by auto. Rooms are basic but well maintained.",
    source: "Wanderlog",
    date: "August 2026",
  },
  {
    name: "Priya Joshi",
    initials: "PJ",
    rating: 5,
    text: "Stayed with a group of 25 ladies for 3 nights. The ladies dormitory was clean, secure and comfortable. Management was very cooperative in arranging group meals. Truly an ideal place for a pilgrimage group.",
    source: "Google",
    date: "November 2026",
  },
  {
    name: "Dinesh Chaudhary",
    initials: "DC",
    rating: 4,
    text: "Very well managed community guest house. The puja ambiance, the satvik food and sea views make this a memorable spiritual stay. Pricing is very reasonable for the quality offered. Booked 3 days in advance.",
    source: "YatraDham",
    date: "July 2026",
  },
  {
    name: "Hansa Trivedi",
    initials: "HT",
    rating: 5,
    text: "One of the best managed samaj guest houses in Saurashtra. Everything was immaculate. The thali in the restaurant is tremendous. Elevator is a blessing for elderly visitors. We will spread the word!",
    source: "Google",
    date: "October 2026",
  },
];

const NEARBY = [
  { name: "Dwarkadhish Temple",         dist: "2.1 km",   icon: "temple" },
  { name: "Bhadkeshwar Mahadev Temple", dist: "0.2 km",   icon: "temple" },
  { name: "Dwarka Sea Face",            dist: "0.15 km",  icon: "waves" },
  { name: "Rukmini Devi Temple",        dist: "2.0 km",   icon: "temple" },
  { name: "Nageshwar Jyotirlinga",      dist: "17 km",    icon: "temple" },
  { name: "Bet Dwarka (Shankhoddar)",   dist: "31 km",    icon: "ship" },
  { name: "Dwarka Bus Station",         dist: "1.5 km",   icon: "bus" },
  { name: "Dwarka Railway Station",     dist: "1.8 km",   icon: "train" },
];

const GALLERY_IMGS = [
  { src: "assets/images/patel_0edf3123-5a99-4047-b916-0901e97f2d27-1-1.webp", alt: "Uma Atithi Gruh Dwarka exterior view", tag: "Exterior", cat: "campus" },
  { src: "assets/images/patel_rooms-3.webp", alt: "Premium AC guest bedroom", tag: "AC Room", cat: "rooms" },
  { src: "assets/images/patel_10.webp", alt: "Bhojanalaya dining hall", tag: "Dining", cat: "dining" },
  { src: "assets/images/patel_rooms-2.webp", alt: "Twin sharing clean room", tag: "Twin Room", cat: "rooms" },
  { src: "assets/images/patel_sea.webp", alt: "Dwarka Arabian sea face nearby", tag: "Sea View", cat: "surroundings" },
  { src: "assets/images/patel_031b6256-ec65-4699-af8e-73b5b46df154.webp", alt: "Atithi Gruh entrance & courtyard", tag: "Courtyard", cat: "campus" },
  { src: "assets/images/patel_12.webp", alt: "Spiritual sanctum & hall", tag: "Sanctum", cat: "campus" },
  { src: "assets/images/patel_rooms-4.webp", alt: "Spacious 4-bed family accommodation", tag: "Family Suite", cat: "rooms" },
  { src: "assets/images/patel_rooms-1.webp", alt: "Standard single bedroom", tag: "Standard", cat: "rooms" },
  { src: "assets/images/patel_rooms-5.webp", alt: "Deluxe family room sea view", tag: "Deluxe", cat: "rooms" },
  { src: "assets/images/patel_13.webp", alt: "Dining service area", tag: "Satvik Dining", cat: "dining" },
  { src: "assets/images/patel_07.webp", alt: "Large group yatra dormitory hall", tag: "Group Hall", cat: "rooms" },
];

// ─── CUSTOM SVG ICONS FOR HOSPITALITY & SACRED AMENITIES ───
const CUSTOM_SVGS = {
  whatsapp: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>`,
  phone: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>`,
  'phone-call': (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    <path d="M14.05 2a9 9 0 0 1 8 7.94"/>
    <path d="M14.05 6A5 5 0 0 1 18 10"/>
  </svg>`,
  temple: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v2m0 0l-2 1.5M12 4l2 1.5M12 2a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6z"/>
    <path d="M12 4l-4 6h8l-4-6z"/>
    <path d="M5 10h14v2H5z"/>
    <path d="M6 12v9h12v-9"/>
    <path d="M10 21v-5a2 2 0 0 1 4 0v5"/>
    <path d="M4 21h16"/>
  </svg>`,
  elevator: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="2" width="18" height="20" rx="3"/>
    <path d="M12 2v20"/>
    <path d="M7.5 8l-2 2h4l-2-2z" fill="currentColor"/>
    <path d="M16.5 16l-2-2h4l-2 2z" fill="currentColor"/>
    <circle cx="7.5" cy="14" r="1.5"/>
    <path d="M6 18h3"/>
    <circle cx="16.5" cy="10" r="1.5"/>
    <path d="M15 13h3"/>
  </svg>`,
  lift: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="2" width="18" height="20" rx="3"/>
    <path d="M12 2v20"/>
    <path d="M7.5 8l-2 2h4l-2-2z" fill="currentColor"/>
    <path d="M16.5 16l-2-2h4l-2 2z" fill="currentColor"/>
    <circle cx="7.5" cy="14" r="1.5"/>
    <path d="M6 18h3"/>
    <circle cx="16.5" cy="10" r="1.5"/>
    <path d="M15 13h3"/>
  </svg>`
};

function Icon({ name, size = 18, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    
    if (CUSTOM_SVGS[name]) {
      ref.current.innerHTML = CUSTOM_SVGS[name](size);
      return;
    }
    
    if (window.lucide) {
      const camel = toCamel(name);
      let svg = lucide[camel] ? lucide.createElement(lucide[camel]) : null;
      if (!svg) {
        if (name.includes('temple')) {
          svg = lucide.createElement(lucide.Landmark);
        } else if (name.includes('elevator') || name.includes('lift')) {
          svg = lucide.createElement(lucide.ArrowUpDown);
        } else if (lucide.Sparkles) {
          svg = lucide.createElement(lucide.Sparkles);
        }
      }
      if (svg) {
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        ref.current.appendChild(svg);
      }
    }
  }, [name, size]);

  function toCamel(str) {
    return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
              .replace(/^./, c => c.toUpperCase());
  }
  return React.createElement('span', { ref, style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }, ...props });
}

// ─── STAR RATING ─────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return React.createElement('div', { className: 'stars-row' },
    [1,2,3,4,5].map(i =>
      React.createElement('span', {
        key: i,
        style: { color: i <= rating ? 'var(--clr-gold)' : 'var(--clr-border)', fontSize: size }
      }, '★')
    )
  );
}

// ─── ROUTING PATH HELPERS ────────────────────────────────────
function getBasePath() {
  const p = window.location.pathname;
  if (p.includes('/kadvapatelsamaj/')) {
    return '/kadvapatelsamaj/';
  }
  return '/';
}

function getPageUrl(pageId) {
  const base = getBasePath();
  if (pageId === 'home') return base;
  return `${base}${pageId}`;
}

// ─── PAGE HEADER BANNER (FOR DEDICATED CATEGORY PAGES) ───────
function PageHeader({ eyebrow, title, subtitle, breadcrumb, onHome }) {
  return React.createElement('div', { className: 'page-hero' },
    React.createElement('div', { className: 'page-hero-pattern' }),
    React.createElement('div', { className: 'container', style: { position: 'relative', zIndex: 1 } },
      eyebrow && React.createElement('div', { className: 'page-hero-eyebrow' },
        React.createElement(Icon, { name: 'sparkles', size: 14 }),
        ' ' + eyebrow
      ),
      React.createElement('h1', { className: 'page-hero-title' }, title),
      subtitle && React.createElement('p', { className: 'page-hero-subtitle' }, subtitle),
      React.createElement('div', { className: 'page-breadcrumb' },
        React.createElement('a', {
          href: getPageUrl('home'),
          onClick: (e) => { e.preventDefault(); onHome(); }
        }, 'Home'),
        React.createElement('span', { className: 'page-breadcrumb-separator' }, '/'),
        React.createElement('span', null, breadcrumb)
      )
    )
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────
function Navbar({ currentPage, onNavigate, onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'about',    label: 'About'    },
    { id: 'rooms',    label: 'Rooms'    },
    { id: 'dining',   label: 'Dining'   },
    { id: 'gallery',  label: 'Gallery'  },
    { id: 'location', label: 'Location' },
    { id: 'contact',  label: 'Contact'  },
  ];

  return React.createElement(React.Fragment, null,
    React.createElement('nav', { className: `navbar${scrolled ? ' scrolled' : ''}` },
      React.createElement('div', { className: 'navbar-inner' },
        // Logo
        React.createElement('a', {
          href: getPageUrl('home'),
          className: 'navbar-logo',
          onClick: (e) => { e.preventDefault(); onNavigate('home'); }
        },
          React.createElement('img', {
            src: 'assets/images/emblem_umiya.webp',
            alt: 'Shri Umiya Mataji Emblem',
            className: 'logo-img',
            onError: (e) => { e.currentTarget.src = 'assets/images/emblem_umiya.png'; }
          }),
          React.createElement('div', null,
            React.createElement('div', { className: 'logo-text-en' }, 'Uma Atithi Gruh'),
            React.createElement('div', { className: 'logo-text-guj' }, 'કડવા પટેલ સમાજ • દ્વારકા')
          )
        ),
        // Desktop nav
        React.createElement('div', { className: 'nav-links' },
          links.map(l =>
            React.createElement('a', {
              key: l.id,
              href: getPageUrl(l.id),
              className: `nav-link${currentPage === l.id ? ' active' : ''}`,
              onClick: (e) => { e.preventDefault(); onNavigate(l.id); }
            }, l.label)
          )
        ),
        // CTA
        React.createElement('div', { className: 'nav-cta' },
          React.createElement('a', { className: 'nav-phone', href: 'tel:+918604900990' },
            React.createElement(Icon, { name: 'phone', size: 14 }),
            ' +91 86049 00990'
          ),
          React.createElement('a', {
            className: 'btn btn-gold',
            style: { padding: '10px 20px', fontSize: '12px', textDecoration: 'none' },
            href: 'tel:+918604900990',
            onClick: onBook
          }, 'Book Now')
        ),
        // Hamburger
        React.createElement('button', {
          className: 'hamburger',
          onClick: () => setMenuOpen(true),
          'aria-label': 'Open menu'
        },
          React.createElement('span'), React.createElement('span'), React.createElement('span')
        )
      )
    ),
    // Mobile menu
    React.createElement('div', { className: `mobile-menu${menuOpen ? ' open' : ''}` },
      React.createElement('button', { className: 'mobile-menu-close', onClick: () => setMenuOpen(false) }, '✕'),
      links.map(l =>
        React.createElement('a', {
          key: l.id,
          href: getPageUrl(l.id),
          className: `nav-link${currentPage === l.id ? ' active' : ''}`,
          onClick: (e) => { e.preventDefault(); setMenuOpen(false); onNavigate(l.id); }
        }, l.label)
      ),
      React.createElement('a', {
        className: 'btn btn-gold',
        href: 'tel:+918604900990',
        style: { textDecoration: 'none' },
        onClick: () => { setMenuOpen(false); onBook(); }
      },
        React.createElement(Icon, { name: 'phone', size: 16 }),
        ' Book Now'
      ),
      React.createElement('a', { href: 'tel:+918604900990', style: { color: 'var(--clr-gold)', fontWeight: 600, fontSize: 15 } },
        '📞 +91 86049 00990'
      )
    )
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero({ onBook, onNavigate }) {
  return React.createElement('section', { id: 'home', className: 'hero' },
    React.createElement('div', { className: 'hero-bg' },
      React.createElement('img', {
        src: 'assets/images/patel_0edf3123-5a99-4047-b916-0901e97f2d27-1-1.webp',
        alt: 'Uma Atithi Gruh Dwarka',
        loading: 'eager',
      }),
      React.createElement('div', { className: 'hero-overlay' }),
      React.createElement('div', { className: 'hero-pattern' })
    ),
    React.createElement('div', { className: 'hero-content' },
      React.createElement('div', { className: 'hero-eyebrow' },
        'Dwarka, Gujarat  •  Since 2003'
      ),
      React.createElement('h1', { className: 'hero-title' }, 'Uma Atithi Gruh'),
      React.createElement('span', { className: 'hero-title-guj' }, 'ઉમા અતિથિ ગૃહ — કડવા પટેલ સમાજ, દ્વારકા'),
      React.createElement('p', { className: 'hero-desc' },
        'Sacred hospitality at the gateway to Dwarkadhish. Pure vegetarian meals, serene sea views, and community warmth — your home during the holy yatra.'
      ),
      React.createElement('div', { className: 'hero-actions' },
        React.createElement('a', {
          className: 'btn btn-gold',
          href: 'tel:+918604900990',
          style: { textDecoration: 'none' },
          onClick: onBook
        },
          React.createElement(Icon, { name: 'phone', size: 16 }),
          ' Book Your Stay'
        ),
        React.createElement('a', {
          className: 'btn btn-white',
          href: getPageUrl('rooms'),
          style: { textDecoration: 'none' },
          onClick: (e) => { e.preventDefault(); onNavigate('rooms'); }
        },
          React.createElement(Icon, { name: 'bed-double', size: 16 }),
          ' View Rooms'
        )
      ),
      React.createElement('div', { className: 'hero-stats' },
        React.createElement('div', { className: 'hero-stat' },
          React.createElement('div', { className: 'hero-stat-num' }, '20+'),
          React.createElement('div', { className: 'hero-stat-label' }, 'Years of Service')
        ),
        React.createElement('div', { className: 'hero-stat-divider' }),
        React.createElement('div', { className: 'hero-stat' },
          React.createElement('div', { className: 'hero-stat-num' }, '50+'),
          React.createElement('div', { className: 'hero-stat-label' }, 'Rooms Available')
        ),
        React.createElement('div', { className: 'hero-stat-divider' }),
        React.createElement('div', { className: 'hero-stat' },
          React.createElement('div', { className: 'hero-stat-num' }, '4.2★'),
          React.createElement('div', { className: 'hero-stat-label' }, 'Google Rating')
        ),
        React.createElement('div', { className: 'hero-stat-divider' }),
        React.createElement('div', { className: 'hero-stat' },
          React.createElement('div', { className: 'hero-stat-num' }, '100%'),
          React.createElement('div', { className: 'hero-stat-label' }, 'Pure Vegetarian')
        )
      )
    ),
    React.createElement('div', { className: 'hero-scroll', onClick: () => onNavigate('about') },
      React.createElement(Icon, { name: 'chevrons-down', size: 20 }),
      React.createElement('span', null, 'Scroll')
    )
  );
}

// ─── TRUST STRIP ─────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { icon: 'shield-check',   text: 'Managed by Umiya Mataji Mandir Trust' },
    { icon: 'leaf',           text: '100% Pure Vegetarian' },
    { icon: 'map-pin',        text: '150m from Dwarka Sea Face' },
    { icon: 'award',          text: '4.2★ Google Rating · 380+ Reviews' },
    { icon: 'phone',          text: '24-Hour Reception' },
  ];
  return React.createElement('div', { className: 'trust-strip' },
    React.createElement('div', { className: 'trust-strip-inner' },
      items.map((item, i) =>
        React.createElement(React.Fragment, { key: i },
          i > 0 && React.createElement('div', { className: 'trust-divider-vert' }),
          React.createElement('div', { className: 'trust-item' },
            React.createElement(Icon, { name: item.icon, size: 15 }),
            React.createElement('span', null, item.text)
          )
        )
      )
    )
  );
}

// ─── ABOUT ───────────────────────────────────────────────────
function About({ onNavigate, showButton = false }) {
  const features = [
    { icon: 'temple',       label: 'Spiritual Setting',   desc: 'Near Dwarkadhish & Bhadkeshwar temples' },
    { icon: 'utensils',     label: 'Satvik Dining',       desc: 'Pure veg, no onion-garlic Gujarati meals' },
    { icon: 'users',        label: 'Community Managed',   desc: 'Run by Shri Umiya Mataji Mandir Trust' },
    { icon: 'indian-rupee', label: 'Affordable Rates',    desc: 'Premium comfort at community pricing' },
  ];
  return React.createElement('section', { id: 'about', className: 'section' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'about-grid' },
        // Images
        React.createElement('div', { className: 'about-images reveal' },
          React.createElement('div', { className: 'about-img-main' },
            React.createElement('img', {
              src: 'assets/images/patel_031b6256-ec65-4699-af8e-73b5b46df154.webp',
              alt: 'Uma Atithi Gruh Building',
              loading: 'lazy',
            })
          ),
          React.createElement('div', { className: 'about-img-accent' },
            React.createElement('img', {
              src: 'assets/images/patel_sea.webp',
              alt: 'Sea view from Dwarka',
              loading: 'lazy',
            })
          ),
          React.createElement('div', { className: 'about-badge-float' },
            React.createElement('div', { className: 'about-badge-num' }, '20+'),
            React.createElement('div', { className: 'about-badge-text' }, 'Years of\nSacred Hospitality')
          )
        ),
        // Content
        React.createElement('div', { className: 'reveal reveal-delay-2' },
          React.createElement('div', { className: 'section-label' }, 'About Us'),
          React.createElement('h2', { className: 'section-title' }, 'Sacred Hospitality\nin the Holy City'),
          React.createElement('div', { className: 'divider' }),
          React.createElement('p', { style: { color: 'var(--clr-text-muted)', lineHeight: 1.75, marginBottom: '16px' } },
            'Shri Mamtubahen Dayabhai Ukani Uma Atithi Gruh is a premier community guest house established under the Shri Umiya Mataji Mandir Trust (Sidsar). Located in the sacred city of Dwarka, Gujarat, we have been offering affordable, clean, and spiritually enriching accommodation to pilgrims, families, and devotees for over two decades.'
          ),
          React.createElement('p', { style: { color: 'var(--clr-text-muted)', lineHeight: 1.75 } },
            'Nestled just 150 metres from the Arabian Sea coast and a short walk from the revered Bhadkeshwar Mahadev Temple, our property blends community values with modern comforts — ensuring every guest experiences the warmth of Gujarati hospitality on their spiritual journey.'
          ),
          React.createElement('div', { className: 'about-features' },
            features.map((f, i) =>
              React.createElement('div', { key: i, className: 'about-feature' },
                React.createElement('div', { className: 'about-feature-icon' },
                  React.createElement(Icon, { name: f.icon, size: 18 })
                ),
                React.createElement('div', null,
                  React.createElement('div', { className: 'about-feature-label' }, f.label),
                  React.createElement('div', { className: 'about-feature-desc' }, f.desc)
                )
              )
            )
          ),
          showButton && React.createElement('div', { style: { marginTop: '28px' } },
            React.createElement('a', {
              href: getPageUrl('about'),
              className: 'btn btn-gold',
              onClick: (e) => { e.preventDefault(); onNavigate('about'); }
            }, 'Read More About Us →')
          )
        )
      )
    )
  );
}

// ─── AMENITIES ───────────────────────────────────────────────
function Amenities() {
  return React.createElement('section', { className: 'section amenities-bg' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-12)' } },
        React.createElement('div', { className: 'section-label' }, 'Facilities'),
        React.createElement('h2', { className: 'section-title' }, 'Everything You Need\nfor a Comfortable Stay'),
        React.createElement('div', { className: 'divider divider-center' }),
        React.createElement('p', { className: 'section-subtitle', style: { margin: '0 auto' } },
          'From pure vegetarian dining to 24-hour reception, every detail is thoughtfully arranged for pilgrim families and spiritual travellers.'
        )
      ),
      React.createElement('div', { className: 'amenities-grid' },
        AMENITIES.map((a, i) =>
          React.createElement('div', { key: i, className: 'amenity-card reveal', style: { transitionDelay: `${(i % 4) * 0.08}s` } },
            React.createElement('div', { className: 'amenity-icon' },
              React.createElement(Icon, { name: a.icon, size: 24 })
            ),
            React.createElement('div', { className: 'amenity-name' }, a.name),
            React.createElement('div', { className: 'amenity-desc' }, a.desc)
          )
        )
      )
    )
  );
}

// ─── ROOMS ───────────────────────────────────────────────────
function Rooms({ onBook, limit, onNavigate }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { id: 'all',    label: 'All Rooms' },
    { id: 'non-ac', label: 'Non-AC' },
    { id: 'ac',     label: 'Air-Conditioned' },
    { id: 'group',  label: 'Group' },
  ];

  const filtered = ROOMS.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'non-ac') return r.type === 'Non-AC' && r.beds < 15;
    if (filter === 'ac') return r.type === 'AC';
    if (filter === 'group') return r.beds >= 15;
    return true;
  });

  const displayRooms = limit ? filtered.slice(0, limit) : filtered;

  return React.createElement('section', { id: 'rooms', className: 'section' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'rooms-header' },
        React.createElement('div', { className: 'section-label' }, 'Accommodation'),
        React.createElement('h2', { className: 'section-title' }, 'Choose Your\nPerfect Room'),
        React.createElement('div', { className: 'divider divider-center' }),
        React.createElement('p', { className: 'section-subtitle', style: { margin: '0 auto' } },
          'From cozy single rooms to spacious family suites and group dormitories, we have the right accommodation for every type of visitor.'
        ),
        React.createElement('div', { className: 'rooms-filter' },
          filters.map(f =>
            React.createElement('button', {
              key: f.id,
              className: `filter-btn${filter === f.id ? ' active' : ''}`,
              onClick: () => setFilter(f.id)
            }, f.label)
          )
        )
      ),
      React.createElement('div', { className: 'rooms-grid' },
        displayRooms.map((room, i) =>
          React.createElement(RoomCard, { key: room.id, room, onBook, delay: i * 0.08 })
        )
      ),
      limit && onNavigate && React.createElement('div', { style: { textAlign: 'center', marginTop: '40px' } },
        React.createElement('button', {
          className: 'btn btn-gold',
          style: { padding: '14px 32px' },
          onClick: () => onNavigate('rooms')
        }, 'View All 6 Room Types & Dormitory →')
      )
    )
  );
}

function RoomCard({ room, onBook, delay }) {
  return React.createElement('div', {
    className: 'room-card reveal',
    style: { transitionDelay: `${delay}s` }
  },
    React.createElement('div', { className: 'room-img' },
      React.createElement('img', { src: room.img, alt: room.name, loading: 'lazy' }),
      React.createElement('div', { className: 'room-badge-wrap' },
        React.createElement('span', { className: 'room-badge-ac' }, room.type),
        room.popular && React.createElement('span', { className: 'room-badge-pop' }, '⭐ Popular')
      )
    ),
    React.createElement('div', { className: 'room-body' },
      React.createElement('h3', { className: 'room-name' }, room.name),
      React.createElement('p', { className: 'room-desc' }, room.desc),
      React.createElement('div', { className: 'room-features' },
        React.createElement('div', { className: 'room-feat' },
          React.createElement(Icon, { name: 'bed-double', size: 13 }),
          ` ${room.beds} ${room.beds === 1 ? 'Bed' : 'Beds'}`
        ),
        React.createElement('div', { className: 'room-feat' },
          React.createElement(Icon, { name: 'users', size: 13 }),
          ` Up to ${room.capacity}`
        ),
        React.createElement('div', { className: 'room-feat' },
          React.createElement(Icon, { name: 'maximize-2', size: 13 }),
          ` ${room.size}`
        ),
        room.type === 'AC' && React.createElement('div', { className: 'room-feat' },
          React.createElement(Icon, { name: 'wind', size: 13 }),
          ' Air Conditioned'
        )
      ),
      React.createElement('div', { className: 'room-footer' },
        React.createElement('div', { className: 'room-price' },
          React.createElement('div', { className: 'room-price-num' }, `₹${room.price.toLocaleString('en-IN')}`),
          React.createElement('div', { className: 'room-price-per' }, 'per night')
        ),
        React.createElement('a', {
          className: 'room-book-btn',
          href: 'tel:+918604900990',
          style: { textDecoration: 'none' },
          onClick: onBook
        }, 'Book Now')
      )
    )
  );
}

// ─── GALLERY ─────────────────────────────────────────────────
function Gallery({ limit, onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = GALLERY_IMGS.filter(img => {
    if (activeTab === 'all') return true;
    return img.cat === activeTab;
  });

  const displayImgs = limit ? filtered.slice(0, limit) : filtered;

  return React.createElement('section', { id: 'gallery', className: 'section amenities-bg' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-8)' } },
        React.createElement('div', { className: 'section-label' }, 'Gallery'),
        React.createElement('h2', { className: 'section-title' }, 'A Glimpse of\nYour Home Away'),
        React.createElement('div', { className: 'divider divider-center' })
      ),
      !limit && React.createElement('div', { className: 'filter-tabs' },
        [
          { id: 'all', label: 'All Photos' },
          { id: 'rooms', label: 'Guest Rooms' },
          { id: 'dining', label: 'Bhojanalaya' },
          { id: 'campus', label: 'Campus & Sanctum' },
          { id: 'surroundings', label: 'Sea & Vicinity' }
        ].map(t =>
          React.createElement('button', {
            key: t.id,
            className: `filter-tab${activeTab === t.id ? ' active' : ''}`,
            onClick: () => setActiveTab(t.id)
          }, t.label)
        )
      ),
      React.createElement('div', { className: 'gallery-grid reveal' },
        displayImgs.map((img, i) =>
          React.createElement('div', { key: i, className: 'gallery-item' },
            React.createElement('img', { src: img.src, alt: img.alt, loading: 'lazy' }),
            img.tag && React.createElement('span', {
              style: {
                position: 'absolute', bottom: '12px', left: '12px',
                background: 'rgba(0,0,0,0.65)', color: 'white',
                padding: '3px 10px', borderRadius: '4px', fontSize: '12px',
                backdropFilter: 'blur(4px)', fontWeight: 500
              }
            }, img.tag)
          )
        )
      ),
      limit && onNavigate && React.createElement('div', { style: { textAlign: 'center', marginTop: '36px' } },
        React.createElement('button', {
          className: 'btn btn-gold',
          onClick: () => onNavigate('gallery')
        }, 'Browse Full Photo Gallery →')
      )
    )
  );
}

// ─── DINING ──────────────────────────────────────────────────
function Dining({ onNavigate, showButton = false }) {
  const menuItems = [
    { icon: '🍲', name: 'Gujarati Thali',       desc: 'Full traditional thali with 15+ items' },
    { icon: '🫙', name: 'Dal-Baati-Churma',      desc: 'Rajasthani specialty on request' },
    { icon: '🥛', name: 'Morning Nashta',        desc: 'Tea, poha, upma, dhokla & more' },
    { icon: '🍵', name: 'Evening Tea & Snacks',  desc: 'Chai, farsan & sweet treats' },
  ];
  return React.createElement('section', { id: 'dining', className: 'section dining-bg' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'dining-grid' },
        React.createElement('div', { className: 'dining-content reveal' },
          React.createElement('div', { className: 'section-label', style: { color: 'var(--clr-gold-light)' } }, 'Satvik Dining'),
          React.createElement('h2', { className: 'section-title dining-title' }, 'Pure Vegetarian\nGujarati Cuisine'),
          React.createElement('div', { className: 'divider' }),
          React.createElement('p', { className: 'dining-subtitle' },
            'Our in-house restaurant serves 100% pure vegetarian meals prepared without onion or garlic, in the true Jain-Vaishnav tradition. Fresh, hygienic, and deeply nourishing — perfect for a spiritual yatra.'
          ),
          React.createElement('div', { className: 'dining-menu' },
            menuItems.map((item, i) =>
              React.createElement('div', { key: i, className: 'dining-item' },
                React.createElement('div', { className: 'dining-item-icon' }, item.icon),
                React.createElement('div', { className: 'dining-item-name' }, item.name),
                React.createElement('div', { className: 'dining-item-desc' }, item.desc)
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' } },
            React.createElement('div', { className: 'badge', style: { background: 'rgba(197,151,58,0.15)', color: 'var(--clr-gold-light)', border: '1px solid rgba(197,151,58,0.3)' } }, '100% Pure Veg'),
            React.createElement('div', { className: 'badge', style: { background: 'rgba(197,151,58,0.15)', color: 'var(--clr-gold-light)', border: '1px solid rgba(197,151,58,0.3)' } }, 'No Onion No Garlic'),
            React.createElement('div', { className: 'badge', style: { background: 'rgba(197,151,58,0.15)', color: 'var(--clr-gold-light)', border: '1px solid rgba(197,151,58,0.3)' } }, 'Group Meals Available')
          ),
          showButton && React.createElement('div', { style: { marginTop: '28px' } },
            React.createElement('a', {
              href: getPageUrl('dining'),
              className: 'btn btn-gold',
              onClick: (e) => { e.preventDefault(); onNavigate('dining'); }
            }, 'View Dining Timings & Menu →')
          )
        ),
        React.createElement('div', { className: 'dining-imgs reveal reveal-delay-2' },
          React.createElement('div', { className: 'dining-img-wrap dining-img-main' },
            React.createElement('img', { src: 'assets/images/patel_10.webp', alt: 'Gujarati Bhojanalaya Dining Hall', loading: 'lazy' }),
            React.createElement('div', { className: 'dining-tag' }, '100% Satvik')
          ),
          React.createElement('div', { className: 'dining-img-wrap dining-img-sec' },
            React.createElement('img', { src: 'assets/images/patel_13.webp', alt: 'Atithi Gruh Dining facility', loading: 'lazy' })
          )
        )
      )
    )
  );
}

// ─── REVIEWS ─────────────────────────────────────────────────
function Reviews() {
  const ratingBars = [
    { stars: '5★', pct: 68 },
    { stars: '4★', pct: 20 },
    { stars: '3★', pct: 7  },
    { stars: '2★', pct: 3  },
    { stars: '1★', pct: 2  },
  ];
  return React.createElement('section', { id: 'reviews', className: 'section reviews-bg' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'reviews-header' },
        React.createElement('div', { className: 'section-label' }, 'Guest Reviews'),
        React.createElement('h2', { className: 'section-title' }, 'What Our Guests Say'),
        React.createElement('div', { className: 'divider divider-center' })
      ),
      React.createElement('div', { className: 'rating-summary reveal' },
        React.createElement('div', { className: 'rating-big' },
          React.createElement('div', { className: 'rating-num' }, '4.2'),
          React.createElement(Stars, { rating: 4, size: 22 }),
          React.createElement('div', { className: 'rating-count' }, 'Based on 380+ reviews')
        ),
        React.createElement('div', { className: 'rating-bars' },
          ratingBars.map((b, i) =>
            React.createElement('div', { key: i, className: 'rating-bar-row' },
              React.createElement('div', { className: 'rating-bar-label' }, b.stars),
              React.createElement('div', { className: 'rating-bar-track' },
                React.createElement('div', { className: 'rating-bar-fill', style: { width: `${b.pct}%` } })
              ),
              React.createElement('div', { className: 'rating-bar-pct' }, `${b.pct}%`)
            )
          )
        )
      ),
      React.createElement('div', { className: 'reviews-grid' },
        REVIEWS.map((r, i) =>
          React.createElement('div', { key: i, className: 'review-card reveal', style: { transitionDelay: `${(i % 3) * 0.1}s` } },
            React.createElement('div', { className: 'review-top' },
              React.createElement('div', { className: 'reviewer' },
                React.createElement('div', { className: 'reviewer-avatar' }, r.initials),
                React.createElement('div', null,
                  React.createElement('div', { className: 'reviewer-name' }, r.name),
                  React.createElement('div', { className: 'reviewer-src' },
                    React.createElement(Icon, { name: 'map-pin', size: 10 }),
                    ' ' + r.source
                  )
                )
              ),
              React.createElement('div', { className: 'review-quote' }, '"')
            ),
            React.createElement('div', { className: 'review-stars' },
              [1,2,3,4,5].map(s => React.createElement('span', { key: s, className: 'review-star' }, s <= r.rating ? '★' : '☆'))
            ),
            React.createElement('p', { className: 'review-text' }, r.text),
            React.createElement('div', { className: 'review-date' }, r.date)
          )
        )
      )
    )
  );
}

// ─── LOCATION ────────────────────────────────────────────────
function Location({ onNavigate, showButton = false }) {
  return React.createElement('section', { id: 'location', className: 'section location-bg' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-12)' } },
        React.createElement('div', { className: 'section-label' }, 'Location'),
        React.createElement('h2', { className: 'section-title' }, 'Prime Location in\nSacred Dwarka'),
        React.createElement('div', { className: 'divider divider-center' }),
        React.createElement('p', { className: 'section-subtitle', style: { margin: '0 auto' } },
          'Perfectly situated near Dwarka\'s holiest temples and the Arabian Sea coast, making your pilgrimage seamless and spiritually complete.'
        )
      ),
      React.createElement('div', { className: 'location-grid' },
        React.createElement('div', { className: 'map-container reveal' },
          React.createElement('iframe', {
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3697.1!2d68.9548369!3d22.2461754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39569c2a5066fb6d%3A0xe5a5aca4c02b37cf!2sKadva%20Patel%20Samaj%20%2F%20Uma%20Atithi%20Gruh%20-%20Dwarka!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin',
            allowFullScreen: true,
            loading: 'lazy',
            referrerPolicy: 'no-referrer-when-downgrade',
            title: 'Uma Atithi Gruh Location Map'
          })
        ),
        React.createElement('div', { className: 'location-info reveal reveal-delay-2' },
          React.createElement('h3', { className: 'section-title', style: { fontSize: '24px' } }, 'Find Us'),
          React.createElement('div', { className: 'location-cards' },
            [
              { icon: 'map-pin',   label: 'Address',   value: 'Patel Samaj Road, Near T.V. Station, Dwarka, Gujarat – 361335', hint: 'GPS: 22.2461705°N, 68.9574118°E' },
              { icon: 'phone',     label: 'Call Us',   value: '+91 86049 00990',                     hint: 'Reception open 24 hours' },
              { icon: 'mail',      label: 'Email',     value: 'contact@kadvapatelsamaj.net',         hint: 'Response within 24 hours' },
              { icon: 'clock',     label: 'Check-in',  value: 'Check-in: 11:00 AM  |  Check-out: 10:00 AM', hint: 'Early check-in subject to availability' },
            ].map((c, i) =>
              React.createElement('div', { key: i, className: 'loc-card' },
                React.createElement('div', { className: 'loc-icon' },
                  React.createElement(Icon, { name: c.icon, size: 20 })
                ),
                React.createElement('div', null,
                  React.createElement('div', { className: 'loc-label' }, c.label),
                  React.createElement('div', { className: 'loc-value' }, c.value),
                  React.createElement('div', { className: 'loc-value hint', style: { fontSize: '12px', color: 'var(--clr-text-muted)', fontWeight: 400 } }, c.hint)
                )
              )
            )
          ),
          React.createElement('h4', { style: { fontWeight: 600, fontSize: '14px', margin: '24px 0 8px', color: 'var(--clr-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' } }, 'Nearby Attractions'),
          React.createElement('div', { className: 'nearby-list' },
            NEARBY.map((n, i) =>
              React.createElement('div', { key: i, className: 'nearby-item' },
                React.createElement('div', { className: 'nearby-name' },
                  React.createElement(Icon, { name: 'map-pin', size: 13 }),
                  ' ' + n.name
                ),
                React.createElement('div', { className: 'nearby-dist' }, n.dist)
              )
            )
          ),
          showButton && React.createElement('div', { style: { marginTop: '24px' } },
            React.createElement('a', {
              href: getPageUrl('location'),
              className: 'btn btn-gold',
              onClick: (e) => { e.preventDefault(); onNavigate('location'); }
            }, 'Detailed Travel Directions & Landmark Guide →')
          )
        )
      )
    )
  );
}

// ─── BOOKING CTA ─────────────────────────────────────────────
function BookingCTA({ onBook }) {
  return React.createElement('section', { className: 'section booking-cta' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'booking-cta-inner' },
        React.createElement('div', null,
          React.createElement('h2', { className: 'booking-cta-title' }, 'Ready for Your\nDwarka Yatra?'),
          React.createElement('p', { className: 'booking-cta-sub' }, 'Book directly by phone for best rates and immediate confirmation. No agent commission.')
        ),
        React.createElement('div', { className: 'booking-cta-actions' },
          React.createElement('a', {
            className: 'btn btn-white',
            href: 'tel:+918604900990',
            style: { textDecoration: 'none' },
            onClick: onBook
          },
            React.createElement(Icon, { name: 'phone', size: 16 }),
            ' Call +91 86049 00990'
          ),
          React.createElement('a', {
            className: 'btn btn-outline',
            href: 'https://wa.me/918604900990?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability%20at%20Uma%20Atithi%20Gruh%20Dwarka.',
            target: '_blank',
            rel: 'noopener noreferrer',
            style: { borderColor: 'white', color: 'white', textDecoration: 'none' }
          },
            React.createElement(Icon, { name: 'whatsapp', size: 16 }),
            ' Chat on WhatsApp'
          )
        )
      )
    )
  );
}

// ─── CONTACT ─────────────────────────────────────────────────
function Contact() {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', checkin: '', checkout: '', room: '', guests: '', message: '' });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => setFormState(s => ({ ...s, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ msg: '✓ Enquiry received! Our reception team will call you within 2 hours.', type: 'success' });
    setTimeout(() => setToast(null), 5000);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello, I would like to book a stay at Uma Atithi Gruh Dwarka.\nName: ${formState.name || 'Guest'}\nPhone: ${formState.phone || 'N/A'}\nRoom: ${formState.room || 'Any'}\nDates: ${formState.checkin || 'TBD'} to ${formState.checkout || 'TBD'}`
  );

  return React.createElement('section', { id: 'contact', className: 'section' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-12)' } },
        React.createElement('div', { className: 'section-label' }, 'Contact & Booking'),
        React.createElement('h2', { className: 'section-title' }, 'Get in Touch'),
        React.createElement('div', { className: 'divider divider-center' })
      ),
      React.createElement('div', { className: 'contact-grid' },
        React.createElement('div', { className: 'reveal' },
          React.createElement('h3', { style: { fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 600, marginBottom: '20px', color: 'var(--clr-deep)' } }, 'Contact Information'),
          React.createElement('div', { className: 'contact-cards' },
            [
              { icon: 'phone',   label: 'Phone (Calling & Booking)', value: '+91 86049 00990', hint: '24-hour reception desk' },
              { icon: 'mail',    label: 'Email',                     value: 'contact@kadvapatelsamaj.net', hint: 'Response within 24 hours' },
              { icon: 'map-pin', label: 'Address',                   value: 'Patel Samaj Road, Near T.V. Station, Dwarka, Gujarat 361335', hint: 'GPS: 22.2461°N, 68.9574°E' },
            ].map((c, i) =>
              React.createElement('div', { key: i, className: 'contact-card' },
                React.createElement('div', { className: 'contact-icon' },
                  React.createElement(Icon, { name: c.icon, size: 22 })
                ),
                React.createElement('div', null,
                  React.createElement('div', { className: 'contact-label' }, c.label),
                  React.createElement('div', { className: 'contact-value' },
                    c.label.includes('Phone')
                      ? React.createElement('a', { href: 'tel:+918604900990', style: { color: 'inherit', textDecoration: 'none' } }, c.value)
                      : c.label.includes('Email')
                        ? React.createElement('a', { href: 'mailto:contact@kadvapatelsamaj.net', style: { color: 'inherit', textDecoration: 'none' } }, c.value)
                        : c.value
                  ),
                  React.createElement('div', { className: 'contact-hint' }, c.hint)
                )
              )
            )
          ),
          React.createElement('div', { style: { marginTop: '24px', padding: '20px', background: 'var(--clr-cream)', borderRadius: '12px', border: '1px solid var(--clr-border)' } },
            React.createElement('div', { style: { fontWeight: 600, color: 'var(--clr-deep)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' } },
              React.createElement(Icon, { name: 'whatsapp', size: 18 }),
              'Instant WhatsApp Support'
            ),
            React.createElement('p', { style: { fontSize: '13.5px', color: 'var(--clr-text-muted)', marginBottom: '12px', lineHeight: 1.6 } },
              'Prefer messaging? Chat directly with our manager on WhatsApp for quick confirmation and room photos.'
            ),
            React.createElement('a', {
              href: `https://wa.me/918604900990?text=${whatsappMsg}`,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'btn btn-gold',
              style: { padding: '10px 18px', fontSize: '13px', display: 'inline-flex' }
            }, '💬 Open WhatsApp Chat')
          )
        ),
        React.createElement('div', { className: 'contact-form reveal reveal-delay-2' },
          React.createElement('div', { className: 'form-title' }, 'Send an Enquiry'),
          React.createElement('form', { onSubmit: handleSubmit },
            React.createElement('div', { className: 'form-row' },
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Full Name *'),
                React.createElement('input', { type: 'text', name: 'name', className: 'form-input', placeholder: 'Your name', required: true, value: formState.name, onChange: handleChange })
              ),
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Phone *'),
                React.createElement('input', { type: 'tel', name: 'phone', className: 'form-input', placeholder: '+91 86049 00990', required: true, value: formState.phone, onChange: handleChange })
              )
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Email Address'),
              React.createElement('input', { type: 'email', name: 'email', className: 'form-input', placeholder: 'your@email.com', value: formState.email, onChange: handleChange })
            ),
            React.createElement('div', { className: 'form-row' },
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Check-In Date'),
                React.createElement('input', { type: 'date', name: 'checkin', className: 'form-input', value: formState.checkin, onChange: handleChange })
              ),
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Check-Out Date'),
                React.createElement('input', { type: 'date', name: 'checkout', className: 'form-input', value: formState.checkout, onChange: handleChange })
              )
            ),
            React.createElement('div', { className: 'form-row' },
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Room Type'),
                React.createElement('select', { name: 'room', className: 'form-select', value: formState.room, onChange: handleChange },
                  React.createElement('option', { value: '' }, 'Select room type'),
                  ROOMS.map(r => React.createElement('option', { key: r.id, value: r.name }, `${r.name} (₹${r.price.toLocaleString('en-IN')})`))
                )
              ),
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'No. of Guests'),
                React.createElement('input', { type: 'number', name: 'guests', min: 1, className: 'form-input', placeholder: 'e.g. 4', value: formState.guests, onChange: handleChange })
              )
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Message or Special Requests'),
              React.createElement('textarea', { name: 'message', className: 'form-textarea', placeholder: 'Arrival time, elderly assistance, or group meal requirements...', value: formState.message, onChange: handleChange })
            ),
            React.createElement('button', { type: 'submit', className: 'form-submit' },
              React.createElement(Icon, { name: 'send', size: 15 }),
              '  Send Enquiry'
            )
          )
        )
      )
    ),
    toast && React.createElement('div', { className: 'toast' },
      React.createElement(Icon, { name: 'check-circle', size: 18 }),
      toast.msg
    )
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer({ onNavigate }) {
  const year = new Date().getFullYear();
  return React.createElement('footer', { className: 'footer' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'footer-grid' },
        React.createElement('div', { className: 'footer-about' },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' } },
            React.createElement('img', {
              src: 'assets/images/emblem_umiya.webp',
              alt: 'Shri Umiya Mataji Emblem',
              className: 'logo-img',
              style: { height: '44px', width: '44px', background: '#FFFFFF', padding: '2px', borderRadius: '50%', border: '1.5px solid var(--clr-gold)', objectFit: 'contain' },
              onError: (e) => { e.currentTarget.src = 'assets/images/emblem_umiya.png'; }
            }),
            React.createElement('div', null,
              React.createElement('div', { className: 'logo-text-en', style: { color: 'white', fontSize: 16 } }, 'Uma Atithi Gruh'),
              React.createElement('div', { className: 'logo-text-guj', style: { color: 'var(--clr-gold-light)' } }, 'કડવા પટેલ સમાજ • દ્વારકા')
            )
          ),
          React.createElement('p', { className: 'footer-desc' },
            'Shri Mamtubahen Dayabhai Ukani Uma Atithi Gruh — premium community guest house managed by Shri Umiya Mataji Mandir Trust, Sidsar. Serving pilgrims and families in Dwarka since 2003.'
          ),
          React.createElement('div', { className: 'footer-social' },
            ['facebook', 'instagram', 'youtube', 'map-pin'].map((s, i) =>
              React.createElement('a', { key: i, href: '#', 'aria-label': s },
                React.createElement(Icon, { name: s, size: 15 })
              )
            )
          )
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'footer-heading' }, 'Navigation'),
          React.createElement('div', { className: 'footer-links' },
            [
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'rooms', label: 'Our Rooms' },
              { id: 'dining', label: 'Dining' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'location', label: 'Location' },
              { id: 'contact', label: 'Contact' },
            ].map(l =>
              React.createElement('a', {
                key: l.id,
                href: getPageUrl(l.id),
                onClick: (e) => { e.preventDefault(); onNavigate(l.id); }
              }, l.label)
            )
          )
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'footer-heading' }, 'Room Categories'),
          React.createElement('div', { className: 'footer-links' },
            ROOMS.map(r =>
              React.createElement('a', {
                key: r.id,
                href: getPageUrl('rooms'),
                onClick: (e) => { e.preventDefault(); onNavigate('rooms'); }
              }, `${r.name} — ₹${r.price.toLocaleString('en-IN')}`)
            )
          )
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'footer-heading' }, 'Contact Desk'),
          React.createElement('div', { className: 'footer-links' },
            React.createElement('a', { href: 'tel:+918604900990' }, '📞 +91 86049 00990'),
            React.createElement('a', { href: 'mailto:contact@kadvapatelsamaj.net' }, '✉️ contact@kadvapatelsamaj.net'),
            React.createElement('span', { style: { color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6 } }, 'Patel Samaj Road, Near T.V. Station, Dwarka, Gujarat 361335')
          )
        )
      ),
      React.createElement('div', { className: 'footer-bottom' },
        React.createElement('div', { className: 'footer-copy' },
          `© ${year} Uma Atithi Gruh — Kadva Patel Samaj, Dwarka. All rights reserved.`
        ),
        React.createElement('div', { className: 'footer-trust' },
          'Managed by ',
          React.createElement('span', null, 'Shri Umiya Mataji Mandir Trust, Sidsar')
        )
      )
    )
  );
}

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// ─── BACK TO TOP ─────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return React.createElement('button', {
    className: `back-to-top${visible ? ' visible' : ''}`,
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'aria-label': 'Back to top'
  }, React.createElement(Icon, { name: 'chevron-up', size: 20 }));
}

// ─── WHATSAPP FLOAT ───────────────────────────────────────────
function WhatsAppFloat() {
  return React.createElement('a', {
    href: 'https://wa.me/918604900990?text=Hello%2C%20I%20would%20like%20to%20book%20a%20room%20at%20Uma%20Atithi%20Gruh%20Dwarka.',
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'whatsapp-float-btn',
    'aria-label': 'Chat with Uma Atithi Gruh on WhatsApp: +91 86049 00990',
    title: 'Chat on WhatsApp: +91 86049 00990'
  },
    React.createElement('span', { className: 'whatsapp-float-icon-wrap' },
      React.createElement(Icon, { name: 'whatsapp', size: 20 })
    ),
    React.createElement('span', { className: 'whatsapp-float-text' },
      React.createElement('span', { className: 'whatsapp-float-label' }, 'Chat on WhatsApp'),
      React.createElement('span', { className: 'whatsapp-float-num' }, '+91 86049 00990')
    )
  );
}

// ═══════════════════════════════════════════════════════════════
// ─── DEDICATED FULL PAGES ──────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

// 1. HOME PAGE
function HomePage({ onBook, onNavigate }) {
  return React.createElement(React.Fragment, null,
    React.createElement(Hero, { onBook, onNavigate }),
    React.createElement(TrustStrip),
    React.createElement(About, { onNavigate, showButton: true }),
    React.createElement(Amenities),
    React.createElement(Rooms, { onBook, limit: 3, onNavigate }),
    React.createElement(Dining, { onNavigate, showButton: true }),
    React.createElement(Gallery, { limit: 6, onNavigate }),
    React.createElement(Reviews),
    React.createElement(Location, { onNavigate, showButton: true }),
    React.createElement(BookingCTA, { onBook })
  );
}

// 2. ABOUT PAGE
function AboutPage({ onBook, onHome, onNavigate }) {
  const pillars = [
    {
      icon: 'shield-check',
      title: 'Trust & Governance',
      text: 'Managed under the direct patronage of Shri Umiya Mataji Mandir Trust (Sidsar), ensuring ethical standards, non-profit community pricing, and dedicated spiritual service to all pilgrims.'
    },
    {
      icon: 'heart',
      title: 'Pilgrim-Centric Hospitality',
      text: 'With 24-hour reception, lift access for elderly devotees, purified drinking water, and safe luggage storage, we cater to every need of yatra devotees from across Gujarat and India.'
    },
    {
      icon: 'sparkles',
      title: 'Purity & Cleanliness',
      text: 'Hygiene is our highest priority. All rooms feature sanitized attached bathrooms, fresh bedding, and round-the-clock hot water, with peaceful sea breezes from the Arabian Sea.'
    }
  ];

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, {
      eyebrow: 'Shri Umiya Mataji Mandir Trust, Sidsar',
      title: 'About Uma Atithi Gruh',
      subtitle: 'Over 20 years of sacred hospitality, community trust, and satvik living in the holy land of Dwarka.',
      breadcrumb: 'About Us',
      onHome
    }),
    React.createElement(TrustStrip),
    React.createElement(About, { onNavigate, showButton: false }),
    // Detailed Pillars Section
    React.createElement('section', { className: 'page-section', style: { background: 'var(--clr-surface)' } },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-10)' } },
          React.createElement('div', { className: 'section-label' }, 'Our Foundation'),
          React.createElement('h2', { className: 'section-title' }, 'Guided by Community Values'),
          React.createElement('div', { className: 'divider divider-center' })
        ),
        React.createElement('div', { className: 'page-grid-3' },
          pillars.map((p, i) =>
            React.createElement('div', { key: i, className: 'info-card' },
              React.createElement('div', { className: 'info-card-icon' },
                React.createElement(Icon, { name: p.icon, size: 24 })
              ),
              React.createElement('div', { className: 'info-card-title' }, p.title),
              React.createElement('div', { className: 'info-card-text' }, p.text)
            )
          )
        )
      )
    ),
    React.createElement(Amenities),
    React.createElement(Reviews),
    React.createElement(BookingCTA, { onBook })
  );
}

// 3. ROOMS PAGE
function RoomsPage({ onBook, onHome }) {
  const guidelines = [
    {
      icon: 'clock',
      title: 'Check-in & Check-out',
      text: 'Check-in time is 11:00 AM and Check-out is 10:00 AM. 24-hour reception is available for late-night pilgrim arrivals.'
    },
    {
      icon: 'droplets',
      title: '24/7 Hot Water & Power',
      text: 'All guest rooms are equipped with geysers for uninterrupted hot water and generator backup during city power outages.'
    },
    {
      icon: 'elevator',
      title: 'Full Elevator Access',
      text: 'Modern passenger elevator reaches all residential floors, making stays comfortable for senior citizens and families.'
    },
    {
      icon: 'car',
      title: 'Free On-Site Parking',
      text: 'Spacious secured parking inside our premises for private cars, mini-coaches, and large pilgrim buses.'
    }
  ];

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, {
      eyebrow: 'Accommodation & Tariffs',
      title: 'Our Rooms & Suites',
      subtitle: 'Clean, peaceful, and affordable stays in Dwarka for solo pilgrims, families, and yatra groups. All rooms feature attached baths and 24/7 hot water.',
      breadcrumb: 'Rooms',
      onHome
    }),
    React.createElement(Rooms, { onBook, limit: null }),
    // Room Guidelines & Inclusions
    React.createElement('section', { className: 'page-section', style: { background: 'var(--clr-surface)' } },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-10)' } },
          React.createElement('div', { className: 'section-label' }, 'Guest Guidelines'),
          React.createElement('h2', { className: 'section-title' }, 'Room Inclusions & Policies'),
          React.createElement('div', { className: 'divider divider-center' })
        ),
        React.createElement('div', { className: 'page-grid-2' },
          guidelines.map((g, i) =>
            React.createElement('div', { key: i, className: 'info-card' },
              React.createElement('div', { className: 'info-card-icon' },
                React.createElement(Icon, { name: g.icon, size: 24 })
              ),
              React.createElement('div', { className: 'info-card-title' }, g.title),
              React.createElement('div', { className: 'info-card-text' }, g.text)
            )
          )
        )
      )
    ),
    React.createElement(BookingCTA, { onBook })
  );
}

// 4. DINING PAGE
function DiningPage({ onBook, onHome }) {
  const mealTimings = [
    {
      badge: 'Morning',
      time: '07:00 AM – 09:30 AM',
      title: 'Nasto (Morning Breakfast)',
      desc: 'Hot fresh Gujarati breakfast: ginger tea / hot milk, poha, upma, thepla, bhakri, and traditional savories.'
    },
    {
      badge: 'Afternoon',
      time: '11:30 AM – 02:30 PM',
      title: 'Rajbhog Gujarati Thali',
      desc: 'Authentic satvik thali with 2 seasonal vegetables, freshly puffed rotli/puri, Gujarati dal-bhat, farsan, sweet dish, papad, pickle & fresh chaas.'
    },
    {
      badge: 'Evening',
      time: '07:00 PM – 09:30 PM',
      title: 'Valu (Satvik Dinner)',
      desc: 'Comforting, light dinner featuring piping-hot Gujarati kadhi-khichdi, seasonal shaak, millet rotla / bhakri, and fresh milk.'
    }
  ];

  const standards = [
    {
      icon: 'leaf',
      title: '100% Satvik & Jain Compliant',
      text: 'Prepared strictly without onion, garlic, or root vegetables. Adheres faithfully to Vaishnav and Jain dietary principles.'
    },
    {
      icon: 'droplets',
      title: 'Commercial RO Drinking Water',
      text: 'Only purified drinking water is utilized for cooking and served to guests in the dining hall.'
    },
    {
      icon: 'users',
      title: 'Large Group Yatra Catering',
      text: 'Special group dining arrangements for pilgrim sanghs and bus tours with prior notification at reception.'
    }
  ];

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, {
      eyebrow: 'Shri Umiya Bhojanalaya',
      title: 'Pure Vegetarian Satvik Dining',
      subtitle: 'Traditional Gujarati meals prepared with devotion — strictly no onion, no garlic, in accordance with Vaishnav and Jain traditions.',
      breadcrumb: 'Dining',
      onHome
    }),
    React.createElement(Dining, { showButton: false }),
    // Timings & Schedule
    React.createElement('section', { className: 'page-section', style: { background: 'var(--clr-white)' } },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-10)' } },
          React.createElement('div', { className: 'section-label' }, 'Meal Schedule'),
          React.createElement('h2', { className: 'section-title' }, 'Bhojanalaya Timings'),
          React.createElement('div', { className: 'divider divider-center' }),
          React.createElement('p', { className: 'section-subtitle', style: { margin: '0 auto' } },
            'Freshly prepared warm meals served daily during standard puja and darshan hours.'
          )
        ),
        React.createElement('div', { className: 'page-grid-3' },
          mealTimings.map((m, i) =>
            React.createElement('div', { key: i, className: 'schedule-card' },
              React.createElement('div', { className: 'schedule-badge' }, m.badge),
              React.createElement('div', { className: 'schedule-time' }, m.time),
              React.createElement('h3', { style: { fontSize: '18px', fontWeight: 600, color: 'var(--clr-deep)', margin: '8px 0' } }, m.title),
              React.createElement('div', { className: 'schedule-desc' }, m.desc)
            )
          )
        )
      )
    ),
    // Standards Grid
    React.createElement('section', { className: 'page-section', style: { background: 'var(--clr-surface)' } },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-10)' } },
          React.createElement('div', { className: 'section-label' }, 'Kitchen Standards'),
          React.createElement('h2', { className: 'section-title' }, 'Hygiene & Sanctity'),
          React.createElement('div', { className: 'divider divider-center' })
        ),
        React.createElement('div', { className: 'page-grid-3' },
          standards.map((s, i) =>
            React.createElement('div', { key: i, className: 'info-card' },
              React.createElement('div', { className: 'info-card-icon' },
                React.createElement(Icon, { name: s.icon, size: 24 })
              ),
              React.createElement('div', { className: 'info-card-title' }, s.title),
              React.createElement('div', { className: 'info-card-text' }, s.text)
            )
          )
        )
      )
    ),
    React.createElement(Reviews),
    React.createElement(BookingCTA, { onBook })
  );
}

// 5. GALLERY PAGE
function GalleryPage({ onBook, onHome }) {
  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, {
      eyebrow: 'Visual Tour',
      title: 'Uma Atithi Gruh Gallery',
      subtitle: 'Take a visual walk through our guest house, comfortable bedrooms, dining hall, and nearby Arabian sea views.',
      breadcrumb: 'Gallery',
      onHome
    }),
    React.createElement(Gallery, { limit: null }),
    React.createElement(BookingCTA, { onBook })
  );
}

// 6. LOCATION PAGE
function LocationPage({ onBook, onHome }) {
  const travelModes = [
    {
      icon: 'train',
      title: 'By Train',
      desc: 'Dwarka Railway Station (DWK) connects directly to major cities including Ahmedabad, Mumbai, Rajkot, Delhi, and Varanasi. The Atithi Gruh is just 1.8 km (7 minutes) by auto-rickshaw.'
    },
    {
      icon: 'plane',
      title: 'By Air',
      desc: 'Nearest airports are Jamnagar Airport (JGA, ~130 km), Porbandar Airport (PBD, ~105 km), and Rajkot International Airport (HSR, ~225 km). Regular taxi services are available.'
    },
    {
      icon: 'bus',
      title: 'By Bus / Road',
      desc: 'Well linked via National Highway 51 and state highways. State Transport (GSRTC) and private sleeper coaches operate daily. Dwarka Central Bus Stand is only 1.5 km away.'
    }
  ];

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, {
      eyebrow: 'Dwarka, Gujarat',
      title: 'Location & Travel Directions',
      subtitle: 'Conveniently located on Patel Samaj Road near T.V. Station, 150m from Arabian sea coast and 2.1 km from Jagat Mandir Shri Dwarkadhish.',
      breadcrumb: 'Location',
      onHome
    }),
    React.createElement(Location, { showButton: false }),
    // Travel Guide
    React.createElement('section', { className: 'page-section', style: { background: 'var(--clr-white)' } },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-10)' } },
          React.createElement('div', { className: 'section-label' }, 'How to Reach'),
          React.createElement('h2', { className: 'section-title' }, 'Getting to Uma Atithi Gruh'),
          React.createElement('div', { className: 'divider divider-center' }),
          React.createElement('p', { className: 'section-subtitle', style: { margin: '0 auto' } },
            'Dwarka is well connected by rail, road, and air. Our property on Patel Samaj Road is easily accessible by any local vehicle.'
          )
        ),
        React.createElement('div', { className: 'page-grid-3' },
          travelModes.map((t, i) =>
            React.createElement('div', { key: i, className: 'travel-card' },
              React.createElement('div', { className: 'travel-header' },
                React.createElement('div', { className: 'travel-icon-box' },
                  React.createElement(Icon, { name: t.icon, size: 22 })
                ),
                React.createElement('div', { className: 'travel-title' }, t.title)
              ),
              React.createElement('div', { style: { color: 'var(--clr-text-muted)', fontSize: '14.5px', lineHeight: 1.7 } }, t.desc)
            )
          )
        )
      )
    ),
    React.createElement(BookingCTA, { onBook })
  );
}

// 7. CONTACT PAGE
function ContactPage({ onBook, onHome }) {
  const faqs = [
    {
      q: 'How do I book a room at Uma Atithi Gruh?',
      a: 'You can book directly by calling our 24/7 reception desk at +91 86049 00990 or by messaging us on WhatsApp. We confirm room availability and tariff immediately.'
    },
    {
      q: 'How far is the guest house from Dwarkadhish Temple?',
      a: 'Shri Dwarkadhish Jagat Mandir is approximately 2.1 km away. Auto-rickshaws are readily available outside our gates and reach the temple in 5–7 minutes.'
    },
    {
      q: 'Is food available on the property?',
      a: 'Yes, our in-house Shri Umiya Bhojanalaya serves 100% pure vegetarian Gujarati meals (Nasto, Rajbhog lunch thali, and light dinner) prepared strictly without onion or garlic.'
    },
    {
      q: 'Is parking available for private cars and tour buses?',
      a: 'Yes, we provide ample, safe, on-site parking for all our guests including private four-wheelers, tempo travellers, and yatra tour buses.'
    },
    {
      q: 'Are elevator facilities available for senior citizens?',
      a: 'Yes, our guest house is equipped with modern elevators reaching all accommodation floors for the comfort of elderly pilgrims.'
    }
  ];

  return React.createElement(React.Fragment, null,
    React.createElement(PageHeader, {
      eyebrow: '24/7 Assistance',
      title: 'Contact & Reservations',
      subtitle: 'Reach our reception desk directly for room bookings, group queries, or travel guidance. We are at your service round the clock.',
      breadcrumb: 'Contact',
      onHome
    }),
    React.createElement(Contact),
    // FAQs Section
    React.createElement('section', { className: 'page-section', style: { background: 'var(--clr-surface)' } },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: 'var(--space-8)' } },
          React.createElement('div', { className: 'section-label' }, 'Common Queries'),
          React.createElement('h2', { className: 'section-title' }, 'Frequently Asked Questions'),
          React.createElement('div', { className: 'divider divider-center' })
        ),
        React.createElement('div', { className: 'faq-list' },
          faqs.map((f, i) =>
            React.createElement('div', { key: i, className: 'faq-item' },
              React.createElement('div', { className: 'faq-q' },
                React.createElement('span', { className: 'faq-q-num' }, `${i + 1}`),
                React.createElement('span', null, f.q)
              ),
              React.createElement('div', { className: 'faq-a' }, f.a)
            )
          )
        )
      )
    ),
    React.createElement(BookingCTA, { onBook })
  );
}

// ═══════════════════════════════════════════════════════════════
// ─── ROUTER & ROOT APP ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

function getPageFromLocation() {
  if (window.__INITIAL_PAGE__) {
    return window.__INITIAL_PAGE__;
  }
  const path = window.location.pathname.toLowerCase();
  const matchPath = path.match(/(about|rooms|dining|gallery|location|contact)/);
  if (matchPath) return matchPath[1];

  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  if (['about', 'rooms', 'dining', 'gallery', 'location', 'contact'].includes(hash)) {
    return hash;
  }
  return 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromLocation);
  useScrollReveal();

  // If user arrives via an old hash link (e.g. /#/gallery or #gallery), strip it immediately to clean URL
  useEffect(() => {
    if (window.location.hash) {
      const page = getPageFromLocation();
      const cleanUrl = getPageUrl(page);
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromLocation();
      setCurrentPage(page);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((page) => {
    setCurrentPage(page);
    const targetUrl = getPageUrl(page);

    if (window.location.pathname !== targetUrl || window.location.hash) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titles = {
      home: 'Kadva Patel Samaj | Uma Atithi Gruh Dwarka - Premium Guest House',
      about: 'About Us | Uma Atithi Gruh - Kadva Patel Samaj Dwarka',
      rooms: 'Rooms & Tariffs | Uma Atithi Gruh - Kadva Patel Samaj Dwarka',
      dining: 'Pure Veg Dining & Bhojanalaya | Uma Atithi Gruh - Kadva Patel Samaj Dwarka',
      gallery: 'Photo Gallery | Uma Atithi Gruh - Kadva Patel Samaj Dwarka',
      location: 'Location & Travel Guide | Uma Atithi Gruh - Kadva Patel Samaj Dwarka',
      contact: 'Contact & Reservations | Uma Atithi Gruh - Kadva Patel Samaj Dwarka'
    };
    if (titles[page]) {
      document.title = titles[page];
    }
  }, []);

  const handleBookCall = useCallback(() => {
    window.location.href = 'tel:+918604900990';
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return React.createElement(AboutPage, { onBook: handleBookCall, onHome: () => navigate('home'), onNavigate: navigate });
      case 'rooms':
        return React.createElement(RoomsPage, { onBook: handleBookCall, onHome: () => navigate('home') });
      case 'dining':
        return React.createElement(DiningPage, { onBook: handleBookCall, onHome: () => navigate('home') });
      case 'gallery':
        return React.createElement(GalleryPage, { onBook: handleBookCall, onHome: () => navigate('home') });
      case 'location':
        return React.createElement(LocationPage, { onBook: handleBookCall, onHome: () => navigate('home') });
      case 'contact':
        return React.createElement(ContactPage, { onBook: handleBookCall, onHome: () => navigate('home') });
      default:
        return React.createElement(HomePage, { onBook: handleBookCall, onNavigate: navigate });
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement(Navbar, { currentPage, onNavigate: navigate, onBook: handleBookCall }),
    renderCurrentPage(),
    React.createElement(Footer, { onNavigate: navigate }),
    React.createElement(BackToTop),
    React.createElement(WhatsAppFloat)
  );
}

// ─── MOUNT ────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
