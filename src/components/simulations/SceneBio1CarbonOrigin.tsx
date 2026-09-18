import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles, Atom, ChevronRight } from 'lucide-react';

export const SceneBio1CarbonOrigin: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wohlerState, setWohlerState] = useState<'cyanate' | 'heating' | 'urea'>('cyanate');
  const [heatProgress, setHeatProgress] = useState<number>(0);

  // 3D projection coordinates for tetrahedral carbon CH4
  // Center (0,0,0) and 4 vertices of regular tetrahedron:
  // v1: (0, 1, 0)
  // v2: (sqrt(8/9), -1/3, 0)
  // v3: (-sqrt(2/9), -1/3, sqrt(2/3))
  // v4: (-sqrt(2/9), -1/3, -sqrt(2/3))
  const vertices = [
    { x: 0, y: -75, z: 0, label: 'H (1)', color: '#93C5FD' },
    { x: 70, y: 25, z: 40, label: 'H (2)', color: '#93C5FD' },
    { x: -70, y: 25, z: 40, label: 'H (3)', color: '#93C5FD' },
    { x: 0, y: 35, z: -80, label: 'H (4)', color: '#93C5FD' },
  ];

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

  // Render 3D Tetrahedral Carbon onto 2D canvas
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

    // Rotated vertices around Y axis
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const projected = vertices.map((v) => {
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

    // Draw Covalent Bonds (lines from center (cx, cy) to each vertex)
    projected.forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.px, p.py);
      ctx.strokeStyle = p.rz > 0 ? '#E51B23' : '#FCA5A5';
      ctx.lineWidth = p.rz > 0 ? 4.5 : 3;
      ctx.stroke();

      // Bond angle marker between v1 and v2
      ctx.fillStyle = '#64748B';
      ctx.font = '10px monospace';
    });

    // Angle arc representation between vertices 1 and 2
    ctx.beginPath();
    ctx.arc(cx, cy, 32, -Math.PI / 2, 0.2);
    ctx.strokeStyle = 'rgba(229, 27, 35, 0.6)';
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#E51B23';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('109.5°', cx + 18, cy - 14);

    // Draw Center Carbon atom (C)
    const cGrad = ctx.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, 22);
    cGrad.addColorStop(0, '#475569');
    cGrad.addColorStop(1, '#0F172A');
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fillStyle = cGrad;
    ctx.fill();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('C', cx, cy);

    // Draw Hydrogen atoms (H) sorted by depth
    projected.forEach((p) => {
      const hRadius = 14 * (220 / (220 + p.rz));
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
      ctx.font = 'bold 10px monospace';
      ctx.fillText('H', p.px, p.py);
    });
  }, [angle]);

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
              Laboratorio 3D: Geometría Tetraédrica del Carbono & Síntesis de Wöhler
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Hibridación sp³ (109.5°) • Transición Histórica Inorgánico → Orgánico (1828)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-red-50 text-[#E51B23] border border-red-200 text-[10px] font-bold font-mono">
            4 Enlaces Covalentes C—H
          </span>
        </div>
      </div>

      {/* Main Dual Stage: Left 3D Carbon model, Right Wöhler Synthesis */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 min-h-[360px]">
        {/* Left Column: Interactive Tetrahedral Model */}
        <div className="lg:col-span-6 flex flex-col bg-slate-50/70 rounded-xl border border-neutral-200 p-3 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E51B23]" />
              Geometría Espacial Tetraédrica (CH₄)
            </span>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                autoRotate
                  ? 'bg-red-50 text-[#E51B23] border-red-300 font-semibold'
                  : 'bg-white text-neutral-600 border-neutral-200'
              }`}
            >
              {autoRotate ? 'Pausar Rotación 3D' : 'Rotar 3D'}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
            <canvas
              ref={canvasRef}
              width={280}
              height={220}
              className="w-full max-w-[280px] h-[220px] mx-auto block cursor-grab active:cursor-grabbing"
              onClick={() => setAngle((prev) => prev + 0.3)}
            />
            <div className="absolute bottom-2 left-2 right-2 bg-white/90 border border-neutral-200 rounded-lg p-2 text-[10px] text-neutral-600 flex justify-between items-center shadow-xs">
              <span>Ángulo interenlace: <strong className="text-[#E51B23]">109.5°</strong></span>
              <span>Orbitales: <strong className="text-blue-600">sp³ equivalentes</strong></span>
            </div>
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
                  El cianato de amonio es una sal inorgánica iónica. Antes de 1828, se creía imposible convertirla en compuestos biológicos sin la "fuerza vital" de un organismo vivo.
                </p>
              )}
              {wohlerState === 'heating' && (
                <p className="text-amber-800 animate-pulse">
                  Reordenamiento atómico intramolecular inducido por calor: los enlaces iónicos se transforman en enlaces covalentes entre carbono, nitrógeno y oxígeno.
                </p>
              )}
              {wohlerState === 'urea' && (
                <p className="text-green-800 font-medium">
                  ¡Síntesis completada! Se obtuvo urea pura idéntica a la sintetizada en el ciclo hepático de mamíferos. Nace la química orgánica moderna.
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
              La <strong>urea</strong> es el principal producto final del catabolismo de aminoácidos y proteínas. Su cuantificación sérica (BUN / Nitrógeno Ureico) evalúa la tasa de filtración glomerular renal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
