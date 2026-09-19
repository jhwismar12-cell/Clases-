import React, { useState } from 'react';
import { Activity, Heart, ArrowDown, ArrowUp, Info, Table, Mountain, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

export const Scene6RespiratoryPhysiology: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'model' | 'table' | 'altitude' | 'quiz'>('model');

  // Alveolar partial pressures
  const [alveolarPO2, setAlveolarPO2] = useState<number>(100);
  const [alveolarPCO2, setAlveolarPCO2] = useState<number>(40);

  // Venous entry partial pressures
  const venousPO2 = 40;
  const venousPCO2 = 46;

  // Gradients
  const deltaO2 = alveolarPO2 - venousPO2;
  const deltaCO2 = venousPCO2 - alveolarPCO2;

  // Erythrocyte saturation approximation (Hill equation)
  const saturationO2 = Math.min(
    100,
    Math.round((Math.pow(alveolarPO2, 2.7) / (Math.pow(alveolarPO2, 2.7) + Math.pow(26.6, 2.7))) * 100)
  );

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Top Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('model')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'model'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Hematosis Alvéolo-Capilar</span>
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'table'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Tabla de Presiones Parciales</span>
          </button>
          <button
            onClick={() => setActiveTab('altitude')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'altitude'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>Caso Cuenca (2550 m)</span>
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
            <span>Autoevaluación 2.6</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1.5 font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            SatO₂: {saturationO2}%
          </span>
        </div>
      </div>

      {/* Tab 1: Modelo Anatómico de Hematosis */}
      {activeTab === 'model' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 text-xs">
          <div className="lg:col-span-8 bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div className="relative h-64 bg-white rounded-xl border border-neutral-200 p-3 overflow-hidden flex flex-col justify-between shadow-inner">
              {/* Saco Alveolar */}
              <div className="relative flex-1 bg-blue-50/60 rounded-xl p-3 border border-blue-200 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                    Saco Alveolar Pulmonar (Aire Fresco Inspirado)
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">PH₂O = 47 mmHg | PN₂ = 573 mmHg</span>
                </div>

                <div className="flex justify-around items-center my-1">
                  <div className="p-2 bg-white rounded-lg border border-blue-200 text-center shadow-xs">
                    <span className="text-[10px] text-blue-600 uppercase block font-bold">PO₂ Alveolar</span>
                    <span className="text-lg font-mono font-extrabold text-blue-600">{alveolarPO2} mmHg</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-200 text-center shadow-xs">
                    <span className="text-[10px] text-amber-600 uppercase block font-bold">PCO₂ Alveolar</span>
                    <span className="text-lg font-mono font-extrabold text-amber-600">{alveolarPCO2} mmHg</span>
                  </div>
                </div>
              </div>

              {/* Membrana Alvéolo-Capilar */}
              <div className="h-10 my-1 bg-neutral-100 rounded border-y border-dashed border-neutral-300 relative flex items-center justify-around px-8">
                <span className="absolute -top-2 left-2 text-[9px] bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-600 font-mono font-semibold">
                  Membrana Alvéolo-Capilar (0,5 µm de espesor)
                </span>

                <div className="flex items-center gap-1 text-xs text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-blue-200 shadow-xs">
                  <ArrowDown className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
                  <span>Difusión O₂ (ΔP = +{deltaO2} mmHg hacia sangre)</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-700 font-bold bg-white px-2 py-0.5 rounded border border-amber-200 shadow-xs">
                  <ArrowUp className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                  <span>Difusión CO₂ (ΔP = +{deltaCO2} mmHg hacia alvéolo)</span>
                </div>
              </div>

              {/* Capilar Pulmonar */}
              <div className="relative flex-1 bg-red-50/70 rounded-xl p-3 border border-red-200 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-neutral-600">
                  <span className="font-bold text-red-700">Flujo Sanguíneo Capilar: Extremo Venoso Desoxigenado</span>
                  <span className="font-bold text-emerald-700">Extremo Arterial Oxigenado (PO₂ = 100 mmHg)</span>
                </div>

                <div className="flex justify-between items-center px-4 font-mono font-bold text-xs mt-1">
                  <div className="text-blue-600 bg-white px-2 py-1 rounded border border-neutral-200 shadow-xs">
                    PO₂: {venousPO2} mmHg | PCO₂: {venousPCO2} mmHg
                  </div>
                  <div className="text-red-600 bg-white px-2 py-1 rounded border border-neutral-200 shadow-xs">
                    PO₂: {alveolarPO2} mmHg | PCO₂: {alveolarPCO2} mmHg
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-neutral-500 italic mt-2 text-center">
              El intercambio gaseoso ocurre por difusión pasiva simple a favor de gradiente de presión parcial.
            </p>
          </div>

          {/* Controls Column */}
          <div className="lg:col-span-4 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="font-bold text-red-600 uppercase text-[11px] block mb-2">
                Parámetros Ventilatorios del Paciente
              </span>

              <div className="mb-3">
                <div className="flex justify-between text-neutral-700 mb-1">
                  <span className="font-medium">PO₂ Alveolar:</span>
                  <span className="font-mono font-bold text-blue-600">{alveolarPO2} mmHg</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={130}
                  step={2}
                  value={alveolarPO2}
                  onChange={(e) => setAlveolarPO2(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-neutral-200 rounded cursor-pointer"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-neutral-700 mb-1">
                  <span className="font-medium">PCO₂ Alveolar:</span>
                  <span className="font-mono font-bold text-amber-600">{alveolarPCO2} mmHg</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={55}
                  step={1}
                  value={alveolarPCO2}
                  onChange={(e) => setAlveolarPCO2(Number(e.target.value))}
                  className="w-full accent-amber-600 h-1.5 bg-neutral-200 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 space-y-1 text-[11px] shadow-xs">
              <span className="font-bold text-neutral-800 block text-[10px] uppercase">
                Gradientes de Difusión:
              </span>
              <p className="text-blue-700 font-medium">
                • Oxígeno: 100 - 40 = <strong>60 mmHg</strong> de gradiente neto.
              </p>
              <p className="text-amber-700 font-medium">
                • Dióxido de carbono: 46 - 40 = <strong>6 mmHg</strong> (difunde rápido por alta solubilidad).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tabla de Presiones Parciales */}
      {activeTab === 'table' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between overflow-x-auto">
          <div>
            <span className="font-bold text-neutral-900 text-sm block mb-1">
              Tabla Cuantitativa de Presiones Parciales de Gases Respiratorios (Nivel del Mar)
            </span>
            <p className="text-neutral-600 text-[11px] mb-3">
              Valores estándar de la cátedra de Química Aplicada a la Medicina en mmHg:
            </p>

            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden border border-neutral-200 text-left">
              <thead>
                <tr className="bg-red-50 text-red-900 font-bold border-b border-red-200 text-[11px]">
                  <th className="p-2.5">Gas Respiratorio</th>
                  <th className="p-2.5">Aire Atmosférico Seco</th>
                  <th className="p-2.5">Aire Alveolar</th>
                  <th className="p-2.5">Sangre Venosa</th>
                  <th className="p-2.5">Sangre Arterial</th>
                  <th className="p-2.5">Tejidos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-[11px] text-neutral-800">
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Nitrógeno (N₂)</td>
                  <td className="p-2.5">594,0 mmHg</td>
                  <td className="p-2.5">573,0 mmHg</td>
                  <td className="p-2.5">573,0 mmHg</td>
                  <td className="p-2.5">573,0 mmHg</td>
                  <td className="p-2.5">573,0 mmHg</td>
                </tr>
                <tr className="bg-blue-50/40">
                  <td className="p-2.5 font-sans font-bold text-blue-800">Oxígeno (O₂)</td>
                  <td className="p-2.5 font-bold">160,0 mmHg</td>
                  <td className="p-2.5 font-bold text-blue-600">100,0 mmHg</td>
                  <td className="p-2.5 font-bold text-neutral-600">40,0 mmHg</td>
                  <td className="p-2.5 font-bold text-red-600">100,0 mmHg</td>
                  <td className="p-2.5 text-neutral-500">≤ 30,0 mmHg</td>
                </tr>
                <tr className="bg-amber-50/40">
                  <td className="p-2.5 font-sans font-bold text-amber-800">Dióxido de Carbono (CO₂)</td>
                  <td className="p-2.5">0,3 mmHg</td>
                  <td className="p-2.5 font-bold text-amber-600">40,0 mmHg</td>
                  <td className="p-2.5 font-bold text-amber-700">46,0 mmHg</td>
                  <td className="p-2.5 font-bold text-neutral-700">40,0 mmHg</td>
                  <td className="p-2.5 text-neutral-700">≥ 50,0 mmHg</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Vapor de Agua (H₂O)</td>
                  <td className="p-2.5">5,7 mmHg</td>
                  <td className="p-2.5">47,0 mmHg</td>
                  <td className="p-2.5">47,0 mmHg</td>
                  <td className="p-2.5">47,0 mmHg</td>
                  <td className="p-2.5">47,0 mmHg</td>
                </tr>
                <tr className="bg-neutral-100 font-bold">
                  <td className="p-2.5 font-sans">Presión Total</td>
                  <td className="p-2.5 text-red-600">760,0 mmHg</td>
                  <td className="p-2.5 text-red-600">760,0 mmHg</td>
                  <td className="p-2.5">—</td>
                  <td className="p-2.5">—</td>
                  <td className="p-2.5">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-neutral-200 text-neutral-600 text-[11px]">
            🩺 <strong>Nota:</strong> En el alvéolo el aire está humidificado al 100% a 37 °C, por lo que la presión de vapor de agua fija es de 47 mmHg.
          </div>
        </div>
      )}

      {/* Tab 3: Caso Clínico en Cuenca */}
      {activeTab === 'altitude' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mountain className="w-4 h-4 text-red-600" />
              <h4 className="font-bold text-sm text-neutral-900">
                Caso Clínico Aplicado: Fisiología de la Altitud en Cuenca (2550 m s.n.m.)
              </h4>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-bold text-neutral-900 mb-1">📋 Análisis de la Cátedra UCACUE:</p>
              <p className="text-neutral-700 leading-relaxed">
                En nuestra ciudad de Cuenca (2550 m sobre el nivel del mar), la presión atmosférica desciende a un promedio de <strong>560 mmHg</strong> (frente a 760 mmHg a nivel del mar). Aunque la fracción de oxígeno ambiental sigue siendo del 21% (FiO₂ = 0,21), la presión inspirada de oxígeno disminuye drásticamente:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-neutral-800 font-sans block mb-1">A Nivel del Mar (0 m s.n.m.):</span>
                <p className="text-neutral-700">PiO₂ = Patm · FiO₂</p>
                <p className="text-neutral-700 mt-1">PiO₂ = 760 mmHg · 0,21</p>
                <p className="text-blue-600 font-bold text-sm mt-1">PiO₂ = 159,6 mmHg (~160 mmHg)</p>
                <p className="text-[11px] font-sans text-neutral-500 mt-1">PO₂ alveolar habitual: 100 mmHg</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-red-200 shadow-xs">
                <span className="font-bold text-red-600 font-sans block mb-1">En Cuenca (2550 m s.n.m.):</span>
                <p className="text-neutral-700">PiO₂ = Patm · FiO₂</p>
                <p className="text-neutral-700 mt-1">PiO₂ = 560 mmHg · 0,21</p>
                <p className="text-red-600 font-bold text-sm mt-1">PiO₂ = 117,6 mmHg</p>
                <p className="text-[11px] font-sans text-neutral-600 mt-1">
                  PO₂ alveolar cae a ~67-70 mmHg, desencadenando hiperventilación compensatoria y aumento de síntesis de eritropoyetina (EPO).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-red-50 rounded border border-red-200 text-neutral-700 text-[11px]">
            🩺 <strong>Adaptación fisiológica:</strong> La hipoxia hipobárica relativa estimula los quimiorreceptores carotídeos para aumentar la ventilación por minuto.
          </div>
        </div>
      )}

      {/* Tab 4: Autoevaluación 2.6 */}
      {activeTab === 'quiz' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-neutral-900">Autoevaluación Formativa: Módulo 2.6</h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Pregunta 1 de 1</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-semibold text-neutral-900 text-[13px] leading-relaxed">
                ¿Cuál es el gradiente de presión parcial que impulsa la difusión pasiva del oxígeno desde el alvéolo pulmonar (PO₂ = 100 mmHg) hacia la sangre venosa desoxigenada que entra al capilar (PO₂ = 40 mmHg)?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'A', text: 'A) 6 mmHg' },
                { id: 'B', text: 'B) 40 mmHg' },
                { id: 'C', text: 'C) 60 mmHg' },
                { id: 'D', text: 'D) 100 mmHg' },
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
                  <span>Respuesta Correcta: Opción C (60 mmHg)</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Explicación del Prof. Aguilar:</strong> El gradiente de difusión del O₂ es la diferencia directa entre la presión parcial en el aire alveolar y la sangre venosa aferente: ΔPO₂ = PO₂(alvéolo) - PO₂(venoso) = 100 mmHg - 40 mmHg = 60 mmHg. Este gradiente garantiza que la sangre se oxigene completamente en apenas un tercio del trayecto capilar.
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
