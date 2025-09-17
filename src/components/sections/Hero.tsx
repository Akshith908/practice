import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  const navigate = useNavigate();

  const sampleBuses = [
    { id: 1, name: "Route 45A - City Center", eta: "5 min", seats: 7, stop: "Punjagutta" },
    { id: 2, name: "Route 23B - Airport", eta: "12 min", seats: 3, stop: "Begumpet" }
  ];

  return (
    <section className="min-h-screen flex items-center pt-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 items-center">
          <div className="space-y-8 mx-auto max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Your{" "}
                <span className="text-safari-blue">
                  Smart Travel
                </span>{" "}
                Companion
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Safari revolutionizes public transport with real-time tracking, crowd estimation, 
                and multilingual support. Travel smarter, not harder.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild variant="hero" size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <Link to="/login">
                  <Rocket className="mr-2 h-4 h-5 w-4 sm:w-5" />
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Link>
              </Button>
              <Button 
                onClick={() => navigate('/buses')}
                variant="outline" 
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              >
                View All Buses
              </Button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {sampleBuses.map((bus) => (
                <Card
                  key={bus.id}
                  className="cursor-pointer hover:bg-muted/50 transition-all duration-300 border-l-4 border-l-safari-blue"
                  onClick={() => navigate(`/bus/${bus.id}`, { state: bus })}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="font-medium text-sm sm:text-base mb-2">{bus.name}</div>
                    <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
                      <span>🚌 ETA: {bus.eta}</span>
                      <span className="text-safari-green">👥 {bus.seats < 5 ? "Light" : "Moderate"}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
