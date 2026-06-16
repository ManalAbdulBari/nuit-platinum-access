import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, MapPin, Check, Calendar } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/listing/$id")({
  loader: ({ params }) => {
    const listing = listings.find((l) => l.id === params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.listing.name} — Nuit Platinum` }],
  }),
  notFoundComponent: () => (
    <AppLayout><div className="p-10 text-center text-muted-foreground">Listing not found.</div></AppLayout>
  ),
  errorComponent: () => (
    <AppLayout><div className="p-10 text-center text-muted-foreground">Something went wrong.</div></AppLayout>
  ),
  component: Detail,
});

function Detail() {
  const { listing } = Route.useLoaderData();
  const days = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <AppLayout>
      <div className="relative h-[55vh] -mx-0">
        <img src={listing.image} alt={listing.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        <Link to="/explore" className="absolute top-12 left-5 glass h-10 w-10 rounded-full grid place-items-center text-gold">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <span className="absolute top-12 right-5 glass px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase text-gold">
          {listing.exclusivity}
        </span>
      </div>

      <div className="px-5 -mt-16 relative animate-fade-up">
        <div className="glass-strong rounded-2xl p-5 shadow-luxe">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {listing.location}
              </p>
              <h1 className="font-display text-3xl mt-1">{listing.name}</h1>
              <p className="text-sm italic text-muted-foreground mt-1">{listing.tagline}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-gold text-sm justify-end">
                <Star className="h-3 w-3 fill-current" /> {listing.rating}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">VIP rated</p>
            </div>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="font-display text-xl mb-3">Sanctuary</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A private world reserved for the few who know. Every detail curated by the Nuit Platinum
            concierge — from arrival to encore. Discretion guaranteed.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="font-display text-xl mb-3">Amenities</h2>
          <div className="grid grid-cols-2 gap-2">
            {listing.amenities.map((a) => (
              <div key={a} className="glass rounded-xl px-3 py-2.5 flex items-center gap-2 text-xs">
                <Check className="h-3.5 w-3.5 text-gold" /> {a}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="font-display text-xl mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold" /> Availability
          </h2>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d) => {
              const available = d % 3 !== 0;
              return (
                <button
                  key={d}
                  disabled={!available}
                  className={`aspect-square rounded-lg text-xs ${
                    available ? "glass hover:gradient-gold hover:text-primary-foreground" : "opacity-30"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="fixed bottom-24 inset-x-0 px-5 z-40 pointer-events-none">
        <div className="max-w-md mx-auto glass-strong rounded-2xl p-3 flex items-center justify-between shadow-luxe pointer-events-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
            <p className="font-display text-2xl text-gold">${listing.price.toLocaleString()}<span className="text-xs text-muted-foreground"> /night</span></p>
          </div>
          <Link
            to="/booking/$id"
            params={{ id: listing.id }}
            className="gradient-gold text-primary-foreground px-5 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold shadow-glow"
          >
            Request
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
