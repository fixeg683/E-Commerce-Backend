from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    
    # You can add more fields here if needed (e.g., phone_number)
    
    def __str__(self):
        return self.username