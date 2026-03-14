import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, package_id, message } = body

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from("inquiries").insert([
      {
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        package_id: package_id || null,
        message: message?.trim() || null,
        status: "pending",
      },
    ])

    if (error) {
      console.error("[v0] Error creating inquiry:", error)
      return NextResponse.json(
        { error: "Error al guardar la consulta" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing inquiry:", error)
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    )
  }
}
