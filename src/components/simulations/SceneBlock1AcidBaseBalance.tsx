import React, { useState } from 'react';
import { Activity, Stethoscope, AlertOctagon, RotateCcw, HeartPulse, Wind } from 'lucide-react';

export const SceneBlock1AcidBaseBalance: React.FC = () => {
  // Clinical Case initial state (Diabetic Ketoacidosis from markdown)
  const [hco3, setHco3] = useState<number>(10); // mEq/L (Normal: 24)
  const [pco2, setPco2] = useState<number>(28); // mmHg (Normal: 40)

  // Henderson-Hasselbalch calculation: pH = 6.1 + log10([HCO3-] / (0.03 * pCO2))
  const denominator = 0.03 * pco2;
  const ratio = denominator > 0 ? hco3 / denominator : 1;
  const calculatedPh = 6.1 + Math.log10(ratio);

  // Interpretation
  let acidBaseStatus = 'Normal';
  let statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-300';

  if (calculatedPh < 7.35) {
    acidBaseStatus = 'Acidemia (Acidosis)';
    statusColor = 'text-red-700 bg-red-50 border-red-300';
  } else if (calculatedPh > 7.45) {
    acidBaseStatus = 'Alcalemia (Alcalosis)';
    statusColor = 'text-blue-700 bg-blue-50 border-blue-300';
  }

  const handleSetClinicalCase = () => {
    setHco3(10);
    setPco2(28);
  };

  const handleSetNormal = () => {
    setHco3(24);
    setPco2(40);
  };

  const handleSetRespiratoryAcidosis = () => {
    setHco3(24);
    setPco2(60);
  };

  const handleSetRespiratoryAlkalosis = () => {
    setHco3(24);
    setPco2(25);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-3 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono tracking-tight text-neutral-100">
              CÁTEDRA 1.6: HENDERSON-HASSELBALCH & EQUILIBRIO ÁCIDO-BASE
            </h3>
            <p className="text-[11px] text-neutral-400">
              Monitor Gasométrico en Tiempo Real y Caso Clínico de Cetoacidosis
            </p>
          </div>
        </div>

        {/* Preset buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleSetClinicalCase}
            className="text-[11px] bg-[#E51B23] hover:bg-red-700 text-white px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer font-bold"
          >
            <span>Caso UCI (Cetoacidosis)</span>
          </button>
          <button
            onClick={handleSetNormal}
            className="text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2 py-1 rounded transition-colors cursor-pointer"
          >
            Normal (7,40)
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4">
        {/* Top: ICU Monitor Card */}
        <div className="p-4 bg-neutral-950 text-white rounded-2xl border border-neutral-800 shadow-md">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Monitor de Gasometría Arterial UCI
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              Ecuación: pH = 6,1 + log₁₀([HCO₃⁻] / [0,03 × pCO₂])
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {/* pH */}
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">pH Arterial</span>
              <div
                className={`text-3xl sm:text-4xl font-black font-mono my-1 ${
                  calculatedPh < 7.35
                    ? 'text-red-500'
                    : calculatedPh > 7.45
                    ? 'text-blue-400'
                    : 'text-emerald-400'
                }`}
              >
                {calculatedPh.toFixed(2)}
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Ref: 7,35 - 7,45</span>
            </div>

            {/* Bicarbonate */}
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                [HCO₃⁻] Renal
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 my-1">
                {hco3}{' '}
                <span className="text-xs font-normal text-neutral-400">mEq/L</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Ref: 22 - 26 mEq/L</span>
            </div>

            {/* pCO2 */}
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                pCO₂ Pulmonar
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 my-1">
                {pco2}{' '}
                <span className="text-xs font-normal text-neutral-400">mmHg</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Ref: 35 - 45 mmHg</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Diagnóstico Electroquímico Integrado:</span>
            <span
              className={`font-mono font-bold px-2.5 py-0.5 rounded border text-xs ${statusColor}`}
            >
              {acidBaseStatus}
            </span>
          </div>
        </div>

        {/* Sliders and Mathematical Proof */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Left: Sliders */}
          <div className="lg:col-span-6 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
              Controles Fisiológicos de Amortiguación
            </h4>

            {/* HCO3 Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-amber-900">
                  Bicarbonato [HCO₃⁻] (Regulación Renal):
                </span>
                <span className="font-mono font-bold text-amber-700">{hco3} mEq/L</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                value={hco3}
                onChange={(e) => setHco3(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-neutral-500 font-mono">
                Bajo (&lt;22) = Acidosis Metabólica • Alto (&gt;26) = Alcalosis Metabólica
              </span>
            </div>

            {/* pCO2 Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-cyan-900">
                  Presión de CO₂ (pCO₂) (Ventilación Pulmonar):
                </span>
                <span className="font-mono font-bold text-cyan-700">{pco2} mmHg</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                value={pco2}
                onChange={(e) => setPco2(Number(e.target.value))}
                className="w-full accent-cyan-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-neutral-500 font-mono">
                Bajo (&lt;35) = Hiperventilación • Alto (&gt;45) = Hipoventilación
              </span>
            </div>

            {/* Clinical Preset Quick Chips */}
            <div className="pt-2 border-t border-neutral-200">
              <span className="text-[10px] text-neutral-500 font-mono uppercase font-bold block mb-1.5">
                Simular Otros Cuadros Clínicos:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={handleSetRespiratoryAcidosis}
                  className="text-[11px] bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 px-2 py-1 rounded cursor-pointer"
                >
                  Acidosis Resp. (EPOC)
                </button>
                <button
                  onClick={handleSetRespiratoryAlkalosis}
                  className="text-[11px] bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 px-2 py-1 rounded cursor-pointer"
                >
                  Alcalosis Resp. (Ansiedad/Altitud)
                </button>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Clinical Case Verification */}
          <div className="lg:col-span-6 p-3.5 bg-white rounded-xl border border-neutral-200 space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-[#E51B23]" />
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                Caso Clínico Resuelto del Sílabo
              </h4>
            </div>

            <p className="text-xs text-neutral-600 leading-tight">
              <strong>Paciente:</strong> Varón de 45 años, DM1, taquipnea profunda de Kussmaul.
              Resultados: pH = 7,18, pCO₂ = 28 mmHg, [HCO₃⁻] = 10 mEq/L.
            </p>

            {/* Step-by-step Math calculation box */}
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 font-mono text-xs space-y-1">
              <div className="text-neutral-500 text-[10px]">Cálculo por Henderson-Hasselbalch:</div>
              <div className="text-neutral-800">
                1. Denominador: 0,03 × {pco2} = <strong>{denominator.toFixed(2)}</strong>
              </div>
              <div className="text-neutral-800">
                2. Cociente: {hco3} / {denominator.toFixed(2)} = <strong>{ratio.toFixed(2)}</strong>
              </div>
              <div className="text-neutral-800">
                3. Logaritmo: log₁₀({ratio.toFixed(2)}) = <strong>{Math.log10(ratio).toFixed(3)}</strong>
              </div>
              <div className="text-[#E51B23] font-bold text-sm pt-1 border-t border-neutral-200">
                4. pH = 6,1 + {Math.log10(ratio).toFixed(3)} = {calculatedPh.toFixed(2)}
              </div>
            </div>

            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200 text-[11px] text-blue-900 flex items-start gap-1.5">
              <Wind className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Compensación de Kussmaul:</strong> Los pulmones hiperventilan de urgencia para expulsar CO₂ ácido, atenuando la caída catastrófica del pH celular.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
