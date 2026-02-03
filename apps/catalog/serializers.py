from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    # Read-only nested serializer (shows full category details in GET requests)
    category = CategorySerializer(read_only=True)
    
    # Write-only field (allows sending "category_id": 1 in POST/PUT requests)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

    class Meta:
        model = Product
        fields = "__all__"  # Automatically includes 'image'