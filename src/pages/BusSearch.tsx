import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Bus {
  id: number;
  name: string;
  eta: string;
  seats: number;
  stop: string;
  lat: number;
  lng: number;
}

export default function BusSearch() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/buses")
      .then((res) => res.json())
      .then((data: Bus[]) => {
        setBuses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching buses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-8">Loading buses...</div>;
  if (!buses.length) return <div className="text-center p-8">No buses available.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Available Buses</h1>
      <div className="space-y-4">
        {buses.map((bus) => (
          <Card
            key={bus.id}
            className="cursor-pointer hover:bg-gray-50 transition"
            onClick={() => navigate(`/bus/${bus.id}`, { state: bus })}
          >
            <CardContent className="p-4">
              <h2 className="font-semibold">{bus.name}</h2>
              <p className="text-sm text-gray-600">
                ETA: {bus.eta} | Empty Seats: {bus.seats} | Next Stop: {bus.stop}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
