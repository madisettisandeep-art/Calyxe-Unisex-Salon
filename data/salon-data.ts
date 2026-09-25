export interface SceneData {
  id: number;
  numberStr: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hotspot: {
    title: string;
    description: string;
    category: string;
    cta: string;
  };
}

export interface ServiceItem {
  id: string;
  service_name: string;
  category: "HAIR" | "SKIN & BEAUTY" | "GROOMING" | "SPA / RELAXATION" | "TRANSFORMATIONS" | "BRIDAL / OCCASIONS";
  description: string;
  duration: string;
  priceFormatted: string;
  gender: "Unisex" | "Women" | "Men";
  featured: boolean;
  booking_enabled: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  serviceCategory: string;
  verified: boolean;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: "HAIR" | "MAKEOVER" | "BEAUTY" | "GROOMING";
  description: string;
  beforeImage: string;
  afterImage: string;
  timeTaken: string;
}

export const SALON_INFO = {
  name: "CALYXÉ",
  fullName: "CALYXÉ UNISEX SALON",
  concept: "STEP INTO CALYXÉ",
  editorialLead: "Where architectural minimalism meets world-class hair and skin craftsmanship in Hanamkonda.",
  address: "2-6-986, Circuit House Road, near Sun Rise Hospital, KLN Reddy Colony, Subedari, Hanamkonda, Telangana 506001",
  landmark: "Near Sun Rise Hospital, Beside Rare 1 Shopping Mall",
  city: "Hanamkonda, Warangal, Telangana",
  postalCode: "506001",
  phone: "091009 20304",
  phoneInternational: "+919100920304",
  whatsappNumber: "919100920304",
  googleRating: 4.9,
  googleReviewCount: 47,
  openingHours: "10:00 AM – 9:00 PM",
  openingDays: "Monday to Sunday (Open 7 Days)",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Calyxe+Unisex+Salon+Circuit+House+Road+Hanamkonda",
};

