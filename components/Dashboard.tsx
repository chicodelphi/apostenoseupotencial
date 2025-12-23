
import React from 'react';
import { Challenge } from '../types';
import { Icons } from '../constants';

interface DashboardProps {
  challenges: Challenge[];
  onStart: (c: Challenge) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ challenges, onStart }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Desafios Disponíveis</h2>
        <p className="text-slate-400">Escolha um curso e mostre seu potencial.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c) => (
            <div 
              key={c.id} 
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-yellow-500/50 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded uppercase font-bold tracking-widest">{c.category}</span>
                  <span className="text-yellow-500 font-bold">MIT {c.mitCourseId}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{c.title}</h3>
                <div className="flex gap-4 text-sm text-slate-400 mb-6">
                  <span className="flex items-center gap-1"><Icons.Coins /> Taxa: R$ {c.entryFee}</span>
                  <span className="flex items-center gap-1 font-semibold text-green-400"><Icons.Trophy /> Prize Pool: R$ {c.prizePool}</span>
                </div>
              </div>
              <button 
                onClick={() => onStart(c)}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-xl font-bold transition"
              >
                Participar
              </button>
            </div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icons.Trophy /> Top Leaderboard
            </h4>
            <div className="space-y-4">
              {[
                { name: 'Lucas A.', score: 98, prize: 'R$ 5.000' },
                { name: 'Mariana S.', score: 95, prize: 'R$ 2.500' },
                { name: 'João P.', score: 92, prize: 'R$ 1.000' }
              ].map((user, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                  <span className="text-slate-300">{idx+1}. {user.name}</span>
                  <span className="text-yellow-500 font-bold">{user.prize}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-xs text-slate-500 hover:text-white transition">Ver ranking completo →</button>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-6 text-slate-900 shadow-xl">
            <h4 className="font-bold text-xl mb-2 italic">Desafio Polímata</h4>
            <p className="text-sm font-medium mb-4 opacity-90">Vença em 3 categorias diferentes (Math, Physics, Bio) e ganhe um bônus de R$ 10.000.</p>
            <div className="bg-white/20 h-2 rounded-full mb-2">
              <div className="bg-white w-1/3 h-full rounded-full"></div>
            </div>
            <span className="text-xs font-bold uppercase">Progresso: 1/3</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
