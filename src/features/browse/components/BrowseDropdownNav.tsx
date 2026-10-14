"use client";

import Link from "next/link";
import { ChevronDown, BookOpen, Compass, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function BrowseDropdownNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
        Browse <ChevronDown className="w-3.5 h-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 p-1.5 shadow-lg bg-card border border-border">
        <DropdownMenuItem
          render={
            <Link
              href="/browse"
              className="flex items-center gap-2.5 cursor-pointer w-full py-2 px-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="font-semibold text-sm text-foreground">By Corpus</div>
                <div className="text-xs text-muted-foreground">CIE, ET, CIL & more</div>
              </div>
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link
              href="/browse/trip"
              className="flex items-center gap-2.5 cursor-pointer w-full py-2 px-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <Compass className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="font-semibold text-sm text-foreground">By Archival Trip</div>
                <div className="text-xs text-muted-foreground">Ordered by journey</div>
              </div>
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link
              href="/browse/publication"
              className="flex items-center gap-2.5 cursor-pointer w-full py-2 px-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <FileText className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="font-semibold text-sm text-foreground">By Publication</div>
                <div className="text-xs text-muted-foreground">Ordered by volume</div>
              </div>
            </Link>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
