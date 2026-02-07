// ... inside return statement ...
<div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
    <h2>Checkout</h2>
    {/* CHANGED HERE */}
    <p>Total Amount: <strong>Ksh {getCartTotal()}</strong></p>
    
    <button 
        onClick={handlePlaceOrder}
        style={{ marginTop: '20px', padding: '15px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}
    >
        Confirm & Pay via M-Pesa
    </button>
</div>
// ...