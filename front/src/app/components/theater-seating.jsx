"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated as a, config } from "@react-spring/web";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Info,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

// Componente para el footer
const Footer = () => (
  <footer className="bg-gray-800 text-white p-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-2">Teatro Espectacular</h3>
        <p>Ofreciendo las mejores experiencias desde 1990</p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Enlaces Rápidos</h3>
        <ul>
          <li>
            <a href="#" className="hover:underline">
              Política de Privacidad
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Términos y Condiciones
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Contacto</h3>
        <p>Email: info@teatroespectacular.com</p>
        <p>Teléfono: (123) 456-7890</p>
      </div>
    </div>
    <div className="text-center mt-8">
      <p>&copy; 2024 Teatro Espectacular. Todos los derechos reservados.</p>
    </div>
  </footer>
);

// Componente para un asiento individual en 3D
const Seat = ({ position, color = "gray", isSelected }) => {
  const seatGeometry = useMemo(() => {
    const baseWidth = 0.8;
    const baseDepth = 0.8;
    const baseHeight = 0.1;
    const backrestWidth = 0.7;
    const backrestDepth = 0.1;
    const backrestHeight = 0.6;
    const armrestWidth = 0.1;
    const armrestDepth = 0.6;
    const armrestHeight = 0.3;

    const geometry = new THREE.BufferGeometry();

    // Base del asiento
    const baseVertices = [
      -baseWidth / 2,
      0,
      -baseDepth / 2,
      baseWidth / 2,
      0,
      -baseDepth / 2,
      baseWidth / 2,
      0,
      baseDepth / 2,
      -baseWidth / 2,
      0,
      baseDepth / 2,
      -baseWidth / 2,
      baseHeight,
      -baseDepth / 2,
      baseWidth / 2,
      baseHeight,
      -baseDepth / 2,
      baseWidth / 2,
      baseHeight,
      baseDepth / 2,
      -baseWidth / 2,
      baseHeight,
      baseDepth / 2,
    ];

    // Respaldo
    const backrestVertices = [
      -backrestWidth / 2,
      baseHeight,
      baseDepth / 2,
      backrestWidth / 2,
      baseHeight,
      baseDepth / 2,
      backrestWidth / 2,
      baseHeight + backrestHeight,
      baseDepth / 2,
      -backrestWidth / 2,
      baseHeight + backrestHeight,
      baseDepth / 2,
      -backrestWidth / 2,
      baseHeight,
      baseDepth / 2 - backrestDepth,
      backrestWidth / 2,
      baseHeight,
      baseDepth / 2 - backrestDepth,
      backrestWidth / 2,
      baseHeight + backrestHeight,
      baseDepth / 2 - backrestDepth,
      -backrestWidth / 2,
      baseHeight + backrestHeight,
      baseDepth / 2 - backrestDepth,
    ];

    // Reposabrazos izquierdo
    const leftArmrestVertices = [
      -baseWidth / 2,
      baseHeight,
      -baseDepth / 2,
      -baseWidth / 2 + armrestWidth,
      baseHeight,
      -baseDepth / 2,
      -baseWidth / 2 + armrestWidth,
      baseHeight,
      baseDepth / 2,
      -baseWidth / 2,
      baseHeight,
      baseDepth / 2,
      -baseWidth / 2,
      baseHeight + armrestHeight,
      -baseDepth / 2,
      -baseWidth / 2 + armrestWidth,
      baseHeight + armrestHeight,
      -baseDepth / 2,
      -baseWidth / 2 + armrestWidth,
      baseHeight + armrestHeight,
      baseDepth / 2,
      -baseWidth / 2,
      baseHeight + armrestHeight,
      baseDepth / 2,
    ];

    // Reposabrazos derecho
    const rightArmrestVertices = [
      baseWidth / 2 - armrestWidth,
      baseHeight,
      -baseDepth / 2,
      baseWidth / 2,
      baseHeight,
      -baseDepth / 2,
      baseWidth / 2,
      baseHeight,
      baseDepth / 2,
      baseWidth / 2 - armrestWidth,
      baseHeight,
      baseDepth / 2,
      baseWidth / 2 - armrestWidth,
      baseHeight + armrestHeight,
      -baseDepth / 2,
      baseWidth / 2,
      baseHeight + armrestHeight,
      -baseDepth / 2,
      baseWidth / 2,
      baseHeight + armrestHeight,
      baseDepth / 2,
      baseWidth / 2 - armrestWidth,
      baseHeight + armrestHeight,
      baseDepth / 2,
    ];

    const vertices = new Float32Array([
      ...baseVertices,
      ...backrestVertices,
      ...leftArmrestVertices,
      ...rightArmrestVertices,
    ]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const indices = [
      // Base
      0, 1, 5, 0, 5, 4, 1, 2, 6, 1, 6, 5, 2, 3, 7, 2, 7, 6, 3, 0, 4, 3, 4, 7, 4,
      5, 6, 4, 6, 7,
      // Respaldo
      8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 8, 11, 15, 8, 15, 12, 9, 13,
      14, 9, 14, 10, 11, 10, 14, 11, 14, 15,
      // Reposabrazos izquierdo
      16, 17, 21, 16, 21, 20, 17, 18, 22, 17, 22, 21, 18, 19, 23, 18, 23, 22,
      19, 16, 20, 19, 20, 23, 20, 21, 22, 20, 22, 23,
      // Reposabrazos derecho
      24, 25, 29, 24, 29, 28, 25, 26, 30, 25, 30, 29, 26, 27, 31, 26, 31, 30,
      27, 24, 28, 27, 28, 31, 28, 29, 30, 28, 30, 31,
    ];

    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  const meshRef = useRef();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(isSelected ? 1.2 : 1);
  }, [isSelected]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1)
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={seatGeometry}>
      <meshStandardMaterial color={color} />
      {isSelected && (
        <Text
          position={[0, 1, 0]}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontSize={0.2}
        >
          Seleccionado
        </Text>
      )}
    </mesh>
  );
};

