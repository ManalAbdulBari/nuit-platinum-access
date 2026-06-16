import logo from "@/assets/nuit-logo.asset.json";

export function Logo({ className = "", size = 96 }: { className?: string; size?: number }) {
  return (
    <img
      src={logo.url}
      alt="Nuit Platinum"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: "auto" }}
    />
  );
}
