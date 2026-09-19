import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotMood } from '../types';
import { Volume2, Sparkles, GraduationCap, Eye, EyeOff } from 'lucide-react';

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
  currentSpeechText = '',
  customVisualUrl,
  size = 'md',
  showBadge = true,
  onClick,
}) => {
  // Beak aperture (0.0 = closed, 1.0 = fully open)
  const [aperture, setAperture] = useState<number>(0);
  const targetApertureRef = useRef<number>(0);
  const currentApertureRef = useRef<number>(0);

  // Micro-gestures state
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [gazeX, setGazeX] = useState<number>(0); // -3 (looking left towards board) to +1 (looking at camera)
  const [gazeY, setGazeY] = useState<number>(0);
  const [headTilt, setHeadTilt] = useState<number>(0); // base degrees
  const [speechTilt, setSpeechTilt] = useState<number>(0); // subtle speech head tilt degrees
  const [breathingPhase, setBreathingPhase] = useState<number>(0);

  // Speech timing and syllable parsing
  const speechIndexRef = useRef<number>(0);

  // 1. Organic Word-Driven Beak Sync Engine
  useEffect(() => {
    if (!isSpeaking || !currentSpeechText) {
      targetApertureRef.current = 0;
      return;
    }

    // Clean text into phonetic segments
    const cleanText = currentSpeechText.toLowerCase();
    const words = cleanText.split(/\s+/).filter(Boolean);
    if (words.length === 0) return;

    let charPos = 0;
    const interval = setInterval(() => {
      // Find current character being articulated
      const char = cleanText[charPos % cleanText.length];
      charPos++;

      // Phonetic opening weights in Spanish
      if (char === ' ' || char === '.' || char === ',' || char === ';' || char === ':') {
        // Pauses between words and clauses
        targetApertureRef.current = 0.05;
      } else if (char === 'a' || char === 'á' || char === 'o' || char === 'ó') {
        // Wide open vowels
        targetApertureRef.current = 0.85 + Math.random() * 0.15;
      } else if (char === 'e' || char === 'é' || char === 'u' || char === 'ú') {
        // Medium open vowels
        targetApertureRef.current = 0.55 + Math.random() * 0.15;
      } else if (char === 'i' || char === 'í' || char === 'y') {
        // Narrow open vowels
        targetApertureRef.current = 0.35 + Math.random() * 0.1;
      } else if (char === 'p' || char === 'b' || char === 'm') {
        // Bilabials: snap closed
        targetApertureRef.current = 0.0;
      } else if (char === 'f' || char === 'v' || char === 's' || char === 'z' || char === 't' || char === 'd') {
        // Fricatives & dentals: partial opening
        targetApertureRef.current = 0.25 + Math.random() * 0.1;
      } else {
        // Other consonants (r, l, c, g, j, n)
        targetApertureRef.current = 0.4 + Math.random() * 0.15;
      }
    }, 75); // ~13.3 phonemes/sec, matches natural Spanish medical speech tempo

    // Real-time word boundary handler from Web Speech API
    const handleWordBoundary = (event: Event) => {
      const customEv = event as CustomEvent<{ charIndex: number; charLength: number; text: string }>;
      if (!customEv.detail) return;
      const { charIndex, charLength, text } = customEv.detail;
      const word = text.slice(charIndex, charIndex + (charLength || 4)).toLowerCase();
      
      // Calculate word vocalic power
      const hasWideVowel = /[aáoó]/.test(word);
      const hasMedVowel = /[eéuú]/.test(word);
      const target = hasWideVowel ? 0.95 : hasMedVowel ? 0.7 : 0.45;
      
      targetApertureRef.current = target;
      setTimeout(() => {
        targetApertureRef.current = 0.15; // syllabic snap closure
      }, Math.max(60, Math.min(180, word.length * 28)));
    };

    window.addEventListener('aquila-speech-word', handleWordBoundary);

    return () => {
      clearInterval(interval);
      window.removeEventListener('aquila-speech-word', handleWordBoundary);
    };
  }, [isSpeaking, currentSpeechText]);

  // 2. Smooth 60fps Spring Interpolation for Beak & Breathing
  useEffect(() => {
    let animId: number;
    let t = 0;

    const loop = () => {
      t += 0.04;
      setBreathingPhase(Math.sin(t));

      // Lerp beak aperture smoothly
      const diff = targetApertureRef.current - currentApertureRef.current;
      currentApertureRef.current += diff * 0.35; // spring ease factor
      setAperture(Math.max(0, Math.min(1, currentApertureRef.current)));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 3. Natural Blinking (Double-blinks & Single-blinks)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3000 + Math.random() * 3200; // blink every 3 - 6.2s
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);

          // 25% chance of a realistic quick double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => setIsBlinking(false), 120);
            }, 140);
          }
        }, 140);

        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // 4. Subtle Saccadic Eye Movements & Living Head Tilts
  useEffect(() => {
    const saccadeInterval = setInterval(() => {
      if (mood === 'pointing') {
        // Look towards the chalkboard / simulation (leftward)
        setGazeX(-2.5);
        setGazeY(-0.5);
        setHeadTilt(-1.8);
      } else if (mood === 'thinking') {
        // Look slightly upward thoughtfully
        setGazeX(-1);
        setGazeY(-2);
        setHeadTilt(2.2);
      } else if (mood === 'enthusiastic' || mood === 'celebrating') {
        // Direct eager look at user
        setGazeX(0);
        setGazeY(0.5);
        setHeadTilt(Math.random() > 0.5 ? 1.5 : -1.5);
      } else {
        // Explaining: alternate between looking at the board and the viewer
        const rand = Math.random();
        if (rand < 0.5) {
          setGazeX(-2); // blackboard
          setGazeY(0);
          setHeadTilt(-1.2);
        } else if (rand < 0.85) {
          setGazeX(0); // viewer
          setGazeY(0);
          setHeadTilt(0.5);
        } else {
          setGazeX(1); // slight right
          setGazeY(0.5);
          setHeadTilt(1.0);
        }
      }
    }, 2800);

    return () => clearInterval(saccadeInterval);
  }, [mood]);

  // 5. Subtle living head tilts & micro-gestures during speech (pedagogical emphasis)
  useEffect(() => {
    if (!isSpeaking) {
      setSpeechTilt(0);
      return;
    }

    // Sequence of natural pedagogical tilts with subtle nodding and gentle head cocks
    const tiltAngles = [-2.2, 1.8, -1.0, 2.5, -1.6, 1.2, 0.4, -0.8];
    let index = 0;

    // Trigger initial subtle tilt immediately upon speech start
    setSpeechTilt(tiltAngles[0]);

    const speechTiltInterval = setInterval(() => {
      index = (index + 1) % tiltAngles.length;
      const organicVariation = (Math.random() - 0.5) * 0.6;
      setSpeechTilt(tiltAngles[index] + organicVariation);
    }, 1100);

    return () => {
      clearInterval(speechTiltInterval);
      setSpeechTilt(0);
    };
  }, [isSpeaking]);

  const totalHeadTilt = headTilt + speechTilt;

  const sizeClasses = {
    sm: 'w-28 h-38',
    md: 'w-48 h-64',
    lg: 'w-64 h-80',
    xl: 'w-84 h-100',
  };

  // Calculate dynamic mouth geometry based on aperture (0 to 1)
  const lowerBeakDrop = aperture * 14; // pixels to drop
  const mouthOpeningHeight = aperture * 11;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center select-none ${
        onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''
      }`}
    >
      {/* Speech bubble indicator if speaking */}
      <AnimatePresence>
        {isSpeaking && currentSpeechText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-16 z-30 max-w-xs bg-white/95 backdrop-blur-xs text-neutral-900 text-xs px-3.5 py-2 rounded-xl shadow-xl border-2 border-[#E51B23]"
          >
            <div className="flex items-center gap-1.5 text-[#E51B23] font-bold mb-0.5">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wide">Prof. Aguilar explicando:</span>
            </div>
            <p className="line-clamp-2 italic text-neutral-800 text-[11px] leading-snug">
              {currentSpeechText}
            </p>
            {/* Arrow pointer */}
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#E51B23]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Character Display */}
      {customVisualUrl ? (
        <div
          className={`relative ${sizeClasses[size]} rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E51B23]/70 group`}
        >
          <img
            src={customVisualUrl}
            alt="Prof. Aguilar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
            <span className="text-red-400 font-bold text-xs tracking-wider">PROF. AGUILAR</span>
            <span className="text-[10px] text-slate-300">Medicina UCACUE #ÁguilasRojas</span>
          </div>
        </div>
      ) : (
        /* High-Craft Lifelike Animated Doctor Eagle matching the uploaded photo */
        <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
          {/* Subtle medical ambiance aura */}
          <div className="absolute inset-2 bg-gradient-to-br from-red-600/15 via-teal-500/10 to-transparent rounded-full blur-xl animate-pulse -z-10" />

          <svg
            viewBox="0 0 220 260"
            className="w-full h-full drop-shadow-xl overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Feathers: pristine white to silver-blue shading */}
              <linearGradient id="whiteFeatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>

              {/* Red Feathers Crest & Neck Plumage (matching the photo) */}
              <linearGradient id="redCrestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>

              {/* Realistic Eagle Beak Gradient */}
              <linearGradient id="beakRealisticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="85%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>

              {/* Golden Eagle Eye Gradient */}
              <radialGradient id="eagleEyeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="65%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </radialGradient>

              {/* Modern Teal/Cyan Frame Spectacles */}
              <linearGradient id="spectaclesTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="50%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#0F766E" />
              </linearGradient>

              {/* Stethoscope Rubber Tubing */}
              <linearGradient id="stethoscopeTube" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* Lab Coat Gradient */}
              <linearGradient id="labCoatWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              {/* Red Tie Gradient */}
              <linearGradient id="tieRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B91C1C" />
                <stop offset="50%" stopColor="#991B1B" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>

              {/* Drop Shadow */}
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.2" />
              </filter>

              {/* CSS Keyframe Animations for Lifelike Beak Movement during Speech */}
              <style>{`
                @keyframes beakMandibleTalk {
                  0% {
                    transform: translateY(0px) scaleY(1);
                  }
                  15% {
                    transform: translateY(4.5px) scaleY(1.12);
                  }
                  30% {
                    transform: translateY(1.4px) scaleY(1.03);
                  }
                  45% {
                    transform: translateY(7.0px) scaleY(1.2);
                  }
                  60% {
                    transform: translateY(2.2px) scaleY(1.05);
                  }
                  75% {
                    transform: translateY(7.8px) scaleY(1.24);
                  }
                  88% {
                    transform: translateY(2.5px) scaleY(1.06);
                  }
                  100% {
                    transform: translateY(0px) scaleY(1);
                  }
                }

                @keyframes oralCavitySync {
                  0%, 100% {
                    opacity: 0.3;
                    transform: scaleY(0.6);
                  }
                  20% {
                    opacity: 0.95;
                    transform: scaleY(1.18);
                  }
                  40% {
                    opacity: 0.45;
                    transform: scaleY(0.75);
                  }
                  60% {
                    opacity: 1;
                    transform: scaleY(1.28);
                  }
                  80% {
                    opacity: 0.55;
                    transform: scaleY(0.85);
                  }
                }

                @keyframes upperBeakEmphasis {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  25% {
                    transform: translateY(-0.9px);
                  }
                  70% {
                    transform: translateY(-1.4px);
                  }
                }

                .animate-beak-talk {
                  animation: beakMandibleTalk 0.32s infinite ease-in-out;
                  transform-origin: 110px 120px;
                }

                .animate-oral-cavity {
                  animation: oralCavitySync 0.32s infinite ease-in-out;
                  transform-origin: 110px 120px;
                }

                .animate-upper-beak {
                  animation: upperBeakEmphasis 0.48s infinite ease-in-out;
                  transform-origin: 110px 92px;
                }
              `}</style>
            </defs>

            {/* --- TORSO & MEDICAL COAT with subtle breathing float --- */}
            <g transform={`translate(0, ${breathingPhase * 1.8})`}>
              {/* White Doctor Coat Shoulders & Torso */}
              <path
                d="M 40 185 Q 110 170 180 185 L 195 260 L 25 260 Z"
                fill="url(#labCoatWhite)"
                filter="url(#softGlow)"
              />

              {/* Red Polo Shirt undercoat (Visible collar & V-neck) */}
              <path
                d="M 78 185 L 110 180 L 142 185 L 126 215 L 94 215 Z"
                fill="#DC2626"
              />
              {/* White piping on red polo collar */}
              <path
                d="M 76 182 L 96 212 L 102 212 L 80 180 Z"
                fill="#FFFFFF"
              />
              <path
                d="M 144 182 L 124 212 L 118 212 L 140 180 Z"
                fill="#FFFFFF"
              />

              {/* Dark Red Doctor Tie */}
              <polygon points="106,200 114,200 116,212 110,215 104,212" fill="#7F1D1D" />
              <polygon points="104,212 116,212 120,250 110,258 100,250" fill="url(#tieRedGrad)" />
              {/* Tie stripes */}
              <line x1="105" y1="222" x2="115" y2="225" stroke="#991B1B" strokeWidth="1.5" />
              <line x1="104" y1="235" x2="116" y2="238" stroke="#991B1B" strokeWidth="1.5" />

              {/* Lab Coat Lapels */}
              <path
                d="M 68 185 L 88 230 L 110 240 L 98 186 Z"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              <path
                d="M 152 185 L 132 230 L 110 240 L 122 186 Z"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />

              {/* Breast Pocket with Blue and Red Medical Pens */}
              <rect x="52" y="210" width="26" height="30" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              {/* Blue Pen */}
              <rect x="58" y="202" width="4" height="15" rx="1.5" fill="#2563EB" />
              <rect x="59" y="206" width="1.5" height="7" fill="#CBD5E1" />
              {/* Red Pen */}
              <rect x="66" y="202" width="4" height="15" rx="1.5" fill="#DC2626" />
              <rect x="67" y="206" width="1.5" height="7" fill="#CBD5E1" />

              {/* Right Pocket */}
              <rect x="142" y="212" width="26" height="30" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              {/* Coat Central Button */}
              <circle cx="110" cy="248" r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />

              {/* Medical Stethoscope */}
              {/* Left Tube */}
              <path
                d="M 72 185 Q 55 210 60 235 Q 65 250 78 250 Q 88 250 88 238"
                fill="none"
                stroke="url(#stethoscopeTube)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Right Tube with Metallic Chestpiece Bell */}
              <path
                d="M 148 185 Q 165 210 162 235 Q 160 245 152 245"
                fill="none"
                stroke="url(#stethoscopeTube)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Metallic Stethoscope Bell (Diafragma) */}
              <circle cx="152" cy="245" r="9" fill="#94A3B8" stroke="#475569" strokeWidth="1.2" />
              <circle cx="152" cy="245" r="6.5" fill="#E2E8F0" />
              <circle cx="152" cy="245" r="2" fill="#0F172A" />

              {/* Red Feathered Hand / Wing holding Laser Pointer */}
              <g
                transform={
                  mood === 'pointing'
                    ? `rotate(-14 185 210) translate(0, -6)`
                    : `rotate(${Math.sin(breathingPhase) * 2} 185 210)`
                }
                style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                {/* Red feathers forearm/wing */}
                <path
                  d="M 170 205 Q 185 200 198 215 Q 192 230 178 232 Z"
                  fill="url(#redCrestGrad)"
                  filter="url(#softGlow)"
                />
                {/* Feather fingers clasping wand */}
                <ellipse cx="185" cy="216" rx="5" ry="3.5" fill="#991B1B" />
                <ellipse cx="185" cy="222" rx="5" ry="3.5" fill="#991B1B" />
                <ellipse cx="185" cy="228" rx="5" ry="3.5" fill="#991B1B" />

                {/* Telescopic Metallic Laser Pointer Wand */}
                <line x1="185" y1="238" x2="202" y2="90" stroke="#71717A" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="185" y1="238" x2="202" y2="90" stroke="#E4E4E7" strokeWidth="1.2" strokeLinecap="round" />
                {/* Metallic Grip Rings */}
                <line x1="184" y1="230" x2="187" y2="210" stroke="#3F3F46" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="186" cy="220" r="1.5" fill="#EF4444" />

                {/* Glowing Laser Pointer Tip */}
                <circle cx="202" cy="88" r="3.2" fill="#EF4444" />
                <circle cx="202" cy="88" r="6" fill="#EF4444" opacity="0.5" className="animate-ping" />
                {/* Emitted laser ray (subtle glow) */}
                <line
                  x1="202"
                  y1="88"
                  x2="150"
                  y2="30"
                  stroke="#EF4444"
                  strokeWidth="1.2"
                  strokeDasharray="4,4"
                  opacity={isSpeaking ? 0.7 : 0.3}
                />
              </g>
            </g>

            {/* --- EAGLE HEAD & NECK (With Red Crest & Articulated Beak) --- */}
            <g
              transform={`translate(110, 105) rotate(${totalHeadTilt}) translate(-110, -105)`}
              style={{
                transition: isSpeaking
                  ? 'transform 0.58s cubic-bezier(0.34, 1.35, 0.64, 1)'
                  : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform',
                transformOrigin: '110px 105px',
              }}
            >
              {/* Red Feather Ruff / Collar (matching photo) */}
              <path
                d="M 62 145 Q 50 168 75 186 Q 110 196 145 186 Q 170 168 158 145 Z"
                fill="url(#redCrestGrad)"
                filter="url(#softGlow)"
              />
              {/* Red collar feather layers */}
              <path d="M 72 165 L 82 188 L 92 170 L 104 192 L 116 170 L 128 192 L 138 168 L 148 185 Z" fill="#7F1D1D" opacity="0.6" />

              {/* Red Crest Feathers on top of head (Proud eagle mohawk from photo) */}
              <g id="redCrest">
                {/* Center tall feather */}
                <path
                  d="M 104 38 Q 110 8 112 4 Q 116 8 116 38 Z"
                  fill="url(#redCrestGrad)"
                  filter="url(#softGlow)"
                />
                {/* Left crest feather */}
                <path
                  d="M 94 44 Q 96 16 102 12 Q 106 20 108 42 Z"
                  fill="url(#redCrestGrad)"
                />
                {/* Right crest feather */}
                <path
                  d="M 112 42 Q 118 18 122 14 Q 124 22 126 44 Z"
                  fill="url(#redCrestGrad)"
                />
                {/* Outer fringe red feathers */}
                <path d="M 85 52 Q 86 30 92 24 Q 96 32 98 52 Z" fill="#B91C1C" />
                <path d="M 122 52 Q 128 32 132 26 Q 134 34 135 52 Z" fill="#B91C1C" />
              </g>

              {/* Head Base: Majestic White Plumage */}
              <path
                d="M 65 92 Q 54 62 76 42 Q 110 32 144 42 Q 166 62 155 92 Q 164 125 152 152 Q 110 165 68 152 Q 56 125 65 92 Z"
                fill="url(#whiteFeatherGrad)"
                filter="url(#softGlow)"
              />

              {/* Realistic White Feather Tuft Textures */}
              <path d="M 70 85 L 56 95 L 72 100 Z" fill="#F1F5F9" />
              <path d="M 150 85 L 164 95 L 148 100 Z" fill="#F1F5F9" />
              <path d="M 64 108 L 50 118 L 68 124 Z" fill="#E2E8F0" />
              <path d="M 156 108 L 170 118 L 152 124 Z" fill="#E2E8F0" />
              <path d="M 70 130 L 58 140 L 74 144 Z" fill="#CBD5E1" />
              <path d="M 150 130 L 162 140 L 146 144 Z" fill="#CBD5E1" />

              {/* Brow Ridge / Expressive Eagle Forehead */}
              <path
                d="M 76 80 Q 94 72 110 74 Q 126 72 144 80 Q 130 68 110 70 Q 90 68 76 80 Z"
                fill="#CBD5E1"
                opacity="0.8"
              />

              {/* --- EYES (Amber/Golden with Saccades & Blinking) --- */}
              {/* Left Eye */}
              <g id="leftEye">
                <ellipse cx="88" cy="88" rx="10.5" ry={isBlinking ? 1 : 8.5} fill="url(#eagleEyeGrad)" stroke="#78350F" strokeWidth="1.2" />
                {!isBlinking && (
                  <>
                    {/* Pupil with gaze offset */}
                    <circle cx={88 + gazeX} cy={88 + gazeY} r="4.2" fill="#0F172A" />
                    {/* Catchlight reflections */}
                    <circle cx={86.5 + gazeX * 0.5} cy={86 + gazeY * 0.5} r="1.5" fill="#FFFFFF" />
                    <circle cx={89.5 + gazeX * 0.5} cy={89 + gazeY * 0.5} r="0.8" fill="#FFFFFF" opacity="0.8" />
                  </>
                )}
                {/* Determined feathered eyebrow */}
                <path
                  d={
                    mood === 'enthusiastic'
                      ? "M 74 80 Q 88 74 100 82"
                      : mood === 'thinking'
                      ? "M 74 82 Q 88 79 100 85"
                      : "M 74 78 Q 88 76 100 82"
                  }
                  fill="none"
                  stroke="#475569"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </g>

              {/* Right Eye */}
              <g id="rightEye">
                <ellipse cx="132" cy="88" rx="10.5" ry={isBlinking ? 1 : 8.5} fill="url(#eagleEyeGrad)" stroke="#78350F" strokeWidth="1.2" />
                {!isBlinking && (
                  <>
                    {/* Pupil with gaze offset */}
                    <circle cx={132 + gazeX} cy={88 + gazeY} r="4.2" fill="#0F172A" />
                    {/* Catchlight reflections */}
                    <circle cx={130.5 + gazeX * 0.5} cy={86 + gazeY * 0.5} r="1.5" fill="#FFFFFF" />
                    <circle cx={133.5 + gazeX * 0.5} cy={89 + gazeY * 0.5} r="0.8" fill="#FFFFFF" opacity="0.8" />
                  </>
                )}
                {/* Determined feathered eyebrow */}
                <path
                  d={
                    mood === 'enthusiastic'
                      ? "M 146 80 Q 132 74 120 82"
                      : mood === 'thinking'
                      ? "M 146 82 Q 132 79 120 85"
                      : "M 146 78 Q 132 76 120 82"
                  }
                  fill="none"
                  stroke="#475569"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </g>

              {/* --- MODERN TEAL / CYAN MEDICAL SPECTACLES (Matching Photo) --- */}
              <g id="spectacles" filter="url(#softGlow)">
                {/* Left Lens Frame (Rounded Rectangular Modern) */}
                <rect x="74" y="76" width="28" height="23" rx="5" fill="none" stroke="url(#spectaclesTeal)" strokeWidth="2.5" />
                <rect x="75" y="77" width="26" height="21" rx="4" fill="#0D9488" fillOpacity="0.08" />
                {/* Right Lens Frame */}
                <rect x="118" y="76" width="28" height="23" rx="5" fill="none" stroke="url(#spectaclesTeal)" strokeWidth="2.5" />
                <rect x="119" y="77" width="26" height="21" rx="4" fill="#0D9488" fillOpacity="0.08" />
                {/* Center Bridge over beak */}
                <path d="M 102 82 Q 110 78 118 82" fill="none" stroke="url(#spectaclesTeal)" strokeWidth="2.8" strokeLinecap="round" />
                {/* Left & Right Temple Arms */}
                <line x1="74" y1="82" x2="62" y2="80" stroke="url(#spectaclesTeal)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="146" y1="82" x2="158" y2="80" stroke="url(#spectaclesTeal)" strokeWidth="2.5" strokeLinecap="round" />
                {/* Anti-reflective lens gloss glint */}
                <line x1="78" y1="80" x2="88" y2="92" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                <line x1="122" y1="80" x2="132" y2="92" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
              </g>

              {/* --- CURVED RAPTOR BEAK WITH REALISTIC PHONETIC ANIMATION --- */}
              <g id="articulatedEagleBeak">
                {/* Oral Cavity / Mouth Interior (Revealed dynamically as beak opens or speaks) */}
                {(isSpeaking || aperture > 0.04) && (
                  <g
                    id="mouthInterior"
                    className={isSpeaking ? 'animate-oral-cavity' : ''}
                    style={{
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    {/* Dark red interior chamber */}
                    <path
                      d={`M 92 120 Q 110 122 128 120 Q 120 ${120 + Math.max(mouthOpeningHeight, isSpeaking ? 5 : 0) * 1.5} 110 ${
                        122 + Math.max(mouthOpeningHeight, isSpeaking ? 5 : 0) * 1.8
                      } Q 100 ${120 + Math.max(mouthOpeningHeight, isSpeaking ? 5 : 0) * 1.5} 92 120 Z`}
                      fill="#581C1C"
                      stroke="#450A0A"
                      strokeWidth="0.8"
                    />
                    {/* Tongue tip */}
                    <ellipse
                      cx="110"
                      cy={121 + Math.max(mouthOpeningHeight, isSpeaking ? 5 : 0) * 0.8}
                      rx="7"
                      ry={Math.max(mouthOpeningHeight, isSpeaking ? 5 : 0) * 0.45}
                      fill="#EF4444"
                      opacity="0.85"
                    />
                  </g>
                )}

                {/* Lower Mandible (Moves down and articulates with speech phonemes and CSS keyframe chatter) */}
                <g
                  id="lowerMandibleGroup"
                  className={isSpeaking ? 'animate-beak-talk' : ''}
                  style={{
                    transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  <path
                    d={`M 92 ${118 + lowerBeakDrop * 0.7} Q 110 ${122 + lowerBeakDrop * 0.7} 128 ${
                      118 + lowerBeakDrop * 0.7
                    } Q 118 ${136 + lowerBeakDrop} 110 ${140 + lowerBeakDrop} Q 102 ${
                      136 + lowerBeakDrop
                    } 92 ${118 + lowerBeakDrop * 0.7} Z`}
                    fill="#D97706"
                    stroke="#92400E"
                    strokeWidth="1.2"
                    filter="url(#softGlow)"
                  />
                </g>

                {/* Upper Beak (Hooked raptor beak with subtle micro-flex during speech) */}
                <g
                  id="upperBeakGroup"
                  className={isSpeaking ? 'animate-upper-beak' : ''}
                >
                  <path
                    d={`M 90 92 Q 110 88 130 92 Q 138 108 132 124 Q 118 ${148 - aperture * 2} 110 ${
                      158 - aperture * 2
                    } Q 102 ${148 - aperture * 2} 88 124 Q 82 108 90 92 Z`}
                    fill="url(#beakRealisticGrad)"
                    filter="url(#softGlow)"
                  />

                  {/* Beak Nostril Cere (Fosas nasales del ave rapaz) */}
                  <ellipse cx="101" cy="97" rx="2.5" ry="1.5" fill="#78350F" opacity="0.9" />
                  <ellipse cx="119" cy="97" rx="2.5" ry="1.5" fill="#78350F" opacity="0.9" />
                  <line x1="102" y1="96" x2="105" y2="100" stroke="#FDE047" strokeWidth="0.8" opacity="0.7" />

                  {/* Sharp Curved Beak Specular Ridge */}
                  <path
                    d={`M 109 104 Q 110 126 110 ${156 - aperture * 2}`}
                    fill="none"
                    stroke="#FEF08A"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* Mascot Status Badge */}
      {showBadge && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#E51B23] to-[#B91C1C] text-white text-[11px] font-bold rounded-full shadow-md border border-red-400/40">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>PROF. AGUILAR</span>
            <span className="text-red-200 text-[10px]">#ÁguilasRojas</span>
          </div>
          <div className="text-[10px] text-neutral-500 mt-0.5 font-medium flex items-center justify-center gap-1">
            <span>Cátedra de Química • UCACUE</span>
            {isSpeaking && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
