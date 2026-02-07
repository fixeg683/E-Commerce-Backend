import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, getCartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. <Link to="/">Go shopping</Link></p>
            ) : (
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #555', textAlign: 'left' }}>
                                <th style={{ padding: '10px' }}>Product</th>
                                <th style={{ padding: '10px' }}>Price</th>
                                <th style={{ padding: '10px' }}>Qty</th>
                                <th style={{ padding: '10px' }}>Total</th>
                                <th style={{ padding: '10px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #444' }}>
                                    <td style={{ padding: '10px' }}>{item.name}</td>
                                    <td style={{ padding: '10px' }}>${item.price}</td>
                                    <td style={{ padding: '10px' }}>{item.quantity}</td>
                                    <td style={{ padding: '10px' }}>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td style={{ padding: '10px' }}>
                                        <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ textAlign: 'right' }}>
                        <h3>Total: ${getCartTotal()}</h3>
                        <button 
                            onClick={() => navigate('/checkout')} 
                            style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;