"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Bus, 
  Home, 
  Utensils, 
  Shield,
  MessageCircle,
  Check,
  UserCheck
} from "lucide-react"
import type { Package, Category } from "@/lib/types"

interface PackagesProps {
  packages: Package[]
  categories: Category[]
}

function PackageCard({ pkg }: { pkg: Package }) {
  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa el paquete "${pkg.name}" a ${pkg.destination}. Quisiera más información sobre fechas y precios.`
  )
  const whatsappUrl = `https://wa.me/91140825947?text=${whatsappMessage}`

  // Format price
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
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={pkg.image_url || "/placeholder.svg?height=300&width=400"}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {pkg.is_featured && (
            <Badge className="bg-primary text-primary-foreground border-0">
              Destacado
            </Badge>
          )}
        </div>

        {/* Price */}
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

        {/* Location */}
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

        {/* Meta Info */}
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

        {/* Includes */}
        {pkg.includes && pkg.includes.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Incluye:</p>
            <div className="flex flex-wrap gap-2">
              {pkg.includes.slice(0, 3).map((item, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                >
                  <Check className="h-3 w-3 text-secondary" />
                  {item}
                </span>
              ))}
              {pkg.includes.length > 3 && (
                <span className="text-xs text-primary font-medium">
                  +{pkg.includes.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Highlights */}
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

        {/* Tags */}
        {pkg.tags && pkg.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pkg.tags.map((tag, index) => (
              <span
                key={index}
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

export function Packages({ packages, categories }: PackagesProps) {
  // Build categories list with "todos" as first option
  const allCategories = [
    { value: "todos", label: "Todos" },
    ...categories.map(cat => ({ value: cat.slug, label: cat.name }))
  ]

  // If no packages from DB, show empty state
  if (packages.length === 0) {
    return (
      <section id="paquetes" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Nuestros Paquetes
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Destinos que te van a <span className="text-primary">enamorar</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Estamos preparando increíbles paquetes para vos. Pronto tendremos disponibles 
              las mejores experiencias de viaje por Argentina.
            </p>
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
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
        </div>
      </section>
    )
  }

  return (
    <section id="paquetes" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Nuestros Paquetes
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Destinos que te van a <span className="text-primary">enamorar</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Elegí entre nuestros paquetes diseñados para que disfrutes al máximo. 
            Todos incluyen transporte, alojamiento, regímenes de comida, coordinadores permanentes y seguro básico de primera instancia.
          </p>
        </div>

        {/* Package Features */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { icon: Bus, label: "Transporte Incluido", desc: "Viajás cómodo" },
            { icon: Home, label: "Alojamiento", desc: "Hoteles seleccionados" },
            { icon: Utensils, label: "Régimen de Comida", desc: "Incluido en el paquete" },
            { icon: UserCheck, label: "Coordinadores", desc: "Permanentes en el viaje" },
            { icon: Shield, label: "Seguro Básico", desc: "Primera instancia" },
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground text-sm">{feature.label}</p>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="todos" className="w-full">
          {allCategories.length > 1 && (
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-12">
              {allCategories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 border border-border"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          <TabsContent value="todos" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </TabsContent>

          {allCategories.slice(1).map((category) => (
            <TabsContent key={category.value} value={category.value} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages
                  .filter((pkg) => pkg.category === category.value)
                  .map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA */}
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
