import React, { useState } from 'react';
import { Microscope, HeartPulse, ShieldAlert, Dna, Activity, Stethoscope, CheckCircle2, ChevronRight } from 'lucide-react';

interface ClinicalTest {
  id: string;
  name: string;
  chemicalPrinciple: string;
  clinicalImpact: string;
  normalValue: string;
  pilarId: string;
}

const CLINICAL_TESTS: ClinicalTest[] = [
  {
    id: 'glucemia',
    name: 'Glucemia en Sangre',
    chemicalPrinciple: 'Reacción enzimática de la Glucosa Oxidasa (oxidación de glucosa a ácido glucónico y H₂O₂ con cromógeno espectrofotométrico).',
    clinicalImpact: 'Diagnóstico de Diabetes Mellitus, monitoreo de cetoacidosis e hipoglucemia aguda en urgencias.',
    normalValue: '70 - 99 mg/dL (Ayuno)',
    pilarId: 'fisiologia',
  },
  {
    id: 'ionograma',
    name: 'Ionograma Sérico (Na⁺, K⁺, Cl⁻)',
    chemicalPrinciple: 'Potenciometría directa con electrodos selectivos de iones sensibles a la diferencia de potencial electroquímico.',
    clinicalImpact: 'Detección de hiperpotasemia fatal, arritmias cardíacas y deshidratación grave.',
    normalValue: 'Na⁺: 135-145 mEq/L, K⁺: 3.5-5.0 mEq/L',
    pilarId: 'fisiologia',
  },
  {
    id: 'gasometria',
    name: 'Gasometría Arterial (pH, pCO₂, HCO₃⁻)',
    chemicalPrinciple: 'Amperometría y electrodo de pH de vidrio basados en la ley de Nernst y equilibrio carbónico.',
    clinicalImpact: 'Diagnóstico inmediato de insuficiencia respiratoria y desequilibrios ácido-básicos en UCI.',
    normalValue: 'pH: 7.35-7.45, pCO₂: 35-45 mmHg, HCO₃⁻: 22-26 mEq/L',
    pilarId: 'farmacologia',
  },
  {
    id: 'antiseptico',
    name: 'Esterilización y Clorhexidina / Povidona',
    chemicalPrinciple: 'Desnaturalización oxidativa de proteínas de membrana y disrupción de la pared celular bacteriana por halógenos.',
    clinicalImpact: 'Prevención de sepsis quirúrgica intrahospitalaria y asepsia de heridas traumáticas.',
    normalValue: 'Eficacia bactericida del 99.99%',
    pilarId: 'prevencion',
  },
  {
    id: 'pcr-dna',
    name: 'Reacción en Cadena de la Polimerasa (PCR)',
    chemicalPrinciple: 'Replicación enzimática in vitro del ADN mediante ciclos térmicos de desnaturalización, alineamiento de cebadores y extensión por Taq Polimerasa.',
    clinicalImpact: 'Diagnóstico de infecciones virales (SARS-CoV-2, VIH) y mutaciones genéticas oncológicas.',
    normalValue: 'Cualitativo / Cuantitativo (Copias/mL)',
    pilarId: 'genetica',
  },
];

