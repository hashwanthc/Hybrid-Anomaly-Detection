# ==============================
# PERSON 4 - FINAL BACKEND API
# ==============================
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib
from tensorflow.keras.models import load_model

# ------------------------------
# Initialize FastAPI
# ------------------------------
app = FastAPI(title="Hybrid Anomaly Detection API")
# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all (for project/demo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------
# Load Trained Models
# ------------------------------
print("Loading models...")

# Isolation Forest model
if_model = joblib.load("isolation_forest1.pkl")

# Autoencoder model
# Make sure filename matches exactly (.h5 or .keras)
autoencoder = load_model("autoencoder_model1.h5", compile=False)

print("Models loaded successfully")

# ------------------------------
# Input Format
# ------------------------------
class InputData(BaseModel):
    features: list[float]

# ------------------------------
# Prediction Endpoint
# ------------------------------
@app.post("/predict")
def predict(data: InputData):

    X = np.array(data.features).reshape(1, -1)

    # Isolation Forest Prediction
    if_pred = if_model.predict(X)[0]

    # Autoencoder Prediction
    reconstructed = autoencoder.predict(X)
    reconstruction_error = np.mean(np.square(X - reconstructed))

    threshold = 0.01  # adjust if needed
    ae_pred = reconstruction_error > threshold

    # Final Hybrid Decision
    if if_pred == -1 or ae_pred:
        final = "Anomaly"
    else:
        final = "Normal"

    return {
        "Isolation_Forest": "Anomaly" if if_pred == -1 else "Normal",
        "Autoencoder": "Anomaly" if ae_pred else "Normal",
        "Final_Prediction": final
    }
