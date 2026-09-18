import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  X,
  Sparkles,
  ChevronRight,
  Activity,
  Atom,
  Thermometer,
  Stethoscope,
  Volume2,
  Share2,
  Check,
} from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { prepareTextForSpeech } from '../utils/speechUtils';

interface AcademicGlossaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTermId?: string | null;
  onSelectTermId: (id: string) => void;
}

export const AcademicGlossaryDrawer: React.FC<AcademicGlossaryDrawerProps> = ({
  isOpen,
  onClose,
  selectedTermId,
  onSelectTermId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copied, setCopied] = useState(false);
  const [isSpeakingDef, setIsSpeakingDef] = useState(false);

  // Auto-focus selected term on open
  const activeTerm = useMemo(() => {
    if (selectedTermId) {
      return GLOSSARY_TERMS.find((t) => t.id === selectedTermId) || GLOSSARY_TERMS[0];
    }
    return GLOSSARY_TERMS[0];
  }, [selectedTermId]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesCategory =
        selectedCategory === 'Todos' || term.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        term.term.toLowerCase().includes(query) ||
        term.shortDef.toLowerCase().includes(query) ||
        term.aliases.some((a) => a.toLowerCase().includes(query)) ||
        (term.formulaOrValue && term.formulaOrValue.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Speak definition using Web Speech API
  const handleSpeak = (term: GlossaryTerm) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeakingDef) {
      window.speechSynthesis.cancel();
      setIsSpeakingDef(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = prepareTextForSpeech(
      `${term.term}. ${term.shortDef} ${term.fullDefinition}`
    );
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const esVoice =
      voices.find((v) => v.lang === 'es-EC') ||
      voices.find((v) => v.lang.startsWith('es')) ||
      voices.find((v) => v.lang.toLowerCase().includes('spanish'));
    if (esVoice) utterance.voice = esVoice;

    utterance.onstart = () => setIsSpeakingDef(true);
    utterance.onend = () => setIsSpeakingDef(false);
    utterance.onerror = () => setIsSpeakingDef(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopyDefinition = (term: GlossaryTerm) => {
    const content = `${term.term} (${term.category})\n\nDefinición: ${term.fullDefinition}\n\nFórmula/Valor: ${term.formulaOrValue || 'N/A'}\n\nRelevancia Médica: ${term.clinicalRelevance}\n\n— Glosario Académico Universidad Católica de Cuenca (Campus Azogues)`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fisiología Respiratoria':
        return <Activity className="w-3.5 h-3.5 text-[#E51B23]" />;
      case 'Leyes de Gases':
        return <Atom className="w-3.5 h-3.5 text-blue-600" />;
      case 'Fisicoquímica':
        return <Thermometer className="w-3.5 h-3.5 text-amber-600" />;
      case 'Parámetros Clínicos':
        return <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-neutral-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="academic-glossary-modal"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs transition-opacity p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl md:max-w-3xl h-full sm:h-[92vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#050505] text-white px-5 py-4 flex items-center justify-between border-b-2 border-[#E51B23]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E51B23] flex items-center justify-center text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">
                  Glosario Académico
                </h3>
                <span className="text-[10px] bg-red-950 text-red-300 font-semibold px-2 py-0.5 rounded border border-red-800">
                  {GLOSSARY_TERMS.length} Términos Clave
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Bioquímica, Biomoléculas, Membranas & Fisiología • UCACUE Campus Azogues
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-neutral-800"
            title="Cerrar Glosario (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar término, fórmula (p. ej. PO2, Boyle, Dalton, Hematosis)..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white rounded-lg border border-neutral-200 focus:outline-none focus:border-[#E51B23] focus:ring-1 focus:ring-[#E51B23] text-neutral-900 placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              'Todos',
              'Biomoléculas',
              'Lípidos & Membranas',
              'Fisiología Respiratoria',
              'Leyes de Gases',
              'Fisicoquímica',
              'Parámetros Clínicos',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E51B23] text-white font-semibold shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area: Main Active Card + Quick Terms Directory */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTerm ? (
            <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm p-5 sm:p-6 space-y-4">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                    {getCategoryIcon(activeTerm.category)}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                      {activeTerm.term}
                    </h2>
                    <span className="text-[10px] font-semibold text-[#E51B23] uppercase tracking-wider">
                      {activeTerm.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => handleSpeak(activeTerm)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      isSpeakingDef
                        ? 'bg-red-600 text-white border-red-600 animate-pulse'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-red-50 hover:text-[#E51B23] hover:border-red-200'
                    }`}
                    title="Escuchar definición hablada"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#E51B23]" />
                    <span>{isSpeakingDef ? 'Detener Voz' : 'Escuchar'}</span>
                  </button>

                  <button
                    onClick={() => handleCopyDefinition(activeTerm)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-50 text-neutral-700 border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer"
                    title="Copiar ficha de estudio"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Short Summary Banner */}
              <div className="p-3 bg-red-50/70 border-l-3 border-[#E51B23] rounded-r-lg text-xs text-neutral-800 font-medium leading-relaxed">
                {activeTerm.shortDef}
              </div>

              {/* Full Scientific Definition */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E51B23]" />
                  Definición Fisiológica & Mecanismo
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {activeTerm.fullDefinition}
                </p>
              </div>

              {/* Formula or Quantitative Value Box */}
              {activeTerm.formulaOrValue && (
                <div className="p-3 bg-neutral-900 text-white rounded-lg border border-neutral-800">
                  <span className="text-[10px] font-mono font-semibold text-red-400 block uppercase tracking-wider mb-1">
                    Valores Cuantitativos / Ecuación
                  </span>
                  <code className="text-xs sm:text-sm font-mono text-neutral-100 font-bold block">
                    {activeTerm.formulaOrValue}
                  </code>
                </div>
              )}

              {/* Clinical Relevance Box */}
              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-[#E51B23]" />
                  Relevancia Clínica en Medicina
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeTerm.clinicalRelevance}
                </p>
              </div>

              {/* Related Terms Navigation */}
              {activeTerm.relatedTermIds.length > 0 && (
                <div className="pt-2 border-t border-neutral-100">
                  <span className="text-[11px] font-bold text-neutral-500 block mb-2">
                    Términos Relacionados en el Guion:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTerm.relatedTermIds.map((relId) => {
                      const relTerm = GLOSSARY_TERMS.find((t) => t.id === relId);
                      if (!relTerm) return null;
                      return (
                        <button
                          key={relId}
                          onClick={() => onSelectTermId(relId)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-red-50 text-[#E51B23] border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <span>{relTerm.term}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 text-neutral-400">
              <BookOpen className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
              <p className="text-xs">No se encontró ningún término con ese criterio de búsqueda.</p>
            </div>
          )}

          {/* Directory of all matching terms */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Directorio Rápido ({filteredTerms.length} conceptos)
              </h3>
              <span className="text-[10px] text-neutral-500">
                Haz clic en cualquier concepto para examinarlo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredTerms.map((item) => {
                const isItemActive = activeTerm && activeTerm.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTermId(item.id)}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isItemActive
                        ? 'bg-red-50/60 border-[#E51B23] shadow-xs ring-1 ring-[#E51B23]'
                        : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h4
                        className={`text-xs font-bold ${
                          isItemActive ? 'text-[#E51B23]' : 'text-neutral-900'
                        }`}
                      >
                        {item.term}
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 border border-neutral-200 whitespace-nowrap">
                        {item.category.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                      {item.shortDef}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 px-5">
          <span>
            Facultad de Ciencias de la Salud • #SomosÁguilasRojas
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-neutral-900 text-white rounded-md text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
