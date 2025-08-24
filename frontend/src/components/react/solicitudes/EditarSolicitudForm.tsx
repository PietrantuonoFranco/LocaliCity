"use client"

// Hooks
import { useEffect, useState } from "react";
// Axios functions
import { checkProvinciasByPaisId, getAllPaises, getProvinciasByPaisId } from "src/api/pais";
import { createSolicitud, getSolicitudById, updateSolicitud } from "src/api/solicitud";
import { getCurrentUser } from "src/api/auth";
// Components
import OptionSelect from "../OptionSelect";
// Types
import type { RespuestaPaises } from "src/interfaces/RespuestasInterfaces";
import type Usuario from "src/interfaces/entities/UsuarioInterface";
import type Pais from "src/interfaces/entities/PaisInterface";
import type Provincia from "src/interfaces/entities/ProvinciaInterface";
import type Option from "src/interfaces/OptionInterface";

type Props = {
  id: number
}

export default function EditSolicitudForm({ id }: Props) {
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

  const fetchSolicitud = async () => {
    try {
      const response = await getSolicitudById(id);

      if (response) {
        setTipo(response.solicitud.tipo);
        setNombre(response.solicitud.nombre);
        setReferencia(response.solicitud.referencia);
        setMensaje(response.solicitud.mensaje);

        if (response.solicitud.pais) {
          setPais(response.solicitud.pais);
        }

        if (response.solicitud.provincia) {
          setProvincia(response.solicitud.provincia);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPaises = async () => {
    try {
      const response= await getAllPaises();

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

  const fetchUsuario = async () => {
    try {
      const response = await getCurrentUser();

      if (response) setUsuario(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchProvinciasByPaisId = async () => {
      setAllProvincias([]);
      setDefaultProvincias()

      if (pais) {
        if (await checkPaisHasProvincias (pais.id)) {

          const response = await getProvinciasByPaisId(pais.id);

          if (response.provincias.length > 0) {
            setAllProvincias(response.provincias);
            // Actualiza las opciones del select
            const options = [
              { name: "default-provincia-option", value: "", label: "Seleccione una provincia" }, 
              ...response.provincias.map(provincia => ({ 
                name: `${provincia.nombre.toLowerCase()}-option`, 
                value: provincia.id.toString(), 
                label: provincia.nombre 
              }))
            ];
            setProvinciasOptions(options);
          }
        }
      }
    }

    const setDefaultProvincias = () => {
      setAllProvincias([]);
        setProvinciasOptions([{ 
          name: "default-provincia-option", 
          value: "", 
          label: "Seleccione un país primero" 
        }]);
    }
  
    const checkPaisHasProvincias = async (id: number) => {
      const response = await checkProvinciasByPaisId(id);

      return response ? response.hasProvincias : false
    }


    fetchProvinciasByPaisId();
  }, [pais])

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
        setProvincia(null); // <-- Resetear provincia al cambiar país
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
        const response = await updateSolicitud(id, tipo, nombre, referencia, mensaje, pais, provincia);

        if (response?.solicitud) {
          window.location.href = "/cuenta";
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsuario();
    fetchPaises();
    fetchSolicitud();
  }, [])


  return (
    <form id="solicitud-form" className="space-y-4 grid md:grid-cols-2 gap-x-10">
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
            disabled={!pais || allProvincias.length === 0}
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
            Editar
          </button>
        </div>
      </div>
    </form>
  )
}