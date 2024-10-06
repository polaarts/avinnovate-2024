// app/api/callback/route.js

import axios from "axios";
import querystring from "querystring";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      console.error("El parámetro 'code' no está presente en la consulta.");
      return NextResponse.redirect(new URL("/error", request.url));
    }

    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
    const redirect_uri = "http://localhost:3000/api/callback";

    const authOptions = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
      },
      data: querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
    };

    const response = await axios(authOptions);
    const access_token = response.data.access_token;

    // Redirigir a una página donde se muestren los géneros
    return NextResponse.redirect(
      new URL(`/genres?access_token=${access_token}`, request.url)
    );
  } catch (error) {
    console.error(
      "Error obteniendo el token de acceso:",
      error.response?.data || error.message
    );
    return NextResponse.redirect(new URL("/error", request.url));
  }
}
