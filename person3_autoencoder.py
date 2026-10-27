# ==========================================
# PERSON 3 : DEEP LEARNING (AUTOENCODER)
# ==========================================

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt

# ------------------------------------------
# STEP 1: LOAD DATASET (SAFE SIZE)
# ------------------------------------------

print("Loading dataset...")

# Use only file name if in same folder
df = pd.read_csv("cleaned_dataset.csv", nrows=500000)

X = df.values
print("Dataset loaded successfully")
print("Shape:", X.shape)

# ------------------------------------------
# STEP 2: TRAIN-TEST SPLIT
# ------------------------------------------

X_train, X_test = train_test_split(
    X, test_size=0.2, random_state=42
)

print("Train shape:", X_train.shape)
print("Test shape:", X_test.shape)

# ------------------------------------------
# STEP 3: BUILD AUTOENCODER MODEL
# ------------------------------------------

input_dim = X_train.shape[1]

input_layer = Input(shape=(input_dim,))

# Encoder
encoded = Dense(64, activation="relu")(input_layer)
encoded = Dense(32, activation="relu")(encoded)
encoded = Dense(16, activation="relu")(encoded)

# Decoder
decoded = Dense(32, activation="relu")(encoded)
decoded = Dense(64, activation="relu")(decoded)
decoded = Dense(input_dim, activation="linear")(decoded)

autoencoder = Model(inputs=input_layer, outputs=decoded)

autoencoder.compile(
    optimizer=Adam(learning_rate=0.001),
    loss="mse"
)

autoencoder.summary()

# ------------------------------------------
# STEP 4: TRAIN AUTOENCODER
# ------------------------------------------

print("Training Autoencoder...")

history = autoencoder.fit(
    X_train, X_train,
    epochs=15,
    batch_size=256,
    validation_data=(X_test, X_test),
    verbose=1
)

print("Autoencoder training completed")

# ------------------------------------------
# STEP 5: RECONSTRUCTION ERROR
# ------------------------------------------

print("Calculating reconstruction error...")

X_test_pred = autoencoder.predict(X_test)

reconstruction_error = np.mean(
    np.square(X_test - X_test_pred),
    axis=1
)

# ------------------------------------------
# STEP 6: SET THRESHOLD & DETECT ANOMALIES
# ------------------------------------------

threshold = np.percentile(reconstruction_error, 95)

anomalies = reconstruction_error > threshold

print("Threshold value:", threshold)
print("Total anomalies detected:", anomalies.sum())

# ------------------------------------------
# STEP 7: VISUALIZE RECONSTRUCTION ERROR
# ------------------------------------------

plt.figure(figsize=(10, 4))
plt.plot(reconstruction_error[:2000])
plt.axhline(y=threshold, color="r", linestyle="--")
plt.title("Autoencoder Reconstruction Error")
plt.xlabel("Sample Index")
plt.ylabel("Error")
plt.show()

# ------------------------------------------
# STEP 8: SAVE AUTOENCODER MODEL
# ------------------------------------------

autoencoder.save("autoencoder_model1.h5")

print("Autoencoder model saved successfully")
print("PERSON-3 TASK COMPLETED ✅")
