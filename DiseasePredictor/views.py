import os
import json
import pandas as pd
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from joblib import dump, load
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from .models import SymptomDisease

BASE_DIR = settings.BASE_DIR
APP_DIR = os.path.join(BASE_DIR, "DiseasePredictor")
TRAIN_CSV_PATH = os.path.join(APP_DIR, "Training.csv")
MODEL_PATH = os.path.join(APP_DIR, "model.pkl")
COLS_PATH = os.path.join(APP_DIR, "columns.pkl")
LE_PATH = os.path.join(APP_DIR, "label_encoder.pkl")


@api_view(["POST"])
@permission_classes([AllowAny])
def insertpd(request):
    """
    Read Training.csv and insert rows into SymptomDisease table.
    Use when you want the CSV data in DB (optional).
    """
    if not os.path.exists(TRAIN_CSV_PATH):
        return JsonResponse({"detail": "Training.csv not found in DiseasePredictor folder."}, status=400)

    try:
        df = pd.read_csv(TRAIN_CSV_PATH)
    except Exception as e:
        return JsonResponse({"detail": f"Failed to read CSV: {str(e)}"}, status=500)

    inserted = 0
    # For safety remove existing rows to avoid duplicates (optional)
    SymptomDisease.objects.all().delete()

    for _, row in df.iterrows():
        record = {"prognosis": row.get("prognosis", None)}
        # store remaining columns as dict
        raw = {c: row[c] for c in df.columns if c != "prognosis"}
        SymptomDisease.objects.create(prognosis=record["prognosis"], raw=raw)
        inserted += 1

    return JsonResponse({"inserted": inserted})


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def train(request):
    """
    Train an SVM classifier using Training.csv.
    Saves model.pkl, columns.pkl (feature column order), and label_encoder.pkl.
    """
    if not os.path.exists(TRAIN_CSV_PATH):
        return JsonResponse({"detail": "Training.csv not found in DiseasePredictor folder."}, status=400)

    try:
        df = pd.read_csv(TRAIN_CSV_PATH)
    except Exception as e:
        return JsonResponse({"detail": f"Failed to read CSV: {str(e)}"}, status=500)

    if "prognosis" not in df.columns:
        return JsonResponse({"detail": "CSV must contain a 'prognosis' column."}, status=400)

    # Features are all columns except 'prognosis'
    feature_cols = [c for c in df.columns if c != "prognosis"]
    X = df[feature_cols]
    y = df["prognosis"]

    # If features are strings like 'Yes'/'No', convert to 0/1
    # We'll try to coerce to numeric where possible
    try:
        X = X.apply(pd.to_numeric, errors="ignore")
        # Convert any Yes/No or True/False text to 1/0
        X = X.replace({"yes": 1, "no": 0, "Yes": 1, "No": 0, True: 1, False: 0})
    except Exception:
        pass

    # If any non-numeric columns remain, try one-hot encoding (rare for this dataset)
    non_numeric = X.select_dtypes(include=["object"]).columns.tolist()
    if non_numeric:
        X = pd.get_dummies(X, columns=non_numeric)

    # Encode labels
    le = LabelEncoder()
    y_enc = le.fit_transform(y)

    # Train/test split (not strictly necessary for final model but helps check accuracy)
    X_train, X_test, y_train, y_test = train_test_split(X, y_enc, test_size=0.2, random_state=42)

    # Train SVM with probability=True to get probabilities
    clf = SVC(probability=True, kernel="rbf")
    clf.fit(X_train, y_train)

    # optional: evaluate
    score = clf.score(X_test, y_test)

    # Save model and helpers
    dump(clf, MODEL_PATH)
    dump(list(X.columns), COLS_PATH)
    dump(le, LE_PATH)

    return JsonResponse({"status": "trained", "accuracy": float(score)})


@api_view(["POST"])
@permission_classes([AllowAny])
def predict(request):
    """
    Accepts JSON:
    {
      "symptoms": ["fever","cough", ...]   # list of symptom column names that are present
    }
    Returns top predictions with probabilities.
    """
    data = request.data
    symptoms = data.get("symptoms", None)
    if symptoms is None:
        return JsonResponse({"detail": "Provide 'symptoms' list in request body."}, status=400)
    if not os.path.exists(MODEL_PATH) or not os.path.exists(COLS_PATH) or not os.path.exists(LE_PATH):
        return JsonResponse({"detail": "Model not found. Run /api/disease/train/ first."}, status=400)

    # load artifacts
    clf = load(MODEL_PATH)
    columns = load(COLS_PATH)  # list of expected feature column names
    le = load(LE_PATH)

    # Build input vector as DataFrame (1 row)
    # columns are expected numeric features (0/1). We'll set 1 for provided symptom names.
    import numpy as np
    import pandas as pd

    row = {c: 0 for c in columns}
    # symptoms provided may not exactly match columns (case differences) - normalize
    s_norm = set([s.strip() for s in symptoms])
    # match columns in case-insensitive way
    col_map = {c.lower(): c for c in columns}
    for s in s_norm:
        key = s.lower()
        if key in col_map:
            row[col_map[key]] = 1
        # also try replacing spaces/underscores
        elif key.replace(" ", "_") in col_map:
            row[col_map[key.replace(" ", "_")]] = 1

    X_in = pd.DataFrame([row], columns=columns)

    # If any columns are non-numeric or missing, ensure alignment
    # Predict probabilities
    probs = clf.predict_proba(X_in)[0]  # array length = n_classes
    top_indices = probs.argsort()[::-1][:5]  # top 5 predictions

    results = []
    for idx in top_indices:
        label = le.inverse_transform([idx])[0]
        results.append({"disease": label, "probability": float(probs[idx])})

    return JsonResponse({"predictions": results})
