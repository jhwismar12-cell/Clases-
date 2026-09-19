import React, { useState } from 'react';
import { Activity, Zap, Shield, Sparkles, TrendingUp, Sliders, Info, CheckCircle2 } from 'lucide-react';

export const SceneBioProteinsEnzymes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aminoacids' | 'kinetics' | 'structures'>('kinetics');

  // Michaelis-Menten Kinetic Parameters
  const [substrate, setSubstrate] = useState<number>(2.0); // mM
  const [vmax, setVmax] = useState<number>(100); // umol/min
  const [km, setKm] = useState<number>(2.0); // mM
  const [inhibitionType, setInhibitionType] = useState<'none' | 'competitive' | 'noncompetitive'>('none');

  // Effective parameters considering inhibition
  const effectiveKm = inhibitionType === 'competitive' ? km * 2.5 : km;
  const effectiveVmax = inhibitionType === 'noncompetitive' ? vmax * 0.5 : vmax;

  // Calculate Vo = (Vmax * [S]) / (Km + [S])
  const currentVo = (effectiveVmax * substrate) / (effectiveKm + substrate);
  const normalVo = (vmax * substrate) / (km + substrate);

  // Generate curve points for SVG plot (from [S]=0 to [S]=15 mM)
  const maxS = 15;
  const curvePoints: string[] = [];
  const inhibitedPoints: string[] = [];

  for (let s = 0; s <= maxS; s += 0.25) {
    const x = (s / maxS) * 360 + 40; // SVG x coordinate
    const vNormal = (vmax * s) / (km + s);
    const yNormal = 200 - (vNormal / 120) * 160; // SVG y coordinate
    curvePoints.push(`${x.toFixed(1)},${yNormal.toFixed(1)}`);

    if (inhibitionType !== 'none') {
      const vInh = (effectiveVmax * s) / (effectiveKm + s);
      const yInh = 200 - (vInh / 120) * 160;
      inhibitedPoints.push(`${x.toFixed(1)},${yInh.toFixed(1)}`);
    }
  }

  // Current point on plot
  const currentX = (substrate / maxS) * 360 + 40;
  const currentY = 200 - (currentVo / 120) * 160;

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Módulo 3.4: Aminoácidos, Proteínas & Cinética Enzimática de Michaelis-Menten
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              V₀ = (V_max · [S]) / (K_m + [S]) • Inhibición Competitiva vs No Competitiva
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('kinetics')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'kinetics'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Cinética Enzimática
          </button>
          <button
            onClick={() => setActiveTab('aminoacids')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'aminoacids'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Aminoácidos & Enlace Peptídico
          </button>
          <button
            onClick={() => setActiveTab('structures')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'structures'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Estructuras 1° a 4°
          </button>
        </div>
      </div>

      {/* Tab 1: Michaelis-Menten Interactive Simulator */}
      {activeTab === 'kinetics' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto">
          {/* Plot Area */}
          <div className="lg:col-span-7 flex flex-col bg-slate-50/70 rounded-xl border border-neutral-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#E51B23]" />
                Curva de Saturación de Michaelis-Menten: V₀ vs [S]
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600">
                [S] = {substrate.toFixed(1)} mM → V₀ = {currentVo.toFixed(1)} μmol/min
              </span>
            </div>

            {/* SVG Plot */}
            <div className="relative bg-white rounded-lg border border-neutral-200 p-2 shadow-xs">
              <svg viewBox="0 0 420 230" className="w-full h-auto">
                {/* Grid lines */}
                <line x1="40" y1="40" x2="400" y2="40" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="80" x2="400" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="120" x2="400" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="160" x2="400" y2="160" stroke="#E2E8F0" strokeDasharray="3 3" />

                {/* Axes */}
                <line x1="40" y1="200" x2="405" y2="200" stroke="#64748B" strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="200" stroke="#64748B" strokeWidth="2" />

                {/* Axis Labels */}
                <text x="210" y="222" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">
                  Concentración de Sustrato [S] (mM)
                </text>
                <text
                  x="-110"
                  y="15"
                  fontSize="10"
                  fill="#475569"
                  textAnchor="middle"
                  fontWeight="bold"
                  transform="rotate(-90)"
                >
                  Velocidad V₀ (μmol/min)
                </text>

                {/* Vmax asymptote reference line */}
                <line
                  x1="40"
                  y1={200 - (vmax / 120) * 160}
                  x2="400"
                  y2={200 - (vmax / 120) * 160}
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x="395"
                  y={195 - (vmax / 120) * 160}
                  fontSize="9"
                  fill="#64748B"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  Vmax = {vmax}
                </text>

                {/* 1/2 Vmax line */}
                <line
                  x1="40"
                  y1={200 - (vmax / 2 / 120) * 160}
                  x2={(km / maxS) * 360 + 40}
                  y2={200 - (vmax / 2 / 120) * 160}
                  stroke="#3B82F6"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <line
                  x1={(km / maxS) * 360 + 40}
                  y1={200 - (vmax / 2 / 120) * 160}
                  x2={(km / maxS) * 360 + 40}
                  y2="200"
                  stroke="#3B82F6"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text
                  x={(km / maxS) * 360 + 40}
                  y="195"
                  fontSize="9"
                  fill="#2563EB"
                  textAnchor="middle"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Km
                </text>

                {/* Normal Curve */}
                <polyline
                  points={curvePoints.join(' ')}
                  fill="none"
                  stroke={inhibitionType === 'none' ? '#E51B23' : '#94A3B8'}
                  strokeWidth={inhibitionType === 'none' ? '3' : '1.5'}
                />

                {/* Inhibited Curve */}
                {inhibitionType !== 'none' && (
                  <polyline
                    points={inhibitedPoints.join(' ')}
                    fill="none"
                    stroke="#E51B23"
                    strokeWidth="3"
                  />
                )}

                {/* Current operating point */}
                <circle cx={currentX} cy={currentY} r="5.5" fill="#E51B23" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            {/* Diagnostic readout */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-[10px] text-neutral-500 block">Vmax Efectiva</span>
                <span className="font-bold text-neutral-900 font-mono">{effectiveVmax.toFixed(1)} μmol/min</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-[10px] text-neutral-500 block">Km Efectiva</span>
                <span className="font-bold text-blue-600 font-mono">{effectiveKm.toFixed(1)} mM</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs">
                <span className="text-[10px] text-neutral-500 block">V₀ Actual</span>
                <span className="font-extrabold text-[#E51B23] font-mono">{currentVo.toFixed(1)} μmol/min</span>
              </div>
            </div>
          </div>

          {/* Controls & Clinical Insight */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {/* Sliders Card */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
              <span className="text-[11px] font-bold text-neutral-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-neutral-600" />
                Ajuste de Parámetros Cinéticos
              </span>

              {/* Substrate Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-600 font-medium">Concentración de Sustrato [S]:</span>
                  <span className="font-mono font-bold text-[#E51B23]">{substrate.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="14.0"
                  step="0.1"
                  value={substrate}
                  onChange={(e) => setSubstrate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#E51B23]"
                />
              </div>

              {/* Vmax Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-600 font-medium">Velocidad Máxima (Vmax):</span>
                  <span className="font-mono font-bold text-neutral-800">{vmax} μmol/min</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  step="5"
                  value={vmax}
                  onChange={(e) => setVmax(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                />
              </div>

              {/* Km Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-600 font-medium">Constante de Afinidad (Km):</span>
                  <span className="font-mono font-bold text-blue-600">{km.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.5"
                  value={km}
                  onChange={(e) => setKm(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[10px] text-neutral-500">
                  * Menor Km implica mayor afinidad de la enzima por el sustrato.
                </p>
              </div>

              {/* Inhibitor Selector */}
              <div className="space-y-1 pt-1 border-t border-neutral-200">
                <span className="text-[11px] font-bold text-neutral-800 block">Tipo de Inhibición Farmacológica:</span>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setInhibitionType('none')}
                    className={`py-1 text-[10px] rounded border font-medium cursor-pointer transition-colors ${
                      inhibitionType === 'none'
                        ? 'bg-[#E51B23] text-white border-[#E51B23] font-bold'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    Sin Inhibidor
                  </button>
                  <button
                    onClick={() => setInhibitionType('competitive')}
                    className={`py-1 text-[10px] rounded border font-medium cursor-pointer transition-colors ${
                      inhibitionType === 'competitive'
                        ? 'bg-blue-600 text-white border-blue-600 font-bold'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    Competitiva
                  </button>
                  <button
                    onClick={() => setInhibitionType('noncompetitive')}
                    className={`py-1 text-[10px] rounded border font-medium cursor-pointer transition-colors ${
                      inhibitionType === 'noncompetitive'
                        ? 'bg-amber-600 text-white border-amber-600 font-bold'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    No Competitiva
                  </button>
                </div>
              </div>
            </div>

            {/* Kinetic Explanation */}
            <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 text-[11px] text-neutral-800 space-y-1.5">
              <div className="font-bold text-[#E51B23] flex items-center gap-1 text-[10px] uppercase">
                <Info className="w-3.5 h-3.5" />
                Mecanismo Fisiopatológico:
              </div>
              {inhibitionType === 'none' && (
                <p>
                  Cuando <strong>[S] = Km</strong>, la velocidad inicial es exactamente la mitad de Vmax (<strong>V₀ = Vmax / 2</strong>). Las enzimas reducen la energía de activación (Ea) sin modificar la constante de equilibrio (Keq).
                </p>
              )}
              {inhibitionType === 'competitive' && (
                <p>
                  <strong>Inhibidor Competitivo</strong> (ej. Estatinas sobre la HMG-CoA reductasa, Ibuprofeno sobre COX): Compite por el sitio activo. <strong>Aumenta la Km aparente</strong> (menor afinidad), pero <strong>Vmax no cambia</strong> porque concentraciones elevadas de sustrato desplazan al inhibidor.
                </p>
              )}
              {inhibitionType === 'noncompetitive' && (
                <p>
                  <strong>Inhibidor No Competitivo</strong> (ej. Metales pesados o toxinas alostéricas): Se une a un sitio alostérico. <strong>Disminuye la Vmax</strong> porque incapacita catalíticamente a la enzima, mientras que la <strong>Km permanece inalterada</strong>.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Amino Acids and Peptide Bond */}
      {activeTab === 'aminoacids' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto">
          {/* Left: Structure of an Amino Acid */}
          <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
            <span className="text-xs font-bold text-neutral-900 block">
              Estructura Fundamental & Estado Zwitteriónico (pH Fisiológico 7.4)
            </span>

            {/* Chemical Diagram Card */}
            <div className="p-4 bg-white rounded-lg border border-neutral-200 text-center font-mono space-y-3 shadow-xs">
              <div className="inline-block p-3 bg-neutral-50 rounded-lg border border-neutral-300">
                <div className="text-xs text-neutral-400 mb-1">H</div>
                <div className="text-xs text-neutral-400">|</div>
                <div className="text-sm font-bold flex items-center justify-center gap-2">
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    H₃N⁺ (Amino)
                  </span>
                  <span>—</span>
                  <span className="text-neutral-900 bg-neutral-200 px-2.5 py-0.5 rounded font-bold">
                    Cα
                  </span>
                  <span>—</span>
                  <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    COO⁻ (Carboxilo)
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-1">|</div>
                <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                  R (Cadena Lateral Variable)
                </div>
              </div>

              <div className="text-left text-[11px] text-neutral-700 space-y-1 bg-neutral-50 p-2.5 rounded border border-neutral-200">
                <p><strong>• Carbono Quiral (Cα):</strong> Confiere actividad óptica estereoisomérica (L-aminoácidos en proteínas humanas).</p>
                <p><strong>• Zwitterión:</strong> A pH 7.4, el grupo amino está protonado (-NH₃⁺) y el carboxilo desprotonado (-COO⁻), con carga neta neutra en el punto isoeléctrico (pI).</p>
                <p><strong>• Cadena R:</strong> Determina la hidrofobicidad, polaridad, acidez o basicidad de los 20 aminoácidos estándar.</p>
              </div>
            </div>
          </div>

          {/* Right: The Peptide Bond */}
          <div className="lg:col-span-6 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
            <span className="text-xs font-bold text-neutral-900 block">
              Enlace Peptídico: Formación por Condensación & Carácter Parcial de Doble Enlace
            </span>

            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-3 shadow-xs">
              <div className="p-2.5 bg-red-50/60 rounded-lg border border-red-200 text-center font-mono text-xs">
                <span className="text-neutral-700">R₁-COOH + H₂N-R₂ </span>
                <span className="text-[#E51B23] font-bold">→ R₁-CO—NH-R₂ + H₂O</span>
              </div>

              <div className="text-[11px] text-neutral-700 space-y-2">
                <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                  <strong className="text-neutral-900 block mb-0.5">Propiedades Físico-Químicas Clave:</strong>
                  <ul className="list-disc list-inside space-y-1 text-neutral-600">
                    <li>Es un enlace amida covalente muy estable generado en los ribosomas.</li>
                    <li>Posee <strong>un 40% de carácter de doble enlace</strong> por resonancia entre el oxígeno carbonílico y el nitrógeno.</li>
                    <li><strong>Rigidez y Coplanaridad:</strong> No existe rotación libre sobre el enlace C—N, restringiendo la cadena a conformaciones espaciales estables.</li>
                    <li>Configuración predominante en forma <em>trans</em> para minimizar el impedimento estérico.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Protein Structures 1° to 4° */}
      {activeTab === 'structures' && (
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto">
          {/* 1° Structure */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#E51B23]">1° Primaria</span>
              <span className="text-[10px] font-mono text-neutral-500">Secuencia lineal</span>
            </div>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              Secuencia ordenada y genéticamente codificada de aminoácidos unidos covalentemente por enlaces peptídicos.
            </p>
            <div className="p-2 bg-neutral-50 rounded text-[10px] text-neutral-600 border border-neutral-200">
              <strong>Ejemplo Clínico:</strong> En la anemia falciforme, la mutación puntual en la cadena β de hemoglobina (Glutámico 6 → Valina) altera toda la solubilidad proteica.
            </div>
          </div>

          {/* 2° Structure */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-blue-600">2° Secundaria</span>
              <span className="text-[10px] font-mono text-neutral-500">Plegamiento local</span>
            </div>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              Arreglo periódico estabilizado por puentes de hidrógeno entre grupos C=O y N—H del esqueleto peptídico.
            </p>
            <div className="p-2 bg-blue-50/60 rounded text-[10px] text-neutral-700 border border-blue-200">
              <strong>Motivos:</strong> α-Hélice (3.6 residuos por vuelta, ej. hemoglobina) y Lámina β-plegada paralela o antiparalela (ej. fibroína de seda).
            </div>
          </div>

          {/* 3° Structure */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-600">3° Terciaria</span>
              <span className="text-[10px] font-mono text-neutral-500">Conformación 3D</span>
            </div>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              Plegamiento tridimensional completo de la cadena monomérica por interacciones entre cadenas laterales (R).
            </p>
            <div className="p-2 bg-amber-50/60 rounded text-[10px] text-neutral-700 border border-amber-200">
              <strong>Fuerzas:</strong> Puentes disulfuro covalentes (—S—S— entre cisteínas), interacciones hidrofóbicas internas y puentes de sal iónicos.
            </div>
          </div>

          {/* 4° Structure */}
          <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-green-700">4° Cuaternaria</span>
              <span className="text-[10px] font-mono text-neutral-500">Multímero / Oligómero</span>
            </div>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              Asociación de dos o más cadenas polipeptídicas (subunidades) para formar un complejo proteico funcional.
            </p>
            <div className="p-2 bg-green-50/60 rounded text-[10px] text-neutral-700 border border-green-200">
              <strong>Ejemplo Fisiológico:</strong> Tetrámero de Hemoglobina (α₂β₂) que permite la cooperatividad alostérica en el transporte de O₂.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
