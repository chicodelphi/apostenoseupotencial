
import React from 'react';
import { Icons } from '../constants';

interface LandingPageProps {
  onEnter: () => void;
  onSeePlan: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onSeePlan }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-5xl mx-auto py-12 px-4">
      <div className="mb-12 relative">
        <div className="absolute -inset-4 bg-yellow-500/20 blur-3xl rounded-full"></div>
        <img 
          src="https://picsum.photos/seed/edu/300/300" 
          alt="Logo" 
          className="w-48 h-48 rounded-full border-4 border-yellow-500 shadow-2xl relative z-10 mx-auto"
        />
      </div>
      
      <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight leading-tight">
        Transforme seu <span className="text-yellow-500">Conhecimento</span> <br /> 
        em Recompensa Real.
      </h1>
      
      <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
        Competições acadêmicas baseadas no currículo do MIT OCW. 
        Estude de graça, compita com taxa de entrada e ganhe prêmios em dinheiro 
        ao provar sua excelência em Cálculo, Física e Medicina.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={onEnter}
          className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-yellow-500/20 transition-all flex items-center justify-center gap-2"
        >
          Começar Desafio <Icons.Trophy />
        </button>
        <button 
          onClick={onSeePlan}
          className="bg-slate-800 text-white hover:bg-slate-700 px-10 py-4 rounded-xl font-bold text-lg border border-slate-700 transition-all"
        >
          Ver Estratégia MVP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <div className="text-yellow-500 mb-4"><Icons.Brain /></div>
          <h3 className="text-xl font-bold mb-2">Padrão MIT</h3>
          <p className="text-slate-400">Conteúdo e rigor inspirados nas melhores universidades do mundo.</p>
        </div>
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <div className="text-yellow-500 mb-4"><Icons.Coins /></div>
          <h3 className="text-xl font-bold mb-2">Skill-Based</h3>
          <p className="text-slate-400">Aqui não é sorte. É domínio. 70% das taxas retornam como prêmios.</p>
        </div>
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <div className="text-yellow-500 mb-4"><Icons.Graduation /></div>
          <h3 className="text-xl font-bold mb-2">Verificação Oral</h3>
          <p className="text-slate-400">Nossa barreira anti-cheat. Prove seu raciocínio intuitivo em vídeo.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
