import Image from "next/image";

export default function Page({ params }) {
  return (
    <>
      <div className="relative h-[600px]">
        {/* Imagen de fondo */}
        <Image
          src="https://i.scdn.co/image/ab6761610000e5eba636b0b244253f602a629796"
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
            Artista de la página individual
          </h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-green-500 h-[800px] w-full"></div>
        <div className="bg-red-500 h-[800px] w-full"></div>
      </div>
    </>
  );
}
