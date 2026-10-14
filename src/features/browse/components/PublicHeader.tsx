import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import SearchBar from "@/features/search/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrowseDropdownNav } from "./BrowseDropdownNav";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 glass px-4 md:px-6">
      <nav className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight group"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.avif"
                alt="Etruscans in the Archive Logo"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline-block text-primary font-heading">
              Etruscans in the Archive
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <BrowseDropdownNav />
            <Link
              href="/correspondence"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Correspondence
            </Link>
            <Link
              href="/unidentified"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Unidentified
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              PI Dashboard
            </Link>
          </div>
        </div>

        {/* Persistent Search Bar per AGENTS.md requirements */}
        <div className="flex flex-1 max-w-md ml-auto md:ml-4 items-center gap-4">
          <Suspense fallback={<div className="h-9 w-full bg-muted rounded-md animate-pulse"></div>}>
            <SearchBar />
          </Suspense>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
