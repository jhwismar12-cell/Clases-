import React, { useState } from 'react';
import { Pill, Syringe, Heart, ShieldPlus, ChevronRight, Layers, FileText } from 'lucide-react';

interface InorganicDrug {
  id: string;
  formula: string;
  name: string;
  category: 'binario' | 'ternario' | 'cuaternario';
  chemicalClass: string;
  elements: string[];
  clinicalRole: string;
  emergencyApplication: string;
  administrationRoute: string;
}

const INORGANIC_DRUGS: InorganicDrug[] = [
  // Binaries
  {
    id: 'nacl',
    formula: 'NaCl',
    name: 'Cloruro de Sodio (Suero Fisiológico al 0,9%)',
    category: 'binario',
    chemicalClass: 'Sal Binaria Neutra',
    elements: ['Sodio (Na)', 'Cloro (Cl)'],
    clinicalRole: 'Aporta 154 mEq/L de Na⁺ y 154 mEq/L de Cl⁻ con osmolaridad de 308 mOsm/L.',
    emergencyApplication: 'Reposición urgente de volumen intravascular en shock hipovolémico y deshidratación severa.',
    administrationRoute: 'Infusión Intravenosa (IV)',
  },
  {
    id: 'hcl',
    formula: 'HCl(ac)',
    name: 'Ácido Clorhídrico Gástrico',
    category: 'binario',
    chemicalClass: 'Hidrácido',
    elements: ['Hidrógeno (H)', 'Cloro (Cl)'],
    clinicalRole: 'Secretado por las células parietales gástricas mediante la bomba de protones H⁺/K⁺ ATPasa.',
    emergencyApplication: 'Mantiene el pH intragástrico entre 1,5 y 2,0 para desnaturalizar proteínas, activar el pepsinógeno en pepsina y esterilizar el quimo.',
    administrationRoute: 'Fisiológico Endógeno',
  },
  {
    id: 'co2',
    formula: 'CO₂',
    name: 'Dióxido de Carbono (Anhídrido Carbónico)',
    category: 'binario',
    chemicalClass: 'Óxido Ácido (Anhídrido)',
    elements: ['Carbono (C)', 'Oxígeno (O)'],
    clinicalRole: 'Producto gaseoso del ciclo de Krebs celular disuelto en plasma (pCO₂ arterial 40 mmHg).',
    emergencyApplication: 'Principal estímulo de los quimiorreceptores del tronco encefálico para regular la ventilación alveolar por minuto.',
    administrationRoute: 'Gas Metabólico / Capnografía',
  },
  // Ternaries
  {
    id: 'mgoh2',
    formula: 'Mg(OH)₂',
    name: 'Hidróxido de Magnesio (Leche de Magnesia)',
    category: 'ternario',
    chemicalClass: 'Hidróxido o Base Ternaria',
    elements: ['Magnesio (Mg)', 'Oxígeno (O)', 'Hidrógeno (H)'],
    clinicalRole: 'Base inorgánica débil escasamente absorbible por la mucosa gastrointestinal.',
    emergencyApplication: 'Antiácido gástrico por neutralización directa de HCl y laxante osmótico al retener agua en la luz del colon.',
    administrationRoute: 'Vía Oral (Suspensión)',
  },
  {
    id: 'caso4',
    formula: 'CaSO₄·½H₂O',
    name: 'Sulfato de Calcio Hemihidratado (Yeso Quirúrgico)',
    category: 'ternario',
    chemicalClass: 'Oxisal Neutra Ternaria',
    elements: ['Calcio (Ca)', 'Azufre (S)', 'Oxígeno (O)'],
    clinicalRole: 'Polvo inorgánico que al hidratarse forma sulfato de calcio dihidratado liberando calor exotérmico.',
    emergencyApplication: 'Inmovilización ortopédica rígida de fracturas óseas y esguinces articulares en salas de urgencias.',
    administrationRoute: 'Uso Tópico / Ortopédico',
  },
  {
    id: 'h2co3',
    formula: 'H₂CO₃',
    name: 'Ácido Carbónico',
    category: 'ternario',
    chemicalClass: 'Oxácido Ternario',
    elements: ['Hidrógeno (H)', 'Carbono (C)', 'Oxígeno (O)'],
    clinicalRole: 'Formado instantáneamente por la enzima anhidrasa carbónica endotelial y eritrocitaria.',
    emergencyApplication: 'Eslabón central del sistema tampón extracelular que conecta la función pulmonar con la renal.',
    administrationRoute: 'Intermediario Fisiológico',
  },
  // Quaternaries
  {
    id: 'nahco3',
    formula: 'NaHCO₃',
    name: 'Bicarbonato de Sodio (Ampolla 8,4%)',
    category: 'cuaternario',
    chemicalClass: 'Sal Ácida Cuaternaria',
    elements: ['Sodio (Na)', 'Hidrógeno (H)', 'Carbono (C)', 'Oxígeno (O)'],
    clinicalRole: 'Aporta 1 mEq de Na⁺ y 1 mEq de HCO₃⁻ por mL de ampolla al 8,4%.',
    emergencyApplication: 'Manejo de acidosis metabólica refractaria grave (pH < 7,10), hiperpotasemia severa e intoxicación por antidepresivos tricíclicos.',
    administrationRoute: 'Intravenosa lenta / Paro Cardiorrespiratorio',
  },
  {
    id: 'buffer-fosfato',
    formula: 'Na₂HPO₄ / NaH₂PO₄',
    name: 'Tampón Fosfato Disódico / Monosódico',
    category: 'cuaternario',
    chemicalClass: 'Sales Ácidas Cuaternarias de Fosfato',
    elements: ['Sodio (Na)', 'Hidrógeno (H)', 'Fósforo (P)', 'Oxígeno (O)'],
    clinicalRole: 'Constituye el principal amortiguador del líquido intracelular y del fluido tubular renal.',
    emergencyApplication: 'Permite la excreción de protones H⁺ como acidez titulable en la orina sin alterar el epitelio renal.',
    administrationRoute: 'Fisiológico Intracelular y Renal',
  },
];

