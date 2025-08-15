// Utilidad para eliminar cookies
export const deleteCookie = (name: string) => {
    console.log(document.cookie)
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
};