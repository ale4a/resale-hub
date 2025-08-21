import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import {
  Calendar,
  MapPin,
  CreditCard,
  Loader2,
  CheckCircle,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: number;
    currency: string;
    image: string;
  };
}

type PurchaseState = "payment" | "processing" | "success" | "error";

export const PurchaseModal = ({
  isOpen,
  onClose,
  ticket,
}: PurchaseModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [purchaseState, setPurchaseState] = useState<PurchaseState>("payment");
  const [quantity, setQuantity] = useState(1);

  const goToCheckout = () => {
    navigate("/checkout", { state: { ticket, quantity } });
    onClose();
  };

  const resetModal = () => {
    setPurchaseState("payment");
    setQuantity(1);
    onClose();
  };

  const renderContent = () => {
    switch (purchaseState) {
      case "payment":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                Complete your purchase with secure payment methods including
                crypto
              </p>
            </div>

            {/* Ticket Summary */}
            <div className="rounded-lg border p-4">
              <div className="flex space-x-4">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{ticket.title}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-3 w-3" />
                      {ticket.date} • {ticket.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-3 w-3" />
                      {ticket.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>
                    {ticket.price * quantity} {ticket.currency}
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={goToCheckout} className="w-full" size="lg">
              <CreditCard className="mr-2 h-5 w-5" />
              Proceed to Payment
            </Button>
          </div>
        );

      case "processing":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Processing Payment...
              </h3>
              <p className="text-muted-foreground">
                Please wait while we process your payment
              </p>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Purchase Successful!
              </h3>
              <p className="text-muted-foreground">
                Your tickets have been sent to your email
              </p>
            </div>
            <Button onClick={resetModal} className="w-full" size="lg">
              Close
            </Button>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Error</h3>
              <p className="text-muted-foreground">
                There was an error processing your payment. Please try again.
              </p>
            </div>
            <Button
              onClick={() => setPurchaseState("payment")}
              className="w-full"
              size="lg"
            >
              Try Again
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => resetModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy Ticket</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
