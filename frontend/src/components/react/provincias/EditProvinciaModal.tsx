"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { getProvinciaById, updateProvincia } from "src/api/provincia"

import OptionSelect from "../../../components/react/OptionSelect"

import type Pais from "src/interfaces/entities/PaisInterface"
import type { RespuestaPaises, RespuestaProvincia } from "src/interfaces/RespuestasInterfaces"
import type Option from "src/interfaces/OptionInterface";
import { getAllPaises } from "src/api/pais"

interface EditProvinceModalProps {
  id: number;
  onProvinceEdited?: (response: RespuestaProvincia) => void
}

export default function EditProvinciaModal({ id, onProvinceEdited }: EditProvinceModalProps) {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [pais, setPais] = useState<Pais | null>(null)
  const [allPaises, setAllPaises] = useState<Pais[]>([])
  const [paisesOptions, setPaisesOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPaises();
    fetchProvincia();
  }, [])

  const fetchProvincia = async () => {
    try {
      const response = await getProvinciaById(id);
  
      if (response) {
        setNombre(response.provincia.nombre);
        setPais(response.provincia.pais);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
      const response: RespuestaProvincia | null = await updateProvincia(id, nombre, pais)

      if (response) onProvinceEdited?.(response)
      alert(`${nombre} ha sido editado exitosamente`)

      setNombre("")
      setOpen(false)
    } catch (error) {
      alert("No se pudo editar la provincia. Inténtalo de nuevo.")
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
  ) => {
    const { value } = e.target;
    
    setPais(allPaises.find(p => p.id.toString() === value) || null);
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
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Editar provincia</h2>
              <p className="text-sm text-gray-600">Elige otro país o ingresa un nuevo nombre de la provincia que deseas editar.</p>
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
                  {isLoading ? "Creando..." : "Editar provincia"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
