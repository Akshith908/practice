import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export function Buses() {
  const [buses, setBuses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/buses")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error("Error fetching buses:", err));
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-safari-blue">All Buses</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {buses.map((bus) => (
          <Card
            key={bus.id}
            className="cursor-pointer hover:bg-muted/50 transition-all duration-300 border-l-4 border-l-safari-blue"
            onClick={() => navigate(`/bus/${bus.id}`)}
          >
            <CardContent className="p-4">
              <div className="font-medium text-base mb-2">{bus.name}</div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>🚌 ETA: {bus.eta}</span>
                <span className="text-safari-green">👥 {bus.seats < 5 ? "Light" : "Moderate"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
