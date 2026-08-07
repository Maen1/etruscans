import Link from "next/link";
import { ArrowRight, Search, BookOpen, LayoutDashboard } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center relative overflow-hidden">
      
      <div className="glass p-12 md:p-16 rounded-3xl max-w-4xl mx-auto shadow-2xl relative z-10 animate-in fade-in zoom-in duration-700 ease-out">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-primary font-heading">
          Etruscans in the Archive
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed font-sans">
          A comprehensive database for the digitised epigraphic collections of Olof August Danielsson, bridging historical texts with the Alvin digital repository.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/search"
            className="group flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 h-14 px-8 w-full sm:w-auto"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Database
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/browse"
            className="group flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20 h-14 px-8 w-full sm:w-auto"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Browse Corpora
          </Link>
          <Link
            href="/admin"
            className="group flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-2 border-primary/20 bg-background/50 hover:bg-background text-foreground h-14 px-8 w-full sm:w-auto"
          >
            <LayoutDashboard className="mr-2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            PI Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
