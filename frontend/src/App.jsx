import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart'; // Import Cart Page
import Checkout from './pages/Checkout'; // Import Checkout Page

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap App in CartContext */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} /> {/* Add Route */}
            <Route path="/checkout" element={<Checkout />} /> {/* Add Route */}
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;