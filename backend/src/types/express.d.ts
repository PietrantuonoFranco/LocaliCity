import { Usuario } from "../entity/Usuario"

declare global {
    namespace Express {
        interface Request {
            user?: Usuario;
        }
    }
}