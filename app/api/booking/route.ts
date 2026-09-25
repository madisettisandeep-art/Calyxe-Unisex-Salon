import { NextResponse } from "next/server";

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
      name,
      phone,
      service,
      preferredDate: preferredDate || new Date().toISOString().split("T")[0],
      preferredTime: preferredTime || "Flexible",
      stylist: stylist || "Any Available Master Stylist",
      notes: notes || "",
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Appointment request registered with Calyxé Concierge.",
      booking: bookingRecord,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process booking." },
      { status: 500 }
    );
  }
}
