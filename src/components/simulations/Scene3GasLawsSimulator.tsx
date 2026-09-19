import React, { useState } from 'react';
import { Gauge, Flame, Minimize2, Maximize2, RotateCcw, HelpCircle, CheckCircle2, XCircle, Calculator, Heart, ShieldAlert } from 'lucide-react';

type GasLawMode = 'boyle' | 'charles' | 'gay-lussac';

export const Scene3GasLawsSimulator: React.FC = () => {
  const [topTab, setTopTab] = useState<'simulator' | 'problem' | 'quiz'>('simulator');
  const [activeLaw, setActiveLaw] = useState<GasLawMode>('boyle');

  // Boyle variables: T constant (300K)
  const [boyleVolume, setBoyleVolume] = useState<number>(4.0); // Liters
  const boyleK = 4.0; // P * V = 4.0
  const boylePressure = (boyleK / boyleVolume).toFixed(2);

  // Charles variables: P constant (1 atm)
  const [charlesTempK, setCharlesTempK] = useState<number>(300);
  const charlesVolume = ((charlesTempK / 300) * 2.0).toFixed(2);

  // Gay-Lussac variables: V constant (2.0 L)
  const [gayLussacTempK, setGayLussacTempK] = useState<number>(300);
  const gayLussacPressure = ((gayLussacTempK / 300) * 1.0).toFixed(2);

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Top Section Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setTopTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              topTab === 'simulator'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            Simulador Tri-Proceso (Boyle / Charles / Gay-Lussac)
          </button>
          <button
            onClick={() => setTopTab('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              topTab === 'problem'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Problema Modelo 2.2</span>
          </button>
          <button
            onClick={() => setTopTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              topTab === 'quiz'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Autoevaluación 2.2</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          Módulo 2.2 • Procesos Cuantitativos
        </span>
      </div>

      {topTab === 'simulator' && (
        <div className="flex-1 flex flex-col gap-3">
          {/* Law Switcher Sub-Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setActiveLaw('boyle')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  activeLaw === 'boyle'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                1. Boyle (Isotérmico: T cte)
              </button>
              <button
                onClick={() => setActiveLaw('charles')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  activeLaw === 'charles'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                2. Charles (Isobárico: P cte)
              </button>
              <button
                onClick={() => setActiveLaw('gay-lussac')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  activeLaw === 'gay-lussac'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                3. Gay-Lussac (Isocórico: V cte)
              </button>
            </div>

            <button
              onClick={() => {
                setBoyleVolume(4.0);
                setCharlesTempK(300);
                setGayLussacTempK(300);
              }}
              className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-lg border border-neutral-200"
              title="Restablecer valores"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulator Workspace */}
          <div className="flex-1 flex flex-col md:flex-row gap-4 items-center">
            {/* Visual Cylinder with Hydraulic Piston */}
            <div className="relative w-full md:w-64 h-64 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center justify-end p-4 overflow-hidden shadow-inner">
              {/* Manometer indicator */}
              <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-neutral-200 text-xs shadow-xs">
                <Gauge className="w-3.5 h-3.5 text-red-600" />
                <span className="text-neutral-500 font-medium">Presión:</span>
                <span className="font-mono font-bold text-red-600">
                  {activeLaw === 'boyle'
                    ? `${boylePressure} atm`
                    : activeLaw === 'charles'
                    ? '1,00 atm (Fija)'
                    : `${gayLussacPressure} atm`}
                </span>
              </div>

              {/* Cylinder Shell */}
              <div className="relative w-44 h-48 border-2 border-neutral-400 rounded-b-xl border-t-0 bg-white overflow-hidden flex flex-col justify-end shadow-xs">
                {/* Piston Head */}
                <div
                  className="absolute left-0 right-0 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 border-y border-neutral-400 shadow-xs transition-all duration-200 z-10"
                  style={{
                    height: '18px',
                    bottom:
                      activeLaw === 'boyle'
                        ? `${(boyleVolume / 8.0) * 160}px`
                        : activeLaw === 'charles'
                        ? `${(Number(charlesVolume) / 5.0) * 160}px`
                        : '100px',
                  }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-4 h-24 bg-gradient-to-r from-neutral-300 to-neutral-400 border-x border-neutral-400" />
                </div>

                {/* Gas Volume Interior */}
                <div
                  className={`w-full transition-all duration-200 relative overflow-hidden ${
                    activeLaw === 'charles' || activeLaw === 'gay-lussac'
                      ? (activeLaw === 'charles' ? charlesTempK : gayLussacTempK) > 420
                        ? 'bg-red-100'
                        : 'bg-blue-50'
                      : 'bg-emerald-50'
                  }`}
                  style={{
                    height:
                      activeLaw === 'boyle'
                        ? `${(boyleVolume / 8.0) * 160}px`
                        : activeLaw === 'charles'
                        ? `${(Number(charlesVolume) / 5.0) * 160}px`
                        : '100px',
                  }}
                >
                  <div className="absolute inset-0 flex flex-wrap gap-2 p-2 items-center justify-around opacity-80">
                    {Array.from({ length: 18 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full animate-ping ${
                          (activeLaw === 'charles' ? charlesTempK : gayLussacTempK) > 400
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                        }`}
                        style={{ animationDuration: `${Math.random() * 0.8 + 0.4}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bunsen Burner Flame if Charles or Gay-Lussac */}
              {(activeLaw === 'charles' || activeLaw === 'gay-lussac') && (
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <Flame
                    className={`w-5 h-5 transition-colors ${
                      (activeLaw === 'charles' ? charlesTempK : gayLussacTempK) > 450
                        ? 'text-red-500 animate-bounce'
                        : (activeLaw === 'charles' ? charlesTempK : gayLussacTempK) > 320
                        ? 'text-amber-500'
                        : 'text-blue-400'
                    }`}
                  />
                  <span className="font-mono text-[11px] font-bold text-neutral-700">
                    {activeLaw === 'charles' ? charlesTempK : gayLussacTempK} K
                  </span>
                </div>
              )}
            </div>

            {/* Controls and Medical Application Description */}
            <div className="flex-1 w-full bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-red-600">
                    {activeLaw === 'boyle' && 'Ley de Boyle: P₁ · V₁ = P₂ · V₂'}
                    {activeLaw === 'charles' && 'Ley de Charles: V₁ / T₁ = V₂ / T₂'}
                    {activeLaw === 'gay-lussac' && 'Ley de Gay-Lussac: P₁ / T₁ = P₂ / T₂'}
                  </span>
                  <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-neutral-200">
                    {activeLaw === 'boyle' && 'T = Constante (300 K)'}
                    {activeLaw === 'charles' && 'P = Constante (1 atm)'}
                    {activeLaw === 'gay-lussac' && 'V = Constante (2 L)'}
                  </span>
                </div>

                {/* Slider Control based on active law */}
                {activeLaw === 'boyle' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-neutral-700 mb-1">
                      <span className="font-medium">Volumen del Contenedor (V):</span>
                      <span className="font-mono font-bold text-blue-600">{boyleVolume.toFixed(1)} L</span>
                    </div>
                    <input
                      type="range"
                      min={1.0}
                      max={8.0}
                      step={0.2}
                      value={boyleVolume}
                      onChange={(e) => setBoyleVolume(Number(e.target.value))}
                      className="w-full accent-red-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                      <span>1,0 L (Alta Presión: 4,0 atm)</span>
                      <span>8,0 L (Baja Presión: 0,5 atm)</span>
                    </div>
                  </div>
                )}

                {activeLaw === 'charles' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-neutral-700 mb-1">
                      <span className="font-medium">Temperatura Térmica (T):</span>
                      <span className="font-mono font-bold text-amber-600">{charlesTempK} K ({(charlesTempK - 273.15).toFixed(0)} °C)</span>
                    </div>
                    <input
                      type="range"
                      min={150}
                      max={600}
                      step={10}
                      value={charlesTempK}
                      onChange={(e) => setCharlesTempK(Number(e.target.value))}
                      className="w-full accent-amber-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[11px] p-2 bg-white rounded border border-neutral-200 font-mono">
                      <span>Volumen Resultante:</span>
                      <strong className="text-blue-600">{charlesVolume} L</strong>
                    </div>
                  </div>
                )}

                {activeLaw === 'gay-lussac' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-neutral-700 mb-1">
                      <span className="font-medium">Temperatura en Cilindro Rígido (T):</span>
                      <span className="font-mono font-bold text-red-600">{gayLussacTempK} K ({(gayLussacTempK - 273.15).toFixed(0)} °C)</span>
                    </div>
                    <input
                      type="range"
                      min={150}
                      max={600}
                      step={10}
                      value={gayLussacTempK}
                      onChange={(e) => setGayLussacTempK(Number(e.target.value))}
                      className="w-full accent-red-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[11px] p-2 bg-white rounded border border-neutral-200 font-mono">
                      <span>Presión Resultante en Paredes:</span>
                      <strong className="text-red-600">{gayLussacPressure} atm</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Medical Application Box */}
              <div className="p-3 bg-white rounded-lg border border-neutral-200 shadow-xs">
                {activeLaw === 'boyle' && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
                      <Heart className="w-3.5 h-3.5 text-red-600" />
                      <span>Fisiología: Mecánica Ventilatoria del Diafragma</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      En la <strong>inspiración</strong>, el diafragma se contrae y desciende aumentando el volumen torácico; la presión intrapulmonar cae por debajo de la atmosférica (-1 mmHg) permitiendo el ingreso pasivo de aire. En la <strong>espiración</strong>, el tórax se relaja, reduce su volumen y la presión intrapulmonar sube (+1 mmHg), expulsando el aire.
                    </p>
                  </div>
                )}

                {activeLaw === 'charles' && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      <span>Fisiología: Calentamiento del Aire Inspirado</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      Al inhalar 500 mL de aire ambiente a 20 °C (293,15 K), el aire entra a las vías respiratorias y alvéolos calentándose a la temperatura corporal constante de 37 °C (310,15 K). Por la Ley de Charles, el aire se expande térmicamente alcanzando un volumen final de ~529 mL.
                    </p>
                  </div>
                )}

                {activeLaw === 'gay-lussac' && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                      <span>Seguridad Médica: Cilindros de Oxígeno y Gases Anestésicos</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      Los cilindros hospitalarios son tanques rígidos de acero con volumen constante. Jamás deben exponerse al fuego o calentadores: al aumentar T en Kelvin, la presión interna se eleva proporcionalmente, provocando riesgo inminente de explosión por fallo estructural de la válvula.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Problema Modelo 2.2 */}
      {topTab === 'problem' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-red-600" />
              <h4 className="font-bold text-sm text-neutral-900">
                Problema Modelo 2.2: Expansión de Oxígeno Medicinal (Ley de Boyle)
              </h4>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-bold text-neutral-900 mb-1">📋 Enunciado Oficial de la Cátedra:</p>
              <p className="text-neutral-700 italic leading-relaxed">
                "Un cilindro de oxígeno medicinal de 10,0 L está cargado a una presión de 150,0 atm a 20 °C. ¿Qué volumen ocupará todo este oxígeno si se expande a la presión atmosférica de una sala de urgencias (1,0 atm) a temperatura constante?"
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-neutral-800 block mb-1">Paso 1: Identificación de datos y ley aplicable</span>
                <p className="text-neutral-600 mb-1">
                  Como la temperatura se mantiene constante (T = 20 °C), aplicamos la <strong>Ley de Boyle</strong>:
                </p>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 bg-neutral-50 rounded">P₁ = 150,0 atm | V₁ = 10,0 L</div>
                  <div className="p-2 bg-neutral-50 rounded">P₂ = 1,0 atm | V₂ = ?</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs font-mono">
                <span className="font-bold text-red-600 font-sans block mb-1">Paso 2: Ecuación y cálculo</span>
                <p className="text-neutral-700">P₁ · V₁ = P₂ · V₂</p>
                <p className="text-neutral-700 mt-1">V₂ = (P₁ · V₁) / P₂</p>
                <p className="text-neutral-700 mt-1">V₂ = (150,0 atm · 10,0 L) / (1,0 atm)</p>
                <p className="text-red-600 font-bold text-sm mt-2">V₂ = 1500,0 Litros</p>
                <p className="text-[11px] font-sans text-neutral-600 mt-1">
                  <strong>Conclusión médica:</strong> El cilindro comprimido de apenas 10 L puede suministrar 1500 Litros de oxígeno respirable a los pacientes en sala.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-neutral-200 text-center font-mono text-[11px] text-neutral-600">
            P₁ · V₁ = P₂ · V₂ (Proceso Isotérmico)
          </div>
        </div>
      )}

      {/* Tab: Autoevaluación 2.2 */}
      {topTab === 'quiz' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-neutral-900">Autoevaluación Formativa: Módulo 2.2</h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Pregunta 1 de 1</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-semibold text-neutral-900 text-[13px] leading-relaxed">
                Un volumen corriente respiratorio de 500 mL se inhala a 20 °C (293,15 K). ¿Qué volumen alcanzará en los alvéolos pulmonares a 37 °C (310,15 K) a presión constante?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'A', text: 'A) 472,5 mL' },
                { id: 'B', text: 'B) 500,0 mL' },
                { id: 'C', text: 'C) 529,0 mL' },
                { id: 'D', text: 'D) 625,0 mL' },
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
                  <span>Respuesta Correcta: Opción C (529,0 mL)</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Explicación del Prof. Aguilar:</strong> Aplicamos la Ley de Charles a presión constante: V₂ = (V₁ · T₂) / T₁ = (500 mL · 310,15 K) / 293,15 K = 529,0 mL. ¡Recuerden siempre convertir a Kelvin sumando 273,15!
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
