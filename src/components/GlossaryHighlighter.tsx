import React from 'react';
import { BookOpen } from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';

interface GlossaryHighlighterProps {
  text: string;
  onTermClick: (termId: string) => void;
}

interface PatternEntry {
  alias: string;
  term: GlossaryTerm;
  regex: RegExp;
}

// Build pre-compiled list of regex patterns sorted by descending length
const ALL_PATTERNS: PatternEntry[] = (() => {
  const list: { alias: string; term: GlossaryTerm }[] = [];
  GLOSSARY_TERMS.forEach((term) => {
    list.push({ alias: term.term, term });
    term.aliases.forEach((alias) => {
      list.push({ alias, term });
    });
  });

  // Sort by length descending
  list.sort((a, b) => b.alias.length - a.alias.length);

  return list.map((entry) => {
    // Escape regex special chars
    const escaped = entry.alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Word boundary where appropriate (for Spanish letters, standard \b works or lookahead)
    const regex = new RegExp(`(^|[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ])(${escaped})([^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]|$)`, 'i');
    return {
      alias: entry.alias,
      term: entry.term,
      regex,
    };
  });
})();

export const GlossaryHighlighter: React.FC<GlossaryHighlighterProps> = ({ text, onTermClick }) => {
  if (!text) return null;

  // Build a single master regex with all keywords to avoid nested multi-replacements
  const termsMap = new Map<string, GlossaryTerm>();
  const regexParts: string[] = [];

  ALL_PATTERNS.forEach(({ alias, term }) => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    termsMap.set(alias.toLowerCase(), term);
    regexParts.push(escaped);
  });

  const masterRegex = new RegExp(`\\b(${regexParts.join('|')})\\b`, 'gi');

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = masterRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchedText = match[0];
    const key = matchedText.toLowerCase();
    const term = termsMap.get(key);

    if (matchIndex > lastIndex) {
      elements.push(text.substring(lastIndex, matchIndex));
    }

    if (term) {
      elements.push(
        <button
          key={`${term.id}-${matchIndex}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTermClick(term.id);
          }}
          className="inline-flex items-baseline gap-0.5 px-1 py-0.5 mx-0.5 rounded bg-red-50/80 text-neutral-900 border-b-2 border-dotted border-[#E51B23] hover:bg-red-100 hover:text-[#E51B23] font-medium cursor-pointer transition-colors text-inherit"
          title={`Glosario Académico: ${term.term} (clic para ver definición)`}
        >
          <span>{matchedText}</span>
          <BookOpen className="w-2.5 h-2.5 text-[#E51B23] opacity-60 group-hover:opacity-100 inline shrink-0" />
        </button>
      );
    } else {
      elements.push(matchedText);
    }

    lastIndex = matchIndex + matchedText.length;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return <>{elements}</>;
};
