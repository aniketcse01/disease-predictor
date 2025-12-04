# Accounts/urls.py
from django.urls import path
from .views import RegisterView, login_view, me, DoctorListView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", login_view, name="login"),
    path("me/", me, name="me"),

    # Doctors list endpoint (GET)
    # Example: /api/accounts/doctors/?specialization=Radiologist
    path("doctors/", DoctorListView.as_view(), name="doctor-list"),
]
