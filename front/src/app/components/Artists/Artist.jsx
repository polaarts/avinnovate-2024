export default function Artist(props) {
  return (
    <div className="relative item-detail">
      <Image
        src={props.image}
        layout={"fill"}
        objectFit={"contain"}
        alt={props.header}
      />
    </div>
  );
}
