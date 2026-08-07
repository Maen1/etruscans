import Link from "next/link";
import { Database, LogOut, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-muted/50 px-4 md:px-6 shadow-sm">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground"
            >
              <Database className="h-5 w-5 text-primary" />
              <span>PI Dashboard</span>
            </Link>
            <nav className="hidden md:flex gap-4 text-sm font-medium">
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Records
              </Link>
              <Link href="/admin/import" className="text-muted-foreground hover:text-foreground transition-colors">
                Batch Import
              </Link>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ml-4">
                <Home className="h-4 w-4" /> Public Site
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground hidden sm:inline-block border-l border-border pl-4">Logged in as PI</span>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 mx-auto w-full max-w-7xl">{children}</main>
    </div>
  );
}
