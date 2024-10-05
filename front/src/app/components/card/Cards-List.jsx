import CardComponent from "./Card";
export default function ListCards({ artists }) {
  return artists.map((artist) => {
    return (
      <CardComponent
        image={artist.photo_url}
        header={artist.artist_name}
        details={artist.photo_url}
      />
    );
  });
}
