// app/page.jsx o donde esté ubicado tu componente Home
"use client";
import { useEffect, useState } from "react";
import ListArtist from "./components/card/ArtistList";
import Header from "./components/header/Header";
import useAuthStore from "./hooks/useAuth"; // Importar la tienda de autenticación

export default function Home() {
  const [artistsJson, setArtistsJson] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener el estado de autenticación desde Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken); // Opcional, si necesitas el token

  useEffect(() => {
    const fetchArtists = async () => {
      // Determinar la URL basada en la autenticación
      const url = isAuthenticated
        ? `${process.env.NEXT_PUBLIC_IP}/recomendaciones`
        : `${process.env.NEXT_PUBLIC_IP}/json`;

      // Configurar opciones de fetch
      const options = {
        method: "GET",
        headers: {},
      };

      // Si el usuario está autenticado, agregar el token de autorización
      if (isAuthenticated && accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Asumiendo que la estructura de la respuesta es la misma para ambas URLs
        const artistas = data.artistas || data.artistas_favoritos || []; // Ajusta según la respuesta
        setArtistsJson(artistas);
        console.log("Artistas obtenidos:", artistas);
      } catch (e) {
        console.error("Error al obtener los artistas:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [isAuthenticated, accessToken]); // Dependencias para re-ejecutar si cambia la autenticación

  if (loading) return <p>Cargando artistas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="font-bold text-3xl mb-4 mt-4 uppercase">Artistas</h1>
        <div></div>
        <div className="grid grid-cols-3 gap-4">
          <ListArtist artists={artistsJson.slice(0, 12)} />
        </div>
        <div className="flex flex-row justify-between mt-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </div>
          <div className="flex flex-row gap-4">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
