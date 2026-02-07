import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);
    const { token } = useContext(AuthContext); // Check if logged in
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!token) {
            alert("You must be logged in to place an order.");
            navigate('/login');
            return;
        }

        const orderData = {
            total_price: getCartTotal(),
            items: cart.map(item => ({
                product: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            await api.post('orders/', orderData);
            alert("Order placed successfully!");
            clearCart();
            navigate('/');
        } catch (error) {
            console.error("Order failed", error);
            alert("Failed to place order.");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
            <h2>Checkout</h2>
            <p>Total Amount: <strong>${getCartTotal()}</strong></p>
            <button 
                onClick={handlePlaceOrder}
                style={{ marginTop: '20px', padding: '15px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}
            >
                Confirm & Pay
            </button>
        </div>
    );
};

export default Checkout;