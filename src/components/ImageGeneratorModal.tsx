import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, X, Loader2, Check, RefreshCw, Layers, Sliders, Maximize } from 'lucide-react';
import { AspectRatioType, ImageSizeType, ImageModelType, GeneratedImageRecord } from '../types';

interface ImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyImageToScene: (imageUrl: string) => void;
  currentSceneTitle: string;
}

const PRESET_PROMPTS = [
  'Aquila, la mascota antropomórfica águila de la Universidad Católica de Cuenca, vistiendo bata médica blanca impecable sobre una sudadera roja universitaria, con gafas de protección al cuello y sosteniendo un puntero en un laboratorio de física de alta tecnología, iluminación cinematográfica 3D, ultra detallado.',
  'Aquila el águila doctor explicando la ley de Boyle con un pistón hidráulico transparente de gases en el aula magna universitaria, estilo render 3D Pixar, 16:9.',
  'Visualización médica 3D de alta definición de la hematosis alvéolo-capilar humana con intercambio gaseoso de O2 y CO2, glóbulos rojos eritrocitos con hemoglobina.',
  'Aquila en el campus universitario con bata de profesor médico sosteniendo una bitácora científica, lema #SomosÁguilasRojas en el fondo del edificio.',
];

const ASPECT_RATIOS: { label: string; value: AspectRatioType; description: string }[] = [
  { label: '16:9', value: '16:9', description: 'Video Widescreen / Cine' },
  { label: '1:1', value: '1:1', description: 'Cuadrado / Avatar' },
  { label: '4:3', value: '4:3', description: 'Presentación Estándar' },
  { label: '3:2', value: '3:2', description: 'Fotografía Paisaje' },
  { label: '2:3', value: '2:3', description: 'Retrato Clásico' },
  { label: '3:4', value: '3:4', description: 'Retrato Estándar' },
  { label: '9:16', value: '9:16', description: 'Vertical / Móvil / Story' },
  { label: '21:9', value: '21:9', description: 'Ultrawide Cinemático' },
];

const IMAGE_SIZES: { label: string; value: ImageSizeType; description: string }[] = [
  { label: '1K', value: '1K', description: 'Estándar HD (1024px)' },
  { label: '2K', value: '2K', description: 'Alta Definición (2048px)' },
  { label: '4K', value: '4K', description: 'Ultra HD (4096px)' },
];

