import React, { useState } from 'react';
import { Activity, ShieldCheck, HeartPulse, Sparkles, AlertCircle } from 'lucide-react';

export const SceneBio5SpecializedLipids: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'phospholipids' | 'steroids' | 'prostaglandins' | 'lipoproteins'>('phospholipids');

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
              Lípidos Especializados: Fosfoglicéridos, Esteroides & Eicosanoides
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Fosfatidilcolina (Lecitina) • Núcleo de Esterano (A-B-C-D) • Cascada COX y AINEs
            </p>
          </div>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveCategory('phospholipids')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeCategory === 'phospholipids'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Fosfoglicéridos
          </button>
          <button
            onClick={() => setActiveCategory('steroids')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeCategory === 'steroids'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Esteroides (Esterano)
          </button>
          <button
            onClick={() => setActiveCategory('prostaglandins')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeCategory === 'prostaglandins'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Prostaglandinas & AINEs
          </button>
          <button
            onClick={() => setActiveCategory('lipoproteins')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeCategory === 'lipoproteins'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Lipoproteínas (LDL/HDL)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {activeCategory === 'phospholipids' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
              <span className="text-xs font-bold text-neutral-900 block">
                Arquitectura Anfipática de un Fosfoglicérido
              </span>

              {/* Graphical representation */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-col items-center justify-center space-y-2 shadow-xs">
                {/* Polar head */}
                <div className="w-40 py-2 rounded-full bg-blue-100 border-2 border-blue-500 text-center font-bold text-blue-900 text-xs shadow-xs">
                  Cabeza Polar (Fosfato + Colina)
                  <span className="block text-[9px] font-mono text-blue-700 font-normal">
                    Hidrofílica (Interactúa con H₂O)
                  </span>
                </div>

                {/* Glycerol bridge */}
                <div className="w-24 py-1 rounded bg-neutral-200 text-center font-mono text-[10px] text-neutral-700">
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

        {activeCategory === 'steroids' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 bg-slate-50 rounded-xl border border-neutral-200 p-4 space-y-3">
              <span className="text-xs font-bold text-neutral-900 block">
                Núcleo de Ciclopentanoperhidrofenantreno (Esterano)
              </span>

              <div className="bg-white rounded-xl border border-neutral-200 p-3 flex flex-col items-center justify-center shadow-xs">
                <svg viewBox="0 0 280 120" className="w-full max-w-[260px] h-[110px]">
                  {/* Rings A, B, C (Hexagons) and D (Pentagon) */}
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

        {activeCategory === 'prostaglandins' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 bg-red-50/60 rounded-xl border border-red-200 p-4 space-y-3">
              <span className="text-xs font-bold text-red-950 block">
                Cascada del Ácido Araquidónico (20:4) & Ciclooxigenasas (COX)
              </span>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-neutral-500 text-[10px] block">Fosfolípidos de Membrana</span>
                  <span className="text-neutral-800 font-bold">↳ Fosfolipasa A₂ (PLA₂) → Ácido Araquidónico (20 Carbonos)</span>
                </div>

                <div className="p-2.5 bg-amber-50 rounded border border-amber-300 relative">
                  <span className="text-amber-800 text-[10px] block font-bold">VÍA COX-1 / COX-2</span>
                  <span className="text-neutral-900">↳ Síntesis de Prostaglandinas (PGE₂, PGI₂) & Tromboxano A₂</span>
                  <div className="mt-2 p-1.5 bg-red-100 rounded border border-red-300 text-[10px] text-red-900 font-bold">
                    ⛔ Diana Farmacológica: Aspirina e Ibuprofeno (AINEs) inhiben COX, suprimiendo dolor, fiebre e inflamación.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-xl border border-neutral-200 p-4 space-y-2 text-xs">
              <strong className="text-neutral-900 block">Acciones Fisiológicas de las Prostaglandinas:</strong>
              <div className="space-y-1 text-[11px] text-neutral-600">
                <p>• <strong>PGE₂:</strong> Vasodilatación, sensibilización de nociceptores (dolor) y pirógeno central (fiebre en hipotálamo).</p>
                <p>• <strong>Prostaciclina (PGI₂):</strong> Vasodilatador e inhibidor potente de la agregación plaquetaria en endotelio vascular sano.</p>
                <p>• <strong>Tromboxano A₂:</strong> Síntesis plaquetaria con vasoconstricción y potente agregación hemostática.</p>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'lipoproteins' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <strong className="text-neutral-900">Quilomicrones</strong>
                <span className="text-[10px] block text-neutral-500">Origen: Intestinal</span>
                <p className="text-[11px] text-neutral-600">Transportan triglicéridos exógenos de la dieta al músculo y tejido adiposo.</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <strong className="text-neutral-900">VLDL</strong>
                <span className="text-[10px] block text-neutral-500">Origen: Hepático</span>
                <p className="text-[11px] text-neutral-600">Transportan triglicéridos endógenos sintetizados en el hígado.</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 space-y-1">
                <strong className="text-red-900">LDL ("Malo")</strong>
                <span className="text-[10px] block text-red-600 font-bold">Aterogénico</span>
                <p className="text-[11px] text-neutral-700">Rico en colesterol; su depósito subendotelial oxidado inicia la aterosclerosis.</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl border border-green-200 space-y-1">
                <strong className="text-green-900">HDL ("Bueno")</strong>
                <span className="text-[10px] block text-green-600 font-bold">Protector</span>
                <p className="text-[11px] text-neutral-700">Transporte reverso de colesterol desde los tejidos periféricos hacia el hígado.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
