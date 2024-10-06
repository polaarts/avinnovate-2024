"use client";
import React, { useEffect } from "react";

const Home = () => {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scope = "user-top-read";
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const responseType = "code";

    const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scope
    )}&response_type=${responseType}&show_dialog=true`;

    window.location.href = authUrl;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h1>Awesome Teather</h1>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Home;
