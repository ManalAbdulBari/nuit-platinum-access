import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/concierge")({
  head: () => ({ meta: [{ title: "Concierge — Nuit Platinum" }] }),
  component: Concierge,
});

interface Msg { from: "me" | "vip"; text: string }

const seed: Msg[] = [
  { from: "vip", text: "Bonsoir Mr. Ali. Your Maison Noir table is confirmed for Saturday — chef has prepared a private menu." },
  { from: "me", text: "Add a black-car arrival for two, please." },
  { from: "vip", text: "Of course. A Ghost will be at your residence at 8:15pm. Anything else for the evening?" },
];

function Concierge() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "me", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "vip", text: "Noted. Your concierge is arranging this now — a confirmation will follow shortly." }]);
    }, 900);
  };

  return (
    <AppLayout>
      <header className="px-5 pt-12 pb-4 animate-fade-up">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">24 / 7 VIP Line</p>
        <h1 className="font-display text-3xl">Concierge</h1>
        <div className="mt-3 glass rounded-2xl p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full gradient-gold grid place-items-center text-primary-foreground"><Sparkles className="h-4 w-4" /></div>
          <div>
            <p className="font-display text-sm">Élise · Senior Concierge</p>
            <p className="text-[10px] uppercase tracking-widest text-gold">Online · AI + Human</p>
          </div>
        </div>
      </header>

      <div className="px-5 space-y-3 pb-32">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-fade-up`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
              m.from === "me" ? "gradient-gold text-primary-foreground rounded-br-sm" : "glass-strong rounded-bl-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 inset-x-0 px-5 z-40">
        <div className="max-w-md mx-auto glass-strong rounded-2xl flex items-center gap-2 px-3 py-2 shadow-luxe">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="How may we serve you?"
            className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground py-2"
          />
          <button onClick={send} className="h-10 w-10 rounded-xl gradient-gold grid place-items-center text-primary-foreground shadow-glow">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
