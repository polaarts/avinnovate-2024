import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req, res) {
  const code = req.query.code || null;

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
    }),
  };

  try {
    const response = await axios(authOptions);
    const access_token = response.data.access_token;

    // Redirigir a una página donde se muestren los géneros
    res.redirect(`/genres?access_token=${access_token}`);
  } catch (error) {
    console.error('Error obteniendo el token de acceso:', error.response.data);
    res.redirect('/error');
  }
}