import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/home" }), 3200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.86_0.11_88/15%),transparent_60%)]" />
      <div className="relative z-10 animate-fade-up">
        <div className="pulse-glow rounded-full p-4">
          <Logo size={220} />
        </div>
        <p className="mt-6 text-xs tracking-[0.5em] uppercase shimmer-text">Exclusive Access Only</p>
      </div>
      <Link
        to="/home"
        className="absolute bottom-12 text-[11px] tracking-[0.4em] uppercase text-muted-foreground hover:text-gold transition-colors"
      >
        Enter →
      </Link>
    </div>
  );
}
