"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { createProvincia } from "src/api/provincia"

import OptionSelect from "src/components/react/OptionSelect"

import type Pais from "src/interfaces/entities/PaisInterface"
import type { RespuestaPaises, RespuestaProvincia } from "src/interfaces/RespuestasInterfaces"
import type Option from "src/interfaces/OptionInterface";
import { getAllPaises } from "src/api/pais"

interface CreateProvinceModalProps {
  onProvinceCreated?: (response: RespuestaProvincia) => void
}

export default function CreateProvinciaModal({ onProvinceCreated }: CreateProvinceModalProps) {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [pais, setPais] = useState<Pais | null>(null)
  const [allPaises, setAllPaises] = useState<Pais[]>([])
  const [paisesOptions, setPaisesOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPaises();
  }, [])

  const fetchPaises = async () => {
    try {
      const response: RespuestaPaises = await getAllPaises();
  
      if (response) {
        const options = [
          { name: "default-country-option", value: "", label: "Seleccione un país" }, 
          ...response.paises.map(pais => ({ 
            name: `${pais.nombre.toLowerCase()}-option`, 
            value: pais.id.toString(), 
            label: pais.nombre 
          }))
        ];
  
        setPaisesOptions(options);
        setAllPaises(response.paises);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre.trim()) {
      alert("El nombre de la provincia es requerido")
      return
    }

    if (!pais) {
      alert("El país es requerido")
      return
    }

    setIsLoading(true)

    try {
      if (pais) {
        const response: RespuestaProvincia | null = await createProvincia(nombre, pais)

        if (response) onProvinceCreated?.(response)
        alert(`${nombre} ha sido creado exitosamente`)
      }

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    
    setPais(allPaises.find(p => p.id.toString() === value) || null);
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
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Crear Nueva Provincia</h2>
              <p className="text-sm text-gray-600">Elige un país e ingresa el nombre de la provincia que deseas crear.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <OptionSelect
                options={paisesOptions} 
                htmlFor="pais" 
                labelValue="País"
                name="pais"
                value={pais?.id.toString() || ""}
                onChange={(value) => handleInputChange({ target: { name: "pais", value } })}
              />

              <div className="w-full space-y-2 mb-6">
                <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <div className="pb-[3px] focus-within:gradient-border">
                  <input
                    id="province-name"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Buenos Aires"
                    disabled={isLoading}
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
                  {isLoading ? "Creando..." : "Crear provincia"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
