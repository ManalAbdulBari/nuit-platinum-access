import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, MessageCircle, User, LayoutDashboard } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/concierge", label: "Concierge", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 pt-2 pointer-events-none">
      <div className="glass-strong mx-auto max-w-md rounded-2xl shadow-luxe pointer-events-auto px-2 py-2 flex items-center justify-between">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/home" && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                active ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
              <span className="text-[10px] tracking-widest uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
