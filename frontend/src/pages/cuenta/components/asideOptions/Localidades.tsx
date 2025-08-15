"use client"

import { useEffect, useState, useMemo } from "react"

// Funciones
import { deleteLocalidad, getAllLocalidades } from "src/api/localidad";

// Componentes
import SearchBar from "../SearchBar";

// Tipos / Interfaces
import type Localidad from "src/interfaces/entities/LocalidadInterface";


type SortField = "nombre" | "pais" | "provincia"
type SortDirection = "asc" | "desc";



export default function Localidades() {
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  useEffect(() => {
    fetchLocalidades();
  }, []);

  const fetchLocalidades = async () => {
    try {
      const response = await getAllLocalidades();

      if (response) {
        setLocalidades(response.localidades);
      }
    } catch (error) {
      console.error("Error fetching solicitud data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = useMemo(() => {
    if (!localidades) return [];
    if (!sortField) return localidades;

    return [...localidades].sort((a: Localidad, b: Localidad) => {
      let aValue = ""
      let bValue = ""

      
      switch (sortField) {
        case "nombre":
          aValue = a.nombre
          bValue = b.nombre
          break
        case "provincia":
          aValue = a.provincia.nombre
          bValue = b.provincia.nombre
          break
        
        case "pais":
          aValue = a.provincia.pais.nombre
          bValue = b.provincia.pais.nombre
          break
      }
       

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
    
  }, [localidades, sortField, sortDirection]);


  const handleDelete = async (id: number) => {
    try {
      await deleteLocalidad(id);
      
      setLocalidades(prevLocalidades => 
        prevLocalidades ? prevLocalidades.filter(localidad => localidad.id !== id) : []
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  if (!localidades) {
    return <div>No se pudo cargar la información de los usuarios</div>;
  }

  return (
    <>
      {localidades && (
        <div className="min-h-110 w-full border-1 border-gray-200 shadow-md bg-white/50 rounded-2xl w-full py-10 px-12">
          <div className="h-full flex flex-col">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-800">Localidades</h2>

                <a href="#" target="blank" rel="noopener noreferrer" className="secondary-button w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16"></path>
                  </svg>
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <SearchBar
                  type="localidades"
                  elements={localidades}
                  setElements={setLocalidades}
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-800 my-6"></div>

            {/* TABLE */}          
            <div className="w-full space-y-4">
              <div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-500/25 py-2">
                      <th className="font-medium px-4 py-2 text-left w-1/3">
                        <div className="flex items-center space-x-1">
                          <span>Nombre</span>
                          <button className="h-4 w-4 p-0 cursor-pointer" onClick={() => handleSort("nombre")}>
                            {sortField === "nombre" ? (
                              sortDirection === "asc" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 3h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288L5.477 8.432c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 21l2.106-4.695C6.496 15.435 6.69 15 7 15s.504.435.894 1.305L10 21m7.5-1V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288l-3.638 3.864c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 9l2.106-4.695C6.496 3.435 6.69 3 7 3s.504.435.894 1.305L10 9m7.5 11V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                                </svg>
                              )
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 3h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288L5.477 8.432c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 21l2.106-4.695C6.496 15.435 6.69 15 7 15s.504.435.894 1.305L10 21m7.5-1V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                              </svg>
                            )}
                          </button>
                        </div>
                      </th>
                      <th className="font-medium px-4 py-2 text-left w-1/3">
                        <div className="flex items-center space-x-1">
                          <span>Provincia</span>
                          <button className="h-4 w-4 p-0 cursor-pointer" onClick={() => handleSort("provincia")}>
                            {sortField === "provincia" ? (
                              sortDirection === "asc" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 3h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288L5.477 8.432c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 21l2.106-4.695C6.496 15.435 6.69 15 7 15s.504.435.894 1.305L10 21m7.5-1V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288l-3.638 3.864c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 9l2.106-4.695C6.496 3.435 6.69 3 7 3s.504.435.894 1.305L10 9m7.5 11V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                                </svg>
                              )
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 3h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288L5.477 8.432c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 21l2.106-4.695C6.496 15.435 6.69 15 7 15s.504.435.894 1.305L10 21m7.5-1V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                              </svg>
                            )}
                          </button>
                        </div>
                      </th>
                      <th className="font-medium px-4 py-2 text-left w-1/3">
                        <div className="flex items-center space-x-1">
                          <span>País</span>
                          <button className="h-4 w-4 p-0 cursor-pointer" onClick={() => handleSort("pais")}>
                            {sortField === "nombre" ? (
                              sortDirection === "asc" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 3h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288L5.477 8.432c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 21l2.106-4.695C6.496 15.435 6.69 15 7 15s.504.435.894 1.305L10 21m7.5-1V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288l-3.638 3.864c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 9l2.106-4.695C6.496 3.435 6.69 3 7 3s.504.435.894 1.305L10 9m7.5 11V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                                </svg>
                              )
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 3h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288L5.477 8.432c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 21l2.106-4.695C6.496 15.435 6.69 15 7 15s.504.435.894 1.305L10 21m7.5-1V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"></path>
                              </svg>
                            )}
                          </button>
                        </div>
                      </th>
                      <th className="font-medium px-4 py-2 text-left whitespace-nowrap">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData?.map((localidad) => (
                      <tr key={localidad.id} className="hover:bg-white/35 group">
                        <td className="px-4 py-2 group-hover:rounded-l-2xl">{localidad.nombre}</td>
                        <td className="px-4 py-2">{localidad.provincia.nombre}</td>
                        <td className="px-4 py-2">{localidad.provincia?.pais?.nombre}</td>
                        <td className="px-4 py-2 group-hover:rounded-r-2xl">
                          <div className="flex space-x-2 items-center">
                            {/* Boton de editar */}
                            <a
                              href={`/localidades/editar/${localidad.id}`} target="blank" rel="noopener noreferrer"
                              className="h-8 w-8 p-0 secondary-button flex items-center justify-center cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.172 19.828L19.828 8.172c.546-.546.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.295-.418-.567-.964-1.112c-.545-.546-.817-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.566.418-1.112.964L4.172 15.828c-.579.578-.868.867-1.02 1.235C3 17.43 3 17.839 3 18.657V21h2.343c.818 0 1.226 0 1.594-.152c.367-.152.656-.442 1.235-1.02M12 21h6M14.5 5.5l4 4"></path>
                              </svg>
                            </a>

                            {/* Boton de borrar */}
                            <button
                              className="h-8 w-8 p-0 cancel-button flex items-center justify-center cursor-pointer"
                              onClick={() => handleDelete(localidad.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            {localidades?.length >= 15 && (
              <div className="flex justify-center items-center space-x-2">
                <a href="#" className="px-3 py-1 border rounded hover:bg-gray-100">
                  Anterior
                </a>
              
                <div className="flex space-x-1">
                  <a href="#" className="px-3 py-1 border rounded hover:bg-gray-100">23</a>
                  <a href="#" className="px-3 py-1 border rounded hover:bg-gray-100">24</a>
                  <a href="#" className="px-3 py-1 border rounded bg-blue-500 text-white">25</a>
                  <a href="#" className="px-3 py-1 border rounded hover:bg-gray-100">26</a>
                  <span className="px-3 py-1">...</span>
                </div>
                
                <a href="#" className="px-3 py-1 border rounded hover:bg-gray-100">
                  Siguiente
                </a>
              </div>
              )}
            </div>
          </div>
        </div>  
      )}
    </>
  )
}