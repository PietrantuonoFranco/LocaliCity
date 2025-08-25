"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "src/api/auth";

interface UserData {
  email: string;
  nombre: string;
  apellido: string;
}

export default function MiCuenta() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    apellido: ""
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();

        if (data) {
          setUserData(data);
          setFormData({
            email: data.email || "",
            nombre: data.nombre || "",
            apellido: data.apellido || ""
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const resetForm = () => {
    if (userData) {
      setFormData({
        email: userData.email || "",
        nombre: userData.nombre || "",
        apellido: userData.apellido || ""
      });
    }
    setEditingField(null);
  };

  const handleSubmit = () => {
    // Lógica para guardar cambios
    console.log("Datos a guardar:", formData);
    // Aquí iría tu llamada a la API para actualizar
  };

  const changeField = (fieldId: string) => {
    setEditingField(fieldId === editingField ? null : fieldId);
  }

  if (isLoading) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  if (!userData) {
    return <div>No se pudo cargar la información del usuario</div>;
  }

  return (
    <>
      {userData && (
        <div className="w-full border-1 border-gray-200 shadow-md bg-white/50 rounded-2xl w-full py-10 px-12">
          <div className="h-full flex flex-col">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Información personal</h2>
            </div>

            <div className="w-full h-[1px] bg-gray-800 my-6"></div>

            <div className="grid lg:grid-cols-2 gap-y-2 lg:gap-y-8 gap-x-12 mb-8">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <div className="relative w-full">
                    {/* Email icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path d="m2 6l6.913 3.917c2.549 1.444 3.625 1.444 6.174 0L22 6" />
                        <path d="M2.016 13.476c.065 3.065.098 4.598 1.229 5.733c1.131 1.136 2.705 1.175 5.854 1.254c1.94.05 3.862.05 5.802 0c3.149-.079 4.723-.118 5.854-1.254c1.131-1.135 1.164-2.668 1.23-5.733c.02-.986.02-1.966 0-2.952c-.066-3.065-.099-4.598-1.23-5.733c-1.131-1.136-2.705-1.175-5.854-1.254a115 115 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254c-1.131 1.135-1.164 2.668-1.23 5.733a69 69 0 0 0 0 2.952" />
                      </g>
                    </svg>

                    <input
                      id="email"
                      value={formData.email}
                      readOnly={editingField !== 'email'}
                      onChange={(e) => handleInputChange(e, 'email')}
                      className="pl-10 pr-2 input focus:outline-none"
                    />
                  </div>
                  <button onClick={() => changeField("email")} className="secondary-button aspect-square w-11 h-11 rounded-md flex items-center justify-center cursor-pointer duration-300 transition-all">
                    {/* Edit icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.172 19.828L19.828 8.172c.546-.546.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.295-.418-.567-.964-1.112c-.545-.546-.817-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.566.418-1.112.964L4.172 15.828c-.579.578-.868.867-1.02 1.235C3 17.43 3 17.839 3 18.657V21h2.343c.818 0 1.226 0 1.594-.152c.367-.152.656-.442 1.235-1.02M12 21h6M14.5 5.5l4 4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="nombre"
                    value={formData.nombre}
                    readOnly={editingField !== 'nombre'}
                    onChange={(e) => handleInputChange(e, 'nombre')}
                    className="pl-3 pr-2 input focus:outline-none"
                  />
                  
                  <button onClick={() => changeField("nombre")} className="secondary-button aspect-square w-11 h-11 rounded-md flex items-center justify-center cursor-pointer duration-300 transition-all">
                    {/* Edit icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.172 19.828L19.828 8.172c.546-.546.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.295-.418-.567-.964-1.112c-.545-.546-.817-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.566.418-1.112.964L4.172 15.828c-.579.578-.868.867-1.02 1.235C3 17.43 3 17.839 3 18.657V21h2.343c.818 0 1.226 0 1.594-.152c.367-.152.656-.442 1.235-1.02M12 21h6M14.5 5.5l4 4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Apellido Field */}
              <div className="space-y-2">
                <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-full pb-[3px] focus-within:gradient-border">
                    <input
                      id="apellido"
                      value={formData.apellido}
                      readOnly={editingField !== 'apellido'}
                      onChange={(e) => handleInputChange(e, 'apellido')}
                      className="pl-3 pr-2 input focus:outline-none"
                    />
                  </div>
                  
                  <button onClick={() => changeField("apellido")} className="secondary-button aspect-square w-11 h-11 rounded-md flex items-center justify-center cursor-pointer duration-300 transition-all">
                    {/* Edit icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.172 19.828L19.828 8.172c.546-.546.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.295-.418-.567-.964-1.112c-.545-.546-.817-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.566.418-1.112.964L4.172 15.828c-.579.578-.868.867-1.02 1.235C3 17.43 3 17.839 3 18.657V21h2.343c.818 0 1.226 0 1.594-.152c.367-.152.656-.442 1.235-1.02M12 21h6M14.5 5.5l4 4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex items-end justify-end space-x-3">
              <button onClick={() => resetForm()} className="cancel-button px-4 py-2 cursor-pointer duration-300 transition-all">Cancelar</button>
                  
              <button onClick={() => handleSubmit()} className="button px-4 py-2 cursor-pointer duration-300 transition-all">Guardar</button>
            </div>
          </div>
        </div>  
        )}
    </>
  )
}