export const SceneBlock1InorganicFunctions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'binario' | 'ternario' | 'cuaternario'>('all');
  const [activeDrug, setActiveDrug] = useState<InorganicDrug>(INORGANIC_DRUGS[6]); // Default: NaHCO3

  const filteredDrugs =
    selectedCategory === 'all'
      ? INORGANIC_DRUGS
      : INORGANIC_DRUGS.filter((d) => d.category === selectedCategory);

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-3 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-neutral-950 font-bold">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono tracking-tight text-neutral-100">
              CÁTEDRA 1.4: FUNCIONES INORGÁNICAS EN CLÍNICA
            </h3>
            <p className="text-[11px] text-neutral-400">
              Farmacia Hospitalaria: Compuestos Binarios, Ternarios y Cuaternarios
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg text-xs">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'binario', label: 'Binarios (2)' },
            { id: 'ternario', label: 'Ternarios (3)' },
            { id: 'cuaternario', label: 'Cuaternarios (4)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#E51B23] text-white font-bold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Left list: Drug shelf */}
          <div className="md:col-span-5 space-y-2">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider font-mono px-1">
              Fármacos y Compuestos Seleccionables ({filteredDrugs.length})
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredDrugs.map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => setActiveDrug(drug)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    activeDrug.id === drug.id
                      ? 'border-[#E51B23] bg-red-50/70 shadow-xs ring-1 ring-red-400/30'
                      : 'border-neutral-200 hover:bg-neutral-50 bg-white'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-mono text-xs font-black text-neutral-900 bg-white px-1.5 py-0.2 rounded border border-neutral-200">
                        {drug.formula}
                      </span>
                      <span
                        className={`text-[9px] uppercase font-bold font-mono px-1.5 py-0.2 rounded ${
                          drug.category === 'binario'
                            ? 'bg-blue-100 text-blue-800'
                            : drug.category === 'ternario'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {drug.category}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-700 font-medium truncate">{drug.name}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detailed Drug/Compound Monograph */}
          <div className="md:col-span-7 bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between space-y-3">
            <div>
              {/* Header card */}
              <div className="flex items-start justify-between border-b border-neutral-200 pb-2.5 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-black font-mono text-[#E51B23]">
                      {activeDrug.formula}
                    </span>
                    <span className="text-[10px] font-bold font-mono uppercase bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded">
                      {activeDrug.chemicalClass}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                    {activeDrug.name}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block font-mono">Vía Usual</span>
                  <span className="text-[11px] font-semibold text-neutral-700 bg-white px-2 py-0.5 rounded border border-neutral-200">
                    {activeDrug.administrationRoute}
                  </span>
                </div>
              </div>

              {/* Elements Breakdown */}
              <div className="mb-3">
                <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block mb-1">
                  Constitución Elemental ({activeDrug.elements.length} Elementos):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDrug.elements.map((el, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono font-medium bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-800"
                    >
                      {el}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mechanism */}
              <div className="space-y-2.5">
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <div className="text-[11px] font-bold text-neutral-800 uppercase flex items-center gap-1.5 mb-1">
                    <ShieldPlus className="w-3.5 h-3.5 text-blue-600" />
                    Mecanismo Fisiológico / Bioquímico:
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {activeDrug.clinicalRole}
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-red-200 bg-red-50/30">
                  <div className="text-[11px] font-bold text-red-900 uppercase flex items-center gap-1.5 mb-1">
                    <Syringe className="w-3.5 h-3.5 text-[#E51B23]" />
                    Aplicación Clínica y Urgencias Médicas:
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                    {activeDrug.emergencyApplication}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom reminder */}
            <div className="p-2 bg-neutral-200/60 rounded-lg text-[10px] font-mono text-neutral-600 flex items-center justify-between">
              <span>SÍLABO UCACUE • Cátedra MBAS04</span>
              <span>Regla: Binario = 2 • Ternario = 3 • Cuaternario = 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
