import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "@/features/search/components/SearchBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white/80 px-4 md:px-6 backdrop-blur-md shadow-sm">
        <nav className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-600">EA</span>
              </div>
              <span className="hidden sm:inline-block">Etruscans in the Archive</span>
            </Link>
            <div className="hidden md:flex gap-4 text-sm font-medium">
              <Link href="/browse" className="text-slate-600 hover:text-slate-900 transition-colors">
                Browse
              </Link>
              <Link href="/admin" className="text-slate-600 hover:text-slate-900 transition-colors">
                PI Dashboard
              </Link>
            </div>
          </div>
          
          {/* Persistent Search Bar per AGENTS.md requirements */}
          <div className="flex-1 max-w-md ml-auto md:ml-4">
            <Suspense fallback={<div className="h-9 w-full bg-slate-100 rounded-md animate-pulse"></div>}>
              <SearchBar />
            </Suspense>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
