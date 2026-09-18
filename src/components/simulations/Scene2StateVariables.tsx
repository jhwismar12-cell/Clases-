import React, { useState } from 'react';
import { ArrowRightLeft, Thermometer, Gauge, Box, HelpCircle } from 'lucide-react';

export const Scene2StateVariables: React.FC = () => {
  // Pressure conversion state
  const [atmValue, setAtmValue] = useState<number>(1.0);
  // Temperature state
  const [celsiusValue, setCelsiusValue] = useState<number>(20);
  // Moles state
  const [grams, setGrams] = useState<number>(32); // e.g. 32g O2
  const [molarMass, setMolarMass] = useState<number>(32); // O2 = 32 g/mol

  const mmHg = (atmValue * 760).toFixed(1);
  const torr = (atmValue * 760).toFixed(1);
  const kPa = (atmValue * 101.325).toFixed(2);
  const psi = (atmValue * 14.696).toFixed(2);

  const kelvinValue = (celsiusValue + 273.15).toFixed(2);
  const moles = (grams / (molarMass || 1)).toFixed(3);
  const moleculesCount = (Number(moles) * 6.022).toFixed(2);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-red-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
            Pizarra Analítica de Variables de Estado Termodinámico
          </h4>
        </div>
        <span className="text-[11px] text-red-600 font-mono bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 font-semibold">
          Torricelli 1 atm = 760 mmHg
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
        {/* Presión (P) Converter */}
        <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                1. Presión (P = F / A)
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">Torricelli</span>
            </div>

            <label className="text-[11px] text-neutral-700 font-medium block mb-1">
              Atmósferas (atm):
            </label>
            <input
              type="range"
              min={0.2}
              max={3.0}
              step={0.05}
              value={atmValue}
              onChange={(e) => setAtmValue(Number(e.target.value))}
              className="w-full accent-red-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer mb-2"
            />
            <div className="text-center py-1 bg-white rounded-lg font-mono font-bold text-red-600 text-sm mb-3 border border-neutral-200 shadow-xs">
              {atmValue} atm
            </div>

            {/* Equivalences Grid */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between p-1.5 bg-white rounded border border-neutral-200">
                <span className="text-neutral-600">Milímetros de Hg:</span>
                <span className="font-mono font-bold text-red-600">{mmHg} mmHg</span>
              </div>
              <div className="flex justify-between p-1.5 bg-white rounded border border-neutral-200">
                <span className="text-neutral-600">Torr:</span>
                <span className="font-mono font-bold text-neutral-800">{torr} torr</span>
              </div>
              <div className="flex justify-between p-1.5 bg-white rounded border border-neutral-200">
                <span className="text-neutral-600">Kilopascales (SI):</span>
                <span className="font-mono font-bold text-blue-600">{kPa} kPa</span>
              </div>
              <div className="flex justify-between p-1.5 bg-white rounded border border-neutral-200">
                <span className="text-neutral-600">Libras/pulgada²:</span>
                <span className="font-mono font-bold text-amber-600">{psi} psi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Temperatura (T) Absolute Kelvin */}
        <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" />
                2. Temperatura Absoluta (T)
              </span>
              <span className="text-[10px] text-red-700 bg-red-100 font-bold px-1.5 rounded">¡K Obligatorio!</span>
            </div>

            <label className="text-[11px] text-neutral-700 font-medium block mb-1">
              Grados Celsius (°C):
            </label>
            <input
              type="range"
              min={-273}
              max={150}
              step={1}
              value={celsiusValue}
              onChange={(e) => setCelsiusValue(Number(e.target.value))}
              className="w-full accent-red-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer mb-2"
            />
            <div className="text-center py-1 bg-white rounded-lg font-mono font-bold text-amber-600 text-sm mb-3 border border-neutral-200 shadow-xs">
              {celsiusValue} °C
            </div>

            {/* Kelvin Conversion Result */}
            <div className="p-2.5 bg-white rounded-lg border border-red-200 text-center mb-2 shadow-xs">
              <span className="text-[10px] text-red-700 uppercase tracking-wider font-bold block">
                Temperatura Termodinámica
              </span>
              <span className="text-lg font-mono font-extrabold text-neutral-900">
                {kelvinValue} K
              </span>
            </div>

            <div className="text-[10px] text-neutral-600 space-y-1 bg-white p-2 rounded border border-neutral-200">
              <p>• Cero Absoluto: <strong className="text-red-600 font-mono">0 K = -273.15 °C</strong></p>
              <p>• Punto de Congelación: <strong className="text-blue-600 font-mono">273.15 K = 0 °C</strong></p>
              <p>• Temperatura Corporal Humana: <strong className="text-emerald-600 font-mono">310.15 K = 37 °C</strong></p>
            </div>
          </div>
        </div>

        {/* Cantidad (n) y Volumen (V) */}
        <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                <Box className="w-3.5 h-3.5" />
                3. Cantidad (n) y Moles
              </span>
              <span className="text-[10px] text-neutral-500 font-mono font-semibold">n = g / MM</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-[10px] text-neutral-600 font-medium block">Masa (g):</label>
                <input
                  type="number"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white border border-neutral-300 rounded px-2 py-1 text-xs text-neutral-900 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-600 font-medium block">Masa Molar (g/mol):</label>
                <select
                  value={molarMass}
                  onChange={(e) => setMolarMass(Number(e.target.value))}
                  className="w-full bg-white border border-neutral-300 rounded px-1.5 py-1 text-xs text-neutral-900"
                >
                  <option value={32}>O₂ (32 g/mol)</option>
                  <option value={44}>CO₂ (44 g/mol)</option>
                  <option value={28}>N₂ (28 g/mol)</option>
                  <option value={4}>He (4 g/mol)</option>
                </select>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-red-200 text-center mb-2 shadow-xs">
              <span className="text-[10px] text-red-700 uppercase tracking-wider font-bold block">
                Moles de Gas (n)
              </span>
              <span className="text-lg font-mono font-extrabold text-blue-600">
                {moles} mol
              </span>
            </div>

            <div className="text-[10px] text-neutral-600 space-y-1 bg-white p-2 rounded border border-neutral-200">
              <p>• Moléculas totales:</p>
              <p className="font-mono text-purple-600 text-[11px] font-bold">
                ≈ {moleculesCount} × 10²³ moléculas
              </p>
              <p className="text-neutral-400 text-[9px]">Constante de Avogadro: 6.022 × 10²³</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
