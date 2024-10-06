// app/genres/page.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "../hooks/useAuth"; // Importar la tienda

const GenresAndArtists = () => {
  const router = useRouter();
  const { setAuth, isAuthenticated } = useAuthStore(); // Obtener funciones y estado de autenticación
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [artistNames, setArtistNames] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [responseMessage, setResponseMessage] = useState(null);

  // Obtener el access_token de los parámetros de la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    console.log("Access Token obtenido:", token); // Log para depuración
    if (token) {
      setAuth(token); // Establecer el estado de autenticación
    } else {
      setError("No se encontró el token de acceso.");
      setLoading(false);
    }
  }, [setAuth]);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirigir al usuario a la página de inicio de sesión o mostrar un mensaje
      router.push("/login"); // Asegúrate de tener una ruta de login
    }
  }, [isAuthenticated, loading, router]);

  // Obtener los artistas y géneros de Spotify
  useEffect(() => {
    const accessToken = useAuthStore.getState().accessToken; // Obtener el token desde la tienda

    console.log(accessToken);

    if (accessToken) {
      const fetchData = async () => {
        try {
          console.log("Fetching data from Spotify with token:", accessToken); // Log para depuración
          const response = await axios.get(
            "https://api.spotify.com/v1/me/top/artists",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                limit: 8,
              },
            }
          );

          const artists = response.data.items.map((artist) => artist.name);
          const allGenres = response.data.items.flatMap(
            (artist) => artist.genres
          );
          const genres = [...new Set(allGenres)];

          console.log("Artistas obtenidos:", artists); // Log para depuración
          console.log("Géneros obtenidos:", genres); // Log para depuración

          setArtistNames(artists);
          setUniqueGenres(genres);
        } catch (err) {
          console.error("Error obteniendo los artistas y géneros:", err);
          setError("No se pudieron obtener los géneros y artistas.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  // Enviar los datos al servidor
  useEffect(() => {
    if (!loading && artistNames.length > 0 && uniqueGenres.length > 0) {
      const postData = async () => {
        try {
          const jsonData = {
            artistas_favoritos: artistNames,
            generos_explicitos: uniqueGenres,
          };

          console.log("Datos JSON a enviar:", jsonData); // Log para depuración

          const responsePost = await axios.post(
            `${process.env.NEXT_PUBLIC_IP}/recommend`,
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Respuesta del servidor:", responsePost); // Log para depuración

          if (responsePost.status === 200) {
            // Redirigir a la ruta raíz '/'
            router.push("/");
          } else {
            setResponseMessage(
              `Error al enviar los datos: Código ${responsePost.status}`
            );
          }
        } catch (err) {
          console.error("Error enviando los artistas y géneros:", err);
          setResponseMessage("Error al enviar los datos al servidor.");
        }
      };

      postData();
    }
  }, [loading, artistNames, uniqueGenres, router]);

  if (loading) return <p>Cargando géneros y artistas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {responseMessage ? <p>{responseMessage}</p> : <h1>Procesando...</h1>}
    </div>
  );
};

export default GenresAndArtists;
