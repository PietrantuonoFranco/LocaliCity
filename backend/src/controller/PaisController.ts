import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Pais } from "../entity/Pais";
import { Provincia } from "../entity/Provincia.js";


const paisRepository = AppDataSource.getRepository(Pais);
const provinciaRepository = AppDataSource.getRepository(Provincia);

export class PaisController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const paises = await paisRepository.find();

      if (paises.length === 0) {
        return response.status(404).json({ error: "Paises no encontrados." });
      }

      return response.status(200).json({ mensaje: "Paises encontrados.", paises: paises });
    } catch (error) {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de pais."});
      }

      const pais = await paisRepository.findOne({
        where: { id }
      });

      if (!pais) {
        return response.status(404).json({ error: "Pais no encontrado." });
      }

      return response.status(200).json({ mensaje: "Pais encontrado.", pais: pais });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async provinciasById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id)

      if (!id) return response.status(400).json({ error: "Debe proporcionar un ID de pais." });

      const provincias = await provinciaRepository.find({
        where: { pais: {id} }
      });

      if (provincias.length === 0) return response.status(404).json({ error: "Provincias no encontrados." });

      return response.status(200).json({ mensaje: "Provincias encontradas.", provincias: provincias });
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { nombre } = request.body;

      if (!nombre) {
        return response.status(400).json({ error: "Complete todos los campos necesarios." });
      }
    
      const pais = Object.assign(new Pais(), { nombre });
        
      await paisRepository.save(pais);

      return response.status(201).json({ mensaje: "Pais creado correctamente.", pais: pais });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de pais."});
      }

      let paisPorRemover = await paisRepository.findOneBy({ id });

      if (!paisPorRemover) {
        return response.status(404).json({ error: "Pais no encontrado." });
      }

      await paisRepository.remove(paisPorRemover);

      return response.status(204).json({ mensaje: "Pais eliminado correctamente." });
    } catch {
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id || id  <= 0) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de país válido."});
      }

      const { nombre } = request.body;

      if (!nombre) {
        return response.status(400).json({ 
          error: "Debe proporcionar un nombre para actualizar." 
        });
      }

      const pais = await paisRepository.findOneBy({ id });

      if (!pais) {
        return response.status(404).json({ error: "País no encontrado." });
      }

      pais.nombre = nombre;

      await paisRepository.save(pais);

      return response.status(200).json({ 
        mensaje: "País actualizado correctamente.",
        pais: pais
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }

  static async checkProvinciasById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id)

      if (!id) return response.status(400).json({ error: "Debe proporcionar un ID de pais." });

      const provincias = await provinciaRepository.find({
        where: { pais: {id} }
      });

      if (provincias.length === 0) return response.status(200).json({ mensaje: "Provincias no encontradas.", hasProvincias: false });

      return response.status(200).json({ mensaje: "Provincias encontradas.", hasProvincias: true });
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
    }
  }
}