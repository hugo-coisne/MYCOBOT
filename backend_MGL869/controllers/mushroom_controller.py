from datetime import datetime
import json
import pandas as pd
import os
from ML.train_test_dummy import train_save_model
from ML.inference import predict_single

MODEL_PATH = "project/ML/KNN_model_Optuna.pkl"


def analyze_mushroom(data):
    if not all(data.values()):
        return {"error": "Tous les champs du formulaire sont requis."}, 400

    df_input = pd.DataFrame([data])

    if not os.path.exists(MODEL_PATH):
        print("Modèle non trouvé. Entraînement en cours...")
        train_save_model()
        print("Modèle entraîné, sauvegardé et prêt pour la classification.")

    prediction = predict_single(df_input)
    return prediction


def save_userFeedback(
    firestoreDB, mushroom_json: str, predicted_class: str, user_feedback: str
):
    try:
        mushroom_data = json.loads(mushroom_json)
        userFeedbackRef = firestoreDB.collection("UserFeedbacks").document()

        doc_data = {
            "mushroom": mushroom_data,
            "predicted_class": predicted_class,
            "user_feedback": user_feedback,
            "timestamp": datetime.now().isoformat(),
        }
        userFeedbackRef.set(doc_data)

        return userFeedbackRef.id

    except Exception as e:
        raise Exception(f"Error saving user feedback: {str(e)}")