// Componente para el escenario
const Stage = () => (
  <group position={[0, 0, -8]}>
    <mesh position={[0, 0.5, 0]} receiveShadow>
      <boxGeometry args={[16, 1, 6]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
    <mesh position={[0, 3, -2.5]} receiveShadow>
      <boxGeometry args={[16, 5, 1]} />
      <meshStandardMaterial color="#FF0000" />
    </mesh>
  </group>
);

// Componente para un miembro de la banda
const BandMember = ({ position, color }) => (
  <group position={position}>
    <mesh castShadow>
      <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
    <mesh position={[0, 0.5, 0]} castShadow>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </group>
);

// Componente para la banda
const Band = () => (
  <group position={[0, 1, -6]}>
    <BandMember position={[-4, 0, 0]} color="red" />
    <BandMember position={[-2, 0, 0]} color="blue" />
    <BandMember position={[0, 0, 0]} color="green" />
    <BandMember position={[2, 0, 0]} color="yellow" />
    <BandMember position={[4, 0, 0]} color="purple" />
  </group>
);

// Componente para el teatro
const Theater = ({ selectedSeats }) => {
  const rows = 5;
  const seatsPerRow = 10; // Actualizado para tener 50 asientos
  const seatSpacing = 1.2;
  const rowSpacing = 1.5;
  const slopeAngle = Math.PI / 12; // 15 grados en radianes

  return (
    <group>
      <Stage />
      <Band />
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
          const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
          const x = (seatIndex - (seatsPerRow - 1) / 2) * seatSpacing;
          const z = rowIndex * rowSpacing;
          const y = Math.sin(slopeAngle) * z;
          return (
            <Seat
              key={seatNumber}
              position={[x, y, z]}
              color={selectedSeats.includes(seatNumber) ? "red" : "gray"}
              isSelected={selectedSeats.includes(seatNumber)}
            />
          );
        })
      )}
    </group>
  );
};

