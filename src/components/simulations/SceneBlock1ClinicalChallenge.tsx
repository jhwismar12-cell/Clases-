import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, HelpCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
  }[];
  rationale: string;
}

const BLOCK1_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Un paciente ingresa a urgencias con cetoacidosis diabética y pH de 7,18. ¿Cuál es la respuesta respiratoria inmediata esperada para intentar compensar el pH sanguíneo?',
    options: [
      { key: 'A', text: 'Hipoventilación alveolar para retener CO₂.', isCorrect: false },
      { key: 'B', text: 'Hiperventilación (respiración de Kussmaul) para reducir la pCO₂ y elevar el pH.', isCorrect: true },
      { key: 'C', text: 'Apnea prolongada para inducir la síntesis de bicarbonato.', isCorrect: false },
      { key: 'D', text: 'No existe respuesta respiratoria compensatoria en trastornos metabólicos.', isCorrect: false },
    ],
    rationale:
      'La hiperventilación disminuye la presión parcial de CO₂ en sangre arterial (barrido de CO₂), lo cual reduce la concentración de ácido carbónico y desplaza el equilibrio de Henderson-Hasselbalch hacia la neutralidad.',
  },
  {
    id: 2,
    question:
      'Si se suspenden eritrocitos en una solución de NaCl al 2,0% (medio hipertónico respecto al plasma de 280-295 mOsm/kg), ¿qué fenómeno celular se observará al microscopio?',
    options: [
      { key: 'A', text: 'Hemólisis fulminante por entrada masiva de agua intracelular.', isCorrect: false },
      { key: 'B', text: 'Mantenimiento inalterado del disco bicóncavo normal.', isCorrect: false },
      { key: 'C', text: 'Crenación o retracción celular espiculada por salida neta de agua.', isCorrect: true },
      { key: 'D', text: 'Polimerización en masa de las cadenas de hemoglobina.', isCorrect: false },
    ],
    rationale:
      'Al estar en un medio hipertónico (>295 mOsm/kg), el agua sale del eritrocito por ósmosis desde el compartimento de menor concentración de solutos hacia el de mayor concentración externa, provocando la deshidratación y arrugamiento (crenación) del hematíe.',
  },
  {
    id: 3,
    question:
      '¿Cuál es la Molaridad (M) de una solución de NaHCO₃ preparada disolviendo 42,0 g de la sal (Masa Molar = 84,0 g/mol) en agua destilada hasta completar 1.000 mL de solución?',
    options: [
      { key: 'A', text: '0,25 M', isCorrect: false },
      { key: 'B', text: '0,50 M', isCorrect: true },
      { key: 'C', text: '1,00 M', isCorrect: false },
      { key: 'D', text: '2,00 M', isCorrect: false },
    ],
    rationale:
      'Cálculo estequiométrico: n = masa / Masa Molar = 42,0 g / 84,0 g/mol = 0,50 moles de NaHCO₃. Como están disueltos en exactamente 1,000 mL (1,0 L), la Molaridad es M = n / V(L) = 0,50 mol / 1,0 L = 0,50 M.',
  },
];

export const SceneBlock1ClinicalChallenge: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionKey: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Score
  const score = BLOCK1_QUESTIONS.reduce((acc, q) => {
    const selected = answers[q.id];
    const correct = q.options.find((o) => o.isCorrect)?.key;
    return selected === correct ? acc + 1 : acc;
  }, 0);

  const allAnswered = Object.keys(answers).length === BLOCK1_QUESTIONS.length;

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-3 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E51B23] flex items-center justify-center text-white font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono tracking-tight text-neutral-100">
              CÁTEDRA 1.7: DESAFÍO CLÍNICO INTEGRAL BLOQUE 1
            </h3>
            <p className="text-[11px] text-neutral-400">
              Autoevaluación Formativa Oficial del Sílabo UCACUE
            </p>
          </div>
        </div>

        {submitted ? (
          <button
            onClick={handleReset}
            className="text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reintentar</span>
          </button>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className={`text-xs px-3 py-1 rounded font-bold transition-colors cursor-pointer ${
              allAnswered
                ? 'bg-[#E51B23] text-white hover:bg-red-700 shadow-xs'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            Calificar Respuestas
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4">
        {/* Results Banner if submitted */}
        {submitted && (
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between ${
              score === BLOCK1_QUESTIONS.length
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-6 h-6 shrink-0" />
              <div>
                <h4 className="text-xs font-bold font-mono uppercase">
                  {score === 3
                    ? '¡Sobresaliente! Dominio Total de Materia y Energía en Medicina'
                    : 'Buen Desempeño - Revisa la Retroalimentación Clínica'}
                </h4>
                <p className="text-[11px] mt-0.5">
                  Calificación Oficial: <strong>{score} / 3 Correctas</strong> ({Math.round((score / 3) * 100)}%) • Cátedra MBAS04
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 bg-white rounded border">
              #SomosÁguilasRojas
            </span>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {BLOCK1_QUESTIONS.map((q, idx) => {
            const selectedKey = answers[q.id];
            const correctOpt = q.options.find((o) => o.isCorrect);

            return (
              <div
                key={q.id}
                className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2.5"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                    {q.question}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-1.5 pl-7">
                  {q.options.map((opt) => {
                    const isSelected = selectedKey === opt.key;
                    let optionStyle = 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700';

                    if (submitted) {
                      if (opt.isCorrect) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 font-bold text-emerald-900';
                      } else if (isSelected && !opt.isCorrect) {
                        optionStyle = 'border-red-500 bg-red-50 text-red-900 line-through';
                      } else {
                        optionStyle = 'border-neutral-200 bg-neutral-100/50 text-neutral-400 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-[#E51B23] bg-red-50/70 font-bold text-neutral-900 shadow-xs';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`w-full p-2 rounded-lg text-left text-xs border transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-neutral-500">{opt.key})</span>
                          <span>{opt.text}</span>
                        </div>

                        {submitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {submitted && isSelected && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Rationale feedback */}
                {submitted && (
                  <div className="pl-7 mt-2 pt-2 border-t border-neutral-200">
                    <div className="p-2.5 bg-blue-50/70 rounded-lg border border-blue-200 text-[11px] text-blue-900 space-y-0.5">
                      <div className="font-bold flex items-center gap-1 font-mono text-[10px] text-blue-700 uppercase">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Fundamento Médico del Profesor Aguilar:
                      </div>
                      <p className="leading-relaxed">{q.rationale}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
