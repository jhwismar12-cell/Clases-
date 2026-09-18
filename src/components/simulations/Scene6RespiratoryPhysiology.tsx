import React, { useState } from 'react';
import { Activity, Heart, ArrowDown, ArrowUp, Info } from 'lucide-react';

export const Scene6RespiratoryPhysiology: React.FC = () => {
  // Alveolar partial pressures
  const [alveolarPO2, setAlveolarPO2] = useState<number>(100);
  const [alveolarPCO2, setAlveolarPCO2] = useState<number>(40);

  // Venous entry partial pressures
  const venousPO2 = 40;
  const venousPCO2 = 46;

  // Gradients
  const deltaO2 = alveolarPO2 - venousPO2;
  const deltaCO2 = venousPCO2 - alveolarPCO2;

  // Erythrocyte saturation approximation (Hill equation / sigmoid curve)
  const saturationO2 = Math.min(
    100,
    Math.round((Math.pow(alveolarPO2, 2.7) / (Math.pow(alveolarPO2, 2.7) + Math.pow(26.6, 2.7))) * 100)
  );

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-600 animate-pulse" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
            Fisiología Respiratoria: Hematosis Alvéolo-Capilar y Gradientes Parciales
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1.5 font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            SatO₂ Arterial: {saturationO2}%
          </span>
        </div>
      </div>

      {/* Main Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        {/* Left: Alveolar-Capillary Cross Section Diagram */}
        <div className="lg:col-span-8 bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex flex-col justify-between">
          <div className="relative h-64 bg-white rounded-xl border border-neutral-200 p-3 overflow-hidden flex flex-col justify-between shadow-inner">
            {/* Upper: Alveolar Sac (Air Space) */}
            <div className="relative flex-1 bg-blue-50/60 rounded-xl p-3 border border-blue-200 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                  Saco Alveolar Pulmonar (Aire Fresco Inspirado)
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">PH₂O = 47 mmHg | PN₂ = 573 mmHg</span>
              </div>

              {/* Alveolar Partial Pressure Gauges */}
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

            {/* Middle: Alveolar-Capillary Membrane Barrier & Gas Diffusion Arrows */}
            <div className="h-10 my-1 bg-neutral-100 rounded border-y border-dashed border-neutral-300 relative flex items-center justify-around px-8">
              <span className="absolute -top-2 left-2 text-[9px] bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-600 font-mono font-semibold">
                Membrana Alvéolo-Capilar (0.5 µm)
              </span>

              {/* O2 Diffusion Down Arrow */}
              <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-blue-200 shadow-xs">
                <ArrowDown className="w-4 h-4 text-blue-600 animate-bounce" />
                <span>Difusión O₂ (ΔP = +{deltaO2} mmHg)</span>
              </div>

              {/* CO2 Diffusion Up Arrow */}
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold bg-white px-2 py-0.5 rounded border border-amber-200 shadow-xs">
                <ArrowUp className="w-4 h-4 text-amber-600 animate-bounce" />
                <span>Salida CO₂ (ΔP = -{deltaCO2} mmHg)</span>
              </div>
            </div>

            {/* Lower: Capillary Blood Stream with Erythrocytes */}
            <div className="h-20 bg-gradient-to-r from-purple-100 via-rose-50 to-red-100 rounded-xl p-2.5 border border-red-200 flex items-center justify-between relative overflow-hidden">
              {/* Deoxygenated Blood Entry */}
              <div className="text-[11px] font-mono bg-white p-1.5 rounded border border-purple-300 text-purple-800 z-10 shadow-xs">
                <div className="text-[9px] text-neutral-500 font-semibold">Sangre Venosa Entrante</div>
                <div className="font-bold">PO₂ = {venousPO2} mmHg</div>
                <div className="font-bold">PCO₂ = {venousPCO2} mmHg</div>
              </div>

              {/* Red blood cells moving across */}
              <div className="flex-1 flex justify-around items-center px-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-9 h-7 rounded-full border shadow-xs flex items-center justify-center text-[9px] font-bold text-white transition-colors duration-500 ${
                      i < 2 ? 'bg-purple-800 border-purple-900' : 'bg-red-600 border-red-700'
                    }`}
                  >
                    Hb-{i < 2 ? 'Ven' : 'O₂'}
                  </div>
                ))}
              </div>

              {/* Oxygenated Blood Exit */}
              <div className="text-[11px] font-mono bg-white p-1.5 rounded border border-red-300 text-red-700 z-10 shadow-xs">
                <div className="text-[9px] text-neutral-500 font-semibold">Sangre Arterial Saliente</div>
                <div className="font-bold">PO₂ = {alveolarPO2} mmHg</div>
                <div className="font-bold">PCO₂ = {alveolarPCO2} mmHg</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Blood Transport Chemistry & Controls */}
        <div className="lg:col-span-4 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col justify-between text-xs">
          <div>
            <h5 className="font-bold text-red-600 uppercase tracking-wide text-[11px] mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Bioquímica del Transporte de Gases
            </h5>

            {/* O2 Transport Card */}
            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 mb-2 shadow-xs">
              <span className="text-[11px] font-bold text-blue-600 block mb-1">
                Transporte de Oxígeno (O₂)
              </span>
              <div className="space-y-1 text-neutral-700 text-[11px]">
                <div className="flex justify-between">
                  <span>• Unido a Hemoglobina (Oxi-Hb):</span>
                  <span className="font-bold text-blue-600">98% - 99%</span>
                </div>
                <div className="flex justify-between">
                  <span>• Disuelto libre en plasma:</span>
                  <span className="font-bold text-neutral-500">1% - 2%</span>
                </div>
              </div>
            </div>

            {/* CO2 Transport Card */}
            <div className="p-2.5 bg-white rounded-lg border border-neutral-200 mb-3 shadow-xs">
              <span className="text-[11px] font-bold text-amber-600 block mb-1">
                Transporte de Dióxido de Carbono (CO₂)
              </span>
              <div className="space-y-1 text-neutral-700 text-[11px]">
                <div className="flex justify-between">
                  <span>• Ion Bicarbonato (HCO₃⁻):</span>
                  <span className="font-bold text-amber-600">70%</span>
                </div>
                <div className="flex justify-between">
                  <span>• Carbaminohemoglobina:</span>
                  <span className="font-bold text-amber-600">20% - 25%</span>
                </div>
                <div className="flex justify-between">
                  <span>• Disuelto en plasma:</span>
                  <span className="font-bold text-neutral-500">5% - 10%</span>
                </div>
              </div>
            </div>

            {/* Slider to simulate changes in alveolar ventilation */}
            <div className="bg-white p-2.5 rounded-lg border border-neutral-200 shadow-xs">
              <span className="text-[10px] text-neutral-500 font-semibold block mb-1">
                Simular Ventilación Alveolar:
              </span>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-neutral-700">PO₂ Alveolar:</span>
                <span className="font-mono font-bold text-blue-600">{alveolarPO2} mmHg</span>
              </div>
              <input
                type="range"
                min={60}
                max={120}
                step={2}
                value={alveolarPO2}
                onChange={(e) => setAlveolarPO2(Number(e.target.value))}
                className="w-full accent-red-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
