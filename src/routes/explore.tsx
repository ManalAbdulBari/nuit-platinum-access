import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, MapPin } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { ListingCard } from "@/components/ListingCard";
import { categories, listings, type Category } from "@/lib/mock-data";

const searchSchema = z.object({
  category: z.enum(["villas", "restaurants", "resorts", "cars", "clubs", "cafes"]).optional(),
});

export const Route = createFileRoute("/explore")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Explore — Nuit Platinum" }] }),
  component: Explore,
});

function Explore() {
  const { category } = Route.useSearch();
  const [active, setActive] = useState<Category | "all">(category ?? "all");
  const [tier, setTier] = useState<string>("all");

  const filtered = listings.filter(
    (l) => (active === "all" || l.category === active) && (tier === "all" || l.exclusivity === tier)
  );

  return (
    <AppLayout>
      <header className="px-5 pt-12 pb-4 animate-fade-up">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold">The Atlas</p>
        <h1 className="font-display text-4xl">Explore</h1>
      </header>

      <div className="px-5 flex gap-2 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden">
        {(["all", ...categories.map((c) => c.id)] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition ${
              active === c ? "gradient-gold text-primary-foreground shadow-glow" : "glass text-muted-foreground"
            }`}
          >
            {c === "all" ? "All" : categories.find((x) => x.id === c)?.label}
          </button>
        ))}
      </div>

      <div className="px-5 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{filtered.length} curated</span>
        </div>
        <div className="flex gap-1">
          {["all", "Gold", "Platinum", "Invite Only"].map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider ${
                tier === t ? "text-gold gold-border" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 grid gap-4 animate-fade-up">
        {filtered.map((l) => (
          <ListingCard key={l.id} listing={l} wide />
        ))}
        {filtered.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center">
            <MapPin className="h-6 w-6 text-gold mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nothing matches — your concierge can craft this for you.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
