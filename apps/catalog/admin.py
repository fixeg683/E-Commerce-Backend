from django.contrib import admin
from .models import Product, Category  # <--- Now this import will work!

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'is_active', 'category')
    list_filter = ('is_active', 'category')