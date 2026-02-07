# Full-Stack E-Commerce Application (Django + React)

A modern, full-stack e-commerce platform built with **Django (Backend)** and **React (Frontend)**. This application supports physical and digital products, user authentication, a shopping cart, and an admin dashboard for inventory management.

## 🚀 Features

* **User Authentication:** Secure Signup and Login using JWT (JSON Web Tokens).
* **Product Catalog:** Browse products with images, descriptions, and prices in **Ksh**.
* **Digital Products:** Support for uploading and downloading executable (`.exe`) files for specific products.
* **Shopping Cart:** Add, remove, and view items in a dynamic shopping cart.
* **Checkout System:** Place orders which are saved to the database linked to the specific user.
* **Admin Dashboard:** Restricted area for administrators to view and delete products.
* **Django Admin Panel:** Full backend control to upload images, files, and manage users/orders.
* **API Documentation:** Integrated Swagger UI for API testing and documentation.

## 🛠️ Tech Stack

**Backend:**

* Python 3.13+
* Django 5.x & Django Rest Framework (DRF)
* PostgreSQL (Database)
* Pillow (Image Processing)
* SimpleJWT (Authentication)

**Frontend:**

* React 18 (Vite)
* Axios (API Consumption)
* React Router DOM (Navigation)
* Context API (State Management)

---

## ⚙️ Prerequisites

Ensure you have the following installed on your system (Kali Linux/Ubuntu/Windows):

1. **Python 3.x**
2. **Node.js & npm** (via NVM recommended)
3. **PostgreSQL**

---

## 📥 Installation Guide

### 1. Database Setup (PostgreSQL)

Ensure your PostgreSQL service is running and creates a database.

```bash
# Start PostgreSQL service (Linux)
sudo systemctl start postgresql

# Enter Postgres prompt
sudo -u postgres psql

# Inside SQL prompt:
CREATE DATABASE ecommerce_db;
CREATE USER myuser WITH PASSWORD 'mypassword';
ALTER ROLE myuser SET client_encoding TO 'utf8';
ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO myuser;
\q

```

*(Make sure these credentials match your `backend/core/settings.py`)*.

---

### 2. Backend Setup (Django)

Navigate to the backend folder:

```bash
cd backend

```

Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

```

Install dependencies:

```bash
pip install django djangorestframework django-cors-headers psycopg2-binary Pillow django-filter drf-yasg djangorestframework-simplejwt

```

Run database migrations:

```bash
python manage.py makemigrations
python manage.py migrate

```

Create a Superuser (Admin):

```bash
python manage.py createsuperuser
# Follow prompts to set username and password

```

Start the Backend Server:

```bash
python manage.py runserver

```

*The backend will run at `http://127.0.0.1:8000/*`

---

### 3. Frontend Setup (React)

Open a **new terminal** and navigate to the frontend folder:

```bash
cd frontend

```

Install dependencies:

```bash
npm install
npm install axios react-router-dom

```

Start the Frontend Server:

```bash
npm run dev

```

*The frontend will typically run at `http://localhost:5173/*`

---

## 🖥️ Usage

### **1. Admin Configuration (First Step)**

1. Go to `http://127.0.0.1:8000/admin/` in your browser.
2. Login with the superuser account you created.
3. Under **Store**, click **Categories** and add a category (e.g., "Electronics").
4. Click **Products** and add a new product:
* Upload an **Image**.
* (Optional) Upload an **Executable file** (.exe).
* Set the **Price**.



### **2. Browsing the Store**

1. Go to `http://localhost:5173/`.
2. You will see the products displayed with prices in **Ksh**.
3. Click **"Add to Cart"**.

### **3. User Registration & Checkout**

1. Click **"Sign Up"** in the navbar to create a customer account.
2. Login with those credentials.
3. Go to your **Cart** and click **"Proceed to Checkout"**.
4. Confirm the order.

---

## 📚 API Documentation

The backend includes auto-generated Swagger documentation.

* **Swagger UI:** `http://127.0.0.1:8000/docs/`
* **Redoc:** `http://127.0.0.1:8000/redoc/`

---

## 🐛 Troubleshooting

**1. "Connection refused" to Database:**

* Check if Postgres is running: `sudo systemctl status postgresql`.
* Start it: `sudo systemctl start postgresql`.

**2. Images not showing:**

* Ensure `Pillow` is installed: `pip install Pillow`.
* Ensure `MEDIA_URL` and `MEDIA_ROOT` are set in `settings.py`.

**3. Frontend cannot connect to Backend (CORS Error):**

* Check `backend/core/settings.py` -> `CORS_ALLOWED_ORIGINS`.
* Ensure `http://localhost:5173` (or your current frontend port) is listed.

---

## 📜 License

This project is open-source and available for educational purposes.