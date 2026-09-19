import React, { useState } from 'react';
import { Calculator, Box, Sparkles, HelpCircle, CheckCircle2, XCircle, ArrowRight, Gauge, Thermometer } from 'lucide-react';

export const SceneBlock2CombinedAvogadro: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'cnpt' | 'problem' | 'quiz'>('calculator');

  // Combined Gas Law Calculator State
  // (P1 * V1) / T1 = (P2 * V2) / T2  -> Calculate V2 by default, or allow selecting target
  const [targetVar, setTargetVar] = useState<'V2' | 'P2' | 'T2'>('V2');

  const [p1, setP1] = useState<number>(1.2);
  const [v1, setV1] = useState<number>(4.0);
  const [t1Celsius, setT1Celsius] = useState<number>(27.0);

  const [p2, setP2] = useState<number>(2.4);
  const [v2, setV2] = useState<number>(2.4);
  const [t2Celsius, setT2Celsius] = useState<number>(87.0);

  const t1Kelvin = t1Celsius + 273.15;
  const t2Kelvin = t2Celsius + 273.15;

  let calculatedResult = 0;
  if (targetVar === 'V2') {
    // V2 = (P1 * V1 * T2) / (T1 * P2)
    calculatedResult = (p1 * v1 * t2Kelvin) / ((t1Kelvin || 1) * (p2 || 1));
  } else if (targetVar === 'P2') {
    // P2 = (P1 * V1 * T2) / (T1 * V2)
    calculatedResult = (p1 * v1 * t2Kelvin) / ((t1Kelvin || 1) * (v2 || 1));
  } else if (targetVar === 'T2') {
    // T2 = (P2 * V2 * T1) / (P1 * V1)
    calculatedResult = (p2 * v2 * t1Kelvin) / ((p1 * v1) || 1);
  }

  // Avogadro & CNPT Interactive State
  const [molesInput, setMolesInput] = useState<number>(1.0);
  const molarVolumeCNPT = (molesInput * 22.4).toFixed(2);
  const moleculesCount = (molesInput * 6.022).toFixed(3);

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Navigation Bar */}
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
            <span>Calculadora de Ley Combinada</span>
          </button>
          <button
            onClick={() => setActiveTab('cnpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'cnpt'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Ley de Avogadro y CNPT (22,4 L)</span>
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'problem'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problema Modelo 2.3</span>
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
            <span>Autoevaluación 2.3</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          Módulo 2.3 • Masa Constante y Volumen Molar
        </span>
      </div>

      {/* Tab 1: Calculadora de Ley Combinada */}
      {activeTab === 'calculator' && (
        <div className="flex-1 flex flex-col gap-3 text-xs">
          {/* Equation Banner */}
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                Fórmula Maestra de Masa Constante
              </span>
              <h3 className="text-base font-mono font-extrabold text-neutral-900 mt-0.5">
                (P₁ · V₁) / T₁ = (P₂ · V₂) / T₂
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-neutral-200 font-medium">
              <span className="text-neutral-500">Incógnita a calcular:</span>
              <select
                value={targetVar}
                onChange={(e) => setTargetVar(e.target.value as any)}
                className="bg-transparent font-mono font-bold text-red-600 border-none outline-hidden cursor-pointer"
              >
                <option value="V2">Volumen Final (V₂)</option>
                <option value="P2">Presión Final (P₂)</option>
                <option value="T2">Temperatura Final (T₂)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
            {/* Estado 1 (Inicial) */}
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 mb-2">
                  <Gauge className="w-3.5 h-3.5 text-neutral-700" />
                  Estado Inicial 1 (Parámetros Conocidos):
                </span>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                      <span>Presión Inicial (P₁):</span>
                      <strong className="font-mono text-red-600">{p1.toFixed(2)} atm</strong>
                    </div>
                    <input
                      type="range"
                      min={0.2}
                      max={5.0}
                      step={0.1}
                      value={p1}
                      onChange={(e) => setP1(Number(e.target.value))}
                      className="w-full accent-red-600 h-1 bg-neutral-200 rounded"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                      <span>Volumen Inicial (V₁):</span>
                      <strong className="font-mono text-blue-600">{v1.toFixed(1)} L</strong>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={15.0}
                      step={0.5}
                      value={v1}
                      onChange={(e) => setV1(Number(e.target.value))}
                      className="w-full accent-blue-600 h-1 bg-neutral-200 rounded"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                      <span>Temperatura Inicial (T₁):</span>
                      <strong className="font-mono text-amber-600">{t1Celsius} °C ({t1Kelvin.toFixed(1)} K)</strong>
                    </div>
                    <input
                      type="range"
                      min={-20}
                      max={150}
                      step={1}
                      value={t1Celsius}
                      onChange={(e) => setT1Celsius(Number(e.target.value))}
                      className="w-full accent-amber-600 h-1 bg-neutral-200 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 bg-white rounded border border-neutral-200 font-mono text-[11px] text-center text-neutral-600">
                Cociente Inicial (P₁·V₁ / T₁): {((p1 * v1) / t1Kelvin).toFixed(4)}
              </div>
            </div>

            {/* Estado 2 (Final / Incógnita) */}
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 mb-2">
                  <Thermometer className="w-3.5 h-3.5 text-red-600" />
                  Estado Final 2:
                </span>

                <div className="space-y-2">
                  {targetVar !== 'P2' && (
                    <div>
                      <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                        <span>Presión Final (P₂):</span>
                        <strong className="font-mono text-red-600">{p2.toFixed(2)} atm</strong>
                      </div>
                      <input
                        type="range"
                        min={0.2}
                        max={5.0}
                        step={0.1}
                        value={p2}
                        onChange={(e) => setP2(Number(e.target.value))}
                        className="w-full accent-red-600 h-1 bg-neutral-200 rounded"
                      />
                    </div>
                  )}

                  {targetVar !== 'V2' && (
                    <div>
                      <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                        <span>Volumen Final (V₂):</span>
                        <strong className="font-mono text-blue-600">{v2.toFixed(1)} L</strong>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={15.0}
                        step={0.5}
                        value={v2}
                        onChange={(e) => setV2(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1 bg-neutral-200 rounded"
                      />
                    </div>
                  )}

                  {targetVar !== 'T2' && (
                    <div>
                      <div className="flex justify-between text-[11px] text-neutral-700 mb-0.5">
                        <span>Temperatura Final (T₂):</span>
                        <strong className="font-mono text-amber-600">{t2Celsius} °C ({t2Kelvin.toFixed(1)} K)</strong>
                      </div>
                      <input
                        type="range"
                        min={-20}
                        max={150}
                        step={1}
                        value={t2Celsius}
                        onChange={(e) => setT2Celsius(Number(e.target.value))}
                        className="w-full accent-amber-600 h-1 bg-neutral-200 rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Display Calculated Result */}
              <div className="mt-3 p-3 bg-white rounded-xl border border-red-200 shadow-xs text-center">
                <span className="text-[10px] uppercase font-bold text-red-600 block">
                  Valor Calculado de {targetVar}:
                </span>
                <span className="text-xl font-mono font-extrabold text-neutral-900 block my-0.5">
                  {calculatedResult.toFixed(2)}{' '}
                  <span className="text-sm font-sans font-normal text-neutral-500">
                    {targetVar === 'V2' ? 'Litros (L)' : targetVar === 'P2' ? 'atm' : 'Kelvin (K)'}
                  </span>
                </span>
                {targetVar === 'T2' && (
                  <span className="text-[11px] font-mono text-neutral-500">
                    = {(calculatedResult - 273.15).toFixed(1)} °C
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ley de Avogadro y CNPT */}
      {activeTab === 'cnpt' && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-neutral-900 text-xs flex items-center gap-1.5 mb-2">
                <Box className="w-4 h-4 text-red-600" />
                Ley de Avogadro: V₁ / n₁ = V₂ / n₂
              </span>
              <p className="text-neutral-600 leading-relaxed mb-3">
                A temperatura y presión constantes, el volumen ocupado por cualquier gas es directamente proporcional a su cantidad de sustancia en moles (n).
              </p>

              <div className="mb-3">
                <div className="flex justify-between text-neutral-700 mb-1">
                  <span className="font-medium">Cantidad de Moles (n):</span>
                  <span className="font-mono font-bold text-blue-600">{molesInput.toFixed(2)} moles</span>
                </div>
                <input
                  type="range"
                  min={0.25}
                  max={5.0}
                  step={0.25}
                  value={molesInput}
                  onChange={(e) => setMolesInput(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-1.5 shadow-xs font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Volumen en CNPT:</span>
                  <strong className="text-red-600">{molarVolumeCNPT} Litros</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Moléculas (Avogadro):</span>
                  <strong className="text-neutral-800">{moleculesCount} × 10²³</strong>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-[11px] text-blue-900 mt-2">
              <strong>🩺 Fisiología:</strong> Al insuflar un balón resucitador manual (Ambú), cada bombeo agrega moles de gas incrementando el volumen pulmonar proporcionalmente según la Ley de Avogadro.
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-neutral-900 text-xs block mb-2">
                Condiciones Normales de Presión y Temperatura (CNPT):
              </span>
              <ul className="space-y-2 text-neutral-700">
                <li className="p-2.5 bg-white rounded-lg border border-neutral-200 flex items-center justify-between shadow-xs">
                  <span>Temperatura Estándar:</span>
                  <strong className="font-mono text-neutral-900">0 °C = 273,15 K</strong>
                </li>
                <li className="p-2.5 bg-white rounded-lg border border-neutral-200 flex items-center justify-between shadow-xs">
                  <span>Presión Estándar:</span>
                  <strong className="font-mono text-neutral-900">1,0 atm = 760 mmHg</strong>
                </li>
                <li className="p-2.5 bg-white rounded-lg border border-neutral-200 flex items-center justify-between shadow-xs">
                  <span>Volumen Molar Estándar:</span>
                  <strong className="font-mono text-red-600">22,4 Litros / mol</strong>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-white rounded-xl border border-red-200 text-center shadow-xs">
              <span className="text-[10px] text-neutral-500 uppercase font-bold block">
                Cubo de Volumen Molar Estándar
              </span>
              <span className="text-2xl font-mono font-extrabold text-red-600 block">
                22,4 L
              </span>
              <span className="text-[10px] text-neutral-600">
                Ocupado por 1 mol de gas ideal en CNPT (O₂, N₂, CO₂, He, etc.)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Problema Modelo 2.3 */}
      {activeTab === 'problem' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-red-600" />
              <h4 className="font-bold text-sm text-neutral-900">
                Problema Modelo 2.3: Espirometría y Cámara Hiperbárica (Ley Combinada)
              </h4>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-bold text-neutral-900 mb-1">📋 Enunciado Oficial de la Cátedra:</p>
              <p className="text-neutral-700 italic leading-relaxed">
                "Una muestra de nitrógeno obtenida en una prueba de espirometría ocupa 4,0 L a 1,2 atm y 27,0 °C (300,15 K). Si la muestra se traslada a una cámara hiperbárica donde la presión sube a 2,4 atm y la temperatura aumenta a 87,0 °C (360,15 K), ¿cuál será el volumen final de la muestra?"
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-neutral-800 block mb-1">Paso 1: Organización de Datos</span>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 bg-neutral-50 rounded">
                    Estado 1: P₁ = 1,2 atm | V₁ = 4,0 L | T₁ = 300,15 K
                  </div>
                  <div className="p-2 bg-neutral-50 rounded">
                    Estado 2: P₂ = 2,4 atm | T₂ = 360,15 K | V₂ = ?
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs font-mono">
                <span className="font-bold text-red-600 font-sans block mb-1">Paso 2: Aplicación y Despeje de V₂</span>
                <p className="text-neutral-700">(P₁ · V₁) / T₁ = (P₂ · V₂) / T₂</p>
                <p className="text-neutral-700 mt-1">V₂ = (P₁ · V₁ · T₂) / (T₁ · P₂)</p>
                <p className="text-neutral-700 mt-1">V₂ = (1,2 atm · 4,0 L · 360,15 K) / (300,15 K · 2,4 atm)</p>
                <p className="text-red-600 font-bold text-sm mt-2">V₂ = 2,40 Litros</p>
                <p className="text-[11px] font-sans text-neutral-600 mt-1">
                  <strong>Análisis:</strong> El aumento de presión comprimió el gas a la mitad, pero el aumento térmico amortiguó la reducción, dando un volumen final de 2,40 L.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-neutral-200 text-center font-mono text-[11px] text-neutral-600">
            (P₁ · V₁) / T₁ = (P₂ · V₂) / T₂ (Ley Combinada para n constante)
          </div>
        </div>
      )}

      {/* Tab 4: Autoevaluación 2.3 */}
      {activeTab === 'quiz' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-neutral-900">Autoevaluación Formativa: Módulo 2.3</h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Pregunta 1 de 1</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-semibold text-neutral-900 text-[13px] leading-relaxed">
                ¿Qué volumen en Litros ocuparán 3,5 moles de dióxido de carbono (CO₂) medicinal medidos en Condiciones Normales de Presión y Temperatura (CNPT: 0 °C y 1 atm)?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'A', text: 'A) 22,4 L' },
                { id: 'B', text: 'B) 56,0 L' },
                { id: 'C', text: 'C) 78,4 L' },
                { id: 'D', text: 'D) 100,0 L' },
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
                  <span>Respuesta Correcta: Opción C (78,4 L)</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Explicación del Prof. Aguilar:</strong> En Condiciones Normales de Presión y Temperatura (CNPT), 1 mol de cualquier gas ideal ocupa exactamente 22,4 Litros. Por lo tanto: V = 3,5 moles × 22,4 L/mol = 78,4 Litros.
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
