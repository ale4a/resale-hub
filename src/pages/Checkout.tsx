import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  CreditCard,
  Banknote,
  Loader2,
  CheckCircle,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletProvider";

type PaymentMethod = "card" | "paypal" | "bank" | "crypto";
type PaymentState =
  | "selecting"
  | "connecting"
  | "signing"
  | "processing"
  | "success"
  | "error";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isConnected, address, connect, signMessage } = useWallet();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
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

    if (selectedPayment === "crypto") {
      if (!isConnected) {
        setPaymentState("connecting");
        try {
          await connect();
          setPaymentState("signing");
        } catch (error) {
          setPaymentState("error");
          toast({
            title: "Connection Failed",
            description: "Failed to connect wallet. Please try again.",
            variant: "destructive",
          });
          return;
        }
      } else {
        setPaymentState("signing");
      }

      // Sign authorization message
      try {
        const message = `Crypto Payment Authorization\n\nEvent: ${
          ticket.title
        }\nQuantity: ${quantity}\nTotal: ${total} ${
          ticket.currency
        }\nTimestamp: ${new Date().toISOString()}\n\nI authorize this payment for the above ticket purchase.`;

        await signMessage(message);
        setPaymentState("processing");
      } catch (error) {
        setPaymentState("error");
        toast({
          title: "Signature Failed",
          description:
            "Failed to sign payment authorization. Please try again.",
          variant: "destructive",
        });
        return;
      }
    } else {
      setPaymentState("processing");
    }

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate random success/failure
    if (Math.random() > 0.1) {
      setPaymentState("success");
      toast({
        title: "Payment Successful!",
        description: `You have purchased ${quantity} ticket(s) for ${ticket.title}`,
      });
    } else {
      setPaymentState("error");
      toast({
        title: "Payment Error",
        description: "Could not process payment. Please try again.",
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
              <h3 className="text-lg font-semibold">
                Select your payment method
              </h3>

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
                      <h4 className="font-medium">Credit/Debit Card</h4>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPayment === "paypal" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedPayment("paypal")}
                >
                  <CardContent className="flex items-center p-4">
                    <Banknote className="h-6 w-6 text-primary mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium">PayPal</h4>
                      <p className="text-sm text-muted-foreground">
                        Fast and secure online payments
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPayment === "bank" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedPayment("bank")}
                >
                  <CardContent className="flex items-center p-4">
                    <Banknote className="h-6 w-6 text-primary mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium">Bank Transfer</h4>
                      <p className="text-sm text-muted-foreground">
                        Direct bank transfer
                      </p>
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
                      <h4 className="font-medium">Crypto Payment</h4>
                      <p className="text-sm text-muted-foreground">
                        Pay with ETH, USDC, or other cryptocurrencies
                      </p>
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
              Pay {total} {ticket.currency}
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
              <h3 className="text-lg font-semibold mb-2">
                Connecting Wallet...
              </h3>
              <p className="text-muted-foreground">
                Please approve the connection in your wallet
              </p>
            </div>
          </div>
        );

      case "signing":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Signing Authorization...
              </h3>
              <p className="text-muted-foreground">
                Please sign the payment authorization in your wallet
              </p>
            </div>
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
                Processing your payment securely
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
                Payment Successful!
              </h3>
              <p className="text-muted-foreground">
                Your tickets have been sent to your email
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/")}
                className="w-full"
                size="lg"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/my-tickets")}
              >
                View My Tickets
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
              <h3 className="text-lg font-semibold mb-2">Payment Error</h3>
              <p className="text-muted-foreground">
                Could not process payment. Please try again.
              </p>
            </div>
            <Button
              onClick={() => setPaymentState("selecting")}
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
              Back
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
                  Event Details
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
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Price per ticket:</span>
                  <span>
                    {ticket.price} {ticket.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>
                    {total} {ticket.currency}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>{renderPaymentContent()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
