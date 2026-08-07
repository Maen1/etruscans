import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "@/features/search/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 glass px-4 md:px-6">
        <nav className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight group"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold text-primary-foreground">EA</span>
              </div>
              <span className="hidden sm:inline-block text-primary font-heading">Etruscans in the Archive</span>
            </Link>
            <div className="hidden md:flex gap-4 text-sm font-medium">
              <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse
              </Link>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                PI Dashboard
              </Link>
              <Link href="/unidentified" className="text-muted-foreground hover:text-foreground transition-colors">
                Unidentified
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>
          
          {/* Persistent Search Bar per AGENTS.md requirements */}
          <div className="flex flex-1 max-w-md ml-auto md:ml-4 items-center gap-4">
            <Suspense fallback={<div className="h-9 w-full bg-slate-100 rounded-md animate-pulse"></div>}>
              <SearchBar />
            </Suspense>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
