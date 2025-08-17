"use client"

import type React from "react"
import { useState } from "react"
import { createPais } from "src/api/pais"
import type { RespuestaPais } from "src/interfaces/RespuestasInterfaces"

interface CreateCountryModalProps {
  onCountryCreated?: (response: RespuestaPais) => void
}

export default function CreateModal({ onCountryCreated }: CreateCountryModalProps) {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre.trim()) {
      alert("El nombre del país es requerido")
      return
    }

    setIsLoading(true)

    try {
      const response: RespuestaPais | null = await createPais(nombre)

      if (response) onCountryCreated?.(response)
      alert(`${nombre} ha sido creado exitosamente`)

      setNombre("")
      setOpen(false)
    } catch (error) {
      alert("No se pudo crear el país. Inténtalo de nuevo.")
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
        className="secondary-button w-10 h-10 flex items-center justify-center cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16"/>
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white/95 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Crear Nuevo País</h2>
              <p className="text-sm text-gray-600">Ingresa el nombre del país que deseas crear.</p>
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
                  {isLoading ? "Creando..." : "Crear país"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
