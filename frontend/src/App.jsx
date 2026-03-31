import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
// Import the new ChatBot component
import ChatWindow from './components/ChatBot/ChatWindow';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

          {/* Adding the ChatWindow here ensures it stays 
            fixed on the screen across all routes. 
          */}
          <ChatWindow />
          
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;