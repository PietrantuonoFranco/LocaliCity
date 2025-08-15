import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Brackets, ILike } from "typeorm"; 

// Entities
import { Localidad } from "../entity/Localidad";
import { Pais } from "../entity/Pais";
import { Provincia } from "../entity/Provincia"
import { Solicitud } from "../entity/Solicitud";
import { Usuario } from "../entity/Usuario";

// Repositories
const localidadRepository = AppDataSource.getRepository(Localidad);
const paisRepository = AppDataSource.getRepository(Pais);
const provinciaRepository = AppDataSource.getRepository(Provincia);
const solicitudRepository = AppDataSource.getRepository(Solicitud);
const usuarioRepository = AppDataSource.getRepository(Usuario);


export class SearchController {
  static async all(request: Request, response: Response) {
    try {
      const palabra = request.params.palabra;
    
      if (!palabra) {
        return response.status(400).json({ error: "No se ha proporcionado una palabra." });
      }

      // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
      const searchPattern = `%${palabra}%`;
      
      // Búsqueda en países
      const paises = await paisRepository.find({ 
        where: { 
          nombre: ILike(searchPattern) 
        } 
      });

      // Búsqueda en provincias (con relación a país)
      const provincias = await provinciaRepository.find({
        where: { 
          nombre: ILike(searchPattern) 
        },
        relations: ['pais']
      });

      // Búsqueda en localidades (con relación a provincia y país)
      const localidades = await localidadRepository.find({
        where: { 
          nombre: ILike(searchPattern) 
        },
        relations: ['provincia', 'provincia.pais']
      });
    
      if (paises.length === 0 && provincias.length === 0 && localidades.length === 0) {
        return response.status(404).json({ error: "No se encontraron resultados." });
      }
    
      return response.status(200).json({ 
        mensaje: "Datos encontrados.", 
        paises, 
        provincias, 
        localidades 
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ 
        error: "Error interno del servidor",
        detalle: error
      });
    }
  }


  static async paises(request: Request, response: Response) {
    try {
      const palabra = request.params.palabra;
    
      if (!palabra) {
        return response.status(400).json({ error: "No se ha proporcionado una palabra." });
      }

      // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
      const searchPattern = `%${palabra}%`;
      
      // Búsqueda en países
      const paises = await paisRepository.find({ 
        where: { 
          nombre: ILike(searchPattern) 
        } 
      });
    
      if (paises.length === 0) {
        return response.status(404).json({ error: "No se encontraron resultados." });
      }
    
      return response.status(200).json({ 
        mensaje: "Datos encontrados.", 
        paises
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ 
        error: "Error interno del servidor",
        detalle: error
      });
    }
  }


  static async provincias(request: Request, response: Response) {
    try {
      const palabra = request.params.palabra;
    
      if (!palabra) {
        return response.status(400).json({ error: "No se ha proporcionado una palabra." });
      }

      // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
      const searchPattern = `%${palabra}%`;


      // Búsqueda en provincias (con relación a país)
      const provincias = await provinciaRepository.find({
        where: { 
          nombre: ILike(searchPattern) 
        },
        relations: ['pais']
      });
    
      if (provincias.length === 0) {
        return response.status(404).json({ error: "No se encontraron resultados." });
      }
    
      return response.status(200).json({ 
        mensaje: "Datos encontrados.",
        provincias
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ 
        error: "Error interno del servidor",
        detalle: error
      });
    }
  }


  static async localidades(request: Request, response: Response) {
    try {
      const palabra = request.params.palabra;
    
      if (!palabra) {
        return response.status(400).json({ error: "No se ha proporcionado una palabra." });
      }

      // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
      const searchPattern = `%${palabra}%`;

      // Búsqueda en localidades (con relación a provincia y país)
      const localidades = await localidadRepository.find({
        where: { 
          nombre: ILike(searchPattern) 
        },
        relations: ['provincia', 'provincia.pais'] // Relaciones anidadas
      });
    
      if (localidades.length === 0) {
        return response.status(404).json({ error: "No se encontraron resultados." });
      }
    
      return response.status(200).json({ 
        mensaje: "Datos encontrados.",
        localidades 
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ 
        error: "Error interno del servidor",
        detalle: error
      });
    }
  }

