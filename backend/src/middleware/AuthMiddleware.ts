import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import "dotenv"


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.authToken;
      
        if (!token) {
            return res.status(401).json({ message: 'No autenticado - No hay token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        
        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const usuario = await usuarioRepository.findOne({ 
            where: { id: decoded.id },
            relations: ['rol']
        });

        console.log(usuario)

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        req.user = usuario;

        next();
    } catch (error) {
        console.error('Error en autenticación:', error);
        return res.status(401).json({ message: 'No autenticado - Token inválido' });
    }
};