
import React from 'react';
import { PredictionHistoryItem } from '../types';
import { Clock, ExternalLink, MoreVertical } from 'lucide-react';

interface HistoryListProps {
  history: PredictionHistoryItem[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col border-slate-700/50">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white">Execution History</h3>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-center">
            <p className="text-sm">No analysis performed yet.</p>
            <p className="text-xs">Results will appear here.</p>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800/60 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${
                  item.prediction.final_prediction === 'Anomaly' 
                    ? 'bg-rose-500/10 text-rose-500' 
                    : 'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {item.prediction.final_prediction}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">
                  ID: {item.id}
                </p>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 hover:text-indigo-300">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all">
          View All Audit Logs
        </button>
      </div>
    </div>
  );
};
