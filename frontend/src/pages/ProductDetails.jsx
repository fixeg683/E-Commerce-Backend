import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient, { endpoints } from '../api/client';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    apiClient.get(endpoints.product(id))
      .then(res => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="text-center mt-20">Loading details...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-200 h-96 flex items-center justify-center">
           {product.image ? <img src={product.image} className="h-full w-full object-cover"/> : "No Image"}
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between mb-8">
            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}