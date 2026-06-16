import villa from "@/assets/villa.jpg";
import restaurant from "@/assets/restaurant.jpg";
import car from "@/assets/car.jpg";
import club from "@/assets/club.jpg";
import resort from "@/assets/resort.jpg";
import cafe from "@/assets/cafe.jpg";

export type Category = "villas" | "restaurants" | "resorts" | "cars" | "clubs" | "cafes";

export interface Listing {
  id: string;
  name: string;
  category: Category;
  location: string;
  price: number;
  rating: number;
  exclusivity: "Gold" | "Platinum" | "Invite Only";
  image: string;
  tagline: string;
  amenities: string[];
}

export const categories: { id: Category; label: string; image: string }[] = [
  { id: "villas", label: "Villas", image: villa },
  { id: "restaurants", label: "Restaurants", image: restaurant },
  { id: "resorts", label: "Resorts", image: resort },
  { id: "cars", label: "Luxury Cars", image: car },
  { id: "clubs", label: "Clubs", image: club },
  { id: "cafes", label: "Cafes", image: cafe },
];

export const listings: Listing[] = [
  {
    id: "amalfi-villa",
    name: "Villa Côte Noire",
    category: "villas",
    location: "Amalfi Coast, IT",
    price: 12500,
    rating: 4.98,
    exclusivity: "Platinum",
    image: villa,
    tagline: "Cliffside infinity sanctuary",
    amenities: ["Private chef", "Helipad", "Spa", "Butler", "Yacht access"],
  },
  {
    id: "noir-dining",
    name: "Maison Noir",
    category: "restaurants",
    location: "Paris, FR",
    price: 850,
    rating: 4.95,
    exclusivity: "Invite Only",
    image: restaurant,
    tagline: "12-seat omakase by candlelight",
    amenities: ["Sommelier", "Private dining", "Caviar pairing"],
  },
  {
    id: "phantom-ghost",
    name: "Rolls-Royce Ghost",
    category: "cars",
    location: "Dubai, UAE",
    price: 2400,
    rating: 4.99,
    exclusivity: "Gold",
    image: car,
    tagline: "Chauffeur-driven, 24h access",
    amenities: ["Chauffeur", "Champagne bar", "Insured"],
  },
  {
    id: "atlas-club",
    name: "Club Atlas",
    category: "clubs",
    location: "Ibiza, ES",
    price: 4500,
    rating: 4.92,
    exclusivity: "Platinum",
    image: club,
    tagline: "VIP table, skybox terrace",
    amenities: ["Bottle service", "Private entrance", "Security"],
  },
  {
    id: "azure-resort",
    name: "Azure Atoll Resort",
    category: "resorts",
    location: "Maldives",
    price: 9800,
    rating: 4.97,
    exclusivity: "Platinum",
    image: resort,
    tagline: "Overwater villa, private reef",
    amenities: ["Private beach", "Seaplane", "Spa", "Diving"],
  },
  {
    id: "noir-cafe",
    name: "Café Lumière",
    category: "cafes",
    location: "Milan, IT",
    price: 180,
    rating: 4.88,
    exclusivity: "Gold",
    image: cafe,
    tagline: "Members-only coffee atelier",
    amenities: ["Private booth", "Reserve menu"],
  },
];

export const featured = listings.slice(0, 4);
