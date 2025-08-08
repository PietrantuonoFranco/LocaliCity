import type Provincia from "./ProvinciaInterface"

export default interface Localidad {
    id: number,
    nombre: string,
    provincia: Provincia
}