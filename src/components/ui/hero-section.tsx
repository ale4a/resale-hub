import { Button } from "./button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import heroImage from "@/assets/concert-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Concert stage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="mr-2 h-4 w-4" />
              Plataforma Descentralizada
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            El futuro de la{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              reventa de tickets
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Compra y vende tickets de forma segura usando tecnología blockchain. 
            Sin intermediarios, sin estafas, solo transacciones directas y transparentes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="group"
              onClick={() => {
                const browseSection = document.getElementById('browse');
                browseSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar Tickets
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const howItWorksSection = document.getElementById('how-it-works');
                howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Cómo Funciona
            </Button>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Seguro</h3>
                <p className="text-sm text-muted-foreground">Transacciones protegidas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Rápido</h3>
                <p className="text-sm text-muted-foreground">Compra instantánea</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Global</h3>
                <p className="text-sm text-muted-foreground">Acceso mundial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};