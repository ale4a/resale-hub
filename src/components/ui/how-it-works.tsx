import { CreditCard, Search, Shield, CheckCircle } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Browse Events",
      description: "Search and filter tickets by category, date, and location.",
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Secure Payment",
      description:
        "Pay safely using credit card, PayPal, or other secure payment methods.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Buyer Protection",
      description:
        "Your purchase is protected with our secure escrow system and buyer guarantee.",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Get Your Tickets",
      description:
        "Receive your tickets instantly via email or download them to your phone.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buying tickets has never been easier and safer. Follow these simple
            steps to get your favorite event tickets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border z-0">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                </div>
              )}

              <div className="relative z-10 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <div className="text-primary">{step.icon}</div>
                </div>

                <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-warning/10 px-6 py-3 text-warning">
            <span className="mr-2">🚧</span>
            <span className="font-medium">
              Selling functionality will be available soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
