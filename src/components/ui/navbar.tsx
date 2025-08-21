// src/components/Navbar.tsx
import { useState } from "react";
import { Button } from "./button";
import { Menu, X, Ticket, Wallet } from "lucide-react";
import { useWallet } from "@/contexts/WalletProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";

const shorten = (addr?: string, left = 6, right = 4) =>
  addr
    ? addr.length > left + right
      ? `${addr.slice(0, left)}…${addr.slice(-right)}`
      : addr
    : "";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // Si estamos en la página principal, hacer scroll directo
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Si estamos en otra página, navegar primero y luego hacer scroll
      navigate(`/#${sectionId}`);
      // Usar setTimeout para asegurar que la página se cargue antes del scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // Aumentado el tiempo para asegurar que la página se cargue completamente
    }
  };

  const handleBrowseClick = () => {
    scrollToSection("browse");
    setIsMenuOpen(false); // Cerrar menú móvil si está abierto
  };

  const handleHowItWorksClick = () => {
    scrollToSection("how-it-works");
    setIsMenuOpen(false); // Cerrar menú móvil si está abierto
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                <Ticket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Ticket Resale
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleBrowseClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse
            </button>
            <button
              onClick={handleHowItWorksClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <Link
              to="/my-tickets"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              My Tickets
            </Link>
            <div className="text-muted-foreground cursor-not-allowed">
              Sell{" "}
              <span className="text-xs bg-warning px-2 py-1 rounded-full text-warning-foreground ml-1">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {shorten(address)}
                </span>
              </div>
            )}
            <Button variant="outline">Sign In</Button>
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
              <button
                onClick={handleBrowseClick}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Browse
              </button>
              <button
                onClick={handleHowItWorksClick}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                How It Works
              </button>
              <Link
                to="/my-tickets"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Tickets
              </Link>
              <div className="text-muted-foreground">
                Sell{" "}
                <span className="text-xs bg-warning px-2 py-1 rounded-full text-warning-foreground ml-1">
                  Coming Soon
                </span>
              </div>
              {isConnected && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {shorten(address)}
                  </span>
                </div>
              )}
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
