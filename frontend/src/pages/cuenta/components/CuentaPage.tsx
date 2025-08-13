"use client"

import { useEffect, useState } from "react";
import MiCuenta from "./asideOptions/MiCuenta";
import MisSolicitudes from "./asideOptions/MisSolicitudes";
import type Usuario from "src/interfaces/UsuarioInterface";
import { getCurrentUser, logout } from "src/api/auth";
import Solicitudes from "./asideOptions/Solicitudes";
import Usuarios from "./asideOptions/Usuarios";
import Paises from "./asideOptions/Paises";
import Provincias from "./asideOptions/Provincias";
import Localidades from "./asideOptions/Localidades";

interface Logout {
  message: string
}

export default function CuentaPage() {
  const [option,setOption] = useState("mi-cuenta");
  const [user,setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();

        if (response) setUser(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response: Logout = await logout();
  
      if (response.message) {
        window.location.href = "/";
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      {!user && (
        <div className="mt-16 flex justify-center items-center">
          <div className="px-14 py-10 flex justify-center items-center rounded-xl bg-white/50 shadow-lg">
            <p className="text-2xl">Debes <a href="iniciar-sesion" className="font-semibold text-blue-600 underline">iniciar sesión</a> para ver este contenido</p>
          </div>
        </div>
      )}

      {user && (
        <div className="min-h-full w-full">
          <aside className="fixed top-16 inset-y-0 left-0 w-64 bg-linear-to-b from-sky-100 via-sky-100 via-sky-100 via-white/85 via-white/70 to-white/65 shadow-lg ">
            <div className="p-4  bg-linear-to-b from-sky-400 via-sky-300 to-sky-100 flex flex-col items-center space-y-2 mb-2">
              <div className="w-full flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
                    <path d="M14.75 9.5a2.75 2.75 0 1 1-5.5 0a2.75 2.75 0 0 1 5.5 0M5.5 19l.56-.98a5 5 0 0 1 4.342-2.52h3.196a5 5 0 0 1 4.342 2.52l.56.98" />
                  </g>
                </svg>
              </div>

              <div className="w-full flex flex-col items-center space-y-1">
                <h2 id="name-aside" className="text-lg text-gray-800 font-semibold">{user.nombre} {user.apellido}</h2>
                <p id="email-aside" className="text-sm text-gray-700">{user.email}</p>
              </div>

              <div className="mt-3 w-full flex justify-center items-center">
                <button type="button" onClick={handleLogout} className="cursor-pointer py-2 px-4 rounded-xl flex justify-center items-center gap-2 bg-dark-blue text-xs text-white font-semibold hover:bg-gray-700 duration-300 transformation-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17.625c-.074 1.852-1.617 3.424-3.684 3.374c-.481-.012-1.076-.18-2.265-.515c-2.861-.807-5.345-2.164-5.941-5.203C3 14.724 3 14.095 3 12.837v-1.674c0-1.257 0-1.886.11-2.445c.596-3.038 3.08-4.395 5.941-5.202c1.19-.335 1.784-.503 2.265-.515c2.067-.05 3.61 1.522 3.684 3.374M21 12H10m11 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5"></path>
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            </div>
            

            <div className="h-full w-full flex flex-col p-4 space-y-2">
              <button
                type="button"
                id="mi-cuenta"
                onClick={() => setOption("mi-cuenta")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 hover:shadow-md border-1 border-transparent ${option === "mi-cuenta" ? "bg-white/75 border-gray-200" : ""} duration-300 transformation-all cursor-pointer`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" />
                </svg>
                <span>Mi cuenta</span>
              </button>

              <button
                type="button"
                id="mis-solicitudes"
                onClick={() => setOption("mis-solicitudes")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 hover:shadow-md border-1 border-transparent ${option === "mis-solicitudes" ? "bg-white/75 border-gray-200" : ""} duration-300 transformation-all cursor-pointer`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M3.5 3.978A1.99 1.99 0 0 1 5.5 2c1.105 0 2 .886 2 1.978c0 .394-.116.76-.317 1.069C6.585 5.966 5.5 6.842 5.5 7.934v.495M5.5 11h.012M10.5 2h2.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35c-.268-.676-.268-1.523-.268-3.216V14" />
                    <path d="M20.5 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 10.5 22" />
                  </g>
                </svg>
                <span>Mis solicitudes</span>
              </button>

              {user.rol.nombre === "Administrador" && (
                <>
                  <div className="w-full h-[1px] bg-gray-500"></div>

                  <button
                    type="button"
                    id="all-users"
                    onClick={() => setOption("all-users")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 hover:shadow-md border-1 border-transparent ${option === "all-users" ? "bg-white/75 border-gray-200" : ""} duration-300 transformation-all cursor-pointer`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.616 20h.49c1.15 0 2.065-.524 2.886-1.256C24.078 16.883 19.174 15 17.5 15m-2-9.931Q15.841 5 16.205 5c1.82 0 3.295 1.343 3.295 3s-1.475 3-3.295 3q-.364 0-.705-.069m-11.019 5.18c-1.179.632-4.27 1.922-2.387 3.536c.92.789 1.944 1.353 3.232 1.353h7.348c1.288 0 2.312-.564 3.232-1.353c1.883-1.614-1.208-2.904-2.387-3.536c-2.765-1.481-6.273-1.481-9.038 0M13 7.5a4 4 0 1 1-8 0a4 4 0 0 1 8 0"></path>
                    </svg>
                    <span>Usuarios</span>
                  </button>

                  <button
                    type="button"
                    id="all-solicitudes"
                    onClick={() => setOption("all-solicitudes")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 hover:shadow-md border-1 border-transparent ${option === "all-solicitudes" ? "bg-white/75 border-gray-200" : ""} duration-300 transformation-all cursor-pointer`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <path d="M11.53 22h-1.06c-3.992 0-5.989 0-7.23-1.172C2 19.657 2 17.771 2 14v-4c0-3.771 0-5.657 1.24-6.828C4.481 2 6.478 2 10.47 2h1.06c3.993 0 5.989 0 7.23 1.172C20 4.343 20 6.229 20 10v.5M7 7h8m-8 5h5"></path>
                        <path d="M18 20.714V22m0-1.286a3.36 3.36 0 0 1-2.774-1.43M18 20.713a3.36 3.36 0 0 0 2.774-1.43M18 14.285c1.157 0 2.176.568 2.774 1.43M18 14.287a3.36 3.36 0 0 0-2.774 1.43M18 14.287V13m4 1.929l-1.226.788M14 20.07l1.226-.788M14 14.93l1.226.788M22 20.07l-1.226-.788m0-3.566a3.12 3.12 0 0 1 0 3.566m-5.548-3.566a3.12 3.12 0 0 0 0 3.566"></path>
                      </g>
                    </svg>
                    <span>Solicitudes</span>
                  </button>

                  <button
                    type="button"
                    id="all-paises"
                    onClick={() => setOption("all-paises")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 hover:shadow-md border-1 border-transparent ${option === "all-paises" ? "bg-white/75 border-gray-200" : ""} duration-300 transformation-all cursor-pointer`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22C6.477 22 2 17.523 2 12a9.97 9.97 0 0 1 2.99-7.132M12 22c-.963-.714-.81-1.544-.326-2.375c.743-1.278.743-1.278.743-2.98c0-1.704 1.012-2.502 4.583-1.788c1.605.321 2.774-1.896 4.857-1.164M12 22c4.946 0 9.053-3.59 9.857-8.307m0 0Q22 12.867 22 12c0-4.881-3.498-8.946-8.123-9.824m0 0c.51.94.305 2.06-.774 2.487c-1.76.697-.5 1.98-2 2.773c-1 .528-2.499.396-3.998-1.189c-.79-.834-1.265-1.29-2.115-1.379m8.887-2.692A10 10 0 0 0 12 2a9.97 9.97 0 0 0-7.01 2.868"></path>
                    </svg>
                    <span>Paises</span>
                  </button>

                  <button
                    type="button"
                    id="all-provincias"
                    onClick={() => setOption("all-provincias")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 hover:shadow-md border-1 border-transparent ${option === "all-provincias" ? "bg-white/75 border-gray-200" : ""} duration-300 transformation-all cursor-pointer`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5.253 4.196l-1.227.712c-.989.573-1.483.86-1.754 1.337C2 6.722 2 7.302 2 8.464v8.164c0 1.526 0 2.29.342 2.714c.228.282.547.472.9.535c.53.095 1.18-.282 2.478-1.035c.882-.511 1.73-1.043 2.785-.898c.48.065.937.293 1.853.748l3.813 1.896c.825.41.833.412 1.75.412H18c1.886 0 2.828 0 3.414-.599c.586-.598.586-1.562.586-3.49v-6.74c0-1.927 0-2.89-.586-3.49c-.586-.598-1.528-.598-3.414-.598h-2.079c-.917 0-.925-.002-1.75-.412L10.84 4.015C9.449 3.323 8.753 2.977 8.012 3S6.6 3.415 5.253 4.196M15 6.5v14m-7-17v14"></path>
                    </svg>
                    <span>Provincias</span>
                  </button>

                  <button
                    type="button"
                    id="all-localidades"
                    onClick={() => setOption("all-localidades")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 hover:shadow-md border-1 border-transparent ${option === "all-localidades" ? "bg-white/75 border-gray-200" : ""} duration-300 transformation-all cursor-pointer`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <path d="M22 10v-.783c0-1.94 0-2.909-.586-3.512c-.586-.602-1.528-.602-3.414-.602h-2.079c-.917 0-.925-.002-1.75-.415L10.84 3.021c-1.391-.696-2.087-1.044-2.828-1.02S6.6 2.418 5.253 3.204l-1.227.716c-.989.577-1.483.866-1.754 1.346C2 5.746 2 6.33 2 7.499v8.217c0 1.535 0 2.303.342 2.73c.228.285.547.476.9.54c.53.095 1.18-.284 2.478-1.042c.882-.515 1.73-1.05 2.785-.905c.884.122 1.705.68 2.495 1.075M8 2v15m7-12v4.5"></path>
                        <path d="M18.308 21.684A1.18 1.18 0 0 1 17.5 22c-.302 0-.591-.113-.808-.317c-1.986-1.87-4.646-3.96-3.349-6.993C14.045 13.05 15.73 12 17.5 12s3.456 1.05 4.157 2.69c1.296 3.03-1.358 5.13-3.349 6.993M17.5 16.5h.009"></path>
                      </g>
                    </svg>
                    <span>Localidades</span>
                  </button>
                </>
              )}
            </div>
          </aside>

          <main className="max-h-screen w-full pl-74 p-8">
            <div id="mi-cuenta-container" className="h-full w-full">
              {option === "mi-cuenta" && (
                <MiCuenta/>
              )}

              {option === "mis-solicitudes" && (
                <MisSolicitudes/>
              )}


              {user.rol.nombre === "Administrador" && (
                <>
                  {option === "all-solicitudes" && (
                    <Solicitudes />
                  )}

                  {option === "all-users" && (
                    <Usuarios />
                  )}

                  {option === "all-paises" && (
                    <Paises />
                  )}

                  {option === "all-provincias" && (
                    <Provincias />
                  )}

                  {option === "all-localidades" && (
                    <Localidades />
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
}