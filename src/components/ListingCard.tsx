import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Listing } from "@/lib/mock-data";

export function ListingCard({ listing, wide = false }: { listing: Listing; wide?: boolean }) {
  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className={`group block overflow-hidden rounded-2xl glass shadow-luxe transition-transform hover:-translate-y-1 ${
        wide ? "w-full" : "w-64 shrink-0"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={listing.image}
          alt={listing.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <span className="absolute top-3 left-3 glass px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase text-gold">
          {listing.exclusivity}
        </span>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{listing.location}</p>
          <h3 className="font-display text-xl text-foreground">{listing.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground italic">{listing.tagline}</p>
            <span className="flex items-center gap-1 text-xs text-gold">
              <Star className="h-3 w-3 fill-current" /> {listing.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
