import os
import joblib
from ML.preprocessing import preprocess_input
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import  make_scorer, recall_score
from sklearn.model_selection import cross_val_score
import optuna

def objective(trial):
    df, X_train, X_test, y_train, y_test = preprocess_input()

    n_neighbors = trial.suggest_int('n_neighbors', 1, 30)
    weights = trial.suggest_categorical('weights', ['uniform', 'distance'])
    algorithm = trial.suggest_categorical('algorithm', ['auto', 'ball_tree', 'kd_tree', 'brute'])
    leaf_size = trial.suggest_int('leaf_size', 10, 100)
    p = trial.suggest_int('p', 1, 2) 

    model = KNeighborsClassifier(
        n_neighbors=n_neighbors,
        weights=weights,
        algorithm=algorithm,
        leaf_size=leaf_size,
        p=p
    )

    # Cross-validation avec scoring basé sur le recall
    score = cross_val_score(model, X_train, y_train, cv=5,
                            scoring=make_scorer(recall_score)).mean()
    print(score)
    return score

def train_save_model():
    df, X_train, X_test, y_train, y_test = preprocess_input()

    study = optuna.create_study(direction='maximize')
    study.optimize(lambda trial: objective(trial), n_trials=50)

    best_knn = KNeighborsClassifier(**study.best_params)
    best_knn.fit(X_train, y_train)
    
    joblib.dump(best_knn, "project/ML/KNN_model_Optuna.pkl")
