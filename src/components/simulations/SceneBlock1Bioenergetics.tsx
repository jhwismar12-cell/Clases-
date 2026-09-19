import React, { useState } from 'react';
import { Flame, Zap, Scale, ArrowRight, RotateCcw, Activity } from 'lucide-react';

export const SceneBlock1Bioenergetics: React.FC = () => {
  // Clinical problem values as initial state
  const [carbsGrams, setCarbsGrams] = useState<number>(65);
  const [proteinGrams, setProteinGrams] = useState<number>(20);
  const [lipidGrams, setLipidGrams] = useState<number>(15);
  const [isAtpHydrolyzed, setIsAtpHydrolyzed] = useState<boolean>(false);

  // Calculations
  const carbsKcal = carbsGrams * 4;
  const proteinKcal = proteinGrams * 4;
  const lipidKcal = lipidGrams * 9;

  const totalKcal = carbsKcal + proteinKcal + lipidKcal;
  const totalKJ = totalKcal * 4.184;

  const carbsPercent = totalKcal > 0 ? Math.round((carbsKcal / totalKcal) * 100) : 0;
  const proteinPercent = totalKcal > 0 ? Math.round((proteinKcal / totalKcal) * 100) : 0;
  const lipidPercent = totalKcal > 0 ? Math.round((lipidKcal / totalKcal) * 100) : 0;

  const handleResetToClinicalCase = () => {
    setCarbsGrams(65);
    setProteinGrams(20);
    setLipidGrams(15);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-3 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-bold">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono tracking-tight text-neutral-100">
              CÁTEDRA 1.2: BIOENERGÉTICA Y VALOR CALÓRICO
            </h3>
            <p className="text-[11px] text-neutral-400">
              Termodinámica Abierta, Bomba Calorimétrica y Metabolismo del ATP
            </p>
          </div>
        </div>

        <button
          onClick={handleResetToClinicalCase}
          className="text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Caso Clínico (65g/20g/15g)</span>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4">
        {/* Top: Macronutrient densities benchmark */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 text-center">
            <span className="text-[10px] font-bold text-blue-800 uppercase font-mono block">Carbohidratos</span>
            <div className="text-lg font-black text-blue-900 font-mono my-0.5">4 kcal/g</div>
            <span className="text-[10px] text-blue-700 font-mono">17 kJ/g • Combustible rápido</span>
          </div>

          <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 text-center">
            <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono block">Proteínas</span>
            <div className="text-lg font-black text-emerald-900 font-mono my-0.5">4 kcal/g</div>
            <span className="text-[10px] text-emerald-700 font-mono">17 kJ/g • Función estructural/enzima</span>
          </div>

          <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 text-center">
            <span className="text-[10px] font-bold text-amber-800 uppercase font-mono block">Lípidos (Grasas)</span>
            <div className="text-lg font-black text-amber-900 font-mono my-0.5">9 kcal/g</div>
            <span className="text-[10px] text-amber-700 font-mono">38 kJ/g • Máxima densidad anhidra</span>
          </div>
        </div>

        {/* Main Grid: Interactive Nutrition Calculator + ATP Hydrolysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Left 7 cols: Interactive Nutrition Calculator */}
          <div className="lg:col-span-7 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-neutral-600" />
                Calculadora Bioenergética Nutricional
              </h4>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-500">
                1 kcal = 4,184 kJ
              </span>
            </div>

            {/* Sliders */}
            <div className="space-y-2.5">
              {/* Carbs */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-blue-800">Carbohidratos: {carbsGrams} g</span>
                  <span className="font-mono text-neutral-600">{carbsKcal} kcal ({Math.round(carbsKcal * 4.184)} kJ)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={carbsGrams}
                  onChange={(e) => setCarbsGrams(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Protein */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-emerald-800">Proteínas: {proteinGrams} g</span>
                  <span className="font-mono text-neutral-600">{proteinKcal} kcal ({Math.round(proteinKcal * 4.184)} kJ)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={proteinGrams}
                  onChange={(e) => setProteinGrams(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Lipids */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-amber-800">Lípidos: {lipidGrams} g</span>
                  <span className="font-mono text-neutral-600">{lipidKcal} kcal ({Math.round(lipidKcal * 4.184)} kJ)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={lipidGrams}
                  onChange={(e) => setLipidGrams(Number(e.target.value))}
                  className="w-full accent-amber-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Macro distribution bar */}
            <div>
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono mb-1">
                <span>Distribución Calórica (%)</span>
                <span>{carbsPercent}% C / {proteinPercent}% P / {lipidPercent}% L</span>
              </div>
              <div className="h-2.5 w-full bg-neutral-200 rounded-full overflow-hidden flex">
                <div style={{ width: `${carbsPercent}%` }} className="bg-blue-600 transition-all" />
                <div style={{ width: `${proteinPercent}%` }} className="bg-emerald-600 transition-all" />
                <div style={{ width: `${lipidPercent}%` }} className="bg-amber-500 transition-all" />
              </div>
            </div>

            {/* Total Results Card */}
            <div className="p-3 bg-white rounded-lg border-2 border-neutral-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                  Energía Total Liberada
                </span>
                <div className="text-xl font-black text-neutral-900 font-mono">
                  {totalKcal.toLocaleString()} <span className="text-xs font-bold text-[#E51B23]">kcal</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                  Equivalente Internacional
                </span>
                <div className="text-lg font-bold text-neutral-700 font-mono">
                  {totalKJ.toLocaleString(undefined, { maximumFractionDigits: 1 })}{' '}
                  <span className="text-xs text-neutral-500">kJ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: ATP Hydrolysis & Bioenergetics Model */}
          <div className="lg:col-span-5 p-3.5 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                  Moneda Energética Universal
                </span>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  ΔG° = -30,5 kJ/mol
                </span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 mb-1">
                Hidrólisis del Adenosín Trifosfato (ATP)
              </h4>
              <p className="text-[11px] text-neutral-600 leading-tight">
                La energía potencial química en los enlaces fosfoanhídrido se transforma en trabajo mecánico, bombas de iones y calor.
              </p>
            </div>

            {/* Interactive ATP Graphic */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
              <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold mb-3">
                <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded border border-purple-300">
                  Adenina + Ribosa
                </span>
                <span>—</span>
                <span className="bg-amber-100 text-amber-900 px-1.5 py-1 rounded border border-amber-300">
                  Ⓟα
                </span>
                <span>~</span>
                <span className="bg-amber-100 text-amber-900 px-1.5 py-1 rounded border border-amber-300">
                  Ⓟβ
                </span>
                <span>~</span>
                <span
                  className={`px-1.5 py-1 rounded border transition-all ${
                    isAtpHydrolyzed
                      ? 'bg-red-100 text-red-700 border-red-300 translate-x-2 opacity-60'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  Ⓟγ
                </span>
              </div>

              <button
                onClick={() => setIsAtpHydrolyzed(!isAtpHydrolyzed)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isAtpHydrolyzed
                    ? 'bg-neutral-800 text-white hover:bg-neutral-900'
                    : 'bg-[#E51B23] text-white hover:bg-red-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isAtpHydrolyzed ? 'Restablecer ATP (Fosforilación)' : 'Ejecutar Hidrólisis (Liberar Energía)'}</span>
              </button>

              {isAtpHydrolyzed && (
                <div className="mt-2.5 p-2 bg-emerald-50 rounded border border-emerald-200 text-left text-[11px] text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-600" />
                    <span>Energía Liberada: -7,3 kcal/mol (-30,5 kJ/mol)</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 leading-tight">
                    El fosfato inorgánico libre (Pi) fosforila la bomba Na⁺/K⁺ o activa los puentes cruzados de miosina en el sarcómero.
                  </p>
                </div>
              )}
            </div>

            {/* Thermodynamic open system principle */}
            <div className="p-2.5 bg-neutral-100/70 rounded-lg text-[11px] text-neutral-600 flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#E51B23] shrink-0 mt-0.5" />
              <span>
                <strong>Sistema Abierto:</strong> El ser humano disipa calor hacia el ambiente y excreta CO₂ y urea, manteniendo una baja entropía interna.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
