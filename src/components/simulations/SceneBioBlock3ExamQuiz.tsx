import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, HelpCircle, RotateCcw, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  clinicalRelevance: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuál de los siguientes monosacáridos es un epímero en el carbono 4 (C-4) de la D-glucosa?',
    options: [
      { letter: 'A', text: 'D-Fructosa' },
      { letter: 'B', text: 'D-Galactosa' },
      { letter: 'C', text: 'D-Manosa' },
      { letter: 'D', text: 'D-Ribosa' },
    ],
    correctAnswer: 'B',
    explanation:
      'Los epímeros son diastereómeros que difieren en la configuración de un único centro quiral. La D-glucosa y la D-galactosa difieren exclusivamente en la orientación espacial del grupo hidroxilo (-OH) en el carbono 4 (en Fischer: a la derecha en la glucosa, a la izquierda en la galactosa). D-Manosa es epímero en C-2.',
    clinicalRelevance:
      'La incapacidad genética para metabolizar galactosa (deficiencia de GALT) produce la acumulación de galactosa-1-fosfato y galactitol, ocasionando galactosemia clásica con cataratas y hepatopatía.',
  },
  {
    id: 2,
    question:
      'Un gramo de triacilgliceroles produce aproximadamente el doble de kilocalorías que un gramo de glucógeno o proteína (9 kcal/g vs 4 kcal/g). ¿Cuál es la principal razón físico-química de este fenómeno metabólico?',
    options: [
      { letter: 'A', text: 'Los lípidos contienen mayor cantidad de nitrógeno y azufre en su estructura molecular.' },
      { letter: 'B', text: 'Los carbonos de las colas hidrocarbonadas de los ácidos grasos están en un estado de oxidación mucho más reducido que los carbohidratos.' },
      { letter: 'C', text: 'Los triacilgliceroles forman polímeros ramificados que retienen moléculas de agua intracelular.' },
      { letter: 'D', text: 'Las enzimas lipasas pancreáticas consumen menor cantidad de ATP durante su catabolismo.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Los ácidos grasos constan casi exclusivamente de enlaces C—H altamente reducidos, requiriendo más pasos de oxidación para convertirse en CO₂ y H₂O, liberando significativamente más electrones libres para la cadena respiratoria. Además, se almacenan de forma anhidra (sin agua de hidratación), a diferencia del glucógeno que retiene 2 g de agua por cada gramo de polisacárido.',
    clinicalRelevance:
      'El tejido adiposo blanco constituye la reserva energética cuantitativamente más eficiente en el ser humano, aportando 38 kJ/g (9 kcal/g).',
  },
  {
    id: 3,
    question:
      'En un ensayo cinético enzimático, la adición de un fármaco experimental provoca un incremento en el valor de la Km aparente, pero no altera el valor de la Vmax. ¿Qué tipo de inhibición enzimática está ejerciendo dicho fármaco?',
    options: [
      { letter: 'A', text: 'Inhibición No Competitiva' },
      { letter: 'B', text: 'Inhibición Acompetitiva' },
      { letter: 'C', text: 'Inhibición Competitiva' },
      { letter: 'D', text: 'Desnaturalización Irreversible' },
    ],
    correctAnswer: 'C',
    explanation:
      'El inhibidor competitivo se une al mismo sitio activo que el sustrato por complementariedad geométrica. Al competir, se requiere mayor concentración de sustrato para desplazar al inhibidor y alcanzar la mitad de la velocidad máxima (aumenta Km aparente), pero si se satura con suficiente sustrato, se logra la misma Vmax original.',
    clinicalRelevance:
      'Mecanismo farmacológico de fármacos de primera línea como las estatinas (atorvastatina frente a HMG-CoA reductasa) y AINEs reversibles (ibuprofeno frente a COX-1 y COX-2).',
  },
  {
    id: 4,
    question:
      '¿Qué componente lipídico de la membrana plasmática animal actúa como un amortiguador térmico bidireccional, limitando el movimiento de los fosfolípidos a altas temperaturas y previniendo la cristalización a bajas temperaturas?',
    options: [
      { letter: 'A', text: 'Fosfatidilcolina (Lecitina)' },
      { letter: 'B', text: 'Esfingomielina' },
      { letter: 'C', text: 'Colesterol' },
      { letter: 'D', text: 'Cerebrósido glucosilado' },
    ],
    correctAnswer: 'C',
    explanation:
      'El colesterol posee un núcleo rígido de cuatro anillos (ciclopentanoperhidrofenantreno) y un grupo hidroxilo polar débil. Al intercalarse entre las colas hidrocarbonadas de los fosfoglicéridos, su rigidez esteroidea restringe el movimiento lateral excesivo a 37°C, mientras que a bajas temperaturas interfiere con el empaquetamiento apretado de las colas, evitando la transición a gel sólido.',
    clinicalRelevance:
      'Representa del 20% al 25% del total de lípidos de la membrana plasmática de células animales, siendo esencial para la integridad mecánica de los eritrocitos y el funcionamiento de las balsas lipídicas.',
  },
];

export const SceneBioBlock3ExamQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, letter: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: letter,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Banco de Autoevaluación Integral & Examen Teórico: Bloque 3
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Reactivos de Opción Múltiple • Medicina UCACUE (4 Reactivos Clave)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {submitted && (
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono border ${
                score === 4
                  ? 'bg-green-50 text-green-700 border-green-300'
                  : score >= 2
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-red-50 text-[#E51B23] border-red-300'
              }`}
            >
              Puntaje: {score} / 4 ({((score / 4) * 100).toFixed(0)}%)
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[520px]">
        {QUESTIONS.map((q, index) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-3.5 rounded-xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-green-50/40 border-green-300'
                    : 'bg-red-50/40 border-red-200'
                  : 'bg-slate-50/60 border-neutral-200'
              }`}
            >
              {/* Question title */}
              <div className="flex items-start gap-2 mb-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-xs font-bold text-neutral-900 leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                {q.options.map((opt) => {
                  const isChosen = userAnswer === opt.letter;
                  const isRightAnswer = opt.letter === q.correctAnswer;

                  let buttonStyle = 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100';

                  if (submitted) {
                    if (isRightAnswer) {
                      buttonStyle = 'bg-green-100 border-green-400 text-green-900 font-bold';
                    } else if (isChosen && !isRightAnswer) {
                      buttonStyle = 'bg-red-100 border-red-400 text-red-900 font-bold';
                    } else {
                      buttonStyle = 'bg-neutral-50 border-neutral-200 text-neutral-400';
                    }
                  } else if (isChosen) {
                    buttonStyle = 'bg-[#E51B23] border-[#E51B23] text-white font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={opt.letter}
                      onClick={() => handleSelectOption(q.id, opt.letter)}
                      disabled={submitted}
                      className={`p-2.5 rounded-lg border text-left text-[11px] flex items-center gap-2 transition-all cursor-pointer ${buttonStyle}`}
                    >
                      <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center text-[10px] shrink-0 bg-black/10">
                        {opt.letter}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {submitted && (
                <div className="mt-3 ml-7 p-2.5 bg-white rounded-lg border border-neutral-200 text-[11px] space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    {isCorrect ? (
                      <span className="text-green-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ¡Respuesta Correcta! ({q.correctAnswer})
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Incorrecta. La respuesta correcta es la {q.correctAnswer}.
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    <strong>Fundamentación:</strong> {q.explanation}
                  </p>
                  <p className="text-blue-800 text-[10px] bg-blue-50/60 p-1.5 rounded border border-blue-200">
                    <strong>🏥 Relevancia Médica:</strong> {q.clinicalRelevance}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-200">
          <span className="text-[11px] text-neutral-500">
            {submitted
              ? `Evaluación completada. Respuestas correctas: ${score} de 4.`
              : allAnswered
              ? 'Todos los reactivos han sido respondidos. Puede calificar su examen.'
              : 'Seleccione una opción para cada una de las 4 preguntas antes de calificar.'}
          </span>

          <div className="flex gap-2">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={!allAnswered}
                className="px-4 py-1.5 bg-[#E51B23] hover:bg-[#c4141b] disabled:bg-neutral-300 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Calificar Respuestas
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Examen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
