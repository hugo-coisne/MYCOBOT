import joblib
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.discriminant_analysis import StandardScaler
from sklearn.preprocessing import LabelEncoder


def load_objects():
    # Chargement des objets
    model = joblib.load("project/ML/KNN_model_Optuna.pkl")
    scaler = joblib.load("project/ML/saved_objects/scaler.pkl")
    pca = joblib.load("project/ML/saved_objects/pca.pkl")
    target_encoder = joblib.load("project/ML/saved_objects/target_encoder.pkl")
    column_order = joblib.load("project/ML/saved_objects/column_order.pkl")
    onehot_columns = joblib.load("project/ML/saved_objects/onehot_columns.pkl")
    return model, scaler, pca, target_encoder, column_order, onehot_columns


def predict_single(features_df):
    model, scaler, pca, target_encoder, column_order, onehot_columns = load_objects()
    
    features_df = features_df[column_order]
    
    df_onehot = pd.get_dummies(features_df, dtype=int).reindex(
        columns=onehot_columns, fill_value=0, 
    ) 
    X_scaled = scaler.transform(df_onehot)
    
    X_pca = pca.transform(X_scaled)
    
    # Inverser les prédictions après modèle.predict()
    y_pred = model.predict(X_pca)
    y_pred_labels = target_encoder.inverse_transform(y_pred)

    return y_pred_labels[0]
