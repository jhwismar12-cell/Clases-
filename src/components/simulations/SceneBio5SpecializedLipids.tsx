import React, { useState } from 'react';
import { Activity, ShieldCheck, HeartPulse, Sparkles, AlertCircle, Wind, Pill } from 'lucide-react';

export const SceneBio5SpecializedLipids: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'phospholipids' | 'surfactant' | 'steroids' | 'prostaglandins' | 'lipoproteins' | 'vitamins'
  >('phospholipids');

  // Fat soluble vitamins data from Module 3.3
  const fatVitamins = [
    {
      name: 'Vitamina A (Retinol)',
      activeForm: '11-cis-retinal / Ácido retinoico',
      function: 'Ciclo visual (rodopsina en bastones) y diferenciación de epitelios mucosos.',
      deficiency: 'Ceguera nocturna (nictalopía), xeroftalmía, manchas de Bitot y queratomalacia.',
      sources: 'Hígado, lácteos, yema de huevo y betacarotenos (zanahorias, vegetales verdes).',
    },
    {
      name: 'Vitamina D (Calciferol / D₃)',
      activeForm: '1,25-dihidroxicolecalciferol (Calcitriol)',
      function: 'Homeostasis fosfocálcica: incrementa la absorción intestinal y reabsorción renal de Ca²⁺ y fosfato.',
      deficiency: 'Raquitismo en niños (deformidades óseas) y Osteomalacia en adultos (huesos blandos).',
      sources: 'Síntesis cutánea por radiación solar UVB (7-deshidrocolesterol) y pescados grasos.',
    },
    {
      name: 'Vitamina E (α-Tocoferol)',
      activeForm: 'D-alfa-tocoferol',
      function: 'Antioxidante lipófilo principal: neutraliza radicales libres que atacan ácidos grasos poliinsaturados de membrana.',
      deficiency: 'Anemia hemolítica por fragilidad eritrocitaria, ataxia sensitiva y neuropatía periférica.',
      sources: 'Aceites vegetales (girasol, oliva), frutos secos, semillas y germen de trigo.',
    },
    {
      name: 'Vitamina K (Filoquinona / Menaquinona)',
      activeForm: 'Hidroquinona reducida de vitamina K',
      function: 'Cofactor de la γ-glutamil carboxilasa para carboxilar factores de coagulación II (Protrombina), VII, IX y X.',
      deficiency: 'Diátesis hemorrágica, hematomas espontáneos y Enfermedad Hemorrágica del Recién Nacido.',
      sources: 'Vegetales de hoja verde oscura (espinaca, brócoli) y síntesis por microbiota colónica.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Módulo 3.3: Lípidos Especializados, Surfactante, Esteroides & Vitaminas
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Fosfolípidos • Surfactante Alveolar • Núcleo de Esterano • Vía COX/5-LOX • Vitaminas A, D, E, K
            </p>
          </div>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-lg text-xs overflow-x-auto">
          <button
            onClick={() => setActiveCategory('phospholipids')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'phospholipids'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Fosfoglicéridos
          </button>
          <button
            onClick={() => setActiveCategory('surfactant')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'surfactant'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Surfactante Pulmonar
          </button>
          <button
            onClick={() => setActiveCategory('steroids')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'steroids'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Esteroides & Colesterol
          </button>
          <button
            onClick={() => setActiveCategory('prostaglandins')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'prostaglandins'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Eicosanoides (COX & LOX)
          </button>
          <button
            onClick={() => setActiveCategory('lipoproteins')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'lipoproteins'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Lipoproteínas
          </button>
          <button
            onClick={() => setActiveCategory('vitamins')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'vitamins'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Vitaminas (A, D, E, K)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[500px]">
        {/* Category 1: Phospholipids */}
        {activeCategory === 'phospholipids' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
              <span className="text-xs font-bold text-neutral-900 block">
                Arquitectura Anfipática de un Fosfoglicérido
              </span>

              {/* Graphical representation */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-col items-center justify-center space-y-2 shadow-xs">
                {/* Polar head */}
                <div className="w-44 py-2 rounded-full bg-blue-100 border-2 border-blue-500 text-center font-bold text-blue-900 text-xs shadow-xs">
                  Cabeza Polar (Fosfato + Colina)
                  <span className="block text-[9px] font-mono text-blue-700 font-normal">
                    Hidrofílica (Interactúa con H₂O)
                  </span>
                </div>

                {/* Glycerol bridge */}
                <div className="w-28 py-1 rounded bg-neutral-200 text-center font-mono text-[10px] text-neutral-700">
                  Esqueleto Glicerol (C1, C2, C3)
                </div>

                {/* 2 Hydrophobic tails */}
                <div className="flex gap-6 pt-1">
                  <div className="w-10 h-24 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-lg flex items-end justify-center pb-1 text-[9px] text-white font-bold">
                    Cola 1
                  </div>
                  <div className="w-10 h-24 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-lg flex items-end justify-center pb-1 text-[9px] text-white font-bold transform -rotate-6">
                    Cola 2 (cis)
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-800 font-medium">
                  2 Colas Apolares Hidrofóbicas (Ácidos Grasos)
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-2 text-xs text-neutral-800">
                <span className="font-bold text-blue-950 block">Variedades Fisiológicas:</span>
                <p>
                  • <strong>Fosfatidilcolina (Lecitina):</strong> El fosfato se esterifica con colina. Es el lípido principal de la hemicapa externa y constituyente clave del <em>surfactante pulmonar</em> alveolar.
                </p>
                <p>
                  • <strong>Fosfatidiletanolamina / Fosfatidilserina (Cefalinas):</strong> Localizadas en la monocapa interna citosólica; la exteriorización de fosfatidilserina es señal de apoptosis celular y activación plaquetaria.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Category 2: Pulmonary Surfactant */}
        {activeCategory === 'surfactant' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-blue-600" />
                Surfactante Pulmonar: Dipalmitoilfosfatidilcolina (DPPC)
              </span>

              <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-2 shadow-xs text-[11px] text-neutral-700">
                <p>
                  Sintetizado por los <strong>neumocitos tipo II</strong> a partir de la semana 24-28 de gestación. Su función físico-química es <strong>reducir la tensión superficial</strong> en la interfaz aire-líquido alveolar.
                </p>
                <div className="p-2 bg-blue-50 rounded border border-blue-200 font-mono text-[10px] text-blue-950">
                  Ley de Laplace: P = 2T / r
                  <span className="block text-neutral-600 mt-0.5">
                    Al reducir la tensión superficial (T), previene que los alvéolos más pequeños colapsen hacia los más grandes durante la espiración.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-red-50/60 rounded-xl border border-red-200 p-4 space-y-2 text-xs">
              <span className="font-bold text-[#E51B23] block text-[10px] uppercase tracking-wider">
                🏥 Relevancia Clínica: Síndrome de Dificultad Respiratoria Neonatal (SDR / Membrana Hialina)
              </span>
              <p className="text-[11px] text-neutral-700 leading-relaxed">
                En recién nacidos prematuros (antes de la semana 34), la inmadurez pulmonar con deficiencia de surfactante produce atelectasia alveolar difusa, hipoxemia severa y formación de membranas hialinas exudativas.
              </p>
              <div className="p-2 bg-white rounded border border-red-200 text-[10px] text-neutral-800 space-y-1">
                <strong>Tratamiento Médico Inmediato:</strong>
                <p>1. Instilación endotraqueal directa de surfactante exógeno (bovino o porcino).</p>
                <p>2. En amenaza de parto prematuro: profilaxis antenatal con corticoides (betametasona) para inducir la maduración de los neumocitos tipo II.</p>
              </div>
            </div>
          </div>
        )}

        {/* Category 3: Steroids */}
        {activeCategory === 'steroids' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 bg-slate-50 rounded-xl border border-neutral-200 p-4 space-y-3">
              <span className="text-xs font-bold text-neutral-900 block">
                Núcleo de Ciclopentanoperhidrofenantreno (Esterano)
              </span>

              <div className="bg-white rounded-xl border border-neutral-200 p-3 flex flex-col items-center justify-center shadow-xs">
                <svg viewBox="0 0 280 120" className="w-full max-w-[260px] h-[110px]">
                  <polygon points="30,60 50,30 80,30 100,60 80,90 50,90" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                  <text x="65" y="65" fill="#92400E" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>

                  <polygon points="100,60 120,30 150,30 170,60 150,90 120,90" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                  <text x="135" y="65" fill="#92400E" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>

                  <polygon points="150,30 170,5 200,5 220,30 200,60 170,60" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                  <text x="185" y="35" fill="#92400E" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>

                  <polygon points="220,30 245,15 260,35 245,55 220,50" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
                  <text x="240" y="38" fill="#991B1B" fontSize="12" fontWeight="bold" textAnchor="middle">D</text>
                </svg>
                <div className="text-[10px] text-neutral-500 font-mono mt-1">
                  3 Ciclohexanos (A, B, C) + 1 Ciclopentano (D)
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-2">
              <div className="bg-white rounded-xl border border-neutral-200 p-3.5 space-y-2 text-xs">
                <strong className="text-neutral-900 block">Derivados Vitales del Colesterol (27 Carbonos):</strong>
                <ul className="space-y-1.5 text-[11px] text-neutral-600 list-disc pl-4">
                  <li><strong>Hormonas Sexuales:</strong> Testosterona, estradiol y progesterona.</li>
                  <li><strong>Corticoesteroides:</strong> Cortisol (antinflamatorio y gluconeogénico) y Aldosterona (retención de Na⁺).</li>
                  <li><strong>Sales Biliares:</strong> Ácido cólico y desoxicólico para emulsión digestiva de grasas.</li>
                  <li><strong>Vitamina D₃ (Colecalciferol):</strong> Fotolisis cutánea del 7-deshidrocolesterol por radiación UVB.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Category 4: Eicosanoids */}
        {activeCategory === 'prostaglandins' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 bg-red-50/60 rounded-xl border border-red-200 p-4 space-y-3">
              <span className="text-xs font-bold text-red-950 block">
                Cascada del Ácido Araquidónico (20:4 ω-6) & Ramas COX / 5-LOX
              </span>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-neutral-500 text-[10px] block">Fosfolípidos de Membrana</span>
                  <span className="text-neutral-800 font-bold">↳ Fosfolipasa A₂ (PLA₂) → Ácido Araquidónico (20 C)</span>
                </div>

                <div className="p-2.5 bg-amber-50 rounded border border-amber-300">
                  <span className="text-amber-800 text-[10px] block font-bold">1. VÍA DE LAS CICLOOXIGENASAS (COX-1 / COX-2)</span>
                  <span className="text-neutral-900 text-[11px]">↳ Prostaglandinas (PGE₂, PGI₂) & Tromboxano A₂ (TXA₂)</span>
                  <div className="mt-1.5 p-1 bg-red-100 rounded text-[10px] text-red-900 font-bold">
                    ⛔ Blanco de AINEs (Aspirina, Ibuprofeno): Suprimen dolor, fiebre e inflamación.
                  </div>
                </div>

                <div className="p-2.5 bg-blue-50 rounded border border-blue-300">
                  <span className="text-blue-800 text-[10px] block font-bold">2. VÍA DE LA 5-LIPOOXIGENASA (5-LOX)</span>
                  <span className="text-neutral-900 text-[11px]">↳ Leucotrienos (LTA₄, LTB₄, LTC₄, LTD₄)</span>
                  <div className="mt-1.5 p-1 bg-blue-100 rounded text-[10px] text-blue-900 font-bold">
                    Broncoconstricción asmática severa y anafilaxia. Diana de fármacos como Montelukast.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-xl border border-neutral-200 p-4 space-y-2 text-xs">
              <strong className="text-neutral-900 block">Acciones Fisiológicas de Mediadores:</strong>
              <div className="space-y-1.5 text-[11px] text-neutral-600">
                <p>• <strong>PGE₂:</strong> Vasodilatación, hiperalgesia y pirógeno central (fiebre en hipotálamo anterior).</p>
                <p>• <strong>Prostaciclina (PGI₂):</strong> Vasodilatador e inhibidor potente de la agregación plaquetaria.</p>
                <p>• <strong>Tromboxano A₂:</strong> Vasoconstrictor y agregante plaquetario pro-trombótico.</p>
                <p>• <strong>Leucotrieno B₄ (LTB₄):</strong> Potente quimiotáctico para neutrófilos en focos infecciosos.</p>
              </div>
            </div>
          </div>
        )}

        {/* Category 5: Lipoproteins */}
        {activeCategory === 'lipoproteins' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1 shadow-xs">
                <strong className="text-neutral-900">Quilomicrones</strong>
                <span className="text-[10px] block text-neutral-500">Origen: Enterocitos (Intestino)</span>
                <p className="text-[11px] text-neutral-600">Transportan triglicéridos exógenos de la dieta al músculo y tejido adiposo.</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1 shadow-xs">
                <strong className="text-neutral-900">VLDL</strong>
                <span className="text-[10px] block text-neutral-500">Origen: Hepático</span>
                <p className="text-[11px] text-neutral-600">Transportan triglicéridos endógenos sintetizados de novo en el hígado.</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 space-y-1 shadow-xs">
                <strong className="text-red-900">LDL ("Colesterol Malo")</strong>
                <span className="text-[10px] block text-red-600 font-bold">Aterogénico</span>
                <p className="text-[11px] text-neutral-700">Rico en ésteres de colesterol; su oxidación subendotelial inicia la placa ateromatosa.</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-200 space-y-1 shadow-xs">
                <strong className="text-green-900">HDL ("Colesterol Bueno")</strong>
                <span className="text-[10px] block text-green-600 font-bold">Ateroprotector</span>
                <p className="text-[11px] text-neutral-700">Transporte reverso de colesterol desde los tejidos periféricos hacia el hígado para su excreción biliar.</p>
              </div>
            </div>
          </div>
        )}

        {/* Category 6: Fat-Soluble Vitamins (A, D, E, K) */}
        {activeCategory === 'vitamins' && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-neutral-900 block">
              Cuadro Clínico de Vitaminas Liposolubles (Requieren Sales Biliares para su Absorción):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fatVitamins.map((vit, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
                    <strong className="text-neutral-900 text-xs text-[#E51B23]">{vit.name}</strong>
                    <span className="text-[10px] font-mono text-neutral-500">{vit.activeForm}</span>
                  </div>

                  <p className="text-[11px] text-neutral-700">
                    <strong>Función Biológica:</strong> {vit.function}
                  </p>

                  <div className="p-2 bg-red-50/70 rounded-lg border border-red-200 text-[10px] text-red-900">
                    <strong>Síndrome Carencial / Patología:</strong> {vit.deficiency}
                  </div>

                  <p className="text-[10px] text-neutral-500">
                    <strong>Fuentes Dietéticas:</strong> {vit.sources}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
