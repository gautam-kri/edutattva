"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";
import Logo from "./Logo";
import Icon from "./Icon";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.split("#")[0]);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false);
    setProgOpen(false);
  }, [pathname]);

  // Lock scroll + close on Escape while drawer is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-[var(--shadow-nav)]" : "border-b border-sky-200"
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between gap-4" aria-label="Primary">
        <Link href="/" aria-label="Edutattva Classes — home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors ${
                    isActive(pathname, item.href)
                      ? "text-royal"
                      : "text-navy hover:text-royal"
                  }`}
                >
                  {item.label}
                  <Icon name="chevron" size={16} className="transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="w-64 overflow-hidden rounded-2xl border border-sky-200 bg-white p-2 shadow-[var(--shadow-lift)]">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-sky"
                        >
                          <span className="font-semibold text-navy">{c.label}</span>
                          {c.note && (
                            <span
                              className="text-[0.72rem] font-semibold uppercase tracking-wide text-royal-400"
                              style={{ fontFamily: "var(--font-condensed)" }}
                            >
                              {c.note}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors ${
                    isActive(pathname, item.href) ? "text-royal" : "text-navy hover:text-royal"
                  }`}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:block">
          <Link href="/admissions" className="btn btn-gold">
            Book Free Counselling
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/admissions#enquiry"
            className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy shadow-[0_8px_18px_-8px_rgba(245,183,0,0.7)] transition-colors hover:bg-[#ffc61a]"
            aria-label="Make an enquiry"
          >
            <Icon name="clipboard" size={20} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-xl text-navy hover:bg-sky"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Icon name="menu" size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy/50 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sky-200 px-5 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-xl text-navy hover:bg-sky"
              aria-label="Close menu"
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {nav.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => setProgOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[1.05rem] font-semibold text-navy hover:bg-sky"
                      aria-expanded={progOpen}
                    >
                      {item.label}
                      <Icon
                        name="chevron"
                        size={18}
                        className={`transition-transform ${progOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {progOpen && (
                      <ul className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-sky-200 pl-3">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-navy hover:bg-sky"
                            >
                              <span className="font-medium">{c.label}</span>
                              {c.note && (
                                <span className="text-[0.72rem] font-semibold uppercase text-royal-400">
                                  {c.note}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-4 py-3 text-[1.05rem] font-semibold hover:bg-sky ${
                        isActive(pathname, item.href) ? "text-royal" : "text-navy"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="border-t border-sky-200 p-4">
            <Link href="/admissions" className="btn btn-gold w-full">
              Book Free Counselling
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
