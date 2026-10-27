
import React from 'react';
import { Search, Bell, User, Cpu } from 'lucide-react';

interface HeaderProps {
  isDemoMode: boolean;
  onToggleDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDemoMode, onToggleDemo }) => {
  return (
    <header className="h-20 border-b border-slate-800 px-4 md:px-8 flex items-center justify-between bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Anomalous Traffic Detection
        </h1>
        <p className="text-sm text-slate-400">Hybrid AI Model Infrastructure</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="bg-transparent border-none outline-none text-sm w-48 text-slate-200"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleDemo}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              isDemoMode 
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            {isDemoMode ? 'DEMO MODE ON' : 'CONNECT TO LOCALHOST'}
          </button>
          
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950" />
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
