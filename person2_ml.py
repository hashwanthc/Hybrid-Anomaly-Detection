# ==========================================
# PERSON 2 : MACHINE LEARNING - ANOMALY DETECTION
# Models: Isolation Forest & One-Class SVM
# ==========================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
from sklearn.svm import OneClassSVM
import joblib

# ------------------------------------------
# STEP 1: LOAD DATASET (SAFE & FAST)
# ------------------------------------------

print("Loading dataset...")

df = pd.read_csv(
    "cleaned_dataset.csv",
    nrows=500000   # load only 5 lakh rows
)

print("Dataset loaded successfully")
print("Shape:", df.shape)

X = df.values

# ------------------------------------------
# STEP 2: ISOLATION FOREST MODEL
# ------------------------------------------

print("\nTraining Isolation Forest...")

if_model = IsolationForest(
    n_estimators=200,
    contamination=0.02,
    random_state=42
)

if_model.fit(X)

if_pred = if_model.predict(X)  # 1 = normal, -1 = anomaly

print("Isolation Forest training completed")
print("Anomalies detected (IF):", (if_pred == -1).sum())

# Save Isolation Forest predictions
pd.DataFrame(if_pred, columns=["IF_Prediction"]).to_csv(
    "if_output.csv", index=False
)




# ------------------------------------------
# STEP 4: VISUALIZATION (IF SCORES)
# ------------------------------------------

print("\nPlotting anomaly scores...")

scores = if_model.decision_function(X)

plt.figure(figsize=(10, 4))
plt.plot(scores[:10000])
plt.title("Isolation Forest Anomaly Scores")
plt.xlabel("Sample Index")
plt.ylabel("Score")
plt.show()

# ------------------------------------------
# STEP 5: SAVE MODELS (IMPORTANT)
# ------------------------------------------

joblib.dump(if_model, "isolation_forest1.pkl")

print("\nModels saved successfully!")

print("\nPERSON-2 TASK COMPLETED ✅")
