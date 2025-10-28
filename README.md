# Disease Predictor

**Project:** Disease Prediction Application (Final year major project)  
**Team:** Aryan Rawtani + 2 members  
**Status:** Backend ready (branch `ready/demo-backend`)

---

## Overview
A web application that predicts likely diseases from symptom input using a trained SVM model. Backend built with **Django REST Framework** and **PostgreSQL**. Model training and inference handled with **scikit-learn**.

## Features (Backend)
- User registration & token-based authentication (DRF TokenAuth)
- Train SVM model from `Training.csv` and save artifacts (`model.pkl`, `columns.pkl`, `label_encoder.pkl`)
- Endpoints:
  - `POST /api/accounts/register/` → register user (returns token)
  - `POST /api/accounts/login/` → login (returns token)
  - `GET  /api/accounts/me/` → current user (token required)
  - `GET  /api/disease/train/` → train model (returns accuracy)
  - `POST /api/disease/predict/` → predict disease; body example: `{"symptoms":["itching","skin_rash","chills"]}`
  - `POST /api/disease/insertpd/` → (optional) insert CSV records into DB for admin view

## Setup (local)
1. Clone:
   ```bash
   git clone https://github.com/aryanraw02/disease-predictor.git
   cd disease-predictor
