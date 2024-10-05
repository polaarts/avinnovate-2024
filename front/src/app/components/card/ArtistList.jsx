import Artist from "./Artist";

export default function ListArtist({ artists }) {
  return artists.map((artist) => {
    return (
      <Artist
        name={artist.artist_name}
        image={artist.photo_url}
        key={artist.artist_id}
        date={artist.concert_date}
        hour={artist.concert_time}
        genres={artist.genres}
      />
    );
  });
}
