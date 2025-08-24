import { AppDataSource } from "../data-source";
import { Rol } from "../entity/Rol";
import { Usuario } from "../entity/Usuario";

const usuarioRepository = AppDataSource.getRepository(Usuario);

export default async function usuarioSeed () {
  if ((await AppDataSource.manager.find( Usuario )).length > 0) return null
  
  const adminRol = await getRolByName("Administrador");
  const regularRol = await getRolByName("Regular");

  if (!adminRol || !regularRol) throw Error("No se han podido encontrar los roles.");

  await createUsuario(
    "admin@example.com",
    "Jhon",
    "Doe",
    "admin123",
    adminRol
  );

  await createUsuario(
    "normie@example.com",
    "Juan",
    "Pérez",
    "normie123",
    regularRol
  );
  
  console.log("Seed de usuarios completado exitosamente");
}

const createUsuario = async (
  email: string,
  nombre: string,
  apellido: string,
  contrasenia: string,
  rol: Rol
) => {
  try {
    if (!email || !nombre || !apellido || !contrasenia || !rol) {
      throw Error("Debe ingresar todos los datos")
    }
  
    const usuario = Object.assign(new Usuario(), {
      email,
      nombre,
      apellido,
      contrasenia,
      rol
    });

    await usuario.hashContrasenia();
    await usuarioRepository.save(usuario);
    
    console.log(`Usuario ${email} creado exitosamente`);
  } catch (error) {
    console.error(`Error creando usuario ${email}:`, error);
    throw error;
  }
}

const getRolByName = async (nombre: string): Promise<Rol | null> => {
  try {
    if (!nombre) throw Error("Debe proporcionar un nombre para buscar el rol.");

    const rol = await AppDataSource.manager.findOne( Rol, { where: { nombre: nombre } } );

    
    if (!rol) throw Error("No se ha encontrado el rol.");

    return rol
  } catch (error) { {
    console.error(`Error buscando rol '${nombre}':`, error);
    return null;
  }
  }
}