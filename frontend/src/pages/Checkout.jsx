import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient, { endpoints } from '../api/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleCheckout = async () => {
    if (!user) return navigate('/login');
    setStatus('loading');

    try {
      // Mocking the order payload based on standard ecommerce structure
      const payload = {
        items: cart.map(item => ({ product_id: item.id, quantity: item.qty })),
        total_amount: total
      };
      
      await apiClient.post(endpoints.orders, payload);
      clearCart();
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className="text-center mt-20 text-green-600">
      <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>{item.name} x {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        {status === 'error' && <p className="text-red-500 mb-4">Checkout failed. Try again.</p>}
        
        <button 
          onClick={handleCheckout}
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {status === 'loading' ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}