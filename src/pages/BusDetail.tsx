import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import busIcon from "@/assets/bus-icon.svg";

export default function BusDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // /bus/123 → id = "123"
  const [bus, setBus] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/bus/${id}`)
      .then((res) => res.json())
      .then((data) => setBus(data))
      .catch((err) => console.error("Error fetching bus:", err));
  }, [id]);

  useEffect(() => {
    if (!bus) return;

    const customBusIcon = L.icon({
      iconUrl: busIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

    const map = L.map("map").setView([bus.lat, bus.lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([bus.lat, bus.lng], { icon: customBusIcon })
      .addTo(map)
      .bindPopup(bus.name)
      .openPopup();

    return () => {
      map.remove();
    };
  }, [bus]);

  if (!bus) {
    return <p className="text-center mt-10">Loading bus data...</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-2 text-safari-blue hover:text-safari-blue/80"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div id="map" className="w-full h-64 rounded-xl shadow-safari-medium"></div>

      <div className="bg-background border border-border rounded-xl shadow-safari-soft p-4 text-center">
        <h1 className="text-xl font-bold mb-2 text-safari-blue">{bus.name}</h1>
        <p className="text-muted-foreground">
          Next Stop: <span className="font-medium text-foreground">{bus.stop}</span>
        </p>
        <p className="text-muted-foreground">
          ETA: <span className="font-medium text-foreground">{bus.eta}</span>
        </p>
        <p className="text-muted-foreground">
          Empty Seats: <span className="font-medium text-safari-green">{bus.seats}</span>
        </p>
      </div>
    </div>
  );
}
