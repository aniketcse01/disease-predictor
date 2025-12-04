from django.db import models

class SymptomDisease(models.Model):
    # store raw training rows (columns may be many symptom columns + 'prognosis')
    # We'll store the full CSV row as JSON-like text if needed, but keep some helpful fields.
    prognosis = models.CharField(max_length=255)
    raw = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.prognosis}"
