"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Package } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Star,
  StarOff,
  Search,
  MapPin,
} from "lucide-react"

interface PackagesTableProps {
  packages: Package[]
}

export function PackagesTable({ packages: initialPackages }: PackagesTableProps) {
  const [packages, setPackages] = useState(initialPackages)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleFeatured = async (pkg: Package) => {
    setError(null)
    const response = await fetch(`/api/packages/${pkg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_featured: !pkg.is_featured }),
    })

    if (response.ok) {
      setPackages(
        packages.map((p) =>
          p.id === pkg.id ? { ...p, is_featured: !p.is_featured } : p
        )
      )
    } else {
      setError("Error al actualizar el paquete.")
    }
  }

  const handleToggleActive = async (pkg: Package) => {
    setError(null)
    const response = await fetch(`/api/packages/${pkg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !pkg.is_active }),
    })

    if (response.ok) {
      setPackages(
        packages.map((p) =>
          p.id === pkg.id ? { ...p, is_active: !p.is_active } : p
        )
      )
    } else {
      setError("Error al actualizar el paquete.")
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setError(null)
    setIsDeleting(true)
    const response = await fetch(`/api/packages/${deleteId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setPackages(packages.filter((p) => p.id !== deleteId))
    } else {
      setError("Error al eliminar el paquete.")
    }

    setIsDeleting(false)
    setDeleteId(null)
    router.refresh()
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paquetes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredPackages.length} paquete(s)
            </p>
          </div>

          {/* Mobile card layout */}
          <div className="md:hidden space-y-3">
            {filteredPackages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No se encontraron paquetes
              </p>
            ) : (
              filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-lg border bg-card p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {pkg.image_url ? (
                        <Image
                          src={pkg.image_url}
                          alt={pkg.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground line-clamp-1">
                        {pkg.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pkg.destination}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/paquetes/${pkg.slug}`} target="_blank">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver en sitio
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/packages/${pkg.id}`}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleFeatured(pkg)}>
                          {pkg.is_featured ? (
                            <>
                              <StarOff className="h-4 w-4 mr-2" />
                              Quitar destacado
                            </>
                          ) : (
                            <>
                              <Star className="h-4 w-4 mr-2" />
                              Destacar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(pkg)}>
                          {pkg.is_active ? "Desactivar" : "Activar"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(pkg.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {pkg.category}
                      </Badge>
                      {pkg.is_featured && (
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      )}
                      <Badge
                        variant={pkg.is_active ? "default" : "secondary"}
                        className={
                          pkg.is_active
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : ""
                        }
                      >
                        {pkg.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <span className="font-semibold text-foreground">
                      ${pkg.price?.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop table layout */}
          <div className="hidden md:block rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Paquete</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPackages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No se encontraron paquetes
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPackages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              {pkg.image_url ? (
                                <Image
                                  src={pkg.image_url}
                                  alt={pkg.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <MapPin className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground line-clamp-1">
                                {pkg.name}
                              </p>
                              <div className="flex items-center gap-1.5">
                                <Badge variant="outline" className="text-xs">
                                  {pkg.category}
                                </Badge>
                                {pkg.is_featured && (
                                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{pkg.destination}</TableCell>
                        <TableCell>{pkg.duration}</TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            ${pkg.price?.toLocaleString("es-AR")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={pkg.is_active ? "default" : "secondary"}
                            className={
                              pkg.is_active
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : ""
                            }
                          >
                            {pkg.is_active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Acciones</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/paquetes/${pkg.slug}`} target="_blank">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver en sitio
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/packages/${pkg.id}`}>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleFeatured(pkg)}>
                                {pkg.is_featured ? (
                                  <>
                                    <StarOff className="h-4 w-4 mr-2" />
                                    Quitar destacado
                                  </>
                                ) : (
                                  <>
                                    <Star className="h-4 w-4 mr-2" />
                                    Destacar
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleActive(pkg)}>
                                {pkg.is_active ? "Desactivar" : "Activar"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeleteId(pkg.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El paquete será eliminado
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
