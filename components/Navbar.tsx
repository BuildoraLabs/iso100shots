"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ease-out ${
        scrolled || menuOpen
          ? "bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <a
          href="/"
          className="text-sm font-medium tracking-[0.16em] text-white sm:tracking-[0.24em]"
        >
          iso.100.shots
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] text-white/62 md:flex">
          {links.map((link) => (
            <a key={link.href} className="transition hover:text-white" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col items-center justify-center gap-[5px] p-2 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex max-h-[calc(100svh-4rem)] flex-col overflow-y-auto border-t border-white/10 bg-black/92 px-5 pb-6 pt-4 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="py-3 text-sm uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
