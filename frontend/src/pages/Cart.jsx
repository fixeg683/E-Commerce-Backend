import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0) return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      <Link to="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price} x {item.qty}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50 flex justify-between items-center">
          <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
          <Link to="/checkout" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}