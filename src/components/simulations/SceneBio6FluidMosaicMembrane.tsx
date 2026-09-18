import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Flame, Thermometer, Sparkles, Shield, Info } from 'lucide-react';

export const SceneBio6FluidMosaicMembrane: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState<number>(37);
  const [hasCholesterol, setHasCholesterol] = useState<boolean>(true);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(true);

  useEffect(() => {
    let animId: number;
    let t = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Fluidity wave speed and amplitude dependent on temperature and cholesterol
      const fluidityFactor = hasCholesterol
        ? Math.max(0.5, Math.min(1.5, (temperature - 15) / 22))
        : Math.max(0.2, Math.min(2.5, (temperature - 15) / 12));

      const waveSpeed = 0.03 * fluidityFactor;
      const waveAmp = 5 * fluidityFactor;

      t += waveSpeed;

      // Extracellular aqueous background (top)
      const topGrad = ctx.createLinearGradient(0, 0, 0, height / 2 - 35);
      topGrad.addColorStop(0, '#EFF6FF');
      topGrad.addColorStop(1, '#DBEAFE');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, height / 2 - 35);

      // Intracellular cytosol background (bottom)
      const botGrad = ctx.createLinearGradient(0, height / 2 + 35, 0, height);
      botGrad.addColorStop(0, '#FEF3C7');
      botGrad.addColorStop(1, '#FFFBEB');
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, height / 2 + 35, width, height - (height / 2 + 35));

      // Labels
      ctx.fillStyle = '#1E40AF';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('EXTRACELULAR (Acuoso)', 15, 18);

      ctx.fillStyle = '#92400E';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('CITOSOL INTRACELULAR', 15, height - 12);

      const count = 18;
      const step = (width - 40) / count;

      // Draw Top Leaflet Phospholipids
      for (let i = 0; i <= count; i++) {
        // Skip some positions to leave room for the integral protein
        if (i >= 8 && i <= 10) continue;

        const x = 20 + i * step + Math.sin(t + i * 0.4) * 2;
        const headY = height / 2 - 38 + Math.sin(t + i * 0.5) * waveAmp;

        // Polar Head
        ctx.beginPath();
        ctx.arc(x, headY, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2563EB';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Tails pointing down towards core
        ctx.beginPath();
        ctx.moveTo(x - 2, headY + 6);
        ctx.quadraticCurveTo(
          x - 4 + Math.sin(t + i) * 3,
          headY + 20,
          x - 1,
          headY + 32
        );
        ctx.moveTo(x + 2, headY + 6);
        ctx.quadraticCurveTo(
          x + 5 + Math.cos(t + i) * 3,
          headY + 20,
          x + 3,
          headY + 32
        );
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glycocalyx branches on top leaflet outside
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, headY - 6);
          ctx.lineTo(x - 4, headY - 18);
          ctx.lineTo(x + 3, headY - 26);
          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x + 3, headY - 26, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#059669';
          ctx.fill();
        }

        // Intercalated Cholesterol molecules (yellow rigid steroid badges)
        if (hasCholesterol && i % 3 === 1) {
          ctx.fillStyle = '#FBBF24';
          ctx.fillRect(x + 5, headY + 12, 4, 14);
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x + 5, headY + 12, 4, 14);
        }
      }

      // Draw Bottom Leaflet Phospholipids
      for (let i = 0; i <= count; i++) {
        if (i >= 8 && i <= 10) continue;

        const x = 20 + i * step + Math.sin(t + i * 0.4 + 1) * 2;
        const headY = height / 2 + 38 + Math.sin(t + i * 0.5 + 1) * waveAmp;

        // Polar Head
        ctx.beginPath();
        ctx.arc(x, headY, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2563EB';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Tails pointing up towards core
        ctx.beginPath();
        ctx.moveTo(x - 2, headY - 6);
        ctx.quadraticCurveTo(
          x - 4 + Math.sin(t + i + 2) * 3,
          headY - 20,
          x - 1,
          headY - 32
        );
        ctx.moveTo(x + 2, headY - 6);
        ctx.quadraticCurveTo(
          x + 5 + Math.cos(t + i + 2) * 3,
          headY - 20,
          x + 3,
          headY - 32
        );
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Intercalated Cholesterol on bottom leaflet
        if (hasCholesterol && i % 3 === 2) {
          ctx.fillStyle = '#FBBF24';
          ctx.fillRect(x + 5, headY - 26, 4, 14);
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x + 5, headY - 26, 4, 14);
        }
      }

      // Draw Transmembrane Channel Protein in center (crossing both layers)
      const proteinX = 20 + 9 * step;
      const proteinY = height / 2 + Math.sin(t * 0.8) * 3;

      ctx.fillStyle = '#E51B23';
      ctx.beginPath();
      ctx.roundRect(proteinX - 22, proteinY - 48, 44, 96, [8]);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Channel pore line
      ctx.strokeStyle = '#991B1B';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(proteinX, proteinY - 48);
      ctx.lineTo(proteinX, proteinY + 48);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PROTEÍNA', proteinX, proteinY - 6);
      ctx.fillText('INTEGRAL', proteinX, proteinY + 6);
      ctx.font = '8px sans-serif';
      ctx.fillText('(Canal)', proteinX, proteinY + 18);

      if (isSimRunning) {
        animId = requestAnimationFrame(render);
      }
    };

    if (isSimRunning) {
      animId = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animId);
  }, [temperature, hasCholesterol, isSimRunning]);

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 text-[#E51B23]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900">
              Modelo de Mosaico Fluido en Tiempo Real (Singer & Nicolson)
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              Bicapa Anfipática • Proteínas Integrales • Colesterol Regulador Térmico
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-700 font-mono">
            {temperature}°C
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              temperature >= 36 && temperature <= 38
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {temperature === 37 ? 'Fluidez Fisiológica Óptima' : temperature > 37 ? 'Hiperfluidez' : 'Gelificación'}
          </span>
        </div>
      </div>

      {/* Canvas Live Visualizer */}
      <div className="p-4 flex-1 flex flex-col space-y-3">
        <div className="relative rounded-xl border border-neutral-200 overflow-hidden bg-slate-50 shadow-inner">
          <canvas
            ref={canvasRef}
            width={580}
            height={240}
            className="w-full h-[240px] block"
          />

          {/* Quick interactive overlay legend */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 bg-white/90 backdrop-blur-xs p-2 rounded-lg border border-neutral-200 text-[10px] shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Cabezas Polares (Hidrofílicas)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-1 bg-amber-500 rounded" />
              <span>Colas de Ácidos Grasos (Cis)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-yellow-400 border border-yellow-600 rounded-xs" />
              <span>Colesterol (20-25%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Glucocálix (Reconocimiento)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
          {/* Temperature Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-800">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#E51B23]" />
                Temperatura Tisular (°C):
              </span>
              <span className="font-mono text-[#E51B23] font-bold">{temperature} °C</span>
            </div>
            <input
              type="range"
              min={15}
              max={45}
              step={1}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-[#E51B23] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
              <span>15°C (Hipotermia)</span>
              <span className="text-[#E51B23] font-bold">37°C (Fisiológico)</span>
              <span>45°C (Hipertermia/Desnaturalización)</span>
            </div>
          </div>

          {/* Cholesterol Buffer Toggle */}
          <div className="flex items-center justify-between pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-neutral-200 pt-2 md:pt-0">
            <div>
              <span className="text-xs font-bold text-neutral-900 block">
                Colesterol Membranal (20-25%):
              </span>
              <p className="text-[10px] text-neutral-600">
                Amortigua extremos térmicos impidiendo tanto la rigidez como la hiperfluidez.
              </p>
            </div>
            <button
              onClick={() => setHasCholesterol(!hasCholesterol)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                hasCholesterol
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              {hasCholesterol ? 'Colesterol ACTIVO' : 'Sin Colesterol'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
