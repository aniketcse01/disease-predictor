from django.urls import path
from . import views

urlpatterns = [
    path("insertpd/", views.insertpd, name="insertpd"),
    path("train/", views.train, name="train"),
    path("predict/", views.predict, name="predict"),
]
