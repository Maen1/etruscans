import Link from 'next/link';
import { BookOpen, Compass, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BrowseTabKey = 'corpus' | 'trip' | 'publication';

interface BrowseNavigationTabsProps {
  activeTab: BrowseTabKey;
  className?: string;
}

const TABS: Array<{
  key: BrowseTabKey;
  href: string;
  label: string;
  icon: typeof BookOpen;
}> = [
  { key: 'corpus', href: '/browse', label: 'By Corpus', icon: BookOpen },
  { key: 'trip', href: '/browse/trip', label: 'By Trip', icon: Compass },
  { key: 'publication', href: '/browse/publication', label: 'By Publication', icon: FileText },
];

export function BrowseNavigationTabs({ activeTab, className }: BrowseNavigationTabsProps) {
  return (
    <nav
      aria-label="Browse archive dimensions"
      className={cn('inline-flex items-center p-1 rounded-xl bg-muted/60 border border-border', className)}
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all',
              isActive
                ? 'font-semibold bg-background text-foreground shadow-sm'
                : 'font-medium text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className={cn('w-4 h-4', isActive ? 'text-primary' : 'opacity-70')} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
