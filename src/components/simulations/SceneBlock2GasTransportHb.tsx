import React, { useState } from 'react';
import { Heart, Activity, GitBranch, HelpCircle, CheckCircle2, XCircle, Award, Flame, Sparkles, Calculator } from 'lucide-react';

export const SceneBlock2GasTransportHb: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bohr' | 'pathways' | 'problem' | 'exam'>('bohr');

  // Bohr Effect Simulator State
  const [phVal, setPhVal] = useState<number>(7.4); // 7.2 (Acidosis) to 7.6 (Alkalosis)
  const [tempCelsius, setTempCelsius] = useState<number>(37); // 35 to 40
  const [pco2Val, setPco2Val] = useState<number>(40); // 30 to 50
  const [testPO2, setTestPO2] = useState<number>(40); // Tissue PO2 (40 mmHg) vs Lung PO2 (100 mmHg)

  // Calculate Bohr shift factor
  // Lower pH (<7.4), higher temp (>37), higher PCO2 (>40) shift right (lower affinity, P50 increases)
  const p50Baseline = 26.6;
  const deltaPH = 7.4 - phVal; // positive in acidosis
  const deltaT = tempCelsius - 37; // positive in fever
  const deltaCO2 = pco2Val - 40; // positive in hypercapnia

  const currentP50 = p50Baseline + deltaPH * 15 + deltaT * 0.8 + deltaCO2 * 0.3;

  // Hill Equation for Hb Saturation: Sat = PO2^n / (PO2^n + P50^n) where n ≈ 2.7
  const calcSat = (po2: number, p50: number) => {
    const n = 2.7;
    const numerator = Math.pow(po2, n);
    const denominator = numerator + Math.pow(p50, n);
    return Math.min(100, Math.round((numerator / denominator) * 100));
  };

  const currentSat = calcSat(testPO2, currentP50);
  const baselineSat = calcSat(testPO2, p50Baseline);

  // Cumulative Exam State (5 Questions)
  const [examAnswers, setExamAnswers] = useState<{ [qId: number]: string }>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);

  const EXAM_QUESTIONS = [
    {
      id: 1,
      question: '1. Según la Teoría Cinético-Molecular, ¿cómo se define el comportamiento de las partículas de un gas ideal?',
      options: [
        { id: 'A', text: 'A) Poseen fuerzas gravitatorias intensas y volumen comparable al recipiente.' },
        { id: 'B', text: 'B) Movimiento caótico continuo, colisiones elásticas y energía cinética proporcional a la temperatura en Kelvin.' },
        { id: 'C', text: 'C) Colisiones inelásticas con pérdida gradual de energía mecánica.' },
        { id: 'D', text: 'D) Fuerzas de atracción electrostáticas permanentes entre moléculas.' },
      ],
      correctId: 'B',
      explanation: 'Los gases ideales se fundamentan en el movimiento caótico continuo, volumen molecular despreciable, fuerzas nulas, colisiones elásticas y Ec ∝ T (K).',
    },
    {
      id: 2,
      question: '2. Durante la inspiración humana, la contracción del diafragma aumenta el volumen torácico haciendo descender la presión intrapulmonar. ¿Qué ley rige este proceso?',
      options: [
        { id: 'A', text: 'A) Ley de Gay-Lussac (proceso isocórico).' },
        { id: 'B', text: 'B) Ley de Boyle (proceso isotérmico: P₁ · V₁ = P₂ · V₂).' },
        { id: 'C', text: 'C) Ley de Graham (difusión molecular).' },
        { id: 'D', text: 'D) Ley de Henry (solubilidad acuosa).' },
      ],
      correctId: 'B',
      explanation: 'La mecánica diafragmática es un proceso isotérmico donde al aumentar el volumen disminuye la presión intrapulmonar (Ley de Boyle).',
    },
    {
      id: 3,
      question: '3. En Condiciones Normales de Presión y Temperatura (CNPT: 0 °C y 1 atm), ¿cuál es el volumen molar que ocupa exactamente 1 mol de cualquier gas ideal?',
      options: [
        { id: 'A', text: 'A) 12,0 Litros' },
        { id: 'B', text: 'B) 18,5 Litros' },
        { id: 'C', text: 'C) 22,4 Litros' },
        { id: 'D', text: 'D) 31,0 Litros' },
      ],
      correctId: 'C',
      explanation: 'En CNPT (273,15 K y 1 atm), el volumen molar estándar universal para todo gas ideal es 22,4 Litros/mol.',
    },
    {
      id: 4,
      question: '4. La Ley de Dalton de las Presiones Parciales establece cuantitativamente que:',
      options: [
        { id: 'A', text: 'A) La presión total es el producto de las presiones parciales.' },
        { id: 'B', text: 'B) La velocidad de difusión es inversamente proporcional a la masa molar.' },
        { id: 'C', text: 'C) La presión total de una mezcla gaseosa es la suma directa de las presiones parciales de cada componente.' },
        { id: 'D', text: 'D) Cada gas ejerce exactamente la misma presión independientemente de su concentración.' },
      ],
      correctId: 'C',
      explanation: 'P_total = P₁ + P₂ + ... + Pₙ. Cada gas ejerce su presión parcial como si ocupara por sí solo todo el recipiente.',
    },
    {
      id: 5,
      question: '5. El Efecto Bohr en la curva de disociación de la hemoglobina se produce fisiológicamente por:',
      options: [
        { id: 'A', text: 'A) Desplazamiento a la derecha por acidosis (↓pH), aumento de PCO₂ y temperatura, facilitando la entrega tisular de O₂.' },
        { id: 'B', text: 'B) Desplazamiento a la izquierda por disminución de temperatura que impide liberar oxígeno.' },
        { id: 'C', text: 'C) Alcalosis metabólica que rompe los enlaces peptídicos de la hemoglobina.' },
        { id: 'D', text: 'D) Aumento constante de la afinidad del oxígeno en tejidos anaeróbicos.' },
      ],
      correctId: 'A',
      explanation: 'La acidosis, el calor y el CO₂ tisular desplazan la curva a la derecha, disminuyendo la afinidad y facilitando que la hemoglobina entregue el oxígeno.',
    },
  ];

  const calculateExamScore = () => {
    let correct = 0;
    EXAM_QUESTIONS.forEach((q) => {
      if (examAnswers[q.id] === q.correctId) correct++;
    });
    return (correct / EXAM_QUESTIONS.length) * 10;
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Module Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bohr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'bohr'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Curva de Hemoglobina y Efecto Bohr</span>
          </button>
          <button
            onClick={() => setActiveTab('pathways')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'pathways'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Vías de Transporte (O₂ y CO₂)</span>
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'problem'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Problema Modelo 2.7</span>
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'exam'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Cuestionario Integral Bloque 2</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          Módulo 2.7 • Cierre de Bloque
        </span>
      </div>

      {/* Tab 1: Curva de Hemoglobina y Efecto Bohr */}
      {activeTab === 'bohr' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs">
          {/* Visual Graph & Saturation Indicator */}
          <div className="lg:col-span-7 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-red-600 text-xs flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Curva Sigmoidea de Disociación de la Hemoglobina
                </span>
                <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-neutral-200">
                  P₅₀ Actual = {currentP50.toFixed(1)} mmHg
                </span>
              </div>

              {/* SVG Graphic of Sigmoid Curve */}
              <div className="relative h-48 bg-white rounded-xl border border-neutral-200 p-3 flex items-center justify-center shadow-inner">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                  {/* Grid Lines */}
                  <line x1="30" y1="10" x2="30" y2="105" stroke="#E5E7EB" strokeWidth="1" />
                  <line x1="30" y1="105" x2="290" y2="105" stroke="#E5E7EB" strokeWidth="1" />

                  {/* Baseline Curve (Neutral Grey Dotted) */}
                  <path
                    d="M 30 105 Q 60 100 80 80 T 130 30 T 290 15"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />

                  {/* Active Shifted Curve */}
                  <path
                    d={`M 30 105 Q ${60 + (currentP50 - 26.6) * 1.5} 100 ${80 + (currentP50 - 26.6) * 1.5} 80 T ${130 + (currentP50 - 26.6) * 1.5} 30 T 290 15`}
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2.5"
                  />

                  {/* Current Operating Point Marker */}
                  <circle
                    cx={Math.min(280, 30 + (testPO2 / 100) * 250)}
                    cy={105 - (currentSat / 100) * 90}
                    r="5"
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />

                  {/* Text Labels */}
                  <text x="35" y="20" fontSize="9" fill="#6B7280" fontFamily="monospace">100% Sat</text>
                  <text x="35" y="65" fontSize="9" fill="#6B7280" fontFamily="monospace">50% Sat</text>
                  <text x="240" y="118" fontSize="9" fill="#6B7280" fontFamily="monospace">PO₂ (mmHg)</text>
                </svg>

                {/* Legend overlay */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 text-[10px] bg-white/90 p-1.5 rounded border border-neutral-200">
                  <span className="text-neutral-400">--- Normal (pH 7.4, 37°C)</span>
                  <span className="text-red-600 font-bold">—— Curva Desplazada</span>
                </div>
              </div>

              {/* Saturation Box */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                  <span className="text-[10px] text-neutral-500 uppercase block font-medium">Saturación a PO₂ ({testPO2} mmHg)</span>
                  <span className="text-lg font-mono font-bold text-red-600">{currentSat}%</span>
                  <span className="text-[10px] text-neutral-500 block">Baseline normal: {baselineSat}%</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                  <span className="text-[10px] text-neutral-500 uppercase block font-medium">Desplazamiento Efecto Bohr</span>
                  <span className="text-sm font-bold text-neutral-800 block mt-1">
                    {currentP50 > 27.5 ? (
                      <span className="text-amber-600">Hacia la Derecha (Entrega O₂)</span>
                    ) : currentP50 < 25.5 ? (
                      <span className="text-blue-600">Hacia la Izquierda (Captación)</span>
                    ) : (
                      <span className="text-neutral-700">Estado Fisiológico Estándar</span>
                    )}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    {currentP50 > 27.5 ? 'Menor afinidad por O₂ en tejidos activos' : 'Mayor afinidad por O₂'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-neutral-500 italic mt-2 text-center">
              El Efecto Bohr asegura que los tejidos con alta tasa metabólica (ácidos, calientes y ricos en CO₂) reciban más O₂.
            </p>
          </div>

          {/* Physiological Slider Controls */}
          <div className="lg:col-span-5 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-red-600 uppercase text-[11px] block mb-2">
                Moduladores Alostéricos de la Hemoglobina
              </span>

              {/* pH slider */}
              <div className="mb-2.5">
                <div className="flex justify-between text-neutral-700 mb-0.5">
                  <span className="font-medium">pH Sanguíneo (7,20 - 7,60):</span>
                  <strong className={`font-mono ${phVal < 7.35 ? 'text-red-600' : phVal > 7.45 ? 'text-blue-600' : 'text-neutral-900'}`}>
                    {phVal.toFixed(2)} {phVal < 7.35 ? '(Acidosis)' : phVal > 7.45 ? '(Alcalosis)' : '(Normal)'}
                  </strong>
                </div>
                <input
                  type="range"
                  min={7.15}
                  max={7.65}
                  step={0.05}
                  value={phVal}
                  onChange={(e) => setPhVal(Number(e.target.value))}
                  className="w-full accent-red-600 h-1 bg-neutral-200 rounded"
                />
              </div>

              {/* Temperature slider */}
              <div className="mb-2.5">
                <div className="flex justify-between text-neutral-700 mb-0.5">
                  <span className="font-medium">Temperatura (°C):</span>
                  <strong className="font-mono text-amber-600">{tempCelsius} °C {tempCelsius > 37.5 ? '(Fiebre)' : ''}</strong>
                </div>
                <input
                  type="range"
                  min={34}
                  max={41}
                  step={0.5}
                  value={tempCelsius}
                  onChange={(e) => setTempCelsius(Number(e.target.value))}
                  className="w-full accent-amber-600 h-1 bg-neutral-200 rounded"
                />
              </div>

              {/* PCO2 slider */}
              <div className="mb-2.5">
                <div className="flex justify-between text-neutral-700 mb-0.5">
                  <span className="font-medium">PCO₂ Capilar (mmHg):</span>
                  <strong className="font-mono text-neutral-800">{pco2Val} mmHg</strong>
                </div>
                <input
                  type="range"
                  min={25}
                  max={60}
                  step={1}
                  value={pco2Val}
                  onChange={(e) => setPco2Val(Number(e.target.value))}
                  className="w-full accent-neutral-800 h-1 bg-neutral-200 rounded"
                />
              </div>

              {/* Test PO2 selector */}
              <div className="mb-2">
                <span className="font-medium text-neutral-700 block mb-1">Punto Tisular / Pulmonar:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTestPO2(40)}
                    className={`flex-1 py-1 rounded text-[11px] font-semibold border ${
                      testPO2 === 40 ? 'bg-red-600 text-white border-red-700' : 'bg-white text-neutral-700 border-neutral-200'
                    }`}
                  >
                    Tejidos (PO₂ = 40 mmHg)
                  </button>
                  <button
                    onClick={() => setTestPO2(100)}
                    className={`flex-1 py-1 rounded text-[11px] font-semibold border ${
                      testPO2 === 100 ? 'bg-red-600 text-white border-red-700' : 'bg-white text-neutral-700 border-neutral-200'
                    }`}
                  >
                    Pulmón (PO₂ = 100 mmHg)
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 text-[11px] text-neutral-700 shadow-xs">
              <strong className="text-red-600 block mb-0.5">🩺 Resumen Clínico:</strong>
              ↓ pH, ↑ Temperatura, ↑ PCO₂ y ↑ 2,3-DPG desplazan la curva a la <strong>DERECHA</strong> facilitando la cesión de oxígeno a las células.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vías de Transporte de Gases en Sangre */}
      {activeTab === 'pathways' && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Transporte de O2 */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-red-600 text-xs flex items-center gap-1.5 mb-2">
                <Heart className="w-4 h-4 text-red-600" />
                1. Transporte de Oxígeno (O₂) en Sangre
              </span>

              <div className="space-y-2 mb-3">
                <div className="p-3 bg-white rounded-lg border border-neutral-200 shadow-xs">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-red-700">Oxihemoglobina (HbO₂)</strong>
                    <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">98,0% - 99,0%</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Unión química reversible y coordinada a los 4 átomos de hierro ferroso (Fe²⁺) en los grupos hemo de la globina.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-neutral-200 shadow-xs">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-blue-700">Disuelto físicamente en Plasma</strong>
                    <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">1,0% - 2,0%</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Baja solubilidad acuosa (~0,003 mL O₂ / 100 mL plasma por cada mmHg de PO₂). Sin embargo, esta fracción disuelta es la que genera la PO₂ que difunde a las células.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 text-[11px] text-neutral-700">
              <strong>Capacidad de transporte:</strong> 1 gramo de hemoglobina completamente saturada transporta aproximadamente 1,34 mL de O₂.
            </div>
          </div>

          {/* Transporte de CO2 */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-neutral-900 text-xs flex items-center gap-1.5 mb-2">
                <GitBranch className="w-4 h-4 text-neutral-700" />
                2. Transporte de Dióxido de Carbono (CO₂)
              </span>

              <div className="space-y-2 mb-3">
                <div className="p-3 bg-white rounded-lg border border-neutral-200 shadow-xs">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-emerald-700">Ión Bicarbonato (HCO₃⁻)</strong>
                    <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">70,0%</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 mb-1">
                    Principal amortiguador ácido-base. Se sintetiza dentro del eritrocito por la enzima <strong>anhidrasa carbónica</strong>:
                  </p>
                  <code className="text-[10px] font-mono text-neutral-900 block bg-neutral-100 p-1 rounded text-center">
                    CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻
                  </code>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-neutral-200 shadow-xs">
                  <div className="flex justify-between items-center mb-0.5">
                    <strong className="text-neutral-800">Carbaminohemoglobina</strong>
                    <span className="font-mono font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">20,0% - 25,0%</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Unido a los grupos amino terminales de la cadena de globina.
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-neutral-200 shadow-xs">
                  <div className="flex justify-between items-center mb-0.5">
                    <strong className="text-neutral-800">Disuelto en Plasma</strong>
                    <span className="font-mono font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">5,0% - 10,0%</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    El CO₂ es ~24 veces más soluble en agua que el oxígeno molecular.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-900">
              🩺 Fundamental para el mantenimiento del pH plasmático fisiológico (7,35 - 7,45).
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Problema Modelo 2.7 */}
      {activeTab === 'problem' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-red-600" />
              <h4 className="font-bold text-sm text-neutral-900">
                Problema Modelo 2.7: Distribución Volumétrica de Oxígeno en Sangre Arterial
              </h4>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-bold text-neutral-900 mb-1">📋 Enunciado Oficial de la Cátedra:</p>
              <p className="text-neutral-700 italic leading-relaxed">
                "Un litro (1000 mL) de sangre arterial completamente oxigenada transporta aproximadamente 200 mL de oxígeno gaseoso total. Determine cuantitativamente:
                a) El volumen de oxígeno que viaja unido químicamente a la hemoglobina (asumiendo un 98,5%).
                b) El volumen de oxígeno que viaja físicamente disuelto en la fase plasmática acuosa (1,5%)."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-red-600 font-sans block mb-1">a) Unido a Oxihemoglobina (98,5%):</span>
                <p className="text-neutral-700">V(HbO₂) = V_total · 0,985</p>
                <p className="text-neutral-700 mt-1">V(HbO₂) = 200 mL · 0,985</p>
                <p className="text-red-600 font-bold text-sm mt-2">V(HbO₂) = 197,0 mL</p>
                <p className="text-[11px] font-sans text-neutral-500 mt-2">
                  La hemoglobina incrementa casi 70 veces la capacidad oxifórica de la sangre.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-blue-600 font-sans block mb-1">b) Disuelto en Plasma (1,5%):</span>
                <p className="text-neutral-700">V(disuelto) = V_total · 0,015</p>
                <p className="text-neutral-700 mt-1">V(disuelto) = 200 mL · 0,015</p>
                <p className="text-blue-600 font-bold text-sm mt-2">V(disuelto) = 3,0 mL</p>
                <p className="text-[11px] font-sans text-neutral-500 mt-2">
                  Aunque cuantitativamente mínimo, este gas disuelto es el que genera la PO₂ arterial medible.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-neutral-200 text-center font-mono text-[11px] text-neutral-600">
            Total transportado = 197,0 mL (Hb) + 3,0 mL (disuelto) = 200,0 mL O₂ / L de sangre
          </div>
        </div>
      )}

      {/* Tab 4: Cuestionario Integral Acumulativo */}
      {activeTab === 'exam' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-neutral-900">
                  Cuestionario Integral Acumulativo: Bloque 2 (Química Aplicada a la Medicina)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                5 Preguntas Oficiales de Cátedra
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {EXAM_QUESTIONS.map((q) => (
                <div key={q.id} className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                  <p className="font-bold text-neutral-900 mb-2">{q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        disabled={isExamSubmitted}
                        onClick={() => setExamAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                        className={`w-full text-left p-2 rounded-lg border text-[11px] transition-all flex items-center justify-between ${
                          examAnswers[q.id] === opt.id
                            ? 'bg-red-50 border-red-500 font-semibold text-neutral-900'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        } ${isExamSubmitted && opt.id === q.correctId ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' : ''}`}
                      >
                        <span>{opt.text}</span>
                        {isExamSubmitted && opt.id === q.correctId && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                        {isExamSubmitted && examAnswers[q.id] === opt.id && opt.id !== q.correctId && (
                          <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  {isExamSubmitted && (
                    <div className="mt-2 pt-2 border-t border-neutral-100 text-[10px] text-neutral-600">
                      <strong>Retroalimentación:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exam Footer & Scoring */}
          <div className="mt-4 pt-3 border-t border-neutral-200">
            {!isExamSubmitted ? (
              <button
                disabled={Object.keys(examAnswers).length < EXAM_QUESTIONS.length}
                onClick={() => setIsExamSubmitted(true)}
                className="w-full py-2.5 bg-red-600 disabled:bg-neutral-300 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Calificar Cuestionario Integral del Bloque 2</span>
              </button>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-red-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500">
                    Calificación Obtenida en Bloque 2:
                  </span>
                  <div className="text-xl font-mono font-extrabold text-red-600">
                    {calculateExamScore().toFixed(1)} / 10,0 Puntos
                  </div>
                  <span className="text-[11px] text-neutral-600 font-medium">
                    {calculateExamScore() >= 7
                      ? '¡Excelente dominio temático de los gases en medicina! #SOMOSÁGUILASROJAS'
                      : 'Revise los conceptos teóricos y vuelva a intentarlo.'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsExamSubmitted(false);
                    setExamAnswers({});
                  }}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Reiniciar Evaluación
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
