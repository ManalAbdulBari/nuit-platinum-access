import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Shield, Sparkles } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/booking/$id")({
  loader: ({ params }) => {
    const listing = listings.find((l) => l.id === params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: () => ({ meta: [{ title: "Booking — Nuit Platinum" }] }),
  notFoundComponent: () => <AppLayout><div className="p-10 text-center">Not found.</div></AppLayout>,
  errorComponent: () => <AppLayout><div className="p-10 text-center">Error.</div></AppLayout>,
  component: Booking,
});

const steps = ["Details", "Verify", "Concierge", "Confirm"] as const;

function Booking() {
  const { listing } = Route.useLoaderData();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <AppLayout>
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center animate-fade-up">
          <div className="h-20 w-20 rounded-full gradient-gold grid place-items-center shadow-glow">
            <Check className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl mt-6">Request Submitted</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Your concierge will personally confirm <span className="text-gold">{listing.name}</span> within the hour.
          </p>
          <Link to="/profile" className="mt-8 gradient-gold text-primary-foreground px-6 py-3 rounded-xl text-xs uppercase tracking-widest shadow-glow">
            View My Bookings
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <header className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => (step === 0 ? navigate({ to: "/listing/$id", params: { id: listing.id } }) : setStep(step - 1))} className="glass h-10 w-10 rounded-full grid place-items-center text-gold">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Step {step + 1} of {steps.length}</p>
          <h1 className="font-display text-2xl">{steps[step]}</h1>
        </div>
      </header>

      <div className="px-5 mb-6">
        <div className="h-1 rounded-full glass overflow-hidden">
          <div className="h-full gradient-gold transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <div className="px-5 animate-fade-up">
        {step === 0 && (
          <div className="space-y-4">
            <Field label="Arrival">
              <input type="date" className="bg-transparent outline-none w-full text-sm" />
            </Field>
            <Field label="Departure">
              <input type="date" className="bg-transparent outline-none w-full text-sm" />
            </Field>
            <Field label="Guests">
              <input type="number" defaultValue={2} className="bg-transparent outline-none w-full text-sm" />
            </Field>
            <Field label="Special requests">
              <textarea rows={3} placeholder="Champagne, dietary preferences, transport…" className="bg-transparent outline-none w-full text-sm placeholder:text-muted-foreground" />
            </Field>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <div className="glass-strong rounded-2xl p-5 flex items-start gap-3">
              <Shield className="h-5 w-5 text-gold shrink-0 mt-1" />
              <div className="text-sm">
                <p className="font-display text-lg">Guest Verification</p>
                <p className="text-muted-foreground text-xs mt-1">Discretion is paramount. We verify each guest to protect our hosts and members.</p>
              </div>
            </div>
            <Field label="Full legal name"><input className="bg-transparent outline-none w-full text-sm" placeholder="Ummar Ali" /></Field>
            <Field label="Passport / ID"><input className="bg-transparent outline-none w-full text-sm" placeholder="••• ••• •••" /></Field>
            <Field label="Mobile"><input className="bg-transparent outline-none w-full text-sm" placeholder="+971" /></Field>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            {[
              { t: "Personal Concierge", d: "Dedicated 24/7 line for this booking", price: 0 },
              { t: "Chauffeur Service", d: "Black-car arrival & departure", price: 450 },
              { t: "Private Chef", d: "Tasting menu in residence", price: 1200 },
              { t: "Floral & Ambience", d: "Curated by Maison de Fleur", price: 280 },
            ].map((opt, i) => (
              <label key={opt.t} className="glass rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-display text-lg">{opt.t}</p>
                  <p className="text-xs text-muted-foreground">{opt.d}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gold">{opt.price ? `+$${opt.price}` : "Included"}</span>
                  <input type="checkbox" defaultChecked={i === 0} className="h-4 w-4 accent-[oklch(0.86_0.11_88)]" />
                </div>
              </label>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="glass-strong rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src={listing.image} alt={listing.name} className="h-16 w-16 rounded-xl object-cover" />
              <div>
                <p className="font-display text-lg">{listing.name}</p>
                <p className="text-xs text-muted-foreground">{listing.location}</p>
              </div>
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <Row k="Stay" v="3 nights" />
              <Row k="Guests" v="2" />
              <Row k="Concierge" v="Included" />
              <Row k="Total" v={`$${(listing.price * 3).toLocaleString()}`} accent />
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
              <p>Approval-based. Your request will be reviewed by our team — typically within an hour.</p>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-24 inset-x-0 px-5 z-40">
        <button
          onClick={() => (step === steps.length - 1 ? setDone(true) : setStep(step + 1))}
          className="max-w-md mx-auto block w-full gradient-gold text-primary-foreground py-4 rounded-2xl text-xs uppercase tracking-[0.3em] font-semibold shadow-glow"
        >
          {step === steps.length - 1 ? "Submit Request" : "Continue"}
        </button>
      </div>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl px-4 py-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      {children}
    </div>
  );
}
function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={accent ? "text-gold font-display text-lg" : ""}>{v}</span>
    </div>
  );
}