export const ImageGeneratorModal: React.FC<ImageGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyImageToScene,
  currentSceneTitle,
}) => {
  const [prompt, setPrompt] = useState<string>(PRESET_PROMPTS[0]);
  const [model, setModel] = useState<ImageModelType>('gemini-3-pro-image-preview');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('16:9');
  const [imageSize, setImageSize] = useState<ImageSizeType>('1K');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GeneratedImageRecord[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImageRecord | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model,
          aspectRatio,
          imageSize,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error al generar la imagen');
      }

      const newRecord: GeneratedImageRecord = {
        id: Date.now().toString(),
        url: data.imageUrl,
        prompt,
        model,
        aspectRatio,
        imageSize,
        timestamp: new Date().toLocaleTimeString(),
      };

      setGallery((prev) => [newRecord, ...prev]);
      setSelectedImage(newRecord);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err?.message ||
          'No se pudo generar la imagen. Verifica la cuota o las credenciales del modelo.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-neutral-200 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Red Stripe */}
        <div className="h-1 bg-[#E51B23] w-full" />

        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-[#050505] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E51B23] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Generador de Ilustraciones y Poses de Aquila (Gemini Image Studio)
              </h3>
              <p className="text-xs text-neutral-400">
                Crea visuales para la clase actual: <span className="text-[#E51B23] font-semibold">{currentSceneTitle}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Controls Form (Left) */}
          <div className="md:col-span-7 flex flex-col gap-3.5 text-xs">
            {/* Prompt input */}
            <div>
              <label className="font-bold text-neutral-800 block mb-1">
                Prompt de Generación:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 text-neutral-900 text-xs focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 leading-relaxed shadow-xs"
                placeholder="Describe la pose de Aquila, la indumentaria o el esquema médico..."
              />

              {/* Preset buttons */}
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="text-[10px] text-neutral-500 py-0.5 font-medium">Sugerencias:</span>
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(p)}
                    className="text-[10px] px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded border border-neutral-200 truncate max-w-[200px]"
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selector */}
            <div>
              <label className="font-bold text-neutral-800 block mb-1">
                Modelo Gemini:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setModel('gemini-3-pro-image-preview')}
                  className={`p-2 rounded-xl text-left border transition-all shadow-xs ${
                    model === 'gemini-3-pro-image-preview'
                      ? 'bg-red-50 border-red-600 text-red-900'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="font-bold text-[11px] text-red-600">gemini-3-pro-image-preview</div>
                  <div className="text-[10px] text-neutral-500">Calidad Studio / Ultra detallada</div>
                </button>

                <button
                  type="button"
                  onClick={() => setModel('gemini-3.1-flash-image-preview')}
                  className={`p-2 rounded-xl text-left border transition-all shadow-xs ${
                    model === 'gemini-3.1-flash-image-preview'
                      ? 'bg-red-50 border-red-600 text-red-900'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <div className="font-bold text-[11px] text-neutral-800">gemini-3.1-flash-image-preview</div>
                  <div className="text-[10px] text-neutral-500">Generación Rápida / Caso general</div>
                </button>
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="font-bold text-neutral-800 block mb-1">
                Relación de Aspecto (Aspect Ratio):
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {ASPECT_RATIOS.map((ar) => (
                  <button
                    key={ar.value}
                    type="button"
                    onClick={() => setAspectRatio(ar.value)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all shadow-xs ${
                      aspectRatio === ar.value
                        ? 'bg-red-600 text-white border-red-700 font-bold'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="font-mono text-xs">{ar.label}</div>
                    <div className="text-[9px] opacity-75 truncate">{ar.description.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Size Selector */}
            <div>
              <label className="font-bold text-neutral-800 block mb-1">
                Resolución de Imagen (Size):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {IMAGE_SIZES.map((sz) => (
                  <button
                    key={sz.value}
                    type="button"
                    onClick={() => setImageSize(sz.value)}
                    className={`p-2 rounded-lg border text-left transition-all shadow-xs ${
                      imageSize === sz.value
                        ? 'bg-red-50 border-red-600 text-red-900 font-bold'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <div className="font-mono text-xs text-red-600 font-bold">{sz.label}</div>
                    <div className="text-[10px] text-neutral-500">{sz.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 bg-[#E51B23] hover:bg-[#c4141b] text-white font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-xs"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generando imagen con {model} ({imageSize}, {aspectRatio})...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generar Imagen con Gemini</span>
                </>
              )}
            </button>

            {errorMessage && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                ⚠️ {errorMessage}
              </div>
            )}
          </div>

          {/* Preview & Gallery (Right) */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <span className="font-bold text-xs text-neutral-800">
              Vista Previa y Galería de Escenas:
            </span>

            {/* Main Preview Box */}
            <div className="w-full h-64 bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden flex flex-col items-center justify-center relative group shadow-inner">
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.prompt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                    <p className="text-[11px] text-white line-clamp-2">{selectedImage.prompt}</p>
                    <button
                      onClick={() => {
                        onApplyImageToScene(selectedImage.url);
                        onClose();
                      }}
                      className="w-full py-1.5 bg-[#E51B23] hover:bg-[#c4141b] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Aplicar como Fondo/Avatar de la Escena</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4 text-neutral-400">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40 text-neutral-500" />
                  <p className="text-xs text-neutral-600 font-medium">Aquí aparecerá la imagen generada</p>
                  <p className="text-[10px] text-neutral-400">Presiona "Generar Imagen con Gemini" para comenzar</p>
                </div>
              )}
            </div>

            {/* Gallery Thumbnail Strip */}
            {gallery.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                  Generadas en esta sesión ({gallery.length})
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(img)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage?.id === img.id ? 'border-red-600 scale-105 shadow-xs' : 'border-neutral-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt="Thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
