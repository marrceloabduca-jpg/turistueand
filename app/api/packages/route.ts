import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()

    // Only include valid database columns to prevent unknown fields
    // from rejecting the entire insert
    const VALID_COLUMNS = [
      "name", "slug", "description", "short_description",
      "destination", "category", "duration", "group_size",
      "price", "original_price", "admin_fee",
      "image_url", "gallery",
      "includes", "highlights", "itinerary",
      "is_featured", "is_active", "departure_dates",
    ]

    const insertData: Record<string, unknown> = {}
    for (const key of VALID_COLUMNS) {
      if (key in body) {
        insertData[key] = body[key]
      }
    }

    const { error } = await supabase
      .from("packages")
      .insert(insertData)

    if (error) {
      console.error("Error creating package:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing package creation:", error)
    return NextResponse.json(
      { error: "Error al crear el paquete" },
      { status: 500 }
    )
  }
}
