import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletProvider";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import {
  Calendar,
  MapPin,
  Wallet as WalletIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: {
        method: string;
        params?: any[] | object;
      }) => Promise<any>;
    };
  }
}

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

type PurchaseState =
  | "wallet"
  | "connecting"
  | "connected"
  | "processing"
  | "success"
  | "error";

export const PurchaseModal = ({
  isOpen,
  onClose,
  ticket,
}: PurchaseModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected, address, chainId, connect } = useWallet();

  const [purchaseState, setPurchaseState] = useState<PurchaseState>("wallet");
  const [quantity, setQuantity] = useState(1);

  // Helpers
  const shorten = (addr?: string, left = 6, right = 4) =>
    addr
      ? addr.length > left + right
        ? `${addr.slice(0, left)}…${addr.slice(-right)}`
        : addr
      : "";

  // Mantener el estado del step según la conexión global
  useEffect(() => {
    setPurchaseState(isConnected ? "connected" : "wallet");
  }, [isConnected, isOpen]);

  // Conectar usando el contexto (con estado "connecting" y toasts)
  const handleConnect = async () => {
    if (!window.ethereum?.isMetaMask) {
      setPurchaseState("error");
      toast({
        title: "MetaMask no encontrada",
        description: "Instala la extensión de MetaMask e inténtalo nuevamente.",
        variant: "destructive",
      });
      return;
    }
    try {
      setPurchaseState("connecting");
      await connect(); // WalletProvider gestiona eth_requestAccounts, chainId y persistencia
      setPurchaseState("connected");
      if (address) {
        toast({
          title: "Wallet conectada",
          description: `Cuenta: ${shorten(address)}`,
        });
      } else {
        toast({ title: "Wallet conectada" });
      }
    } catch (err: any) {
      setPurchaseState("error");
      toast({
        title: "Error de conexión",
        description: err?.message ?? "No se pudo conectar con MetaMask",
        variant: "destructive",
      });
    }
  };

  // Firma “mock” (no on-chain)
  const signMock = async () => {
    if (!window.ethereum || !address) {
      toast({
        title: "No hay wallet",
        description: "Conecta tu wallet para firmar.",
        variant: "destructive",
      });
      return;
    }
    try {
      const message = `Compra simulada • ticket=${
        ticket.id
      } • qty=${quantity} • ts=${Date.now()}`;
      const sig = await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      });
      toast({
        title: "Firma completada",
        description: `Signature: ${shorten(sig, 10, 8)}`,
      });
      // Enviar a backend si deseas verificación: { address, message, sig }
    } catch (err: any) {
      toast({
        title: "Error al firmar",
        description: err?.message ?? "No se pudo firmar el mensaje",
        variant: "destructive",
      });
    }
  };

  const goToCheckout = () => {
    navigate("/checkout", { state: { ticket, quantity, address, chainId } });
    onClose();
  };

  const resetModal = () => {
    setPurchaseState(isConnected ? "connected" : "wallet");
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
                <WalletIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Conecta tu Wallet</h3>
              <p className="text-muted-foreground">
                Necesitas conectar MetaMask para realizar la compra
              </p>
            </div>

            <Button onClick={handleConnect} className="w-full" size="lg">
              <WalletIcon className="mr-2 h-5 w-5" />
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
            <div className="flex flex-col items-center justify-center space-y-1 text-success">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Wallet conectada</span>
              <span className="text-xs text-muted-foreground">
                {shorten(address)} • chain {chainId}
              </span>
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
                  <span>
                    {ticket.price * quantity} {ticket.currency}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  onClick={signMock}
                  variant="outline"
                  className="w-1/2"
                  size="lg"
                >
                  Firmar (mock)
                </Button>
                <Button onClick={goToCheckout} className="w-1/2" size="lg">
                  Continuar al Pago
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                La firma es opcional y no envía transacciones on-chain.
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
                Procesando Compra...
              </h3>
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
              <h3 className="text-lg font-semibold mb-2">
                Error en la Conexión
              </h3>
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
    <Dialog open={isOpen} onOpenChange={() => resetModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Comprar Ticket</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
