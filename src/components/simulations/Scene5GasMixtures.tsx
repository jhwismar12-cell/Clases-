import React, { useState } from 'react';
import { Layers, Play, RotateCcw, Zap, HelpCircle, CheckCircle2, XCircle, Calculator } from 'lucide-react';

export const Scene5GasMixtures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'problem' | 'quiz'>('simulator');
  const [isValveOpen, setIsValveOpen] = useState<boolean>(false);

  // Dalton State
  const [pO2, setPO2] = useState<number>(0.21); // atm
  const [pN2, setPN2] = useState<number>(0.78); // atm
  const [pOther, setPOther] = useState<number>(0.01); // CO2 + vapor

  const pTotal = (pO2 + pN2 + pOther).toFixed(2);
  const xO2 = (pO2 / Number(pTotal)).toFixed(3);
  const xN2 = (pN2 / Number(pTotal)).toFixed(3);

  // Graham State (O2 vs CO2)
  const [isRacing, setIsRacing] = useState<boolean>(false);
  const [raceProgress, setRaceProgress] = useState<{ gas1: number; gas2: number }>({ gas1: 0, gas2: 0 });
  const [racePair, setRacePair] = useState<'O2_CO2' | 'He_Ar'>('O2_CO2');

  const mm1 = racePair === 'O2_CO2' ? 32 : 4; // O2 or He
  const mm2 = racePair === 'O2_CO2' ? 44 : 40; // CO2 or Ar
  const speedRatio = Math.sqrt(mm2 / mm1).toFixed(2);

  const startDiffusionRace = () => {
    setIsRacing(true);
    setRaceProgress({ gas1: 0, gas2: 0 });

    const startTime = Date.now();
    const duration = 2200; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      const g1 = Math.min(100, progress * 100 * 1.2);
      const g2 = Math.min(100, (progress * 100 * 1.2) / Number(speedRatio));

      setRaceProgress({ gas1: g1, gas2: g2 });

      if (progress >= 1) {
        clearInterval(interval);
        setIsRacing(false);
      }
    }, 35);
  };

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Top Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Simulador de Mezclas (Dalton y Graham)</span>
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'problem'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Problema Modelo 2.5</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Autoevaluación 2.5</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          Módulo 2.5 • Dalton y Difusión
        </span>
      </div>

      {activeTab === 'simulator' && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Dalton Simulation */}
          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-600">
                  1. Ley de Dalton: Presiones Parciales
                </span>
                <span className="text-[10px] text-neutral-500 font-mono font-semibold">P_total = ∑ Pᵢ</span>
              </div>

              {/* Multi-gas Chamber */}
              <div className="relative h-36 bg-white rounded-xl border-2 border-neutral-300 overflow-hidden flex mb-3 shadow-inner">
                <div className={`flex-1 transition-all p-2 flex flex-col justify-between ${isValveOpen ? 'bg-blue-50/70' : 'bg-blue-50'}`}>
                  <div>
                    <span className="font-bold text-blue-700 block">Nitrógeno (N₂)</span>
                    <span className="text-[10px] text-neutral-500">78% atmósfera</span>
                  </div>
                  <span className="font-mono font-bold text-blue-600 text-sm">P_N₂ = {pN2.toFixed(2)} atm</span>
                </div>

                <div className="w-1 bg-neutral-400 relative">
                  <button
                    onClick={() => setIsValveOpen(!isValveOpen)}
                    className="absolute top-1/2 -translate-y-1/2 -left-3.5 z-20 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md text-[9px] font-bold"
                  >
                    {isValveOpen ? 'OPEN' : 'CLSD'}
                  </button>
                </div>

                <div className={`flex-1 transition-all p-2 flex flex-col justify-between ${isValveOpen ? 'bg-red-50/70' : 'bg-red-50'}`}>
                  <div>
                    <span className="font-bold text-red-700 block">Oxígeno (O₂)</span>
                    <span className="text-[10px] text-neutral-500">21% atmósfera</span>
                  </div>
                  <span className="font-mono font-bold text-red-600 text-sm">P_O₂ = {pO2.toFixed(2)} atm</span>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-2 mb-2">
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                    <span>Presión Parcial N₂ (atm):</span>
                    <strong className="font-mono text-blue-600">{pN2.toFixed(2)} atm</strong>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={2.0}
                    step={0.05}
                    value={pN2}
                    onChange={(e) => setPN2(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1 bg-neutral-200 rounded"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                    <span>Presión Parcial O₂ (atm):</span>
                    <strong className="font-mono text-red-600">{pO2.toFixed(2)} atm</strong>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    value={pO2}
                    onChange={(e) => setPO2(Number(e.target.value))}
                    className="w-full accent-red-600 h-1 bg-neutral-200 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Total Pressure Calculation */}
            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 font-mono text-[11px] space-y-1 shadow-xs">
              <div className="flex justify-between">
                <span className="text-neutral-600">Presión Total del Aire:</span>
                <strong className="text-red-600 text-xs font-bold">{pTotal} atm</strong>
              </div>
              <div className="flex justify-between text-[10px] text-neutral-500 pt-1 border-t border-neutral-100">
                <span>Fracción Molar X_O₂: {xO2}</span>
                <span>X_N₂: {xN2}</span>
              </div>
            </div>
          </div>

          {/* Graham Diffusion Simulator */}
          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-600">
                  2. Ley de Graham (Velocidad de Difusión)
                </span>
                <span className="text-[10px] text-neutral-500 font-mono font-semibold">v₁/v₂ = √(M₂/M₁)</span>
              </div>

              {/* Pair selector */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setRacePair('O2_CO2')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                    racePair === 'O2_CO2'
                      ? 'bg-red-600 text-white border-red-700'
                      : 'bg-white text-neutral-700 border-neutral-200'
                  }`}
                >
                  O₂ (32 g/mol) vs CO₂ (44 g/mol)
                </button>
                <button
                  onClick={() => setRacePair('He_Ar')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                    racePair === 'He_Ar'
                      ? 'bg-red-600 text-white border-red-700'
                      : 'bg-white text-neutral-700 border-neutral-200'
                  }`}
                >
                  He (4 g/mol) vs Ar (40 g/mol)
                </button>
              </div>

              {/* Race Track */}
              <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-3 mb-3 shadow-inner">
                {/* Gas 1 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="font-bold text-red-600">
                      {racePair === 'O2_CO2' ? 'Oxígeno (O₂, 32 g/mol)' : 'Helio (He, 4 g/mol)'}
                    </span>
                    <span className="text-neutral-500">{raceProgress.gas1.toFixed(0)}% recorrido</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-300">
                    <div
                      style={{ width: `${raceProgress.gas1}%` }}
                      className="h-full bg-red-500 transition-all duration-75"
                    />
                  </div>
                </div>

                {/* Gas 2 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="font-bold text-neutral-700">
                      {racePair === 'O2_CO2' ? 'Dióxido de Carbono (CO₂, 44 g/mol)' : 'Argón (Ar, 40 g/mol)'}
                    </span>
                    <span className="text-neutral-500">{raceProgress.gas2.toFixed(0)}% recorrido</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-300">
                    <div
                      style={{ width: `${raceProgress.gas2}%` }}
                      className="h-full bg-neutral-600 transition-all duration-75"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  disabled={isRacing}
                  onClick={startDiffusionRace}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-neutral-300 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isRacing ? 'Difundiendo...' : 'Iniciar Carrera de Difusión'}</span>
                </button>

                <div className="font-mono text-[11px] text-right">
                  <span className="text-neutral-500 block">Cociente de Velocidad:</span>
                  <strong className="text-red-600 font-bold">{speedRatio}× más rápido</strong>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-neutral-100 rounded-lg text-[10px] text-neutral-600 mt-2">
              🩺 <strong>Principio de Graham:</strong> A igual temperatura, las moléculas más ligeras viajan a mayor velocidad media cuadrática que las pesadas.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Problema Modelo 2.5 */}
      {activeTab === 'problem' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-red-600" />
              <h4 className="font-bold text-sm text-neutral-900">
                Problema Modelo 2.5: Relación de Difusión Gaseosa O₂ vs CO₂
              </h4>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-bold text-neutral-900 mb-1">📋 Enunciado Oficial de la Cátedra:</p>
              <p className="text-neutral-700 italic leading-relaxed">
                "Demuestre cuantitativamente la relación entre las velocidades de difusión en fase gaseosa del oxígeno (O₂, masa molar = 32,0 g/mol) y el dióxido de carbono (CO₂, masa molar = 44,0 g/mol) aplicando la Ley de Graham a temperatura constante."
              </p>
            </div>

            <div className="space-y-3 font-mono">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-neutral-800 font-sans block mb-1">Ecuación de la Ley de Graham</span>
                <p className="text-neutral-700">v(O₂) / v(CO₂) = √( MM(CO₂) / MM(O₂) )</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-red-600 font-sans block mb-1">Sustitución Numérica y Resultado</span>
                <p className="text-neutral-700">v(O₂) / v(CO₂) = √( 44,0 g/mol / 32,0 g/mol )</p>
                <p className="text-neutral-700 mt-1">v(O₂) / v(CO₂) = √( 1,375 )</p>
                <p className="text-red-600 font-bold text-sm mt-2">v(O₂) / v(CO₂) = 1,17</p>
                <p className="text-[11px] font-sans text-neutral-600 mt-2">
                  <strong>Conclusión médica:</strong> En fase gaseosa pura (espacio aéreo), las moléculas de oxígeno difunden un <strong>17% más rápido</strong> que las de dióxido de carbono debido a su menor peso molecular.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-neutral-200 text-center font-mono text-[11px] text-neutral-600">
            v₁ / v₂ = √(MM₂ / MM₁) (Ley de Graham)
          </div>
        </div>
      )}

      {/* Tab 3: Autoevaluación 2.5 */}
      {activeTab === 'quiz' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-neutral-900">Autoevaluación Formativa: Módulo 2.5</h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Pregunta 1 de 1</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-semibold text-neutral-900 text-[13px] leading-relaxed">
                Una mezcla gaseosa en un recipiente rígido cerrado contiene Helio a una presión parcial de 2,0 atm y Argón a una presión parcial de 4,0 atm. Según la Ley de Dalton, ¿cuál es la presión total ejercida sobre las paredes del recipiente?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'A', text: 'A) 2,0 atm' },
                { id: 'B', text: 'B) 6,0 atm' },
                { id: 'C', text: 'C) 8,0 atm' },
                { id: 'D', text: 'D) 12,0 atm' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    if (!isQuizSubmitted) setSelectedQuizOption(opt.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${
                    selectedQuizOption === opt.id
                      ? 'bg-red-50 border-red-500 text-neutral-900 font-semibold'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  } ${isQuizSubmitted && opt.id === 'B' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : ''}`}
                >
                  <span>{opt.text}</span>
                  {isQuizSubmitted && opt.id === 'B' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isQuizSubmitted && selectedQuizOption === opt.id && opt.id !== 'B' && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            {!isQuizSubmitted ? (
              <button
                disabled={!selectedQuizOption}
                onClick={() => setIsQuizSubmitted(true)}
                className="w-full py-2 bg-red-600 disabled:bg-neutral-300 text-white rounded-lg font-bold text-xs transition-colors shadow-xs"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <div className="p-3 bg-white rounded-lg border border-neutral-200 text-[11px] shadow-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Respuesta Correcta: Opción B (6,0 atm)</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Explicación del Prof. Aguilar:</strong> Según la Ley de Dalton de las Presiones Parciales, la presión total de una mezcla de gases que no reaccionan entre sí es la suma directa de las presiones que cada gas ejercería de manera individual: P_total = P_He + P_Ar = 2,0 atm + 4,0 atm = 6,0 atm.
                </p>
                <button
                  onClick={() => {
                    setIsQuizSubmitted(false);
                    setSelectedQuizOption(null);
                  }}
                  className="mt-2 text-[10px] text-red-600 font-bold underline"
                >
                  Reintentar Pregunta
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
