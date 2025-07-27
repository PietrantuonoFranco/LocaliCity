import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Solicitud } from "../entity/Solicitud";


const solicitudRepository = AppDataSource.getRepository(Solicitud);

export class solicitudController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const solicitudes = await solicitudRepository.find();

      if (solicitudes.length === 0) {
        return response.status(404).json({ error: "Solicitudes no encontradas." });
      }

      return response.status(200).json({ mensaje: "Solicitudes encontradas.", solicitudes: solicitudes });
    } catch (error) {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud."});
      }

      const solicitud = await solicitudRepository.findOne({
        where: { id }
      });

      if (!solicitud) {
        return response.status(404).json({ error: "Solicitud no encontrada." });
      }

      return response.status(200).json({ mensaje: "Solicitud encontrada.", solicitud: solicitud });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { usuario, tipo, mensaje, referencia, pais, provincia, localidad } = request.body;

      if (!usuario || !tipo || (!pais && !provincia && !localidad)) {
        return response.status(400).json({ error: "Complete todos los campos necesarios." });
      }

      const solicitud = Object.assign(new Solicitud(), { usuario, tipo, mensaje, referencia, pais, provincia, localidad });

      await solicitudRepository.save(solicitud);

      return response.status(201).json({ mensaje: "Solicitud creada correctamente.", solicitud: solicitud });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud."});
      }

      let solicitudPorRemover = await solicitudRepository.findOneBy({ id });

      if (!solicitudPorRemover) {
        return response.status(404).json({ error: "Solicitud no encontrada." });
      }

      await solicitudRepository.remove(solicitudPorRemover);

      return response.status(204).json({ mensaje: "Solicitud eliminada correctamente." });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }
}