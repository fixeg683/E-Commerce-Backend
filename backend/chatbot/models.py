from django.db import models
from django.conf import settings

class ChatInteraction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    query = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)