export const WALKTHROUGH_SCENES: SceneData[] = [
  {
    id: 1,
    numberStr: "01",
    title: "Outside Calyxé",
    subtitle: "Circuit House Road, Hanamkonda",
    description: "Pause at the entrance of Calyxé. Tinted floor-to-ceiling glass reveals warm architectural glow and an unmistakable standard of luxury.",
    image: "/walkthrough/scene_01_entrance.jpg",
    hotspot: {
      title: "EXTERIOR FAÇADE",
      description: "Dramatic twilight architecture featuring black metal framing and illuminated bronze Calyxé signage.",
      category: "ARRIVAL",
      cta: "Scroll to Enter",
    },
  },
  {
    id: 2,
    numberStr: "02",
    title: "The Entrance Threshold",
    subtitle: "Pushing Through The Glass",
    description: "Heavy brushed-brass handles guide you into a temperature-controlled sanctuary of calm and curated fragrance.",
    image: "/walkthrough/scene_02_doors.jpg",
    hotspot: {
      title: "PIVOT ENTRANCE",
      description: "A seamless transition from the energetic streets of Subedari into refined tranquility.",
      category: "PASSAGE",
      cta: "Step Forward",
    },
  },
  {
    id: 3,
    numberStr: "03",
    title: "Reception & Lounge",
    subtitle: "A Gracious Welcome",
    description: "A fluted Calacatta marble desk and sculptural velvet armchairs invite you to check in, sip infused tea, and consult with our hosts.",
    image: "/walkthrough/scene_03_reception.jpg",
    hotspot: {
      title: "CONCIERGE DESK",
      description: "Personalized consultations, beverage service, and digital reservation check-in.",
      category: "WELCOME",
      cta: "Meet Host",
    },
  },
  {
    id: 4,
    numberStr: "04",
    title: "Main Salon Floor",
    subtitle: "Open Architectural Volume",
    description: "An airy, minimalist floor adorned with arched backlit halo mirrors, microcement flooring, and acoustic warmth.",
    image: "/walkthrough/scene_04_salon_floor.jpg",
    hotspot: {
      title: "ARCHITECTURAL FLOOR",
      description: "Engineered lighting balanced for true color precision and zero eye strain.",
      category: "ATMOSPHERE",
      cta: "Explore Layout",
    },
  },
  {
    id: 5,
    numberStr: "05",
    title: "Hair Styling Stations",
    subtitle: "Precision & Craftsmanship",
    description: "Ergonomic leather styling chairs, bespoke brass fixtures, and master stylists crafting tailored silhouettes.",
    image: "/walkthrough/scene_05_hair_styling.jpg",
    hotspot: {
      title: "HAIR ARTISTRY",
      description: "Custom cuts, texturizing, signature blowouts, and bespoke hair styling for men and women.",
      category: "HAIR",
      cta: "Explore Hair Menu",
    },
  },
  {
    id: 6,
    numberStr: "06",
    title: "Color & Transformation Lab",
    subtitle: "Dimensional Alchemy",
    description: "Dedicated apothecary mixing bar utilizing premium ammonia-free pigments, balayage clays, and bond-building serums.",
    image: "/walkthrough/scene_06_color_lab.jpg",
    hotspot: {
      title: "COLOR STUDIO",
      description: "Custom Balayage, root melts, gloss toning, and transformative color correction.",
      category: "COLOR",
      cta: "View Colors",
    },
  },
  {
    id: 7,
    numberStr: "07",
    title: "Skin & Beauty Sanctuary",
    subtitle: "Clinical Care & Rejuvenation",
    description: "Private acoustic suites designed for high-performance facials, skin resurfacing, and calming holistic therapies.",
    image: "/walkthrough/scene_07_beauty_sanctuary.jpg",
    hotspot: {
      title: "BEAUTY SANCTUARY",
      description: "Advanced hydra-infusions, 24K gold cellular rituals, and bridal glow treatments.",
      category: "SKIN",
      cta: "Explore Facials",
    },
  },
  {
    id: 8,
    numberStr: "08",
    title: "Spa & Hydro-Wash Lounge",
    subtitle: "Sensory Rest & Recovery",
    description: "Dimmed indirect lighting, soothing water acoustics, and fully reclining Japanese shampoo beds for therapeutic head spas.",
    image: "/walkthrough/scene_08_spa_relaxation.jpg",
    hotspot: {
      title: "HEAD SPA RITUAL",
      description: "Deep botanical scalp detox, acupressure neck massage, and deep conditioning steam baths.",
      category: "SPA",
      cta: "Discover Rituals",
    },
  },
  {
    id: 9,
    numberStr: "09",
    title: "Transformation Suite",
    subtitle: "Before, After & Beyond",
    description: "High-definition studio mirrors capture every radiant angle of our signature client makeovers.",
    image: "/walkthrough/scene_09_transformation.jpg",
    hotspot: {
      title: "TRANSFORMATION WALL",
      description: "Inspect authentic client makeovers with our real-time interactive comparison slider.",
      category: "GALLERY",
      cta: "Slide Comparison",
    },
  },
  {
    id: 10,
    numberStr: "10",
    title: "The Calyxé Society",
    subtitle: "4.9★ Google Acclaim",
    description: "Hear from our discerning patrons across Hanamkonda and Warangal who make Calyxé their trusted beauty sanctuary.",
    image: "/walkthrough/scene_10_client_lounge.jpg",
    hotspot: {
      title: "CLIENT RATINGS",
      description: "4.9 Stars over 47 verified Google Reviews praising our craft, hospitality, and hygiene.",
      category: "REVIEWS",
      cta: "Read Stories",
    },
  },
  {
    id: 11,
    numberStr: "11",
    title: "The Booking Desk",
    subtitle: "Your Chair Awaits",
    description: "Arrive at the concierge reservation desk. Select your preferred stylist, time, and service effortlessly.",
    image: "/walkthrough/scene_11_booking_desk.jpg",
    hotspot: {
      title: "RESERVATION DESK",
      description: "Reserve your bespoke appointment online or initiate an instant priority WhatsApp chat.",
      category: "BOOKING",
      cta: "Book Appointment",
    },
  },
  {
    id: 12,
    numberStr: "12",
    title: "The Calyxé Signature",
    subtitle: "Your Look. Your Moment.",
    description: "Experience the pinnacle of unisex beauty in Telangana. Circuit House Road, Hanamkonda.",
    image: "/walkthrough/scene_12_brand_signature.jpg",
    hotspot: {
      title: "CALYXÉ EXPERIENCE",
      description: "Open 7 Days a week from 10:00 AM to 9:00 PM. Call 091009 20304 or visit us.",
      category: "CONNECT",
      cta: "Get Directions",
    },
  },
];

