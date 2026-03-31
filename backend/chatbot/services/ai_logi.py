import openai
import json
from django.conf import settings
from store.models import Order

def get_order_status(order_id):
    """Retrieves order status from the PostgreSQL database."""
    try:
        order = Order.objects.get(id=order_id)
        return {
            "order_id": order.id,
            "status": order.status,
            "delivery_date": str(order.updated_at.date()),
            "total": float(order.total_price)
        }
    except Order.DoesNotExist:
        return {"error": "Order ID not found."}

def get_ai_response(user_message, product_context, user_id=None):
    client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

    # Define the tool for OpenAI
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_order_status",
                "description": "Get the status and details of a specific customer order",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "order_id": {
                            "type": "string",
                            "description": "The numeric ID of the order, e.g., '101'",
                        },
                    },
                    "required": ["order_id"],
                },
            }
        }
    ]

    messages = [
        {"role": "system", "content": f"You are a store assistant. Inventory context: {product_context}"},
        {"role": "user", "content": user_message}
    ]

    # First request: Ask AI what to do
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    # Second request: If AI wants to call a function, execute it
    if tool_calls:
        messages.append(response_message)
        for tool_call in tool_calls:
            if tool_call.function.name == "get_order_status":
                function_args = json.loads(tool_call.function.arguments)
                function_response = get_order_status(order_id=function_args.get("order_id"))
                
                messages.append({
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": "get_order_status",
                    "content": json.dumps(function_response),
                })
        
        # Get final response from AI using the database data
        final_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
        )
        return final_response.choices[0].message.content

    return response_message.content