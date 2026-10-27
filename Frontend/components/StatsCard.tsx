
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border-slate-800/80 hover:bg-slate-800/50 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
          <h4 className={`text-2xl font-bold tracking-tight ${color || 'text-white'}`}>{value}</h4>
        </div>
        <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-5 h-5 rounded-full border border-slate-900 bg-slate-700" />
          ))}
        </div>
        <span className="text-[10px] text-slate-500 font-medium">+12 active sensors</span>
      </div>
    </div>
  );
};
