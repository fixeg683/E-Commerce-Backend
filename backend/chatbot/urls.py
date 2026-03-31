from django.urls import path
from .views import chat_with_ai

urlpatterns = [
    # Do NOT add 'api/chatbot/' here; it's already in core/urls.py
    path('message/', chat_with_ai, name='chat_message'),
]