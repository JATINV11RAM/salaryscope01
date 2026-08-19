"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/in-hand-salary-calculator" },
  { label: "Guides", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{ backgroundColor: "#1A6B9A", height: "36px" }}
        className="flex items-center justify-center px-4"
      >
        <p style={{ color: "#fff", fontSize: "12px" }} className="text-center">
          FY 2025–26 salary planning, built for Indian payroll. No sign-up required.
        </p>
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-white"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <div className="container-site flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 no-underline">
            <span
              style={{
                color: "#1A6B9A",
                fontWeight: 700,
                fontSize: "1.25rem",
                fontFamily: "var(--font-inter)",
              }}
            >
              ₹SalaryScope
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150"
                style={{
                  color: pathname === link.href ? "#1A6B9A" : "#1A1A2E",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/in-hand-salary-calculator"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1A6B9A", minHeight: "44px" }}
            >
              Calculate Salary
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded-lg"
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-0.5 transition-all duration-200"
                style={{
                  backgroundColor: "#1A1A2E",
                  transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-200"
                style={{
                  backgroundColor: "#1A1A2E",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-200"
                style={{
                  backgroundColor: "#1A1A2E",
                  transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 top-[108px] z-40 bg-white flex flex-col items-center pt-8 gap-2"
            style={{ borderTop: "1px solid #E5E7EB" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-4 text-lg font-medium"
                style={{
                  color: pathname === link.href ? "#1A6B9A" : "#1A1A2E",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/in-hand-salary-calculator"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 rounded-lg text-white text-base font-medium"
              style={{ backgroundColor: "#1A6B9A" }}
            >
              Calculate Salary
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
