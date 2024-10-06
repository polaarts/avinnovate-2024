import connectToDatabase from '../../lib/mongodb';
import { Artist } from '../../lib/models';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  if (method === 'POST') {
    try {
      const { artists, userId } = req.body;

      // Guardar los artistas y géneros en la base de datos
      const savedArtists = await Artist.insertMany(
        artists.map(artist => ({
          name: artist.name,
          genres: artist.genres,
          userId: userId,  // Asociamos los datos con un ID de usuario si es necesario
        }))
      );

      res.status(201).json({ message: 'Datos guardados correctamente', data: savedArtists });
    } catch (error) {
      res.status(500).json({ message: 'Error guardando los datos', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${method} no permitido`);
  }
}