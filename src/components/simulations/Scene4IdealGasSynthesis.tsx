import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, Box } from 'lucide-react';

export const Scene4IdealGasSynthesis: React.FC = () => {
  // Gas ideal equation calculator: P * V = n * R * T
  const R = 0.08206; // L * atm / (mol * K)

  const [calcTarget, setCalcTarget] = useState<'P' | 'V' | 'n' | 'T'>('P');
  const [inputP, setInputP] = useState<number>(1.0);
  const [inputV, setInputV] = useState<number>(22.4);
  const [inputN, setInputN] = useState<number>(1.0);
  const [inputT, setInputT] = useState<number>(273.15);

  // Compute calculated target
  let computedResult = 0;
  if (calcTarget === 'P') {
    computedResult = (inputN * R * inputT) / (inputV || 1);
  } else if (calcTarget === 'V') {
    computedResult = (inputN * R * inputT) / (inputP || 1);
  } else if (calcTarget === 'n') {
    computedResult = (inputP * inputV) / (R * (inputT || 1));
  } else if (calcTarget === 'T') {
    computedResult = (inputP * inputV) / (inputN * R || 1);
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Formula Banner */}
      <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
            Síntesis Matemática Universal
          </span>
          <h3 className="text-xl font-mono font-extrabold text-neutral-900 tracking-wide">
            P · V = n · R · T
          </h3>
          <p className="text-xs text-neutral-600">
            Fusión de Boyle, Charles, Gay-Lussac y el principio molar de Avogadro.
          </p>
        </div>

        {/* Deduction of R */}
        <div className="bg-white px-3.5 py-2 rounded-lg border border-neutral-200 text-xs font-mono shadow-xs">
          <div className="text-neutral-500 text-[10px] uppercase font-bold">Cálculo de R en CNPT:</div>
          <div className="text-amber-600 font-bold">
            R = (1 atm × 22.4 L) / (1 mol × 273.15 K)
          </div>
          <div className="text-red-600 font-bold text-sm mt-0.5">
            = 0.082 L·atm / (mol·K)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        {/* CNPT & Molar Volume Visual Card */}
        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Box className="w-4 h-4 text-red-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Condiciones Normales de Presión y Temperatura (CNPT)
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-neutral-600">Temperatura Estándar:</span>
                <span className="font-mono font-bold text-neutral-900">0 °C = 273.15 K</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-neutral-600">Presión Estándar:</span>
                <span className="font-mono font-bold text-red-600">1.0 atm = 760 mmHg</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-red-200 shadow-xs">
                <span className="text-red-700 font-semibold">Volumen Molar Estándar:</span>
                <span className="font-mono font-extrabold text-blue-600 text-sm">22.4 Litros / mol</span>
              </div>
            </div>

            {/* 3D Visual Representation of the 22.4 L Cube */}
            <div className="mt-3 p-3 bg-white rounded-lg border border-neutral-200 flex items-center justify-center gap-4 shadow-xs">
              <div className="w-16 h-16 border-2 border-dashed border-red-600 rounded-lg bg-red-50 flex flex-col items-center justify-center text-center p-1">
                <span className="text-[10px] text-red-600 font-bold">1 MOL</span>
                <span className="text-[9px] text-neutral-500 font-mono">22.4 L</span>
              </div>
              <p className="text-[11px] text-neutral-700 flex-1">
                En CNPT, <strong>1 mol</strong> de CUALQUIER gas ideal (sea He, O₂, N₂ o CO₂) ocupa exactamente <strong className="text-red-600">22.4 L</strong> y contiene <strong className="text-blue-600">6.022 × 10²³</strong> moléculas.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Equation Solver */}
        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                Calculadora Dinámica de Gas Ideal
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">Despeje automático</span>
            </div>

            {/* Variable to solve for */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[11px] text-neutral-600 mr-1 font-medium">Despejar:</span>
              {(['P', 'V', 'n', 'T'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setCalcTarget(v)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                    calcTarget === v
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              {calcTarget !== 'P' && (
                <div>
                  <label className="text-[10px] text-neutral-600 font-medium block">P (atm):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputP}
                    onChange={(e) => setInputP(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-300 rounded px-2 py-1 text-neutral-900 font-mono"
                  />
                </div>
              )}
              {calcTarget !== 'V' && (
                <div>
                  <label className="text-[10px] text-neutral-600 font-medium block">V (Litros):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={inputV}
                    onChange={(e) => setInputV(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-300 rounded px-2 py-1 text-neutral-900 font-mono"
                  />
                </div>
              )}
              {calcTarget !== 'n' && (
                <div>
                  <label className="text-[10px] text-neutral-600 font-medium block">n (moles):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputN}
                    onChange={(e) => setInputN(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-300 rounded px-2 py-1 text-neutral-900 font-mono"
                  />
                </div>
              )}
              {calcTarget !== 'T' && (
                <div>
                  <label className="text-[10px] text-neutral-600 font-medium block">T (Kelvin):</label>
                  <input
                    type="number"
                    step="5"
                    value={inputT}
                    onChange={(e) => setInputT(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-300 rounded px-2 py-1 text-neutral-900 font-mono"
                  />
                </div>
              )}
            </div>

            {/* Result Display */}
            <div className="p-3 bg-white rounded-xl border border-red-200 text-center shadow-xs">
              <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider block">
                Valor Calculado de {calcTarget}:
              </span>
              <span className="text-xl font-mono font-extrabold text-neutral-900">
                {computedResult.toFixed(3)}{' '}
                <span className="text-red-600 font-bold">
                  {calcTarget === 'P' ? 'atm' : calcTarget === 'V' ? 'Litros' : calcTarget === 'n' ? 'moles' : 'K'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
