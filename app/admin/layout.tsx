import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Turismeando",
  description: "Panel de administración de Turismeando",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
