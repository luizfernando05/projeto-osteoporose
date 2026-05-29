from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from pathlib import Path
import pandas as pd
import joblib

app = FastAPI(
    title="Osteoporosis Risk Prediction API",
    version="1.0.0"
)

# =========================
# Carregar modelos
# =========================

BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"

rf_model = joblib.load(MODELS_DIR / "random_forest.pkl")
stacking_model = joblib.load(MODELS_DIR / "stacking_model.pkl")


# =========================
# Schema de entrada
# =========================

class PredictionInput(BaseModel):
    # Modelo 1
    t_score_value: float

    # Modelo 2 (opcionais)
    age: Optional[int] = None
    z_score_value: Optional[float] = None
    occupation_student: Optional[int] = None
    medical_history_uterus_rem_appendex_disk: Optional[int] = None


# =========================
# Endpoint principal
# =========================

@app.post("/predict")
def predict(data: PredictionInput):

    # ----------------------------------
    # Verifica se todos atributos do
    # stacking foram enviados
    # ----------------------------------

    use_stacking = all([
        data.age is not None,
        data.z_score_value is not None,
        data.occupation_student is not None,
        data.medical_history_uterus_rem_appendex_disk is not None
    ])

    # ==================================
    # MODELO 2 - STACKING
    # ==================================

    if use_stacking:

        input_data = pd.DataFrame([{
            "Age": data.age,
            "T-score Value": data.t_score_value,
            "Z-Score Value": data.z_score_value,
            "Occupation _student": data.occupation_student,
            "Medical History_uterus rem, appendex, disk":
                data.medical_history_uterus_rem_appendex_disk
        }])

        prediction = stacking_model.predict(input_data)[0]

        probability = stacking_model.predict_proba(input_data)[0].max()

        return {
            "model_used": "stacking_model",
            "prediction": int(prediction),
            "risk_probability": float(probability)
        }

    # ==================================
    # MODELO 1 - RANDOM FOREST
    # ==================================

    input_data = pd.DataFrame([{
        "T-score Value": data.t_score_value
    }])

    prediction = rf_model.predict(input_data)[0]

    probability = rf_model.predict_proba(input_data)[0].max()

    return {
        "model_used": "random_forest",
        "prediction": int(prediction),
        "risk_probability": float(probability)
    }