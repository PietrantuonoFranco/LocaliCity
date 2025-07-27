import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Provincia } from "../entity/Provincia.js";


const provinciaRepository = AppDataSource.getRepository(Provincia);

export class ProvinciaController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const provincias = await provinciaRepository.find();

      if (provincias.length === 0) {
        return response.status(404).json({ error: "Provincias no encontradas." });
      }

      return response.status(200).json({ mensaje: "Provincias encontradas.", provincias: provincias });
    } catch (error) {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de provincia."});
      }

      const provincia = await provinciaRepository.findOne({
        where: { id }
      });

      if (!provincia) {
        return response.status(404).json({ error: "provincia no encontrada." });
      }

      return response.status(200).json({ mensaje: "Provincia encontrada.", provincia: provincia });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { nombre, pais } = request.body;

      if (!nombre || !pais) {
        return response.status(400).json({ error: "Complete todos los campos necesarios." });
      }
    
      const provincia = Object.assign(new Provincia(), { nombre, pais });
        
      await provinciaRepository.save(provincia);

      return response.status(201).json({ mensaje: "Provincia creada correctamente.", provincia: provincia });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de provincia."});
      }

      let provinciaPorRemover = await provinciaRepository.findOneBy({ id });

      if (!provinciaPorRemover) {
        return response.status(404).json({ error: "Provincia no encontrada." });
      }

      await provinciaRepository.remove(provinciaPorRemover);

      return response.status(204).json({ mensaje: "Provincia eliminada correctamente." });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }
}