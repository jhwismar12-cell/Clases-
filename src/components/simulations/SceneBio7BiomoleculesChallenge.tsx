import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, Stethoscope, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

export const SceneBio7BiomoleculesChallenge: React.FC = () => {
  const [selectedEnzyme, setSelectedEnzyme] = useState<string | null>(null);
  const [selectedSugar, setSelectedSugar] = useState<string | null>(null);
  const [selectedCataractMech, setSelectedCataractMech] = useState<string | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);

  const isAllCorrect =
    selectedEnzyme === 'galt' &&
    selectedSugar === 'lactosa' &&
    selectedCataractMech === 'galactitol' &&
    selectedDiet === 'soya';

  const handleReset = () => {
    setSelectedEnzyme(null);
    setSelectedSugar(null);
    setSelectedCataractMech(null);
    setSelectedDiet(null);
    setIsEvaluated(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Desafío Clínico Interactivo: Caso Neonatal de Galactosemia Clásica
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Resumen Calórico (4 - 4 - 9 kcal/g) • Diagnóstico Enzimático y Resolución Dietética
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold font-mono">
            Evaluación Formativa UCACUE
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[520px]">
        {/* Metabolic Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-2.5 bg-red-50/60 rounded-xl border border-red-200 text-center">
            <span className="text-[10px] uppercase font-bold text-[#E51B23]">Carbohidratos</span>
            <div className="text-sm font-extrabold text-neutral-900 mt-0.5">4 kcal/g (17 kJ/g)</div>
            <p className="text-[10px] text-neutral-600 mt-0.5">Energía celular inmediata & Glucógeno</p>
          </div>

          <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-200 text-center">
            <span className="text-[10px] uppercase font-bold text-blue-700">Proteínas</span>
            <div className="text-sm font-extrabold text-neutral-900 mt-0.5">4 kcal/g (17 kJ/g)</div>
            <p className="text-[10px] text-neutral-600 mt-0.5">Catálisis enzimática & Arquitectura</p>
          </div>

          <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-700">Lípidos (Grasas)</span>
            <div className="text-sm font-extrabold text-neutral-900 mt-0.5">9 kcal/g (38 kJ/g)</div>
            <p className="text-[10px] text-neutral-600 mt-0.5">Almacén anhidro concentrado & Membranas</p>
          </div>
        </div>

        {/* Clinical Vignette Box */}
        <div className="bg-slate-50 border-l-4 border-[#E51B23] p-3.5 rounded-r-xl space-y-1 text-xs text-neutral-800 shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
            <AlertTriangle className="w-4 h-4 text-[#E51B23]" />
            Caso Clínico Propuesto por Aquila:
          </div>
          <p className="leading-relaxed text-[11px] text-neutral-700">
            «Neonato de 5 días de vida presenta rechazo a las tomas de leche materna, letargia, ictericia rápidamente progresiva y hepatomegalia. En la exploración oftalmológica se detecta opacidad temprana bilateral del cristalino (cataratas nucleares). Los exámenes de laboratorio revelan sustancias reductoras y galactosa en orina.»
          </p>
        </div>

        {/* Interactive Diagnosis Form */}
        <div className="space-y-3">
          {/* Question 1 */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2">
            <span className="text-xs font-bold text-neutral-900 block">
              1. ¿Cuál es el defecto enzimático congénito responsable del cuadro clásico?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'lactasa', label: 'Déficit de Lactasa intestinal' },
                { id: 'galt', label: 'Galactosa-1-fosfato uridiltransferasa (GALT)' },
                { id: 'hexoquinasa', label: 'Hexoquinasa eritrocitaria' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedEnzyme(opt.id)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedEnzyme === opt.id
                      ? 'bg-red-50 border-red-400 text-red-950 font-bold shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2">
            <span className="text-xs font-bold text-neutral-900 block">
              2. ¿Qué disacárido de la dieta del lactante es la fuente de este metabolito tóxico?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'sacarosa', label: 'Sacarosa (Glucosa + Fructosa)' },
                { id: 'lactosa', label: 'Lactosa (Galactosa β-1,4 Glucosa)' },
                { id: 'maltosa', label: 'Maltosa (Glucosa α-1,4 Glucosa)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedSugar(opt.id)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedSugar === opt.id
                      ? 'bg-red-50 border-red-400 text-red-950 font-bold shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2">
            <span className="text-xs font-bold text-neutral-900 block">
              3. ¿Por qué mecanismo bioquímico se originan las cataratas precoces?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                {
                  id: 'galactitol',
                  label: 'Reducción de galactosa a galactitol por la Aldosa Reductasa con edema osmótico en cristalino',
                },
                {
                  id: 'colesterol',
                  label: 'Precipitación de cristales de colesterol en la cápsula anterior',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCataractMech(opt.id)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedCataractMech === opt.id
                      ? 'bg-red-50 border-red-400 text-red-950 font-bold shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4 */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2">
            <span className="text-xs font-bold text-neutral-900 block">
              4. ¿Cuál es la intervención terapéutica salvadora obligatoria e inmediata?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                {
                  id: 'soya',
                  label: 'Suspensión total de leche materna y fórmulas con lactosa; iniciar fórmula basada en soya libre de galactosa',
                },
                {
                  id: 'insulina',
                  label: 'Administración continua de insulina intravenosa y glucagón',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDiet(opt.id)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedDiet === opt.id
                      ? 'bg-red-50 border-red-400 text-red-950 font-bold shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setIsEvaluated(true)}
              disabled={!selectedEnzyme || !selectedSugar || !selectedCataractMech || !selectedDiet}
              className="px-5 py-2 bg-[#E51B23] hover:bg-[#c4141b] disabled:bg-neutral-300 text-white font-bold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Evaluar Resolución Diagnóstica</span>
            </button>

            {isEvaluated && (
              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Caso</span>
              </button>
            )}
          </div>

          {/* Evaluation Result Feedback */}
          {isEvaluated && (
            <div
              className={`p-4 rounded-xl border-2 text-xs space-y-2 transition-all shadow-xs ${
                isAllCorrect
                  ? 'bg-green-50 border-green-300 text-green-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isAllCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>¡Diagnóstico y Manejo Clínico Correctos! (100%)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Revisión de respuestas requerida por el Catedrático Aquila:</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed">
                {isAllCorrect ? (
                  <>
                    Excelente razonamiento bioquímico. El déficit de <strong>GALT</strong> impide convertir galactosa-1-P en glucosa-1-P. La galactosa libre acumulada se deriva a <strong>galactitol</strong> en el cristalino provocando cataratas osmóticas. La suspensión inmediata de la <strong>lactosa materna</strong> salva al paciente de falla hepática y secuelas neurológicas irreversibles.
                  </>
                ) : (
                  <>
                    Verifica tus respuestas: recuerda que la enzima alterada en la galactosemia clásica es <strong>GALT</strong> (no la lactasa), el disacárido causante es la <strong>lactosa</strong>, las cataratas son causadas por el <strong>galactitol</strong> osmótico, y la intervención mandatoria es la fórmula libre de lactosa (p. ej., a base de <strong>soya</strong>).
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
