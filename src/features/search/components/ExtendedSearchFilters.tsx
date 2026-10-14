"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

const CORPORA_OPTIONS = [
  'CIE',
  'Etruskische Texte',
  'CIL XI',
  'CIL (other)',
  'Imagines Italicae',
  'Sabellische Texte',
  'Bakkum',
  'Pellegrini & Prosdocimi, La Lingua venetica',
  'Other publications'
];

const ARCHIVE_CATEGORIES = [
  'Squeezes',
  'Rubbings',
  'Tracings',
  'Plaster Casts',
  'Drawings/Paintings',
  'Photographs',
  'Autopsy Notes',
  'Notes (Non-Autopsy)',
  'Notes & Discussion',
  'Manuscripts',
  'Proofs',
  'Mentions'
];

const COMMON_SUPPORTS = [
  'Cippus',
  'Funerary tile',
  'Urn',
  'Mirror',
  'Stele',
  'Sarcophagus',
  'Vase',
  'Plaque'
];

export default function ExtendedSearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get('q') || '';
  const currentCorpus = searchParams.get('corpus') || '';
  const currentSupport = searchParams.get('support') || '';
  const currentCategory = searchParams.getAll('category');
  const currentForgery = searchParams.get('forgery') || '';

  const [isOpen, setIsOpen] = useState(
    Boolean(currentCorpus || currentSupport || currentCategory.length > 0 || currentForgery)
  );

  const [q, setQ] = useState(currentQ);
  const [corpus, setCorpus] = useState(currentCorpus);
  const [support, setSupport] = useState(currentSupport);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(currentCategory);
  const [forgery, setForgery] = useState(currentForgery);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (corpus) params.set('corpus', corpus);
    if (support) params.set('support', support);
    if (forgery) params.set('forgery', forgery);
    selectedCategories.forEach((cat) => params.append('category', cat));

    router.push(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    setQ('');
    setCorpus('');
    setSupport('');
    setSelectedCategories([]);
    setForgery('');
    router.push('/search');
  };

  const hasActiveFilters = Boolean(
    corpus || support || selectedCategories.length > 0 || forgery
  );

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-8 shadow-sm">
      <form onSubmit={handleApply} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="search"
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for TM ID, Corpus citation (e.g. CIE 1136), or keyword..."
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              isOpen || hasActiveFilters
                ? 'bg-secondary text-secondary-foreground border-secondary'
                : 'bg-background text-muted-foreground border-input hover:bg-muted'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 w-2 h-2 rounded-full bg-primary inline-block"></span>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="pt-4 border-t border-border/60 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Corpus Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5">
                  Corpus Edition
                </label>
                <select
                  value={corpus}
                  onChange={(e) => setCorpus(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All Corpora</option>
                  {CORPORA_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Epigraphic Support */}
              <div>
                <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5">
                  Epigraphic Support
                </label>
                <select
                  value={support}
                  onChange={(e) => setSupport(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Any Support Type</option>
                  {COMMON_SUPPORTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Forgery Status */}
              <div>
                <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5">
                  Authenticity
                </label>
                <select
                  value={forgery}
                  onChange={(e) => setForgery(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All Records</option>
                  <option value="false">Authentic Inscriptions Only</option>
                  <option value="true">Flagged / Possible Forgeries Only</option>
                </select>
              </div>
            </div>

            {/* Archive Categories / Types of Links */}
            <div>
              <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2">
                Filter by Archive Items (Only records with selected links)
              </label>
              <div className="flex flex-wrap gap-2">
                {ARCHIVE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted/70 text-muted-foreground hover:bg-muted border border-border/50'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset all filters
              </button>
              <button
                type="submit"
                className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
