import { useState, useMemo } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { TicketFilters } from "@/components/ui/ticket-filters";
import { TicketCard } from "@/components/ui/ticket-card";
import { HowItWorks } from "@/components/ui/how-it-works";
import { mockTickets } from "@/data/mockTickets";

const Index = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    date: ""
  });

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      const matchesSearch = ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           ticket.location.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || ticket.category === filters.category;
      
      // For date filtering, we'll implement basic logic
      const matchesDate = !filters.date || true; // Simplified for demo
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Tickets Section */}
      <section id="browse" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Tickets Disponibles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre eventos increíbles y compra tus tickets de forma segura
            </p>
          </div>

          <div className="mb-8">
            <TicketFilters onFilterChange={setFilters} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                id={ticket.id}
                title={ticket.title}
                category={ticket.category}
                date={ticket.date}
                time={ticket.time}
                location={ticket.location}
                price={ticket.price}
                currency={ticket.currency}
                image={ticket.image}
                available={ticket.available}
                total={ticket.total}
                seller={ticket.seller}
              />
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No se encontraron tickets que coincidan con tus filtros
              </p>
            </div>
          )}
        </div>
      </section>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold">Ticket Resale</span>
            </div>
            <p className="text-muted-foreground mb-4">
              La plataforma descentralizada para compra y venta de tickets
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Ticket Resale. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
