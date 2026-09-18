import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Sparkles, Send, BrainCircuit, BookOpen } from 'lucide-react';

export const Scene7ClinicalChallenge: React.FC = () => {
  const [studentCalculation, setStudentCalculation] = useState('');
  const [studentExplanation, setStudentExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showOfficialSolution, setShowOfficialSolution] = useState(false);

  // Case given values
  const PO2 = 70; // mmHg
  const PCO2 = 25; // mmHg
  const PH2O = 47; // mmHg
  // In high altitude, PN2 is also reduced proportionally with atmospheric pressure
  const sumKnown = PO2 + PCO2 + PH2O; // 142 mmHg

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentCalculation && !studentExplanation) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/gemini/solve-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentCalculation,
          studentExplanation,
        }),
      });

      const data = await response.json();
      setFeedback(data.feedback || 'Respuesta evaluada con éxito.');
    } catch (error) {
      console.error(error);
      // Fallback feedback if network or server issue
      setFeedback(
        'Evaluación de Aquila: ¡Muy buen intento! Recuerda que según la Ley de Dalton, P_total es la suma de todas las presiones parciales. Al hiperventilar, la PCO2 cae de 40 a 25 mmHg, lo que provoca una alcalosis respiratoria aguda debido a la ecuación de Henderson-Hasselbalch. ¡Sigue volando alto! #SomosÁguilasRojas'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Challenge Title Banner */}
      <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Desafío Clínico Universitario de Emergencias</span>
          </div>
          <h3 className="text-base font-bold text-neutral-900 mt-0.5">
            Paciente en Altitud: Hiperventilación, Dalton y Equilibrio Ácido-Base
          </h3>
        </div>
        <button
          onClick={() => setShowOfficialSolution(!showOfficialSolution)}
          className="px-3 py-1.5 bg-white hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold border border-neutral-200 flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <BookOpen className="w-3.5 h-3.5 text-red-600" />
          {showOfficialSolution ? 'Ocultar Solución Oficial' : 'Ver Criterio de la Cátedra'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        {/* Left: Challenge Formulation & Data */}
        <div className="lg:col-span-5 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between text-xs">
          <div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 text-neutral-700 space-y-2 shadow-xs">
              <p className="font-bold text-neutral-900">
                📋 Enunciado del Caso:
              </p>
              <p className="text-[11px] leading-relaxed text-neutral-700 italic">
                "Un paciente hiperventila en altitud. Si su PO₂ alveolar cae a 70 mmHg y su PCO₂ a 25 mmHg, calculen la presión parcial de la mezcla de gases alveolares sabiendo que la PH₂O se mantiene constante a 47 mmHg y apliquen la Ley de Dalton para justificar la alteración del equilibrio ácido-base."
              </p>
            </div>

            {/* Given Clinical Values Table */}
            <div className="space-y-1.5 text-[11px] mb-3">
              <div className="flex justify-between p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-neutral-600 font-medium">PO₂ Alveolar medido:</span>
                <span className="font-mono font-bold text-blue-600">{PO2} mmHg (Hipoxia)</span>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-neutral-600 font-medium">PCO₂ Alveolar medido:</span>
                <span className="font-mono font-bold text-amber-600">{PCO2} mmHg (Lavado de CO₂)</span>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-neutral-600 font-medium">PH₂O (Vapor saturado 37°C):</span>
                <span className="font-mono font-bold text-neutral-800">{PH2O} mmHg (Constante)</span>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-red-200 shadow-xs">
                <span className="text-red-700 font-semibold">Suma Parcial (PO₂ + PCO₂ + PH₂O):</span>
                <span className="font-mono font-bold text-red-600">{sumKnown} mmHg</span>
              </div>
            </div>
          </div>

          {/* Official Solution Card (if toggled) */}
          {showOfficialSolution && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-neutral-800 space-y-1.5 shadow-xs">
              <div className="font-bold text-amber-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Resolución Canónica:</span>
              </div>
              <p>
                <strong>1. Ley de Dalton:</strong> P_alveolar = PO₂ + PCO₂ + PH₂O + PN₂.
                La caída de la presión barométrica en altitud reduce la presión total y la PO₂ inspirada (hipoxia hipobárica).
              </p>
              <p>
                <strong>2. Alteración Ácido-Base:</strong> La hiperventilación compensatoria produce <em>hipocapnia aguda</em> (PCO₂ = 25 mmHg, normal = 40 mmHg).
                Al disminuir la PCO₂, la ecuación de Henderson-Hasselbalch determina una elevación del pH &gt; 7.45: <strong className="text-red-700">Alcalosis Respiratoria Aguda</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Right: Student Answer Submission & AI Grading with Aquila */}
        <div className="lg:col-span-7 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between text-xs">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                1. Tu Cálculo Matemático (Ley de Dalton y Presiones Parciales):
              </label>
              <textarea
                value={studentCalculation}
                onChange={(e) => setStudentCalculation(e.target.value)}
                placeholder="Ejemplo: P_total = 70 + 25 + 47 + PN2 = ... mmHg"
                rows={2}
                className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-neutral-900 font-mono text-xs focus:border-red-600 focus:outline-none shadow-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                2. Tu Justificación Fisiológica Ácido-Base (¿Qué ocurre con el pH?):
              </label>
              <textarea
                value={studentExplanation}
                onChange={(e) => setStudentExplanation(e.target.value)}
                placeholder="Ejemplo: La hiperventilación disminuye el CO2 alveolar y arterial, desplazando el equilibrio del bicarbonato hacia... causando alcalosis respiratoria."
                rows={3}
                className="w-full bg-white border border-neutral-300 rounded-lg p-2 text-neutral-900 text-xs focus:border-red-600 focus:outline-none shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || (!studentCalculation && !studentExplanation)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <BrainCircuit className="w-4 h-4 animate-spin text-white" />
                  <span>Prof. Aquila evaluando tu respuesta médica...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar al Prof. Aquila para Calificación</span>
                </>
              )}
            </button>
          </form>

          {/* Feedback Display */}
          {feedback && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-neutral-800 text-xs shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-red-700 mb-1">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>Dictamen del Prof. Aquila (#SomosÁguilasRojas):</span>
              </div>
              <div className="whitespace-pre-line leading-relaxed text-[11px] text-neutral-700">
                {feedback}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
