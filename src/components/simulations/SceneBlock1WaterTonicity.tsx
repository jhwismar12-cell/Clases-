import React, { useState } from 'react';
import { Droplet, Microscope, Scale, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';

export const SceneBlock1WaterTonicity: React.FC = () => {
  const [tonicityMode, setTonicityMode] = useState<'isotonica' | 'hipotonica' | 'hipertonica'>('isotonica');
  const [activeTab, setActiveTab] = useState<'microscopio' | 'calculadora' | 'propiedades'>('microscopio');

  // Solution concentration calculator state (preset from markdown: 11.7g NaCl in 500 mL)
  const [massGrams, setMassGrams] = useState<number>(11.7);
  const [volumeMl, setVolumeMl] = useState<number>(500);
  const [molarMass, setMolarMass] = useState<number>(58.5); // NaCl
  const [eqFactor, setEqFactor] = useState<number>(1); // feq for NaCl = 1

  // Calculations
  const moles = molarMass > 0 ? massGrams / molarMass : 0;
  const volumeLiters = volumeMl / 1000;
  const molarity = volumeLiters > 0 ? moles / volumeLiters : 0;
  const normality = molarity * eqFactor;

  const handleResetToDocExercise = () => {
    setMassGrams(11.7);
    setVolumeMl(500);
    setMolarMass(58.5);
    setEqFactor(1);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-3 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
            <Droplet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono tracking-tight text-neutral-100">
              CÁTEDRA 1.5: FISICOQUÍMICA DEL AGUA Y TONICIDAD
            </h3>
            <p className="text-[11px] text-neutral-400">
              Puentes de H, Cristaloides vs Coloides y Osmolaridad Eritrocitaria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('microscopio')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              activeTab === 'microscopio' ? 'bg-[#E51B23] text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Tonicidad & Eritrocitos
          </button>
          <button
            onClick={() => setActiveTab('calculadora')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              activeTab === 'calculadora' ? 'bg-[#E51B23] text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Molaridad (M) & Normalidad (N)
          </button>
          <button
            onClick={() => setActiveTab('propiedades')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              activeTab === 'propiedades' ? 'bg-[#E51B23] text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Agua Anómala
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4">
        {activeTab === 'microscopio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Left 7 cols: Microscope Visual & Controller */}
            <div className="lg:col-span-7 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Microscope className="w-4 h-4 text-blue-600" />
                  Microscopio Hematológico Virtual
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">
                  Osmolaridad Plasmática: 280 - 295 mOsm/kg
                </span>
              </div>

              {/* Tonicity Selector */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'isotonica', label: 'Isotónica', osm: '280 - 295 mOsm/kg', desc: 'NaCl 0,9%' },
                  { id: 'hipotonica', label: 'Hipotónica', osm: '< 280 mOsm/kg', desc: 'H₂O destilada / Hiposalino' },
                  { id: 'hipertonica', label: 'Hipertónica', osm: '> 295 mOsm/kg', desc: 'NaCl 2,0% / Manitol' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTonicityMode(item.id as any)}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      tonicityMode === item.id
                        ? 'border-blue-600 bg-white font-bold text-neutral-900 shadow-xs ring-1 ring-blue-500/20'
                        : 'border-neutral-200 hover:bg-white text-neutral-600'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-blue-700 font-mono font-medium">{item.osm}</div>
                    <div className="text-[9px] text-neutral-400 truncate">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Microscope Circle Simulation */}
              <div className="p-4 bg-neutral-900 rounded-2xl flex flex-col items-center justify-center relative min-h-[190px] overflow-hidden">
                {/* Circular lens border */}
                <div className="w-36 h-36 rounded-full border-4 border-neutral-700 bg-neutral-800/90 relative flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Red Blood Cell Representation */}
                  {tonicityMode === 'isotonica' && (
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-rose-600 border-4 border-rose-500 shadow-md flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-rose-700/80 shadow-inner" />
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 mt-1.5 font-bold">
                        Disco Bicóncavo Normal
                      </span>
                    </div>
                  )}

                  {tonicityMode === 'hipotonica' && (
                    <div className="flex flex-col items-center">
                      <div className="w-22 h-22 rounded-full bg-rose-500/80 border-2 border-rose-300 shadow-lg flex items-center justify-center animate-ping">
                        <span className="text-[9px] text-white font-black">LISIS</span>
                      </div>
                      <span className="text-[9px] font-mono text-red-400 mt-1 font-bold">
                        Hemólisis / Rotura Celular
                      </span>
                    </div>
                  )}

                  {tonicityMode === 'hipertonica' && (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-lg rotate-45 bg-rose-800 border-2 border-rose-700 shadow-inner flex items-center justify-center">
                        <div className="w-4 h-4 rounded-sm bg-rose-950" />
                      </div>
                      <span className="text-[9px] font-mono text-amber-400 mt-2 font-bold">
                        Crenación / Deshidratación
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-2 text-center text-white">
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300">
                    {tonicityMode === 'isotonica' && 'Estado: Equilibrio Dinámico de Agua'}
                    {tonicityMode === 'hipotonica' && 'Estado: Entrada Neta Masiva de H₂O (Edema → Estallido)'}
                    {tonicityMode === 'hipertonica' && 'Estado: Salida Neta de H₂O hacia el exterior'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Crystalloids vs Colloids & Clinical Rules */}
            <div className="lg:col-span-5 p-3.5 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                  Terapia Intravenosa
                </span>
                <h4 className="text-xs font-bold text-neutral-900 mt-1 mb-1">
                  Cristaloides vs. Coloides
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Las soluciones parenterales se clasifican según su peso molecular y su capacidad para atravesar el endotelio capilar vascular:
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/60">
                  <div className="font-bold text-xs text-blue-900 mb-0.5">1. Cristaloides:</div>
                  <p className="text-[11px] text-blue-800 leading-tight">
                    Solutos de bajo peso molecular (NaCl 0,9%, Lactato de Ringer, Dextrosa). Cruzan la membrana capilar hacia el espacio intersticial; solo el 20-25% permanece intravascular.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/60">
                  <div className="font-bold text-xs text-purple-900 mb-0.5">2. Coloides:</div>
                  <p className="text-[11px] text-purple-800 leading-tight">
                    Partículas de gran tamaño molecular (Albúmina humana al 5% o 20%, dextranos). No cruzan el endotelio capilar sano y ejercen <strong>presión oncótica</strong> (25 mmHg), reteniendo agua intravascular.
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 text-xs text-red-900 flex items-start gap-1.5 font-medium">
                <AlertTriangle className="w-4 h-4 text-[#E51B23] shrink-0 mt-0.5" />
                <span>
                  <strong>¡Alerta Médica!</strong> Nunca infundir agua destilada pura endovenosa: causa hemólisis intravascular fulminante, liberación masiva de hemoglobina y necrosis tubular renal aguda.
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculadora' && (
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                  Calculadora de Concentración Molar y Normal
                </h4>
                <p className="text-[11px] text-neutral-500">
                  Resuelve el ejercicio cuantitativo del Sílabo paso a paso
                </p>
              </div>
              <button
                onClick={handleResetToDocExercise}
                className="text-[11px] bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Ejercicio Oficial (11,7g NaCl / 500 mL)</span>
              </button>
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-neutral-200">
              <div>
                <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                  Masa del Soluto (g):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={massGrams}
                  onChange={(e) => setMassGrams(Number(e.target.value))}
                  className="w-full font-mono text-xs p-1.5 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                  Masa Molar (g/mol):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={molarMass}
                  onChange={(e) => setMolarMass(Number(e.target.value))}
                  className="w-full font-mono text-xs p-1.5 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <span className="text-[9px] text-neutral-400 font-mono">NaCl = 58,5 g/mol</span>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                  Volumen Solución (mL):
                </label>
                <input
                  type="number"
                  value={volumeMl}
                  onChange={(e) => setVolumeMl(Number(e.target.value))}
                  className="w-full font-mono text-xs p-1.5 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <span className="text-[9px] text-neutral-400 font-mono">V = {volumeLiters} L</span>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                  Factor Eq (feq):
                </label>
                <input
                  type="number"
                  value={eqFactor}
                  onChange={(e) => setEqFactor(Number(e.target.value))}
                  className="w-full font-mono text-xs p-1.5 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <span className="text-[9px] text-neutral-400 font-mono">Na⁺ carga = 1</span>
              </div>
            </div>

            {/* Step-by-step resolution box */}
            <div className="p-3.5 bg-white rounded-xl border border-neutral-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono block">
                Deducción Matemática Paso a Paso:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="text-neutral-500 text-[10px]">1. Moles de Soluto (n)</div>
                  <div className="font-bold text-neutral-800">
                    n = m / MM = {massGrams} g / {molarMass} g/mol
                  </div>
                  <div className="text-blue-700 font-bold mt-1">n = {moles.toFixed(3)} moles</div>
                </div>

                <div className="p-2.5 bg-blue-50/70 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-[10px]">2. Molaridad (M)</div>
                  <div className="font-bold text-blue-900">
                    M = n / V(L) = {moles.toFixed(3)} / {volumeLiters} L
                  </div>
                  <div className="text-blue-950 font-black text-sm mt-1">M = {molarity.toFixed(2)} M</div>
                </div>

                <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200">
                  <div className="text-emerald-600 text-[10px]">3. Normalidad (N)</div>
                  <div className="font-bold text-emerald-900">
                    N = M × feq = {molarity.toFixed(2)} × {eqFactor}
                  </div>
                  <div className="text-emerald-950 font-black text-sm mt-1">N = {normality.toFixed(2)} N</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'propiedades' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-[10px] font-bold text-blue-800 uppercase font-mono block">
                Calor Específico Alto
              </span>
              <div className="text-base font-black text-neutral-900 font-mono my-1">
                1,00 cal / g · °C
              </div>
              <p className="text-xs text-neutral-600 leading-tight">
                Amortigua cambios térmicos bruscos ambientales, manteniendo la temperatura corporal constante a 37 °C sin fluctuaciones letales.
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase font-mono block">
                Calor de Vaporización
              </span>
              <div className="text-base font-black text-neutral-900 font-mono my-1">
                540 cal / g (a 100°C)
              </div>
              <p className="text-xs text-neutral-600 leading-tight">
                Permite enfriar el cuerpo eficientemente durante el ejercicio o fiebre mediante la evaporación del sudor en la superficie cutánea.
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono block">
                Constante Dieléctrica
              </span>
              <div className="text-base font-black text-neutral-900 font-mono my-1">
                ε = 78,5 (a 25 °C)
              </div>
              <p className="text-xs text-neutral-600 leading-tight">
                Debilita la atracción electrostática entre aniones y cationes, permitiendo disolver sales formando esferas de hidratación estables.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
