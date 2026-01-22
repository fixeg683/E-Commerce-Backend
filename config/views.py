from django.http import JsonResponse

def root_view(request):
    return JsonResponse({
        "message": "Welcome to the E-Commerce API"
    })
