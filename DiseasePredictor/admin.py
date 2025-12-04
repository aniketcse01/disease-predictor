from django.contrib import admin
from .models import SymptomDisease

@admin.register(SymptomDisease)
class SymptomDiseaseAdmin(admin.ModelAdmin):
    list_display = ("prognosis",)
