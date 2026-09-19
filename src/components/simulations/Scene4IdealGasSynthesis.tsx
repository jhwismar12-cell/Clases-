import React, { useState } from 'react';
import { Calculator, Sparkles, Box, HelpCircle, CheckCircle2, XCircle, ArrowRight, Gauge } from 'lucide-react';

export const Scene4IdealGasSynthesis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'deduction' | 'problem' | 'quiz'>('calculator');
  const R = 0.08206; // L * atm / (mol * K)

  // Calculator State: Target can be P, V, n, T, or MM (Molar Mass)
  const [calcTarget, setCalcTarget] = useState<'P' | 'V' | 'n' | 'T' | 'MM'>('P');
  const [inputP, setInputP] = useState<number>(2.46);
  const [inputV, setInputV] = useState<number>(5.0);
  const [inputN, setInputN] = useState<number>(0.5);
  const [inputMassGrams, setInputMassGrams] = useState<number>(16.0);
  const [inputTCelsius, setInputTCelsius] = useState<number>(27.0);

  const tempKelvin = inputTCelsius + 273.15;

  let computedResult = 0;
  if (calcTarget === 'P') {
    // P = nRT / V
    computedResult = (inputN * R * tempKelvin) / (inputV || 1);
  } else if (calcTarget === 'V') {
    // V = nRT / P
    computedResult = (inputN * R * tempKelvin) / (inputP || 1);
  } else if (calcTarget === 'n') {
    // n = PV / RT
    computedResult = (inputP * inputV) / (R * (tempKelvin || 1));
  } else if (calcTarget === 'T') {
    // T = PV / nR
    computedResult = (inputP * inputV) / ((inputN || 1) * R);
  } else if (calcTarget === 'MM') {
    // MM = (m * R * T) / (P * V)
    computedResult = (inputMassGrams * R * tempKelvin) / ((inputP * inputV) || 1);
  }

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculadora Universal (PV = nRT)</span>
          </button>
          <button
            onClick={() => setActiveTab('deduction')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'deduction'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deducción de R y Densidad</span>
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'problem'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Problema Modelo 2.4</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Autoevaluación 2.4</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          Módulo 2.4 • Ecuación de Estado
        </span>
      </div>

      {/* Tab 1: Calculadora Universal */}
      {activeTab === 'calculator' && (
        <div className="flex-1 flex flex-col gap-3 text-xs">
          {/* Top Banner */}
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
                Ecuación Universal de los Gases Ideales
              </span>
              <h3 className="text-xl font-mono font-extrabold text-neutral-900">
                P · V = n · R · T
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
              <span className="text-neutral-500 font-medium">Variable a Despejar:</span>
              <select
                value={calcTarget}
                onChange={(e) => setCalcTarget(e.target.value as any)}
                className="bg-transparent font-mono font-bold text-red-600 border-none outline-hidden cursor-pointer"
              >
                <option value="P">Presión (P)</option>
                <option value="V">Volumen (V)</option>
                <option value="n">Moles (n)</option>
                <option value="T">Temperatura (T)</option>
                <option value="MM">Masa Molar (MM = mRT/PV)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1">
            {/* Input Controls Column */}
            <div className="md:col-span-7 bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2.5">
              <span className="font-bold text-neutral-800 text-xs block mb-1">
                Ajuste de Parámetros Físico-Químicos:
              </span>

              {calcTarget !== 'P' && (
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                    <span>Presión (P):</span>
                    <strong className="font-mono text-red-600">{inputP.toFixed(2)} atm</strong>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={10.0}
                    step={0.1}
                    value={inputP}
                    onChange={(e) => setInputP(Number(e.target.value))}
                    className="w-full accent-red-600 h-1 bg-neutral-200 rounded"
                  />
                </div>
              )}

              {calcTarget !== 'V' && (
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                    <span>Volumen del Recipiente (V):</span>
                    <strong className="font-mono text-blue-600">{inputV.toFixed(1)} L</strong>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={50.0}
                    step={0.5}
                    value={inputV}
                    onChange={(e) => setInputV(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1 bg-neutral-200 rounded"
                  />
                </div>
              )}

              {calcTarget !== 'n' && calcTarget !== 'MM' && (
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                    <span>Cantidad de Sustancia (n):</span>
                    <strong className="font-mono text-emerald-600">{inputN.toFixed(2)} moles</strong>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={10.0}
                    step={0.1}
                    value={inputN}
                    onChange={(e) => setInputN(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-1 bg-neutral-200 rounded"
                  />
                </div>
              )}

              {calcTarget === 'MM' && (
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                    <span>Masa de la Muestra (m):</span>
                    <strong className="font-mono text-neutral-900">{inputMassGrams.toFixed(1)} gramos</strong>
                  </div>
                  <input
                    type="range"
                    min={1.0}
                    max={100.0}
                    step={0.5}
                    value={inputMassGrams}
                    onChange={(e) => setInputMassGrams(Number(e.target.value))}
                    className="w-full accent-neutral-800 h-1 bg-neutral-200 rounded"
                  />
                </div>
              )}

              {calcTarget !== 'T' && (
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                    <span>Temperatura (T):</span>
                    <strong className="font-mono text-amber-600">{inputTCelsius} °C ({tempKelvin.toFixed(2)} K)</strong>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={150}
                    step={1}
                    value={inputTCelsius}
                    onChange={(e) => setInputTCelsius(Number(e.target.value))}
                    className="w-full accent-amber-600 h-1 bg-neutral-200 rounded"
                  />
                </div>
              )}
            </div>

            {/* Calculated Output & Formula Breakdown */}
            <div className="md:col-span-5 bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div className="text-center p-3 bg-white rounded-xl border border-red-200 shadow-xs">
                <span className="text-[10px] text-red-600 uppercase font-bold tracking-wider block">
                  Resultado del Cálculo
                </span>
                <span className="text-2xl font-mono font-extrabold text-neutral-900 block my-1">
                  {computedResult.toFixed(2)}{' '}
                  <span className="text-sm font-sans font-normal text-neutral-500">
                    {calcTarget === 'P' && 'atm'}
                    {calcTarget === 'V' && 'Litros (L)'}
                    {calcTarget === 'n' && 'moles'}
                    {calcTarget === 'T' && 'Kelvin (K)'}
                    {calcTarget === 'MM' && 'g / mol'}
                  </span>
                </span>
                {calcTarget === 'T' && (
                  <span className="text-[11px] font-mono text-neutral-500">
                    = {(computedResult - 273.15).toFixed(1)} °C
                  </span>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1 text-[11px] text-neutral-600">
                <span className="font-bold text-neutral-800 block text-[10px] uppercase">
                  Valores Constantes Utilizados:
                </span>
                <p>• R = 0,08206 L · atm / (mol · K)</p>
                <p>• P en atmósferas, V en Litros</p>
                <p>• T en escala absoluta Kelvin</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Deducción de R y Fórmulas Derivadas */}
      {activeTab === 'deduction' && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-red-600 text-xs block mb-1">
                Deducción Matemática de la Constante Universal R:
              </span>
              <p className="text-neutral-700 leading-relaxed mb-3">
                Tomando como base 1 mol de gas ideal en Condiciones Normales de Presión y Temperatura (CNPT):
              </p>

              <div className="p-3 bg-white rounded-lg border border-neutral-200 font-mono text-[11px] space-y-2 shadow-xs">
                <p>P = 1,0 atm | V = 22,414 L | n = 1,0 mol | T = 273,15 K</p>
                <div className="pt-2 border-t border-neutral-100">
                  <p className="text-neutral-500">Despejando R de P · V = n · R · T:</p>
                  <p className="text-red-600 font-bold text-sm mt-1">
                    R = (P · V) / (n · T)
                  </p>
                  <p className="mt-1">
                    R = (1,0 atm · 22,414 L) / (1,0 mol · 273,15 K)
                  </p>
                  <p className="text-neutral-900 font-extrabold text-sm mt-1">
                    R = 0,08206 L · atm / (mol · K)
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 mt-2">
              <strong>Equivalencia en el Sistema Internacional (SI):</strong> R = 8,314 J / (mol · K) = 8,314 kPa · L / (mol · K).
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-neutral-900 text-xs block mb-2">
                Fórmulas Derivadas (Densidad y Masa Molar):
              </span>

              <div className="space-y-2">
                <div className="p-3 bg-white rounded-lg border border-neutral-200 shadow-xs font-mono text-[11px]">
                  <strong className="text-red-600 font-sans block text-xs mb-1">
                    1. Masa Molar (MM) de un Gas Desconocido:
                  </strong>
                  <p>Como n = m / MM (donde m es masa en gramos):</p>
                  <p className="text-neutral-900 font-bold mt-1">
                    P · V = (m / MM) · R · T  ⇒  MM = (m · R · T) / (P · V)
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-neutral-200 shadow-xs font-mono text-[11px]">
                  <strong className="text-blue-600 font-sans block text-xs mb-1">
                    2. Densidad Gaseosa (d = m / V):
                  </strong>
                  <p>Reordenando los términos algebraicamente:</p>
                  <p className="text-neutral-900 font-bold mt-1">
                    d = (P · MM) / (R · T)
                  </p>
                  <p className="text-neutral-500 font-sans text-[10px] mt-1">
                    A mayor presión o menor temperatura, mayor es la densidad del gas.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 text-[11px] text-neutral-600 mt-2">
              🩺 Fundamental para identificar y calcular dosis volumétricas de agentes anestésicos volátiles como Sevoflurano e Isoflurano.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Problema Modelo 2.4 */}
      {activeTab === 'problem' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Box className="w-4 h-4 text-red-600" />
              <h4 className="font-bold text-sm text-neutral-900">
                Problema Modelo 2.4: Tanque Hospitalario de Oxígeno (PV = nRT)
              </h4>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-bold text-neutral-900 mb-1">📋 Enunciado Oficial de la Cátedra:</p>
              <p className="text-neutral-700 italic leading-relaxed">
                "Un tanque rígido de 5,0 L contiene 16,0 g de oxígeno gaseoso (O₂, masa molar = 32,0 g/mol) a una temperatura ambiente de 27,0 °C (300,15 K). ¿Qué presión en atmósferas ejerce el gas en el interior del tanque?"
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-neutral-800 block mb-1">Paso 1: Cálculo de los Moles (n)</span>
                <p className="font-mono text-[11px] text-neutral-800">
                  n = masa / masa molar = 16,0 g / (32,0 g/mol) = <strong className="text-emerald-600">0,50 mol de O₂</strong>
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs font-mono">
                <span className="font-bold text-red-600 font-sans block mb-1">Paso 2: Aplicación de la Ecuación y Despeje de P</span>
                <p className="text-neutral-700">P · V = n · R · T</p>
                <p className="text-neutral-700 mt-1">P = (n · R · T) / V</p>
                <p className="text-neutral-700 mt-1">
                  P = (0,50 mol · 0,08206 L·atm/(mol·K) · 300,15 K) / 5,0 L
                </p>
                <p className="text-red-600 font-bold text-sm mt-2">P = 2,46 atm</p>
                <p className="text-[11px] font-sans text-neutral-600 mt-1">
                  <strong>Conclusión médica:</strong> El manómetro del tanque de 5,0 L registrará una presión de 2,46 atm (aproximadamente 1870 mmHg o 36,2 psi).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-neutral-200 text-center font-mono text-[11px] text-neutral-600">
            P = (n · R · T) / V = 2,46 atm
          </div>
        </div>
      )}

      {/* Tab 4: Autoevaluación 2.4 */}
      {activeTab === 'quiz' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-neutral-900">Autoevaluación Formativa: Módulo 2.4</h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Pregunta 1 de 1</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-semibold text-neutral-900 text-[13px] leading-relaxed">
                Una muestra de 0,25 moles de un gas anestésico ocupa 5,6 L en CNPT. Si su masa es de 11,0 g, ¿cuál es su masa molar?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'A', text: 'A) 28,0 g/mol (N₂)' },
                { id: 'B', text: 'B) 32,0 g/mol (O₂)' },
                { id: 'C', text: 'C) 44,0 g/mol (N₂O / CO₂)' },
                { id: 'D', text: 'D) 58,0 g/mol' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    if (!isQuizSubmitted) setSelectedQuizOption(opt.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${
                    selectedQuizOption === opt.id
                      ? 'bg-red-50 border-red-500 text-neutral-900 font-semibold'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  } ${isQuizSubmitted && opt.id === 'C' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : ''}`}
                >
                  <span>{opt.text}</span>
                  {isQuizSubmitted && opt.id === 'C' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isQuizSubmitted && selectedQuizOption === opt.id && opt.id !== 'C' && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            {!isQuizSubmitted ? (
              <button
                disabled={!selectedQuizOption}
                onClick={() => setIsQuizSubmitted(true)}
                className="w-full py-2 bg-red-600 disabled:bg-neutral-300 text-white rounded-lg font-bold text-xs transition-colors shadow-xs"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <div className="p-3 bg-white rounded-lg border border-neutral-200 text-[11px] shadow-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Respuesta Correcta: Opción C (44,0 g/mol)</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Explicación del Prof. Aguilar:</strong> La masa molar se calcula directamente dividiendo la masa en gramos entre el número de moles: MM = masa / moles = 11,0 g / 0,25 mol = 44,0 g/mol. Esta masa molar corresponde al óxido nitroso (N₂O), conocido anestésico por inhalación.
                </p>
                <button
                  onClick={() => {
                    setIsQuizSubmitted(false);
                    setSelectedQuizOption(null);
                  }}
                  className="mt-2 text-[10px] text-red-600 font-bold underline"
                >
                  Reintentar Pregunta
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
