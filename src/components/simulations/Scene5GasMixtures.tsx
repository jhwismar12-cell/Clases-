import React, { useState } from 'react';
import { Layers, Play, RotateCcw, Zap } from 'lucide-react';

export const Scene5GasMixtures: React.FC = () => {
  const [isValveOpen, setIsValveOpen] = useState<boolean>(false);
  const [pHe, setPHe] = useState<number>(1.2); // atm of Helium (M=4)
  const [pAr, setPAr] = useState<number>(0.8); // atm of Argon (M=40)
  const [isRacing, setIsRacing] = useState<boolean>(false);
  const [raceProgress, setRaceProgress] = useState<{ he: number; ar: number }>({ he: 0, ar: 0 });

  const pTotal = (pHe + pAr).toFixed(2);
  const xHe = (pHe / (pHe + pAr)).toFixed(3);
  const xAr = (pAr / (pHe + pAr)).toFixed(3);

  // Graham speed ratio: sqrt(M_Ar / M_He) = sqrt(40 / 4) = sqrt(10) ≈ 3.16
  const speedRatio = Math.sqrt(40 / 4).toFixed(2);

  const startDiffusionRace = () => {
    setIsRacing(true);
    setRaceProgress({ he: 0, ar: 0 });

    const startTime = Date.now();
    const duration = 2500; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Helium moves ~3.16x faster
      const heProg = Math.min(100, progress * 100 * 1.5);
      const arProg = Math.min(100, (progress * 100 * 1.5) / 3.16);

      setRaceProgress({ he: heProg, ar: arProg });

      if (progress >= 1) {
        clearInterval(interval);
        setIsRacing(false);
      }
    }, 40);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Title & Dalton Equation Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Mezclas Gaseosas: Ley de Dalton y Ley de Graham
            </h4>
          </div>
          <p className="text-[11px] text-neutral-600 font-mono font-medium">
            P_total = P_He + P_Ar &nbsp;|&nbsp; v₁ / v₂ = √(M₂ / M₁)
          </p>
        </div>

        <button
          onClick={() => setIsValveOpen(!isValveOpen)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
            isValveOpen
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-red-600 text-white shadow-xs animate-pulse'
          }`}
        >
          {isValveOpen ? 'Válvula de Mezcla: ABIERTA' : 'Abrir Válvula de Mezcla'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        {/* Dalton Tank Simulation */}
        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-600">
                1. Ley de Dalton (Presiones Parciales)
              </span>
              <span className="text-[10px] text-neutral-500 font-mono font-semibold">P_total = ∑ Pᵢ</span>
            </div>

            {/* Split Cylinder Tank */}
            <div className="relative h-40 bg-white rounded-xl border-2 border-neutral-300 overflow-hidden flex mb-3 shadow-inner">
              {/* Left side: Helium */}
              <div
                className={`flex-1 transition-all duration-500 relative flex flex-col items-center justify-center ${
                  isValveOpen ? 'bg-amber-50/50' : 'bg-amber-50'
                }`}
              >
                <span className="text-xs font-mono font-bold text-amber-700">Helio (He)</span>
                <span className="text-[10px] text-neutral-500">M = 4 g/mol</span>
                <span className="text-xs font-mono font-bold text-amber-600 mt-1">P_He = {pHe} atm</span>

                {/* Light particles */}
                <div className="absolute inset-0 flex flex-wrap p-2 gap-2 items-center justify-center opacity-70">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDuration: `${0.3 + (idx % 4) * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Divider / Valve */}
              <div
                className={`w-3 border-x border-neutral-300 transition-colors flex items-center justify-center z-10 ${
                  isValveOpen ? 'bg-emerald-500' : 'bg-red-600'
                }`}
              >
                <div className="w-1 h-8 bg-white rounded-full opacity-90" />
              </div>

              {/* Right side: Argon */}
              <div
                className={`flex-1 transition-all duration-500 relative flex flex-col items-center justify-center ${
                  isValveOpen ? 'bg-blue-50/50' : 'bg-blue-50'
                }`}
              >
                <span className="text-xs font-mono font-bold text-blue-700">Argón (Ar)</span>
                <span className="text-[10px] text-neutral-500">M = 40 g/mol</span>
                <span className="text-xs font-mono font-bold text-blue-600 mt-1">P_Ar = {pAr} atm</span>

                {/* Heavy particles */}
                <div className="absolute inset-0 flex flex-wrap p-2 gap-2 items-center justify-center opacity-70">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-pulse"
                      style={{ animationDuration: `${0.9 + (idx % 3) * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Total Pressure Readout */}
            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 flex items-center justify-between text-xs shadow-xs">
              <span className="text-neutral-600 font-medium">Presión Total en el Sistema:</span>
              <span className="font-mono font-extrabold text-red-600 text-sm">
                P_total = {pTotal} atm ({Number(pTotal) * 760} mmHg)
              </span>
            </div>
            <div className="flex justify-between text-[10px] text-neutral-600 mt-1.5 px-1">
              <span>Fracción Molar He (X_He): <strong className="text-amber-600 font-mono">{xHe}</strong></span>
              <span>Fracción Molar Ar (X_Ar): <strong className="text-blue-600 font-mono">{xAr}</strong></span>
            </div>
          </div>
        </div>

        {/* Graham Diffusion Law Simulation */}
        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                2. Ley de Graham (Velocidad de Difusión)
              </span>
              <span className="text-[10px] font-mono font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">v_He ≈ 3.16 × v_Ar</span>
            </div>

            <p className="text-[11px] text-neutral-600 mb-3">
              Las moléculas más ligeras viajan a mayor velocidad promedio que las moléculas pesadas a la misma temperatura.
            </p>

            {/* Diffusion Race Track */}
            <div className="space-y-3 bg-white p-3 rounded-lg border border-neutral-200 mb-3 shadow-xs">
              {/* Helium Track */}
              <div>
                <div className="flex justify-between text-[11px] text-neutral-700 mb-1">
                  <span className="text-amber-600 font-bold">Helio (He, 4 g/mol) — Ligero</span>
                  <span className="font-mono font-bold text-amber-600">{Math.round(raceProgress.he)}%</span>
                </div>
                <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-75"
                    style={{ width: `${raceProgress.he}%` }}
                  />
                </div>
              </div>

              {/* Argon Track */}
              <div>
                <div className="flex justify-between text-[11px] text-neutral-700 mb-1">
                  <span className="text-blue-600 font-bold">Argón (Ar, 40 g/mol) — Pesado</span>
                  <span className="font-mono font-bold text-blue-600">{Math.round(raceProgress.ar)}%</span>
                </div>
                <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-75"
                    style={{ width: `${raceProgress.ar}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={startDiffusionRace}
              disabled={isRacing}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              {isRacing ? 'Difundiendo moléculas...' : 'Iniciar Carrera de Difusión a través de Membrana'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
