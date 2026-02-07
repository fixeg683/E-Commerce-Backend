import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for M-Pesa
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMpesaPayment = async () => {
        // 1. Validation Checks
        if (!token) {
            alert("You must be logged in to place an order.");
            navigate('/login');
            return;
        }

        if (!phoneNumber) {
            alert("Please enter a M-Pesa phone number (e.g., 2547...)");
            return;
        }

        setLoading(true);

        try {
            // 2. Configure Headers with Token (Fixes 401 Error)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // 3. Trigger M-Pesa STK Push
            const response = await api.post('mpesa/pay/', {
                phone_number: phoneNumber,
                amount: getCartTotal()
            }, config); // Pass config here

            console.log("M-Pesa Response:", response.data);
            
            // Check for Success (ResponseCode "0" is standard Safaricom success)
            if (response.data.ResponseCode === "0" || response.data.CustomerMessage) {
                alert("STK Push sent! Please check your phone to enter PIN.");
                
                // 4. Save the Order in Backend (Attach token here too)
                const orderData = {
                    total_price: getCartTotal(),
                    items: cart.map(item => ({
                        product: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                };
                
                await api.post('orders/', orderData, config);
                
                // 5. Clear Cart and Redirect
                clearCart();
                navigate('/');
            } else {
                alert("Payment request failed. Please try again.");
            }

        } catch (error) {
            console.error("Payment Error", error);
            
            // Handle Specific 401 Unauthorized Error
            if (error.response && error.response.status === 401) {
                alert("Session expired. Please login again.");
                navigate('/login');
            } else {
                alert("Failed to initiate payment. Ensure phone number starts with 254.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
            <h2>Checkout</h2>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
                Total Amount: <strong>Ksh {getCartTotal()}</strong>
            </p>

            <div style={{ textAlign: 'left', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <h3 style={{ marginTop: 0, color: '#333' }}>Pay with M-Pesa</h3>
                
                <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                    Phone Number (2547...):
                </label>
                <input 
                    type="text" 
                    placeholder="254712345678" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        fontSize: '16px', 
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        marginBottom: '15px',
                        boxSizing: 'border-box'
                    }}
                />

                <button 
                    onClick={handleMpesaPayment}
                    disabled={loading}
                    style={{ 
                        width: '100%',
                        padding: '15px', 
                        background: loading ? '#ccc' : '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: loading ? 'not-allowed' : 'pointer', 
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? "Processing..." : "Confirm & Pay"}
                </button>
            </div>
        </div>
    );
};

export default Checkout;