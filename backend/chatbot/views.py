from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .services.ai_logic import get_ai_response
from store.models import Product

@api_view(['POST'])
@permission_classes([AllowAny])
def chat_with_ai(request):
    user_query = request.data.get("message")
    
    # Identify the user if they are logged in for personalized help
    user_id = request.user.id if request.user.is_authenticated else None

    # Fetch live product data from PostgreSQL
    products = Product.objects.all()[:10]
    product_context = "\n".join([f"{p.name} - Ksh {p.price}" for p in products])

    try:
        reply = get_ai_response(user_query, product_context, user_id)
        return JsonResponse({"status": "success", "reply": reply})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)