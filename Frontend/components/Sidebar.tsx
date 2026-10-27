
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Database, 
  PieChart, 
  ShieldAlert,
  Zap
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <Zap className="w-5 h-5" />, label: 'Live Stream', active: false },
    { icon: <Database className="w-5 h-5" />, label: 'Datasets', active: false },
    { icon: <PieChart className="w-5 h-5" />, label: 'Analytics', active: false },
    { icon: <ShieldAlert className="w-5 h-5" />, label: 'Incidents', active: false },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', active: false },
  ];

  return (
    <div className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full transition-all">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold hidden lg:block tracking-tight text-white">Hybrid-AD</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              item.active 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="font-medium hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-3 hidden lg:block">
          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">API Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-300">V1.4 Production</span>
          </div>
        </div>
      </div>
    </div>
  );
};
