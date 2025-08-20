import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

import { Rol } from "../entity/Rol";

const usuarioRepository = AppDataSource.getRepository(Usuario);
const rolRepository = AppDataSource.getRepository(Rol);

const jwtSecret = process.env.JWT_SECRET || "your-secret-key";

export class AuthController {
  static async register(request: Request, response: Response) {
    try {
      const { email, contrasenia, nombre, apellido } = request.body;
      
      if (!email || !contrasenia || !nombre || !apellido) {
          return response.status(400).json({ 
              mensaje: "Todos los campos son requeridos: email, contraseña, nombre y apellido" 
          });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return response.status(400).json({ 
              mensaje: "El formato del email no es válido" 
          });
      }

      if (contrasenia.length < 8) {
          return response.status(400).json({ 
              mensaje: "La contraseña debe tener al menos 8 caracteres" 
          });
      }

      let usuario = await usuarioRepository.findOne({ where: { email } });
      
      if (usuario) {
        return response.status(400).json({ mensaje: "Ya existe un usuario con ese nombre." });
      }

      let rol = await rolRepository.findOne({ where: { nombre: "Regular" } });

      if (!rol) {
        return response.status(400).json({ mensaje: "Rol inexistente" });
      }

      usuario = new Usuario();
      usuario.email = email;
      usuario.contrasenia = contrasenia;
      usuario.nombre = nombre;
      usuario.apellido = apellido;
      usuario.rol = rol;
      
      await usuario.hashContrasenia();
      await usuarioRepository.save(usuario);

      const token = jwt.sign({ 
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        contrasenia: usuario.contrasenia,
        rol: usuario.rol
      }, jwtSecret, {
        expiresIn: "1h",
      });

      return response
        .status(201)
        .cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        })
        .json({ 
          usuario: {
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol
          }
        });
    } catch (error) {
      console.log(error);

      return response.status(500).json({ mensaje: "Internal server error" });
    }
  }

  static async login(request: Request, response: Response) {
    try {
      const { email, contrasenia } = request.body;
      
      if (!email || !contrasenia) {
        return response.status(400).json({ 
          mensaje: "Debe ingresar el email y la contraseña." 
        });
      }

      const usuario = await usuarioRepository.findOne({ where: { email } });
      
      if (!usuario) {
        return response.status(404).json({ mensaje: "Usuario no encontrado." });
      }

      const isValid = await usuario.compareContrasenia(contrasenia);

      if (!isValid) {
        return response.status(401).json({ mensaje: "Credenciales inválidas" });
      }

      const token = jwt.sign({ 
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        contrasenia: usuario.contrasenia,
        rol: usuario.rol
      }, jwtSecret, {
        expiresIn: "1h",
      });

      return response
        .status(200)
        .cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        })
        .json({ 
          usuario: {
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol
          }
        });
    } catch (error) {
      console.error("Login error:", error);
      
      return response.status(500).json({ 
        mensaje: "Internal server error",
        error: error
      });
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("authToken");
    
    return res.status(200).json({ mensaje: "Sesión cerrada exitosamente." });
  }

  static async profile(request: Request, response: Response) {
    try {
      const usuario = request.user as Usuario;

      return response.json({ usuario: usuario });
    } catch (error) {
      console.log(error);
      
      return response.status(500).json({ mensaje: "Internal server error" });
    }
  }

  static async checkAuth (req: Request, res: Response) {
    if (!req.cookies.authToken) {
        return res.status(200).json({ isAuthenticated: false });
    }

    return res.status(200).json({ isAuthenticated: true });
  }

  static async update(request: Request, response: Response) {
    try {
      const { usuario, email, nombre, apellido, contrasenia, rol } = request.body;
  
      if (!usuario) {
        return response.status(400).json({ error: "Debe proporcionar el usuario." });
      }

      if (!email && !nombre && !apellido && !contrasenia && !rol) {
        return response.status(400).json({ 
          error: "Debe proporcionar al menos un campo para actualizar." 
        });
      }
  
      if (email !== null) usuario.email = email;
      if (nombre !== null) usuario.nombre = nombre;
      if (apellido !== null) usuario.apellido = apellido;

      if (contrasenia !== null) {
        usuario.contrasenia = contrasenia;
        
        await usuario.hashContrasenia();
      }

      await usuarioRepository.save(usuario);
  
      return response.status(200).json({ 
        mensaje: "Usuario actualizado correctamente.",
        usuario: usuario 
      });
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }
}