import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
        Etruscans in the Archive
      </h1>
      <p className="max-w-[600px] text-lg text-slate-600 mb-8">
        A comprehensive database for the digitised epigraphic collections of Olof August Danielsson, bridging historical texts with the Alvin digital repository.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-8 py-2 shadow-sm"
        >
          Search Database
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link
          href="/browse"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 h-10 px-8 py-2 shadow-sm"
        >
          Browse Corpora
        </Link>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-10 px-8 py-2"
        >
          PI Dashboard
        </Link>
      </div>
    </div>
  );
}
