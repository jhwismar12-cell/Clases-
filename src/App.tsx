import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  GraduationCap,
  Play,
  Pause,
  RotateCcw,
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
import { prepareTextForSpeech, splitTextIntoSpeechChunks } from './utils/speechUtils';
import { MascotAquila } from './components/MascotAquila';
import { VideoPlayerControls } from './components/VideoPlayerControls';
import { SceneBlock1Pillars } from './components/simulations/SceneBlock1Pillars';
import { SceneBlock1Bioenergetics } from './components/simulations/SceneBlock1Bioenergetics';
import { SceneBlock1ChemicalBonds } from './components/simulations/SceneBlock1ChemicalBonds';
import { SceneBlock1InorganicFunctions } from './components/simulations/SceneBlock1InorganicFunctions';
import { SceneBlock1WaterTonicity } from './components/simulations/SceneBlock1WaterTonicity';
import { SceneBlock1AcidBaseBalance } from './components/simulations/SceneBlock1AcidBaseBalance';
import { SceneBlock1ClinicalChallenge } from './components/simulations/SceneBlock1ClinicalChallenge';
import { Scene1KineticTheory } from './components/simulations/Scene1KineticTheory';
import { Scene2StateVariables } from './components/simulations/Scene2StateVariables';
import { Scene3GasLawsSimulator } from './components/simulations/Scene3GasLawsSimulator';
import { SceneBlock2CombinedAvogadro } from './components/simulations/SceneBlock2CombinedAvogadro';
import { Scene4IdealGasSynthesis } from './components/simulations/Scene4IdealGasSynthesis';
import { Scene5GasMixtures } from './components/simulations/Scene5GasMixtures';
import { Scene6RespiratoryPhysiology } from './components/simulations/Scene6RespiratoryPhysiology';
import { SceneBlock2GasTransportHb } from './components/simulations/SceneBlock2GasTransportHb';
import { Scene7ClinicalChallenge } from './components/simulations/Scene7ClinicalChallenge';
import { SceneBio1CarbonOrigin } from './components/simulations/SceneBio1CarbonOrigin';
import { SceneBio2Carbohydrates } from './components/simulations/SceneBio2Carbohydrates';
import { SceneBio3DisaccharidesHaworth } from './components/simulations/SceneBio3DisaccharidesHaworth';
import { SceneBio4LipidsTriglycerides } from './components/simulations/SceneBio4LipidsTriglycerides';
import { SceneBio5SpecializedLipids } from './components/simulations/SceneBio5SpecializedLipids';
import { SceneBioProteinsEnzymes } from './components/simulations/SceneBioProteinsEnzymes';
import { SceneBio6FluidMosaicMembrane } from './components/simulations/SceneBio6FluidMosaicMembrane';
import { SceneBioSolvedProblems } from './components/simulations/SceneBioSolvedProblems';
import { SceneBio7BiomoleculesChallenge } from './components/simulations/SceneBio7BiomoleculesChallenge';
import { SceneBioBlock3ExamQuiz } from './components/simulations/SceneBioBlock3ExamQuiz';
import { AquilaTutorChat } from './components/AquilaTutorChat';
import { AcademicGlossaryDrawer } from './components/AcademicGlossaryDrawer';
import { GlossaryHighlighter } from './components/GlossaryHighlighter';

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('bloque-1-materia-energia');
  const currentCourse = MASTERCLASS_COURSES.find((c) => c.id === selectedCourseId) || MASTERCLASS_COURSES[0];

  // Calibrate scene timings to match actual speech segment durations with smooth 3s outro transitions
  const scenes = useMemo(() => {
    let accumulatedStart = 0;
    return currentCourse.scenes.map((scene) => {
      const lastSeg = scene.speechSegments[scene.speechSegments.length - 1];
      const speechNeeded = lastSeg
        ? lastSeg.timestampStart + lastSeg.duration + 3
        : scene.durationSeconds;
      const sceneDuration = Math.max(25, speechNeeded);
      const sceneStart = accumulatedStart;
      accumulatedStart += sceneDuration;

      return {
        ...scene,
        startSeconds: sceneStart,
        durationSeconds: sceneDuration,
      };
    });
  }, [currentCourse]);

  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'video' | 'guion' | 'mascota'>('video');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
  const activeUtterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const speechSessionIdRef = useRef<number>(0);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronized refs for asynchronous speech and interval callbacks
  const isPlayingRef = useRef<boolean>(isPlaying);
  const voiceEnabledRef = useRef<boolean>(voiceEnabled);
  const playbackSpeedRef = useRef<number>(playbackSpeed);
  const currentSceneIndexRef = useRef<number>(currentSceneIndex);
  const scenesRef = useRef<ScriptScene[]>(scenes);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    currentSceneIndexRef.current = currentSceneIndex;
  }, [currentSceneIndex]);

  useEffect(() => {
    scenesRef.current = scenes;
  }, [scenes]);

  // Clean, complete stop of speech without browser stutter or dangling state
  const stopSpeech = useCallback(() => {
    speechSessionIdRef.current++;
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    activeUtterancesRef.current = [];
    setIsSpeaking(false);
    isSpeakingRef.current = false;
    currentSpeakingIdRef.current = '';
  }, []);

  const handleSelectCourse = (courseId: string) => {
    stopSpeech();
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    playedSegmentIdsRef.current.clear();
    setSelectedCourseId(courseId);
  };

  // Modals
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);

  const handleOpenGlossaryTerm = (termId: string) => {
    setSelectedGlossaryTermId(termId);
    setIsGlossaryOpen(true);
  };

  const currentScene = scenes[currentSceneIndex] || scenes[0];
  const totalDuration = scenes.reduce((acc, s) => acc + s.durationSeconds, 0);

  // Initialize and cache Spanish voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;
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

  // Continuous, chunked Speech Synthesis engine (prevents Chrome 15s freeze & eliminates abrupt pauses)
  const speakCurrentSpeech = useCallback(
    (segment: SceneSpeechSegment, targetSceneIndex?: number) => {
      if (!voiceEnabledRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      const activeSceneIdx = targetSceneIndex !== undefined ? targetSceneIndex : currentSceneIndexRef.current;

      // Cancel prior transition timers and increment session
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
      window.speechSynthesis.cancel();
      const sessionId = ++speechSessionIdRef.current;

      const formattedText = prepareTextForSpeech(segment.text);
      const chunks = splitTextIntoSpeechChunks(formattedText);
      if (chunks.length === 0) return;

      setCurrentSpeechText(segment.text);
      currentSpeakingIdRef.current = segment.id;
      playedSegmentIdsRef.current.add(segment.id);

      let chunkIdx = 0;

      const playNextChunk = () => {
        if (speechSessionIdRef.current !== sessionId) return;

        // When all sentence chunks of this segment have finished speaking:
        if (chunkIdx >= chunks.length) {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          currentSpeakingIdRef.current = '';
          activeUtterancesRef.current = [];

          if (!isPlayingRef.current || !voiceEnabledRef.current) return;

          const curScenes = scenesRef.current;
          const curSc = curScenes[activeSceneIdx];
          if (!curSc) return;

          const segIdx = curSc.speechSegments.findIndex((s) => s.id === segment.id);
          if (segIdx !== -1 && segIdx < curSc.speechSegments.length - 1) {
            // Next segment in the current scene: natural 400ms pedagogical breath
            const nextSeg = curSc.speechSegments[segIdx + 1];
            transitionTimeoutRef.current = setTimeout(() => {
              if (speechSessionIdRef.current !== sessionId) return;
              if (isPlayingRef.current && voiceEnabledRef.current) {
                setCurrentTime(curSc.startSeconds + nextSeg.timestampStart);
                speakCurrentSpeech(nextSeg, activeSceneIdx);
              }
            }, 400);
          } else if (activeSceneIdx < curScenes.length - 1) {
            // Last segment of scene: 1.8s reflection buffer, then transition smoothly to next scene
            transitionTimeoutRef.current = setTimeout(() => {
              if (speechSessionIdRef.current !== sessionId) return;
              if (isPlayingRef.current && voiceEnabledRef.current) {
                const nextSceneIdx = activeSceneIdx + 1;
                setCurrentSceneIndex(nextSceneIdx);
                const nextSc = curScenes[nextSceneIdx];
                setCurrentTime(nextSc.startSeconds);
                playedSegmentIdsRef.current.clear();
                const firstSeg = nextSc.speechSegments[0];
                if (firstSeg) {
                  speakCurrentSpeech(firstSeg, nextSceneIdx);
                }
              }
            }, 1800);
          } else {
            // End of entire course lecture reached smoothly
            setIsPlaying(false);
          }
          return;
        }

        const chunkText = chunks[chunkIdx];
        chunkIdx++;

        const utterance = new SpeechSynthesisUtterance(chunkText);
        utterance.lang = 'es-ES';
        if (spanishVoiceRef.current) {
          utterance.voice = spanishVoiceRef.current;
        }

        // Calibrated academic tempo and pitch
        utterance.rate = Math.max(0.85, Math.min(1.35, playbackSpeedRef.current * 1.0));
        utterance.pitch = 1.04;

        // Dispatch word boundaries to drive beak lip-sync & teleprompter
        utterance.onboundary = (e: SpeechSynthesisEvent) => {
          if (typeof window !== 'undefined' && e.name === 'word') {
            window.dispatchEvent(
              new CustomEvent('aquila-speech-word', {
                detail: {
                  charIndex: e.charIndex,
                  charLength: e.charLength,
                  text: chunkText,
                },
              })
            );
          }
        };

        utterance.onstart = () => {
          if (speechSessionIdRef.current !== sessionId) return;
          setIsSpeaking(true);
          isSpeakingRef.current = true;
        };

        utterance.onend = () => {
          if (speechSessionIdRef.current !== sessionId) return;
          // Chain to next sentence chunk immediately with zero audible gap
          playNextChunk();
        };

        utterance.onerror = (e) => {
          if (e.error !== 'canceled' && e.error !== 'interrupted') {
            console.warn('Speech synthesis notice:', e.error);
          }
          if (speechSessionIdRef.current !== sessionId) return;
          playNextChunk();
        };

        // Protect from browser garbage collection
        activeUtterancesRef.current = [utterance];
        (window as any).__aquilaUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      };

      playNextChunk();
    },
    []
  );

  // Determine current active speech segment based on relative time in scene
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
      activeSpeechSegment = lastSeg;
    }
  }

  const currentSpeechSegment = activeSpeechSegment || currentScene.speechSegments[0];

  // Update teleprompter text to reflect current segment
  useEffect(() => {
    if (currentSpeechSegment) {
      setCurrentSpeechText(currentSpeechSegment.text);
    }
  }, [currentSpeechSegment?.id, currentSpeechSegment?.text]);

  // Main playback timer: tracks progress smoothly without chopping speech mid-sentence
  useEffect(() => {
    if (isPlaying && !isInteractiveMode) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          // If voice is speaking, do not pass the segment end time until utterance finishes!
          if (voiceEnabled && isSpeakingRef.current && currentSpeechSegment) {
            const curSc = scenes[currentSceneIndex];
            if (curSc) {
              const segEndTime =
                curSc.startSeconds +
                currentSpeechSegment.timestampStart +
                currentSpeechSegment.duration;
              if (prevTime + 1 * playbackSpeed >= segEndTime) {
                return segEndTime; // Hold gently at boundary until speech chunk finishes
              }
            }
          }

          const nextTime = prevTime + 1 * playbackSpeed;
          if (nextTime >= totalDuration) {
            if (!voiceEnabled) {
              setIsPlaying(false);
              stopSpeech();
              return 0;
            }
            return totalDuration;
          }

          // If voice is disabled, timer handles scene advancement
          if (!voiceEnabled) {
            const currentSceneEnd = currentScene.startSeconds + currentScene.durationSeconds;
            if (nextTime >= currentSceneEnd && currentSceneIndex < scenes.length - 1) {
              setCurrentSceneIndex((idx) => idx + 1);
            }
          }

          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [
    isPlaying,
    isInteractiveMode,
    playbackSpeed,
    voiceEnabled,
    currentSceneIndex,
    scenes,
    totalDuration,
    currentScene,
    currentSpeechSegment,
    stopSpeech,
  ]);

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (voiceEnabled && currentSpeechSegment) {
        speakCurrentSpeech(currentSpeechSegment, currentSceneIndex);
      }
    } else {
      setIsPlaying(false);
      stopSpeech();
    }
  };

  // Toggle voice mute
  const handleToggleVoice = () => {
    if (voiceEnabled) {
      stopSpeech();
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
      if (isPlaying && currentSpeechSegment) {
        speakCurrentSpeech(currentSpeechSegment, currentSceneIndex);
      }
    }
  };

  // Speed change handler with seamless speech continuation
  const handleChangeSpeed = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    if (isPlaying && voiceEnabled && currentSpeechSegment && isSpeakingRef.current) {
      speakCurrentSpeech(currentSpeechSegment, currentSceneIndex);
    }
  };

  // Seek handler: jumps directly to requested second and speaks requested segment
  const handleSeek = (seconds: number) => {
    stopSpeech();
    playedSegmentIdsRef.current.clear();
    setCurrentTime(seconds);

    const foundIdx = scenes.findIndex(
      (s) => seconds >= s.startSeconds && seconds < s.startSeconds + s.durationSeconds
    );
    const targetSceneIdx = foundIdx !== -1 ? foundIdx : currentSceneIndex;
    if (foundIdx !== -1 && foundIdx !== currentSceneIndex) {
      setCurrentSceneIndex(foundIdx);
    }

    if (isPlaying && voiceEnabled) {
      const targetScene = scenes[targetSceneIdx];
      const relTime = Math.max(0, seconds - targetScene.startSeconds);
      const matchedSeg =
        targetScene.speechSegments.find(
          (seg) => relTime >= seg.timestampStart && relTime < seg.timestampStart + seg.duration
        ) || targetScene.speechSegments[0];
      if (matchedSeg) {
        speakCurrentSpeech(matchedSeg, targetSceneIdx);
      }
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
      if (isPlaying && voiceEnabled) {
        const firstSeg = scenes[idx].speechSegments[0];
        if (firstSeg) {
          speakCurrentSpeech(firstSeg, idx);
        }
      }
    }
  };

  // Restart current scene
  const handleRestart = () => {
    stopSpeech();
    playedSegmentIdsRef.current.clear();
    setCurrentTime(currentScene.startSeconds);
    if (voiceEnabled && isPlaying && currentSpeechSegment) {
      speakCurrentSpeech(currentSpeechSegment, currentSceneIndex);
    }
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
                {UNIVERSITY_INFO.course} • Cátedra con Prof. Aguilar
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
              <span>Profesor Aguilar</span>
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
              className="flex items-center gap-1.5 px-3 py-2 bg-[#E51B23] hover:bg-[#c4141b] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Consultar al Prof. Aguilar con IA"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tutor IA</span>
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
                <span>Profesor Aguilar</span>
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
                <span>Consultorio Académico IA (Prof. Aguilar)</span>
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

          <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100/90 p-1.5 rounded-xl self-start md:self-auto">
            {MASTERCLASS_COURSES.map((course) => (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedCourseId === course.id
                    ? 'bg-white text-[#E51B23] shadow-sm font-bold ring-1 ring-neutral-200'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: selectedCourseId === course.id ? '#E51B23' : '#9ca3af' }}
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-bold">{course.shortTitle}</span>
                    {course.blockNumber === 1 && (
                      <span className="text-[9px] bg-red-100 text-[#E51B23] px-1.5 py-0.2 rounded font-mono font-bold">
                        Actual
                      </span>
                    )}
                  </div>
                  {course.dates && (
                    <span className="text-[10px] text-neutral-400 block font-mono font-normal">
                      {course.dates}
                    </span>
                  )}
                </div>
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
                {/* Bloque 1: Materia y Energía en el Organismo Humano */}
                {currentScene.simulationType === 'pure-vs-applied-chemistry' && <SceneBlock1Pillars />}
                {currentScene.simulationType === 'bioenergetics-nutrition' && <SceneBlock1Bioenergetics />}
                {currentScene.simulationType === 'chemical-bonds-electrolytes' && <SceneBlock1ChemicalBonds />}
                {currentScene.simulationType === 'inorganic-functions-clinical' && <SceneBlock1InorganicFunctions />}
                {currentScene.simulationType === 'water-solutions-tonicity' && <SceneBlock1WaterTonicity />}
                {currentScene.simulationType === 'ph-henderson-hasselbalch' && <SceneBlock1AcidBaseBalance />}
                {currentScene.simulationType === 'block1-clinical-challenge' && <SceneBlock1ClinicalChallenge />}

                {/* Bloque 2: Físico-Química de Gases & Fisiología */}
                {currentScene.simulationType === 'kinetic-theory' && <Scene1KineticTheory />}
                {currentScene.simulationType === 'state-variables' && <Scene2StateVariables />}
                {currentScene.simulationType === 'gas-laws' && <Scene3GasLawsSimulator />}
                {currentScene.simulationType === 'combined-gas-law' && <SceneBlock2CombinedAvogadro />}
                {currentScene.simulationType === 'ideal-gas-derivation' && <Scene4IdealGasSynthesis />}
                {currentScene.simulationType === 'gas-mixtures-diffusion' && <Scene5GasMixtures />}
                {currentScene.simulationType === 'alveolar-physiology' && <Scene6RespiratoryPhysiology />}
                {currentScene.simulationType === 'gas-transport-hb' && <SceneBlock2GasTransportHb />}
                {currentScene.simulationType === 'clinical-challenge' && <Scene7ClinicalChallenge />}

                {/* Bloque 3: Química Orgánica, Biomoléculas & Membranas */}
                {currentScene.simulationType === 'carbon-organic-origin' && <SceneBio1CarbonOrigin />}
                {currentScene.simulationType === 'carbohydrates-stereochem' && <SceneBio2Carbohydrates />}
                {currentScene.simulationType === 'disaccharides-polysaccharides' && <SceneBio3DisaccharidesHaworth />}
                {currentScene.simulationType === 'lipids-triglycerides' && <SceneBio4LipidsTriglycerides />}
                {currentScene.simulationType === 'specialized-lipids' && <SceneBio5SpecializedLipids />}
                {currentScene.simulationType === 'proteins-enzymes-kinetics' && <SceneBioProteinsEnzymes />}
                {currentScene.simulationType === 'fluid-mosaic-membrane' && <SceneBio6FluidMosaicMembrane />}
                {currentScene.simulationType === 'biomolecules-solved-problems' && <SceneBioSolvedProblems />}
                {currentScene.simulationType === 'biomolecules-clinical-challenge' && <SceneBio7BiomoleculesChallenge />}
                {currentScene.simulationType === 'biomolecules-exam-quiz' && <SceneBioBlock3ExamQuiz />}
              </div>

              {/* Right: Prof. Aquila Mascot Character Stage */}
              <div className="w-full lg:w-56 flex lg:flex-col items-center justify-between lg:justify-center p-3 bg-white rounded-xl border border-neutral-200 shadow-xs relative">
                {/* Character Anchor */}
                <MascotAquila
                  mood={mascotMood}
                  isSpeaking={isSpeaking}
                  currentSpeechText={currentSpeechSegment?.text}
                  customVisualUrl={currentScene.customVisualUrl}
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
                        Profesor Aguilar (Mascota Universitaria):
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
              onToggleVoice={handleToggleVoice}
              subtitlesEnabled={subtitlesEnabled}
              onToggleSubtitles={() => setSubtitlesEnabled(!subtitlesEnabled)}
              playbackSpeed={playbackSpeed}
              onChangeSpeed={handleChangeSpeed}
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
                Nivel: {currentCourse.academicLevel} • Presentador: Profesor Aguilar • {currentCourse.scenery} • {UNIVERSITY_INFO.institution}
              </p>
            </div>

            {/* Syllabus Matrix & Academic Planning Card */}
            {currentCourse.dates && (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#E51B23] text-white font-mono font-bold text-xs">
                      Bloque {currentCourse.blockNumber || 1}
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      Vigencia Académica: {currentCourse.dates}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Sílabo de Química Aplicada a la Medicina
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Practical Labs */}
                  {currentCourse.practicalLabs && currentCourse.practicalLabs.length > 0 && (
                    <div className="p-3 bg-white rounded-lg border border-neutral-200">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase font-mono block mb-1.5">
                        Prácticas de Laboratorio ({currentCourse.practicalLabs.length})
                      </span>
                      <ul className="space-y-1 text-neutral-700 text-[11px]">
                        {currentCourse.practicalLabs.map((lab, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#E51B23] font-bold">•</span>
                            <span>{lab}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Evaluations */}
                  {currentCourse.evaluations && currentCourse.evaluations.length > 0 && (
                    <div className="p-3 bg-white rounded-lg border border-neutral-200">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase font-mono block mb-1.5">
                        Evaluaciones Oficiales
                      </span>
                      <ul className="space-y-1 text-neutral-700 text-[11px]">
                        {currentCourse.evaluations.map((ev, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{ev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Backing Documents */}
                  {currentCourse.supportDocuments && currentCourse.supportDocuments.length > 0 && (
                    <div className="p-3 bg-white rounded-lg border border-neutral-200">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase font-mono block mb-1.5">
                        Documentos de Respaldo Cátedra
                      </span>
                      <ul className="space-y-1.5 text-neutral-700 text-[11px]">
                        {currentCourse.supportDocuments.map((doc, i) => (
                          <li key={i} className="flex items-start gap-1.5 font-mono text-[10px] text-neutral-600">
                            <span className="text-emerald-600 font-bold">📄</span>
                            <span className="break-all">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

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
              {scenes.map((scene, sceneIdx) => {
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
                              <strong className="text-[#E51B23]">
                                {seg.speaker === 'AQUILA' || seg.speaker === 'Aquila' ? 'Prof. Aguilar' : seg.speaker}:
                              </strong>{' '}
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
                                speakCurrentSpeech(seg, sceneIdx);
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
                    Profesor Aguilar — La Mascota Docente de la Universidad Católica de Cuenca
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
                      Bata médica blanca de laboratorio universitario con estetoscopio al cuello, gafas modernas de montura verde azulada (teal), camisa polo roja con ribete blanco y corbata vinotinto rayada (#SomosÁguilasRojas), y puntero láser metálico telescópico para la pizarra interactiva.
                    </p>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                    <h4 className="font-bold text-neutral-900 text-xs mb-1">
                      🦅 Fisionomía:
                    </h4>
                    <p className="text-neutral-700">
                      Plumaje craneal blanco radiante coronado con cresta escarlata, cuello con collarín de plumas rojas, pico curvado dorado expresivo y ojos ambarinos de mirada viva y determinada.
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
                  onClick={() => setIsTutorOpen(true)}
                  className="w-full py-3 bg-[#E51B23] hover:bg-[#c4141b] text-white font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consultorio Académico con el Prof. Aguilar (Tutor IA)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

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
