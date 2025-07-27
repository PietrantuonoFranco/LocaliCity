import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Rol } from "../entity/Rol";


const rolRepository = AppDataSource.getRepository(Rol);

export class RolController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const roles = await rolRepository.find();

      if (roles.length === 0) {
        return response.status(404).json({ error: "Roles no encontrados." });
      }

      return response.status(200).json({ mensaje: "Roles encontrados.", roles: roles });
    } catch (error) {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de Rol."});
      }

      const rol = await rolRepository.findOne({
        where: { id }
      });

      if (!rol) {
        return response.status(404).json({ error: "Rol no encontrado." });
      }

      return response.status(200).json({ mensaje: "Rol encontrado.", rol: rol });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { nombre } = request.body;

      if (!nombre) {
        return response.status(400).json({ error: "Complete todos los campos necesarios." });
      }
    
      const rol = Object.assign(new Rol(), { nombre });
        
      await rolRepository.save(rol);

      return response.status(201).json({ mensaje: "Rol creado correctamente.", rol: rol });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de Rol."});
      }

      let rolPorRemover = await rolRepository.findOneBy({ id });

      if (!rolPorRemover) {
        return response.status(404).json({ error: "Rol no encontrado." });
      }

      await rolRepository.remove(rolPorRemover);

      return response.status(204).json({ mensaje: "Rol eliminado correctamente." });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }
}