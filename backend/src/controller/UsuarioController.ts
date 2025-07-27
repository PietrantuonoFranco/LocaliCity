import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { Usuario } from "../entity/Usuario"
import "dotenv"


const usuarioRepository = AppDataSource.getRepository(Usuario);

export class UsuarioController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const usuarios = await usuarioRepository.find();

      if (usuarios.length === 0) {
        return response.status(404).json({ error: "Usuarios no encontrados." });
      }

      return response.status(200).json({ mensaje: "Usuarios encontrados.", usuarios: usuarios });
    } catch (error) {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

    
  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(500).json({ error: "No se ha proporcionado un ID de Usuario."});
      }

      const usuario = await usuarioRepository.findOne({
        where: { id }
      });

      if (!usuario) {
        return response.status(404).json({ error: "Usuario no encontrado." });
      }

      return response.status(200).json({ mensaje: "Usuario encontrado.", usuario: usuario });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        email,
        nombre,
        apellido,
        contrasenia,
        rol,
      } = request.body;

      if (!email || !nombre || !apellido || !contrasenia || !rol) {
        return response.status(400).json({ error: "Complete todos los campos necesarios." });
      }

      let usuario = await usuarioRepository.findOne({ where: { email } });
      
      if (usuario) {
        return response.status(400).json({ mensaje: "Ya existe un Usuario con ese email." });
      }

      usuario = Object.assign(new Usuario(), {
        email,
        nombre,
        apellido,
        contrasenia,
        rol
      });

      await usuario.hashContrasenia();
      await usuarioRepository.save(usuario);

      return response.status(201).json({ mensaje: "Usuario creado correctamente.", usuario: usuario });
    } catch (error) {
      return response.status(500).json({ mensaje: "Se ha producido un error interno del servidor." });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de Usuario."});
      }

      let usuarioPorRemover = await usuarioRepository.findOneBy({ id });

      if (!usuarioPorRemover) {
        return response.status(404).json({ error: "Usuario no encontrado." });
      }

      await usuarioRepository.remove(usuarioPorRemover);

      return response.status(204).json({ mensaje: "Usuario eliminado correctamente." });
    } catch (error) {
      return response.status(500).json({ mensaje: "Se ha producido un error interno del servidor." });
    }
  }
}