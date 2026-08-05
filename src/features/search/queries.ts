export function buildSearchQuery(term: string): any {
  if (!term || term.trim() === '') return {};
  
  const safeTerm = term.trim();
  
  return {
    $or: [
      { tmId: { $regex: safeTerm, $options: 'i' } },
      { 'corpora.identifier': { $regex: safeTerm, $options: 'i' } },
      { 'references.label': { $regex: safeTerm, $options: 'i' } }
    ]
  };
}

export function buildBrowseQuery(corpus: string): any {
  if (!corpus || corpus.trim() === '') return {};
  
  return {
    'corpora.name': corpus.trim()
  };
}
