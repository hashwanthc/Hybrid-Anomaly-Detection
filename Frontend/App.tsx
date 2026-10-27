
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FeatureInput } from './components/FeatureInput';
import { PredictionResults } from './components/PredictionResults';
import { StatsCard } from './components/StatsCard';
import { FeatureChart } from './components/FeatureChart';
import { HistoryList } from './components/HistoryList';
import { 
  PredictionResponse, 
  PredictionStatus, 
  PredictionHistoryItem 
} from './types';
import { AnomalyApiService } from './services/api';
import { Activity, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<PredictionStatus>(PredictionStatus.IDLE);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastFeatures, setLastFeatures] = useState<number[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handlePredict = useCallback(async (features: number[]) => {
    setStatus(PredictionStatus.LOADING);
    setError(null);
    setLastFeatures(features);

    try {
      const response = isDemoMode 
        ? await AnomalyApiService.mockPredict(features)
        : await AnomalyApiService.predict({ features });
      
      setResult(response);
      setStatus(PredictionStatus.SUCCESS);

      // Add to history
      const newItem: PredictionHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        prediction: response,
        features: features
      };
      setHistory(prev => [newItem, ...prev].slice(0, 10));
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred connecting to the backend.');
      setStatus(PredictionStatus.ERROR);
    }
  }, [isDemoMode]);

  const totalChecks = history.length;
  const anomaliesCount = history.filter(h => h.prediction.final_prediction === 'Anomaly').length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isDemoMode={isDemoMode} 
          onToggleDemo={() => setIsDemoMode(!isDemoMode)} 
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {/* Welcome & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="System Status" 
              value="Operational" 
              icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
              color="text-emerald-500"
            />
            <StatsCard 
              title="Analysis Total" 
              value={totalChecks.toString()} 
              icon={<Activity className="w-6 h-6 text-indigo-500" />}
              color="text-indigo-500"
            />
            <StatsCard 
              title="Anomalies Detected" 
              value={anomaliesCount.toString()} 
              icon={<AlertTriangle className="w-6 h-6 text-rose-500" />}
              color="text-rose-500"
            />
            <StatsCard 
              title="Avg Latency" 
              value="24ms" 
              icon={<Clock className="w-6 h-6 text-amber-500" />}
              color="text-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
              <FeatureInput 
                onPredict={handlePredict} 
                isLoading={status === PredictionStatus.LOADING}
                error={error}
              />
              
              {status === PredictionStatus.SUCCESS && result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <PredictionResults result={result} />
                  <div className="glass-panel rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-indigo-400" />
                      Input Vector Visualization
                    </h3>
                    <div className="h-64">
                      <FeatureChart data={lastFeatures} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar-style History Section */}
            <div className="lg:col-span-1">
              <HistoryList history={history} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
