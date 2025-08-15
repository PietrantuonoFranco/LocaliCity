"use client";

import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "src/api/auth";
import { getAllLocalidades } from "src/api/localidad";
import { getAllPaises } from "src/api/pais";
import { getAllProvincias } from "src/api/provincia";
import { getAllSolicitudes } from "src/api/solicitud";
import { getAllUsuarios, getSolicitudesOfUser } from "src/api/usuario";
import {
  getLocalidadesByWord,
  getPaisesByWord,
  getProvinciasByWord,
  getSolicitudesByWord,
  getSolicitudesOfUsuarioByWord,
  getUsuariosByWord,
} from "src/api/search";

import type Localidad from "src/interfaces/entities/LocalidadInterface";
import type Pais from "src/interfaces/entities/PaisInterface";
import type Provincia from "src/interfaces/entities/ProvinciaInterface";
import type Solicitud from "src/interfaces/entities/SolicitudInterface";
import type Usuario from "src/interfaces/entities/UsuarioInterface";

interface Parametres {
  type: string;
  elements: Usuario[] | Solicitud[] | Pais[] | Provincia[] | Localidad[] | null;
  setElements: (data: any) => void;
}

export default function SearchBar({ type, elements, setElements }: Parametres) {
  const [palabra, setPalabra] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = async (value: string) => {
    if (value.trim() !== "") {
      switch (type) {
        case "paises":
          getPaisesByWord(value).then((res) => setElements(res.paises));
          break;
        case "provincias":
          getProvinciasByWord(value).then((res) => setElements(res.provincias));
          break;
        case "localidades":
          getLocalidadesByWord(value).then((res) => setElements(res.localidades));
          break;
        case "usuarios":
          getUsuariosByWord(value).then((res) => setElements(res.usuarios));
          break;
        case "solicitudes":
          getSolicitudesByWord(value).then((res) => setElements(res.solicitudes));
          break;
        case "usuario-solicitudes":
          const usuario = await getCurrentUser();
          if (usuario)
            getSolicitudesOfUsuarioByWord(usuario.id, value).then((res) =>
              setElements(res.solicitudes)
            );
          break;
      }
    } else {
      switch (type) {
        case "paises":
          getAllPaises().then((res) => setElements(res.paises));
          break;
        case "provincias":
          getAllProvincias().then((res) => setElements(res.provincias));
          break;
        case "localidades":
          getAllLocalidades().then((res) => setElements(res.localidades));
          break;
        case "usuarios":
          getAllUsuarios().then((res) => setElements(res.usuarios));
          break;
        case "solicitudes":
          getAllSolicitudes().then((res) => setElements(res.solicitudes));
          break;
        case "usuario-solicitudes":
          const usuario = await getCurrentUser();
          if (usuario)
            getSolicitudesOfUser(usuario.id).then((res) =>
              setElements(res.solicitudes)
            );
          break;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPalabra(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 1000); // debounce de 1 segundo
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // cancelamos el debounce
      performSearch(palabra); // ejecutamos inmediatamente
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="w-76 relative pb-[3px] focus-within:gradient-border">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 absolute top-[45%] -translate-y-1/2 left-2.5 md:left-3 z-10"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m14 14l2.5 2.5m-.067 2.025a1.48 1.48 0 1 1 2.092-2.092l3.042 3.042a1.48 1.48 0 1 1-2.092 2.092zM16 9A7 7 0 1 0 2 9a7 7 0 0 0 14 0"
        />
      </svg>

      <input
        type="text"
        value={palabra}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="pl-10.5 md:pl-12 pr-4 md:text-base input"
        placeholder="Buscar paises, provincias, localidades..."
      />
    </div>
  );
}