import ListCards from "./components/card/Cards-List";
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
  ];

  return (
    <>
      <Header />
      <h1 className="font-bold text-3xl mb-4 mt-4 uppercase">Artistas</h1>
      <div className="grid grid-cols-4 gap-4">
        <ListCards artists={artists} />
      </div>
      <h1 className="font-bold text-3xl mb-4 mt-4 uppercase">Eventos</h1>
      <div className="grid grid-cols-4 gap-4">
        <ListCards artists={artists} />
      </div>
    </>
  );
}
