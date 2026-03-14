"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Package } from "@/lib/types"
import { FALLBACK_CATEGORIES, PREDEFINED_TAGS } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { ImageDropzone } from "@/components/admin/image-dropzone"

interface PackageFormProps {
  initialData?: Package
}

export function PackageForm({ initialData }: PackageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    short_description: initialData?.short_description || "",
    destination: initialData?.destination || "",
    category: initialData?.category || "aventura",
    duration: initialData?.duration || "",
    group_size: initialData?.group_size || "",
    price: initialData?.price?.toString() || "",
    original_price: initialData?.original_price?.toString() || "",
    admin_fee: initialData?.admin_fee?.toString() || "",
    image_url: initialData?.image_url || "",
    includes: initialData?.includes || [],
    highlights: initialData?.highlights || [],
    departure_dates: initialData?.departure_dates || [],
    tags: initialData?.tags || [],
    is_featured: initialData?.is_featured || false,
    is_active: initialData?.is_active ?? true,
  })

  const [newInclude, setNewInclude] = useState("")
  const [newHighlight, setNewHighlight] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newTag, setNewTag] = useState("")

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const addItem = (
    field: "includes" | "highlights" | "departure_dates" | "tags",
    value: string,
    setValue: (v: string) => void
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
      setValue("")
    }
  }

  const removeItem = (
    field: "includes" | "highlights" | "departure_dates" | "tags",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const packageData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        short_description: formData.short_description || null,
        destination: formData.destination,
        category: formData.category,
        duration: formData.duration,
        group_size: formData.group_size || null,
        price: formData.price ? parseFloat(formData.price) : null,
        original_price: formData.original_price
          ? parseFloat(formData.original_price)
          : null,
        admin_fee: formData.admin_fee ? parseFloat(formData.admin_fee) : null,
        image_url: formData.image_url || null,
        includes: formData.includes,
        highlights: formData.highlights,
        departure_dates: formData.departure_dates,
        tags: formData.tags,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
      }

      const url = initialData
        ? `/api/packages/${initialData.id}`
        : "/api/packages"
      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al guardar el paquete")
      }

      router.push("/admin/packages")
      router.refresh()
    } catch (err) {
      console.error("Error saving package:", err)
      const message =
        err instanceof Error
          ? err.message
          : "Error al guardar el paquete. Intentá de nuevo."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link href="/admin/packages">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {initialData ? "Editar Paquete" : "Nuevo Paquete"}
            </h1>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {initialData
                ? "Modificá la información del paquete"
                : "Completá la información del nuevo paquete"}
            </p>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Nombre del Paquete</FieldLabel>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ej: Sierras de Tandil"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="slug">URL Slug</FieldLabel>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="bariloche-aventura"
                    required
                  />
                  <FieldDescription>
                    URL: /paquetes/{formData.slug || "slug"}
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="short_description">
                    Descripción Corta
                  </FieldLabel>
                  <Input
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        short_description: e.target.value,
                      }))
                    }
                    placeholder="Una línea que describe el paquete"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">
                    Descripción Completa
                  </FieldLabel>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Descripción detallada del paquete..."
                    rows={5}
                    required
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del Viaje</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="destination">Destino</FieldLabel>
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, destination: e.target.value }))
                      }
                      placeholder="Ej: Bariloche, Iguazú, Cancún..."
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="category">Categoría</FieldLabel>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {FALLBACK_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="duration">Duración</FieldLabel>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, duration: e.target.value }))
                      }
                      placeholder="Ej: Full day | 5 días / 4 noches"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="group_size">Tamaño del Grupo</FieldLabel>
                    <Input
                      id="group_size"
                      value={formData.group_size}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, group_size: e.target.value }))
                      }
                      placeholder="Ej: Hasta 15 personas"
                    />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Qué incluye?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newInclude}
                    onChange={(e) => setNewInclude(e.target.value)}
                    placeholder="Ej: Transporte en bus ida y vuelta"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addItem("includes", newInclude, setNewInclude)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem("includes", newInclude, setNewInclude)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.includes.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeItem("includes", index)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Destacados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Ej: Lagos cristalinos"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addItem("highlights", newHighlight, setNewHighlight)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addItem("highlights", newHighlight, setNewHighlight)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.highlights.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeItem("highlights", index)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Activo</p>
                  <p className="text-sm text-muted-foreground">
                    Visible en el sitio
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, is_active: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Destacado</p>
                  <p className="text-sm text-muted-foreground">
                    Mostrar en home
                  </p>
                </div>
                <Switch
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, is_featured: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precios</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="price">Precio Actual ($)</FieldLabel>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: e.target.value }))
                    }
                    placeholder="189000"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="original_price">
                    Precio Original ($)
                  </FieldLabel>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        original_price: e.target.value,
                      }))
                    }
                    placeholder="220000"
                  />
                  <FieldDescription>
                    Se mostrará tachado si es mayor al precio actual
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="admin_fee">
                    Gastos de Administración ($)
                  </FieldLabel>
                  <Input
                    id="admin_fee"
                    type="number"
                    value={formData.admin_fee}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, admin_fee: e.target.value }))
                    }
                    placeholder="10000"
                  />
                  <FieldDescription>
                    Ej: +$10.000 de gastos adm. (se suma al precio base)
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imagen</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageDropzone
                value={formData.image_url}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, image_url: url }))
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fechas de Salida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="Ej: 22 de Marzo 2026"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addItem("departure_dates", newDate, setNewDate)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      addItem("departure_dates", newDate, setNewDate)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.departure_dates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                    >
                      <span className="text-sm">{date}</span>
                      <button
                        type="button"
                        onClick={() => removeItem("departure_dates", index)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Etiquetas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_TAGS.map((tag) => {
                    const isSelected = formData.tags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            tags: isSelected
                              ? prev.tags.filter((t) => t !== tag)
                              : [...prev.tags, tag],
                          }))
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Etiqueta personalizada..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addItem("tags", newTag, setNewTag)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem("tags", newTag, setNewTag)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags
                    .filter((tag) => !PREDEFINED_TAGS.includes(tag))
                    .map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              tags: prev.tags.filter((t) => t !== tag),
                            }))
                          }
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
