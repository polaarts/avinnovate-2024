"use client";
import Image from "next/image";
import ConcertTickets from "../../components/concert-tickets";
import TheaterSeating from "../../components/theater-seating";
import { use, useEffect, useState } from "react";

export default function Page({ params }) {
  const id = params.id;
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const url = `http://192.168.139.64:8000/json/${id}`; // Agrega el protocolo adecuado

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        setArtistData(res);
        console.log("individual", res);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchArtists();
  }, []);

  return (
    <>
      <div className="relative h-[600px]">
        {/* Imagen de fondo */}
        <Image
          src={artistData.photo_url}
          alt="hola"
          layout="fill"
          objectFit="cover"
          className="z-0" // Asegura que la imagen esté en el fondo
        />

        {/* Degradado de negro a transparente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>

        {/* Contenedor de texto */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h1 className="text-4xl font-bold text-white uppercase">
            {artistData.artist_name}
          </h1>
        </div>
      </div>
      <TheaterSeating
        date={artistData.concert_date}
        time={artistData.concert_time}
      />
    </>
  );
}
