import React, { useState } from 'react';
import { Flame, ShieldAlert, Sparkles, Scale, Beaker, CheckCircle } from 'lucide-react';

export const SceneBio4LipidsTriglycerides: React.FC = () => {
  const [acidType, setAcidType] = useState<'saturated' | 'unsaturated'>('unsaturated');
  const [reactionMode, setReactionMode] = useState<'esterification' | 'lipolysis' | 'saponification'>('esterification');

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Ácidos Grasos, Dobles Enlaces Cis, Triglicéridos & 9 kcal/g
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Empaquetamiento Molecular • Densidad Calórica (38 kJ/g) • Hidrólisis y Saponificación
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold font-mono">
            9 kcal/g (38 kJ/g) - Máxima Eficiencia
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        {/* Left: Interactive Fatty Acid Geometry (Saturated vs Cis Unsaturated) */}
        <div className="lg:col-span-6 flex flex-col bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900">
              Geometría de Ácidos Grasos & Fluidez
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setAcidType('saturated')}
                className={`text-[10px] px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  acidType === 'saturated'
                    ? 'bg-[#E51B23] text-white font-bold'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                Saturado (Recto)
              </button>
              <button
                onClick={() => setAcidType('unsaturated')}
                className={`text-[10px] px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  acidType === 'unsaturated'
                    ? 'bg-[#E51B23] text-white font-bold'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                Insaturado Cis (Acodado 30°)
              </button>
            </div>
          </div>

          {/* SVG representation of the fatty acid chain */}
          <div className="bg-white rounded-xl border border-neutral-200 p-3 flex flex-col items-center justify-center min-h-[170px] shadow-xs">
            <svg viewBox="0 0 360 120" className="w-full max-w-[340px] h-[120px]">
              {/* Carboxyl Head */}
              <circle cx="40" cy="60" r="18" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
              <text x="40" y="64" fill="#991B1B" fontSize="10" fontWeight="bold" textAnchor="middle">
                COOH
              </text>

              {/* Tail */}
              {acidType === 'saturated' ? (
                /* Linear zigzag line */
                <g>
                  <path
                    d="M 58 60 L 80 45 L 105 75 L 130 45 L 155 75 L 180 45 L 205 75 L 230 45 L 255 75 L 280 45 L 305 60"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="200" y="105" fill="#475569" fontSize="10" textAnchor="middle">
                    Cadena lineal saturada: Empaquetamiento denso → Sólido a 25°C
                  </text>
                </g>
              ) : (
                /* Kinked tail at cis double bond */
                <g>
                  <path
                    d="M 58 60 L 80 45 L 105 75 L 130 45 L 155 75 L 175 60"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Double bond marker with cis angle */}
                  <line x1="175" y1="56" x2="195" y2="56" stroke="#E51B23" strokeWidth="3" />
                  <line x1="175" y1="64" x2="195" y2="64" stroke="#E51B23" strokeWidth="3" />
                  <text x="185" y="44" fill="#DC2626" fontSize="9" fontWeight="bold" textAnchor="middle">
                    cis C=C
                  </text>
                  {/* Angled down tail (~30° kink) */}
                  <path
                    d="M 195 60 L 220 85 L 235 68 L 255 95 L 275 80 L 295 105"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="210" y="112" fill="#15803D" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Acodamiento cis: Impide empaquetamiento → Líquido / Fluidez
                  </text>
                </g>
              )}
            </svg>

            <div className="w-full flex items-center justify-between text-[10px] text-neutral-600 border-t border-neutral-100 pt-2 px-2">
              <span>Punto de Fusión: <strong>{acidType === 'saturated' ? 'Alto (69°C - Ác. Esteárico)' : 'Bajo (13°C - Ác. Oleico)'}</strong></span>
              <span>Estado a 25°C: <strong>{acidType === 'saturated' ? 'Grasa Sólida' : 'Aceite Líquido'}</strong></span>
            </div>
          </div>

          {/* Energy Yield Comparison Callout */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 text-[11px] text-neutral-800">
            <div className="flex items-center justify-between font-bold text-amber-900">
              <span>Densidad Calórica Metabólica Comparativa:</span>
              <span className="text-xs text-[#E51B23]">9 vs 4 kcal/g</span>
            </div>
            <p className="leading-relaxed">
              Los lípidos están formados casi exclusivamente por enlaces <strong>C—H reducidos</strong> y se almacenan <strong>anhidros</strong> (sin agua asociada en adipocitos). Por ello rinden <strong>9 kcal/g</strong> (38 kJ/g), frente a las <strong>4 kcal/g</strong> (17 kJ/g) de glúcidos y proteínas hidratadas.
            </p>
          </div>
        </div>

        {/* Right: Triacylglycerol Reaction Modes */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3 shadow-xs">
            <span className="text-xs font-bold text-neutral-900 block">
              Reacciones de Triacilgliceroles (Triglicéridos):
            </span>

            {/* Sub-selector */}
            <div className="flex gap-1 border-b border-neutral-200 pb-2">
              <button
                onClick={() => setReactionMode('esterification')}
                className={`text-[10px] px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  reactionMode === 'esterification'
                    ? 'bg-neutral-900 text-white font-bold'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                1. Esterificación
              </button>
              <button
                onClick={() => setReactionMode('lipolysis')}
                className={`text-[10px] px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  reactionMode === 'lipolysis'
                    ? 'bg-neutral-900 text-white font-bold'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                2. Lipasa Pancreática
              </button>
              <button
                onClick={() => setReactionMode('saponification')}
                className={`text-[10px] px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  reactionMode === 'saponification'
                    ? 'bg-neutral-900 text-white font-bold'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                3. Saponificación (Jabón)
              </button>
            </div>

            {/* Details according to mode */}
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-2">
              {reactionMode === 'esterification' && (
                <>
                  <div className="font-mono text-[11px] text-blue-700 font-bold bg-white p-2 rounded border border-blue-200">
                    Glicerol (1 mol) + 3 Ácidos Grasos ⇌ Triacilglicerol + 3 H₂O
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Unión mediante enlaces éster covalentes entre los tres grupos —OH del glicerol y el grupo carboxilo de cada ácido graso. Es la forma biológica neutra no polar de almacenamiento en el tejido adiposo.
                  </p>
                </>
              )}
              {reactionMode === 'lipolysis' && (
                <>
                  <div className="font-mono text-[11px] text-emerald-700 font-bold bg-white p-2 rounded border border-emerald-200">
                    Triglicérido + 2 H₂O —(Lipasa Pancreática)→ 2-Monoacilglicerol + 2 Ácidos Grasos Libres
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    En el duodeno y yeyuno, las sales biliares emulsionan los glóbulos grasos y la lipasa pancreática escinde los ésteres en las posiciones 1 y 3 para permitir la absorción por micelas mixtas en el enterocito.
                  </p>
                </>
              )}
              {reactionMode === 'saponification' && (
                <>
                  <div className="font-mono text-[11px] text-amber-800 font-bold bg-white p-2 rounded border border-amber-200">
                    Triglicérido + 3 NaOH (Base Fuerte) → Glicerol + 3 Sales Sódicas (Jabones R-COO⁻ Na⁺)
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Hidrólisis alcalina que rompe los enlaces éster liberando glicerol y sales de ácidos grasos. Al ser moléculas anfipáticas, los jabones forman micelas que engloban la grasa permitiendo su dispersión en agua.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
