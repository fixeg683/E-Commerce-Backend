# 🛒 Full-Stack E-Commerce with M-Pesa Integration

A complete E-Commerce application featuring a **Django REST Framework** backend and a **React (Vite)** frontend. This project includes secure JWT authentication, product management, a shopping cart, and fully functional **M-Pesa STK Push payment integration**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![React](https://img.shields.io/badge/react-18+-61DAFB.svg)
![Django](https://img.shields.io/badge/django-5.0+-092E20.svg)

## 🚀 Features

- **User Authentication:** Secure Login & Registration using JWT (JSON Web Tokens).
- **Product Catalog:** Browse products with search and category filtering.
- **Shopping Cart:** Real-time cart management using React Context API.
- **Order Management:** Place orders and view order history.
- **M-Pesa Payment:** Integrated Daraja API (Sandbox) for STK Push payments.
- **API Documentation:** Swagger/OpenAPI auto-generated docs.
- **Deployment Ready:** Configured for Render (Gunicorn + Whitenoise).

---

## 🛠️ Tech Stack

### **Backend**
- **Framework:** Django & Django REST Framework (DRF)
- **Database:** PostgreSQL
- **Authentication:** SimpleJWT
- **Payment:** Native Python requests for Safaricom Daraja API
- **Deployment:** Gunicorn, Whitenoise, dj-database-url

### **Frontend**
- **Framework:** React.js (Vite)
- **Styling:** CSS Modules / Standard CSS
- **State Management:** React Context API
- **HTTP Client:** Axios (with Interceptors)

---

## ⚙️ Local Setup Guide

### 1. Backend Setup (Django)

Navigate to the backend folder:
```bash
cd backend

```

Create and activate a virtual environment:

```bash
# Windows
python -m venv venv
source venv/Scripts/activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

```

Install dependencies:

```bash
pip install -r requirements.txt

```

**Configure Environment Variables:**
Create a `.env` file (or just use `settings.py` for local dev) and ensure these settings are correct:

```python
# backend/core/settings.py
DEBUG = True
SECRET_KEY = 'your-secret-key'
# M-Pesa Sandbox Credentials
MPESA_CONSUMER_KEY = 'YOUR_KEY'
MPESA_CONSUMER_SECRET = 'YOUR_SECRET'
MPESA_PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'

```

Run Migrations and Start Server:

```bash
python manage.py migrate
python manage.py createsuperuser # Create admin account
python manage.py runserver

```

*Backend runs at: `http://127.0.0.1:8000/*`

### 2. Frontend Setup (React)

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend

```

Install dependencies:

```bash
npm install

```

Start the development server:

```bash
npm run dev

```

*Frontend runs at: `http://localhost:5173/*`

---

## 💳 Testing M-Pesa Payments (Sandbox)

1. **Login** to the application.
2. Add items to your cart and proceed to **Checkout**.
3. Enter a test phone number:
* Format: `2547...` (e.g., `254700000000`).


4. Click **Pay with M-Pesa**.
5. **Check the Backend Terminal:** Since this is a sandbox, the success response will appear in your Django terminal logs.
6. If using a real phone number in Sandbox mode, you may receive a pop-up on your phone (if Safaricom Sandbox is active/whitelisted).

---

## 📚 API Documentation

Once the backend is running, you can access the full API documentation at:

* **Swagger UI:** [http://127.0.0.1:8000/docs/](https://www.google.com/search?q=http://127.0.0.1:8000/docs/)
* **Redoc:** [http://127.0.0.1:8000/redoc/](https://www.google.com/search?q=http://127.0.0.1:8000/redoc/)

### Key Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/token/` | Get Access & Refresh Token |
| `GET` | `/api/products/` | List all products |
| `POST` | `/api/mpesa/pay/` | Initiate STK Push Payment |
| `GET` | `/api/orders/` | View User Orders |

---

## 🌍 Deployment (Render)

### Backend (Web Service)

1. **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
2. **Start Command:** `gunicorn core.wsgi:application`
3. **Environment Variables:** Set `SECRET_KEY`, `PYTHON_VERSION`, `MPESA_CONSUMER_KEY`, etc.

### Frontend (Static Site)

1. **Build Command:** `npm install && npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variable:** `VITE_API_URL` = `https://your-backend.onrender.com/api/`

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```

```