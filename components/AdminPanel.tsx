
import React, { useState } from 'react';
import { Icons } from '../constants';

const AdminPanel: React.FC = () => {
  const [candidates] = useState([
    { id: 1, name: 'Lucas Andrade', quizScore: 98, topic: 'Cálculo I', date: 'Hoje, 14:00', status: 'Aguardando Chamada' },
    { id: 2, name: 'Beatriz Silva', quizScore: 88, topic: 'Mecânica 8.01', date: 'Amanhã, 10:30', status: 'Agendado' },
    { id: 3, name: 'Carlos Mendes', quizScore: 92, topic: 'Biologia 7.01', date: 'Ontem', status: 'Aprovado' },
  ]);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Painel de Administração</h2>
          <p className="text-slate-400">Gestão de Verificações Orais e Pagamentos</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-800 px-6 py-3 rounded-xl">
            <p className="text-xs text-slate-400 uppercase">Pool Acumulado</p>
            <p className="text-2xl font-bold text-green-400">R$ 12.500,00</p>
          </div>
          <div className="bg-slate-800 px-6 py-3 rounded-xl">
            <p className="text-xs text-slate-400 uppercase">Lucro Plataforma (30%)</p>
            <p className="text-2xl font-bold text-yellow-500">R$ 3.750,00</p>
          </div>
        </div>
      </header>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-400 text-sm">CANDIDATO</th>
              <th className="px-6 py-4 font-bold text-slate-400 text-sm">QUIZ (%)</th>
              <th className="px-6 py-4 font-bold text-slate-400 text-sm">TÓPICO</th>
              <th className="px-6 py-4 font-bold text-slate-400 text-sm">HORÁRIO</th>
              <th className="px-6 py-4 font-bold text-slate-400 text-sm">STATUS</th>
              <th className="px-6 py-4 font-bold text-slate-400 text-sm text-right">AÇÕES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {candidates.map((c) => (
              <tr key={c.id} className="hover:bg-slate-700/30 transition">
                <td className="px-6 py-4 font-semibold">{c.name}</td>
                <td className="px-6 py-4 text-yellow-500 font-bold">{c.quizScore}%</td>
                <td className="px-6 py-4">{c.topic}</td>
                <td className="px-6 py-4 text-slate-400">{c.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    c.status === 'Aprovado' ? 'bg-green-500/20 text-green-400' : 
                    c.status === 'Agendado' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-sm transition">
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
