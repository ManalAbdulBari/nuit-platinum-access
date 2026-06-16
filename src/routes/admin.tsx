import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, Calendar, Plus, Check, X } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { listings } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Owner Dashboard — Nuit Platinum" }] }),
  component: Admin,
});

function Admin() {
  const stats = [
    { label: "Revenue", value: "$284K", icon: TrendingUp, hint: "+18% MoM" },
    { label: "VIP Users", value: "1,248", icon: Users, hint: "+62 this week" },
    { label: "Bookings", value: "94", icon: Calendar, hint: "12 pending" },
  ];

  const pending = listings.slice(0, 3);

  return (
    <AppLayout>
      <header className="px-5 pt-12 pb-4 animate-fade-up">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Owner Dashboard</p>
        <h1 className="font-display text-3xl">Welcome, Ummar</h1>
      </header>

      <section className="px-5 grid grid-cols-3 gap-2 animate-fade-up">
        {stats.map((s) => (
          <div key={s.label} className="glass-strong rounded-2xl p-3">
            <s.icon className="h-4 w-4 text-gold mb-2" />
            <p className="font-display text-xl">{s.value}</p>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="text-[9px] text-gold mt-1">{s.hint}</p>
          </div>
        ))}
      </section>

      <section className="px-5 mt-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-xl">Pending Approvals</h2>
          <span className="text-[10px] text-gold uppercase tracking-widest">3 new</span>
        </div>
        <div className="space-y-3">
          {pending.map((l) => (
            <div key={l.id} className="glass rounded-2xl p-3 flex items-center gap-3">
              <img src={l.image} className="h-14 w-14 rounded-xl object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <p className="font-display text-base truncate">{l.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Guest: A. Khan · 3 nights</p>
              </div>
              <button className="h-9 w-9 rounded-full gradient-gold grid place-items-center text-primary-foreground"><Check className="h-4 w-4" /></button>
              <button className="h-9 w-9 rounded-full glass grid place-items-center text-muted-foreground"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-xl">Listings</h2>
          <button className="glass px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-gold flex items-center gap-1">
            <Plus className="h-3 w-3" /> New
          </button>
        </div>
        <div className="space-y-2">
          {listings.map((l) => (
            <div key={l.id} className="glass rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={l.image} className="h-10 w-10 rounded-lg object-cover" alt="" />
                <div>
                  <p className="text-sm font-display">{l.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{l.category}</p>
                </div>
              </div>
              <span className="text-[10px] text-gold uppercase tracking-widest">{l.exclusivity}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8 mb-4">
        <h2 className="font-display text-xl mb-3">Demand Pulse</h2>
        <div className="glass-strong rounded-2xl p-4">
          <div className="flex items-end gap-1.5 h-24">
            {[40, 65, 50, 80, 92, 70, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-t gradient-gold opacity-80" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] uppercase tracking-widest text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
