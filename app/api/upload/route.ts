import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE, MIME_TO_EXTENSION } from "@/lib/upload"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó archivo" },
        { status: 400 }
      )
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Usá JPG, PNG, WebP o GIF." },
        { status: 400 }
      )
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 15MB." },
        { status: 400 }
      )
    }

    const ext = MIME_TO_EXTENSION[file.type] || "jpg"
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { data, error } = await supabase.storage
      .from("package-images")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("Error uploading to storage:", error)
      return NextResponse.json(
        { error: "Error al subir la imagen. Verificá que el bucket 'package-images' exista en Supabase Storage." },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("package-images").getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Error processing upload:", error)
    return NextResponse.json(
      { error: "Error al procesar la subida" },
      { status: 500 }
    )
  }
}
