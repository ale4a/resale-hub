// src/components/Navbar.tsx
import { useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Menu, X, Ticket, LogOut, Wallet } from "lucide-react";
import { useWallet } from "@/contexts/WalletProvider";

const shorten = (addr?: string, left = 6, right = 4) =>
  addr
    ? addr.length > left + right
      ? `${addr.slice(0, left)}…${addr.slice(-right)}`
      : addr
    : "";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Ticket Resale
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#browse"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Explorar
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cómo Funciona
            </a>
            <div className="text-muted-foreground cursor-not-allowed">
              Vender{" "}
              <span className="text-xs bg-warning px-2 py-1 rounded-full text-warning-foreground ml-1">
                Próximamente
              </span>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <Button variant="outline" onClick={() => setLogoutOpen(true)}>
                {shorten(address)} • Logout
              </Button>
            ) : (
              <Button variant="outline" onClick={connect}>
                <Wallet className="mr-2 h-4 w-4" /> Conectar Wallet
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#browse"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Explorar
              </a>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cómo Funciona
              </a>
              <div className="text-muted-foreground">
                Vender{" "}
                <span className="text-xs bg-warning px-2 py-1 rounded-full text-warning-foreground ml-1">
                  Próximamente
                </span>
              </div>
              {isConnected ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLogoutOpen(true)}
                >
                  {shorten(address)} • Logout
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={connect}>
                  <Wallet className="mr-2 h-4 w-4" /> Conectar Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logout modal */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Disconnect Wallet</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            You are connected as <span className="font-mono">{address}</span>.
          </p>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setLogoutOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                disconnect();
                setLogoutOpen(false);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
};
