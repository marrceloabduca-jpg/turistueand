"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Heart, 
  Star,
  Award, 
  MapPin, 
  Clock, 
  Headphones,
  MessageCircle,
  Instagram
} from "lucide-react"

const stats = [
  { value: "+15", label: "Años de experiencia" },
  { value: "+2,000", label: "Viajeros felices" },
  { value: "+10", label: "Destinos" },
  { value: "100%", label: "Dedicación" },
]

const values = [
  {
    icon: Shield,
    title: "Seguridad",
    description: "Incluimos un seguro básico al viajero de primera instancia."
  },
  {
    icon: Heart,
    title: "Pasión",
    description: "Amamos lo que hacemos. Cada viaje lo organizamos con el mismo entusiasmo del primero."
  },
  {
    icon: Star,
    title: "Confort",
    description: "Contamos con los mejores prestadores de servicio para que tu viaje sea placentero."
  },
  {
    icon: Headphones,
    title: "Atención 24/7",
    description: "Estamos disponibles antes, durante y después de tu viaje para lo que necesites."
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/mendoza.jpg"
                alt="Equipo Turismeando"
                width={600}
                height={500}
                className="object-cover w-full h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Photoroom%20%281%29-r08pEFoYldsBYyCxb46ze3Gjnp15Qc.png"
                      alt="Turismeando Logo"
                      width={60}
                      height={60}
                    />
                    <div>
                      <p className="font-bold text-foreground text-lg">Turismeando</p>
                      <p className="text-muted-foreground text-sm">Viajes y Turismo - Argentina</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <Award className="h-10 w-10" />
                <div>
                  <p className="text-3xl font-bold">+15</p>
                  <p className="text-sm opacity-90">Años de experiencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 mb-6">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Sobre Nosotros</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Más que una agencia,
              <br />
              <span className="text-primary">somos viajeros</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              En <strong className="text-foreground">Turismeando</strong> nacimos de la pasión por descubrir 
              Argentina. Somos un equipo de viajeros que conocemos cada rincón del país y queremos 
              compartir esas experiencias con vos.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Contamos con un equipo especializado con más de 15 años de experiencia haciendo viajes 
              grupales e individuales, siempre con la misma filosofía: que cada viaje sea una experiencia 
              inolvidable. Es por eso que nos ocupamos de todo para que vos solo te preocupes por disfrutar.
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {values.map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                <a
                  href="https://wa.me/91140825947?text=Hola!%20Quiero%20conocer%20más%20sobre%20Turismeando."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contactanos
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                <a
                  href="https://www.instagram.com/turismeandoxargentina"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Seguinos en Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
