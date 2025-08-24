"use client"

import { useEffect, useMemo, useState } from "react"

// Funciones
import { deleteUsuario, getAllUsuarios } from "src/api/usuario";

// Componentes
import SearchBar from "../../../../components/react/SearchBar";

// Tipos / Interfaces
import type Usuario from "src/interfaces/entities/UsuarioInterface";


type SortField = "email" | "nombre" | "apellido" | "rol";
type SortDirection = "asc" | "desc";



export default function Usuarios() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await getAllUsuarios();

      if (response) {
        setUsers(response.usuarios);

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
    setIndex(1);
  }

  const sortedData = useMemo(() => {
    if (!sortField || !users) return users

    return [...users].sort((a: Usuario, b: Usuario) => {
      let aValue = ""
      let bValue = ""

      switch (sortField) {
        case "email":
          aValue = a.email
          bValue = b.email
          break
        case "nombre":
          aValue = a.nombre
          bValue = b.nombre
          break
        case "apellido":
          aValue = a.apellido
          bValue = b.apellido
          break
        case "rol":
          aValue = a.rol.nombre
          bValue = b.rol.nombre
          break
      }

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }, [users, sortField, sortDirection])

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
      await deleteUsuario(id);
      
      setUsers(prevUsers => 
        prevUsers ? prevUsers.filter(user => user.id !== id) : []
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  if (!users) {
    return <div>No se pudo cargar la información de los usuarios</div>;
  }

  return (
    <>
      {users && (
        <div className="w-full border-1 border-gray-200 shadow-md bg-white/50 rounded-2xl w-full py-10 px-12">
          <div className="h-full flex flex-col">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-800">Usuarios</h2>

                <a href="/usuarios/crear" target="blank" rel="noopener noreferrer" className="secondary-button w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16"></path>
                  </svg>
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <SearchBar
                  type="usuarios"
                  elements={users}
                  setElements={setUsers}
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
                      <th className="font-medium px-4 py-2 text-left">
                        <div className="flex items-center space-x-1">
                          <span>Email</span>
                          <button className="h-4 w-4 p-0 cursor-pointer" onClick={() => handleSort("email")}>
                            {sortField === "email" ? (
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
                      <th className="font-medium px-4 py-2 text-left">
                        <div className="flex items-center space-x-1">
                          <span>Apellido</span>
                          <button className="h-4 w-4 p-0 cursor-pointer" onClick={() => handleSort("apellido")}>
                            {sortField === "apellido" ? (
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
                          <span>Rol</span>
                          <button className="h-4 w-4 p-0 cursor-pointer" onClick={() => handleSort("rol")}>
                            {sortField === "rol" ? (
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
                      <th className="font-medium px-4 py-2 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.map((user) => (
                      <tr key={user.id} className="hover:bg-white/35 group">
                        <td className="px-4 py-2 text-blue-600 underline group-hover:rounded-l-2xl">{user.email}</td>
                        <td className="px-4 py-2">{user.nombre}</td>
                        <td className="px-4 py-2 capitalize">{user.apellido}</td>
                        <td className="px-4 py-2">{user.rol?.nombre}</td>
                        <td className="px-4 py-2 group-hover:rounded-r-2xl">
                          <div className="flex space-x-2 items-center">
                            {/* Boton de editar */}
                            <a
                              href={`/usuarios/editar/${user.id}`} rel="noopener noreferrer"
                              className="h-8 w-8 p-0 secondary-button flex items-center justify-center cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.172 19.828L19.828 8.172c.546-.546.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.295-.418-.567-.964-1.112c-.545-.546-.817-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.566.418-1.112.964L4.172 15.828c-.579.578-.868.867-1.02 1.235C3 17.43 3 17.839 3 18.657V21h2.343c.818 0 1.226 0 1.594-.152c.367-.152.656-.442 1.235-1.02M12 21h6M14.5 5.5l4 4"></path>
                              </svg>
                            </a>

                            {/* Boton de borrar */}
                            <button
                              className="h-8 w-8 p-0 cancel-button flex items-center justify-center cursor-pointer"
                              onClick={() => handleDelete(user.id)}
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
                      {quantityPages > 5 && index < quantityPages - 2 && (
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
                        <span className="px-3 py-1 flex items-end">...</span>
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