import concertImage from "@/assets/concert-hero.jpg";
import artImage from "@/assets/art-event.jpg";
import theaterImage from "@/assets/theater-event.jpg";
import sportsImage from "@/assets/sports-event.jpg";

export interface Ticket {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  available: number;
  total: number;
  seller: string;
  description: string;
}

export const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Concierto de Indie Rock - Los Volcanes",
    category: "concierto",
    date: "2024-03-15",
    time: "20:00",
    location: "Teatro Nacional, Ciudad de México",
    price: 45,
    currency: "USDC",
    image: concertImage,
    available: 12,
    total: 50,
    seller: "0x1234...abcd",
    description: "Una noche increíble con Los Volcanes en el Teatro Nacional",
  },
  {
    id: "2",
    title: "Exhibición de Arte Contemporáneo",
    category: "arte",
    date: "2024-03-20",
    time: "10:00",
    location: "Museo de Arte Moderno, Madrid",
    price: 25,
    currency: "USDC",
    image: artImage,
    available: 25,
    total: 100,
    seller: "0x5678...efgh",
    description: "Descubre las últimas tendencias en arte contemporáneo",
  },
  {
    id: "3",
    title: "Hamlet - Obra Teatral Clásica",
    category: "teatro",
    date: "2024-03-25",
    time: "19:30",
    location: "Teatro Real, Madrid",
    price: 80,
    currency: "USDC",
    image: theaterImage,
    available: 8,
    total: 30,
    seller: "0x9012...ijkl",
    description:
      "La obra maestra de Shakespeare interpretada por el mejor elenco",
  },
  {
    id: "4",
    title: "Final Copa del Rey - Fútbol",
    category: "deportes",
    date: "2024-04-05",
    time: "21:00",
    location: "Estadio Santiago Bernabéu, Madrid",
    price: 150,
    currency: "USDC",
    image: sportsImage,
    available: 3,
    total: 20,
    seller: "0x3456...mnop",
    description: "La final más esperada del año en el fútbol español",
  },
  {
    id: "5",
    title: "Festival de Jazz Internacional",
    category: "festival",
    date: "2024-04-12",
    time: "18:00",
    location: "Parque del Retiro, Madrid",
    price: 65,
    currency: "USDC",
    image: concertImage,
    available: 45,
    total: 200,
    seller: "0x7890...qrst",
    description: "Tres días de jazz con artistas internacionales",
  },
  {
    id: "6",
    title: "Conferencia Tech Summit 2024",
    category: "conferencia",
    date: "2024-04-18",
    time: "09:00",
    location: "Centro de Convenciones, Barcelona",
    price: 120,
    currency: "USDC",
    image: artImage,
    available: 0,
    total: 500,
    seller: "0xabcd...uvwx",
    description: "Las últimas tendencias en tecnología y startup",
  },
];

export const mockPurchasedTickets = [
  {
    id: "purchased-1",
    title: "Taylor Swift - The Eras Tour",
    category: "concierto",
    date: "2024-06-15",
    time: "20:00",
    location: "SoFi Stadium, Los Angeles",
    price: 250,
    currency: "USD",
    image: "/src/assets/concert-hero.jpg",
    purchaseDate: "2024-01-15",
    orderNumber: "ORD-2024-001",
    status: "confirmed",
    quantity: 2,
    totalPaid: 500,
    paymentMethod: "Credit Card",
  },
  {
    id: "purchased-2",
    title: "NBA Finals Game 7",
    category: "deportes",
    date: "2024-05-30",
    time: "19:30",
    location: "Madison Square Garden, New York",
    price: 180,
    currency: "USD",
    image: "/src/assets/sports-event.jpg",
    purchaseDate: "2024-01-10",
    orderNumber: "ORD-2024-002",
    status: "confirmed",
    quantity: 1,
    totalPaid: 180,
    paymentMethod: "Crypto",
  },
  {
    id: "purchased-3",
    title: "Hamilton - Broadway Musical",
    category: "teatro",
    date: "2024-07-20",
    time: "14:00",
    location: "Richard Rodgers Theatre, New York",
    price: 120,
    currency: "USD",
    image: "/src/assets/theater-event.jpg",
    purchaseDate: "2024-01-05",
    orderNumber: "ORD-2024-003",
    status: "confirmed",
    quantity: 3,
    totalPaid: 360,
    paymentMethod: "PayPal",
  },
  {
    id: "purchased-4",
    title: "Art Basel Miami Beach",
    category: "arte",
    date: "2024-12-05",
    time: "10:00",
    location: "Miami Beach Convention Center",
    price: 85,
    currency: "USD",
    image: "/src/assets/art-event.jpg",
    purchaseDate: "2024-01-20",
    orderNumber: "ORD-2024-004",
    status: "pending",
    quantity: 1,
    totalPaid: 85,
    paymentMethod: "Bank Transfer",
  },
];
