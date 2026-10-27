
import React, { useState, useMemo } from 'react';
import { Send, Terminal, Eraser, Info, AlertCircle } from 'lucide-react';

interface FeatureInputProps {
  onPredict: (features: number[]) => void;
  isLoading: boolean;
  error: string | null;
}

export const FeatureInput: React.FC<FeatureInputProps> = ({ onPredict, isLoading, error }) => {
  const [inputValue, setInputValue] = useState('');
  
  const parsedFeatures = useMemo(() => {
    if (!inputValue.trim()) return [];
    return inputValue
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number);
  }, [inputValue]);

  const isValid = parsedFeatures.length === 78 && parsedFeatures.every(n => !isNaN(n));
  const count = parsedFeatures.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onPredict(parsedFeatures);
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  const loadExample = () => {
    const example = Array.from({ length: 78 }, () => (Math.random() * 5).toFixed(4)).join(', ');
    setInputValue(example);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Manual Vector Input</h2>
            <p className="text-sm text-slate-400">Submit a 78-dimension numerical feature vector</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={loadExample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Load Example
          </button>
          <button 
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Clear input"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. 0.001, 0.45, 1.22, 0.0, ..."
            className={`w-full h-48 bg-slate-900/50 border rounded-xl p-4 text-sm font-mono focus:outline-none focus:ring-2 transition-all resize-none ${
              inputValue.length > 0 
                ? (isValid ? 'border-emerald-500/50 focus:ring-emerald-500/20' : 'border-rose-500/50 focus:ring-rose-500/20')
                : 'border-slate-700 focus:border-indigo-500/50 focus:ring-indigo-500/20'
            }`}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className={`text-xs px-2 py-1 rounded border ${
              count === 78 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}>
              {count} / 78
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-sm text-rose-200">
              <span className="font-bold">Execution Error:</span> {error}
            </div>
          </div>
        )}

        {!isValid && inputValue.length > 0 && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500" />
            <p className="text-xs text-amber-200 font-medium">
              {count < 78 
                ? `Insufficient features. Required: 78. Found: ${count}.` 
                : count > 78 
                  ? `Too many features. Required: 78. Found: ${count}.`
                  : 'Invalid numerical format detected in values.'
              }
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
            !isValid || isLoading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Network Vector...</span>
            </div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Run Hybrid Prediction
            </>
          )}
        </button>
      </form>
    </div>
  );
};
