import { VisitorCounter } from "@/components/VisitorCounter";

export function Footer() {
  return (
    <footer className="px-6 py-10 text-center text-sm text-white/38">
      <span>&copy; 2026 iso.100.shots</span>
      <span className="mx-2 hidden text-white/24 sm:inline">/</span>
      <VisitorCounter />
    </footer>
  );
}
