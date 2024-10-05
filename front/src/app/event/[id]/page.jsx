import Image from "next/image";
export default function Page({ params }) {
  return (
    <div className="bg-red-500 h-[600px] relative">
      <Image
        src={
          "https://thedemostop.com/blogs/wp-content/uploads/2024/01/british-singers-female-img.jpg"
        }
        alt={"hola"}
        layout={"fill"}
        objectFit="cover"
      />
    </div>
  );
}
