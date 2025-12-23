
import React, { useState, useEffect, useCallback } from 'react';
import { Challenge, Question, QuizResult } from '../types';
import { generateQuiz } from '../services/geminiService';
import { Icons } from '../constants';

interface QuizEngineProps {
  challenge: Challenge;
  onFinish: (result: QuizResult) => void;
  onCancel: () => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ challenge, onFinish, onCancel }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [startTime] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [warnings, setWarnings] = useState(0);

  // Sistema de IDs fictício para a marca d'água (em um app real viria do Auth)
  const userSessionId = "USR-" + Math.random().toString(36).substring(7).toUpperCase();

  const handleSecurityBreach = useCallback((type: string) => {
    console.warn(`Segurança: ${type} detectado.`);
    setWarnings(prev => {
      const newWarnings = prev + 1;
      if (newWarnings >= 3) {
        alert("DESCLASSIFICADO: Múltiplas violações de segurança detectadas (saída da aba ou tentativa de cópia).");
        onCancel();
      }
      return newWarnings;
    });
  }, [onCancel]);

  useEffect(() => {
    // 1. Bloqueio de atalhos e clique direito
    const preventDefaults = (e: KeyboardEvent | MouseEvent) => {
      // Bloqueia F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+C
      if (e instanceof KeyboardEvent) {
        if (
          e.key === 'F12' || 
          (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p' || e.key === 'c' || e.key === 'i' || e.key === 'j'))
        ) {
          e.preventDefault();
          handleSecurityBreach("Atalho de teclado");
          return false;
        }
      }
      if (e.type === 'contextmenu') {
        e.preventDefault();
        return false;
      }
    };

    // 2. Monitoramento de Foco da Janela
    const handleBlur = () => {
      setIsWindowFocused(false);
      handleSecurityBreach("Saída de foco/Troca de aba");
    };
    const handleFocus = () => setIsWindowFocused(true);

    window.addEventListener('keydown', preventDefaults as any);
    window.addEventListener('contextmenu', preventDefaults as any);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    const loadQuiz = async () => {
      try {
        const data = await generateQuiz(challenge.title);
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError("Falha ao conectar com a IA para gerar o quiz.");
        setLoading(false);
      }
    };
    loadQuiz();

    return () => {
      window.removeEventListener('keydown', preventDefaults as any);
      window.removeEventListener('contextmenu', preventDefaults as any);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [challenge, handleSecurityBreach]);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const correctCount = questions.reduce((acc, q, idx) => {
        return acc + (answers[idx] === q.correctAnswerIndex ? 1 : 0);
      }, 0);
      const score = (correctCount / questions.length) * 100;
      onFinish({
        score,
        totalQuestions: questions.length,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        passed: score >= 80
      });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-xl text-slate-400">Gemini está gerando questões de nível MIT para você...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 mb-4">{error}</p>
      <button onClick={onCancel} className="text-slate-400 hover:text-white underline">Voltar</button>
    </div>
  );

  const q = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto py-10 relative">
      {/* Marca d'água dinâmica agressiva em tela cheia */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Ctext x='0' y='125' font-size='14' fill='white' transform='rotate(-45 125 125)'%3E${userSessionId} - ${new Date().toLocaleDateString()}%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* Overlay de desfoque quando perde o foco (evita print de aba lateral) */}
      {!isWindowFocused && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[200] flex items-center justify-center text-center p-10">
          <div>
            <div className="text-red-500 mb-4 animate-bounce"><Icons.Brain /></div>
            <h2 className="text-2xl font-bold text-white mb-2">CONTEÚDO PROTEGIDO</h2>
            <p className="text-slate-400">Volte para a janela do teste para continuar. Esta ação foi registrada.</p>
            <p className="text-red-500 mt-4 font-bold">Avisos de Segurança: {warnings}/3</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">{challenge.title}</h2>
          <p className="text-slate-500">Questão {currentIndex + 1} de {questions.length}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-slate-500">Lockdown Ativo</p>
          <div className="flex items-center gap-2 text-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {userSessionId}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Camada extra de proteção visual contra fotos */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-transparent pointer-events-none"></div>
        
        <p className="text-2xl font-semibold mb-8 relative z-10">{q.text}</p>
        
        <div className="space-y-4 relative z-10">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                answers[currentIndex] === idx 
                  ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' 
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                   answers[currentIndex] === idx ? 'bg-yellow-500 text-slate-900 border-yellow-500' : 'border-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                {opt}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-between items-center relative z-10">
          <button 
            onClick={onCancel}
            className="text-slate-500 hover:text-red-400 transition"
          >
            Sair e Desistir
          </button>
          <button
            disabled={answers[currentIndex] === undefined}
            onClick={handleNext}
            className="bg-yellow-500 text-slate-900 px-10 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition"
          >
            {currentIndex === questions.length - 1 ? 'Finalizar Desafio' : 'Próxima Questão'}
          </button>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-slate-600 mt-6 uppercase tracking-tighter">
        Protegido por Criptografia Visual Dinâmica. Tentativas de captura de tela ou foto resultam em banimento imediato e perda da taxa de inscrição. ID: {userSessionId}
      </p>
    </div>
  );
};

export default QuizEngine;
