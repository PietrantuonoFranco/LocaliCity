"use client"

import { useEffect, useState } from "react"

// Funciones
import { getCurrentUser } from "src/api/auth";
import { getSolicitudesOfUser } from "src/api/usuario";
import { aceptarSolicitud, deleteSolicitud, updateSolicitud } from "src/api/solicitud";

// Componentes
import SearchBar from "./SearchBar";

// Tipos / Interfaces
import type Usuario from "src/interfaces/entities/UsuarioInterface";
import type Solicitud from "src/interfaces/entities/SolicitudInterface";


type SortField = "pais" | "provincia" | "nombre"
type SortDirection = "asc" | "desc"

const getEstadoStyle = (estado: string) => {
  switch (estado) {
    case "Aceptada":
      return "text-green-700 border-green-600 bg-green-200"
    case "Rechazada":
      return "text-red-700 border-red-600 bg-red-200"
    case "Pendiente":
      return "text-yellow-700 border-yellow-600 bg-yellow-200"
    case "Cancelada":
      return "text-gray-700 border-gray-600 bg-gray-200"
    default:
      return ""
  }
}

export default function MisSolicitudes() {
  const [solicitudData, setUserData] = useState<Usuario | null>(null);
  const [solicitudes, setSolicitudes] = useState <Solicitud[] | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  useEffect(() => {
    fetchUsuarioSolicitudes();
  }, []);

  const fetchUsuarioSolicitudes = async () => {
    try {
      const data = await getCurrentUser();

      if (data) {
        setUserData(data);

        const solicitudesData = await getSolicitudesOfUser(data.id)

        if (solicitudesData) {
          setSolicitudes(solicitudesData.solicitudes);
        }
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

  const getSortedData = () => {
      if (!sortField || !solicitudes) return solicitudes;
  
      return [...solicitudes].sort((a: Solicitud, b: Solicitud) => {
        let aValue = "";
        let bValue = "";
  
        switch (sortField) {
          case "pais":
            aValue = a.pais ? a.pais.nombre : "-";
            bValue = b.pais ? b.pais.nombre : "-";
            break;
          case "provincia":
            aValue = a.provincia ? a.provincia.nombre : "-";
            bValue = b.provincia ? b.provincia.nombre : "-";
            break;
          case "nombre":
            aValue = a.nombre;
            bValue = b.nombre;
            break;
        }
  
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

  const sortedData = getSortedData()


  const handleDelete = async (id: number) => {
  try {
    await deleteSolicitud(id);
    
    setSolicitudes(prevSolicitudes => 
      prevSolicitudes ? prevSolicitudes.filter(solicitud => solicitud.id !== id) : null
    );
  } catch (error) {
    console.error("Error al eliminar la solicitud:", error);
  }
}

  const handleCancel = async (id: number) => {
    try {
      const estado = "Cancelado";

      const response = await updateSolicitud(id, null, null, null, null, null, null, estado, null);

      if (response) fetchUsuarioSolicitudes();
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
    }
  }

  const handleAcept = async (id: number) => {
    try {
      const response = await aceptarSolicitud(id)

      if (response) fetchUsuarioSolicitudes();
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  if (!solicitudData) {
    return <div>No se pudo cargar la información del usuario</div>;
  }

  return (
    <>
      {solicitudData && (
        <div className="min-h-110 w-full border-1 border-gray-200 shadow-md bg-white/50 rounded-2xl w-full py-10 px-12">
          <div className="h-full flex flex-col">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-800">Mis solicitudes</h2>

                <a href="/solicitudes/crear" target="blank" rel="noopener noreferrer" className="secondary-button w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16"></path>
                  </svg>
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <SearchBar />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-800 my-6"></div>

            {/* TABLE */}
            
            {solicitudes && (
              <div className="w-full space-y-4">
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-500/25 py-2">
                        <th className="font-medium px-4 py-2 text-left">Tipo</th>
                        <th className="font-medium px-4 py-2 text-left">
                          <div className="flex items-center space-x-1">
                            <span>País</span>
                            <button className="h-4 w-4 p-0 cursor-pointer" onClick={() => handleSort("pais")}>
                              {sortField === "pais" ? (
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
                        <th className="font-medium px-4 py-2 text-left">
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
                        <th className="font-medium px-4 py-2 text-left">
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
                        <th className="font-medium px-4 py-2 text-left">Estado</th>
                        <th className="font-medium px-4 py-2 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData?.map((solicitud) => (
                        <tr key={solicitud.id} className="hover:bg-white/35 group">
                          <td className="px-4 py-2 capitalize group-hover:rounded-l-2xl">{solicitud.tipo}</td>
                          <td className="px-4 py-2">{solicitud.pais ? solicitud.pais.nombre : "-"}</td>
                          <td className="px-4 py-2">{solicitud.provincia ? solicitud.provincia.nombre : "-"}</td>
                          <td className="px-4 py-2">{solicitud.nombre}</td>
                          <td className="px-4 py-2">
                            <span className={`text-sm px-2 py-1 rounded-full border-2 shadow-sm font-semibold ${getEstadoStyle(solicitud.estado)}`}>{solicitud.estado}</span>
                          </td>
                          <td className="px-4 py-2 group-hover:rounded-r-2xl">
                            <div className="flex space-x-2 items-center">
                              {solicitudData.rol.nombre === "Administrador" && (
                                <>
                                  {/* Boton de borrar */}
                                  {solicitud.estado !== "Aceptada" && (
                                    <button
                                      className="h-8 w-8 p-0 accept-button flex items-center justify-center cursor-pointer"
                                      onClick={() => handleAcept(solicitud.id)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 14l3.5 3.5L19 6.5"></path>
                                      </svg>
                                    </button>
                                  )}
                                </>
                              )}

                              {solicitud.estado === "Pendiente" && (
                                <>
                                  {/* Boton de cancelar */}
                                  <button
                                    className="h-8 w-8 p-0 cancel-button flex items-center justify-center cursor-pointer"
                                    onClick={() => handleCancel(solicitud.id)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5.75 5l14 14m3-7c0-5.523-4.477-10-10-10s-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10"></path>
                                    </svg>
                                  </button>

                                  {/* Boton de editar */}
                                  <a
                                    href={`/solicitudes/editar/${solicitud.id}`} target="blank" rel="noopener noreferrer"
                                    className="h-8 w-8 p-0 secondary-button flex items-center justify-center cursor-pointer"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.172 19.828L19.828 8.172c.546-.546.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.295-.418-.567-.964-1.112c-.545-.546-.817-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.566.418-1.112.964L4.172 15.828c-.579.578-.868.867-1.02 1.235C3 17.43 3 17.839 3 18.657V21h2.343c.818 0 1.226 0 1.594-.152c.367-.152.656-.442 1.235-1.02M12 21h6M14.5 5.5l4 4"></path>
                                    </svg>
                                  </a>
                                </>
                              )}


                              {solicitudData.rol.nombre === "Administrador" && (
                                <>
                                  {/* Boton de borrar */}
                                  <button
                                    className="h-8 w-8 p-0 cancel-button flex items-center justify-center cursor-pointer"
                                    onClick={() => handleDelete(solicitud.id)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6"></path>
                                    </svg>
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {solicitudes?.length >= 15 && (
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
            )}
          </div>
        </div>  
      )}
    </>
  )
}