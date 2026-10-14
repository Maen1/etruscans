import { buildFlexibleZeroRegex } from '../inscriptions/utils';

export interface SearchFilters {
  corpus?: string;
  support?: string;
  category?: string | string[];
  language?: string;
  isForgery?: boolean | string;
}

export function buildSearchQuery(
  term?: string,
  filters?: SearchFilters
): Record<string, unknown> {
  const conditions: Array<Record<string, unknown>> = [];

  if (term && term.trim() !== '') {
    const pattern = buildFlexibleZeroRegex(term.trim());
    conditions.push({
      $or: [
        { tmId: { $regex: pattern, $options: 'i' } },
        { 'corpora.identifier': { $regex: pattern, $options: 'i' } },
        { 'references.label': { $regex: pattern, $options: 'i' } }
      ]
    });
  }

  if (filters?.corpus && filters.corpus !== 'all' && filters.corpus.trim() !== '') {
    conditions.push({ 'corpora.name': filters.corpus.trim() });
  }

  if (filters?.support && filters.support !== 'all' && filters.support.trim() !== '') {
    conditions.push({ 'metadata.objectType': { $regex: filters.support.trim(), $options: 'i' } });
  }

  if (filters?.language && filters.language !== 'all' && filters.language.trim() !== '') {
    conditions.push({ 'metadata.language': { $regex: filters.language.trim(), $options: 'i' } });
  }

  if (filters?.category) {
    const categories = (Array.isArray(filters.category) ? filters.category : [filters.category])
      .filter((c) => c && c !== 'all' && c.trim() !== '');
    if (categories.length > 0) {
      conditions.push({ 'references.category': { $in: categories } });
    }
  }

  if (filters?.isForgery !== undefined && filters.isForgery !== 'all' && filters.isForgery !== '') {
    const isForgeryBool = filters.isForgery === true || filters.isForgery === 'true';
    conditions.push({ 'metadata.isForgery': isForgeryBool });
  }

  if (conditions.length === 0) return {};
  if (conditions.length === 1) return conditions[0];
  return { $and: conditions };
}

export function buildBrowseQuery(corpus: string): Record<string, unknown> {
  if (!corpus || corpus.trim() === '') return {};
  
  return {
    'corpora.name': corpus.trim()
  };
}
