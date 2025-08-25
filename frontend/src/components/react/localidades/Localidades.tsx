"use client"

import { useEffect, useMemo, useState } from "react"

// Funciones
import { deleteLocalidad, getAllLocalidades } from "src/api/localidad";
import { getCurrentUser } from "src/api/auth";

// Componentes
import CreateLocalidadModal from "src/components/react/localidades/CreateLocalidadModal";
import SearchBar from "../../../components/react/SearchBar";

// Tipos / Interfaces
import type { RespuestaLocalidad } from "src/interfaces/RespuestasInterfaces";
import type Usuario from "src/interfaces/entities/UsuarioInterface";
import type Localidad from "src/interfaces/entities/LocalidadInterface";
import EditLocalidadModal from "src/components/react/localidades/EditLocalidadModal";


type SortField = "nombre" | "provincia" | "pais"
type SortDirection = "asc" | "desc";



export default function Localidades() {
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  useEffect(() => {
    fetchLocalidades();
    fetchUsuario();
  }, []);

  const fetchLocalidades = async () => {
    try {
      const response = await getAllLocalidades();

      setLocalidades(response?.localidades ?? null);
    } catch (error) {
      console.error("Error fetching solicitud data:", error);
      setLocalidades([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsuario = async () => {
    try {
      const data = await getCurrentUser();
      if (data) {
        setUsuario(data);
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
    setIndex(1); // Resetear a primera página al ordenar
  }

  const sortedData = useMemo(() => {
    if (!sortField || !localidades) return localidades

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
  }, [localidades, sortField, sortDirection])

  const quantityPages = useMemo(() => {
    if (!sortedData || sortedData.length === 0) return 1;
    return Math.ceil(sortedData.length / 6);
  }, [sortedData]);

  const paginatedData = useMemo(() => {
    if (!sortedData) return [];
    const startIndex = (index - 1) * 6;
    return sortedData.slice(startIndex, startIndex + 6);
  }, [sortedData, index]);

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

  const handleCityCreated = (response: RespuestaLocalidad) => {
    fetchLocalidades();

    setIndex(quantityPages); // Ir a la última página donde estará el nuevo elemento
  }

  const handleCityEdited = (response: RespuestaLocalidad) => {
    fetchLocalidades();
  }

  if (isLoading) {
    return (
      <div className="w-full h-100 flex justify-center items-center text-white/75">
        <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeDasharray={16} strokeDashoffset={16} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c4.97 0 9 4.03 9 9">
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"></animate>
            <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
          </path>
        </svg>
      </div>
    )
  }

  if (localidades?.length === 0) {
    return (
      <div className="p-4 border-1 border-gray-200 shadow-md bg-white/50 rounded-2xl py-10 px-12 flex items-center justify-center">
        <div className="text-center flex flex-col items-center space-y-4">
          <p className="text-lg">No hay localidades registradas</p>
          {!usuario ? (
            <div className="h-full w-full justify-center items-center">
              <a href="/iniciar-sesion" target="_blank" rel="noopener noreferrer" className="button px-2 py-1 rounded-md">Crear</a>
            </div>
          ) : usuario?.rol.nombre !== "Administrador" ? (
            <div className="h-full w-full justify-center items-center">
              <a href="/solicitudes/crear" rel="noopener noreferrer" className="button px-2 py-1 rounded-md">Crear</a>
            </div>
          ) : (
            <CreateLocalidadModal onCityCreated={handleCityCreated} title={"Crear"}/>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {localidades && (
        <div className="w-full border-1 border-gray-200 shadow-md bg-white/50 rounded-2xl w-full py-10 px-12">
          <div className="h-full flex flex-col">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-800">Localidades</h2>
                {!usuario && (
                  <a href="/iniciar-sesion" className="secondary-button w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16"/>
                    </svg>
                  </a>
                )}
    
                {usuario && usuario.rol.nombre === "Administrador" && (
                  <CreateLocalidadModal onCityCreated={handleCityCreated} title={null}/>
                )}

                {usuario && usuario.rol.nombre !== "Administrador" && (
                  <a href="/solicitudes/crear" className="secondary-button w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16"/>
                    </svg>
                  </a>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <SearchBar
                  type="localidades"
                  elements={localidades}
                  setElements={ (newLocalidades) => {
                    setLocalidades(newLocalidades);
                    setIndex(1);
                  }}
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-800 my-6"></div>

            {/* TABLE */}          
            <div className="flex flex-col flex-grow">
              <div className="flex-grow overflow-auto">
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
                      {usuario?.rol.nombre === "Administrador" && (
                        <th className="font-medium px-4 py-2 text-left whitespace-nowrap">Acciones</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.map((localidad) => (
                      <tr key={localidad.id} className="hover:bg-white/35 group">
                        <td className="px-4 py-2 group-hover:rounded-l-2xl">{localidad.nombre}</td>
                        <td className="px-4 py-2">{localidad.provincia.nombre}</td>
                        <td className="px-4 py-2">{localidad.provincia.pais.nombre}</td>
                        {usuario?.rol.nombre === "Administrador" && (
                          <td className="px-4 py-2 group-hover:rounded-r-2xl">
                            <div className="flex space-x-2 items-center">
                              {/* Boton de editar */}
                              <EditLocalidadModal id={localidad.id} onCityEdited={handleCityEdited}/>

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
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {quantityPages > 1 && (
                <div className="mt-4 pt-4">
                  <div className="flex justify-center items-center space-x-3"> 
                    <button 
                      onClick={() => setIndex(prev => Math.max(prev - 1, 1))} 
                      disabled={index === 1}
                      className="secondary-button px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Anterior
                    </button>

                    <div className="flex space-x-2">
                      {quantityPages > 5 && index >= quantityPages - 2 && (
                        <span className="px-3 py-1 flex items-end text-lg text-violet-600">...</span>
                      )}
                      {Array.from({ length: Math.min(5, quantityPages) }, (_, i) => {
                        let pageNum;
                        if (quantityPages <= 5) {
                          pageNum = i + 1;
                        } else if (index <= 3) {
                          pageNum = i + 1;
                        } else if (index >= quantityPages - 2) {
                          pageNum = quantityPages - 4 + i;
                        } else {
                          pageNum = index - 2 + i;
                        }

                        return (
                          <button 
                            key={pageNum}
                            onClick={() => setIndex(pageNum)}
                            className={`${
                              index === pageNum ? 'button' : 'secondary-button'
                            } px-4.5 py-1 cursor-pointer`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      {quantityPages > 5 && index < quantityPages - 2 && (
                        <span className="px-3 py-1 flex items-end text-lg text-violet-600">...</span>
                      )}
                    </div>

                    <button 
                      onClick={() => setIndex(prev => Math.min(prev + 1, quantityPages))} 
                      disabled={index === quantityPages}
                      className="secondary-button px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>  
      )}
    </>
  )
}