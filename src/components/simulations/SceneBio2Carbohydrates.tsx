import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, AlertTriangle, CheckCircle2, Activity, Info } from 'lucide-react';

export const SceneBio2Carbohydrates: React.FC = () => {
  const [selectedSugar, setSelectedSugar] = useState<'glucose' | 'galactose' | 'fructose'>('glucose');
  const [highlightC4, setHighlightC4] = useState<boolean>(true);
  const [isC4Inverted, setIsC4Inverted] = useState<boolean>(false);
  const [showClinicalWarning, setShowClinicalWarning] = useState<boolean>(false);

  // Glucose configuration:
  // C1: CHO
  // C2: H-C-OH (OH right)
  // C3: HO-C-H (OH left)
  // C4: H-C-OH (OH right in D-glucose; OH left in D-galactose)
  // C5: H-C-OH (OH right -> D series)
  // C6: CH2OH

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Estereoquímica y Proyecciones de Fischer de Monosacáridos
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Fórmula General: Cₙ(H₂O)ₙ • Rendimiento: 4 kcal/g (17 kJ/g) • Epímeros en C-4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-mono">
            4 kcal/g (17 kJ/g)
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        {/* Left: Interactive Fischer Projection Diagram */}
        <div className="lg:col-span-6 flex flex-col bg-slate-50/60 rounded-xl border border-neutral-200 p-4 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-800">
              Proyección de Fischer: {selectedSugar === 'glucose' ? 'D-Glucosa' : selectedSugar === 'galactose' ? 'D-Galactosa' : 'D-Fructosa'}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setSelectedSugar('glucose');
                  setIsC4Inverted(false);
                }}
                className={`text-[10px] px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedSugar === 'glucose'
                    ? 'bg-[#E51B23] text-white font-bold'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                D-Glucosa
              </button>
              <button
                onClick={() => {
                  setSelectedSugar('galactose');
                  setIsC4Inverted(true);
                }}
                className={`text-[10px] px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedSugar === 'galactose'
                    ? 'bg-[#E51B23] text-white font-bold'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                D-Galactosa
              </button>
              <button
                onClick={() => {
                  setSelectedSugar('fructose');
                  setIsC4Inverted(false);
                }}
                className={`text-[10px] px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedSugar === 'fructose'
                    ? 'bg-[#E51B23] text-white font-bold'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                D-Fructosa (Cetosa)
              </button>
            </div>
          </div>

          {/* Molecule Vertical Chain in Fischer convention */}
          <div className="flex-1 flex flex-col items-center justify-center py-2">
            <div className="w-56 bg-white border border-neutral-200 rounded-xl p-3 shadow-xs font-mono text-xs space-y-1 relative">
              {/* C1 */}
              <div className="flex items-center justify-center py-1 bg-red-50/60 rounded text-neutral-900 border border-red-100">
                <span className="text-[10px] text-red-500 font-bold mr-2">C1</span>
                {selectedSugar === 'fructose' ? (
                  <span className="font-bold text-neutral-800">CH₂OH</span>
                ) : (
                  <span className="font-bold text-[#E51B23]">CH=O (Aldehído)</span>
                )}
              </div>

              {/* C2 */}
              <div className="flex items-center justify-between px-3 py-1 bg-neutral-50 rounded">
                <span className="text-[10px] text-neutral-400">C2</span>
                {selectedSugar === 'fructose' ? (
                  <span className="font-bold text-amber-600">C = O (Grupo Cetona)</span>
                ) : (
                  <div className="flex items-center gap-4">
                    <span>H —</span>
                    <span className="font-bold text-neutral-800">C</span>
                    <span className="text-blue-600 font-bold">— OH</span>
                  </div>
                )}
              </div>

              {/* C3 */}
              <div className="flex items-center justify-between px-3 py-1 bg-neutral-50 rounded">
                <span className="text-[10px] text-neutral-400">C3</span>
                <div className="flex items-center gap-4">
                  <span className="text-blue-600 font-bold">HO —</span>
                  <span className="font-bold text-neutral-800">C</span>
                  <span>— H</span>
                </div>
              </div>

              {/* C4 (Chiral center - Epimer marker) */}
              <div
                className={`flex items-center justify-between px-3 py-1.5 rounded transition-all border ${
                  highlightC4
                    ? 'bg-amber-100/70 border-amber-300 ring-2 ring-amber-400/40'
                    : 'bg-neutral-50 border-transparent'
                }`}
              >
                <span className="text-[10px] font-bold text-amber-800">C4*</span>
                <div className="flex items-center gap-4">
                  {isC4Inverted || selectedSugar === 'galactose' ? (
                    <>
                      <span className="text-purple-700 font-extrabold bg-purple-100 px-1 rounded">
                        HO —
                      </span>
                      <span className="font-bold text-neutral-900">C</span>
                      <span className="text-neutral-500">— H</span>
                    </>
                  ) : (
                    <>
                      <span className="text-neutral-500">H —</span>
                      <span className="font-bold text-neutral-900">C</span>
                      <span className="text-blue-600 font-extrabold bg-blue-100 px-1 rounded">
                        — OH
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* C5 (Determines D/L series) */}
              <div className="flex items-center justify-between px-3 py-1 bg-neutral-50 rounded border border-blue-100">
                <span className="text-[10px] text-blue-600 font-bold">C5 (D)</span>
                <div className="flex items-center gap-4">
                  <span>H —</span>
                  <span className="font-bold text-neutral-800">C</span>
                  <span className="text-blue-600 font-bold">— OH (Derecha = Serie D)</span>
                </div>
              </div>

              {/* C6 */}
              <div className="flex items-center justify-center py-1 bg-neutral-100 rounded text-neutral-700">
                <span className="text-[10px] text-neutral-400 mr-2">C6</span>
                <span className="font-bold">CH₂OH</span>
              </div>
            </div>

            {/* Invert C4 button */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  setIsC4Inverted(!isC4Inverted);
                  setSelectedSugar(!isC4Inverted ? 'galactose' : 'glucose');
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Invertir Quiralidad en C-4 (Epimería)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Comparative Table & Galactosemia Clinical Correlation */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          {/* Epimerism Definition Card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-3 space-y-2 shadow-xs">
            <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#E51B23]" />
              Concepto Clave: Epímeros en Carbono 4
            </h4>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Dos azúcares que difieren únicamente en la configuración espacial de un solo átomo de carbono quiral se denominan <strong>epímeros</strong>. La <strong>D-glucosa</strong> y la <strong>D-galactosa</strong> son epímeros en el <strong>carbono 4 (C-4)</strong>.
            </p>
          </div>

          {/* Clinical Spotlight: Galactosemia */}
          <div className="bg-red-50/80 rounded-xl border-2 border-red-200 p-3.5 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#E51B23]" />
                Cuadro Clínico: Galactosemia Congénita
              </span>
              <span className="text-[10px] bg-red-200 text-red-900 px-1.5 py-0.5 rounded font-bold font-mono">
                Déficit GALT
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] text-neutral-700">
              <p>
                <strong>Fisiopatología:</strong> Deficiencia de la enzima <em>galactosa-1-fosfato uridiltransferasa (GALT)</em>. El neonato no puede metabolizar la galactosa proveniente de la lactosa materna.
              </p>
              <div className="p-2 bg-white rounded border border-red-200 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-neutral-800">Acumulación de Galactitol:</span>
                  <span className="text-red-600 font-bold">Aldosa Reductasa</span>
                </div>
                <p className="text-[10px] text-neutral-600">
                  El exceso de galactosa en el cristalino se reduce a galactitol, provocando estrés osmótico y <strong>cataratas precoces</strong> en los primeros días de vida.
                </p>
              </div>
              <p className="text-[10px] text-red-900 font-semibold">
                ⚠️ Intervención de Urgencia: Suspensión inmediata y definitiva de toda fuente de lactosa y galactosa en la dieta infantil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
