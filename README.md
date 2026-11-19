# Uma Atithi Gruh — Kadva Patel Samaj, Dwarka
## Professional Hotel Website

A modern, fully-responsive hotel website built with React.js for **Shri Mamtubahen Dayabhai Ukani Uma Atithi Gruh** (Kadva Patel Samaj), Dwarka.

---

### 🏗️ Tech Stack
- **React 18** (CDN / no build step required)
- **Babel Standalone** (in-browser JSX transpilation)
- **Lucide Icons** (CDN)
- **Google Fonts** — Cormorant Garamond + Inter + Noto Sans Gujarati
- **Pure CSS** (no Tailwind / Bootstrap — custom design tokens)
- **Apache `.htaccess`** (SEO & performance optimizations)

---

### 📁 File Structure
```
kadvapatelsamaj/
├── assets/
│   └── images/         ← 38 official hotel images (.jpeg, .png & optimized .webp)
├── src/
│   └── App.jsx         ← Full React app (all components, state & live data)
├── index.html          ← Main HTML + custom CSS tokens + React mount
├── favicon.svg         ← Custom Gujarati 'ઉ' brand favicon
├── .htaccess           ← Apache: GZIP, caching, security headers
├── sitemap.xml         ← XML sitemap for SEO
├── robots.txt          ← Search engine crawler rules
└── README.md           ← Documentation
```

---

### 🚀 Setup (XAMPP)
1. Place the folder at `C:\xampp\htdocs\kadvapatelsamaj\`
2. Ensure Apache is running in XAMPP
3. Visit: **http://localhost/kadvapatelsamaj/**

**No build step needed.** The site works directly from XAMPP via HTTP (CDN Babel requires HTTP, not `file://`).

---

### 🏨 Sections
| Section | Description |
|---------|-------------|
| **Hero** | Full-screen with animated zoom, stats, dual CTAs |
| **Trust Strip** | Key property highlights bar |
| **About** | Property story with floating badge and feature grid |
| **Amenities** | 12-amenity card grid with hover effects |
| **Rooms** | 6 room types with filterable cards (All/Non-AC/AC/Group) |
| **Gallery** | 5-photo masonry grid |
| **Dining** | Dark-background section with Gujarati menu highlights |
| **Reviews** | 6 guest reviews + rating breakdown |
| **Location** | Google Maps embed + nearby attractions list |
| **Booking CTA** | Gradient full-width call to action |
| **Contact** | Contact cards + enquiry form |
| **Footer** | Full footer with links, social, trust info |

---

### 🔍 SEO Features
- Full meta tags (title, description, keywords, canonical, robots)
- Open Graph tags (Facebook/WhatsApp preview)
- Twitter Card tags
- **Schema.org JSON-LD** (LodgingBusiness type with ratings, address, amenities, geo)
- XML Sitemap
- robots.txt
- Semantic HTML5 structure
- Performance: GZIP compression via `.htaccess`
- Browser caching headers for static assets

---

### 💡 Room Types & Pricing
| Room | Beds | Type | Price |
|------|------|------|-------|
| Standard Room | 1 | Non-AC | ₹1,250/night |
| Twin Sharing | 2 | Non-AC | ₹1,500/night |
| Family Room (3 Bed) | 3 | Non-AC | ₹1,800/night |
| Deluxe Family | 4 | Non-AC | ₹2,200/night |
| Premium AC Room | 2 | AC | ₹2,800/night |
| Group Hall | 15 | Non-AC | ₹5,000/night |

---

### 📞 Contact Details
- **Phone:** +91 70434 24333 / 02892-234333
- **Email:** umadwarka16@gmail.com
- **Address:** Patel Samaj Road, Near T.V. Station, Dwarka, Gujarat – 361335
- **GPS:** 22.2461705°N, 68.9574118°E
- **Managed by:** Shri Umiya Mataji Mandir Trust, Sidsar

---

### 🛠️ Customization
- **Colors:** Edit `:root` CSS variables at top of `index.html`
- **Room data:** Edit `ROOMS` array in `src/App.jsx`
- **Amenities:** Edit `AMENITIES` array
- **Reviews:** Edit `REVIEWS` array
- **Nearby attractions:** Edit `NEARBY` array
- **Images:** Replace Unsplash URLs with actual hotel photos

