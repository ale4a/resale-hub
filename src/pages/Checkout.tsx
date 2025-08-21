import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, ArrowLeft, CreditCard, Wallet, Banknote, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "card" | "crypto" | "other";
type PaymentState = "selecting" | "processing" | "success" | "error";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>("selecting");
  
  // Get ticket data from location state (passed from ticket card)
  const ticket = location.state?.ticket;

  if (!ticket) {
    navigate("/");
    return null;
  }

  const quantity = location.state?.quantity || 1;
  const total = ticket.price * quantity;

  const handlePayment = async () => {
    if (!selectedPayment) return;
    
    setPaymentState("processing");
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate random success/failure
    if (Math.random() > 0.1) {
      setPaymentState("success");
      toast({
        title: "¡Pago Exitoso!",
        description: `Has comprado ${quantity} ticket(s) para ${ticket.title}`,
      });
    } else {
      setPaymentState("error");
      toast({
        title: "Error en el Pago",
        description: "No se pudo procesar el pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const renderPaymentContent = () => {
    switch (paymentState) {
      case "selecting":
        return (
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selecciona tu método de pago</h3>
              
              <div className="grid gap-3">
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPayment === "card" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedPayment("card")}
                >
                  <CardContent className="flex items-center p-4">
                    <CreditCard className="h-6 w-6 text-primary mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium">Tarjeta de Crédito/Débito</h4>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPayment === "crypto" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedPayment("crypto")}
                >
                  <CardContent className="flex items-center p-4">
                    <Wallet className="h-6 w-6 text-primary mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium">Criptomonedas</h4>
                      <p className="text-sm text-muted-foreground">USDC, ETH, BTC</p>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPayment === "other" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedPayment("other")}
                >
                  <CardContent className="flex items-center p-4">
                    <Banknote className="h-6 w-6 text-primary mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium">Otros Métodos</h4>
                      <p className="text-sm text-muted-foreground">PayPal, Transferencia bancaria</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={!selectedPayment}
              className="w-full"
              size="lg"
            >
              Pagar {total} {ticket.currency}
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
              <h3 className="text-lg font-semibold mb-2">Procesando Pago...</h3>
              <p className="text-muted-foreground">
                {selectedPayment === "crypto" 
                  ? "Confirma la transacción en tu wallet"
                  : "Procesando tu pago de forma segura"
                }
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
              <h3 className="text-lg font-semibold mb-2">¡Pago Exitoso!</h3>
              <p className="text-muted-foreground">
                Tus tickets han sido enviados a tu email y wallet
              </p>
            </div>
            <div className="space-y-3">
              <Button onClick={() => navigate("/")} className="w-full" size="lg">
                Volver al Inicio
              </Button>
              <Button variant="outline" className="w-full">
                Ver Mis Tickets
              </Button>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Error en el Pago</h3>
              <p className="text-muted-foreground">
                No se pudo procesar el pago. Inténtalo de nuevo.
              </p>
            </div>
            <Button 
              onClick={() => setPaymentState("selecting")} 
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ticket Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Detalles del Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <img 
                    src={ticket.image} 
                    alt={ticket.title}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{ticket.title}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {ticket.category}
                    </Badge>
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
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Precio por ticket:</span>
                  <span>{ticket.price} {ticket.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cantidad:</span>
                  <span>{quantity}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{total} {ticket.currency}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Pago</CardTitle>
              </CardHeader>
              <CardContent>
                {renderPaymentContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}