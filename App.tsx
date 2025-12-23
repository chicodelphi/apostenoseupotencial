
import React, { useState, useEffect } from 'react';
import { AppState, Challenge, QuizResult } from './types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import QuizEngine from './components/QuizEngine';
import AdminPanel from './components/AdminPanel';
import LaunchPlan from './components/LaunchPlan';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>(AppState.LANDING);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Persistência básica para a sessão (ideal para deploy na Vercel)
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth_potencial');
    if (savedAuth) {
      const { auth, admin } = JSON.parse(savedAuth);
      setIsAuthenticated(auth);
      setIsAdmin(admin);
    }
  }, []);

  const challenges: Challenge[] = [
    {
      id: 'mit-18.01',
      title: 'Cálculo I (Single Variable)',
      category: 'Matemática',
      entryFee: 150,
      prizePool: 5000,
      difficulty: 'Avançado',
      mitCourseId: '18.01'
    },
    {
      id: 'mit-8.01',
      title: 'Mecânica Clássica',
      category: 'Física',
      entryFee: 100,
      prizePool: 3500,
      difficulty: 'Intermediário',
      mitCourseId: '8.01'
    },
    {
      id: 'mit-7.01',
      title: 'Introdução à Biologia',
      category: 'Medicina/Biologia',
      entryFee: 120,
      prizePool: 4000,
      difficulty: 'Avançado',
      mitCourseId: '7.01'
    }
  ];

  const handleStartChallenge = (challenge: Challenge) => {
    if (!isAuthenticated) {
      setCurrentPage(AppState.LOGIN);
      return;
    }
    setSelectedChallenge(challenge);
    setCurrentPage(AppState.QUIZ);
    // Scroll to top on page change
    window.scrollTo(0, 0);
  };

  const handleQuizFinish = (result: QuizResult) => {
    setQuizResults(result);
    setCurrentPage(AppState.RESULTS);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (admin: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
    localStorage.setItem('auth_potencial', JSON.stringify({ auth: true, admin }));
    setCurrentPage(admin ? AppState.ADMIN : AppState.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('auth_potencial');
    setCurrentPage(AppState.LANDING);
  };

  const navigateTo = (page: AppState) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case AppState.LANDING:
        return <LandingPage onEnter={() => navigateTo(AppState.DASHBOARD)} onSeePlan={() => navigateTo(AppState.PLAN)} />;
      case AppState.LOGIN:
        return <Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigateTo(AppState.REGISTER)} />;
      case AppState.REGISTER:
        return <Register onRegisterSuccess={() => navigateTo(AppState.LOGIN)} onNavigateToLogin={() => navigateTo(AppState.LOGIN)} />;
      case AppState.DASHBOARD:
        return <Dashboard challenges={challenges} onStart={handleStartChallenge} />;
      case AppState.QUIZ:
        return selectedChallenge ? (
          <QuizEngine challenge={selectedChallenge} onFinish={handleQuizFinish} onCancel={() => navigateTo(AppState.DASHBOARD)} />
        ) : null;
      case AppState.RESULTS:
        return (
          <div className="max-w-4xl mx-auto py-20 text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-yellow-500 mb-4">Quiz Finalizado!</h1>
            <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl inline-block border border-slate-700">
              <p className="text-7xl font-bold mb-4 text-white">{quizResults?.score}%</p>
              <p className="text-slate-400 mb-8">Performance final no {selectedChallenge?.title}</p>
              
              {quizResults && quizResults.score >= 80 ? (
                <div className="bg-green-500/10 border border-green-500/50 p-6 rounded-2xl mb-8">
                  <p className="text-green-400 font-bold text-xl mb-2">Apto para Verificação Oral!</p>
                  <p className="text-sm text-green-300">Você provou seu conhecimento teórico. Agora, nossa banca entrará em contato para a defesa intuitiva via vídeo.</p>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl mb-8">
                  <p className="text-red-400 font-bold">Pontuação Insuficiente</p>
                  <p className="text-sm text-slate-400 mt-2">Você precisa de pelo menos 80% para prosseguir para a premiação em dinheiro.</p>
                </div>
              )}
              
              <button 
                onClick={() => navigateTo(AppState.DASHBOARD)}
                className="bg-yellow-500 text-slate-900 px-10 py-4 rounded-xl font-extrabold hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20"
              >
                Retornar ao Dashboard
              </button>
            </div>
          </div>
        );
      case AppState.ADMIN:
        return isAdmin ? <AdminPanel /> : <Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigateTo(AppState.REGISTER)} />;
      case AppState.PLAN:
        return <LaunchPlan onBack={() => navigateTo(AppState.LANDING)} />;
      default:
        return <LandingPage onEnter={() => navigateTo(AppState.DASHBOARD)} onSeePlan={() => navigateTo(AppState.PLAN)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-yellow-500 selection:text-slate-900">
      <Navbar 
        onNavigate={navigateTo} 
        activePage={currentPage}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <footer className="py-12 border-t border-slate-800 text-center text-slate-500 text-xs">
        <div className="mb-4 flex justify-center gap-6">
          <a href="#" className="hover:text-yellow-500">Termos de Uso</a>
          <a href="#" className="hover:text-yellow-500">Privacidade</a>
          <a href="#" className="hover:text-yellow-500">Regras do Pool</a>
        </div>
        &copy; 2024 Aposte no seu Potencial. Uma iniciativa baseada no currículo MIT OpenCourseWare.<br/>
        Deploy otimizado para Vercel Edge Runtime.
      </footer>
    </div>
  );
};

export default App;
