from django.urls import path
from .views import register_user

urlpatterns = [
    # The 'api/' part is already handled in config/urls.py
    # So this just needs to be 'register/'
    path('register/', register_user, name='register'),
]