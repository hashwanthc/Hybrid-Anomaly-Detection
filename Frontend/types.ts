
export interface PredictionResponse {
  isolation_forest: 'Anomaly' | 'Normal';
  autoencoder: 'Anomaly' | 'Normal';
  final_prediction: 'Anomaly' | 'Normal';
  reconstruction_error?: number;
  anomaly_score?: number;
}

export interface PredictionRequest {
  features: number[];
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: string;
  prediction: PredictionResponse;
  features: number[];
}

export enum PredictionStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
