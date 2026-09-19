import React, { useState } from 'react';
import { Lightbulb, Zap, Droplets, BatteryCharging, Check, AlertCircle } from 'lucide-react';

export const SceneBlock1ChemicalBonds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ionico' | 'covalente'>('ionico');
  const [selectedSolution, setSelectedSolution] = useState<'agua-pura' | 'nacl' | 'glucosa' | 'kcl'>('nacl');
  const [covalentBondType, setCovalentBondType] = useState<'simple' | 'doble' | 'triple' | 'polar'>('polar');

  // Solution properties for conductivity
  const solutionConfig = {
    'agua-pura': {
      name: 'Agua Pura Destilada (H₂O)',
      type: 'Molecular Covalente Polar',
      dissociates: false,
      ions: 'Sin iones libres significativos (Kw = 10⁻¹⁴)',
      conducts: false,
      lightIntensity: 0,
      clinicalNote: 'No conduce electricidad. No se debe infundir sola por riesgo de hemólisis fatal.',
    },
    nacl: {
      name: 'Solución de NaCl al 0,9% (Suero Fisiológico)',
      type: 'Electrolito Fuerte (Iónico)',
      dissociates: true,
      ions: 'Na⁺ (154 mEq/L) y Cl⁻ (154 mEq/L) hidratados',
      conducts: true,
      lightIntensity: 100,
      clinicalNote: 'Excelente conductor. Fundamental para la volemia y conducción de potenciales de acción.',
    },
    glucosa: {
      name: 'Solución de Dextrosa al 5% (Glucosa)',
      type: 'Compuesto Covalente No Electrolito',
      dissociates: false,
      ions: 'Moléculas intactas de glucosa solvatadas por puentes de H',
      conducts: false,
      lightIntensity: 0,
      clinicalNote: 'Solución no conductora. Aporta agua libre y calorías sin aportar cargas iónicas.',
    },
    kcl: {
      name: 'Cloruro de Potasio (KCl) Intravenoso',
      type: 'Electrolito Fuerte (Iónico)',
      dissociates: true,
      ions: 'K⁺ y Cl⁻ disociados al 100%',
      conducts: true,
      lightIntensity: 100,
      clinicalNote: 'Altamente conductor. El K⁺ es el catión intracelular principal; nunca pasar en bolo directo.',
    },
  };

  const currentSolution = solutionConfig[selectedSolution];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-3 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-neutral-950 font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono tracking-tight text-neutral-100">
              CÁTEDRA 1.3: ENLACE QUÍMICO Y ELECTROLITOS
            </h3>
            <p className="text-[11px] text-neutral-400">
              Redes Iónicas, Conducción de Corriente y Enlaces Covalentes Polares
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('ionico')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              activeTab === 'ionico' ? 'bg-[#E51B23] text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Enlace Iónico & Electrolitos
          </button>
          <button
            onClick={() => setActiveTab('covalente')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              activeTab === 'covalente' ? 'bg-[#E51B23] text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Enlace Covalente & Polaridad
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4">
        {activeTab === 'ionico' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Left: Interactive Conductivity Lab */}
            <div className="lg:col-span-7 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
                  <BatteryCharging className="w-4 h-4 text-cyan-600" />
                  Prueba Experimental de Conductividad de Fluidos
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">Laboratorio 1 y 2 UCACUE</span>
              </div>

              {/* Solution Selector */}
              <div className="grid grid-cols-2 gap-2">
                {(['nacl', 'glucosa', 'kcl', 'agua-pura'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSolution(key)}
                    className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                      selectedSolution === key
                        ? 'border-cyan-600 bg-cyan-50/80 font-bold text-neutral-900 shadow-xs ring-1 ring-cyan-500/20'
                        : 'border-neutral-200 hover:bg-white text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{solutionConfig[key].name.split('(')[0]}</span>
                      {solutionConfig[key].conducts ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Circuit Visualization Graphic */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col items-center justify-center relative min-h-[160px]">
                {/* Circuit wire and lightbulb */}
                <div className="flex items-center gap-6 mb-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`p-3 rounded-full transition-all duration-300 ${
                        currentSolution.conducts
                          ? 'bg-amber-100 text-amber-500 shadow-lg shadow-amber-200 scale-110'
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      <Lightbulb className="w-7 h-7" />
                    </div>
                    <span
                      className={`text-[11px] font-bold font-mono mt-1 ${
                        currentSolution.conducts ? 'text-amber-600' : 'text-neutral-400'
                      }`}
                    >
                      {currentSolution.conducts ? 'CIRCUITO ACTIVO (CONDUCE)' : 'BOMBILLA APAGADA'}
                    </span>
                  </div>

                  {/* Beaker Container */}
                  <div className="w-32 h-24 border-2 border-neutral-300 border-t-0 rounded-b-xl relative bg-blue-50/50 flex flex-col justify-end p-2 overflow-hidden">
                    {/* Electrodes */}
                    <div className="absolute top-0 left-6 w-2 h-14 bg-neutral-600 rounded-b" />
                    <div className="absolute top-0 right-6 w-2 h-14 bg-neutral-600 rounded-b" />

                    {/* Ions animation representation */}
                    {currentSolution.conducts ? (
                      <div className="flex items-center justify-around text-[10px] font-mono font-bold text-cyan-800 animate-pulse">
                        <span className="bg-cyan-200 px-1 rounded-full">Na⁺</span>
                        <span className="bg-emerald-200 px-1 rounded-full">Cl⁻</span>
                        <span className="bg-cyan-200 px-1 rounded-full">K⁺</span>
                      </div>
                    ) : (
                      <div className="text-center text-[10px] font-mono text-neutral-400">
                        {selectedSolution === 'agua-pura' ? 'H₂O Neutra' : 'C₆H₁₂O₆ Intacta'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-neutral-800">{currentSolution.name}</span>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{currentSolution.ions}</p>
                </div>
              </div>

              {/* Clinical note */}
              <div className="p-2.5 bg-blue-50/70 rounded-lg border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Relevancia Médica:</strong> {currentSolution.clinicalNote}
                </div>
              </div>
            </div>

            {/* Right: Ionic lattice theory */}
            <div className="lg:col-span-5 p-3.5 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 font-mono">
                  Mecanismo Molecular
                </span>
                <h4 className="text-xs font-bold text-neutral-900 mt-1 mb-1">
                  Enlace Iónico: De la Red Cristalina al Electrolito
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Se produce por transferencia neta de electrones (diferencia de electronegatividad $\Delta EN \ge 1,7$). El sodio cede su electrón de valencia:
                </p>
                <div className="my-2 p-2 bg-neutral-50 rounded border border-neutral-200 font-mono text-xs text-center font-bold text-neutral-800">
                  Na (3s¹) + Cl (3s² 3p⁵) → Na⁺ [Ne] + Cl⁻ [Ar]
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg border border-neutral-200 bg-neutral-50/60">
                  <div className="font-bold text-xs text-neutral-800 mb-0.5">En Estado Sólido (Cristal):</div>
                  <p className="text-[11px] text-neutral-600">
                    Los iones están fijos en la red tridimensional cúbica; no hay electrones libres ni movimiento de cargas (aislante eléctrico).
                  </p>
                </div>

                <div className="p-2.5 rounded-lg border border-cyan-200 bg-cyan-50/60">
                  <div className="font-bold text-xs text-cyan-900 mb-0.5">En Disolución Acuosa (Plasma):</div>
                  <p className="text-[11px] text-cyan-800">
                    El agua rompe la red mediante esferas de solvatación. Los iones libres migran hacia cátodo y ánodo, conduciendo la bioelectricidad.
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 font-medium">
                ✓ Concentración plasmática clave: Na⁺ = 140 mEq/L • K⁺ = 4 mEq/L • Cl⁻ = 103 mEq/L
              </div>
            </div>
          </div>
        ) : (
          /* Covalent Bond View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            <div className="lg:col-span-7 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                  Órdenes de Enlace Covalente y Geometría
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">Compartición de pares de e⁻</span>
              </div>

              {/* Selector */}
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'simple', label: 'Simple (1 par)', ex: 'C—H, O—H' },
                  { id: 'doble', label: 'Doble (2 pares)', ex: 'O = O (Oxígeno)' },
                  { id: 'triple', label: 'Triple (3 pares)', ex: 'N ≡ N (Nitrógeno)' },
                  { id: 'polar', label: 'Polar (H₂O)', ex: 'Dipolo permanente' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCovalentBondType(item.id as any)}
                    className={`p-2 rounded-lg text-center text-xs border transition-all cursor-pointer ${
                      covalentBondType === item.id
                        ? 'border-[#E51B23] bg-white font-bold text-neutral-900 shadow-xs'
                        : 'border-neutral-200 hover:bg-white text-neutral-600'
                    }`}
                  >
                    <div className="font-bold truncate">{item.label}</div>
                    <div className="text-[10px] text-neutral-400 truncate">{item.ex}</div>
                  </button>
                ))}
              </div>

              {/* Detail display of selected bond */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-2.5">
                {covalentBondType === 'simple' && (
                  <div>
                    <h5 className="font-bold text-xs text-neutral-900">Enlace Covalente Simple (σ)</h5>
                    <p className="text-xs text-neutral-600 mt-1">
                      Compartición de 1 par de electrones (2 e⁻). Posee libre rotación axial. Es la base de las cadenas de carbono en lípidos y glucosa.
                    </p>
                    <div className="mt-2 font-mono text-xs bg-neutral-50 p-2 rounded border border-neutral-200 text-center font-bold">
                      H : H → H—H (Longitud: 0,74 Å, Energía: 436 kJ/mol)
                    </div>
                  </div>
                )}

                {covalentBondType === 'doble' && (
                  <div>
                    <h5 className="font-bold text-xs text-neutral-900">Enlace Covalente Doble (1 σ + 1 π)</h5>
                    <p className="text-xs text-neutral-600 mt-1">
                      Compartición de 2 pares de electrones (4 e⁻). Impide la libre rotación y confiere rigidez planar. Presente en el gas oxígeno vital ($O=O$) y en los dobles enlaces <em>cis</em> de ácidos grasos insaturados.
                    </p>
                    <div className="mt-2 font-mono text-xs bg-neutral-50 p-2 rounded border border-neutral-200 text-center font-bold">
                      :O: : :O: → O = O (Energía: 498 kJ/mol)
                    </div>
                  </div>
                )}

                {covalentBondType === 'triple' && (
                  <div>
                    <h5 className="font-bold text-xs text-neutral-900">Enlace Covalente Triple (1 σ + 2 π)</h5>
                    <p className="text-xs text-neutral-600 mt-1">
                      Compartición de 3 pares de electrones (6 e⁻). Enlace extremadamente corto y fuerte. Por ello, el $N_2$ atmosférico es químicamente inerte en los alvéolos a presión normal.
                    </p>
                    <div className="mt-2 font-mono text-xs bg-neutral-50 p-2 rounded border border-neutral-200 text-center font-bold">
                      :N: : : :N: → N ≡ N (Energía: 945 kJ/mol)
                    </div>
                  </div>
                )}

                {covalentBondType === 'polar' && (
                  <div>
                    <h5 className="font-bold text-xs text-neutral-900">Enlace Covalente Polar y Dipolo del Agua</h5>
                    <p className="text-xs text-neutral-600 mt-1">
                      El oxígeno (electronegatividad 3,5) atrae con más fuerza los electrones compartidos que el hidrógeno (2,1), creando cargas parciales ($\delta^-$ en O, $\delta^+$ en H).
                    </p>
                    <div className="mt-2 font-mono text-xs bg-blue-50 p-2 rounded border border-blue-200 text-center font-bold text-blue-900">
                      H(δ⁺)—O(δ⁻)—H(δ⁺) con ángulo de 104,5° y momento dipolar μ = 1,85 D
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Electronegativity scale */}
            <div className="lg:col-span-5 p-3.5 bg-white rounded-xl border border-neutral-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                  Regla de Pauling
                </span>
                <h4 className="text-xs font-bold text-neutral-900 mt-1 mb-1">
                  Escala de Diferencia de Electronegatividad (ΔEN)
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Permite predecir el comportamiento de un fármaco o metabolito en el organismo:
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2 bg-neutral-50 rounded border border-neutral-200">
                  <div className="font-bold text-neutral-800">ΔEN &lt; 0,4: Covalente No Polar</div>
                  <div className="text-[11px] text-neutral-500">Hidrofóbico; cruza membranas por difusión simple (ej. O₂, esteroides).</div>
                </div>
                <div className="p-2 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">0,4 ≤ ΔEN &lt; 1,7: Covalente Polar</div>
                  <div className="text-[11px] text-blue-700">Hidrofílico; soluble en agua, requiere canales proteicos (ej. glucosa).</div>
                </div>
                <div className="p-2 bg-cyan-50 rounded border border-cyan-200">
                  <div className="font-bold text-cyan-900">ΔEN ≥ 1,7: Enlace Iónico</div>
                  <div className="text-[11px] text-cyan-700">Disociación completa en electrolitos; modula potenciales de acción (ej. NaCl).</div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-500 font-mono">
                Electronegatividades: F (4.0) &gt; O (3.5) &gt; Cl (3.0) &gt; N (3.0) &gt; C (2.5) &gt; H (2.1) &gt; Na (0.9)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
