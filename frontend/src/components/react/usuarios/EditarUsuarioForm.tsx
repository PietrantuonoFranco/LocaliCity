"use client"

import { useEffect, useState } from "react"
import { getAllRoles } from "src/api/rol";
import { getUsuarioById, updateUsuario } from "src/api/usuario";
import type Rol from "src/interfaces/entities/RolInterface";
import type Usuario from "src/interfaces/entities/UsuarioInterface"

type Props = {
  id: number;
}

export default function EditarUsuarioForm ({ id }: Props) {
  const [adminRol, setAdminRol] = useState<Rol | null>(null);
  const [regularRol, setRegularRol] = useState<Rol | null>(null);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [rol, setRol] = useState<Rol | null>(null);
  const [showContrasenia, setShowContrasenia] = useState(false);
  const [switchActivated, setSwitchActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsuario();
    fetchRoles();
    setIsLoading(false);
  }, [])

  const fetchUsuario = async () => {
    try {
      const response = await getUsuarioById(id);

      if (response) {
        setEmail(response.usuario.email);
        setNombre(response.usuario.nombre);
        setApellido(response.usuario.apellido);
        setRol(response.usuario.rol);

        response.usuario.rol.nombre === "Administrador" ? setSwitchActivated(true) : setSwitchActivated(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await getAllRoles();
  
      if (!response?.roles) {
        console.error('No se recibieron roles en la respuesta');
        return;
      }
  
      const admRol = response.roles.find(r => r.nombre === "Administrador");
      const regRol = response.roles.find(r => r.nombre === "Regular");
  
      if (!admRol) {
        console.warn('No se encontró el rol Administrador');
      }
  
      if (!regRol) {
        console.warn('No se encontró el rol Regular');
      }
  
      setAdminRol(admRol || null);
      setRegularRol(regRol || null);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }

  const handleSubmit = async () => {
    try {
      if (email === "" || contrasenia === "" || rol === null) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }

      const response = await updateUsuario(id, email, nombre, apellido, contrasenia, rol);

      if (response?.usuario) {
        window.location.href = "/cuenta";
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const toggleSwitch = () => {
    if (!switchActivated) {
      setRol(adminRol);
    } else {
      setRol(regularRol);
    } 
    setSwitchActivated(!switchActivated);
  }

  if (isLoading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  return (
    <div className="h-full flex items-center justify-center p-4 md:py-4 md:px-46 xl:px-86 2xl:px-135">
      <div className="h-full w-full shadow-lg bg-white/50 p-10 rounded-xl">
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-3xl font-semibold text-gray-900">Editar usuario</h2>
          <h4 className="text-gray-600">Completá el formulario para editar un usuario</h4>
        </div>
        <div>
          <form id="editForm" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="pb-[3px] focus-within:gradient-border">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="juanperez@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 input"
                />
              </div>
            </div>
      
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                Nombre
              </label>
              <div className="pb-[3px] focus-within:gradient-border">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Juan"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                  className="px-4 input"
                />
              </div>
            </div>
      
            <div className="space-y-2">
              <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                Apellido
              </label>
              <div className="pb-[3px] focus-within:gradient-border">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  placeholder="Pérez"
                  value={apellido}
                  onChange={e => setApellido(e.target.value)}
                  required
                  className="px-4 input"
                />
              </div>
            </div>
      
            <div className="space-y-2">
              <label htmlFor="contrasenia" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative pb-[3px] focus-within:gradient-border">
                <input
                  id="contrasenia"
                  name="contrasenia"
                  type={showContrasenia ? "text" : "password"}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  value={contrasenia}
                  onChange={e => setContrasenia(e.target.value)}
                  required
                  className="px-4 input"
                />
                <button
                  id="togglePassword"
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                  aria-label="Mostrar contraseña"
                  onClick={() => setShowContrasenia(!showContrasenia)}
                >
                    {!showContrasenia && (
                      <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18" />
                      </svg>
                    )}

                    {showContrasenia && (
                      <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
                        <path d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6" />
                      </svg>
                    )}
                </button>
              </div>
            </div>
            
            <div className="space-y-6 mb-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="switch" className="text-sm font-medium text-gray-700">Es administrador?</label>
                <div className="relative">
                  <button
                    id="switch"
                    type="button"
                    className={`flex items-center w-12 h-6 border-1 rounded-full shadow-inner cursor-pointer transition-colors duration-300 ${switchActivated ? "bg-violet-500 border-gray-400" : "bg-gray-300 border-gray-400"}`}
                    onClick={toggleSwitch}  
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white border-1 border-gray-400 rounded-full shadow ${switchActivated ? "translate-x-6" : ""} transform transition-transform duration-300 cursor-pointer`}></div>
                  </button>
                </div>
              </div>
            </div>
      
            <div className="w-full h-[1px] bg-gray-500 my-4"></div>
                  
            <button
              type="submit"
              className="w-full button"
              onClick={handleSubmit}
            >
              Editar usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}