import Artist from "./Artist";

export default function ListArtist({ artists }) {
  return artists.map((artist) => {
    return <Artist image={artist.photo_url} />;
  });
}
