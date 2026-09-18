import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BookOpen,
  Sliders,
  Maximize,
  Volume2,
  VolumeX,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Share2,
  FileText,
  Award,
  Video,
  Menu,
  X,
} from 'lucide-react';
import { UNIVERSITY_INFO, SCRIPT_SCENES } from './data/scriptData';
import { MASTERCLASS_COURSES } from './data/coursesData';
import { ScriptScene, MascotMood, SceneSpeechSegment } from './types';
import { prepareTextForSpeech } from './utils/speechUtils';
import { MascotAquila } from './components/MascotAquila';
import { VideoPlayerControls } from './components/VideoPlayerControls';
import { Scene1KineticTheory } from './components/simulations/Scene1KineticTheory';
import { Scene2StateVariables } from './components/simulations/Scene2StateVariables';
import { Scene3GasLawsSimulator } from './components/simulations/Scene3GasLawsSimulator';
import { Scene4IdealGasSynthesis } from './components/simulations/Scene4IdealGasSynthesis';
import { Scene5GasMixtures } from './components/simulations/Scene5GasMixtures';
import { Scene6RespiratoryPhysiology } from './components/simulations/Scene6RespiratoryPhysiology';
import { Scene7ClinicalChallenge } from './components/simulations/Scene7ClinicalChallenge';
import { SceneBio1CarbonOrigin } from './components/simulations/SceneBio1CarbonOrigin';
import { SceneBio2Carbohydrates } from './components/simulations/SceneBio2Carbohydrates';
import { SceneBio3DisaccharidesHaworth } from './components/simulations/SceneBio3DisaccharidesHaworth';
import { SceneBio4LipidsTriglycerides } from './components/simulations/SceneBio4LipidsTriglycerides';
import { SceneBio5SpecializedLipids } from './components/simulations/SceneBio5SpecializedLipids';
import { SceneBio6FluidMosaicMembrane } from './components/simulations/SceneBio6FluidMosaicMembrane';
import { SceneBio7BiomoleculesChallenge } from './components/simulations/SceneBio7BiomoleculesChallenge';
import { ImageGeneratorModal } from './components/ImageGeneratorModal';
import { AquilaTutorChat } from './components/AquilaTutorChat';
import { AcademicGlossaryDrawer } from './components/AcademicGlossaryDrawer';
import { GlossaryHighlighter } from './components/GlossaryHighlighter';

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('biomoleculas-membranas');
  const currentCourse = MASTERCLASS_COURSES.find((c) => c.id === selectedCourseId) || MASTERCLASS_COURSES[0];
  const scenes = currentCourse.scenes;
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'video' | 'guion' | 'mascota'>('video');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [customVisualsByScene, setCustomVisualsByScene] = useState<Record<string, string>>({});

  const handleSelectCourse = (courseId: string) => {
    stopSpeech();
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    playedSegmentIdsRef.current.clear();
    setSelectedCourseId(courseId);
  };

  // Modals
  const [isImageGenOpen, setIsImageGenOpen] = useState<boolean>(false);
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);

  const handleOpenGlossaryTerm = (termId: string) => {
    setSelectedGlossaryTermId(termId);
    setIsGlossaryOpen(true);
  };

  // Mascot state
  const [mascotMood, setMascotMood] = useState<MascotMood>('explaining');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSpeechText, setCurrentSpeechText] = useState<string>('');

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const spanishVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const currentSpeakingIdRef = useRef<string>('');
  const playedSegmentIdsRef = useRef<Set<string>>(new Set());
  const keepAliveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechSynthUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentScene = scenes[currentSceneIndex] || scenes[0];
  const totalDuration = scenes.reduce((acc, s) => acc + s.durationSeconds, 0);

  // Initialize and cache Spanish voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find((v) => v.lang === 'es-EC') ||
          voices.find((v) => v.lang === 'es-ES') ||
          voices.find((v) => v.lang === 'es-MX') ||
          voices.find((v) => v.lang.startsWith('es')) ||
          voices.find((v) => v.lang.toLowerCase().includes('spanish'));
        if (preferredVoice) {
          spanishVoiceRef.current = preferredVoice;
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Prevent Chromium/WebKit 15-second speech cutoff bug
  const startSpeechKeepAlive = () => {
    if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
    keepAliveTimerRef.current = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 9000);
  };

  const stopSpeechKeepAlive = () => {
    if (keepAliveTimerRef.current) {
      clearInterval(keepAliveTimerRef.current);
      keepAliveTimerRef.current = null;
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopSpeechKeepAlive();
    setIsSpeaking(false);
    isSpeakingRef.current = false;
    currentSpeakingIdRef.current = '';
  };

  // Synchronize Speech Synthesis (Aquila's Academic Voice)
  const speakCurrentSpeech = (segment: SceneSpeechSegment) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    // Do not restart if already speaking this exact segment
    if (currentSpeakingIdRef.current === segment.id && isSpeakingRef.current) {
      return;
    }

    window.speechSynthesis.cancel();
    stopSpeechKeepAlive();

    const formattedText = prepareTextForSpeech(segment.text);
    const utterance = new SpeechSynthesisUtterance(formattedText);
    utterance.lang = 'es-ES';
    if (spanishVoiceRef.current) {
      utterance.voice = spanishVoiceRef.current;
    }

    // Dynamic tempo based on playback speed (calibrated for academic articulation)
    utterance.rate = Math.max(0.85, Math.min(1.4, playbackSpeed * 1.0));
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      currentSpeakingIdRef.current = segment.id;
      startSpeechKeepAlive();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      currentSpeakingIdRef.current = '';
      stopSpeechKeepAlive();
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis notice:', e.error);
      }
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      currentSpeakingIdRef.current = '';
      stopSpeechKeepAlive();
    };

    // Keep global reference on window to prevent garbage collection abort
    (window as any).__aquilaUtterance = utterance;
    speechSynthUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Determine current active speech segment based on relative time in scene
  // PREVENTS looping back to speechSegments[0] once past dialogue duration!
  const sceneRelativeTime = Math.max(0, currentTime - currentScene.startSeconds);
  let activeSpeechSegment = currentScene.speechSegments.find(
    (seg) =>
      sceneRelativeTime >= seg.timestampStart &&
      sceneRelativeTime < seg.timestampStart + seg.duration
  );

  if (!activeSpeechSegment) {
    const firstSeg = currentScene.speechSegments[0];
    const lastSeg = currentScene.speechSegments[currentScene.speechSegments.length - 1];
    if (firstSeg && sceneRelativeTime < firstSeg.timestampStart) {
      activeSpeechSegment = firstSeg;
    } else if (lastSeg) {
      // Stay on the last dialogue segment; DO NOT loop back to the first segment!
      activeSpeechSegment = lastSeg;
    }
  }

  const currentSpeechSegment = activeSpeechSegment || currentScene.speechSegments[0];

  // Update current speech text and trigger speech synthesis when segment changes
  useEffect(() => {
    if (currentSpeechSegment) {
      setCurrentSpeechText(currentSpeechSegment.text);
      if (isPlaying && voiceEnabled) {
        if (!playedSegmentIdsRef.current.has(currentSpeechSegment.id)) {
          playedSegmentIdsRef.current.add(currentSpeechSegment.id);
          speakCurrentSpeech(currentSpeechSegment);
        }
      }
    }
  }, [currentSpeechSegment?.id, isPlaying, voiceEnabled]);

  // Main playback timer loop with speech awareness
  useEffect(() => {
    if (isPlaying && !isInteractiveMode) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          // If voice is enabled and Aquila is still speaking:
          // HOLD the timer if we are at the end of the current speech segment,
          // guaranteeing Aquila NEVER gets cut off before finishing his dialogue!
          if (voiceEnabled && isSpeakingRef.current && currentSpeechSegment) {
            const segmentEndTime =
              currentScene.startSeconds +
              currentSpeechSegment.timestampStart +
              currentSpeechSegment.duration;
            if (prevTime + 1 * playbackSpeed >= segmentEndTime) {
              return prevTime; // Hold timer until speech utterance completes naturally!
            }
          }

          const nextTime = prevTime + 1 * playbackSpeed;
          if (nextTime >= totalDuration) {
            setIsPlaying(false);
            stopSpeech();
            return 0;
          }

          // Check if we advanced to next scene
          const currentSceneEnd = currentScene.startSeconds + currentScene.durationSeconds;
          if (nextTime >= currentSceneEnd && currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex((idx) => idx + 1);
            playedSegmentIdsRef.current.clear();
          }

          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeech();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [
    isPlaying,
    isInteractiveMode,
    playbackSpeed,
    currentSceneIndex,
    scenes.length,
    totalDuration,
    voiceEnabled,
    currentScene,
    currentSpeechSegment,
  ]);

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (voiceEnabled && currentSpeechSegment) {
        playedSegmentIdsRef.current.delete(currentSpeechSegment.id);
        speakCurrentSpeech(currentSpeechSegment);
      }
    } else {
      setIsPlaying(false);
      stopSpeech();
    }
  };

  // Seek handler
  const handleSeek = (seconds: number) => {
    stopSpeech();
    playedSegmentIdsRef.current.clear();
    setCurrentTime(seconds);
    // Find scene matching this timestamp
    const foundIdx = scenes.findIndex(
      (s) => seconds >= s.startSeconds && seconds < s.startSeconds + s.durationSeconds
    );
    if (foundIdx !== -1 && foundIdx !== currentSceneIndex) {
      setCurrentSceneIndex(foundIdx);
    }
  };

  // Select scene directly
  const handleSelectScene = (sceneId: number) => {
    stopSpeech();
    playedSegmentIdsRef.current.clear();
    const idx = scenes.findIndex((s) => s.id === sceneId);
    if (idx !== -1) {
      setCurrentSceneIndex(idx);
      setCurrentTime(scenes[idx].startSeconds);
    }
  };

  // Restart current scene
  const handleRestart = () => {
    stopSpeech();
    playedSegmentIdsRef.current.clear();
    setCurrentTime(currentScene.startSeconds);
    if (voiceEnabled && isPlaying && currentSpeechSegment) {
      speakCurrentSpeech(currentSpeechSegment);
    }
  };

  // Apply custom AI generated image to current scene
  const handleApplyImageToScene = (imageUrl: string) => {
    setCustomVisualsByScene((prev) => ({
      ...prev,
      [`${currentCourse.id}-${currentScene.id}`]: imageUrl,
    }));
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error(err);
      });
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900 flex flex-col font-['Outfit',sans-serif]">
      {/* 1. Barra superior horizontal en rojo intenso (#E51B23) */}
      <div className="bg-[#E51B23] text-white text-[11px] font-medium tracking-wide py-1.5 px-4 sm:px-6 border-b border-red-700/40">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-bold tracking-wider uppercase text-[10px] sm:text-[11px]">
              {UNIVERSITY_INFO.institution}
            </span>
            <span className="hidden md:inline-block text-red-200 opacity-60">•</span>
            <span className="hidden md:inline-block text-red-100 text-[10px]">
              {UNIVERSITY_INFO.campus}
            </span>
            <span className="hidden lg:inline-block text-red-200 opacity-60">•</span>
            <span className="hidden lg:inline-block text-red-100 text-[10px]">
              {UNIVERSITY_INFO.faculty}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px]">
            <span className="font-mono font-bold tracking-wider text-red-100">
              {UNIVERSITY_INFO.hashtag}
            </span>
            <span className="hidden sm:inline-block text-red-200 opacity-60">•</span>
            <span className="hidden sm:inline-block text-red-100 font-medium">
              Cátedra Biomédica Digital
            </span>
          </div>
        </div>
      </div>

      {/* 2. Header principal negro (#050505), amplio y elegante */}
      <header className="bg-[#050505] text-white border-b border-neutral-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#E51B23] flex items-center justify-center text-white shadow-xs border border-red-500/80 flex-shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-white uppercase font-['Cinzel',serif]">
                  {UNIVERSITY_INFO.institution}
                </h1>
                <span className="hidden sm:inline-block text-[10px] bg-neutral-900 text-red-300 font-semibold px-2 py-0.5 rounded border border-neutral-800">
                  {UNIVERSITY_INFO.campus}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 truncate max-w-xs sm:max-w-md md:max-w-lg">
                {UNIVERSITY_INFO.course} • Cátedra con Prof. Aquila
              </p>
            </div>
          </div>

          {/* Clean Horizontal Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium">
            <button
              onClick={() => setActiveTab('video')}
              className={`relative py-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'video'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#E51B23]" />
              <span>Simulación & Video</span>
              {activeTab === 'video' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E51B23] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('guion')}
              className={`relative py-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'guion'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Guion Académico (.md)</span>
              {activeTab === 'guion' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E51B23] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('mascota')}
              className={`relative py-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'mascota'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Identidad Aquila</span>
              {activeTab === 'mascota' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E51B23] rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Glosario Académico Button */}
            <button
              onClick={() => {
                setSelectedGlossaryTermId(null);
                setIsGlossaryOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer"
              title="Glosario Académico de Fisiología y Gases"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E51B23]" />
              <span className="hidden sm:inline">Glosario</span>
            </button>

            {/* Tutor IA Button */}
            <button
              onClick={() => setIsTutorOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold border border-neutral-700 transition-colors"
              title="Consultar al Prof. Aquila con IA"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E51B23]" />
              <span>Tutor IA</span>
            </button>

            {/* Primary Red Button */}
            <button
              onClick={() => setIsImageGenOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E51B23] hover:bg-[#c4141b] text-white rounded-lg font-semibold text-xs shadow-xs transition-colors"
              title="Generador de Imágenes Gemini"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Generar Ilustración</span>
              <span className="sm:hidden">Ilustración</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Compact Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-neutral-800 px-4 py-3 space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('video');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === 'video'
                  ? 'bg-[#E51B23] text-white'
                  : 'text-neutral-300 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>Simulación & Video</span>
              </div>
              {activeTab === 'video' && <span className="text-[10px] uppercase font-bold">Activo</span>}
            </button>
            <button
              onClick={() => {
                setActiveTab('guion');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === 'guion'
                  ? 'bg-[#E51B23] text-white'
                  : 'text-neutral-300 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Guion Académico (.md)</span>
              </div>
              {activeTab === 'guion' && <span className="text-[10px] uppercase font-bold">Activo</span>}
            </button>
            <button
              onClick={() => {
                setActiveTab('mascota');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                activeTab === 'mascota'
                  ? 'bg-[#E51B23] text-white'
                  : 'text-neutral-300 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Identidad Aquila</span>
              </div>
              {activeTab === 'mascota' && <span className="text-[10px] uppercase font-bold">Activo</span>}
            </button>
            <div className="pt-2 border-t border-neutral-800 space-y-1">
              <button
                onClick={() => {
                  setSelectedGlossaryTermId(null);
                  setIsGlossaryOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#E51B23]" />
                <span>Glosario Académico (18 Términos Clave)</span>
              </button>
              <button
                onClick={() => {
                  setIsTutorOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#E51B23]" />
                <span>Consultorio Académico IA (Prof. Aquila)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* Masterclass Course Selection Bar */}
        <div className="bg-white border border-neutral-200 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <GraduationCap className="w-4 h-4 text-[#E51B23]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E51B23] font-mono block">
                Cátedra Universitaria Activa
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                {currentCourse.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-100/80 p-1 rounded-lg self-start md:self-auto">
            {MASTERCLASS_COURSES.map((course) => (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedCourseId === course.id
                    ? 'bg-white text-[#E51B23] shadow-xs font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedCourseId === course.id ? '#E51B23' : '#9ca3af' }}
                />
                <span className="truncate">{course.shortTitle}</span>
                {course.id === 'biomoleculas-membranas' && (
                  <span className="text-[9px] bg-red-100 text-[#E51B23] px-1.5 py-0.5 rounded font-mono font-bold">
                    Nuevo
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* VIEW 1: VIDEO PLAYER EXPERIENCE */}
        {activeTab === 'video' && (
          <div
            ref={playerContainerRef}
            className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs relative"
          >
            {/* Video Stage Header Overlay */}
            <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E51B23] animate-ping" />
                <span className="text-xs font-bold text-[#E51B23] uppercase tracking-wider font-mono">
                  {currentScene.timeRangeFormatted}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-900 font-bold truncate">
                  {currentScene.title}
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 hidden sm:flex items-center gap-2">
                <span className="bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-700 font-mono text-[10px]">
                  {currentScene.cameraShot}
                </span>
              </div>
            </div>

            {/* Video Stage Main Canvas: Simulation + Mascot */}
            <div className="flex-1 min-h-[440px] lg:min-h-[500px] relative p-3 sm:p-4 flex flex-col lg:flex-row gap-3 bg-[#fbfcfd] overflow-hidden">
              {/* Left/Center: Interactive Visual Simulation */}
              <div className="flex-1 relative flex flex-col min-h-[320px]">
                {/* Course 1: Físico-Química de Gases & Fisiología */}
                {currentScene.simulationType === 'kinetic-theory' && <Scene1KineticTheory />}
                {currentScene.simulationType === 'state-variables' && <Scene2StateVariables />}
                {currentScene.simulationType === 'gas-laws' && <Scene3GasLawsSimulator />}
                {currentScene.simulationType === 'ideal-gas-derivation' && <Scene4IdealGasSynthesis />}
                {currentScene.simulationType === 'gas-mixtures-diffusion' && <Scene5GasMixtures />}
                {currentScene.simulationType === 'alveolar-physiology' && <Scene6RespiratoryPhysiology />}
                {currentScene.simulationType === 'clinical-challenge' && <Scene7ClinicalChallenge />}

                {/* Course 2: Biomoléculas & Membranas Biológicas */}
                {currentScene.simulationType === 'carbon-organic-origin' && <SceneBio1CarbonOrigin />}
                {currentScene.simulationType === 'carbohydrates-stereochem' && <SceneBio2Carbohydrates />}
                {currentScene.simulationType === 'disaccharides-polysaccharides' && <SceneBio3DisaccharidesHaworth />}
                {currentScene.simulationType === 'lipids-triglycerides' && <SceneBio4LipidsTriglycerides />}
                {currentScene.simulationType === 'specialized-lipids' && <SceneBio5SpecializedLipids />}
                {currentScene.simulationType === 'fluid-mosaic-membrane' && <SceneBio6FluidMosaicMembrane />}
                {currentScene.simulationType === 'biomolecules-clinical-challenge' && <SceneBio7BiomoleculesChallenge />}
              </div>

              {/* Right: Prof. Aquila Mascot Character Stage */}
              <div className="w-full lg:w-56 flex lg:flex-col items-center justify-between lg:justify-center p-3 bg-white rounded-xl border border-neutral-200 shadow-xs relative">
                {/* Character Anchor */}
                <MascotAquila
                  mood={mascotMood}
                  isSpeaking={isSpeaking}
                  currentSpeechText={currentSpeechSegment?.text}
                  customVisualUrl={
                    customVisualsByScene[`${currentCourse.id}-${currentScene.id}`] ||
                    currentScene.customVisualUrl
                  }
                  size="md"
                  showBadge={true}
                  onClick={() => setIsTutorOpen(true)}
                />

                {/* Character Action Note */}
                {currentSpeechSegment?.actionNote && (
                  <div className="mt-2 text-[10px] text-neutral-600 italic bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-center max-w-[200px]">
                    🎬 {currentSpeechSegment.actionNote}
                  </div>
                )}
              </div>

              {/* Live Teleprompter Subtitles Overlay */}
              {subtitlesEnabled && currentSpeechSegment && (
                <div className="absolute bottom-3 left-3 right-3 lg:right-64 z-30 pointer-events-auto">
                  <div className="mx-auto max-w-2xl bg-white/95 border-2 border-[#E51B23] rounded-xl px-4 py-2.5 text-center shadow-md backdrop-blur-xs">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-[10px] text-[#E51B23] font-bold tracking-wider uppercase block">
                        {currentSpeechSegment.speaker} (Mascota Universitaria):
                      </span>
                      <button
                        onClick={() => {
                          setSelectedGlossaryTermId(null);
                          setIsGlossaryOpen(true);
                        }}
                        className="text-[10px] text-neutral-500 hover:text-[#E51B23] inline-flex items-center gap-1 font-medium cursor-pointer"
                        title="Abrir Glosario Académico"
                      >
                        <BookOpen className="w-3 h-3 text-[#E51B23]" />
                        <span>Glosario</span>
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-900 font-medium leading-snug">
                      “<GlossaryHighlighter text={currentSpeechSegment.text} onTermClick={handleOpenGlossaryTerm} />”
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Player Controls Bar */}
            <VideoPlayerControls
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onRestart={handleRestart}
              onSeek={handleSeek}
              currentTime={currentTime}
              totalDuration={totalDuration}
              currentScene={currentScene}
              scenes={scenes}
              onSelectScene={handleSelectScene}
              voiceEnabled={voiceEnabled}
              onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
              subtitlesEnabled={subtitlesEnabled}
              onToggleSubtitles={() => setSubtitlesEnabled(!subtitlesEnabled)}
              playbackSpeed={playbackSpeed}
              onChangeSpeed={setPlaybackSpeed}
              onOpenImageGen={() => setIsImageGenOpen(true)}
              onOpenTutor={() => setIsTutorOpen(true)}
              onOpenGlossary={() => {
                setSelectedGlossaryTermId(null);
                setIsGlossaryOpen(true);
              }}
              isInteractiveMode={isInteractiveMode}
              onToggleInteractiveMode={() => setIsInteractiveMode(!isInteractiveMode)}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </div>
        )}

        {/* VIEW 2: FULL SCRIPT (.MD) READER & NAVIGATION */}
        {activeTab === 'guion' && (
          <div className="flex-1 bg-white border border-neutral-200 rounded-xl p-5 sm:p-7 overflow-y-auto space-y-6 shadow-xs">
            <div className="border-b border-neutral-200 pb-4">
              <span className="text-[11px] font-bold text-[#E51B23] uppercase tracking-wider font-mono">
                DOCUMENTO ACADÉMICO OFICIAL
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-neutral-900 mt-1">
                Guion de Video Educativo Universitario: {currentCourse.title}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Nivel: {currentCourse.academicLevel} • Presentador: Aquila • {currentCourse.scenery} • {UNIVERSITY_INFO.institution}
              </p>
            </div>

            {/* Interactive Academic Glossary Banner */}
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E51B23] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span>Glosario Académico Integrado en el Guion</span>
                    <span className="text-[10px] bg-red-100 text-[#E51B23] px-1.5 py-0.2 rounded font-mono font-semibold">
                      Interactivo
                    </span>
                  </h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed mt-0.5">
                    Las palabras clave de fisiología y fisicoquímica están subrayadas con línea punteada roja. Haz clic en cualquiera de ellas para abrir su definición médica al instante.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedGlossaryTermId(null);
                  setIsGlossaryOpen(true);
                }}
                className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E51B23] hover:bg-[#c4141b] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explorar Glosario (18)</span>
              </button>
            </div>

            {/* Scene Cards List */}
            <div className="space-y-4">
              {scenes.map((scene) => {
                const isCurrent = scene.id === currentScene.id;
                return (
                  <div
                    key={scene.id}
                    onClick={() => {
                      handleSelectScene(scene.id);
                      setActiveTab('video');
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-red-50/20 border-[#E51B23] shadow-xs'
                        : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#E51B23] text-white font-bold text-xs">
                          Escena {scene.id}
                        </span>
                        <h3 className="font-bold text-sm text-neutral-900">{scene.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                        <span className="font-semibold text-neutral-700">{scene.timeRangeFormatted}</span>
                        <span className="bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200 text-neutral-600 text-[10px]">
                          {scene.cameraShot}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 italic mb-3">
                      🎬 {scene.actionDescription}
                    </p>

                    {/* Speech segments dialogue */}
                    <div className="space-y-2.5 border-l-2 border-[#E51B23] pl-3">
                      {scene.speechSegments.map((seg) => (
                        <div key={seg.id} className="text-xs text-neutral-800 group">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <strong className="text-[#E51B23]">{seg.speaker}:</strong>{' '}
                              <GlossaryHighlighter
                                text={seg.text}
                                onTermClick={handleOpenGlossaryTerm}
                              />
                              {seg.actionNote && (
                                <span className="text-[10px] text-neutral-500 block italic mt-0.5">
                                  [{seg.actionNote}]
                                </span>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab('video');
                                handleSelectScene(scene.id);
                                handleSeek(scene.startSeconds + seg.timestampStart);
                                setIsPlaying(true);
                                setVoiceEnabled(true);
                                speakCurrentSpeech(seg);
                              }}
                              className="shrink-0 inline-flex items-center gap-1 text-[10px] text-neutral-500 hover:text-[#E51B23] bg-neutral-100 hover:bg-red-50 px-2 py-1 rounded border border-neutral-200 hover:border-red-200 cursor-pointer transition-colors"
                              title="Reproducir este diálogo"
                            >
                              <Volume2 className="w-3 h-3 text-[#E51B23]" />
                              <span>Escuchar</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Formulas snippet */}
                    {scene.keyFormulas.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                        {scene.keyFormulas.map((f, i) => (
                          <span key={i} className="bg-red-50 text-[#E51B23] px-2 py-0.5 rounded border border-red-200 font-bold">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: MASCOT IDENTITY & UNIVERSITY CAMPAIGN */}
        {activeTab === 'mascota' && (
          <div className="flex-1 bg-white border border-neutral-200 rounded-xl p-5 sm:p-7 overflow-y-auto shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Mascot Showcase */}
              <div className="md:col-span-5 flex flex-col items-center text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <MascotAquila mood="celebrating" size="xl" showBadge={true} />
                <div className="mt-4 p-3.5 bg-red-50 rounded-xl border border-red-200 text-xs text-neutral-800">
                  <p className="font-bold text-[#E51B23] text-sm mb-1">
                    "Confía en tu talento, esfuérzate al máximo y vuela tan alto como te lo propongas."
                  </p>
                  <p className="text-[10px] text-neutral-600">
                    ¡Estamos contigo en cada paso de este camino!
                  </p>
                  <span className="inline-block mt-2 font-mono font-bold text-[#E51B23] text-xs">
                    #SOMOSÁGUILASROJAS
                  </span>
                </div>
              </div>

              {/* Right University Lore & Characteristics */}
              <div className="md:col-span-7 space-y-4 text-xs">
                <div>
                  <span className="text-[10px] text-[#E51B23] font-bold uppercase tracking-wider">
                    Identidad Universitaria
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
                    Aquila — La Mascota Docente de la Universidad Católica de Cuenca
                  </h3>
                  <p className="text-neutral-600 mt-1">
                    Representación antropomórfica del espíritu de liderazgo, excelencia médica y rigor científico del Campus Macas.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                    <h4 className="font-bold text-neutral-900 text-xs mb-1">
                      🥼 Indumentaria Académica:
                    </h4>
                    <p className="text-neutral-700">
                      Bata médica blanca de laboratorio universitario abierta sobre su sudadera roja universitaria (#SomosÁguilasRojas), gafas de protección científica al cuello y puntero láser de precisión para la pizarra interactiva.
                    </p>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                    <h4 className="font-bold text-neutral-900 text-xs mb-1">
                      🦅 Fisionomía:
                    </h4>
                    <p className="text-neutral-700">
                      Plumaje craneal blanco radiante, pico curvado dorado expresivo, ojos castaños con mirada penetrante y determinada, transmitiendo la pasión por la enseñanza biomédica.
                    </p>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                    <h4 className="font-bold text-neutral-900 text-xs mb-1">
                      🔬 Cátedras Magistrales Asignadas:
                    </h4>
                    <p className="text-neutral-700 text-xs leading-relaxed space-y-1">
                      <span>• <strong>Físico-Química de los Gases & Fisiología Respiratoria</strong>: Leyes de los gases ideales, difusión alvéolo-capilar y emergencias en altitud.</span><br />
                      <span>• <strong>Química Orgánica, Biomoléculas & Membranas</strong>: Síntesis de Wöhler, isomería D/L, 9 kcal/g en lípidos, mosaico fluido y galactosemia.</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsImageGenOpen(true)}
                  className="w-full py-3 bg-[#E51B23] hover:bg-[#c4141b] text-white font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generar Nuevas Ilustraciones de Aquila con Gemini</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Image Generation Studio Modal */}
      <ImageGeneratorModal
        isOpen={isImageGenOpen}
        onClose={() => setIsImageGenOpen(false)}
        onApplyImageToScene={handleApplyImageToScene}
        currentSceneTitle={currentScene.title}
      />

      {/* Student Consultation Tutor Chat Modal */}
      <AquilaTutorChat
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        currentSceneTitle={currentScene.title}
        currentCourseTitle={currentCourse.title}
      />

      {/* Academic Physiology & Gas Laws Glossary Drawer / Modal */}
      <AcademicGlossaryDrawer
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        selectedTermId={selectedGlossaryTermId}
        onSelectTermId={(id) => setSelectedGlossaryTermId(id)}
      />
    </div>
  );
}