export const SALON_SERVICES: ServiceItem[] = [
  // HAIR
  {
    id: "h1",
    service_name: "Couture Haircut & Architectural Style",
    category: "HAIR",
    description: "Personalized texture analysis, precision haircutting, scalp cleanse, and signature blowout.",
    duration: "45 mins",
    priceFormatted: "Custom Consultation",
    gender: "Unisex",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "h2",
    service_name: "Brazilian Keratin Smooth Infusion",
    category: "HAIR",
    description: "Deep thermal protein restructuring providing glass-like frizz control and 90-day mirror shine.",
    duration: "120 mins",
    priceFormatted: "Consultation Required",
    gender: "Unisex",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "h3",
    service_name: "Signature Volumizing Blowout & Wave",
    category: "HAIR",
    description: "Custom thermal styling with heat-protectant elixir and editorial bounce for evenings and events.",
    duration: "40 mins",
    priceFormatted: "Standard Service",
    gender: "Women",
    featured: false,
    booking_enabled: true,
  },
  {
    id: "h4",
    service_name: "Executive Precision Fade & Beard Sculpt",
    category: "HAIR",
    description: "Razor-sharp scissor and clipper work tailored to facial geometry, finished with conditioning tonic.",
    duration: "45 mins",
    priceFormatted: "Standard Service",
    gender: "Men",
    featured: false,
    booking_enabled: true,
  },

  // SKIN & BEAUTY
  {
    id: "s1",
    service_name: "Hydra-Radiance Molecular Facial",
    category: "SKIN & BEAUTY",
    description: "Multi-step vacuum vortex extraction followed by hyaluronic acid infusion for an immediate luminous glow.",
    duration: "60 mins",
    priceFormatted: "Signature Treatment",
    gender: "Unisex",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "s2",
    service_name: "24K Gold Cellular Anti-Aging Ritual",
    category: "SKIN & BEAUTY",
    description: "Pure colloidal gold sheets paired with peptide ultrasound lifting for deep collagen stimulation.",
    duration: "75 mins",
    priceFormatted: "Premium Ritual",
    gender: "Unisex",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "s3",
    service_name: "Diamond Micro-Dermabrasion Peel",
    category: "SKIN & BEAUTY",
    description: "Gentle crystal-free epidermal resurfacing to minimize pores, sun spots, and uneven texture.",
    duration: "50 mins",
    priceFormatted: "Advanced Skin",
    gender: "Unisex",
    featured: false,
    booking_enabled: true,
  },

  // GROOMING
  {
    id: "g1",
    service_name: "Royal Ottoman Hot Towel Shave",
    category: "GROOMING",
    description: "Double hot towel steam prep, badger-hair lather, straight-razor glide, and chilled calming balm.",
    duration: "35 mins",
    priceFormatted: "Luxury Grooming",
    gender: "Men",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "g2",
    service_name: "Detoxifying Charcoal Scalp & Beard Cleanse",
    category: "GROOMING",
    description: "Pore-clearing activated bamboo charcoal masque paired with beard conditioning oils.",
    duration: "40 mins",
    priceFormatted: "Standard Service",
    gender: "Men",
    featured: false,
    booking_enabled: true,
  },

  // SPA / RELAXATION
  {
    id: "sp1",
    service_name: "Botanical Ayurvedic Japanese Head Spa",
    category: "SPA / RELAXATION",
    description: "Warm herbal oil scalp therapy, water halo cascade, pressure-point neck massage, and deep steam hydration.",
    duration: "60 mins",
    priceFormatted: "Holistic Signature",
    gender: "Unisex",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "sp2",
    service_name: "Moroccan Argan Intensive Hair Masque",
    category: "SPA / RELAXATION",
    description: "Pure cold-pressed argan oil and shea butter infusion restoring elasticity to compromised strands.",
    duration: "45 mins",
    priceFormatted: "Deep Therapy",
    gender: "Unisex",
    featured: false,
    booking_enabled: true,
  },

  // TRANSFORMATIONS
  {
    id: "t1",
    service_name: "Signature Hand-Painted Balayage",
    category: "TRANSFORMATIONS",
    description: "Bespoke sun-kissed French balayage seamlessly blended with customized root shadow and gloss glaze.",
    duration: "180 mins",
    priceFormatted: "Artist Consultation",
    gender: "Unisex",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "t2",
    service_name: "Complete Makeover & Silhouette Redesign",
    category: "TRANSFORMATIONS",
    description: "Comprehensive color correction, precision geometry haircut, and bespoke facial glow treatment.",
    duration: "210 mins",
    priceFormatted: "Full Makeover",
    gender: "Unisex",
    featured: true,
    booking_enabled: true,
  },

  // BRIDAL / OCCASIONS
  {
    id: "b1",
    service_name: "Haute Couture Bridal Artistry",
    category: "BRIDAL / OCCASIONS",
    description: "High-definition airbrush makeup, artisanal hair sculpting, veil setting, and pre-event skin priming.",
    duration: "150 mins",
    priceFormatted: "Bridal Suite",
    gender: "Women",
    featured: true,
    booking_enabled: true,
  },
  {
    id: "b2",
    service_name: "Elite Groom Wedding Radiance Suite",
    category: "BRIDAL / OCCASIONS",
    description: "Skin de-tan treatment, beard contouring, haircut styling, and calming scalp relaxation ritual.",
    duration: "90 mins",
    priceFormatted: "Groom Suite",
    gender: "Men",
    featured: true,
    booking_enabled: true,
  },
];

