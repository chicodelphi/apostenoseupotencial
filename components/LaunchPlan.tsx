
import React from 'react';
import { Icons } from '../constants';

interface LaunchPlanProps {
  onBack: () => void;
}

const LaunchPlan: React.FC<LaunchPlanProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <button onClick={onBack} className="text-yellow-500 mb-8 hover:underline flex items-center gap-2">
        ← Voltar para Home
      </button>

      <h1 className="text-4xl font-bold mb-12">Plano de Execução MVP 🚀</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="bg-yellow-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center">1</span>
            Stack Tecnológica (No-Code/Low-Code)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-yellow-500 mb-2">Frontend & Plataforma</h3>
              <p className="text-slate-400 text-sm">Bubble.io ou Glide Apps para gestão de usuários, dashboard e leaderboard.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-yellow-500 mb-2">IA & Verificação</h3>
              <p className="text-slate-400 text-sm">Gemini API para gerar quizzes dinâmicos e roteiros de prova oral.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-yellow-500 mb-2">Pagamentos</h3>
              <p className="text-slate-400 text-sm">Stripe Checkout ou PayPal para taxas de entrada e checkout seguro.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="font-bold text-yellow-500 mb-2">Operação</h3>
              <p className="text-slate-400 text-sm">Calendly + Zoom para agendar orais; Google Drive para backups de gravações.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="bg-yellow-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center">2</span>
            Fases do Desafio (Anti-Cheat)
          </h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex gap-3">
              <Icons.Trophy />
              <div>
                <strong>Fase 1: Quiz Relâmpago.</strong> 20 questões em 15 minutos. Tempo curto impede consultas profundas. Randomização via Gemini.
              </div>
            </li>
            <li className="flex gap-3">
              <Icons.Brain />
              <div>
                <strong>Fase 2: Verificação Oral.</strong> Somente para o Top 10%. Chamada gravada. "Explique a intuição da segunda lei de Newton sem usar números".
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="bg-yellow-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center">3</span>
            Estratégia de Lançamento (Go-to-Market)
          </h2>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-slate-500">Onde anunciar?</h4>
                <ul className="text-sm space-y-2 text-slate-400">
                  <li>• Reddit (r/learnmath, r/MITOCW)</li>
                  <li>• Twitter/X (comunidade de Tech/Education)</li>
                  <li>• Grupos de Telegram de Engenharia/Medicina</li>
                  <li>• LinkedIn (foco em certificações informais)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-slate-500">Métricas de Sucesso</h4>
                <ul className="text-sm space-y-2 text-slate-400">
                  <li>• 100 Participantes Pagantes (R$ 10k Pool)</li>
                  <li>• Taxa de Passagem Quiz (>80%): 20%</li>
                  <li>• Taxa de Passagem Oral: 10%</li>
                  <li>• NPS (Net Promoter Score) dos perdedores</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-yellow-500/10 border border-yellow-500/30 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-yellow-500">Considerações Legais</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Este modelo é um <strong>Skill-Based Contest</strong> (Concurso baseado em habilidade), não gambling. 
            A vitória depende estritamente do conhecimento acadêmico comprovado. 
            É vital ter um <em>Terms of Service</em> claro sobre:
            <br /><br />
            1. Consentimento para gravação e armazenamento da prova oral.<br />
            2. Política de 'Anti-Cheat': Desclassificação imediata se houver suspeita de fraude na oral.<br />
            3. Distribuição de prêmios: 70% pool / 30% plataforma como taxa de serviço de auditoria.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LaunchPlan;
