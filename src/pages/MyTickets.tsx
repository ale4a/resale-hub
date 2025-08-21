import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";
import { mockPurchasedTickets } from "@/data/mockTickets";

type TicketStatus = "all" | "confirmed" | "pending" | "cancelled";

export default function MyTickets() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<TicketStatus>("all");

  const getCategoryColor = (category: string) => {
    const colors = {
      concierto:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      teatro: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      deportes:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      arte: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      conferencia:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      festival: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPaymentIcon = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "Credit Card":
        return <CreditCard className="h-4 w-4" />;
      case "Crypto":
        return <Wallet className="h-4 w-4" />;
      case "PayPal":
      case "Bank Transfer":
        return <Banknote className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const filteredTickets = mockPurchasedTickets.filter(
    (ticket) => statusFilter === "all" || ticket.status === statusFilter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold">My Tickets</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tickets</p>
                  <p className="text-2xl font-bold">
                    {mockPurchasedTickets.length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {
                      mockPurchasedTickets.filter(
                        (t) => t.status === "confirmed"
                      ).length
                    }
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {
                      mockPurchasedTickets.filter((t) => t.status === "pending")
                        .length
                    }
                  </p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">
                    $
                    {mockPurchasedTickets
                      .reduce((sum, t) => sum + t.totalPaid, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Banknote className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All Tickets
            </Button>
            <Button
              variant={statusFilter === "confirmed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("confirmed")}
            >
              Confirmed
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "cancelled" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("cancelled")}
            >
              Cancelled
            </Button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 h-48 md:h-auto relative">
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(ticket.category)}>
                        {ticket.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status === "confirmed" && (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {ticket.status === "pending" && (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {ticket.status === "cancelled" && (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {ticket.title}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-2 h-4 w-4" />
                              {formatDate(ticket.date)} • {ticket.time}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-2 h-4 w-4" />
                              {ticket.location}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">
                                Order:
                              </span>
                              <span className="font-mono">
                                {ticket.orderNumber}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">
                                Quantity:
                              </span>
                              <span>{ticket.quantity} ticket(s)</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">
                                Total:
                              </span>
                              <span className="font-semibold">
                                ${ticket.totalPaid} {ticket.currency}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <span className="mr-2">Payment:</span>
                          <div className="flex items-center">
                            {getPaymentIcon(ticket.paymentMethod)}
                            <span className="ml-1">{ticket.paymentMethod}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <span>
                            Purchased {formatDate(ticket.purchaseDate)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
            <p className="text-muted-foreground mb-4">
              {statusFilter === "all"
                ? "You haven't purchased any tickets yet."
                : `No ${statusFilter} tickets found.`}
            </p>
            <Button onClick={() => navigate("/")}>Browse Events</Button>
          </div>
        )}
      </div>
    </div>
  );
}
