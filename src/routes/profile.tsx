import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Heart, Clock, Settings } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { listings } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "VIP Profile — Nuit Platinum" }] }),
  component: Profile,
});

function Profile() {
  return (
    <AppLayout>
      <header className="px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="font-display text-3xl">My Suite</h1>
        <button className="glass h-10 w-10 rounded-full grid place-items-center text-gold">
          <Settings className="h-4 w-4" />
        </button>
      </header>

      <section className="px-5 animate-fade-up">
        <div className="glass-strong rounded-3xl p-6 shadow-luxe relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,oklch(0.86_0.11_88/25%),transparent_70%)]" />
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full gradient-gold grid place-items-center text-primary-foreground font-display text-2xl">U</div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Member since 2024</p>
              <p className="font-display text-2xl">Ummar Ali</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Crown className="h-4 w-4 text-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Platinum Tier</span>
          </div>
          <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full gradient-gold" style={{ width: "78%" }} />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">3 bookings until <span className="text-gold">Invite Only</span></p>
        </div>
      </section>

      <section className="px-5 mt-8">
        <Tabs />
      </section>

      <section className="px-5 mt-6 space-y-3 animate-fade-up">
        <h2 className="font-display text-xl flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> Recent Bookings</h2>
        {listings.slice(0, 3).map((l) => (
          <Link key={l.id} to="/listing/$id" params={{ id: l.id }} className="glass rounded-2xl p-3 flex items-center gap-3">
            <img src={l.image} className="h-14 w-14 rounded-xl object-cover" alt={l.name} />
            <div className="flex-1">
              <p className="font-display text-base">{l.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{l.location}</p>
            </div>
            <span className="text-[10px] text-gold uppercase tracking-widest">Confirmed</span>
          </Link>
        ))}

        <h2 className="font-display text-xl mt-8 flex items-center gap-2"><Heart className="h-4 w-4 text-gold" /> Saved</h2>
        <div className="grid grid-cols-2 gap-3">
          {listings.slice(3, 5).map((l) => (
            <Link key={l.id} to="/listing/$id" params={{ id: l.id }} className="glass rounded-2xl overflow-hidden">
              <img src={l.image} className="h-24 w-full object-cover" alt={l.name} />
              <p className="font-display text-sm p-2">{l.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}

function Tabs() {
  const tiers = ["Silver", "Gold", "Platinum", "Invite Only"];
  return (
    <div className="glass rounded-2xl p-2 grid grid-cols-4 gap-1">
      {tiers.map((t, i) => (
        <div key={t} className={`text-center py-2 rounded-xl text-[10px] uppercase tracking-widest ${i === 2 ? "gradient-gold text-primary-foreground" : "text-muted-foreground"}`}>
          {t}
        </div>
      ))}
    </div>
  );
}
