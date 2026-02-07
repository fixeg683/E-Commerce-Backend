from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product, Order, OrderItem

# --- User Serializer ---
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

# --- Category Serializer ---
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

# --- Product Serializer ---
class ProductSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(source='category', read_only=True)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), 
        write_only=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 
            'stock', 'category', 'category_details', 
            'image', # Added this field
            'created_at'
        ]

# --- Order Serializers ---
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price', 'created_at', 'items']
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user 
        
        order = Order.objects.create(user=user, **validated_data)
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
            
        return order