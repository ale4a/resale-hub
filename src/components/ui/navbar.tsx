import { useState } from "react";
import { Button } from "./button";
import { Menu, X, Ticket } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="#browse" className="text-muted-foreground hover:text-foreground transition-colors">
              Explorar
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              Cómo Funciona
            </a>
            <div className="text-muted-foreground cursor-not-allowed">
              Vender <span className="text-xs bg-warning px-2 py-1 rounded-full text-warning-foreground ml-1">Próximamente</span>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Conectar Wallet</Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <a href="#browse" className="text-muted-foreground hover:text-foreground transition-colors">
                Explorar
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                Cómo Funciona
              </a>
              <div className="text-muted-foreground">
                Vender <span className="text-xs bg-warning px-2 py-1 rounded-full text-warning-foreground ml-1">Próximamente</span>
              </div>
              <Button variant="outline" className="w-full">Conectar Wallet</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};