import React, { useState } from 'react';
import { Layers, Droplets, AlertCircle, RefreshCw, Scissors, CheckCircle } from 'lucide-react';

export const SceneBio3DisaccharidesHaworth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lactose' | 'polysaccharides'>('lactose');
  const [hasLactase, setHasLactase] = useState<boolean>(true);
  const [hydrolysisProgress, setHydrolysisProgress] = useState<number>(100);
  const [polyType, setPolyType] = useState<'glycogen' | 'starch' | 'cellulose'>('glycogen');

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Formas de Haworth, Enlace Glicosídico & Arquitectura de Polisacáridos
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Ciclación Hemiacetálica • Enlace β-1,4 de Lactosa • Glucógeno vs Celulosa
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('lactose')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'lactose'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Lactosa & Intolerancia
          </button>
          <button
            onClick={() => setActiveTab('polysaccharides')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === 'polysaccharides'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Glucógeno vs Celulosa
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {activeTab === 'lactose' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Lactose Molecule Haworth Ring Scheme */}
            <div className="lg:col-span-7 flex flex-col bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900">
                  Estructura de la Lactosa: Galactosa β(1→4) Glucosa
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono font-bold">
                  Enlace O-glicosídico β-1,4
                </span>
              </div>

              {/* Haworth SVG Illustration */}
              <div className="bg-white rounded-xl border border-neutral-200 p-3 flex flex-col items-center justify-center relative shadow-xs">
                <svg viewBox="0 0 420 160" className="w-full max-w-[400px] h-[150px]">
                  {/* Left Ring: β-D-Galactopyranose */}
                  <polygon
                    points="60,60 110,40 150,75 130,120 70,120"
                    fill="#EFF6FF"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                  />
                  <text x="95" y="85" fill="#1D4ED8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    β-D-Galactosa
                  </text>
                  <text x="145" y="70" fill="#E51B23" fontSize="10" fontWeight="bold">
                    C1
                  </text>

                  {/* Glycosidic Bridge (O-link) */}
                  <path
                    d="M 150 75 Q 185 55 220 75"
                    fill="none"
                    stroke={hasLactase ? '#16A34A' : '#E51B23'}
                    strokeWidth="3.5"
                    strokeDasharray={hasLactase ? 'none' : '4,2'}
                  />
                  <circle cx="185" cy="65" r="9" fill="#FFFFFF" stroke={hasLactase ? '#16A34A' : '#E51B23'} strokeWidth="2" />
                  <text x="185" y="69" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">
                    O
                  </text>

                  {/* Right Ring: D-Glucopyranose */}
                  <polygon
                    points="220,75 260,40 310,60 300,120 240,120"
                    fill="#FEF2F2"
                    stroke="#DC2626"
                    strokeWidth="2.5"
                  />
                  <text x="270" y="85" fill="#B91C1C" fontSize="11" fontWeight="bold" textAnchor="middle">
                    D-Glucosa
                  </text>
                  <text x="225" y="70" fill="#E51B23" fontSize="10" fontWeight="bold">
                    C4
                  </text>

                  {/* Scissors Icon for Lactase if active */}
                  {hasLactase && (
                    <g transform="translate(175, 20)">
                      <circle cx="10" cy="10" r="14" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
                      <text x="10" y="14" fill="#15803D" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Lactasa
                      </text>
                    </g>
                  )}
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] text-neutral-600 border-t border-neutral-100 pt-2 px-2">
                  <span>Carbono 1 anomérico (β)</span>
                  <span className="font-mono text-neutral-400">— Condensación (-H₂O) —</span>
                  <span>Carbono 4 hidroxilo</span>
                </div>
              </div>

              {/* Interactive Lactase Toggle */}
              <div className="flex items-center justify-between p-3 bg-neutral-100/70 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-800">
                    Estado Enzimático en Borde en Cepillo:
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      hasLactase
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}
                  >
                    {hasLactase ? 'Lactasa Normal (Digestión Óptima)' : 'Hipolactasia / Déficit de Lactasa'}
                  </span>
                </div>

                <button
                  onClick={() => setHasLactase(!hasLactase)}
                  className="px-3 py-1.5 bg-[#E51B23] hover:bg-[#c4141b] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {hasLactase ? 'Simular Déficit de Lactasa' : 'Restaurar Enzima Lactasa'}
                </button>
              </div>
            </div>

            {/* Right: Pathophysiological Consequence Panel */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              {hasLactase ? (
                <div className="bg-green-50/70 border-2 border-green-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-green-900 font-bold text-xs">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Hidrólisis Fisiológica en Yeyuno
                  </div>
                  <p className="text-[11px] text-green-950 leading-relaxed">
                    La enzima <strong>lactasa-florizina hidrolasa</strong> escinde el enlace β-1,4. Los monosacáridos libres <strong>D-galactosa</strong> y <strong>D-glucosa</strong> son cotransportados activamente hacia el enterocito por el transportador <strong>SGLT-1</strong> sin generar distensión colónica.
                  </p>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-green-200 text-[10px] space-y-1 font-mono text-green-900">
                    <div>• Tolerancia clínica: 100%</div>
                    <div>• Osmolaridad luminal: Equilibrada (~290 mOsm/L)</div>
                    <div>• Producción de gas: Nula</div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50/80 border-2 border-red-300 rounded-xl p-4 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-[#E51B23]" />
                    Fisiopatología: Intolerancia a la Lactosa
                  </div>
                  <p className="text-[11px] text-red-950 leading-relaxed">
                    Al no hidrolizarse, la lactosa permanece intacta en la luz intestinal:
                  </p>
                  <div className="space-y-1.5 text-[11px] text-neutral-800">
                    <div className="p-2 bg-white rounded border border-red-200">
                      <strong className="text-red-700 block text-[10px] uppercase">1. Efecto Osmótico Luminal:</strong>
                      Atrae agua al colon produciendo diarrea acuosa osmótica y cólicos.
                    </div>
                    <div className="p-2 bg-white rounded border border-red-200">
                      <strong className="text-red-700 block text-[10px] uppercase">2. Fermentación Bacteriana:</strong>
                      La flora colónica genera H₂, CH₄ y ácido láctico (meteorismo, flatulencia y distensión abdominal).
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Polysaccharides Tab */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Interactive comparison selector */}
            <div className="lg:col-span-5 flex flex-col space-y-2">
              <span className="text-xs font-bold text-neutral-900">Seleccionar Polímero Glucídico:</span>
              <button
                onClick={() => setPolyType('glycogen')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  polyType === 'glycogen'
                    ? 'bg-red-50 border-red-300 shadow-xs ring-1 ring-[#E51B23]'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <strong className="text-xs text-neutral-900">Glucógeno (Reserva Animal)</strong>
                  <span className="text-[10px] bg-red-100 text-[#E51B23] px-1.5 py-0.5 rounded font-bold">
                    α-1,4 & α-1,6
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Altamente ramificado cada 8-12 residuos. Localizado en hígado y músculo estriado para liberación ultrarrápida.
                </p>
              </button>

              <button
                onClick={() => setPolyType('starch')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  polyType === 'starch'
                    ? 'bg-amber-50 border-amber-300 shadow-xs ring-1 ring-amber-500'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <strong className="text-xs text-neutral-900">Almidón (Reserva Vegetal)</strong>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                    Amilosa + Amilopectina
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Amilosa lineal helicoidal (α-1,4) y amilopectina moderadamente ramificada (cada 24-30 residuos).
                </p>
              </button>

              <button
                onClick={() => setPolyType('cellulose')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  polyType === 'cellulose'
                    ? 'bg-emerald-50 border-emerald-300 shadow-xs ring-1 ring-emerald-500'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <strong className="text-xs text-neutral-900">Celulosa (Fibra Dietética Humana)</strong>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    β-1,4 Inextensible
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Cadenas lineales paralelas unidas por puentes de H intercatenarios. Indigerible por carecer de celulasas.
                </p>
              </button>
            </div>

            {/* Right: Structural visualization & clinical correlation */}
            <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-neutral-200 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold text-neutral-800">
                  Arquitectura Molecular: {polyType === 'glycogen' ? 'Glucógeno' : polyType === 'starch' ? 'Almidón' : 'Celulosa'}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  Polímero de D-glucosa
                </span>
              </div>

              {/* Graphic schema */}
              <div className="bg-white rounded-lg border border-neutral-200 p-3 h-44 flex items-center justify-center">
                {polyType === 'glycogen' && (
                  <div className="text-center space-y-2">
                    <div className="text-xs font-bold text-[#E51B23]">
                      Árbol Dendrítico Multirramificado
                    </div>
                    <p className="text-[11px] text-neutral-600 max-w-sm">
                      Múltiples extremos no reductores permiten que enzimas como la <strong>glucógeno fosforilasa</strong> liberen glucosa-1-fosfato simultáneamente durante el ejercicio o hipoglucemia aguda.
                    </p>
                  </div>
                )}
                {polyType === 'starch' && (
                  <div className="text-center space-y-2">
                    <div className="text-xs font-bold text-amber-700">
                      Hélices de Amilosa & Gránulos de Amilopectina
                    </div>
                    <p className="text-[11px] text-neutral-600 max-w-sm">
                      Sustrato directo de la <strong>amilasa salival</strong> y <strong>amilasa pancreática</strong> humanas, produciendo maltosa, maltotriosa y dextrinas límite.
                    </p>
                  </div>
                )}
                {polyType === 'cellulose' && (
                  <div className="text-center space-y-2">
                    <div className="text-xs font-bold text-emerald-700">
                      Fibras Lineales Rígidas Paralelas (Puentes de H)
                    </div>
                    <p className="text-[11px] text-neutral-600 max-w-sm">
                      Al no ser digerida en el tracto gastrointestinal humano, forma la <strong>fibra insoluble</strong> que incrementa el bolo fecal y estimula el peristaltismo colónico.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