export const SALON_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    author: "Rajesh Kumar",
    rating: 5,
    date: "Verified Google Review",
    text: "Great experience visiting Calyxé. Top class services and staff. Loved the ambiance and hospitality in Hanamkonda.",
    serviceCategory: "Hair Styling & Care",
    verified: true,
  },
  {
    id: "r2",
    author: "Sneha Reddy",
    rating: 5,
    date: "Verified Google Review",
    text: "Easily the most luxurious salon in Hanamkonda and Warangal. The stylists know their craft inside out and take real time to consult.",
    serviceCategory: "Hair Color & Balayage",
    verified: true,
  },
  {
    id: "r3",
    author: "Vikram Rao",
    rating: 5,
    date: "Verified Google Review",
    text: "The vibe, the hygiene, and the attention to detail are on another level. Walking in feels like a five-star hotel lounge.",
    serviceCategory: "Executive Grooming",
    verified: true,
  },
  {
    id: "r4",
    author: "Ananya Mohan",
    rating: 5,
    date: "Verified Google Review",
    text: "Clean, professional, and world-class treatments. Their head spa and skin treatments left my face glowing for days.",
    serviceCategory: "Hydra Facial & Spa",
    verified: true,
  },
];

export const TRANSFORMATION_ITEMS: TransformationItem[] = [
  {
    id: "tf1",
    title: "Caramel Sunlit Balayage",
    category: "HAIR",
    description: "Seamless hand-painted tones lifting dull monochrome lengths into multidimensional honey caramel movement.",
    beforeImage: "/gallery/transform_color_before.jpg",
    afterImage: "/gallery/transform_color_after.jpg",
    timeTaken: "3.5 Hours",
  },
  {
    id: "tf2",
    title: "Couture Butterfly Layer Cut",
    category: "MAKEOVER",
    description: "Weightless weight redistribution creating soft framing around cheekbones with high-gloss thermal polish.",
    beforeImage: "/gallery/transform_hair_before.jpg",
    afterImage: "/gallery/transform_hair_after.jpg",
    timeTaken: "60 Mins",
  },
  {
    id: "tf3",
    title: "Executive Precision Fade & Beard Sculpt",
    category: "GROOMING",
    description: "Clean skin-tapered fade harmonized with laser-sharp cheek lines and natural conditioning nourishment.",
    beforeImage: "/gallery/transform_groom_before.jpg",
    afterImage: "/gallery/transform_groom_after.jpg",
    timeTaken: "45 Mins",
  },
];

export function generateWhatsAppBookingMessage(data: {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  stylist?: string;
  notes?: string;
}): string {
  const lines = [
    "Hello Calyxé 👋",
    "",
    "I would like to book an appointment at Calyxé Unisex Salon, Hanamkonda.",
    "",
    `👤 Name: ${data.name || "Guest"}`,
    `📞 Mobile: ${data.phone || "Not provided"}`,
    `✨ Service: ${data.service || "General Consultation"}`,
    `📅 Preferred Date: ${data.preferredDate || "Earliest available"}`,
    `⏰ Preferred Time: ${data.preferredTime || "Flexible"}`,
  ];

  if (data.stylist && data.stylist !== "Any Stylist") {
    lines.push(`✂️ Stylist Preference: ${data.stylist}`);
  }

  if (data.notes && data.notes.trim()) {
    lines.push(`📝 Notes: ${data.notes.trim()}`);
  }

  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}
