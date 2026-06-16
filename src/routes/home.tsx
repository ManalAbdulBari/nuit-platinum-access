import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Bell } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { ListingCard } from "@/components/ListingCard";
import { categories, featured, listings } from "@/lib/mock-data";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Nuit Platinum — Home" }] }),
  component: Home,
});

function Home() {
  return (
    <AppLayout>
      <header className="px-5 pt-12 pb-4 flex items-center justify-between animate-fade-up">
        <div className="flex items-center gap-3">
          <Logo size={42} />
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Bonsoir</p>
            <p className="font-display text-lg">Mr. Ali</p>
          </div>
        </div>
        <button className="glass h-10 w-10 rounded-full grid place-items-center text-gold">
          <Bell className="h-4 w-4" />
        </button>
      </header>

      <section className="px-5 mt-2 animate-fade-up">
        <h1 className="font-display text-4xl leading-tight">
          Where luxury <em className="font-script text-gradient-gold">takes you</em>
        </h1>
        <div className="mt-5 glass-strong rounded-2xl flex items-center gap-3 px-4 py-3 shadow-luxe">
          <Search className="h-4 w-4 text-gold" />
          <input
            placeholder="Search villas, clubs, chauffeurs…"
            className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
          />
        </div>
      </section>

      <section className="mt-8 animate-fade-up">
        <div className="px-5 flex items-baseline justify-between mb-3">
          <h2 className="font-display text-xl">Curated Worlds</h2>
          <Link to="/explore" className="text-[10px] tracking-widest uppercase text-gold">See all</Link>
        </div>
        <div className="grid grid-cols-3 gap-3 px-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/explore"
              search={{ category: c.id }}
              className="group relative aspect-square overflow-hidden rounded-2xl glass shadow-luxe"
            >
              <img src={c.image} alt={c.label} loading="lazy" className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 text-xs font-display text-foreground">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 animate-fade-up">
        <div className="px-5 flex items-baseline justify-between mb-3">
          <h2 className="font-display text-xl">Featured Tonight</h2>
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Platinum picks</span>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="mt-10 px-5 animate-fade-up">
        <h2 className="font-display text-xl mb-3">The Reserve</h2>
        <div className="grid gap-4">
          {listings.slice(2, 5).map((l) => (
            <ListingCard key={l.id} listing={l} wide />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
