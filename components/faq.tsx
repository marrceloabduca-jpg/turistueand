"use client"

import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MessageCircle, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "¿Qué incluyen los paquetes de viaje?",
    answer: "Nuestros paquetes generalmente incluyen transporte ida y vuelta, alojamiento, desayuno o pensión según el destino, excursiones programadas y un coordinador de viaje. El detalle específico de cada paquete lo podés ver en la descripción o consultarnos directamente por WhatsApp."
  },
  {
    question: "¿Cómo puedo reservar un viaje?",
    answer: "El proceso es muy simple: contactanos por WhatsApp, te asesoramos sobre el destino y fechas disponibles, y una vez que confirmás, realizás una seña para reservar tu lugar. El saldo lo podés abonar en cuotas hasta la fecha del viaje."
  },
  {
    question: "¿Cuántas personas viajan en cada grupo?",
    answer: "Se conforman grupos de hasta 55 pasajeros por bus, que luego del viaje termina siendo un grupo de amigos de 55 personas."
  },
  {
    question: "¿Puedo viajar solo/a?",
    answer: "¡Por supuesto! Muchos de nuestros viajeros vienen solos y es una excelente oportunidad para conocer gente nueva. Si preferís habitación individual, consultanos por el costo adicional."
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos efectivo, transferencia bancaria, y tarjetas de débito/crédito. También ofrecemos planes de pago en cuotas sin interés para que puedas organizar tu viaje con anticipación."
  },
  {
    question: "¿Qué pasa si necesito cancelar mi viaje?",
    answer: "Entendemos que pueden surgir imprevistos. Tenemos una política de cancelación flexible: hasta 30 días antes del viaje podés cancelar con devolución completa menos gastos administrativos. Consultanos para más detalles según cada caso."
  },
  {
    question: "¿Los viajes incluyen seguro?",
    answer: "Sí, todos nuestros viajes incluyen un seguro de viajero básico de primera instancia que cubre asistencia médica y accidentes. Si querés una cobertura más amplia, podemos asesorarte sobre opciones adicionales."
  },
  {
    question: "¿Desde qué ciudades salen los viajes?",
    answer: "Los puntos de salida son Zona Sur, Zona Norte y Zona Oeste. El punto exacto puede variar según los grupos. Consultanos para confirmar el punto de encuentro más cercano a vos."
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header + CTA */}
          <div className="lg:sticky lg:top-24">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <HelpCircle className="h-3 w-3 mr-1" />
              Preguntas Frecuentes
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              ¿Tenés <span className="text-primary">dudas</span>?
              <br />
              Te ayudamos
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Acá encontrás las respuestas a las preguntas más comunes. 
              Si no encontrás lo que buscás, escribinos por WhatsApp y te respondemos al instante.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            >
              <a
                href="https://wa.me/91140825947?text=Hola!%20Tengo%20una%20consulta%20sobre%20los%20viajes."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Hacé tu consulta
              </a>
            </Button>
          </div>

          {/* Right: Accordion */}
          <div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background border border-border rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow"
                >
                  <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
