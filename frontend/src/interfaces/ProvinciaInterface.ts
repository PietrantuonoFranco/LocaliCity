import type Pais from "./PaisInterface"

export default interface Provincia {
    id: number,
    nombre: string,
    pais: Pais
}