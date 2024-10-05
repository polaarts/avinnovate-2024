import Image from "next/image";

export default function Artist(props) {
  return (
    <div className="relative w-[100px] h-[100px]">
      <Image
        src={props.image}
        layout={"fill"}
        objectFit={"cover"}
        style={{
          borderRadius: "100%",
          border: "1px solid #fff",
        }}
      />
    </div>
  );
}