  static async usuarios(request: Request, response: Response) {
    try {
      const palabra = request.params.palabra;
    
      if (!palabra) {
        return response.status(400).json({ error: "No se ha proporcionado una palabra." });
      }

      // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
      const searchPattern = `%${palabra}%`;

      const usuarios = await usuarioRepository.find({
        where: [
          { email: ILike(searchPattern) },
          { nombre: ILike(searchPattern) },
          { apellido: ILike(searchPattern) }
        ],
        relations: ['rol']
      });
    
      if (usuarios.length === 0) {
        return response.status(404).json({ error: "No se encontraron resultados." });
      }
    
      return response.status(200).json({ 
        mensaje: "Datos encontrados.",
        usuarios
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ 
        error: "Error interno del servidor",
        detalle: error
      });
    }
  }

  static async solicitudes(request: Request, response: Response) {
    try {
      const palabra = request.params.palabra;
    
      if (!palabra) {
        return response.status(400).json({ error: "No se ha proporcionado una palabra." });
      }

      // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
      const searchPattern = `%${palabra}%`;

      const solicitudes = await solicitudRepository
        .createQueryBuilder('solicitud')
        .leftJoinAndSelect('solicitud.usuario', 'usuario')
        .leftJoinAndSelect('solicitud.pais', 'pais')
        .leftJoinAndSelect('solicitud.provincia', 'provincia')
        .leftJoinAndSelect('solicitud.localidad', 'localidad')
        .where('solicitud.nombre ILike :search', { search: searchPattern })
        .orWhere('usuario.email ILike :search', { search: searchPattern })
        .orWhere('usuario.nombre ILike :search', { search: searchPattern })
        .orWhere('usuario.apellido ILike :search', { search: searchPattern })
        .orWhere('pais.nombre ILike :search', { search: searchPattern })
        .orWhere('provincia.nombre ILike :search', { search: searchPattern })
        .orWhere('localidad.nombre ILike :search', { search: searchPattern })
        .getMany();
    
      if (solicitudes.length === 0) {
        return response.status(404).json({ error: "No se encontraron resultados." });
      }
    
      return response.status(200).json({ 
        mensaje: "Datos encontrados.",
        solicitudes
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ 
        error: "Error interno del servidor",
        detalle: error
      });
    }
  }

  static async usuarioSolicitudes(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id);
      const palabra = request.params.palabra;

      if (!id) {
        return response.status(400).json({ error: "No se ha proporcionado un ID de Usuario."});
      }

      if (!palabra) {
        return response.status(400).json({ error: "No se ha proporcionado una palabra." });
      }

      const usuario = await usuarioRepository.findOneBy({ id });
      if (!usuario) return response.status(404).json({ error: "Usuario no encontrado." });

      const searchPattern = `%${palabra}%`;

      const solicitudes = await solicitudRepository
        .createQueryBuilder('solicitud')
        .leftJoinAndSelect('solicitud.usuario', 'usuario')
        .leftJoinAndSelect('solicitud.pais', 'pais')
        .leftJoinAndSelect('solicitud.provincia', 'provincia')
        .leftJoinAndSelect('solicitud.localidad', 'localidad')
        .where('usuario.id = :usuarioId', { usuarioId: id })
        .andWhere(new Brackets(qb => {
          qb.where('solicitud.nombre ILike :search', { search: searchPattern })
            .orWhere('pais.nombre ILike :search', { search: searchPattern })
            .orWhere('provincia.nombre ILike :search', { search: searchPattern })
            .orWhere('localidad.nombre ILike :search', { search: searchPattern })
        }))
        .getMany();
    
      if (solicitudes.length === 0) {
        return response.status(404).json({ 
          error: "No se encontraron solicitudes para este usuario con los criterios de búsqueda." 
        });
      }
    
      return response.status(200).json({ 
        mensaje: "Solicitudes encontradas.",
        solicitudes
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ 
        error: "Error interno del servidor",
        detalle: error
      });
    }
}
}