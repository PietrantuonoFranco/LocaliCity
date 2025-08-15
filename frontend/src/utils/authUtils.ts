// Utilidad para obtener cookies
export const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') return; // Para SSR
  
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) return parts.pop()?.split(';').shift();
};

// Utilidad para eliminar cookies
export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
};