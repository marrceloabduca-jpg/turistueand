"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Instagram,
  Facebook,
  Clock,
  ArrowRight,
  Mail,
} from "lucide-react"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export function Contact() {
  const whatsappUrl = "https://wa.me/5491140825947?text=Hola!%20Me%20interesa%20consultar%20por%20paquetes%20de%20viaje."

  return (
    <section id="contacto" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Contacto
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Empezá a planear tu <span className="text-primary">próximo viaje</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Estamos para ayudarte a encontrar el destino perfecto. 
            Contactanos y te asesoramos sin compromiso sobre fechas, precios y disponibilidad.
          </p>

          {/* WhatsApp CTA Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-12"
          >
            <Button 
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full px-8 py-7 text-lg shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-transform"
            >
              <WhatsAppIcon className="h-6 w-6 mr-3" />
              Escribinos por WhatsApp
            </Button>
          </a>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-muted/50 rounded-2xl hover:bg-muted transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center">
                <WhatsAppIcon className="h-7 w-7 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">WhatsApp</p>
                <p className="text-muted-foreground text-sm">+54 9 11 4082-5947</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/turismeandoxargentina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-muted/50 rounded-2xl hover:bg-muted transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                <Instagram className="h-7 w-7 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Instagram</p>
                <p className="text-muted-foreground text-sm">@turismeandoxargentina</p>
              </div>
            </a>

            <a
              href="https://www.facebook.com/turismeando"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-muted/50 rounded-2xl hover:bg-muted transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#1877F2] flex items-center justify-center">
                <Facebook className="h-7 w-7 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Facebook</p>
                <p className="text-muted-foreground text-sm">turismeando</p>
              </div>
            </a>

            <a
              href="mailto:Turismeandoxargentina@gmail.com"
              className="flex flex-col items-center gap-3 p-6 bg-muted/50 rounded-2xl hover:bg-muted transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-muted-foreground text-sm break-all">Turismeandoxargentina@gmail.com</p>
              </div>
            </a>

            <div className="flex flex-col items-center gap-3 p-6 bg-muted/50 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Clock className="h-7 w-7 text-secondary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Horario</p>
                <p className="text-muted-foreground text-sm">Lun-Vier: 9 a 19 hs</p>
                <p className="text-muted-foreground text-sm">Sáb: 9 a 16 hs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
