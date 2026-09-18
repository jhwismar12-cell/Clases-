import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, X, Loader2, GraduationCap } from 'lucide-react';

interface AquilaTutorChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentSceneTitle: string;
  currentCourseTitle?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'aquila';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'aquila',
    text: '¡Saludos, colega! Soy Aquila. Estoy atento a cualquier duda sobre bioquímica, biomoléculas, membranas celulares o la fisiología respiratoria. ¿En qué puedo orientarte hoy?',
    timestamp: 'Ahora',
  },
];

export const AquilaTutorChat: React.FC<AquilaTutorChatProps> = ({
  isOpen,
  onClose,
  currentSceneTitle,
  currentCourseTitle,
}) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/ask-aquila', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg.text,
          currentScene: currentSceneTitle,
          currentCourse: currentCourseTitle,
        }),
      });

      const data = await response.json();
      const aquilaMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'aquila',
        text: data.answer || '¡Excelente interrogante científica! Sigamos profundizando.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aquilaMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'aquila',
        text: '¡Buena pregunta! Recuerda que en fisicoquímica médica todos los gradientes de difusión obedecen a la diferencia de presión parcial y a la solubilidad del gas. ¡#SomosÁguilasRojas!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg h-[520px] bg-white border border-neutral-200 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Red Stripe */}
        <div className="h-1 bg-[#E51B23] w-full" />

        {/* Header */}
        <div className="p-3.5 bg-[#050505] text-white border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E51B23] flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                Consultorio Académico con Prof. Aquila
              </h4>
              <p className="text-[10px] text-neutral-400 font-medium">
                Universidad Católica de Cuenca • <span className="text-[#E51B23]">{currentSceneTitle}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#F8F9FA]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#E51B23] text-white rounded-tr-none shadow-xs'
                    : 'bg-white text-neutral-800 border border-neutral-200 rounded-tl-none shadow-xs'
                }`}
              >
                {m.sender === 'aquila' && (
                  <div className="text-[10px] text-[#E51B23] font-bold mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Prof. Aquila
                  </div>
                )}
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span className={`text-[9px] mt-1 block text-right ${m.sender === 'user' ? 'text-red-100' : 'text-neutral-400'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-neutral-600 text-xs italic p-2.5 bg-white border border-neutral-200 rounded-xl max-w-[75%] shadow-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E51B23]" />
              <span>Aquila está redactando la respuesta académica...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-neutral-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregúntale a Aquila sobre este tema..."
            className="flex-1 bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:border-[#E51B23] focus:outline-none focus:ring-1 focus:ring-[#E51B23] shadow-xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-3.5 py-2 bg-[#E51B23] hover:bg-[#c4141b] text-white rounded-lg text-xs font-bold transition-all disabled:opacity-40 flex items-center gap-1 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