export const SceneBlock1Pillars: React.FC = () => {
  const [activePilar, setActivePilar] = useState<'fisiologia' | 'farmacologia' | 'prevencion' | 'genetica'>('fisiologia');
  const [selectedTest, setSelectedTest] = useState<ClinicalTest>(CLINICAL_TESTS[0]);
  const [viewMode, setViewMode] = useState<'pilares' | 'laboratorio'>('pilares');

  const pilares = [
    {
      id: 'fisiologia',
      title: 'Fisiología Celular',
      icon: HeartPulse,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
      activeBorder: 'border-rose-500 bg-rose-50/80',
      summary: 'Cada célula es un reactor químico abierto donde transcurren miles de reacciones catalizadas por enzimas simultáneamente.',
      examples: 'Bomba Na⁺/K⁺ ATPasa, glucólisis, fosforilación oxidativa mitocondrial.',
    },
    {
      id: 'farmacologia',
      title: 'Farmacología Molecular',
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
      activeBorder: 'border-blue-500 bg-blue-50/80',
      summary: 'Diseño y dosificación de moléculas sintéticas y biológicas que interactúan selectivamente con receptores celulares.',
      examples: 'Inhibidores de la ECA, antibióticos betalactámicos, bloqueadores de canales de calcio.',
    },
    {
      id: 'prevencion',
      title: 'Prevención e Higiene',
      icon: ShieldAlert,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
      activeBorder: 'border-emerald-500 bg-emerald-50/80',
      summary: 'Química del saneamiento ambiental, potabilización de agua, antisépticos de quirófano y estabilización de vacunas.',
      examples: 'Cloración hídrica, agentes tensioactivos, alcohol al 70%, esterilización en autoclave.',
    },
    {
      id: 'genetica',
      title: 'Genética Molecular',
      icon: Dna,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-200',
      activeBorder: 'border-purple-500 bg-purple-50/80',
      summary: 'Comprensión química del ácido desoxirribonucleico, síntesis de ARN mensajero, ribosomas y terapia génica dirigida.',
      examples: 'Diagnóstico por PCR, secuenciación genética, CRISPR-Cas9, vacunas de ARNm.',
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header Banner */}
      <div className="p-3 bg-neutral-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E51B23] flex items-center justify-center text-white">
            <Microscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-mono tracking-tight text-neutral-100">
              CÁTEDRA 1.1: QUÍMICA MÉDICA VS. PURA
            </h3>
            <p className="text-[11px] text-neutral-400">
              Universidad Católica de Cuenca • Medicina Humana
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('pilares')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              viewMode === 'pilares' ? 'bg-[#E51B23] text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            4 Pilares Médicos
          </button>
          <button
            onClick={() => setViewMode('laboratorio')}
            className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
              viewMode === 'laboratorio' ? 'bg-[#E51B23] text-white font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Pruebas de Laboratorio
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4">
        {/* Contrast Box: Pura vs Aplicada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/70">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                Marco Teórico
              </span>
              <span className="text-xs font-bold text-neutral-800">Química Pura</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Estudia las leyes universales de la materia, la estructura atómica y los mecanismos moleculares sin un propósito utilitario directo inmediato.
            </p>
            <div className="mt-2 text-[11px] text-neutral-500 font-mono">
              Enfoque: ¿Cómo se comportan los electrones y enlaces en el universo?
            </div>
          </div>

          <div className="p-3 rounded-lg border-2 border-red-200 bg-red-50/40">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E51B23] font-mono">
                Cátedra Médica UCACUE
              </span>
              <span className="text-xs font-bold text-neutral-900">Química Aplicada a la Medicina</span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Aplica los principios químicos directamente al <strong>diagnóstico precoz, farmacoterapia, reversión fisiopatológica</strong> y mantenimiento de la homeostasis.
            </p>
            <div className="mt-2 text-[11px] text-[#E51B23] font-semibold font-mono">
              Enfoque: ¿Cómo restablecer la vida celular y curar al paciente enfermo?
            </div>
          </div>
        </div>

        {viewMode === 'pilares' ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                Los 4 Pilares de la Química en Ciencias de la Salud
              </h4>
              <span className="text-[11px] text-neutral-500">Haz clic en cada pilar para explorar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {pilares.map((p) => {
                const IconComp = p.icon;
                const isSelected = activePilar === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePilar(p.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                      isSelected ? p.activeBorder + ' shadow-sm ring-1 ring-neutral-400/20' : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 rounded-lg ${p.bg}`}>
                          <IconComp className={`w-4 h-4 ${p.color}`} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400">
                          0{pilares.indexOf(p) + 1}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-neutral-900 mb-1">{p.title}</h5>
                      <p className="text-[11px] text-neutral-600 leading-tight">{p.summary}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-neutral-100 text-[10px] text-neutral-500 truncate">
                      <strong>Ejemplo:</strong> {p.examples}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Pilar Deep Dive */}
            {(() => {
              const current = pilares.find((p) => p.id === activePilar)!;
              const IconCurrent = current.icon;
              return (
                <div className="mt-3 p-3.5 rounded-xl border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2">
                    <IconCurrent className={`w-4 h-4 ${current.color}`} />
                    <span className="text-xs font-bold text-neutral-900">
                      Profundización Médica: {current.title}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed mb-2">
                    {current.summary} En el quehacer diario del médico, dominar este pilar evita errores fatales de medicación, sobredosis farmacológica y fallos en la interpretación de pruebas bioanalíticas.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#E51B23] font-medium bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Correlación con Sílabo UCACUE: Práctica de Laboratorio 1 y 2</span>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                Del Tubo de Ensayo a la Cama del Paciente
              </h4>
              <span className="text-[11px] text-neutral-500">Selecciona una prueba clínica</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Test selector column */}
              <div className="space-y-1.5">
                {CLINICAL_TESTS.map((test) => (
                  <button
                    key={test.id}
                    onClick={() => setSelectedTest(test)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs border transition-all cursor-pointer flex items-center justify-between ${
                      selectedTest.id === test.id
                        ? 'border-[#E51B23] bg-red-50/70 font-bold text-neutral-900 shadow-xs'
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span>{test.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                ))}
              </div>

              {/* Test detail panel */}
              <div className="md:col-span-2 p-3.5 bg-white border border-neutral-200 rounded-xl shadow-xs space-y-3">
                <div className="flex items-start justify-between border-b border-neutral-100 pb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E51B23] font-bold">
                      Prueba Bioquímica Seleccionada
                    </span>
                    <h5 className="text-sm font-bold text-neutral-900">{selectedTest.name}</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 block font-mono">Valores de Referencia</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {selectedTest.normalValue}
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="text-[11px] font-bold text-neutral-800 uppercase mb-1">
                    🔬 Principio Químico Molecular Subyacente:
                  </h6>
                  <p className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 leading-relaxed font-mono">
                    {selectedTest.chemicalPrinciple}
                  </p>
                </div>

                <div>
                  <h6 className="text-[11px] font-bold text-neutral-800 uppercase mb-1">
                    🏥 Impacto en la Toma de Decisiones Clínicas:
                  </h6>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    {selectedTest.clinicalImpact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Quote */}
      <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
        <div className="flex items-center gap-1.5">
          <Stethoscope className="w-3.5 h-3.5 text-[#E51B23]" />
          <span>Máxima de Cátedra: <em>«La medicina moderna es la química aplicada al mantenimiento de la vida.»</em></span>
        </div>
        <span className="font-mono text-neutral-400 text-[10px]">UCACUE #SomosÁguilasRojas</span>
      </div>
    </div>
  );
};
