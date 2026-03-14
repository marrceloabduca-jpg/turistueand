"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/upload"

interface ImageDropzoneProps {
  value: string
  onChange: (url: string) => void
}

export function ImageDropzone({ value, onChange }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null)
      setIsUploading(true)

      try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Error al subir la imagen")
        }

        onChange(data.url)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al subir la imagen"
        setError(message)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange]
  )

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return

      const file = files[0]

      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setError("Tipo de archivo no permitido. Usá JPG, PNG, WebP o GIF.")
        return
      }

      if (file.size > MAX_IMAGE_SIZE) {
        setError("El archivo es demasiado grande. Máximo 5MB.")
        return
      }

      uploadFile(file)
    },
    [uploadFile]
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect]
  )

  const handleRemove = useCallback(() => {
    onChange("")
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [onChange])

  if (value) {
    return (
      <div className="space-y-2">
        <div className="relative rounded-lg overflow-hidden border bg-muted">
          <div className="relative aspect-video w-full">
            <Image
              src={value}
              alt="Imagen del paquete"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground truncate">{value}</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6
          cursor-pointer transition-colors
          ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
          }
          ${isUploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">Subiendo imagen...</p>
          </>
        ) : (
          <>
            {isDragging ? (
              <Upload className="h-8 w-8 text-primary mb-2" />
            ) : (
              <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
            )}
            <p className="text-sm font-medium text-foreground">
              {isDragging
                ? "Soltá la imagen acá"
                : "Arrastrá una imagen o hacé clic"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, WebP o GIF (máx. 5MB)
            </p>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
