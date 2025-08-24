"use client";

import { useState, useEffect, useRef } from "react";
import { getAllByWord } from "src/api/search";

import type Localidad from "src/interfaces/entities/LocalidadInterface";
import type Pais from "src/interfaces/entities/PaisInterface";
import type Provincia from "src/interfaces/entities/ProvinciaInterface";


export default function MainSearchBar() {
  const [paises, setPaises] = useState<Pais[]>([])
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [localidades, setLocalidades] = useState<Localidad[]>([])
  const [palabra, setPalabra] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = async (value: string) => {
    if (value.trim() !== "") {
      const response = await getAllByWord(value)
      
      setPaises(response.paises);
      setProvincias(response.provincias);
      setLocalidades(response.localidades);
    } else {
      setPaises([]);
      setProvincias([]);
      setLocalidades([]);
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
    <>
      <div className="w-full flex md:flex-row items-center justify-center gap-2">
        <div className="w-full md:w-[35rem] relative pb-[3px] focus-within:gradient-border">
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

        <button className="button px-3 md:px-4 py-2.5">
          {/* Icon in mobile */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline md:hidden" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21.048 3.053C18.87.707 2.486 6.453 2.5 8.55c.015 2.379 6.398 3.11 8.167 3.607c1.064.299 1.349.604 1.594 1.72c1.111 5.052 1.67 7.566 2.94 7.622c2.027.09 7.972-16.158 5.847-18.447M11.5 12.5L15 9" />
          </svg>

          {/* Text in desktop */}
          <span className="hidden md:inline">Buscar</span>
        </button>
      </div>

      {(paises.length > 0 || provincias.length > 0 || localidades.length > 0) && (() => {
        const items = [
          ...paises.map(p => ({ ...p, tipo: "pais" })),
          ...provincias.map(p => ({ ...p, tipo: "provincia" })),
          ...localidades.map(l => ({ ...l, tipo: "localidad" }))
        ];

        const maxVisible = 5;
        const itemHeight = 42;
        const containerHeight = itemHeight * maxVisible;

        return (
          <div
            className="mt-2 w-full md:w-[40.5rem] flex flex-col justify-start items-center bg-white/75 border border-gray-500 rounded-xl  custom-scrollbar"
            style={{
              maxHeight: items.length > maxVisible ? `${containerHeight}px` : "auto",
              overflowY: items.length > maxVisible ? "auto" : "visible",
            }}
          >
            {items.map((item, i) => {
              const isFirst = i === 0;
              const isLast = i === items.length - 1;
              const isSingle = items.length === 1;

              return (
                <div
                  key={`${item.tipo}-${item.id}`}
                  className={`w-full flex items-center gap-2 py-2 px-4 border-1 border-transparent hover:bg-white/50 hover:border-gray-200 hover:shadow-sm
                    ${isSingle ? "rounded-xl" : ""}
                    ${isFirst && !isSingle ? "rounded-t-xl" : ""}
                    ${isLast && !isSingle ? "rounded-b-xl" : ""}
                  `}
                >
                  {item.tipo === "pais" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22C6.477 22 2 17.523 2 12a9.97 9.97 0 0 1 2.99-7.132M12 22c-.963-.714-.81-1.544-.326-2.375c.743-1.278.743-1.278.743-2.98c0-1.704 1.012-2.502 4.583-1.788c1.605.321 2.774-1.896 4.857-1.164M12 22c4.946 0 9.053-3.59 9.857-8.307m0 0Q22 12.867 22 12c0-4.881-3.498-8.946-8.123-9.824m0 0c.51.94.305 2.06-.774 2.487c-1.76.697-.5 1.98-2 2.773c-1 .528-2.499.396-3.998-1.189c-.79-.834-1.265-1.29-2.115-1.379m8.887-2.692A10 10 0 0 0 12 2a9.97 9.97 0 0 0-7.01 2.868"></path>
                    </svg>
                  ) : item.tipo === "provincia" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5.253 4.196l-1.227.712c-.989.573-1.483.86-1.754 1.337C2 6.722 2 7.302 2 8.464v8.164c0 1.526 0 2.29.342 2.714c.228.282.547.472.9.535c.53.095 1.18-.282 2.478-1.035c.882-.511 1.73-1.043 2.785-.898c.48.065.937.293 1.853.748l3.813 1.896c.825.41.833.412 1.75.412H18c1.886 0 2.828 0 3.414-.599c.586-.598.586-1.562.586-3.49v-6.74c0-1.927 0-2.89-.586-3.49c-.586-.598-1.528-.598-3.414-.598h-2.079c-.917 0-.925-.002-1.75-.412L10.84 4.015C9.449 3.323 8.753 2.977 8.012 3S6.6 3.415 5.253 4.196M15 6.5v14m-7-17v14"></path>
                    </svg>
                  ) : item.tipo === "localidad" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                        <path d="M22 10v-.783c0-1.94 0-2.909-.586-3.512c-.586-.602-1.528-.602-3.414-.602h-2.079c-.917 0-.925-.002-1.75-.415L10.84 3.021c-1.391-.696-2.087-1.044-2.828-1.02S6.6 2.418 5.253 3.204l-1.227.716c-.989.577-1.483.866-1.754 1.346C2 5.746 2 6.33 2 7.499v8.217c0 1.535 0 2.303.342 2.73c.228.285.547.476.9.54c.53.095 1.18-.284 2.478-1.042c.882-.515 1.73-1.05 2.785-.905c.884.122 1.705.68 2.495 1.075M8 2v15m7-12v4.5"></path>
                        <path d="M18.308 21.684A1.18 1.18 0 0 1 17.5 22c-.302 0-.591-.113-.808-.317c-1.986-1.87-4.646-3.96-3.349-6.993C14.045 13.05 15.73 12 17.5 12s3.456 1.05 4.157 2.69c1.296 3.03-1.358 5.13-3.349 6.993M17.5 16.5h.009"></path>
                      </g>
                    </svg>
                  ) : ""}
                  {item.nombre}
                </div>
              );
            })}
          </div>
        );
      })()}
    </>
  ); 
}