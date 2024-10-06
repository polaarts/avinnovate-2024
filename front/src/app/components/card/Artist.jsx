import Image from "next/image";
import { Card } from "@radix-ui/themes";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Artist(props) {
  const router = useRouter();
  const placeholder =
    "https://www.latercera.com/resizer/v2/NOCEN23BTFGH7IS5W6EGMBR4CA.jpg?quality=80&smart=true&auth=6ac6e15321d172c400071be6cbc2c655ab8727ccb20215bbbc7e4b4a4957a564&width=1200&height=834";

  const imageUrl =
    !props.image || props.image === "null" ? placeholder : props.image;

  const generos = props.genres || [];

  // Definir una lista de clases de colores de fondo de Tailwind CSS
  const bgColors = [
    "bg-blue-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-gray-200",
    "bg-orange-200",
    "bg-teal-200",
  ];

  // Asignar colores aleatorios a cada género una sola vez
  const genresWithColors = useMemo(() => {
    return generos.map((genero) => ({
      name: genero,
      color: bgColors[Math.floor(Math.random() * bgColors.length)],
    }));
  }, [generos]);

  return (
    <div className="flex-shrink-0">
      <Card className="">
        <div className="flex items-center">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border border-white flex justify-center items-center">
            <Image
              key={props.id}
              src={imageUrl}
              layout="fill"
              objectFit="cover"
              alt={`Imagen de ${props.name || "artista"}`}
              className="rounded-full object-center"
            />
          </div>
          <div className="ml-4 space-y-2">
            <div className="font-bold text-[15px] uppercase">{props.name}</div>
            <div className="flex flex-row font-light text-[13px] gap-2">
              {genresWithColors.map((genre, index) => (
                <span
                  key={index}
                  className={`${genre.color} px-2 py-1 rounded truncate max-w-[80px]`}
                  title={genre.name} // Muestra el nombre completo al pasar el mouse
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex flex-row gap-3">
              <p>{props.date}</p>
              <p>{props.hour}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push(`/event/${props.id}`)}
          className="w-full bg-red-400 mt-2 rounded-md text-white py-2"
        >
          COMPRAR
        </button>
      </Card>
    </div>
  );
}
