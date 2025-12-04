from django.urls import path
from . import views

urlpatterns = [
    path("", views.api_root, name="api-root"),
    path("insertpd/", views.insertpd, name="insertpd"),
    path("train/", views.train, name="train"),
    path("predict/", views.predict, name="predict"),
    path("symptoms/", views.symptom_list, name="symptom-list"),
    path("scores/", views.model_scores, name="model-scores"),
    path("subsymptoms/", views.subsymptoms, name="subsymptoms"),
]
