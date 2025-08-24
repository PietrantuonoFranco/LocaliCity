import { AppDataSource } from "../data-source";
import { Rol } from "../entity/Rol";


const rolRepository = AppDataSource.getRepository(Rol);

export default async function rolSeed () {
  if ((await rolRepository.find()).length > 0) return null
  
  await createRol("Regular");

  await createRol("Administrador");
  
  console.log("Seed de roles completado exitosamente");
}

const createRol = async (nombre: string) => {
  try {
    if (!nombre) throw Error("Debe ingresar un nombre para crear el rol");
  
    const rol = Object.assign(new Rol(), { nombre });

    await rolRepository.save(rol);

    console.log(`Rol ${nombre} creado exitosamente`);
  } catch (error) {
    console.error(`Error creando el rol ${nombre}:`, error);
    throw error;
  }
}