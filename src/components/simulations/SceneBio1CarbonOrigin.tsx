import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles, Atom, ChevronRight, Pill, Table2, Layers, Info } from 'lucide-react';

export const SceneBio1CarbonOrigin: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<'hybridization' | 'drugs' | 'families'>('hybridization');

  // Hybridization mode: sp3 (tetrahedral, 109.5°), sp2 (trigonal planar, 120°), sp (linear, 180°)
  const [hybridMode, setHybridMode] = useState<'sp3' | 'sp2' | 'sp'>('sp3');
  const [angle, setAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Wöhler Reaction State
  const [wohlerState, setWohlerState] = useState<'cyanate' | 'heating' | 'urea'>('cyanate');
  const [heatProgress, setHeatProgress] = useState<number>(0);

  // Drug Inspector State
  const [selectedDrug, setSelectedDrug] = useState<'aspirin' | 'paracetamol' | 'ibuprofen'>('aspirin');
  const [activeGroupHighlight, setActiveGroupHighlight] = useState<string | null>(null);

  // Vertices for Hybridization geometries
  const geometries = {
    sp3: {
      name: 'sp³ (Tetraédrica)',
      angleText: '109.5°',
      geometry: 'Tetraedro regular',
      example: 'Metano (CH₄) / Alcanos / Carbohidratos',
      bonds: 4,
      vertices: [
        { x: 0, y: -75, z: 0, label: 'H (1)', color: '#93C5FD' },
        { x: 70, y: 25, z: 40, label: 'H (2)', color: '#93C5FD' },
        { x: -70, y: 25, z: 40, label: 'H (3)', color: '#93C5FD' },
        { x: 0, y: 35, z: -80, label: 'H (4)', color: '#93C5FD' },
      ],
    },
    sp2: {
      name: 'sp² (Trigonal Plana)',
      angleText: '120.0°',
      geometry: 'Plano trigonal + 1 orbital p puro',
      example: 'Eteno (C₂H₄) / Carbonilos (C=O) / Aromáticos',
      bonds: 3,
      vertices: [
        { x: 0, y: -75, z: 0, label: 'H (1)', color: '#93C5FD' },
        { x: 65, y: 38, z: 0, label: 'H (2)', color: '#93C5FD' },
        { x: -65, y: 38, z: 0, label: 'H (3)', color: '#93C5FD' },
      ],
    },
    sp: {
      name: 'sp (Lineal)',
      angleText: '180.0°',
      geometry: 'Lineal axial + 2 orbitales p puros',
      example: 'Etino (C₂H₂) / Alquinos / Nitrilos',
      bonds: 2,
      vertices: [
        { x: 0, y: -80, z: 0, label: 'H (1)', color: '#93C5FD' },
        { x: 0, y: 80, z: 0, label: 'H (2)', color: '#93C5FD' },
      ],
    },
  };

  useEffect(() => {
    let animId: number;
    if (autoRotate) {
      const loop = () => {
        setAngle((prev) => (prev + 0.015) % (Math.PI * 2));
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animId);
  }, [autoRotate]);

  // Render Hybridization on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Subtle background grid
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let x = 20; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 20; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const currentGeo = geometries[hybridMode];
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const projected = currentGeo.vertices.map((v) => {
      const rx = v.x * cosA + v.z * sinA;
      const ry = v.y;
      const rz = -v.x * sinA + v.z * cosA;
      const scale = 220 / (220 + rz);
      return {
        px: cx + rx * scale,
        py: cy + ry * scale,
        rz,
        label: v.label,
        color: v.color,
      };
    });

    // Draw Bonds
    projected.forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.px, p.py);
      ctx.strokeStyle = p.rz > 0 ? '#E51B23' : '#FCA5A5';
      ctx.lineWidth = p.rz > 0 ? 4 : 2.5;
      ctx.stroke();
    });

    // Angle indicator
    ctx.fillStyle = '#E51B23';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(currentGeo.angleText, cx + 20, cy - 14);

    // Center Carbon atom (C)
    const cGrad = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, 20);
    cGrad.addColorStop(0, '#475569');
    cGrad.addColorStop(1, '#0F172A');
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = cGrad;
    ctx.fill();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('C', cx, cy);

    // Hydrogen atoms (H)
    projected.forEach((p) => {
      const hRadius = 13 * (220 / (220 + p.rz));
      const hGrad = ctx.createRadialGradient(p.px - 3, p.py - 3, 1, p.px, p.py, hRadius);
      hGrad.addColorStop(0, '#DBEAFE');
      hGrad.addColorStop(1, '#2563EB');

      ctx.beginPath();
      ctx.arc(p.px, p.py, hRadius, 0, Math.PI * 2);
      ctx.fillStyle = hGrad;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('H', p.px, p.py);
    });
  }, [angle, hybridMode]);

  // Handle Wöhler heating reaction
  const handleTriggerWohler = () => {
    if (wohlerState === 'heating') return;
    setWohlerState('heating');
    setHeatProgress(0);

    const interval = setInterval(() => {
      setHeatProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setWohlerState('urea');
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleResetWohler = () => {
    setWohlerState('cyanate');
    setHeatProgress(0);
  };

  // 12 Functional Families data directly from Module 3.1
  const functionalFamilies = [
    { name: 'Alcanos', group: 'C—C, C—H simples', formula: 'R—CH₃', example: 'Lanolina / Vaselina médica', relevance: 'Ceras protectoras cutáneas y lubricantes biológicos' },
    { name: 'Alquenos', group: 'C=C doble enlace', formula: 'R—CH=CH—R', example: 'Ácido oleico / Retinol (Vit A)', relevance: 'Fluidez en membranas biológicas y pigmentos visuales' },
    { name: 'Alquinos', group: 'C≡C triple enlace', formula: 'R—C≡C—R', example: 'Eritromicina / Etinilestradiol', relevance: 'Anticonceptivos orales y antibióticos macrólidos' },
    { name: 'Aromáticos', group: 'Anillo bencénico resonante', formula: 'C₆H₅—R', example: 'Fenilalanina / Tirosina / Fármacos', relevance: 'Precursores de catecolaminas (dopamina, adrenalina)' },
    { name: 'Alcoholes', group: 'Hidroxilo (—OH)', formula: 'R—OH', example: 'Glicerol / Etanol / Glucosa', relevance: 'Esqueleto de fosfoglicéridos y fuente energética celular' },
    { name: 'Tioles', group: 'Sulfhidrilo (—SH)', formula: 'R—SH', example: 'Cisteína / Glutatión (GSH)', relevance: 'Puentes disulfuro proteicos y defensa antioxidante' },
    { name: 'Aldehídos', group: 'Carbonilo terminal (—CHO)', formula: 'R—CHO', example: 'D-Glucosa / Retinaldehído', relevance: 'Azúcares reductores y fotorrecepción retiniana' },
    { name: 'Cetonas', group: 'Carbonilo interno (>C=O)', formula: 'R—CO—R', example: 'D-Fructosa / Acetoacetato', relevance: 'Cuerpos cetónicos en cetoacidosis diabética' },
    { name: 'Ácidos Carboxílicos', group: 'Carboxilo (—COOH)', formula: 'R—COOH', example: 'Ácido palmítico / Ácido pirúvico', relevance: 'Colas de lípidos de membrana y metabolitos del ciclo de Krebs' },
    { name: 'Éteres', group: 'Oxígeno puente (—O—)', formula: 'R—O—R', example: 'Anestésicos por inhalación', relevance: 'Isoflurano y sevoflurano en anestesiología quirúrgica' },
    { name: 'Ésteres', group: 'Éster (—COO—)', formula: 'R—COO—R', example: 'Triacilgliceroles / Acetilcolina', relevance: 'Almacén adiposo de alta energía y neurotransmisión' },
    { name: 'Aminas', group: 'Amino (—NH₂, —NHR)', formula: 'R—NH₂', example: 'Histamina / Serotonina / Dopamina', relevance: 'Neurotransmisores y mediadores de anafilaxia' },
    { name: 'Amidas', group: 'Amida (—CO—NH—)', formula: 'R—CO—NH—R', example: 'Enlace peptídico / Paracetamol', relevance: 'Unión covalente fundamental en proteínas y analgésicos' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Simulation Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Atom className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Módulo 3.1: Origen de la Química Orgánica, Hibridación & Grupos Funcionales
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Wöhler 1828: NH₄OCN → CO(NH₂)₂ • Hibridación sp³, sp², sp • Fármacos en Medicina
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('hybridization')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'hybridization'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Hibridación & Wöhler
          </button>
          <button
            onClick={() => setActiveTab('drugs')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'drugs'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Visor 3D de Fármacos
          </button>
          <button
            onClick={() => setActiveTab('families')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'families'
                ? 'bg-white text-[#E51B23] font-bold shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Tabla de Familias
          </button>
        </div>
      </div>

      {/* Tab 1: Hybridization & Wöhler Synthesis */}
      {activeTab === 'hybridization' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto">
          {/* Left Column: Orbital Hybridization Visualizer */}
          <div className="lg:col-span-6 flex flex-col bg-slate-50/70 rounded-xl border border-neutral-200 p-3 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-neutral-800 flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-[#E51B23]" />
                Simulador de Hibridación Orbital:
              </span>
              <div className="flex gap-1">
                {(['sp3', 'sp2', 'sp'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setHybridMode(mode)}
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold transition-all cursor-pointer ${
                      hybridMode === mode
                        ? 'bg-[#E51B23] text-white shadow-xs'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
              <canvas
                ref={canvasRef}
                width={280}
                height={220}
                className="w-full max-w-[280px] h-[220px] mx-auto block cursor-grab active:cursor-grabbing"
                onClick={() => setAngle((prev) => prev + 0.3)}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 border border-neutral-200 rounded-lg p-2 text-[10px] text-neutral-700 flex justify-between items-center shadow-xs">
                <span>Ángulo: <strong className="text-[#E51B23]">{geometries[hybridMode].angleText}</strong></span>
                <span>Geometría: <strong className="text-blue-600">{geometries[hybridMode].geometry}</strong></span>
              </div>
            </div>

            <div className="mt-2 p-2 bg-white rounded-lg border border-neutral-200 text-[10px] text-neutral-600 space-y-0.5 shadow-xs">
              <span className="font-bold text-neutral-800 block">Ejemplos biológicos:</span>
              <p>{geometries[hybridMode].example}</p>
            </div>
          </div>

          {/* Right Column: Historical Wöhler Experiment Simulator */}
          <div className="lg:col-span-6 flex flex-col bg-neutral-50/50 rounded-xl border border-neutral-200 p-3 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <span className="text-[11px] font-bold text-neutral-900 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Experimento de Wöhler (1828): Fin del Vitalismo
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                Δ (Calor Catalítico)
              </span>
            </div>

            {/* Reaction Chamber Visual */}
            <div className="p-3 bg-white rounded-lg border border-neutral-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <div
                  className={`p-2 rounded-lg border text-center flex-1 transition-all ${
                    wohlerState === 'cyanate'
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                  }`}
                >
                  <span className="text-[9px] block uppercase font-mono text-amber-700">Inorgánico</span>
                  <span className="text-xs font-mono">NH₄OCN</span>
                  <span className="text-[10px] block text-neutral-600">Cianato de Amonio</span>
                </div>

                <div className="px-2 flex flex-col items-center">
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                  <span className="text-[9px] text-[#E51B23] font-bold font-mono">Δ Calor</span>
                </div>

                <div
                  className={`p-2 rounded-lg border text-center flex-1 transition-all ${
                    wohlerState === 'urea'
                      ? 'bg-green-50 border-green-400 text-green-900 font-bold shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                  }`}
                >
                  <span className="text-[9px] block uppercase font-mono text-green-700">Orgánico</span>
                  <span className="text-xs font-mono">CO(NH₂)₂</span>
                  <span className="text-[10px] block text-neutral-600">Urea (Metabolito)</span>
                </div>
              </div>

              {/* Thermal Progress Bar */}
              {wohlerState === 'heating' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-neutral-600">
                    <span className="flex items-center gap-1 text-amber-600">
                      <Flame className="w-3 h-3 animate-pulse" /> Calentamiento térmico...
                    </span>
                    <span className="font-mono">{heatProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-[#E51B23] transition-all duration-100"
                      style={{ width: `${heatProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* State Explanatory Text */}
              <div className="text-[11px] leading-relaxed text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-200">
                {wohlerState === 'cyanate' && (
                  <p>
                    Jöns Jacob Berzelius sostenía que los compuestos orgánicos poseían una "fuerza vital" inalcanzable artificialmente. Friedrich Wöhler pulverizó esta hipótesis al calentar una sal mineral.
                  </p>
                )}
                {wohlerState === 'heating' && (
                  <p className="text-amber-800 animate-pulse">
                    Reorganización intramolecular por termólisis: formación de enlaces covalentes directos entre el carbono carbonílico y los grupos amina.
                  </p>
                )}
                {wohlerState === 'urea' && (
                  <p className="text-green-800 font-medium">
                    ¡Urea pura sintetizada! La misma molécula nitrogenada que el hígado humano genera mediante el ciclo de la urea. Nace la bioquímica moderna.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleTriggerWohler}
                  disabled={wohlerState === 'heating'}
                  className="flex-1 py-1.5 bg-[#E51B23] hover:bg-[#c4141b] disabled:bg-neutral-300 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>{wohlerState === 'urea' ? 'Recalentar Síntesis' : 'Aplicar Calor (Δ)'}</span>
                </button>
                {wohlerState === 'urea' && (
                  <button
                    onClick={handleResetWohler}
                    className="px-3 py-1.5 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs transition-colors cursor-pointer"
                    title="Reiniciar a Cianato"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Clinical Spotlight */}
            <div className="p-2.5 bg-red-50/70 rounded-lg border border-red-200 text-[11px] text-neutral-800 space-y-1">
              <span className="font-bold text-[#E51B23] block text-[10px] uppercase tracking-wider">
                🏥 Relevancia Médica en Medicina Humana:
              </span>
              <p>
                La <strong>urea</strong> es el producto final no tóxico de desecho del amonio ($NH_4^+$) originado en el catabolismo de aminoácidos. Su medición sérica (BUN) es el biomarcador elemental de función renal en emergencias.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 3D Drug Molecular Inspector */}
      {activeTab === 'drugs' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-y-auto">
          {/* Drug Selector */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <span className="text-xs font-bold text-neutral-800">
              Seleccione Fármaco para Inspección Molecular:
            </span>

            <div className="space-y-2">
              {/* Aspirin */}
              <button
                onClick={() => {
                  setSelectedDrug('aspirin');
                  setActiveGroupHighlight(null);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDrug === 'aspirin'
                    ? 'bg-red-50/60 border-[#E51B23] shadow-xs'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">Aspirina</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-[#E51B23] font-bold">
                    Ácido Acetilsalicílico
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Antiinflamatorio no esteroideo (AINE) • Inhibidor irreversible de COX-1 y COX-2 • Antiagregante plaquetario.
                </p>
              </button>

              {/* Paracetamol */}
              <button
                onClick={() => {
                  setSelectedDrug('paracetamol');
                  setActiveGroupHighlight(null);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDrug === 'paracetamol'
                    ? 'bg-blue-50/60 border-blue-600 shadow-xs'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">Paracetamol (Acetaminofén)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                    N-Acetil-p-aminofenol
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Analgésico y antipirético de acción central • Sin actividad antiinflamatoria periférica significativa.
                </p>
              </button>

              {/* Ibuprofen */}
              <button
                onClick={() => {
                  setSelectedDrug('ibuprofen');
                  setActiveGroupHighlight(null);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDrug === 'ibuprofen'
                    ? 'bg-amber-50/60 border-amber-600 shadow-xs'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">Ibuprofeno</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                    Ácido 2-(4-isobutilfenil)propiónico
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  AINE derivado del ácido propiónico • Inhibidor competitivo reversible de ciclooxigenasas.
                </p>
              </button>
            </div>
          </div>

          {/* Molecular Structure & Interactive Functional Groups */}
          <div className="lg:col-span-7 bg-slate-50/70 rounded-xl border border-neutral-200 p-4 space-y-3">
            <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-[#E51B23]" />
              Estructura Química & Grupos Funcionales Identificados:
            </span>

            {/* Aspirin view */}
            {selectedDrug === 'aspirin' && (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-neutral-200 text-center font-mono space-y-2 shadow-xs">
                  <div className="text-xs text-neutral-500 font-bold">Fórmula: C₉H₈O₄</div>
                  <div className="flex justify-center items-center gap-3 py-2 text-xs">
                    <span
                      onClick={() => setActiveGroupHighlight('ester')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'ester'
                          ? 'bg-[#E51B23] text-white font-bold'
                          : 'bg-red-50 text-[#E51B23] border-red-200 hover:bg-red-100'
                      }`}
                    >
                      Éster (—O—CO—CH₃)
                    </span>
                    <span>+</span>
                    <span
                      onClick={() => setActiveGroupHighlight('aromatic')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'aromatic'
                          ? 'bg-neutral-800 text-white font-bold'
                          : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      Anillo Bencénico (C₆H₄)
                    </span>
                    <span>+</span>
                    <span
                      onClick={() => setActiveGroupHighlight('acid')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'acid'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      Ácido Carboxílico (—COOH)
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-3 bg-white rounded-lg border border-neutral-200 text-[11px] text-neutral-700 space-y-1.5 shadow-xs">
                  <span className="font-bold text-[#E51B23] block">Mecanismo Farmacológico Molecular:</span>
                  <p>
                    El <strong>grupo éster acetilo</strong> de la aspirina es transferido covalentemente al residuo de <strong>Serina 530</strong> en el canal activo de la enzima ciclooxigenasa (COX-1). Esta acetilación irreversible bloquea permanentemente la síntesis de Tromboxano A₂ (TXA₂) durante toda la vida media plaquetaria (7-10 días).
                  </p>
                </div>
              </div>
            )}

            {/* Paracetamol view */}
            {selectedDrug === 'paracetamol' && (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-neutral-200 text-center font-mono space-y-2 shadow-xs">
                  <div className="text-xs text-neutral-500 font-bold">Fórmula: C₈H₉NO₂</div>
                  <div className="flex justify-center items-center gap-3 py-2 text-xs">
                    <span
                      onClick={() => setActiveGroupHighlight('phenol')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'phenol'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      Fenol (—OH fenólico)
                    </span>
                    <span>+</span>
                    <span
                      onClick={() => setActiveGroupHighlight('aromatic')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'aromatic'
                          ? 'bg-neutral-800 text-white font-bold'
                          : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      Anillo Bencénico
                    </span>
                    <span>+</span>
                    <span
                      onClick={() => setActiveGroupHighlight('amide')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'amide'
                          ? 'bg-[#E51B23] text-white font-bold'
                          : 'bg-red-50 text-[#E51B23] border-red-200 hover:bg-red-100'
                      }`}
                    >
                      Amida (—NH—CO—CH₃)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-neutral-200 text-[11px] text-neutral-700 space-y-1.5 shadow-xs">
                  <span className="font-bold text-blue-700 block">Toxicidad Hepática Molecular:</span>
                  <p>
                    A dosis terapéuticas, el grupo fenol se conjuga con sulfato y glucurónido. En sobredosis, el citocromo P450 (CYP2E1) lo metaboliza a <strong>NAPQI</strong>, un metabolito reactivo que agota el glutatión (—SH) hepático, causando necrosis centrolobulillar letal si no se administra <strong>N-acetilcisteína</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Ibuprofen view */}
            {selectedDrug === 'ibuprofen' && (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-neutral-200 text-center font-mono space-y-2 shadow-xs">
                  <div className="text-xs text-neutral-500 font-bold">Fórmula: C₁₃H₁₈O₂</div>
                  <div className="flex justify-center items-center gap-3 py-2 text-xs">
                    <span
                      onClick={() => setActiveGroupHighlight('isobutyl')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'isobutyl'
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      Isobutilo (Alquilo lipófilo)
                    </span>
                    <span>+</span>
                    <span
                      onClick={() => setActiveGroupHighlight('aromatic')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'aromatic'
                          ? 'bg-neutral-800 text-white font-bold'
                          : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      Anillo Bencénico
                    </span>
                    <span>+</span>
                    <span
                      onClick={() => setActiveGroupHighlight('acid')}
                      className={`px-2 py-1 rounded border cursor-pointer transition-all ${
                        activeGroupHighlight === 'acid'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      Ácido Propiónico (—COOH)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-neutral-200 text-[11px] text-neutral-700 space-y-1.5 shadow-xs">
                  <span className="font-bold text-amber-800 block">Inhibición Reversible Competitiva:</span>
                  <p>
                    La cola lipofílica isobutilo se inserta en la hendidura hidrofóbica de la COX, mientras que el grupo carboxilo interactúa con los aminoácidos polares del sitio catalítico, bloqueando competitivamente la entrada del ácido araquidónico.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Complete Functional Families Table */}
      {activeTab === 'families' && (
        <div className="flex-1 p-4 overflow-y-auto max-h-[500px]">
          <div className="overflow-x-auto rounded-xl border border-neutral-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100/80 border-b border-neutral-200 text-neutral-800">
                  <th className="p-2.5 font-bold">Familia Funcional</th>
                  <th className="p-2.5 font-bold">Grupo Característico</th>
                  <th className="p-2.5 font-bold">Fórmula General</th>
                  <th className="p-2.5 font-bold">Ejemplo Biomédico</th>
                  <th className="p-2.5 font-bold">Relevancia Clínica / Fisiológica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {functionalFamilies.map((fam, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="p-2.5 font-bold text-neutral-900">{fam.name}</td>
                    <td className="p-2.5 font-mono text-[#E51B23] font-medium">{fam.group}</td>
                    <td className="p-2.5 font-mono text-neutral-600">{fam.formula}</td>
                    <td className="p-2.5 font-semibold text-blue-700">{fam.example}</td>
                    <td className="p-2.5 text-neutral-600 leading-relaxed text-[11px]">{fam.relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
