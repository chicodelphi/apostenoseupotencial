
import React, { useState } from 'react';

interface RegisterProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    // Mock success
    onRegisterSuccess();
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Criar Conta</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-1 uppercase tracking-widest">Nome Completo</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition"
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-1 uppercase tracking-widest">E-mail</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition"
              placeholder="exemplo@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-1 uppercase tracking-widest">Senha</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-1 uppercase tracking-widest">Confirmar Senha</label>
            <input 
              type="password" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl mt-4 transition shadow-lg shadow-yellow-500/20"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            Já tem uma conta? 
            <button 
              onClick={onNavigateToLogin}
              className="text-yellow-500 font-bold ml-2 hover:underline"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
