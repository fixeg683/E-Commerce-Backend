import requests
import json
import base64
from datetime import datetime
from django.conf import settings

class MpesaClient:
    def __init__(self):
        self.consumer_key = settings.MPESA_CONSUMER_KEY
        self.consumer_secret = settings.MPESA_CONSUMER_SECRET
        self.shortcode = settings.MPESA_SHORTCODE
        self.passkey = settings.MPESA_PASSKEY
        self.base_url = settings.MPESA_BASE_URL

    def get_access_token(self):
        """Generates an OAuth Access Token"""
        api_url = f"{self.base_url}/oauth/v1/generate?grant_type=client_credentials"
        
        try:
            response = requests.get(api_url, auth=(self.consumer_key, self.consumer_secret))
            response.raise_for_status()
            result = response.json()
            return result['access_token']
        except Exception as e:
            print(f"Error generating token: {e}")
            return None

    def get_password(self, timestamp):
        """Generates the base64 encoded password"""
        data_to_encode = f"{self.shortcode}{self.passkey}{timestamp}"
        encoded_string = base64.b64encode(data_to_encode.encode())
        return encoded_string.decode('utf-8')

    def stk_push(self, phone_number, amount, callback_url, reference="Ecommerce Payment", description="Payment"):
        """Initiates the STK Push"""
        token = self.get_access_token()
        if not token:
            return {"error": "Failed to get access token"}

        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password = self.get_password(timestamp)
        
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        # Format phone number: Remove leading + or 0, prefix with 254
        if phone_number.startswith('+'):
            phone_number = phone_number[1:]
        if phone_number.startswith('0'):
            phone_number = '254' + phone_number[1:]

        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            
            # --- FIX IS HERE ---
            "Amount": int(float(amount)), # Convert string "45.00" -> 45
            # -------------------
            
            "PartyA": phone_number,
            "PartyB": self.shortcode,
            "PhoneNumber": phone_number,
            "CallBackURL": callback_url,
            "AccountReference": reference,
            "TransactionDesc": description
        }

        api_url = f"{self.base_url}/mpesa/stkpush/v1/processrequest"
        
        try:
            response = requests.post(api_url, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            # Handle non-JSON responses (like HTML error pages from Safaricom)
            try:
                error_details = response.json()
            except:
                error_details = response.text
                
            return {"error": str(e), "details": error_details}