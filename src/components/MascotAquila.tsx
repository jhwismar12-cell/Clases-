import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotMood } from '../types';
import { Sparkles, GraduationCap, Volume2 } from 'lucide-react';

interface MascotAquilaProps {
  mood?: MascotMood;
  isSpeaking?: boolean;
  currentSpeechText?: string;
  customVisualUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  onClick?: () => void;
}

export const MascotAquila: React.FC<MascotAquilaProps> = ({
  mood = 'explaining',
  isSpeaking = false,
  currentSpeechText,
  customVisualUrl,
  size = 'md',
  showBadge = true,
  onClick,
}) => {
  const [beakOpen, setBeakOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Beak flapping animation when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setBeakOpen(false);
      return;
    }
    const interval = setInterval(() => {
      setBeakOpen((prev) => !prev);
    }, 180);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: 'w-28 h-36',
    md: 'w-44 h-56',
    lg: 'w-60 h-76',
    xl: 'w-80 h-96',
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center select-none ${onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''}`}
    >
      {/* Speech bubble indicator if speaking */}
      <AnimatePresence>
        {isSpeaking && currentSpeechText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-16 z-30 max-w-xs bg-white text-neutral-900 text-xs px-3.5 py-2 rounded-xl shadow-xl border-2 border-red-600"
          >
            <div className="flex items-center gap-1.5 text-red-600 font-bold mb-0.5">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Prof. Aquila explicando...</span>
            </div>
            <p className="line-clamp-2 italic text-neutral-700">{currentSpeechText}</p>
            {/* Arrow */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-600" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Character Display */}
      {customVisualUrl ? (
        <div className={`relative ${sizeClasses[size]} rounded-2xl overflow-hidden shadow-2xl border-2 border-red-500/60 group`}>
          <img
            src={customVisualUrl}
            alt="Prof. Aquila"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
            <span className="text-red-400 font-bold text-xs tracking-wider">AQUILA</span>
            <span className="text-[10px] text-slate-300">Mascota UCACUE #ÁguilasRojas</span>
          </div>
        </div>
      ) : (
        /* High-Craft Vector & Animated Character: Aquila in Doctor White Coat & Red Hoodie */
        <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
          {/* Subtle glow / energy ring */}
          <div className="absolute inset-2 bg-gradient-to-br from-red-600/20 via-amber-500/10 to-transparent rounded-full blur-xl animate-pulse -z-10" />

          <svg
            viewBox="0 0 200 240"
            className="w-full h-full drop-shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Feathers gradient */}
              <linearGradient id="whiteFeatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>

              {/* Beak gradient */}
              <linearGradient id="beakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="70%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Red University Hoodie */}
              <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="60%" stopColor="#B91C1C" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>

              {/* Doctor Lab Coat (Bata blanca médica) */}
              <linearGradient id="labCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="65%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              {/* Safety Goggles Glass */}
              <linearGradient id="gogglesGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
              </linearGradient>

              {/* Shadow filter */}
              <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* --- BODY & CLOTHING --- */}
            {/* Torso Base / Red Hoodie undercoat */}
            <path
              d="M 50 170 Q 100 160 150 170 L 165 240 L 35 240 Z"
              fill="url(#hoodieGrad)"
            />

            {/* Doctor White Lab Coat (Bata Blanca Universitaria) */}
            <path
              d="M 45 175 Q 100 165 155 175 L 162 240 L 120 240 L 115 195 L 85 195 L 80 240 L 38 240 Z"
              fill="url(#labCoatGrad)"
              filter="url(#softShadow)"
            />
            {/* Lab Coat Lapels */}
            <path
              d="M 70 175 L 88 215 L 100 185 L 112 215 L 130 175 L 118 172 L 100 178 L 82 172 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Lab Coat Stethoscope / Pocket & Pen */}
            <rect x="52" y="195" width="22" height="24" rx="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="58" y1="192" x2="58" y2="204" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="63" y1="192" x2="63" y2="203" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />

            {/* Red Hoodie Drawstrings & visible red collar */}
            <path
              d="M 86 178 Q 84 195 82 205"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 114 178 Q 116 195 118 205"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* University Badge on Chest */}
            <g transform="translate(126, 192)">
              <rect x="0" y="0" width="26" height="15" rx="3" fill="#991B1B" stroke="#FBBF24" strokeWidth="0.8" />
              <text x="13" y="10.5" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                UCACUE
              </text>
            </g>

            {/* Safety Goggles hanging around neck */}
            <g transform="translate(68, 158)">
              {/* Strap */}
              <path d="M 0 10 Q 32 2 64 10" fill="none" stroke="#1E293B" strokeWidth="3" />
              {/* Left Lens Frame */}
              <rect x="6" y="2" width="22" height="14" rx="5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
              <rect x="8" y="4" width="18" height="10" rx="3" fill="url(#gogglesGlass)" />
              {/* Right Lens Frame */}
              <rect x="36" y="2" width="22" height="14" rx="5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
              <rect x="38" y="4" width="18" height="10" rx="3" fill="url(#gogglesGlass)" />
              {/* Bridge */}
              <line x1="28" y1="9" x2="36" y2="9" stroke="#475569" strokeWidth="3" />
            </g>

            {/* --- EAGLE HEAD (Aquila) --- */}
            {/* Feathery back crest */}
            <path
              d="M 60 85 Q 50 65 65 48 Q 78 30 100 28 Q 122 30 135 48 Q 150 65 140 85 Q 155 105 148 135 Q 138 165 100 170 Q 62 165 52 135 Q 45 105 60 85 Z"
              fill="url(#whiteFeatherGrad)"
              filter="url(#softShadow)"
            />

            {/* Crown feathers detail */}
            <path d="M 90 28 Q 95 18 100 16 Q 105 18 110 28 Z" fill="#FFFFFF" />
            <path d="M 78 35 Q 82 23 88 25" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            <path d="M 122 35 Q 118 23 112 25" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />

            {/* Cheek feather tufts */}
            <path d="M 52 110 L 40 120 L 55 126 Z" fill="#F1F5F9" />
            <path d="M 148 110 L 160 120 L 145 126 Z" fill="#F1F5F9" />
            <path d="M 56 128 L 44 138 L 60 144 Z" fill="#E2E8F0" />
            <path d="M 144 128 L 156 138 L 140 144 Z" fill="#E2E8F0" />

            {/* Brow ridge / Expressive eagle forehead */}
            <path
              d="M 68 82 Q 85 75 100 78 Q 115 75 132 82 Q 120 70 100 72 Q 80 70 68 82 Z"
              fill="#CBD5E1"
            />

            {/* EYES */}
            {/* Left Eye */}
            <g id="leftEye">
              {/* Sclera & Iris */}
              <ellipse cx="80" cy="88" rx="10" ry={isBlinking ? 1 : 8} fill="#FEF08A" stroke="#78350F" strokeWidth="1" />
              {!isBlinking && (
                <>
                  <circle cx="81" cy="88" r="4.5" fill="#1C1917" />
                  <circle cx="82.5" cy="86" r="1.5" fill="#FFFFFF" />
                </>
              )}
              {/* Determined eyebrow */}
              <path d="M 68 80 Q 82 78 92 84" fill="none" stroke="#64748B" strokeWidth="3.2" strokeLinecap="round" />
            </g>

            {/* Right Eye */}
            <g id="rightEye">
              {/* Sclera & Iris */}
              <ellipse cx="120" cy="88" rx="10" ry={isBlinking ? 1 : 8} fill="#FEF08A" stroke="#78350F" strokeWidth="1" />
              {!isBlinking && (
                <>
                  <circle cx="119" cy="88" r="4.5" fill="#1C1917" />
                  <circle cx="117.5" cy="86" r="1.5" fill="#FFFFFF" />
                </>
              )}
              {/* Determined eyebrow */}
              <path d="M 132 80 Q 118 78 108 84" fill="none" stroke="#64748B" strokeWidth="3.2" strokeLinecap="round" />
            </g>

            {/* CURVED EAGLE BEAK (Animated Opening/Closing) */}
            <g id="eagleBeak">
              {/* Upper Beak */}
              <path
                d="M 85 96 Q 100 92 115 96 Q 122 112 118 128 Q 108 144 100 148 Q 92 144 82 128 Q 78 112 85 96 Z"
                fill="url(#beakGrad)"
                filter="url(#softShadow)"
              />
              {/* Nostril Cere */}
              <ellipse cx="94" cy="99" rx="1.8" ry="1.2" fill="#78350F" opacity="0.8" />
              <ellipse cx="106" cy="99" rx="1.8" ry="1.2" fill="#78350F" opacity="0.8" />

              {/* Lower Beak (Moves down when speaking) */}
              <path
                d={
                  beakOpen
                    ? "M 88 126 Q 100 132 112 126 Q 105 142 100 144 Q 95 142 88 126 Z"
                    : "M 88 120 Q 100 123 112 120 Q 105 130 100 132 Q 95 130 88 120 Z"
                }
                fill="#D97706"
                stroke="#B45309"
                strokeWidth="0.8"
                style={{ transition: 'all 0.1s ease-out' }}
              />

              {/* Mouth Interior (Visible when beak opens) */}
              {beakOpen && (
                <path
                  d="M 91 122 Q 100 126 109 122 Q 105 134 100 136 Q 95 134 91 122 Z"
                  fill="#7F1D1D"
                />
              )}

              {/* Sharp Beak Tip Highlight */}
              <path
                d="M 99 128 L 100 146 L 101 128"
                stroke="#FEF08A"
                strokeWidth="1.2"
                fill="none"
              />
            </g>

            {/* PROFESSOR POINTER WAND (Holding in right wing) */}
            <g
              transform={
                mood === 'pointing'
                  ? "rotate(-25 155 170) translate(10, -10)"
                  : "rotate(-8 155 170)"
              }
              style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              {/* Wand shaft */}
              <line x1="145" y1="185" x2="195" y2="70" stroke="#71717A" strokeWidth="3" strokeLinecap="round" />
              <line x1="145" y1="185" x2="195" y2="70" stroke="#E4E4E7" strokeWidth="1" strokeLinecap="round" />
              {/* Handle */}
              <line x1="143" y1="190" x2="152" y2="170" stroke="#B91C1C" strokeWidth="5.5" strokeLinecap="round" />
              {/* Laser / Indicator Tip */}
              <circle cx="196" cy="68" r="3.5" fill="#EF4444" />
              <circle cx="196" cy="68" r="6.5" fill="#EF4444" opacity="0.4" className="animate-ping" />
            </g>

            {/* Right Wing Gesture over chest */}
            <path
              d="M 148 180 Q 165 195 155 220 Q 135 225 125 210 Z"
              fill="url(#labCoatGrad)"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}

      {/* Mascot Info Label */}
      {showBadge && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-[11px] font-bold rounded-full shadow-md border border-red-400/40">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>PROF. AQUILA</span>
            <span className="text-red-200 text-[10px]">#ÁguilasRojas</span>
          </div>
          <div className="text-[10px] text-neutral-500 mt-0.5 font-medium">
            Mascota Univ. Católica de Cuenca
          </div>
        </div>
      )}
    </div>
  );
};
