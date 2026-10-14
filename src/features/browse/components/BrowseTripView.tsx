import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Compass, Calendar, MapPin, ArrowRight, Info } from 'lucide-react';
import { BrowseNavigationTabs } from './BrowseNavigationTabs';

export interface TripItem {
  id: string;
  title: string;
  period: string;
  locations: string[];
  description: string;
  queryParam: string;
}

export const HISTORICAL_TRIPS: TripItem[] = [
  {
    id: 'trip-1886',
    title: 'First Italian Journey (1886–1887)',
    period: 'Autumn 1886 – Spring 1887',
    locations: ['Rome', 'Tarquinia (Corneto)', 'Vulci', 'Orvieto'],
    description: 'Danielsson’s initial fieldwork gathering squeezes and verifying funerary texts in Tarquinian hypogea and early collection cabinets.',
    queryParam: 'Tarquinia'
  },
  {
    id: 'trip-1889',
    title: 'Central Etruria Campaign (1889–1890)',
    period: '1889 – 1890',
    locations: ['Chiusi', 'Perugia', 'Cortona', 'Arezzo'],
    description: 'Systematic examination of Hellenistic urns, cippi, and tile inscriptions across the Chiusi territory for CIE Volume I.',
    queryParam: 'Chiusi'
  },
  {
    id: 'trip-1896',
    title: 'Northern Etruria & Bologna (1896)',
    period: 'Spring – Summer 1896',
    locations: ['Bologna (Museo Civico)', 'Marzabotto', 'Volterra', 'Florence'],
    description: 'Autopsy notes on stele inscriptions, bronze mirrors, and North Etruscan ceramic graffiti.',
    queryParam: 'Bologna'
  },
  {
    id: 'trip-1903',
    title: 'Southern Etruria & Rome Revision (1903–1904)',
    period: 'Winter 1903 – 1904',
    locations: ['Rome (Vatican & Villa Giulia)', 'Cerveteri', 'Veii'],
    description: 'Collating variant readings and preparing final proofs for CIE fascicles.',
    queryParam: 'Rome'
  }
];

interface BrowseTripViewProps {
  counts?: Record<string, number>;
}

export default function BrowseTripView({ counts = {} }: BrowseTripViewProps) {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          <Compass className="w-4 h-4" />
          <span>Archival Itineraries</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight font-heading text-foreground mb-3">
          Material Ordered According to Trip
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
          Explore Danielsson&apos;s epigraphic facsimiles and field notebooks organized by his chronological research expeditions throughout Italy.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex justify-center">
          <BrowseNavigationTabs activeTab="trip" />
        </div>
      </div>

      <div className="bg-muted/40 border border-border/80 rounded-xl p-5 mb-8 flex gap-4 items-start">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-foreground/90 space-y-1">
          <p className="font-semibold text-foreground">
            Data Architecture Note for Research Team:
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Individual squeezes and autopsy notes are linked to specific journeys through their notebook shelfmarks and dates. To associate your spreadsheet entries directly with specific trips, an optional <code className="bg-background px-1.5 py-0.5 rounded border border-border text-foreground font-mono">Trip</code> column can be included in subsequent CSV imports.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HISTORICAL_TRIPS.map((trip) => {
          const count = counts[trip.id] ?? 0;
          return (
            <Card key={trip.id} className="border-border/80 card-hover flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{trip.period}</span>
                </div>
                <CardTitle className="text-xl font-bold font-heading text-foreground">
                  {trip.title}
                </CardTitle>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {trip.locations.map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground/80 border border-border/60"
                    >
                      <MapPin className="w-2.5 h-2.5 opacity-60" />
                      {loc}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {trip.description}
                </p>
                <div className="pt-3 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="font-medium text-foreground">
                    {count.toLocaleString()} {count === 1 ? 'item' : 'items'}
                  </span>
                  <Link
                    href={`/search?q=${encodeURIComponent(trip.queryParam)}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline group"
                  >
                    <span>View material ({trip.queryParam})</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

