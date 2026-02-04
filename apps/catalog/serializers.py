from rest_framework import serializers
from .models import Product, Category  # <--- Ensure Category is imported here

# --- 1. Add this missing Class ---
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  # Or list fields like ['id', 'name', 'slug']

# --- 2. Your existing ProductSerializer ---
class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'category',
            'description',
            'price',
            'image',
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None