"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Zap, X, Search } from "lucide-react";
// Auth modal removed per requirement to keep only homepage

type NavItem = { href: string; label: string };
const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
];

export default function PromoteHeader() {
  const [pathname, setPathname] = React.useState("/");
  const [open, setOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  // Auth modal state removed

  // Safely get pathname from Next.js hook
  let pathnameFromHook = null;
  try {
    pathnameFromHook = usePathname();
  } catch (error) {
    // Hook not available outside Next.js router context
    pathnameFromHook = null;
  }

  const activePath = pathnameFromHook ?? pathname;
  const router = useRouter();

  React.useEffect(() => {
    // Safely get pathname on client side
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  React.useEffect(() => {
    // Initialize theme from localStorage or system
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const systemDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const dark = stored ? stored === "dark" : !!systemDark;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const isActive = (href: string) =>
    href === "/" ? activePath === "/" : activePath?.startsWith(href);

  const primaryBtn =
    "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-semibold " +
    "bg-zinc-900 text-white hover:bg-zinc-900/90 " +
    "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-100/90 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20";

  const secondaryBtn =
    "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium " +
    "text-zinc-800 dark:text-zinc-200 " +
    "border border-zinc-950/20 dark:border-white/20 " +
    "hover:bg-zinc-950/[.03] dark:hover:bg-white/5 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20";

  const desktopLink = (active: boolean) =>
    [
      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
      "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-offset-0",
      "hover:bg-zinc-950/[.03] dark:hover:bg-white/5",
      active
        ? "text-zinc-950 dark:text-zinc-50 ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10 bg-zinc-950/[.03] dark:bg-white/5"
        : "text-zinc-600 dark:text-zinc-400",
    ].join(" ");

  return (
    <>
      {/* Auth modal removed */}
      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] rounded bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Skip to content
      </a>

      {/* Announcement bar removed per design cleanup */}

      {/* Header */}
      <header
        className={[
          "sticky top-0 z-50 w-full backdrop-blur",
          "bg-white/85 dark:bg-zinc-950/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60",
          "border-b border-zinc-950/20 dark:border-white/20",
        ].join(" ")}
      >
        {/* subtle gradient line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-950/10 to-transparent dark:via-white/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 md:h-16 items-center justify-between gap-3">
            {/* Left: burger + brand + desktop nav */}
            <div className="flex items-center gap-2">
              {/* Mobile burger */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={[
                  "md:hidden group relative size-9 rounded-md",
                  "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute inset-x-2 top-[9px] h-[2px] rounded bg-current transition-transform",
                    open ? "translate-y-[6px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current transition-opacity",
                    open ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute inset-x-2 bottom-[9px] h-[2px] rounded bg-current transition-transform",
                    open ? "-translate-y-[6px] -rotate-45" : "",
                  ].join(" ")}
                />
              </button>

              {/* Brand */}
              <Link
                href="/"
                className="inline-flex items-center gap-2"
                aria-label="Home"
              >
                <Image src="/logo-onra.svg" alt="Onra" width={96} height={96} />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={desktopLink(isActive(item.href))}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Resources removed per design cleanup */}
              </nav>
            </div>

            {/* Right: search + theme + CTAs (desktop) */}
            <div className="hidden items-center gap-2 md:flex">
              {/* search */}
              <div className="relative w-44 sm:w-56 lg:w-64 xl:w-80">
                <input
                  type="search"
                  placeholder="Search docs…"
                  className={[
                    "w-full rounded-md border border-zinc-950/20 bg-white/70 px-8 py-2 text-sm text-zinc-900 placeholder:text-zinc-400",
                    "focus:outline-none focus:ring-2 focus:ring-zinc-950/20",
                    "backdrop-blur supports-[backdrop-filter]:bg-white/50",
                    "dark:border-white/20 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-white/20",
                    "dark:supports-[backdrop-filter]:bg-zinc-900/50",
                  ].join(" ")}
                />
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-zinc-950/20 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:border-white/20 dark:text-zinc-400">
                  /
                </kbd>
              </div>

              {/* theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-md",
                  "border border-zinc-950/20 hover:bg-zinc-950/[.03]",
                  "text-zinc-800 dark:text-zinc-200",
                  "dark:border-white/20 dark:hover:bg-white/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:focus-visible:ring-white/20",
                ].join(" ")}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {/* sun / moon swap without extra libs */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 dark:hidden"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="hidden h-4 w-4 dark:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>

              {/* actions */}
              <Link href="/" className={primaryBtn}>
                Try Now
              </Link>
            </div>

            {/* Right (mobile): quick CTA */}
            <div className="md:hidden">
              <Link href="/" className={primaryBtn}>
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          "fixed inset-0 z-50 md:hidden transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* overlay */}
        <div
          className={[
            "absolute inset-0 bg-black/30 backdrop-blur-sm",
            open ? "opacity-100" : "opacity-0",
            "transition-opacity",
          ].join(" ")}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <aside
          className={[
            "absolute right-0 top-0 h-full w-80 max-w-[calc(100vw-0.75rem)] transform bg-white/95 p-4 shadow-2xl",
            "backdrop-blur supports-[backdrop-filter]:bg-white/70",
            "border-l border-zinc-950/20",
            "dark:border-white/20 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/70",
            open ? "translate-x-0" : "translate-x-full",
            "transition-transform",
            "overflow-y-auto",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          {/* header in drawer */}
          <div className="mb-3 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-bold text-lg">Onra</span>
              <span className="sr-only">Ruixen</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-zinc-950/20 text-zinc-700 hover:bg-zinc-950/[.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* search */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="search"
                placeholder="Search…"
                className="w-full rounded-md border border-zinc-950/20 bg-white/80 px-8 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 dark:border-white/20 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-white/20"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
            </div>
          </div>

          {/* nav list */}
          <nav className="space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-md px-2.5 py-2 text-sm font-medium",
                  "hover:bg-zinc-950/[.03] dark:hover:bg-white/5",
                  isActive(item.href)
                    ? "text-zinc-950 dark:text-zinc-50 ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10 bg-zinc-950/[.03] dark:bg-white/5"
                    : "text-zinc-700 dark:text-zinc-300",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* quick links removed per design cleanup */}

          {/* actions cleaned up; removed Get Started dead link */}

          {/* footer row in drawer */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-950/20 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-950/[.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/20 dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 dark:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="hidden h-4 w-4 dark:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Toggle theme
            </button>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md border border-zinc-950/20 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-950/[.03] dark:border-white/20 dark:text-zinc-300 dark:hover:bg-white/5"
            >
              Contact sales
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
