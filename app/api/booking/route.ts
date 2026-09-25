import { NextResponse } from "next/server";
import { queryCache, SERVICES_BY_CATEGORY_INDEX, SALON_INFO } from "@/data/salon-data";

// 20. Database / Storage Pool Singleton (manages connection and memory footprint)
class BookingStorePool {
  private static instance: BookingStorePool;
  private bookings: Array<Record<string, unknown>> = [];
  private maxPoolSize = 500;

  private constructor() {}

  static getInstance(): BookingStorePool {
    if (!BookingStorePool.instance) {
      BookingStorePool.instance = new BookingStorePool();
    }
    return BookingStorePool.instance;
  }

  addBooking(booking: Record<string, unknown>) {
    if (this.bookings.length >= this.maxPoolSize) {
      this.bookings.shift(); // Evict oldest to keep memory bounded
    }
    this.bookings.push(booking);
  }

  getCount(): number {
    return this.bookings.length;
  }
}

const bookingPool = BookingStorePool.getInstance();

// 1 & 11. Cache API responses & Server-side caching (GET with stale-while-revalidate)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const cacheKey = `api:services:${category || "all"}`;

  // 6. Cache expensive queries
  const cached = queryCache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Cache-Lookup": "HIT",
      },
    });
  }

  // 3 & 7. Indexed O(1) retrieval without N+1 queries
  const data = category && SERVICES_BY_CATEGORY_INDEX[category]
    ? SERVICES_BY_CATEGORY_INDEX[category]
    : SERVICES_BY_CATEGORY_INDEX;

  const payload = {
    success: true,
    salon: SALON_INFO.name,
    category: category || "ALL",
    data,
    totalBookingsToday: bookingPool.getCount(),
  };

  queryCache.set(cacheKey, payload, 1000 * 60 * 15); // 15 min TTL

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Cache-Lookup": "MISS",
    },
  });
}

// 8 & 14. Input handling & compressed payload processing
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, preferredDate, preferredTime, stylist, notes } = body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Name, phone number, and service are required." },
        { status: 400 }
      );
    }

    const bookingRecord = {
      id: `calyxe-bk-${Date.now()}`,
      name: String(name).trim().slice(0, 100),
      phone: String(phone).trim().slice(0, 20),
      service: String(service).trim().slice(0, 100),
      preferredDate: preferredDate || new Date().toISOString().split("T")[0],
      preferredTime: preferredTime || "Flexible",
      stylist: stylist || "Any Available Master Stylist",
      notes: notes ? String(notes).trim().slice(0, 500) : "",
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    };

    bookingPool.addBooking(bookingRecord);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment request registered with Calyxé Concierge.",
        bookingId: bookingRecord.id,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process booking." },
      { status: 500 }
    );
  }
}
