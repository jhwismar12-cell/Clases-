import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export const Scene1KineticTheory: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperatureK, setTemperatureK] = useState<number>(300);
  const [particleCount, setParticleCount] = useState<number>(45);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(true);
  const [collisionCount, setCollisionCount] = useState<number>(0);
  const [pressureScore, setPressureScore] = useState<number>(1.0);

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

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
    initParticles(particleCount, temperatureK);
  }, [particleCount]);

  // Adjust particle speeds when temperature changes
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

      // Draw clean white background for container
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw container box with clean red/neutral border
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

        // Wall collisions (elastic collision + momentum transfer)
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

        // Inter-particle collisions (elastic)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.radius + p2.radius) {
            // Normal vector
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            // Relative velocity
            const kx = p.vx - p2.vx;
            const ky = p.vy - p2.vy;
            const pVal = 2 * (nx * kx + ny * ky) / 2;

            p.vx -= pVal * nx;
            p.vy -= pVal * ny;
            p2.vx += pVal * nx;
            p2.vy += pVal * ny;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Collision rate sampler
    const interval = setInterval(() => {
      setCollisionCount(localCollisions);
      const calculatedP = Number(((localCollisions * (temperatureK / 300)) / 120).toFixed(2));
      setPressureScore(Math.max(0.2, calculatedP));
      localCollisions = 0;
    }, 1000);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearInterval(interval);
    };
  }, [isSimRunning, temperatureK]);

  // Average kinetic energy: Ec = 3/2 * kB * T
  const kB = 1.38e-23;
  const avgKineticEnergy = ((1.5 * kB * temperatureK) * 1e21).toFixed(2); // scaled for display

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
      {/* Simulation Visual Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Cámara de Partículas Cinéticas (Gas Ideal)
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

        {/* Canvas container */}
        <div className="relative flex-1 min-h-[220px] rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            className="w-full h-full object-contain"
          />

          {/* Real-time overlay readouts (Keep numbers vibrant/colorful!) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 text-[11px] bg-white/95 px-3 py-2 rounded-lg border border-neutral-200 shadow-md">
            <div className="text-neutral-600">
              Energía Cinética Media: <span className="text-amber-600 font-mono font-bold">{avgKineticEnergy} × 10⁻²¹ J</span>
            </div>
            <div className="text-neutral-600">
              Presión de Colisión: <span className="text-red-600 font-mono font-bold">~{pressureScore} atm</span>
            </div>
            <div className="text-neutral-600">
              Frecuencia de Choques: <span className="text-emerald-600 font-mono font-bold">{collisionCount} / s</span>
            </div>
          </div>

          {/* Thermometer indicator */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-lg border border-neutral-200 shadow-md text-xs">
            <Flame className={`w-4 h-4 ${temperatureK > 400 ? 'text-red-500 animate-bounce' : 'text-blue-500'}`} />
            <span className="font-mono font-bold text-neutral-900">{temperatureK} K</span>
            <span className="text-neutral-500 text-[10px]">({(temperatureK - 273.15).toFixed(1)} °C)</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Postulates */}
      <div className="w-full lg:w-72 flex flex-col justify-between gap-3 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
        <div>
          <h5 className="font-bold text-red-600 uppercase tracking-wide text-[11px] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Variables del Sistema
          </h5>

          {/* Temperature Slider */}
          <div className="mb-3.5">
            <div className="flex justify-between text-neutral-700 mb-1">
              <span className="font-medium">Temperatura Térmica (T)</span>
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
              <span>300 K (Ambiente)</span>
              <span>650 K (Caliente)</span>
            </div>
          </div>

          {/* Particle Count Slider */}
          <div className="mb-3">
            <div className="flex justify-between text-neutral-700 mb-1">
              <span className="font-medium">Cantidad de Partículas (n)</span>
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

        {/* 5 Postulates Card */}
        <div className="bg-white p-2.5 rounded-lg border border-neutral-200 shadow-xs">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
            5 Postulados Fundamentales
          </span>
          <ul className="space-y-1 text-[11px] text-neutral-700">
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">1.</span>
              <span>Movimiento caótico y rectilíneo continuo</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">2.</span>
              <span>Fuerzas intermoleculares nulas</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">3.</span>
              <span>Volumen molecular despreciable</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">4.</span>
              <span>Energía cinética ∝ Temperatura (K)</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">5.</span>
              <span>Colisiones perfectamente elásticas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
