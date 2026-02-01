from django.db import models

# 1. Category must be defined first
class Category(models.Model):
    name = models.CharField(max_length=255)
    # Slug is a URL-friendly name (e.g., "smart-phones")
    slug = models.SlugField(unique=True, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

# 2. Product is defined second
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    # This links the Product to the Category above
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True, blank=True)
    
    # The image field you requested
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return self.name