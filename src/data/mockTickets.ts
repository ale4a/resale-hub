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
    price: 0.05,
    currency: "ETH",
    image: concertImage,
    available: 12,
    total: 50,
    seller: "0x1234...abcd",
    description: "Una noche increíble con Los Volcanes en el Teatro Nacional"
  },
  {
    id: "2",
    title: "Exhibición de Arte Contemporáneo",
    category: "arte",
    date: "2024-03-20",
    time: "10:00",
    location: "Museo de Arte Moderno, Madrid",
    price: 0.02,
    currency: "ETH",
    image: artImage,
    available: 25,
    total: 100,
    seller: "0x5678...efgh",
    description: "Descubre las últimas tendencias en arte contemporáneo"
  },
  {
    id: "3",
    title: "Hamlet - Obra Teatral Clásica",
    category: "teatro",
    date: "2024-03-25",
    time: "19:30",
    location: "Teatro Real, Madrid",
    price: 0.08,
    currency: "ETH",
    image: theaterImage,
    available: 8,
    total: 30,
    seller: "0x9012...ijkl",
    description: "La obra maestra de Shakespeare interpretada por el mejor elenco"
  },
  {
    id: "4",
    title: "Final Copa del Rey - Fútbol",
    category: "deportes",
    date: "2024-04-05",
    time: "21:00",
    location: "Estadio Santiago Bernabéu, Madrid",
    price: 0.15,
    currency: "ETH",
    image: sportsImage,
    available: 3,
    total: 20,
    seller: "0x3456...mnop",
    description: "La final más esperada del año en el fútbol español"
  },
  {
    id: "5",
    title: "Festival de Jazz Internacional",
    category: "festival",
    date: "2024-04-12",
    time: "18:00",
    location: "Parque del Retiro, Madrid",
    price: 0.06,
    currency: "ETH",
    image: concertImage,
    available: 45,
    total: 200,
    seller: "0x7890...qrst",
    description: "Tres días de jazz con artistas internacionales"
  },
  {
    id: "6",
    title: "Conferencia Tech Summit 2024",
    category: "conferencia",
    date: "2024-04-18",
    time: "09:00",
    location: "Centro de Convenciones, Barcelona",
    price: 0.12,
    currency: "ETH",
    image: artImage,
    available: 0,
    total: 500,
    seller: "0xabcd...uvwx",
    description: "Las últimas tendencias en tecnología y startup"
  }
];