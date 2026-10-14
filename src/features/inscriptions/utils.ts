/**
 * Strips formatting zeroes from epigraphic corpus identifiers and references:
 * - After prefix/spaces: "CIE 01136" -> "CIE 1136", "UUB 0591" -> "UUB 591"
 * - After decimal points: "ET2 Cl 1.0946" -> "ET2 Cl 1.946", "ET Cl 6.0001" -> "ET Cl 6.1"
 */
export function stripLeadingZeros(identifier?: string | null): string {
  if (!identifier) return '';
  return identifier
    .replace(/(^|[\s_/-])0+([1-9]\d*)/g, '$1$2')
    .replace(/\.0+([1-9]\d*)/g, '.$1');
}

export interface InscriptionRecordForTitles {
  tmId: string;
  corpora: Array<{ name: string; identifier: string }>;
}

/**
 * Returns the primary title and subtitle citation string for an inscription
 * based on whether a specific corpus is currently being browsed.
 */
export function formatInscriptionTitles(
  record: InscriptionRecordForTitles,
  activeCorpus?: string
): { primaryTitle: string; subtitleCitations: string } {
  if (activeCorpus) {
    const matchingCorpora = record.corpora.filter(
      (c) => c.name.toLowerCase() === activeCorpus.toLowerCase()
    );
    const otherCorpora = record.corpora.filter(
      (c) => c.name.toLowerCase() !== activeCorpus.toLowerCase()
    );

    const tmLabel = record.tmId.startsWith('TM') ? record.tmId : `TM ${record.tmId}`;
    const primaryTitle = matchingCorpora.length > 0
      ? matchingCorpora.map((c) => stripLeadingZeros(c.identifier)).join(' + ')
      : tmLabel;

    // Group other corpora by corpus name
    const groupedOther: Record<string, string[]> = {};
    otherCorpora.forEach((c) => {
      if (!groupedOther[c.name]) groupedOther[c.name] = [];
      groupedOther[c.name].push(stripLeadingZeros(c.identifier));
    });

    const otherParts: string[] = [tmLabel];
    Object.values(groupedOther).forEach((identifiers) => {
      otherParts.push(identifiers.join(' + '));
    });

    return {
      primaryTitle,
      subtitleCitations: otherParts.join('. ') + '.'
    };
  }

  const tmLabel = record.tmId.startsWith('TM') ? record.tmId : `TM ${record.tmId}`;

  // Default presentation for search/disambiguation:
  // Primary title is first corpus identifier if available, otherwise TM ID
  if (record.corpora.length > 0) {
    const primaryTitle = stripLeadingZeros(record.corpora[0].identifier);
    const otherCorpora = record.corpora.slice(1);
    const groupedOther: Record<string, string[]> = {};
    otherCorpora.forEach((c) => {
      if (!groupedOther[c.name]) groupedOther[c.name] = [];
      groupedOther[c.name].push(stripLeadingZeros(c.identifier));
    });

    const otherParts = [tmLabel];
    Object.values(groupedOther).forEach((identifiers) => {
      otherParts.push(identifiers.join(' + '));
    });

    return {
      primaryTitle,
      subtitleCitations: otherParts.join('. ') + '.'
    };
  }

  return {
    primaryTitle: tmLabel,
    subtitleCitations: `${tmLabel}.`
  };
}

/**
 * Builds a flexible regex search pattern that matches both zero-padded and non-zero-padded numbers.
 * e.g. "1136" -> matches "01136" or "1136"
 * e.g. "1.946" -> matches "1.0946" or "1.946"
 */
export function buildFlexibleZeroRegex(term: string): string {
  if (!term) return '';
  // Escape regex special characters except decimal dots we might want to expand
  const escaped = term.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Replace escaped decimal dots followed by digits: e.g. "\.946" -> "\.0*946"
  let flexible = escaped.replace(/\\\.\s*0*(\d+)/g, '\\.0*$1');
  
  // Replace standalone numbers with optional leading zeros: e.g. "(^|\s)0*1136"
  flexible = flexible.replace(/(^|[\s_/-])0*([1-9]\d*)/g, '$10*$2');
  
  return flexible;
}
