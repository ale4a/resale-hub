import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Badge } from "./badge";
import { Calendar, MapPin, Wallet, Loader2, CheckCircle, AlertCircle } from "lucide-react";
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

type PurchaseState = "wallet" | "connecting" | "connected" | "processing" | "success" | "error";

export const PurchaseModal = ({ isOpen, onClose, ticket }: PurchaseModalProps) => {
  const [purchaseState, setPurchaseState] = useState<PurchaseState>("wallet");
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const simulateMetaMaskConnection = async () => {
    setPurchaseState("connecting");
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure
    if (Math.random() > 0.1) {
      setPurchaseState("connected");
      toast({
        title: "Wallet Conectada",
        description: "MetaMask conectada exitosamente",
      });
    } else {
      setPurchaseState("error");
      toast({
        title: "Error de Conexión",
        description: "No se pudo conectar con MetaMask",
        variant: "destructive",
      });
    }
  };

  const simulatePurchase = async () => {
    setPurchaseState("processing");
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPurchaseState("success");
    toast({
      title: "¡Compra Exitosa!",
      description: `Has comprado ${quantity} ticket(s) para ${ticket.title}`,
    });
  };

  const resetModal = () => {
    setPurchaseState("wallet");
    setQuantity(1);
    onClose();
  };

  const renderContent = () => {
    switch (purchaseState) {
      case "wallet":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Conecta tu Wallet</h3>
              <p className="text-muted-foreground">
                Necesitas conectar MetaMask para realizar la compra
              </p>
            </div>
            
            <Button 
              onClick={simulateMetaMaskConnection}
              className="w-full"
              size="lg"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Conectar MetaMask
            </Button>
          </div>
        );

      case "connecting":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Conectando...</h3>
              <p className="text-muted-foreground">
                Esperando confirmación de MetaMask
              </p>
            </div>
          </div>
        );

      case "connected":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-success">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Wallet Conectada</span>
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
                <label className="font-medium">Cantidad:</label>
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
                  <span>{ticket.price * quantity} {ticket.currency}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={simulatePurchase}
              className="w-full"
              size="lg"
            >
              Confirmar Compra
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
              <h3 className="text-lg font-semibold mb-2">Procesando Compra...</h3>
              <p className="text-muted-foreground">
                Confirma la transacción en MetaMask
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
              <h3 className="text-lg font-semibold mb-2">¡Compra Exitosa!</h3>
              <p className="text-muted-foreground">
                Tus tickets han sido enviados a tu wallet
              </p>
            </div>
            <Button onClick={resetModal} className="w-full" size="lg">
              Cerrar
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
              <h3 className="text-lg font-semibold mb-2">Error en la Conexión</h3>
              <p className="text-muted-foreground">
                No se pudo conectar con MetaMask. Inténtalo de nuevo.
              </p>
            </div>
            <Button 
              onClick={() => setPurchaseState("wallet")} 
              className="w-full" 
              size="lg"
            >
              Intentar de Nuevo
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Comprar Ticket</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};