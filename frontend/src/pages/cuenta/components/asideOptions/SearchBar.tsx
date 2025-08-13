

export default function SearchBar () {

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
        className="pl-10.5 md:pl-12 pr-4 md:text-base input"
        placeholder="Buscar paises, provincias, localidades..."
      />
    </div>
  );
}