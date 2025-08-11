"use client"

import { useEffect, useState } from "react"
import type Pais from "src/interfaces/PaisInterface";
import type Provincia from "src/interfaces/ProvinciaInterface";
import OptionSelect from "./OptionSelect";
import { getAllPaises } from "src/api/pais";
import { getAllProvincias } from "src/api/provincia";
import type Usuario from "src/interfaces/UsuarioInterface";
import { createSolicitud } from "src/api/solicitud";
import { getCurrentUser } from "src/api/auth";

type Option = {
  name: string;
  value: string;
  label: string;
};

type RespuestaPaises = {
  mensaje: string;
  paises: Pais[];
};

type RespuestaProvincias = {
  mensaje: string;
  provincias: Provincia[];
};

type RespuestaUsuario = {
  mensaje: string;
  usuario: Usuario;
};

export default function SolicitudForm() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [referencia, setReferencia] = useState("");
  const [pais, setPais] = useState<Pais | null>(null);
  const [provincia, setProvincia] = useState<Provincia | null>(null);
  
  const [allPaises, setAllPaises] = useState<Pais[]>([]);
  const [allProvincias, setAllProvincias] = useState<Provincia[]>([]);

  const [paisesOptions, setPaisesOptions] = useState<Option[]>([]);
  const [provinciasOptions, setProvinciasOptions] = useState<Option[]>([]);

  const allTipos = [
    { name: "default-option", value: "", label: "Seleccione lo que quiere solicitar..." },
    { name: "pais-option", value: "pais", label: "País" },
    { name: "provincia-option", value: "provincia", label: "Provincia" },
    { name: "localidad-option", value: "localidad", label: "Localidad" },
  ]

  const fetchPaises = async () => {
    try {
      const response: RespuestaPaises = await getAllPaises();

      if (response) {
        const options = [
          { name: "default-country-option", value: "", label: "Seleccione un país" }, 
          ...response.paises.map(pais => ({ 
            name: `${pais.nombre.toLowerCase()}-option`, 
            value: pais.id.toString(), 
            label: pais.nombre 
          }))
        ];

        setPaisesOptions(options);
        setAllPaises(response.paises);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchProvincias = async () => {
    try {
      const response: RespuestaProvincias = await getAllProvincias();

      if (response) {
        const options = [
          { name: "default-provincia-option", value: "", label: "Seleccione una provincia" }, 
          ...response.provincias.map(provincia => ({ 
            name: `${provincia.nombre.toLowerCase()}-option`, 
            value: provincia.id.toString(), 
            label: provincia.nombre 
          }))
        ];

        setProvinciasOptions(options);
        setAllProvincias(response.provincias);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUsuario = async () => {
    try {
      const response = await getCurrentUser();

      if (response) setUsuario(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    
    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'tipo':
        setTipo(value);
        break;
      case 'referencia':
        setReferencia(value);
        break;
      case 'mensaje':
        setMensaje(value);
        break;
      case 'pais':
        setPais(allPaises.find(p => p.id.toString() === value) || null);
        break;
      case 'provincia':
        setProvincia(allProvincias.find(p => p.id.toString() === value) || null);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async () => {
    try {
      if (usuario) {
        const response = await createSolicitud(tipo, nombre, referencia, mensaje, pais, provincia, usuario);

        if (response) {}
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsuario();
    fetchPaises();
    fetchProvincias();
  }, [])


  return (
    <form id="login-form" className="space-y-4 grid md:grid-cols-2 gap-x-10">
      <div className="flex flex-col items-center">
        {allTipos && (
          <OptionSelect 
            options={allTipos} 
            htmlFor="tipo" 
            labelValue="Tipo"
            name="tipo"
            value={tipo}
            onChange={(value) => handleInputChange({ target: { name: "tipo", value } })}
          />
        )}

        <div className="w-full space-y-2">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Nombre
          </label>
          <div className="pb-[3px] focus-within:gradient-border">
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder={tipo === "pais" ? "Argentina" : tipo === "provincia" ? "Buenos Aires" : "La Plata"}
              value={nombre}
              onChange={handleInputChange}
              required
              className="px-4 input"
            />
          </div>
        </div>

        {(tipo === "localidad" || tipo === "provincia") && paisesOptions && ( 
          <OptionSelect 
            options={paisesOptions} 
            htmlFor="pais" 
            labelValue="País"
            name="pais"
            value={pais?.id.toString() || ""}
            onChange={(value) => handleInputChange({ target: { name: "pais", value } })}
          />
        )}

        {tipo === "localidad" && provinciasOptions && ( 
          <OptionSelect 
            options={provinciasOptions} 
            htmlFor="provincia" 
            labelValue="Provincia"
            name="provincia"
            value={provincia?.id.toString() || ""}
            onChange={(value) => handleInputChange({ target: { name: "provincia", value } })}
          />
        )}
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="w-full space-y-2">
          <label htmlFor="referencia" className="text-sm font-medium text-gray-700">
            Referencia
          </label>
          <div className="pb-[3px] focus-within:gradient-border">
            <input
              id="referencia"
              name="referencia"
              type="text"
              placeholder="https://instagram.com/laplata.capital/"
              value={referencia}
              onChange={handleInputChange}
              required
              className="px-4 input"
            />
          </div>
        </div>

        <div className="w-full space-y-2">
          <label htmlFor="mensaje" className="text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <div className="pb-[3px] focus-within:gradient-border h-43">
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="La Plata es la capital de la provincia argentina de Buenos Aires..."
              value={mensaje}
              onChange={handleInputChange}
              required
              className="min-h-42.25 px-4 input"
            />
          </div>
        </div>    
          
        <div className="w-full flex items-center justify-end mt-8">
          <button
            type="submit"
            className="w-32 button"
            onClick={handleSubmit}
          >
            Crear
          </button>
        </div>
      </div>
    </form>
  )
}