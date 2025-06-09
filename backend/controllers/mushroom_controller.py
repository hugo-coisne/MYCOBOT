from datetime import datetime
import json
import pandas as pd
import os
from ML.train_test_dummy import train_save_model
from ML.inference import predict_single

MODEL_PATH = "ML/KNN_model_Optuna.pkl"


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

        # analysis_explanation, is_valid = analyze_feedback_with_llama(user_feedback) uncomment once firebase works

        doc_data = {
            "mushroom": mushroom_data,
            "predicted_class": predicted_class,
            "user_feedback": user_feedback,
            "timestamp": datetime.now().isoformat(),
            "llama_analysis": "analysis_explanation", # unquote once firebase works
            "is_valid": True, # use is_valid variable once firebase works
        }
        userFeedbackRef.set(doc_data)

        return userFeedbackRef.id

    except Exception as e:
        raise Exception(f"Error saving user feedback: {str(e)}")


def analyze_feedback_with_llama(feedback: str) -> bool: # adapt for dockerized ollama
    prompt = (
        "Tu es un assistant IA chargé d’analyser les feedbacks sur une prédiction de champignon. "
        "Dis si le feedback est pertinent ou non pour améliorer un modèle de classification. "
        "Considère le feedback pertinent seulement s’il explique pourquoi la prédiction était fausse "
        "ou corrige une erreur. Réponds uniquement par 'pertinent' ou 'non pertinent'.\n\n"
        f'Feedback utilisateur : "{feedback}"'
    )

    try:
        response = ollama.chat(
            model="gemma:2b", messages=[{"role": "user", "content": prompt}]
        )
        result = response["message"]["content"].strip().lower()
        invalid_phrases = ["non pertinent", "n'est pas pertinent"]
        valid = True
        for phrase in invalid_phrases:
            if phrase in result:
                valid = False
        print("Réponse de LLaMA :", result)
        return result, valid
    except Exception as e:
        print("Erreur avec LLaMA :", e)
        return False


def get_model_performance():
    df, X_train, X_test, y_train, y_test = preprocess_input()
    res = test_model(X_test, y_test)
    return res
