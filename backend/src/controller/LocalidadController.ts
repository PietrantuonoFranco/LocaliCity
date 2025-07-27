import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Localidad } from "../entity/Localidad";


const localidadRepository = AppDataSource.getRepository(Localidad);

export class LocalidadController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const localidades = await localidadRepository.find();

      if (localidades.length === 0) {
        return response.status(404).json({ error: "Localidades no encontradas." });
      }

      return response.status(200).json({ mensaje: "Localidades encontradas.", localidades: localidades });
    } catch (error) {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de Localidad."});
      }

      const localidad = await localidadRepository.findOne({
        where: { id }
      });

      if (!localidad) {
        return response.status(404).json({ error: "Localidad no encontrada." });
      }

      return response.status(200).json({ mensaje: "Localidad encontrada.", localidad: localidad });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { nombre, provincia } = request.body;

      if (!nombre || !provincia) {
        return response.status(400).json({ error: "Complete todos los campos necesarios." });
      }

      const localidad = Object.assign(new Localidad(), { nombre, provincia });

      await localidadRepository.save(localidad);

      return response.status(201).json({ mensaje: "Localidad creada correctamente.", localidad: localidad });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de Localidad."});
      }

      let localidadPorRemover = await localidadRepository.findOneBy({ id });

      if (!localidadPorRemover) {
        return response.status(404).json({ error: "Localidad no encontrada." });
      }

      await localidadRepository.remove(localidadPorRemover);

      return response.status(204).json({ mensaje: "Localidad eliminada correctamente." });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }
}