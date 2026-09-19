import React, { useState } from 'react';
import { Calculator, Flame, Activity, PieChart, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export const SceneBioSolvedProblems: React.FC = () => {
  const [activeProblem, setActiveProblem] = useState<'calories' | 'kinetics'>('calories');

  // Problem 1: Caloric Calculation States
  const [carbsGrams, setCarbsGrams] = useState<number>(150);
  const [proteinGrams, setProteinGrams] = useState<number>(60);
  const [lipidGrams, setLipidGrams] = useState<number>(40);

  const carbsKcal = carbsGrams * 4;
  const proteinKcal = proteinGrams * 4;
  const lipidKcal = lipidGrams * 9;
  const totalKcal = carbsKcal + proteinKcal + lipidKcal;

  const carbsPercent = totalKcal > 0 ? (carbsKcal / totalKcal) * 100 : 0;
  const proteinPercent = totalKcal > 0 ? (proteinKcal / totalKcal) * 100 : 0;
  const lipidPercent = totalKcal > 0 ? (lipidKcal / totalKcal) * 100 : 0;

  const carbsKj = carbsKcal * 4.184;
  const proteinKj = proteinKcal * 4.184;
  const lipidKj = lipidKcal * 4.184;
  const totalKj = totalKcal * 4.184;

  const handleResetCalories = () => {
    setCarbsGrams(150);
    setProteinGrams(60);
    setLipidGrams(40);
  };

  // Problem 2: Michaelis-Menten Kinetics States
  const [vmax, setVmax] = useState<number>(100);
  const [km, setKm] = useState<number>(2.0);
  const [customS, setCustomS] = useState<number>(2.0);

  const calculatedVo = (vmax * customS) / (km + customS);
  const percentageOfVmax = (calculatedVo / vmax) * 100;

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Ejercicios Numéricos & Casos Clínicos Resueltos Paso a Paso
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Balance Calórico (4 - 4 - 9 kcal/g) • Ecuación de Michaelis-Menten (V₀, V_max, K_m)
            </p>
          </div>
        </div>

        {/* Problem switcher */}
        <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveProblem('calories')}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeProblem === 'calories'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            1. Valor Calórico Nutricional
          </button>
          <button
            onClick={() => setActiveProblem('kinetics')}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeProblem === 'kinetics'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            2. Cinética de Michaelis-Menten
          </button>
        </div>
      </div>

      {/* Problem 1: Caloric Value */}
      {activeProblem === 'calories' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto">
          {/* Left: Interactive Macronutrient Adjuster */}
          <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#E51B23]" />
                Enunciado & Composición de la Ración Dietética
              </span>
              <button
                onClick={handleResetCalories}
                className="text-[10px] text-neutral-500 hover:text-neutral-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Valores del Problema
              </button>
            </div>

            <p className="text-[11px] text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-200 leading-relaxed shadow-xs">
              <strong>Caso de Estudio:</strong> Un paciente hospitalizado recibe una ración que contiene <strong>{carbsGrams} g de carbohidratos</strong>, <strong>{proteinGrams} g de proteínas</strong> y <strong>{lipidGrams} g de lípidos</strong>. Determine el aporte energético total en kcal y kilojulios (kJ), y la contribución porcentual de cada macronutriente.
            </p>

            {/* Sliders */}
            <div className="space-y-3 bg-white p-3 rounded-lg border border-neutral-200 shadow-xs">
              {/* Carbs */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-700 font-semibold text-[#E51B23]">Carbohidratos (4 kcal/g = 17 kJ/g):</span>
                  <span className="font-mono font-bold">{carbsGrams} g</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="5"
                  value={carbsGrams}
                  onChange={(e) => setCarbsGrams(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#E51B23]"
                />
              </div>

              {/* Protein */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-700 font-semibold text-blue-600">Proteínas (4 kcal/g = 17 kJ/g):</span>
                  <span className="font-mono font-bold">{proteinGrams} g</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="5"
                  value={proteinGrams}
                  onChange={(e) => setProteinGrams(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Lipids */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-700 font-semibold text-amber-600">Lípidos / Grasas (9 kcal/g = 38 kJ/g):</span>
                  <span className="font-mono font-bold">{lipidGrams} g</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="5"
                  value={lipidGrams}
                  onChange={(e) => setLipidGrams(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
            </div>

            {/* Distribution Bar */}
            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-neutral-200 shadow-xs">
              <div className="flex justify-between text-[11px] font-bold text-neutral-800">
                <span>Distribución Calórica Porcentual:</span>
                <span className="font-mono">{totalKcal} kcal total</span>
              </div>
              <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden flex">
                <div style={{ width: `${carbsPercent}%` }} className="bg-[#E51B23]" title="Carbohidratos" />
                <div style={{ width: `${proteinPercent}%` }} className="bg-blue-600" title="Proteínas" />
                <div style={{ width: `${lipidPercent}%` }} className="bg-amber-500" title="Lípidos" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-600">
                <span className="text-[#E51B23]">Glúcidos: {carbsPercent.toFixed(1)}%</span>
                <span className="text-blue-600">Proteínas: {proteinPercent.toFixed(1)}%</span>
                <span className="text-amber-700">Lípidos: {lipidPercent.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Resolution Panel */}
          <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
            <span className="text-xs font-bold text-neutral-900 block">
              Resolución Numérica Paso a Paso
            </span>

            {/* Step 1 */}
            <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1 shadow-xs text-[11px]">
              <div className="font-bold text-neutral-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-red-100 text-[#E51B23] font-bold flex items-center justify-center text-[10px]">1</span>
                Cálculo de Energía por Macronutriente:
              </div>
              <div className="font-mono text-[10px] space-y-1 text-neutral-700 pl-5">
                <div>• Carbohidratos: {carbsGrams} g × 4 kcal/g = <strong className="text-[#E51B23]">{carbsKcal} kcal</strong> ({carbsKj.toFixed(0)} kJ)</div>
                <div>• Proteínas: {proteinGrams} g × 4 kcal/g = <strong className="text-blue-600">{proteinKcal} kcal</strong> ({proteinKj.toFixed(0)} kJ)</div>
                <div>• Lípidos: {lipidGrams} g × 9 kcal/g = <strong className="text-amber-600">{lipidKcal} kcal</strong> ({lipidKj.toFixed(0)} kJ)</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1 shadow-xs text-[11px]">
              <div className="font-bold text-neutral-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-red-100 text-[#E51B23] font-bold flex items-center justify-center text-[10px]">2</span>
                Energía Total de la Dieta:
              </div>
              <div className="font-mono text-xs pl-5 py-1 text-neutral-900 font-bold">
                E_total = {carbsKcal} + {proteinKcal} + {lipidKcal} = <span className="text-[#E51B23] text-sm">{totalKcal} kcal</span> ({totalKj.toFixed(0)} kJ)
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1 shadow-xs text-[11px]">
              <div className="font-bold text-neutral-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-red-100 text-[#E51B23] font-bold flex items-center justify-center text-[10px]">3</span>
                Porcentaje de Contribución Calórica:
              </div>
              <div className="font-mono text-[10px] space-y-0.5 text-neutral-700 pl-5">
                <div>• % Glúcidos = ({carbsKcal} / {totalKcal}) × 100 = <strong>{carbsPercent.toFixed(1)}%</strong> (Rango OMS recomendado: 45 - 65%)</div>
                <div>• % Proteínas = ({proteinKcal} / {totalKcal}) × 100 = <strong>{proteinPercent.toFixed(1)}%</strong> (Rango OMS recomendado: 10 - 20%)</div>
                <div>• % Lípidos = ({lipidKcal} / {totalKcal}) × 100 = <strong>{lipidPercent.toFixed(1)}%</strong> (Rango OMS recomendado: 20 - 35%)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 2: Michaelis-Menten Kinetics */}
      {activeProblem === 'kinetics' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto">
          {/* Left: Problem Statement & Interactive Substrate */}
          <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
            <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#E51B23]" />
              Enunciado del Problema 2: Cinética Enzimática
            </span>

            <div className="text-[11px] text-neutral-700 bg-white p-3 rounded-lg border border-neutral-200 space-y-1.5 leading-relaxed shadow-xs">
              <p>
                Una enzima que sigue la cinética clásica de Michaelis-Menten posee una velocidad máxima <strong>V_max = 100 μmol/min</strong> y una constante de afinidad <strong>K_m = 2.0 mM</strong>.
              </p>
              <p className="font-medium text-neutral-900">
                Calcule la velocidad inicial de reacción (V₀) a dos concentraciones distintas de sustrato:
              </p>
              <ul className="list-disc list-inside text-neutral-600 font-mono text-[10px]">
                <li>Caso A: [S] = 2.0 mM</li>
                <li>Caso B: [S] = 8.0 mM</li>
              </ul>
            </div>

            {/* Interactive Calculator */}
            <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-3 shadow-xs">
              <span className="text-[11px] font-bold text-neutral-800 block">
                Calculadora Dinámica de Velocidad V₀:
              </span>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-600">Concentración [S]:</span>
                  <span className="font-mono font-bold text-[#E51B23]">{customS.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="16.0"
                  step="0.2"
                  value={customS}
                  onChange={(e) => setCustomS(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#E51B23]"
                />
              </div>

              {/* Quick preset buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCustomS(2.0)}
                  className={`flex-1 py-1 text-[10px] rounded border font-medium cursor-pointer ${
                    customS === 2.0
                      ? 'bg-red-50 text-[#E51B23] border-red-300 font-bold'
                      : 'bg-white text-neutral-600 border-neutral-200'
                  }`}
                >
                  Caso A: [S] = 2.0 mM (= Km)
                </button>
                <button
                  onClick={() => setCustomS(8.0)}
                  className={`flex-1 py-1 text-[10px] rounded border font-medium cursor-pointer ${
                    customS === 8.0
                      ? 'bg-red-50 text-[#E51B23] border-red-300 font-bold'
                      : 'bg-white text-neutral-600 border-neutral-200'
                  }`}
                >
                  Caso B: [S] = 8.0 mM (= 4 Km)
                </button>
              </div>

              {/* Calculation Output Box */}
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center space-y-1">
                <span className="text-[10px] text-neutral-500 font-mono block">
                  V₀ = (V_max · [S]) / (K_m + [S])
                </span>
                <div className="text-lg font-extrabold text-[#E51B23] font-mono">
                  V₀ = {calculatedVo.toFixed(1)} μmol/min
                </div>
                <span className="text-[10px] text-neutral-600 font-medium block">
                  Equivale al <strong>{percentageOfVmax.toFixed(1)}%</strong> de la capacidad catalítica máxima (V_max).
                </span>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Formal Derivations */}
          <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
            <span className="text-xs font-bold text-neutral-900 block">
              Desarrollo Teórico y Justificación Bioquímica
            </span>

            {/* Case A Derivation */}
            <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1.5 shadow-xs text-[11px]">
              <div className="font-bold text-neutral-800 flex items-center justify-between">
                <span>Caso A: Para [S] = 2.0 mM:</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                  [S] = K_m
                </span>
              </div>
              <div className="font-mono text-[10px] text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-200 space-y-1">
                <div>V₀ = (100 μmol/min × 2.0 mM) / (2.0 mM + 2.0 mM)</div>
                <div>V₀ = 200 / 4.0 = <strong className="text-blue-700">50 μmol/min</strong></div>
              </div>
              <p className="text-[10px] text-neutral-600">
                <strong>Conclusión Bioquímica:</strong> Se verifica rigurosamente la definición de Km: es la concentración de sustrato a la cual la velocidad de reacción alcanza exactamente la mitad de su velocidad máxima (<strong>V₀ = V_max / 2</strong>).
              </p>
            </div>

            {/* Case B Derivation */}
            <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1.5 shadow-xs text-[11px]">
              <div className="font-bold text-neutral-800 flex items-center justify-between">
                <span>Caso B: Para [S] = 8.0 mM:</span>
                <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-mono text-[10px] font-bold">
                  [S] = 4 K_m
                </span>
              </div>
              <div className="font-mono text-[10px] text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-200 space-y-1">
                <div>V₀ = (100 μmol/min × 8.0 mM) / (2.0 mM + 8.0 mM)</div>
                <div>V₀ = 800 / 10.0 = <strong className="text-green-700">80 μmol/min</strong></div>
              </div>
              <p className="text-[10px] text-neutral-600">
                <strong>Conclusión Bioquímica:</strong> Al cuadruplicar la concentración de sustrato respecto a la Km, la enzima se encuentra operando al <strong>80% de su capacidad catalítica máxima</strong>, aproximándose asintóticamente a la saturación completa de sus sitios activos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
