import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Subtitles,
  Maximize,
  MessageSquare,
  Sliders,
  Film,
  BookOpen,
} from 'lucide-react';
import { ScriptScene } from '../types';

interface VideoPlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onSeek: (seconds: number) => void;
  currentTime: number;
  totalDuration: number;
  currentScene: ScriptScene;
  scenes: ScriptScene[];
  onSelectScene: (sceneId: number) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  subtitlesEnabled: boolean;
  onToggleSubtitles: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  onOpenImageGen?: () => void;
  onOpenTutor: () => void;
  onOpenGlossary?: () => void;
  isInteractiveMode: boolean;
  onToggleInteractiveMode: () => void;
  onToggleFullscreen: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onRestart,
  onSeek,
  currentTime,
  totalDuration,
  currentScene,
  scenes,
  onSelectScene,
  voiceEnabled,
  onToggleVoice,
  subtitlesEnabled,
  onToggleSubtitles,
  playbackSpeed,
  onChangeSpeed,
  onOpenImageGen,
  onOpenTutor,
  onOpenGlossary,
  isInteractiveMode,
  onToggleInteractiveMode,
  onToggleFullscreen,
}) => {
  const progressPercent = (currentTime / (totalDuration || 1)) * 100;

  return (
    <div className="w-full bg-white border-t border-neutral-200 p-2.5 sm:p-3 flex flex-col gap-2 rounded-b-xl shadow-xs select-none">
      {/* Timeline Scrubber */}
      <div className="relative flex items-center group">
        <input
          type="range"
          min={0}
          max={totalDuration}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#E51B23] hover:h-2 transition-all"
        />

        {/* Scene markers on timeline */}
        <div className="absolute left-0 right-0 h-1.5 pointer-events-none flex">
          {scenes.map((scene) => {
            const leftPct = (scene.startSeconds / totalDuration) * 100;
            return (
              <div
                key={scene.id}
                style={{ left: `${leftPct}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-neutral-400"
                title={scene.title}
              />
            );
          })}
        </div>
      </div>

      {/* Primary Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Playback core controls */}
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-lg bg-[#E51B23] hover:bg-[#c4141b] text-white flex items-center justify-center shadow-xs transition-transform active:scale-95"
            title={isPlaying ? 'Pausar video' : 'Reproducir video'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          {/* Seek -10s */}
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 10))}
            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 transition-colors"
            title="Retroceder 10s"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Seek +10s */}
          <button
            onClick={() => onSeek(Math.min(totalDuration, currentTime + 10))}
            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 transition-colors"
            title="Adelantar 10s"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Replay Scene */}
          <button
            onClick={onRestart}
            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 transition-colors"
            title="Reiniciar escena actual"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Time Counter */}
          <div className="font-mono text-[11px] text-neutral-500 ml-1">
            <span className="text-[#E51B23] font-bold">{formatTime(currentTime)}</span> / <span className="text-neutral-800 font-medium">{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Center: Scene chapter pills selector */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto max-w-md py-0.5">
          {scenes.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectScene(s.id)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all whitespace-nowrap ${
                currentScene.id === s.id
                  ? 'bg-[#E51B23] text-white shadow-xs'
                  : 'bg-neutral-50 text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              E{s.id}
            </button>
          ))}
        </div>

        {/* Right: Audio, Subtitles, Speed, Image Gen, Tutor & Fullscreen */}
        <div className="flex items-center gap-1.5">
          {/* Interactive Mode Toggle */}
          <button
            onClick={onToggleInteractiveMode}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 border transition-all ${
              isInteractiveMode
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            title="Modo interactivo: pausa el auto-avance para experimentar con los simuladores"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modo Interactivo</span>
          </button>

          {/* Voice Narration Audio Toggle */}
          <button
            onClick={onToggleVoice}
            className={`p-1.5 rounded-lg border transition-all ${
              voiceEnabled
                ? 'bg-red-50 border-red-300 text-[#E51B23]'
                : 'bg-neutral-50 border-neutral-200 text-neutral-400'
            }`}
            title={voiceEnabled ? 'Voz del Prof. Aguilar Activada' : 'Voz Silenciada'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Subtitles CC Toggle */}
          <button
            onClick={onToggleSubtitles}
            className={`p-1.5 rounded-lg border transition-all ${
              subtitlesEnabled
                ? 'bg-red-50 border-red-300 text-[#E51B23]'
                : 'bg-neutral-50 border-neutral-200 text-neutral-400'
            }`}
            title="Subtítulos del guion"
          >
            <Subtitles className="w-4 h-4" />
          </button>

          {/* Speed Selector */}
          <select
            value={playbackSpeed}
            onChange={(e) => onChangeSpeed(Number(e.target.value))}
            className="bg-white border border-neutral-200 rounded-lg px-2 py-1 text-[11px] text-neutral-800 font-mono focus:border-[#E51B23] focus:outline-none"
            title="Velocidad de reproducción"
          >
            <option value={0.75}>0.75x</option>
            <option value={1.0}>1.0x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>

          {/* Tutor Chat Button */}
          <button
            onClick={onOpenTutor}
            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 hover:text-[#E51B23] transition-colors cursor-pointer"
            title="Consultar al Prof. Aguilar con IA"
          >
            <MessageSquare className="w-4 h-4 text-[#E51B23]" />
          </button>

          {/* Academic Glossary Button */}
          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="p-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 hover:text-[#E51B23] transition-colors"
              title="Glosario Académico de Fisiología"
            >
              <BookOpen className="w-4 h-4 text-[#E51B23]" />
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 transition-colors"
            title="Pantalla completa"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
