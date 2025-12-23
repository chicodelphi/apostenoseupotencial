
import React, { useState } from 'react';
import { AppState } from '../types';

interface LoginProps {
  onLoginSuccess: (isAdmin: boolean) => void;
  onNavigateToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulação de delay de rede para UX de "Senior Engineer"
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLoginSuccess(true);
      } else {
        // Mensagem específica solicitada pelo usuário
        setError('Login impossível, contate o administrador do sistema');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative elements for Vercel-ready aesthetics */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-600"></div>
        
        <h2 className="text-3xl font-bold mb-2 text-center text-white">Acesse o Portal</h2>
        <p className="text-slate-400 text-sm text-center mb-8 italic">Área Restrita para Candidatos e Admins</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest">Usuário de Acesso</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition"
              placeholder="Ex: admin"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest">Senha de Segurança</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-bold py-4 rounded-xl transition shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Autenticar no Sistema'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            Novo por aqui? 
            <button 
              onClick={onNavigateToRegister}
              className="text-yellow-500 font-bold ml-2 hover:underline"
              disabled={isLoading}
            >
              Criar Perfil de Estudante
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
