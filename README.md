Disease Predictor

Project: Disease Prediction Web Application (Final Year Major Project)
Team Lead: Aniket Kr. Pandey + 2 team members
Development Status: Backend completed (ready/demo-backend branch)

Project Overview

Disease Predictor is a web-based application designed to help users identify possible diseases based on selected symptoms. During experimentation with multiple machine learning algorithms, Logistic Regression was found to produce the most reliable performance on our labeled dataset.

The application serves as a basic health guidance tool, allowing users to input symptoms and receive a predicted disease that may help them decide on next steps.

⚠️ Disclaimer: This system is for educational and informational purposes only and should not be considered a replacement for professional medical consultation or diagnosis.

Technology Stack

Backend: Django REST Framework, PostgreSQL

Machine Learning: scikit-learn (Logistic Regression; previously tested SVM)

Model Files: model.pkl, columns.pkl, label_encoder.pkl

Frontend: React.js

Key Features

Quick Predictions: Disease results generated instantly based on symptom input.

User-Friendly Design: Symptom selection requires no medical expertise.

Privacy Focused: Personal health data is not stored; predictions are not logged.

Anonymous Usage: Users can access predictions without exposing personal identity (except for account-based features).

Admin Controls: Admin users can manage datasets and retrain models through the interface.

Accessibility: Simple UI with clear instructions for all users.

Frontend Details

The frontend is developed using React.js, optimized for responsiveness and ease of use.

Available Functionalities

User registration and secure login

Symptom selection via searchable multi-select UI

Real-time disease prediction results

Admin-only options for model retraining and data upload

Mobile and desktop friendly layout

Frontend Workflow

Authentication
Users authenticate via token-based login. Tokens are securely stored and sent with API requests.

Symptom Selection
Users select symptoms which are sent as a JSON payload to the backend endpoint.

Prediction Output
The backend returns a predicted disease, which is displayed instantly.

Admin Tools
Admins can initiate model training and upload CSV data via the UI.

Running Frontend Locally
cd frontend
npm install
npm start


The application will start at:
👉 http://localhost:3000

Make sure the backend API URL is correctly set in the frontend configuration or .env file.

Application Capabilities

User registration and token-based login (DRF Token Authentication)

Model training using Logistic Regression from Training.csv

Disease prediction from symptom input

Optional CSV-based patient data insertion (admin only)

API Endpoints

POST /api/accounts/register/ — Register new user

POST /api/accounts/login/ — User login

GET /api/accounts/me/ — Get logged-in user info

GET /api/disease/train/ — Train ML model (returns accuracy)

POST /api/disease/predict/ — Predict disease from symptoms
Request example:

{
  "symptoms": ["itching", "skin_rash", "chills"]
}


POST /api/disease/insertpd/ — Upload CSV patient data (admin access)

Backend Setup Guide

Clone the repository

git clone https://github.com/aniketcse01/disease-predictor.git
cd disease-predictor


Install dependencies

pip install -r requirements.txt


Configure database
Update PostgreSQL credentials in settings.py.

Run migrations

python manage.py migrate


Start the server

python manage.py runserver


Train the ML model
Access:

GET /api/disease/train/

Usage as a Consultation Tool

Select symptoms and receive a predicted disease instantly.

Use the output as preliminary guidance only.

Always consult a medical professional for serious conditions.

Contribution Guidelines

Contributions are encouraged.
Feel free to open issues, suggest improvements, or submit pull requests.

License: MIT
Project Maintainer: Aniket Kr. Pandey
