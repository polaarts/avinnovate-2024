"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const GenresAndArtists = ({ access_token }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [artistNames, setArtistNames] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [responseMessage, setResponseMessage] = useState(null); // Estado para la respuesta del servidor

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada a la API de Spotify para obtener los artistas más escuchados
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            params: {
              limit: 8, // Ajusta el límite según sea necesario
            },
          }
        );

        // Extraemos los nombres de los artistas y géneros
        const artistNames = response.data.items.map((artist) => artist.name);
        const allGenres = response.data.items.flatMap(
          (artist) => artist.genres
        );
        const uniqueGenres = [...new Set(allGenres)]; // Obtenemos géneros únicos

        // Actualizamos los estados locales para renderizar en la página
        setArtistNames(artistNames);
        setUniqueGenres(uniqueGenres);
        setLoading(false);
      } catch (err) {
        console.error("Error obteniendo los artistas y géneros:", err);
        setError("No se pudieron obtener los géneros y artistas.");
        setLoading(false);
      }
    };

    fetchData();
  }, [access_token]);

  // Efecto secundario que ocurre después de que los artistas y géneros han sido cargados
  useEffect(() => {
    if (!loading && artistNames.length > 0 && uniqueGenres.length > 0) {
      const postData = async () => {
        try {
          // Estructuramos los datos en formato JSON
          const jsonData = {
            artistas_favoritos: artistNames,
            generos_explicitos: uniqueGenres,
          };

          console.log("Datos JSON a enviar:", jsonData);

          // Hacemos una solicitud POST a la IP específica
          const responsePost = await axios.post(
            `${process.env.NEXT_PUBLIC_IP}/recommend`,
            jsonData
          );

          // Mostrar la respuesta del servidor
          if (responsePost.status === 200) {
            setResponseMessage(
              `Datos enviados exitosamente: ${JSON.stringify(
                responsePost.data
              )}`
            );
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
  }, [loading, artistNames, uniqueGenres]); // Solo se ejecuta cuando los datos están listos

  if (loading) return <p>Cargando géneros y artistas...</p>;
  if (error) return <p>{error}</p>;

  return <h1>DATOS ENVIADOS CORRECTAMENTE AL SERVIDOR!</h1>;
};

// Obtener el token de acceso desde los query params
GenresAndArtists.getInitialProps = ({ query }) => {
  return { access_token: query.access_token };
};

export default GenresAndArtists;
