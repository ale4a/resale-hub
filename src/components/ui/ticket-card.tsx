import { useState } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { PurchaseModal } from "./purchase-modal";

interface TicketCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  available: number;
  total: number;
  seller: string;
}

export const TicketCard = ({
  id,
  title,
  category,
  date,
  time,
  location,
  price,
  currency,
  image,
  available,
  total,
  seller
}: TicketCardProps) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      concierto: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      teatro: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      deportes: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      arte: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      conferencia: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      festival: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border bg-card shadow-card transition-all hover:shadow-elegant hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge className={`absolute top-3 left-3 ${getCategoryColor(category)}`}>
            {category}
          </Badge>
          <div className="absolute bottom-3 right-3 flex items-center space-x-1 rounded-lg bg-black/70 px-2 py-1">
            <Ticket className="h-3 w-3 text-white" />
            <span className="text-xs text-white font-medium">{available}/{total}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {date} • {time}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              Vendedor: {seller}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{price} {currency}</div>
              <div className="text-xs text-muted-foreground">por ticket</div>
            </div>
            <Button 
              onClick={() => setShowPurchaseModal(true)}
              className="group"
              disabled={available === 0}
            >
              {available === 0 ? "Agotado" : "Comprar"}
            </Button>
          </div>
        </div>
      </div>

      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        ticket={{
          id,
          title,
          date,
          time,
          location,
          price,
          currency,
          image
        }}
      />
    </>
  );
};