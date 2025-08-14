import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Solicitud } from "../entity/Solicitud";
import { Usuario } from "../entity/Usuario";
import { Localidad } from "../entity/Localidad";
import { Pais } from "../entity/Pais";
import { Provincia } from "../entity/Provincia"

const usuarioRepository = AppDataSource.getRepository(Usuario);
const localidadRepository = AppDataSource.getRepository(Localidad);
const paisRepository = AppDataSource.getRepository(Pais);
const provinciaRepository = AppDataSource.getRepository(Provincia);
const solicitudRepository = AppDataSource.getRepository(Solicitud);

export class SolicitudController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const solicitudes = await solicitudRepository.find({ relations: ['usuario', 'pais', 'provincia', 'localidad'] });

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

      const solicitud = new Solicitud();

      solicitud.tipo = tipo;
      solicitud.mensaje = mensaje;
      solicitud.referencia = referencia;
      solicitud.nombre = nombre;
      solicitud.usuario = user;

      if (tipo === "pais") {
        solicitud.provincia = provincia;
        solicitud.pais = pais;
      } else if (tipo === "provincia") { 
        const auxPais = await paisRepository.findOne({ where: { id: pais.id } });

        if (!auxPais) return response.status(404).json({ error: "No se reconoce al pais enviado." });

        solicitud.pais = auxPais;
        solicitud.provincia = provincia;

      } else if (tipo === "localidad") {
        const auxPais = await paisRepository.findOne({ where: { id: pais.id } });

        if (!auxPais) return response.status(404).json({ error: "No se reconoce al pais enviado." });

        const auxProvincia = await provinciaRepository.findOne({ where: { id: provincia.id } });

        if (!auxProvincia) return response.status(404).json({ error: "No se reconoce al provincia enviado." });

        solicitud.pais = auxPais;
        solicitud.provincia = auxProvincia;
      }
      
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

  static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id || id  <= 0) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud válido."});
      }

      const { tipo, mensaje, referencia, pais, nombre, provincia, estado, usuario } = request.body;

      if (!tipo && !mensaje && !referencia && !pais && !nombre && !provincia && !estado && !usuario) {
        return response.status(400).json({ 
          error: "Debe proporcionar al menos un campo para actualizar." 
        });
      }

      if (tipo === "provincia" && !pais) {
        return response.status(400).json({ 
          error: "Para tipo 'provincia' debe especificar el país." 
        });
      }

      if (tipo === "localidad" && (!provincia || !pais)) {
        return response.status(400).json({ 
          error: "Para tipo 'localidad' debe especificar provincia y país." 
        });
      }

      const solicitud = await solicitudRepository.findOneBy({ id });
      if (!solicitud) {
        return response.status(404).json({ error: "Solicitud no encontrada." });
      }

      if (tipo !== null) solicitud.tipo = tipo;
      if (mensaje !== null) solicitud.mensaje = mensaje;
      if (referencia !== null) solicitud.referencia = referencia;
      if (pais !== null) solicitud.pais = pais;
      if (nombre !== null) solicitud.nombre = nombre;
      if (provincia !== null) solicitud.provincia = provincia;
      if (estado !== null) solicitud.estado = estado;
      if (usuario !== null) solicitud.usuario = usuario;
      await solicitudRepository.save(solicitud);

      return response.status(200).json({ 
        mensaje: "Solicitud actualizada correctamente.",
        data: solicitud 
      });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async aceptarSolicitud(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id || id  <= 0) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud válido."});
      }

      const solicitud = await solicitudRepository.findOne({
        where: { id },
        relations: ['usuario', 'pais', 'provincia', 'localidad']
      });

      if (!solicitud) {
        return response.status(404).json({ error: "Solicitud no encontrada." });
      }

      if (solicitud.tipo === "pais") {
        const pais = Object.assign(new Pais(), { nombre: solicitud.nombre });

        await paisRepository.save(pais);

        solicitud.pais = pais;
        
      } else if (solicitud.tipo === "provincia") { 
        const pais = await paisRepository.findOne({ where: { id: solicitud.pais.id } });

        const provincia = Object.assign(new Provincia(), { nombre: solicitud.nombre, pais });

        await provinciaRepository.save(provincia);

        solicitud.provincia = provincia;

      } else if (solicitud.tipo === "localidad") {
        const provincia = await provinciaRepository.findOne({ where: { id: solicitud.provincia.id } });

        const localidad = Object.assign(new Localidad(), { nombre: solicitud.nombre, provincia });

        await localidadRepository.save(localidad);

        solicitud.localidad = localidad;
      }

      solicitud.estado = "Aceptada";

      await solicitudRepository.save(solicitud);

      return response.status(200).json({ 
        mensaje: "Solicitud actualizada correctamente.",
        data: solicitud 
      });
    } catch (error) {
      console.error(error);

      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }
}