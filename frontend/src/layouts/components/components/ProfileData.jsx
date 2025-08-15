'use client'

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../../../api/auth";

export default function ProfileData () {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAccountOptions, setShowAccountOptions] = useState(false); 
  const [error, setError] = useState(null);

  useEffect( () => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getCurrentUser();
    
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error("Error completo:", err);
        setError(err.message || "Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const toggleShowOptions = () => {
    showAccountOptions ? setShowAccountOptions(false) : setShowAccountOptions(true) ;
  }

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.mensaje) {
        window.location.href = "/";
      }
    } catch {
      console.error(response.data.error);
    }
  }

  if (loading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  return (
    <>
      {!user && (
        <div className="hidden lg:flex items-center justify-end space-x-4 text-xs">
          <div className="flex flex-col items-end justify-center space-y-0.5">
            <a href="/registrarse" className="text-gray-600 flex items-center space-x-2 py-1 px-2 hover:text-gray-800 hover:rounded-md hover:bg-gray-100 duration-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.18 15.296c-1.258.738-4.555 2.243-2.547 4.126c.982.92 2.074 1.578 3.448 1.578h7.838c1.374 0 2.467-.658 3.447-1.578c2.009-1.883-1.288-3.389-2.546-4.126a9.61 9.61 0 0 0-9.64 0M14 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0m5.5-3v5M22 6.5h-5" />
              </svg>
              <span className="font-semibold">Registrarse</span>
            </a>
            <a href="/iniciar-sesion" className="text-gray-600 flex items-center space-x-1 py-1 px-2 hover:text-gray-800 hover:rounded-md hover:bg-gray-100 duration-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374c-.481-.012-1.076-.18-2.265-.515c-2.861-.807-5.345-2.164-5.941-5.202C3 14.723 3 14.094 3 12.837v-1.674c0-1.257 0-1.886.11-2.445c.596-3.038 3.08-4.395 5.941-5.202c1.19-.335 1.784-.503 2.265-.515c2.067-.05 3.61 1.522 3.684 3.374" />
                  <path d="M10 12h11m-11 0c0-.7 1.994-2.008 2.5-2.5M10 12c0 .7 1.994 2.008 2.5 2.5" />
                </g>
              </svg>
              <span className="font-semibold">Iniciar Sesión</span>
            </a>
          </div>
        </div>
      )}

      {user && (
        <>
          <div className={`${user? "flex items-center justify-end gap-3 text-dark-blue" : "hidden"}`}>
            <div className="flex flex-col items-end space-y-0">  {/* Elimina espacio entre hijos */}
              <p className="text-dark-blue leading-[1.1] font-semibold">{user.nombre} {user.apellido}</p>
              <p className="text-xs leading-[1.1]">{user.email}</p>
            </div>

            <div>
              <button type="button" onClick={toggleShowOptions} className="cursor-pointer">
                <div className="group text-dark-blue pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline opacity-100 group-hover:opacity-0 group-hover:hidden transition-all duration-300 ease-in-out" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3" />
                    <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0" />
                  </svg>
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="hidden opacity-0 group-hover:opacity-100 group-hover:inline group-hover:drop-shadow-md transition-all duration-300 ease-in-out" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5" />
                    <path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className={`${ !showAccountOptions ? "hidden" : "absolute z-100 top-16 w-48 right-30 bg-white/97 shadow-md rounded-b-lg" }`}>
            <nav>
              <ul className="w-full flex flex-col justify-center items-center">
                <li className="w-full">
                  <a href="/cuenta" className="w-full flex items-center justify-center py-2 gap-2 hover:bg-gray-200 duration-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.5 14.012a10.6 10.6 0 0 0-5.922 1.47c-1.415.842-5.125 2.562-2.865 4.715C3.816 21.248 5.045 22 6.59 22H12m3.5-15.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0M18 20.714V22m0-1.286a3.36 3.36 0 0 1-2.774-1.43M18 20.713a3.36 3.36 0 0 0 2.774-1.43M18 14.285c1.157 0 2.176.568 2.774 1.43M18 14.287a3.36 3.36 0 0 0-2.774 1.43M18 14.287V13m4 1.929l-1.226.788M14 20.07l1.226-.788M14 14.93l1.226.788M22 20.07l-1.226-.788m0-3.566a3.12 3.12 0 0 1 0 3.566m-5.548-3.566a3.12 3.12 0 0 0 0 3.566"></path>
                    </svg>
                    Mi Cuenta
                  </a>
                </li>
{/*
                <li className="w-full">
                  <a href="/cuenta" className="w-full flex items-center justify-center py-2 hover:bg-gray-100">
                    Solicitudes
                  </a>
                </li>
*/}
              </ul>
            </nav>

            <div className="w-full">
              <button type="button" onClick={handleLogout} className="cursor-pointer w-full py-2 flex justify-center items-center gap-2 bg-dark-blue text-white/95 rounded-b-lg hover:bg-gray-700 duration-300 transition-colors"  >
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374c-.481-.012-1.076-.18-2.265-.515c-2.861-.807-5.345-2.164-5.941-5.203C3 14.724 3 14.095 3 12.837v-1.674c0-1.257 0-1.886.11-2.445c.596-3.038 3.08-4.395 5.941-5.202c1.19-.335 1.784-.503 2.265-.515c2.067-.05 3.61 1.522 3.684 3.374M21 12H10m11 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5"></path>
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}