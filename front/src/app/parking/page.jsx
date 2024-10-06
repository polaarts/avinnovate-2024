"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MapPin, Car, Loader2, Phone } from "lucide-react";

const carIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const mapPinIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const initialPosition = [-33.456225, -70.652022];

export default function Component() {
  const [isMounted, setIsMounted] = useState(false);
  const [parkings, setParkings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    getNearbyParkings();
  }, []);

  const getNearbyParkings = async () => {
    setIsLoading(true);
    const mockParkings = [
      {
        id: 1,
        name: "Estacionamiento Central",
        lat: -33.4575,
        lng: -70.6505,
        price: 7500,
        phone: "+56 2 1234 5678",
      },
      {
        id: 2,
        name: "Parking Plaza",
        lat: -33.455,
        lng: -70.6535,
        price: 6800,
        phone: "+56 2 8765 4321",
      },
      {
        id: 3,
        name: "EstacionaFácil",
        lat: -33.458,
        lng: -70.649,
        price: 8200,
        phone: "+56 2 2468 1357",
      },
    ];
    setTimeout(() => {
      setParkings(mockParkings);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="bg-primary text-primary-foreground p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Estacionamientos Cercanos
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Explora opciones de estacionamiento en tu área
            </p>
          </div>
          <div className="w-full h-[400px] relative">
            {isMounted ? (
              <MapContainer
                center={initialPosition}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                minZoom={14}
                maxZoom={17}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <ZoomControl position="bottomright" />

                <Marker position={initialPosition} icon={mapPinIcon}>
                  <Popup>
                    <span className="font-semibold">Tu ubicación</span>
                  </Popup>
                </Marker>

                {parkings.map((parking) => (
                  <Marker
                    key={parking.id}
                    position={[parking.lat, parking.lng]}
                    icon={carIcon}
                  >
                    <Popup className="custom-popup">
                      <div className="font-semibold mb-1">{parking.name}</div>
                      <div className="text-sm mb-2">
                        Precio: {parking.price}$ CLP
                      </div>
                      <div className="flex flex-col space-y-2 mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs py-1 h-auto"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${parking.lat},${parking.lng}`,
                              "_blank"
                            )
                          }
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Ver en Mapa
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs py-1 h-auto"
                          onClick={() => window.open(`tel:${parking.phone}`)}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Llamar
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        {parking.phone}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-primary">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="font-medium">Cargando mapa...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-muted text-muted-foreground text-sm text-center">
            Haz clic en los marcadores para ver detalles y contactar a los
            estacionamientos
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
