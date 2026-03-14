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

    const { error } = await supabase
      .from("packages")
      .insert(body)

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
