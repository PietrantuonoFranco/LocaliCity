"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { getPaisById, updatePais } from "src/api/pais"
import type { RespuestaPais } from "src/interfaces/RespuestasInterfaces"

interface EditPaisModalProps {
  id: number,
  onCountryEdited?: (response: RespuestaPais) => void
}

export default function EditPaisesModal({ id, onCountryEdited }: EditPaisModalProps) {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPais()
  }, [])

  const fetchPais = async () => {
    const response = await getPaisById(id)

    if (response) setNombre(response.pais.nombre)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre.trim()) {
      alert("El nombre del país es requerido")
      return
    }

    setIsLoading(true)

    try {
      const response: RespuestaPais | null = await updatePais(id, nombre)

      if (response) onCountryEdited?.(response)
      alert(`${nombre} ha sido editado exitosamente`)

      setNombre("")
      setOpen(false)
    } catch (error) {
      alert("No se pudo editar el país. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-8 w-8 p-0 secondary-button flex items-center justify-center cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.172 19.828L19.828 8.172c.546-.546.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.295-.418-.567-.964-1.112c-.545-.546-.817-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.566.418-1.112.964L4.172 15.828c-.579.578-.868.867-1.02 1.235C3 17.43 3 17.839 3 18.657V21h2.343c.818 0 1.226 0 1.594-.152c.367-.152.656-.442 1.235-1.02M12 21h6M14.5 5.5l4 4"/>
        </svg>
      </button>
      

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white/95 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Editar país</h2>
              <p className="text-sm text-gray-600">Ingresa el nuevo nombre del país.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="w-full space-y-2 mb-6">
                <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <div className="pb-[3px] focus-within:gradient-border">
                  <input
                    id="country-name"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Argentina"
                    disabled={isLoading}
                    autoFocus
                    required
                    className="px-4 input"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                  className="cancel-button px-4 py-2 duration-300 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="button px-4 py-2 duration-300 transition-all"
                >
                  {isLoading ? "Editando..." : "Editar país"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
