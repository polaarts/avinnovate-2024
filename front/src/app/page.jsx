"use client";
import { useEffect, useState } from "react";
import ListArtist from "./components/card/ArtistList";
import Header from "./components/header/Header";
export default function Home() {
  const artists = [
    {
      artist_id: 1,
      artist_name: "The Beatles",
      genres: ["Rock", "Pop Rock", "Psychedelic Rock"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-22",
      concert_time: "18:08",
      seats: [
        {
          type: "VIP",
          price: 272,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 219,
          quantity: 10,
        },
        {
          type: "General",
          price: 136,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 83,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 2,
      artist_name: "Bob Marley",
      genres: ["Reggae", "Ska", "Rocksteady"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-17",
      concert_time: "19:36",
      seats: [
        {
          type: "VIP",
          price: 269,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 204,
          quantity: 10,
        },
        {
          type: "General",
          price: 104,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 51,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 1,
      artist_name: "The Beatles",
      genres: ["Rock", "Pop Rock", "Psychedelic Rock"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-22",
      concert_time: "18:08",
      seats: [
        {
          type: "VIP",
          price: 272,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 219,
          quantity: 10,
        },
        {
          type: "General",
          price: 136,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 83,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 2,
      artist_name: "Bob Marley",
      genres: ["Reggae", "Ska", "Rocksteady"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-17",
      concert_time: "19:36",
      seats: [
        {
          type: "VIP",
          price: 269,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 204,
          quantity: 10,
        },
        {
          type: "General",
          price: 104,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 51,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 1,
      artist_name: "The Beatles",
      genres: ["Rock", "Pop Rock", "Psychedelic Rock"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-22",
      concert_time: "18:08",
      seats: [
        {
          type: "VIP",
          price: 272,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 219,
          quantity: 10,
        },
        {
          type: "General",
          price: 136,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 83,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 2,
      artist_name: "Bob Marley",
      genres: ["Reggae", "Ska", "Rocksteady"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-17",
      concert_time: "19:36",
      seats: [
        {
          type: "VIP",
          price: 269,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 204,
          quantity: 10,
        },
        {
          type: "General",
          price: 104,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 51,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 1,
      artist_name: "The Beatles",
      genres: ["Rock", "Pop Rock", "Psychedelic Rock"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-22",
      concert_time: "18:08",
      seats: [
        {
          type: "VIP",
          price: 272,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 219,
          quantity: 10,
        },
        {
          type: "General",
          price: 136,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 83,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 2,
      artist_name: "Bob Marley",
      genres: ["Reggae", "Ska", "Rocksteady"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-17",
      concert_time: "19:36",
      seats: [
        {
          type: "VIP",
          price: 269,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 204,
          quantity: 10,
        },
        {
          type: "General",
          price: 104,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 51,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 1,
      artist_name: "The Beatles",
      genres: ["Rock", "Pop Rock", "Psychedelic Rock"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-22",
      concert_time: "18:08",
      seats: [
        {
          type: "VIP",
          price: 272,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 219,
          quantity: 10,
        },
        {
          type: "General",
          price: 136,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 83,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 2,
      artist_name: "Bob Marley",
      genres: ["Reggae", "Ska", "Rocksteady"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-17",
      concert_time: "19:36",
      seats: [
        {
          type: "VIP",
          price: 269,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 204,
          quantity: 10,
        },
        {
          type: "General",
          price: 104,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 51,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 2,
      artist_name: "Bob Marley",
      genres: ["Reggae", "Ska", "Rocksteady"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-17",
      concert_time: "19:36",
      seats: [
        {
          type: "VIP",
          price: 269,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 204,
          quantity: 10,
        },
        {
          type: "General",
          price: 104,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 51,
          quantity: 20,
        },
      ],
    },
    {
      artist_id: 2,
      artist_name: "Bob Marley",
      genres: ["Reggae", "Ska", "Rocksteady"],
      photo_url:
        "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg",
      concert_date: "2024-11-17",
      concert_time: "19:36",
      seats: [
        {
          type: "VIP",
          price: 269,
          quantity: 5,
        },
        {
          type: "Premium",
          price: 204,
          quantity: 10,
        },
        {
          type: "General",
          price: 104,
          quantity: 15,
        },
        {
          type: "Economy",
          price: 51,
          quantity: 20,
        },
      ],
    },
  ];

  const [artistsJson, setArtistsJson] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const url = "http://192.168.139.64:8000/json"; // Agrega el protocolo adecuado

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { artistas } = await response.json();
        setArtistsJson(artistas);
        console.log(artistas);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchArtists();
  }, []);

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
