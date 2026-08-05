import Link from "next/link";
import { Database, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-indigo-900 px-4 md:px-6 shadow-sm">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
            >
              <Database className="h-5 w-5 text-indigo-300" />
              <span>PI Dashboard</span>
            </Link>
            <nav className="hidden md:flex gap-4 text-sm font-medium">
              <Link href="/admin" className="text-indigo-200 hover:text-white transition-colors">
                Records
              </Link>
              <Link href="/admin/import" className="text-indigo-200 hover:text-white transition-colors">
                Batch Import
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-indigo-200 hidden sm:inline-block">Logged in as PI</span>
            <button className="text-sm font-medium text-indigo-200 hover:text-white flex items-center gap-2 transition-colors">
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
