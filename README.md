# Disease Predictor

**Project:** Disease Prediction Web Application (Final Year Major Project)  
**Team Lead:** Aniket Kr. Pandey + 2 team members  
**Development Status:** Backend completed (`ready/demo-backend` branch)

---

## Project Overview

Disease Predictor is a web-based application designed to help users identify possible diseases based on the symptoms they select. After evaluating multiple machine learning models, **Logistic Regression** was found to deliver the most accurate and consistent results on our labeled dataset.

This application acts as a basic health guidance tool, enabling users to enter symptoms and receive a predicted disease to help them decide their next steps.

> ⚠️ Disclaimer: This application is intended for educational and informational purposes only and should not be used as a replacement for professional medical advice, diagnosis, or treatment.

### Technology Stack

- **Backend:** Django REST Framework, PostgreSQL  
- **Machine Learning:** scikit-learn (Logistic Regression; earlier tested SVM)  
- **Model Files:** `model.pkl`, `columns.pkl`, `label_encoder.pkl`  
- **Frontend:** React.js  

---

## Key Features

- Quick and accurate disease prediction
- Easy symptom selection without medical knowledge
- No storage of personal health predictions
- Optional anonymous usage
- Admin panel for dataset management and model retraining
- Responsive design for desktop and mobile

---

## Frontend

The frontend is built using **React.js**, focusing on simplicity, usability, and responsiveness.

### Functionalities

- User registration and login
- Symptom selection using a multi-select interface
- Instant disease prediction
- Admin access for model training and CSV uploads
- Clean and responsive UI

### How It Works

1. **Authentication**  
   Token-based authentication is used. Tokens are securely stored and attached to API requests.

2. **Symptom Selection**  
   Users choose symptoms which are sent as a JSON request to the backend.

3. **Prediction Output**  
   The backend returns the predicted disease immediately.

4. **Admin Utilities**  
   Admin users can retrain the model and upload datasets through the interface.

### Running Frontend Locally

```bash
cd frontend
npm install
npm start
