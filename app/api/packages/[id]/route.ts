import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { PACKAGE_DB_COLUMNS } from "@/lib/types"

async function handleUpdate(
  request: Request,
  params: Promise<{ id: string }>
) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await request.json()

  // Only include valid database columns to prevent unknown fields
  // from rejecting the entire update
  const updateData: Record<string, unknown> = {}
  for (const key of PACKAGE_DB_COLUMNS) {
    if (key in body) {
      updateData[key] = body[key]
    }
  }

  const { error } = await supabase
    .from("packages")
    .update(updateData)
    .eq("id", id)

  if (error) {
    console.error("Error updating package:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    return await handleUpdate(request, params)
  } catch (error) {
    console.error("Error processing package update:", error)
    return NextResponse.json(
      { error: "Error al actualizar el paquete" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    return await handleUpdate(request, params)
  } catch (error) {
    console.error("Error processing package update:", error)
    return NextResponse.json(
      { error: "Error al actualizar el paquete" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting package:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing package deletion:", error)
    return NextResponse.json(
      { error: "Error al eliminar el paquete" },
      { status: 500 }
    )
  }
}
