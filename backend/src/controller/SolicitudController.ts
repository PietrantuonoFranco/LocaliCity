import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Solicitud } from "../entity/Solicitud";
import { Usuario } from "../entity/Usuario.js";

const usuarioRepository = AppDataSource.getRepository(Usuario);
const solicitudRepository = AppDataSource.getRepository(Solicitud);

export class SolicitudController {
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
      const { tipo, mensaje, referencia, pais, nombre, provincia, usuario } = request.body;

      if (!nombre || !usuario || !tipo ||!referencia || !mensaje || (tipo === "provincia" && !pais) || (tipo === "localidad" && !provincia && !pais)) {
        return response.status(400).json({ error: "Complete todos los campos necesarios." });
      }

      const user = await usuarioRepository.findOne({ where: {id: usuario.id}})

      if (!user) return response.status(404).json({ error: "No se reconoce al usuario enviado." });

      const solicitud = Object.assign(new Solicitud(), { tipo, mensaje, referencia, pais, nombre, provincia, user });

      await solicitudRepository.save(solicitud);

      return response.status(201).json({ mensaje: "Solicitud creada correctamente.", solicitud: solicitud });
    } catch (error) {
      console.log(error)
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