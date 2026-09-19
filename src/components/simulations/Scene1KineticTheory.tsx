import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles, Gauge, Compass, HelpCircle, CheckCircle2, XCircle, Calculator } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export const Scene1KineticTheory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'particles' | 'barometer' | 'problem' | 'quiz'>('particles');

  // Particle Simulation State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperatureK, setTemperatureK] = useState<number>(300);
  const [particleCount, setParticleCount] = useState<number>(45);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(true);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [pressureScore, setPressureScore] = useState<number>(1.0);

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Torricelli Barometer State
  // Altitudes: 0m (Nivel del mar) = 760 mmHg | 2550m (Cuenca) = ~560 mmHg | 4000m = ~460 mmHg
  const [altitudeMeters, setAltitudeMeters] = useState<number>(0);

  // Calculate Barometric Pressure based on standard barometric formula approximation
  // P ≈ 760 * exp(-h / 8400)
  const calcPatm = (h: number) => {
    return Math.round(760 * Math.exp(-h / 8400));
  };

  const currentPatm_mmHg = calcPatm(altitudeMeters);
  const currentPatm_atm = (currentPatm_mmHg / 760).toFixed(3);
  const currentPatm_kPa = ((currentPatm_mmHg / 760) * 101.325).toFixed(2);
  const currentPatm_psi = ((currentPatm_mmHg / 760) * 14.696).toFixed(2);
  const columnHeightPercent = Math.min(100, Math.round((currentPatm_mmHg / 760) * 85));

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // Initialize particles
  const initParticles = (count: number, tempK: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    const speedFactor = Math.sqrt(tempK / 300) * 2.2;

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.5 + 1.2) * speedFactor;
      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 4.5,
        color: tempK > 450 ? '#F87171' : tempK > 320 ? '#FBBF24' : '#60A5FA',
      });
    }
    particlesRef.current = particles;
  };

  useEffect(() => {
    if (activeTab === 'particles') {
      initParticles(particleCount, temperatureK);
    }
  }, [particleCount, activeTab]);

  useEffect(() => {
    const speedFactor = Math.sqrt(temperatureK / 300);
    particlesRef.current.forEach((p) => {
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
      const targetSpeed = (Math.random() * 1.5 + 1.2) * 2.2 * speedFactor;
      const ratio = targetSpeed / currentSpeed;
      p.vx *= ratio;
      p.vy *= ratio;
      p.color = temperatureK > 450 ? '#F87171' : temperatureK > 320 ? '#FBBF24' : '#60A5FA';
    });
  }, [temperatureK]);

  // Simulation physics loop
  useEffect(() => {
    if (activeTab !== 'particles') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localCollisions = 0;

    const render = () => {
      if (!isSimRunning) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      const particles = particlesRef.current;
      const w = canvas.width - 10;
      const h = canvas.height - 10;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.radius <= 5) {
          p.x = 5 + p.radius;
          p.vx = -p.vx;
          localCollisions++;
        } else if (p.x + p.radius >= w) {
          p.x = w - p.radius;
          p.vx = -p.vx;
          localCollisions++;
        }

        if (p.y - p.radius <= 5) {
          p.y = 5 + p.radius;
          p.vy = -p.vy;
          localCollisions++;
        } else if (p.y + p.radius >= h) {
          p.y = h - p.radius;
          p.vy = -p.vy;
          localCollisions++;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.radius + p2.radius) {
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            const kx = p.vx - p2.vx;
            const ky = p.vy - p2.vy;
            const pVal = 2 * (nx * kx + ny * ky) / 2;

            p.vx -= pVal * nx;
            p.vy -= pVal * ny;
            p2.vx += pVal * nx;
            p2.vy += pVal * ny;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    const interval = setInterval(() => {
      setCollisionCount(localCollisions);
      const approxP = ((localCollisions / 140) * (temperatureK / 300)).toFixed(2);
      setPressureScore(Math.max(0.2, Number(approxP)));
      localCollisions = 0;
    }, 1000);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearInterval(interval);
    };
  }, [isSimRunning, temperatureK, activeTab]);

  const kB = 1.38e-23;
  const avgKineticEnergy = ((1.5 * kB * temperatureK) * 1e21).toFixed(2);

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-y-auto">
      {/* Module Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-2 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('particles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'particles'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador de Micro-Partículas</span>
          </button>
          <button
            onClick={() => setActiveTab('barometer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'barometer'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Barómetro de Torricelli Virtual</span>
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'problem'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Problema Modelo 2.1</span>
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
            <span>Autoevaluación 2.1</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
          Módulo 2.1 • Cátedra UCACUE
        </span>
      </div>

      {/* Tab 1: Simulador de Micro-Partículas */}
      {activeTab === 'particles' && (
        <div className="flex-1 flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Cámara Cinético-Molecular Tridimensional
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setIsSimRunning(!isSimRunning)}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-200"
                >
                  {isSimRunning ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                  {isSimRunning ? 'Pausar' : 'Reanudar'}
                </button>
                <button
                  onClick={() => {
                    setTemperatureK(300);
                    initParticles(particleCount, 300);
                  }}
                  className="p-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg border border-neutral-200"
                  title="Reiniciar a 300K"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-[240px] rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-inner flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={480}
                height={260}
                className="w-full h-full object-contain"
              />

              <div className="absolute top-3 left-3 flex flex-col gap-1 text-[11px] bg-white/95 px-3 py-2 rounded-lg border border-neutral-200 shadow-md">
                <div className="text-neutral-600">
                  Energía Cinética Media: <span className="text-amber-600 font-mono font-bold">{avgKineticEnergy} × 10⁻²¹ J</span>
                </div>
                <div className="text-neutral-600">
                  Presión Calculada: <span className="text-red-600 font-mono font-bold">~{pressureScore} atm</span>
                </div>
                <div className="text-neutral-600">
                  Impactos Elásticos: <span className="text-emerald-600 font-mono font-bold">{collisionCount} / s</span>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-lg border border-neutral-200 shadow-md text-xs">
                <Flame className={`w-4 h-4 ${temperatureK > 400 ? 'text-red-500 animate-bounce' : 'text-blue-500'}`} />
                <span className="font-mono font-bold text-neutral-900">{temperatureK} K</span>
                <span className="text-neutral-500 text-[10px]">({(temperatureK - 273.15).toFixed(1)} °C)</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 flex flex-col justify-between gap-3 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
            <div>
              <h5 className="font-bold text-red-600 uppercase tracking-wide text-[11px] mb-2 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                Variables de Estado del Gas
              </h5>

              <div className="mb-3">
                <div className="flex justify-between text-neutral-700 mb-1">
                  <span className="font-medium">Temperatura Absoluta (T)</span>
                  <span className="font-mono font-bold text-amber-600">{temperatureK} K</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={650}
                  step={10}
                  value={temperatureK}
                  onChange={(e) => setTemperatureK(Number(e.target.value))}
                  className="w-full accent-red-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>100 K (Frío)</span>
                  <span>300 K (27 °C)</span>
                  <span>650 K (Caliente)</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-neutral-700 mb-1">
                  <span className="font-medium">Número de Partículas (n)</span>
                  <span className="font-mono font-bold text-blue-600">{particleCount}</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={80}
                  step={5}
                  value={particleCount}
                  onChange={(e) => setParticleCount(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-neutral-200 shadow-xs">
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                5 Postulados de la Teoría Cinético-Molecular
              </span>
              <ul className="space-y-1 text-[10px] text-neutral-700 leading-tight">
                <li>• 1. Movimiento caótico y rectilíneo continuo.</li>
                <li>• 2. Fuerzas intermoleculares prácticamente nulas.</li>
                <li>• 3. Volumen molecular despreciable frente al contenedor.</li>
                <li>• 4. Energía cinética media estrictamente proporcional a T (Kelvin).</li>
                <li>• 5. Colisiones perfectamente elásticas generan la presión (P = F / A).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Barómetro de Torricelli Virtual */}
      {activeTab === 'barometer' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs">
          {/* Columna de Mercurio Visual */}
          <div className="lg:col-span-5 bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="font-bold text-red-600 text-xs">Columna Barométrica de Torricelli</span>
              <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-neutral-200">Hg (Mercurio)</span>
            </div>

            {/* Dibujo de la Columna */}
            <div className="relative w-48 h-64 bg-white rounded-xl border border-neutral-200 p-2 flex flex-col items-center justify-end shadow-inner">
              {/* Vaciador / Tubo de Torricelli */}
              <div className="relative w-8 h-48 bg-neutral-100 border border-neutral-400 rounded-t-lg overflow-hidden flex flex-col justify-end">
                <div
                  style={{ height: `${columnHeightPercent}%` }}
                  className="w-full bg-gradient-to-t from-neutral-600 to-neutral-400 transition-all duration-300 relative flex items-center justify-center"
                >
                  <span className="text-[9px] font-mono text-white font-bold rotate-90 whitespace-nowrap">
                    {currentPatm_mmHg} mm
                  </span>
                </div>
              </div>

              {/* Cubeta inferior */}
              <div className="w-32 h-8 bg-neutral-500 border border-neutral-700 rounded-b-lg mt-0.5 flex items-center justify-center text-[10px] text-white font-semibold shadow-xs">
                Cubeta de Hg
              </div>

              {/* Marcador de Presión */}
              <div className="absolute top-2 right-2 text-right">
                <span className="text-[10px] text-neutral-500 block">Altura de Columna:</span>
                <span className="text-base font-mono font-bold text-red-600">{currentPatm_mmHg} mmHg</span>
              </div>
            </div>

            <p className="text-[10px] text-neutral-500 italic mt-2 text-center">
              A mayor altitud sobre el nivel del mar, menor masa de aire suprayacente y menor altura de columna.
            </p>
          </div>

          {/* Controles de Altitud y Tabla de Unidades */}
          <div className="lg:col-span-7 bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-neutral-800 text-xs">Ajuste de Altitud Geográfica:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setAltitudeMeters(0)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                      altitudeMeters === 0
                        ? 'bg-red-600 text-white border-red-700'
                        : 'bg-white text-neutral-700 border-neutral-300'
                    }`}
                  >
                    Nivel del Mar (0 m)
                  </button>
                  <button
                    onClick={() => setAltitudeMeters(2550)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                      altitudeMeters === 2550
                        ? 'bg-red-600 text-white border-red-700'
                        : 'bg-white text-neutral-700 border-neutral-300'
                    }`}
                  >
                    Cuenca (2550 m)
                  </button>
                  <button
                    onClick={() => setAltitudeMeters(4000)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                      altitudeMeters === 4000
                        ? 'bg-red-600 text-white border-red-700'
                        : 'bg-white text-neutral-700 border-neutral-300'
                    }`}
                  >
                    Páramo (4000 m)
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-neutral-700 mb-1">
                  <span className="font-medium">Altitud sobre el nivel del mar:</span>
                  <span className="font-mono font-bold text-red-600">{altitudeMeters} metros</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={50}
                  value={altitudeMeters}
                  onChange={(e) => setAltitudeMeters(Number(e.target.value))}
                  className="w-full accent-red-600 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Conversión de unidades en tiempo real */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <div className="p-2 bg-white rounded-lg border border-neutral-200 text-center shadow-xs">
                  <span className="text-[10px] text-neutral-500 uppercase block font-medium">Milímetros Hg</span>
                  <span className="text-sm font-mono font-bold text-red-600">{currentPatm_mmHg} mmHg</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-200 text-center shadow-xs">
                  <span className="text-[10px] text-neutral-500 uppercase block font-medium">Atmósferas</span>
                  <span className="text-sm font-mono font-bold text-neutral-800">{currentPatm_atm} atm</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-200 text-center shadow-xs">
                  <span className="text-[10px] text-neutral-500 uppercase block font-medium">Kilopascales (SI)</span>
                  <span className="text-sm font-mono font-bold text-blue-600">{currentPatm_kPa} kPa</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-200 text-center shadow-xs">
                  <span className="text-[10px] text-neutral-500 uppercase block font-medium">Libras / pulg²</span>
                  <span className="text-sm font-mono font-bold text-amber-600">{currentPatm_psi} psi</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 text-[11px] text-neutral-700">
              <strong className="text-red-700 block mb-0.5">🩺 Correlación Clínica Universitaria:</strong>
              En la ciudad de Cuenca (2550 m s.n.m.), la presión atmosférica es de solo ~560 mmHg (vs 760 mmHg a nivel del mar). Esto disminuye la presión parcial de oxígeno inspirado, explicando por qué los pacientes recién llegados requieren aclimatación fisiológica.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Problema Modelo 2.1 */}
      {activeTab === 'problem' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-red-600" />
              <h4 className="font-bold text-sm text-neutral-900">
                Problema Modelo 2.1: Calibración de Manómetro Hospitalario
              </h4>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-bold text-neutral-900 mb-1">📋 Enunciado Oficial de la Cátedra:</p>
              <p className="text-neutral-700 italic leading-relaxed">
                "Un manómetro hospitalario conectado a una línea central de gases anestésicos indica una presión de 1140 mmHg y una temperatura de 25,0 °C.<br />
                a) Calcule la presión en atmósferas (atm) y kilopascales (kPa).<br />
                b) Convierta la temperatura a la escala absoluta Kelvin (K)."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-red-600 block mb-1">Solución a) Presión en atm y kPa:</span>
                <div className="space-y-1.5 font-mono text-[11px] text-neutral-800">
                  <p>P = 1140 mmHg × (1 atm / 760 mmHg)</p>
                  <p className="text-red-600 font-bold text-xs">P = 1,50 atm</p>
                  <p className="mt-2">P = 1,50 atm × (101,325 kPa / 1 atm)</p>
                  <p className="text-blue-600 font-bold text-xs">P = 151,99 kPa</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                <span className="font-bold text-red-600 block mb-1">Solución b) Temperatura Absoluta:</span>
                <div className="space-y-1.5 font-mono text-[11px] text-neutral-800">
                  <p>T(K) = °C + 273,15</p>
                  <p>T(K) = 25,0 + 273,15</p>
                  <p className="text-amber-600 font-bold text-xs">T = 298,15 K</p>
                  <p className="text-[10px] text-neutral-500 mt-2 font-sans">
                    ¡Regla de oro médica: en todas las fórmulas de gases se usa estrictamente la escala Kelvin!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-neutral-200 text-center font-mono text-[11px] text-neutral-600">
            Factores de conversión oficiales: 1 atm = 760 mmHg = 101,325 kPa • Cero absoluto = -273,15 °C
          </div>
        </div>
      )}

      {/* Tab 4: Autoevaluación 2.1 */}
      {activeTab === 'quiz' && (
        <div className="flex-1 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600" />
                <h4 className="font-bold text-sm text-neutral-900">Autoevaluación Formativa: Módulo 2.1</h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">Pregunta 1 de 1</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-200 mb-3 shadow-xs">
              <p className="font-semibold text-neutral-900 text-[13px] leading-relaxed">
                ¿Qué ocurre con la energía cinética media de las moléculas de un gas ideal si su temperatura aumenta de 200 K a 400 K?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'A', text: 'A) Se reduce a la mitad debido al aumento de colisiones.' },
                { id: 'B', text: 'B) Permanece constante porque la masa molecular no cambia.' },
                { id: 'C', text: 'C) Se duplica, al ser directamente proporcional a la temperatura Kelvin.' },
                { id: 'D', text: 'D) Cuadriplica su valor independientemente del volumen.' },
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
                  <span>Respuesta Correcta: Opción C</span>
                </div>
                <p className="text-neutral-700">
                  <strong>Explicación del Prof. Aguilar:</strong> Según el cuarto postulado de la teoría cinético-molecular, la energía cinética media es directamente proporcional a la temperatura Kelvin (Ec = 3/2 · k · T). Al duplicarse la temperatura de 200 K a 400 K, la energía cinética molecular media se duplica exactamente.
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
