import api from "./api.ts"

import type Usuario from "../interfaces/entities/UsuarioInterface.ts";
import type { Respuesta } from "src/interfaces/RespuestasInterfaces.ts";
import { deleteCookie } from "src/utils/authUtils.ts";


const entity: string = "auth";

export const login = async (email: string, contrasenia: string) => {
  const response = await api.post(`${entity}/login`, { 
    email, 
    contrasenia
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
    
  return response.data;
};
  
export const logout = async () => {
  const response = await api.post<Respuesta>(`${entity}/logout`, {}, {
    withCredentials: true
  });

  if (response) {
    deleteCookie('authToken');
    return response.data;
  }
};

export const getCurrentUser = async (): Promise<Usuario | null> => {
  try {
    const checkAuth = await api.get<{ isAuthenticated: boolean }>(`${entity}/is-authenticated`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
    
    if (checkAuth.data.isAuthenticated) {
      const response = await api.get<{ usuario: Usuario }>(`${entity}/profile`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data.usuario;
    } else {
      return null
    }
  } catch (error) {
    console.error('Error no controlado:', error);

    return null;
  }
};

export const register = async (email: string, nombre: string, apellido: string, contrasenia: string): Promise<Usuario | null> => {
  try {
    const response = await api.post<{ usuario: Usuario }>(`${entity}/register`, { 
    email, 
    nombre,
    apellido,
    contrasenia 
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

    return response.data.usuario;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    
    return null;
  }
};