// Componente para la visualización 3D
const TheaterView3D = ({ seatNumber }) => {
  const rows = 5;
  const seatsPerRow = 10;
  const seatSpacing = 1.2;
  const rowSpacing = 1.5;
  const slopeAngle = Math.PI / 12;

  const row = Math.floor((seatNumber - 1) / seatsPerRow);
  const seatInRow = (seatNumber - 1) % seatsPerRow;

  const x = (seatInRow - (seatsPerRow - 1) / 2) * seatSpacing;
  const z = row * rowSpacing;
  const y = Math.sin(slopeAngle) * z + 1.5; // Añadimos 1.5 para elevar la cámara

  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    cameraRef.current.position.set(0, 10, 20);
    cameraRef.current.lookAt(0, 2, -5);
  }, []);

  useFrame(() => {
    cameraRef.current.position.lerp(new THREE.Vector3(x, y + 1, z + 2), 0.05);
    cameraRef.current.lookAt(0, 2, -5);
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      <Theater selectedSeats={[seatNumber]} />
      <OrbitControls
        target={new THREE.Vector3(0, 2, -5)}
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
};

// Componente principal
export function TheaterSeating(props) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showingView3D, setShowingView3D] = useState(false);
  const [currentSeatIndex, setCurrentSeatIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const rows = 5;
  const seatsPerRow = 10; // Actualizado para tener 50 asientos

  const handleAddToCart = () => {
    setCart((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handleView3D = () => {
    if (selectedSeats.length > 0) {
      setShowingView3D(true);
      setCurrentSeatIndex(0);
    }
  };

  const handleBackToSelection = () => {
    setShowingView3D(false);
  };

  const handlePrevSeat = () => {
    setCurrentSeatIndex(
      (prev) => (prev - 1 + selectedSeats.length) % selectedSeats.length
    );
  };

  const handleNextSeat = () => {
    setCurrentSeatIndex((prev) => (prev + 1) % selectedSeats.length);
  };

  const springProps = useSpring({
    opacity: showingView3D ? 1 : 0,
    transform: showingView3D ? "translateY(0%)" : "translateY(100%)",
    config: config.gentle,
  });

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="w-full">
            {/* Aquí podrías agregar contenido adicional si lo necesitas */}
          </div>
        </div>
        <div className="mt-4">
          <Tabs defaultValue="2d" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="2d">Vista 2D</TabsTrigger>
              <TabsTrigger value="3d" disabled={selectedSeats.length === 0}>
                Vista 3D
              </TabsTrigger>
            </TabsList>
            <TabsContent value="2d">
              <div className="flex flex-row">
                <div className="w-full">
                  <CardHeader>
                    <CardTitle>Selección de Asientos</CardTitle>
                    <CardDescription>
                      Haga clic en los asientos para seleccionarlos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="w-full h-8 bg-black mb-4 flex items-center justify-center text-white font-bold">
                        Escenario
                      </div>
                      <ScrollArea className="h-[300px]">
                        <div className="grid gap-2 p-4">
                          {Array.from({ length: rows }).map((_, rowIndex) => (
                            <div
                              key={rowIndex}
                              className="flex justify-center gap-2"
                            >
                              {Array.from({ length: seatsPerRow }).map(
                                (_, seatIndex) => {
                                  const seatNumber =
                                    rowIndex * seatsPerRow + seatIndex + 1;
                                  const isSelected =
                                    selectedSeats.includes(seatNumber);
                                  return (
                                    <Button
                                      key={seatIndex}
                                      variant={
                                        isSelected ? "destructive" : "outline"
                                      }
                                      size="sm"
                                      className="w-8 h-8 p-0"
                                      onClick={() =>
                                        handleSeatSelect(seatNumber)
                                      }
                                      aria-label={`${
                                        isSelected
                                          ? "Deseleccionar"
                                          : "Seleccionar"
                                      } asiento ${seatNumber}`}
                                      aria-pressed={isSelected}
                                    >
                                      {seatNumber}
                                    </Button>
                                  );
                                }
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </div>
                <div className="w-full">
                  <CardHeader>
                    <CardTitle>Resumen de la Reserva</CardTitle>
                    <CardDescription>
                      Detalles del evento y asientos seleccionados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="mr-2" />
                        <span>{props.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2" />
                        <span>{props.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2" />
                        <span>Lugar: Teatro Espectacular</span>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">
                          Asientos Seleccionados:
                        </h3>
                        {selectedSeats.length > 0 ? (
                          <ul>
                            {selectedSeats.map((seat) => (
                              <li key={seat}>Asiento {seat}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No hay asientos seleccionados</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => router.push("/parking")}
                      disabled={selectedSeats.length === 0}
                    >
                      Continuar
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="3d">
              <div className="w-full h-[400px] relative">
                <Canvas camera={{ position: [0, 10, 20], fov: 75 }} shadows>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} castShadow />
                  <TheaterView3D seatNumber={selectedSeats[currentSeatIndex]} />
                </Canvas>
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
                  <p className="mb-2">
                    Asiento {selectedSeats[currentSeatIndex]}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      onClick={handlePrevSeat}
                      disabled={selectedSeats.length <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">
                      {currentSeatIndex + 1} de {selectedSeats.length}
                    </span>
                    <Button
                      size="sm"
                      onClick={handleNextSeat}
                      disabled={selectedSeats.length <= 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {cart.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Carrito de Compras</CardTitle>
              <CardDescription>Asientos en su carrito</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {cart.map((seat, index) => (
                  <li key={index}>Asiento {seat}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Proceder al Pago</Button>
            </CardFooter>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default TheaterSeating;
