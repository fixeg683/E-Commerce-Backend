from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from .filters import ProductFilter
from apps.common.pagination import DefaultPagination


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductViewSet(ModelViewSet):
    queryset = (
        Product.objects
        .select_related("category")
        .filter(is_active=True)
    )
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_class = ProductFilter
    ordering_fields = ["price", "created_at"]
    pagination_class = DefaultPagination

    def get_serializer_context(self):
        """
        Ensure request is available in serializer
        (required for absolute image URLs)
        """
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
