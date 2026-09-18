import React, { useState } from 'react';
import { Gauge, Flame, Minimize2, Maximize2, RotateCcw } from 'lucide-react';

type GasLawMode = 'boyle' | 'charles' | 'gay-lussac';

export const Scene3GasLawsSimulator: React.FC = () => {
  const [activeLaw, setActiveLaw] = useState<GasLawMode>('boyle');

  // Boyle variables: T constant (300K)
  const [boyleVolume, setBoyleVolume] = useState<number>(4.0); // Liters
  const boyleK = 4.0; // P * V = 4.0 (so at V=4, P=1 atm; at V=2, P=2 atm)
  const boylePressure = (boyleK / boyleVolume).toFixed(2);

  // Charles variables: P constant (1 atm)
  const [charlesTempK, setCharlesTempK] = useState<number>(300);
  // V = V0 * (T / T0) => at 300K, V = 2.0L; at 600K, V = 4.0L
  const charlesVolume = ((charlesTempK / 300) * 2.0).toFixed(2);

  // Gay-Lussac variables: V constant (2.0 L)
  const [gayLussacTempK, setGayLussacTempK] = useState<number>(300);
  // P = P0 * (T / T0) => at 300K, P = 1 atm; at 600K, P = 2 atm
  const gayLussacPressure = ((gayLussacTempK / 300) * 1.0).toFixed(2);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
      {/* Law Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveLaw('boyle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLaw === 'boyle'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            1. Ley de Boyle (Isotérmica: T = Cte)
          </button>
          <button
            onClick={() => setActiveLaw('charles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLaw === 'charles'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            2. Ley de Charles (Isobárica: P = Cte)
          </button>
          <button
            onClick={() => setActiveLaw('gay-lussac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLaw === 'gay-lussac'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            3. Ley de Gay-Lussac (Isocórica: V = Cte)
          </button>
        </div>

        <button
          onClick={() => {
            setBoyleVolume(4.0);
            setCharlesTempK(300);
            setGayLussacTempK(300);
          }}
          className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-lg border border-neutral-200"
          title="Restablecer valores"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Simulator Workspace */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 items-center">
        {/* Visual Cylinder with Hydraulic Piston */}
        <div className="relative w-full md:w-64 h-64 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center justify-end p-4 overflow-hidden shadow-inner">
          {/* Manometer on top/side */}
          <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-neutral-200 text-xs shadow-xs">
            <Gauge className="w-3.5 h-3.5 text-red-600" />
            <span className="text-neutral-500 font-medium">Manómetro:</span>
            <span className="font-mono font-bold text-red-600">
              {activeLaw === 'boyle'
                ? `${boylePressure} atm`
                : activeLaw === 'charles'
                ? '1.00 atm (Fijo)'
                : `${gayLussacPressure} atm`}
            </span>
          </div>

          {/* Cylinder Shell */}
          <div className="relative w-44 h-48 border-2 border-neutral-400 rounded-b-xl border-t-0 bg-white overflow-hidden flex flex-col justify-end shadow-xs">
            {/* Piston Head (Moves up and down) */}
            <div
              className="absolute left-0 right-0 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 border-y border-neutral-400 shadow-xs transition-all duration-200 z-10"
              style={{
                height: '18px',
                bottom:
                  activeLaw === 'boyle'
                    ? `${(boyleVolume / 8.0) * 160}px`
                    : activeLaw === 'charles'
                    ? `${(Number(charlesVolume) / 5.0) * 160}px`
                    : '100px', // Fixed volume in Gay-Lussac
              }}
            >
              {/* Piston Rod */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-4 h-24 bg-gradient-to-r from-neutral-300 to-neutral-400 border-x border-neutral-400" />
            </div>

            {/* Gas Volume Interior */}
            <div
              className={`w-full transition-all duration-200 relative overflow-hidden ${
                activeLaw === 'charles' || activeLaw === 'gay-lussac'
                  ? (activeLaw === 'charles' ? charlesTempK : gayLussacTempK) > 420
                    ? 'bg-red-100'
                    : 'bg-blue-50'
                  : 'bg-emerald-50'
              }`}
              style={{
                height:
                  activeLaw === 'boyle'
                    ? `${(boyleVolume / 8.0) * 160}px`
                    : activeLaw === 'charles'
                    ? `${(Number(charlesVolume) / 5.0) * 160}px`
                    : '100px',
              }}
            >
              {/* Simulated particle representations */}
              <div className="absolute inset-0 flex flex-wrap gap-2 p-2 items-center justify-around opacity-80">
                {Array.from({ length: 18 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full animate-ping ${
                      (activeLaw === 'charles' ? charlesTempK : gayLussacTempK) > 400
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ animationDuration: `${Math.random() * 0.8 + 0.4}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bunsen Burner underneath if thermal law */}
          {(activeLaw === 'charles' || activeLaw === 'gay-lussac') && (
            <div className="mt-1 flex flex-col items-center">
              <Flame
                className={`w-6 h-6 ${
                  (activeLaw === 'charles' ? charlesTempK : gayLussacTempK) > 400
                    ? 'text-red-600 animate-bounce'
                    : 'text-blue-500'
                }`}
              />
              <span className="text-[9px] text-neutral-500 font-semibold uppercase">Mechero Bunsen</span>
            </div>
          )}
        </div>

        {/* Dynamic Controls and Explanation */}
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between h-full">
          <div>
            {/* Header formula banner */}
            <div className="p-2.5 rounded-lg bg-white border border-neutral-200 mb-3 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wide block">Fórmula Maestra</span>
                <span className="font-mono text-base font-extrabold text-red-600">
                  {activeLaw === 'boyle' && 'P₁ · V₁ = P₂ · V₂'}
                  {activeLaw === 'charles' && 'V₁ / T₁ = V₂ / T₂'}
                  {activeLaw === 'gay-lussac' && 'P₁ / T₁ = P₂ / T₂'}
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-red-50 text-red-700 font-bold border border-red-200">
                {activeLaw === 'boyle' && 'Temperatura Constante (T = Cte)'}
                {activeLaw === 'charles' && 'Presión Constante (P = Cte)'}
                {activeLaw === 'gay-lussac' && 'Volumen Constante (V = Cte)'}
              </span>
            </div>

            {/* Slider Control per Law */}
            {activeLaw === 'boyle' && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-neutral-700 mb-1">
                  <span className="font-medium">Desplazar Émbolo / Volumen (V):</span>
                  <span className="font-mono font-bold text-emerald-600">{boyleVolume} L</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={8.0}
                  step={0.2}
                  value={boyleVolume}
                  onChange={(e) => setBoyleVolume(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>Comprimido (1.0 L)</span>
                  <span>Neutro (4.0 L)</span>
                  <span>Expandido (8.0 L)</span>
                </div>
              </div>
            )}

            {activeLaw === 'charles' && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-neutral-700 mb-1">
                  <span className="font-medium">Ajustar Calor Térmico (T):</span>
                  <span className="font-mono font-bold text-amber-600">{charlesTempK} K ({(charlesTempK - 273.15).toFixed(0)} °C)</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={600}
                  step={10}
                  value={charlesTempK}
                  onChange={(e) => setCharlesTempK(Number(e.target.value))}
                  className="w-full accent-red-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>150 K (Frío)</span>
                  <span>300 K (27 °C)</span>
                  <span>600 K (Calor intenso)</span>
                </div>
              </div>
            )}

            {activeLaw === 'gay-lussac' && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-neutral-700 mb-1">
                  <span className="font-medium">Calentar Recipiente Rígido (T):</span>
                  <span className="font-mono font-bold text-blue-600">{gayLussacTempK} K ({(gayLussacTempK - 273.15).toFixed(0)} °C)</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={600}
                  step={10}
                  value={gayLussacTempK}
                  onChange={(e) => setGayLussacTempK(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Real-time State Outputs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-neutral-500 text-[10px] block font-medium">Presión Resultante:</span>
                <span className="text-sm font-mono font-bold text-red-600">
                  {activeLaw === 'boyle' ? `${boylePressure} atm` : activeLaw === 'charles' ? '1.00 atm' : `${gayLussacPressure} atm`}
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-neutral-500 text-[10px] block font-medium">Volumen Resultante:</span>
                <span className="text-sm font-mono font-bold text-emerald-600">
                  {activeLaw === 'boyle' ? `${boyleVolume} L` : activeLaw === 'charles' ? `${charlesVolume} L` : '2.00 L (Fijo)'}
                </span>
              </div>
            </div>
          </div>

          {/* Academic Lesson Note */}
          <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-[11px] text-neutral-800">
            {activeLaw === 'boyle' && (
              <p>
                💡 <strong className="text-red-700">Aquila explica:</strong> Al reducir el volumen a la mitad, la densidad de partículas se duplica. Las colisiones por unidad de área se duplican y la presión se duplica inmediatamente.
              </p>
            )}
            {activeLaw === 'charles' && (
              <p>
                💡 <strong className="text-red-700">Aquila explica:</strong> Al calentar el gas, las partículas aumentan su energía cinética media. Para que la presión permanezca constante a 1 atm, el pistón debe expandir su volumen tridimensional.
              </p>
            )}
            {activeLaw === 'gay-lussac' && (
              <p>
                💡 <strong className="text-red-700">Aquila explica:</strong> En un tanque rígido sellado (como una botella de gas médico), elevar la temperatura hace que las partículas golpeen la pared con más fuerza e ímpetu, elevando la presión del manómetro.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
