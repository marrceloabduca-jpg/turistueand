"use client"

import { Phone, Instagram, Facebook, Clock, MapPin } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-foreground text-background py-2 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left side - Contact info */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <a
              href="https://wa.me/91140825947"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+54 9 11 4082-5947</span>
            </a>
            <span className="hidden sm:inline text-background/30">|</span>
            <a
              href="https://www.instagram.com/turismeandoxargentina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>@turismeandoxargentina</span>
            </a>
            <span className="hidden sm:inline text-background/30">|</span>
            <a
              href="https://www.facebook.com/turismeando"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Facebook className="h-3.5 w-3.5" />
              <span>turismeando</span>
            </a>
          </div>

          {/* Right side - Hours & Location */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <div className="flex items-center gap-1.5 text-background/70">
              <Clock className="h-3.5 w-3.5" />
              <span>Lun-Vier: 9-19 hs | Sáb: 9-16 hs</span>
            </div>
            <span className="hidden sm:inline text-background/30">|</span>
            <div className="flex items-center gap-1.5 text-background/70">
              <MapPin className="h-3.5 w-3.5" />
              <span>Argentina</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
