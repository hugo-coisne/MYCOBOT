import joblib
from ucimlrepo import fetch_ucirepo
import pandas as pd
import numpy as np
import scipy.stats
import itertools
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
import scipy
import itertools
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

def load_mushroom_data():
    mushroom = fetch_ucirepo(id=73)

    X = mushroom.data.features  # (caractéristiques des champignons)
    y = mushroom.data.targets  # la cible (class: comestible e ou toxique p)
    df_initial = pd.concat([X, y], axis=1)
    return X, y, df_initial


def handle_missing_values(X, df):
    X["stalk-root"] = X["stalk-root"].fillna("?")
    df["stalk-root"] = df["stalk-root"].fillna("?")
    return X, df


def drop_irrelevant_features(X, df, features_to_drop=None):
    if features_to_drop is None:
        features_to_drop = ["veil-type"]
    X = X.drop(columns=features_to_drop)
    df = df.drop(columns=features_to_drop)
    return X, df


def chi2_feature_selection(df, target_col="poisonous", alpha=0.05):
    X = df.drop(columns=[target_col])
    values = {}
    for col in X.columns:
        contingency_table = pd.crosstab(df[col], df[target_col])
        chi2, p, _, _ = scipy.stats.chi2_contingency(contingency_table)
        values[col] = p
    return {k: p for k, p in values.items() if p < alpha}


def cramers_corrected_stat(confusion_matrix):
    chi2, _, _, _ = scipy.stats.chi2_contingency(confusion_matrix)
    n = confusion_matrix.sum().sum()
    phi2 = chi2 / n
    r, k = confusion_matrix.shape
    phi2corr = max(0, phi2 - ((k - 1) * (r - 1)) / (n - 1))
    rcorr = r - ((r - 1) ** 2) / (n - 1)
    kcorr = k - ((k - 1) ** 2) / (n - 1)
    denominator = min(kcorr - 1, rcorr - 1)
    if denominator <= 0:
        return np.nan
    return np.sqrt(phi2corr / denominator)


def calculate_cramers_v_matrix(df):
    cols = df.columns
    corr_matrix = np.zeros((len(cols), len(cols)))
    for col1, col2 in itertools.combinations(cols, 2):
        table = pd.crosstab(df[col1], df[col2])
        stat = cramers_corrected_stat(table)
        i, j = cols.get_loc(col1), cols.get_loc(col2)
        corr_matrix[i, j] = stat
        corr_matrix[j, i] = stat
    return pd.DataFrame(corr_matrix, index=cols, columns=cols)


def PCA_analysis(X_train, X_test):
    pca = PCA(n_components=2)
    X_train = pca.fit_transform(X_train)
    X_test = pca.transform(X_test)
    joblib.dump(pca, "project/ML/saved_objects/pca.pkl")
    return X_train, X_test


def preprocess_input():
    X, y, df_initial = load_mushroom_data()
    X, df_initial = handle_missing_values(X, df_initial)
    res_chi2_test = chi2_feature_selection(df_initial)
    X, df_initial = drop_irrelevant_features(X, df_initial)
    res_cramers_v = calculate_cramers_v_matrix(df_initial)

    column_order = X.columns.tolist()
    joblib.dump(column_order, "project/ML/saved_objects/column_order.pkl")
    

    # Pour la target
    target_encoder = LabelEncoder()
    y_LabelEncoded = target_encoder.fit_transform(y)
    
    joblib.dump(target_encoder, "project/ML/saved_objects/target_encoder.pkl")
    
    # Appliquer One-Hot Encoding uniquement sur les features
    X_oneHotEncoded = pd.get_dummies(
        X, columns=X.columns, drop_first=False, dtype=int
    )
    joblib.dump(X_oneHotEncoded.columns.tolist(), "project/ML/saved_objects/onehot_columns.pkl")
    
    # Reconstruire le dataframe complet avec la target à la fin
    df_final = pd.concat([X_oneHotEncoded, pd.Series(y_LabelEncoded, name=df_initial.columns[-1])], axis=1)

    # Standardisation des données
    sc = StandardScaler()
    X_encoded_normalized = sc.fit_transform(X_oneHotEncoded)
    joblib.dump(sc, "project/ML/saved_objects/scaler.pkl")
    
    # Diviser les données (train data and test data)
    X_train, X_test, y_train, y_test = train_test_split(
        X_encoded_normalized, y_LabelEncoded, test_size=0.2, random_state=0
    )

    # Appliquer PCA
    X_train, X_test = PCA_analysis(X_train, X_test)

    return df_final, X_train, X_test, y_train, y_test
