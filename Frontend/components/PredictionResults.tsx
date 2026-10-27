
import React from 'react';
import { PredictionResponse } from '../types';
import { ShieldCheck, AlertOctagon, Layers, Cpu, CheckCircle, WarningCircle } from 'lucide-react';

interface PredictionResultsProps {
  result: PredictionResponse;
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({ result }) => {
  const isAnomaly = result.final_prediction === 'Anomaly';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Model 1: Isolation Forest */}
      <div className="glass-panel rounded-2xl p-6 border-slate-700/50 flex flex-col justify-between group hover:border-slate-500 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-sm font-semibold text-slate-300">Isolation Forest</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xl font-bold ${result.isolation_forest === 'Anomaly' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {result.isolation_forest}
          </span>
          {result.isolation_forest === 'Anomaly' ? <AlertOctagon className="w-5 h-5 text-rose-500" /> : <ShieldCheck className="w-5 h-5 text-emerald-500" />}
        </div>
      </div>

      {/* Model 2: Autoencoder */}
      <div className="glass-panel rounded-2xl p-6 border-slate-700/50 flex flex-col justify-between group hover:border-slate-500 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-sm font-semibold text-slate-300">Autoencoder (AE)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xl font-bold ${result.autoencoder === 'Anomaly' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {result.autoencoder}
          </span>
          {result.autoencoder === 'Anomaly' ? <AlertOctagon className="w-5 h-5 text-rose-500" /> : <ShieldCheck className="w-5 h-5 text-emerald-500" />}
        </div>
      </div>

      {/* Combined: Final Verdict */}
      <div className={`rounded-2xl p-6 border shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between ${
        isAnomaly 
          ? 'bg-rose-500/10 border-rose-500 shadow-rose-500/10' 
          : 'bg-emerald-500/10 border-emerald-500 shadow-emerald-500/10'
      }`}>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isAnomaly ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}>
            <CheckCircle className={`w-4 h-4 ${isAnomaly ? 'text-rose-400' : 'text-emerald-400'}`} />
          </div>
          <span className={`text-sm font-bold uppercase tracking-wider ${isAnomaly ? 'text-rose-400' : 'text-emerald-400'}`}>
            Hybrid Decision
          </span>
        </div>
        
        <div className="flex items-end justify-between relative z-10">
          <span className={`text-4xl font-black ${isAnomaly ? 'text-rose-400' : 'text-emerald-400'}`}>
            {result.final_prediction}
          </span>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1 ${
            isAnomaly ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
          }`}>
            ACTION REQUIRED
          </div>
        </div>

        {/* Decorative elements */}
        <div className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rounded-full blur-3xl ${isAnomaly ? 'bg-rose-500' : 'bg-emerald-500'}`} />
      </div>
    </div>
  );
};
