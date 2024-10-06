import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { access_token } = req.query;

  const artistsToFetch = [
    "The Beatles", "Bob Marley", "Miles Davis", "Madonna", "Metallica", 
    "Bob Dylan", "Beyoncé", "Johann Sebastian Bach", "Eminem", "David Bowie", 
    "Ella Fitzgerald", "Björk", "Johnny Cash", "Prince", "Radiohead", 
    "Stevie Wonder", "Nina Simone", "Kraftwerk", "Bob Marley & The Wailers", 
    "Queen", "Jay-Z", "Aretha Franklin", "Pink Floyd", "Rihanna", "Chuck Berry", 
    "Nirvana", "Lady Gaga", "The Rolling Stones", "Kendrick Lamar", "Dolly Parton", 
    "AC/DC", "Coldplay", "Whitney Houston", "Ludwig van Beethoven", "The Who", 
    "Drake", "Tina Turner", "Daft Punk", "Kanye West", "Led Zeppelin", "Elton John", 
    "Marvin Gaye", "Taylor Swift", "The Beach Boys", "Guns N' Roses", "Adele", 
    "John Coltrane", "U2", "The Clash", "Frank Sinatra", "Red Hot Chili Peppers", 
    "Shakira", "Black Sabbath", "Destiny's Child", "Green Day", "Elvis Presley", 
    "Santana", "Foo Fighters", "Tupac Shakur", "Fleetwood Mac", "Bruno Mars", 
    "The Police", "Céline Dion", "Pearl Jam", "Buddy Holly", "The Doors", 
    "Alicia Keys", "Run-DMC", "Oasis", "The Supremes", "Rush", "Stevie Nicks", 
    "Talking Heads", "Lauryn Hill", "Depeche Mode", "Leonard Cohen", 
    "Rage Against the Machine", "Dusty Springfield", "The Velvet Underground", 
    "Snoop Dogg", "Janis Joplin", "The Cure", "Willie Nelson", "Sonic Youth", 
    "Donna Summer", "Bad Bunny", "Genesis", "Patti Smith", "Dua Lipa", 
    "The Smiths", "Fela Kuti", "Iron Maiden", "Frank Ocean", "The Ramones", 
    "Billie Holiday", "Massive Attack", "Kate Bush", "Slayer", "Gloria Estefan"
  ];

  try {
    const artistImageData = {};

    for (const artist of artistsToFetch) {
      try {
        // Llamada a la API de Spotify para buscar el artista por nombre
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: artist,
            type: 'artist',
            limit: 1,
          },
          timeout: 10000,  // Aumenta el timeout a 10 segundos (10000 ms)
        });

        // Verificamos si hay resultados
        if (response.data.artists.items.length > 0) {
          const artistData = response.data.artists.items[0];
          const imageUrl = artistData.images[0]?.url || null;

          // Guardamos el nombre del artista y su imagen
          artistImageData[artist] = imageUrl;
        } else {
          console.warn(`No se encontraron resultados para el artista: ${artist}`);
        }
      } catch (err) {
        console.error(`Error obteniendo datos del artista: ${artist}`, err.message);
        continue; // Continúa con el siguiente artista si hay un error
      }
    }

    // Ruta donde se guardará el archivo .txt
    const filePath = path.join(process.cwd(), 'artistImages.txt');

    // Guardar el archivo como un archivo .txt en la misma ruta desde la que se ejecuta
    fs.writeFileSync(filePath, JSON.stringify(artistImageData, null, 2));

    console.log(`Archivo guardado en: ${filePath}`);

    // Enviar respuesta exitosa
    res.status(200).json({ message: 'Imágenes de artistas obtenidas correctamente y guardadas en artistImages.txt', data: artistImageData });
  } catch (error) {
    console.error('Error general al obtener las imágenes:', error.message);
    res.status(500).json({ message: 'Error al obtener las imágenes de los artistas.' });
  }
}