
import { PredictionRequest, PredictionResponse } from '../types';

const BASE_URL = 'http://127.0.0.1:8000';

export class AnomalyApiService {
  static async predict(data: PredictionRequest): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server responded with ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Helper to generate a demo prediction for development/presentation
  static mockPredict(data: number[]): Promise<PredictionResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock logic: if the sum of first 5 features is > 100, mark as anomaly
        const sum = data.slice(0, 5).reduce((a, b) => a + b, 0);
        const isAnomaly = sum > 100 || Math.random() > 0.8;
        
        resolve({
          isolation_forest: isAnomaly ? 'Anomaly' : 'Normal',
          autoencoder: isAnomaly ? 'Anomaly' : 'Normal',
          final_prediction: isAnomaly ? 'Anomaly' : 'Normal',
          reconstruction_error: Math.random() * 0.5,
          anomaly_score: isAnomaly ? 0.92 : 0.05
        });
      }, 1500);
    });
  }
}
