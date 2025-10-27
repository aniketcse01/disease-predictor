from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def index(request):
    return HttpResponse("Disease Predictor Backend running — use /admin or /api endpoints")

urlpatterns = [
    path("", index),
    path("admin/", admin.site.urls),
    path("api/accounts/", include("Accounts.urls")),
    path("api/disease/", include("DiseasePredictor.urls")),   # << add this line
]
