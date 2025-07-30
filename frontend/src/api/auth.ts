import api from "./api.ts"
import type Usuario from "../interfaces/UsuarioInterface";

const entity: string = "auth";

export const login = async (email: string, password: string) => {
  const response = await api.post(`${entity}/login`, { 
    email, 
    password 
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
    
  return response.data;
};
  
export const logout = async () => {
  const response = await api.post(`${entity}/logout`, {}, {
    withCredentials: true
  });

  return await response.data;
};

export const getCurrentUser = async (): Promise<Usuario | null> => {
  try {
    const response = await api.get<{ usuario: Usuario }>(`${entity}/profile`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data.usuario;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    
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