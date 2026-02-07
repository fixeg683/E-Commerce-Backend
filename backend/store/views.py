from rest_framework import viewsets, filters, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from .models import Product, Category, Order
from .serializers import ProductSerializer, CategorySerializer, UserSerializer, OrderSerializer
from .mpesa_utils import MpesaClient  # Import the utility class

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit objects.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

# --- Auth Views ---
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

# --- Store Views ---
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly] 

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']

# --- Order View ---
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure users can only see their own orders
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically attach the logged-in user to the order
        serializer.save(user=self.request.user)

# --- M-Pesa Payment View ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mpesa_stk_push(request):
    """
    Triggers M-Pesa STK Push manually using requests.
    """
    phone_number = request.data.get('phone_number')
    amount = request.data.get('amount')

    if not phone_number or not amount:
        return Response({'error': 'Phone number and amount are required'}, status=400)

    # Initialize Client
    client = MpesaClient()
    
    # Use a dummy callback URL for localhost testing (M-Pesa requires a valid public URL)
    callback_url = "https://sandbox.safaricom.co.ke/mpesa/" 

    response = client.stk_push(
        phone_number=phone_number,
        amount=amount,
        callback_url=callback_url
    )

    if 'error' in response:
        return Response(response, status=500)
    
    return Response(response)