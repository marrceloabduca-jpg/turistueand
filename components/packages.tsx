"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CalendarDays,
  MessageCircle,
  MapPin,
  Clock,
  Users,
  Check,
  ChevronRight,
} from "lucide-react"
import type { Package, Category } from "@/lib/types"
import { PREDEFINED_TAGS } from "@/lib/types"

interface PackagesProps {
  packages: Package[]
  categories: Category[]
}

interface GroupInfo {
  label: string
  value: string
  packages: Package[]
  image: string | null
}

type ViewState = "entry" | "groups" | "packages"

function PackageCard({ pkg }: { pkg: Package }) {
  const [showAllIncludes, setShowAllIncludes] = useState(false)
  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa el paquete "${pkg.name}" a ${pkg.destination}. Quisiera más información sobre fechas y precios.`
  )
  const whatsappUrl = `https://wa.me/91140825947?text=${whatsappMessage}`

  const formatPrice = (price: number | null) => {
    if (!price) return null
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-card">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={pkg.image_url || "/placeholder.svg?height=300&width=400"}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          {pkg.is_featured && (
            <Badge className="bg-primary text-primary-foreground border-0">
              Destacado
            </Badge>
          )}
        </div>

        {pkg.price && (
          <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
            {pkg.original_price && pkg.original_price > 0 && pkg.original_price > pkg.price && (
              <>
                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  -{Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)}% OFF
                </span>
                <span className="text-sm text-white font-semibold line-through decoration-red-400 decoration-2">
                  {formatPrice(pkg.original_price)}
                </span>
              </>
            )}
            <span className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-foreground">
              {formatPrice(pkg.price)}
            </span>
            {pkg.admin_fee && pkg.admin_fee > 0 && (
              <span className="bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs text-muted-foreground">
                +{formatPrice(pkg.admin_fee)} gastos adm.
              </span>
            )}
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1 text-background">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{pkg.destination}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {pkg.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {pkg.short_description || pkg.description}
        </p>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {pkg.duration}
          </div>
          {pkg.group_size && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {pkg.group_size}
            </div>
          )}
        </div>

        {pkg.includes && pkg.includes.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Incluye:</p>
            <div className="flex flex-wrap gap-2">
              {(showAllIncludes ? pkg.includes : pkg.includes.slice(0, 3)).map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                >
                  <Check className="h-3 w-3 text-secondary" />
                  {item}
                </span>
              ))}
              {pkg.includes.length > 3 && (
                <button
                  onClick={() => setShowAllIncludes(!showAllIncludes)}
                  className="text-xs text-primary font-medium hover:underline cursor-pointer"
                >
                  {showAllIncludes ? "Ver menos" : `+${pkg.includes.length - 3} más`}
                </button>
              )}
            </div>
          </div>
        )}

        {pkg.highlights && pkg.highlights.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.slice(0, 4).map((highlight, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-secondary/30 text-secondary"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {pkg.tags && pkg.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pkg.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4 mr-2" />
            Consultar Disponibilidad
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Packages({ packages }: PackagesProps) {
  // `categories` is accepted via PackagesProps for API compatibility but not used in this UI
  const [view, setView] = useState<ViewState>("entry")
  const [selectedGroup, setSelectedGroup] = useState<GroupInfo | null>(null)

  function handleGroupClick(group: GroupInfo) {
    setSelectedGroup(group)
    setView("packages")
  }

  // Build tag-based groups ordered by PREDEFINED_TAGS
  const tagGroups: GroupInfo[] = PREDEFINED_TAGS
    .map((tag) => ({
      label: tag,
      value: tag,
      packages: packages.filter((pkg) => pkg.tags?.includes(tag)),
      image: packages.find((pkg) => pkg.tags?.includes(tag))?.image_url ?? null,
    }))
    .filter((g) => g.packages.length > 0)

  // Packages without any predefined tag go into a fallback group
  const taggedIds = new Set(tagGroups.flatMap((g) => g.packages.map((p) => p.id)))
  const untagged = packages.filter((p) => !taggedIds.has(p.id))
  const groups: GroupInfo[] = [
    ...tagGroups,
    ...(untagged.length > 0
      ? [{ label: "Otros paquetes", value: "__untagged__", packages: untagged, image: untagged[0]?.image_url ?? null }]
      : []),
  ]

  // Use the first available package image as the entry card background
  const entryImage = packages[0]?.image_url || "/images/bariloche.jpg"

  // ── Entry view: single "Paquetes" card ──────────────────────────────────────
  if (view === "entry") {
    return (
      <section id="paquetes" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <button
              className="group w-full max-w-2xl relative rounded-3xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
              onClick={() => setView("groups")}
              aria-label="Ver paquetes de viaje"
            >
              <div className="relative h-80 md:h-96">
                <Image
                  src={entryImage}
                  alt="Paquetes de viaje"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Paquetes</h2>
                  <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
                    Explorá nuestras opciones de viaje por Argentina
                  </p>
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/30 transition-colors">
                    Ver opciones <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ── Groups view: cards per month / festivity ────────────────────────────────
  if (view === "groups") {
    return (
      <section id="paquetes" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView("entry")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Nuestros Paquetes</h2>
              <p className="text-muted-foreground text-sm">Seleccioná una fecha o temporada</p>
            </div>
          </div>

          {groups.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">
                Estamos preparando increíbles paquetes para vos. Pronto tendremos disponibles las mejores experiencias de viaje por Argentina.
              </p>
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90">
                <a
                  href="https://wa.me/91140825947?text=Hola!%20Quiero%20consultar%20por%20paquetes%20de%20viaje."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Consultá por un Paquete
                </a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groups.map((group) => (
                <button
                  key={group.value}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary text-left"
                  onClick={() => handleGroupClick(group)}
                  aria-label={`Ver paquetes de ${group.label}`}
                >
                  <div className="relative h-44">
                    <Image
                      src={group.image || "/placeholder.svg?height=200&width=300"}
                      alt={group.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CalendarDays className="h-3.5 w-3.5 text-white/70" />
                        <span className="text-xs text-white/70">
                          {group.packages.length} paquete{group.packages.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <h3 className="font-bold text-base leading-tight">{group.label}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ── Packages view: filtered cards for the selected group ────────────────────
  return (
    <section id="paquetes" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView("groups")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{selectedGroup?.label}</h2>
            <p className="text-muted-foreground text-sm">
              {selectedGroup?.packages.length} paquete{(selectedGroup?.packages.length ?? 0) > 1 ? "s" : ""} disponible{(selectedGroup?.packages.length ?? 0) > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedGroup?.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            ¿No encontraste lo que buscás?
          </h3>
          <p className="text-muted-foreground text-lg mb-2">
            Armamos paquetes a medida para grupos.
          </p>
          <p className="text-muted-foreground mb-2">
            Salidas Full day · Salidas con estadías · Viajes educativos
          </p>
          <p className="text-foreground font-medium mb-8">
            Donde vos quieras ir, nosotros tenemos la mejor opción.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <a
              href="https://wa.me/91140825947?text=Hola!%20Quiero%20consultar%20por%20un%20paquete%20personalizado."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Consultá por un Paquete Personalizado
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
