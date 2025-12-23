
import React from 'react';
import { AppState } from '../types';
import { Icons } from '../constants';

interface NavbarProps {
  onNavigate: (page: AppState) => void;
  activePage: AppState;
  isAuthenticated: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage, isAuthenticated, isAdmin, onLogout }) => {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate(AppState.LANDING)}
        >
          <div className="bg-yellow-500 p-2 rounded-lg group-hover:scale-110 transition">
            <Icons.Graduation />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            APOSTE NO SEU <span className="text-yellow-500 uppercase">POTENCIAL</span>
          </span>
        </div>
        
        <div className="flex gap-4 sm:gap-6 items-center">
          <button 
            onClick={() => onNavigate(AppState.DASHBOARD)}
            className={`text-sm font-semibold transition hover:text-yellow-500 ${activePage === AppState.DASHBOARD ? 'text-yellow-500' : 'text-slate-400'}`}
          >
            Dashboard
          </button>
          
          {isAdmin && (
            <button 
              onClick={() => onNavigate(AppState.ADMIN)}
              className={`text-sm font-semibold transition hover:text-yellow-500 ${activePage === AppState.ADMIN ? 'text-yellow-500' : 'text-slate-400'}`}
            >
              Admin
            </button>
          )}

          {!isAuthenticated ? (
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate(AppState.LOGIN)}
                className={`text-sm font-semibold transition hover:text-yellow-500 ${activePage === AppState.LOGIN ? 'text-yellow-500' : 'text-slate-400'}`}
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate(AppState.REGISTER)}
                className="bg-yellow-500 text-slate-900 px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-yellow-400 transition"
              >
                Cadastrar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700 flex items-center gap-2">
                <span className="text-yellow-500 font-bold">R$ 0,00</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-sm font-semibold text-red-400 hover:text-red-300 transition"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
