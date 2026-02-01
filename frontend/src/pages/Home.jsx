import { useEffect, useState } from 'react';
import apiClient, { endpoints } from '../api/client';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // 1. Initialize as an empty array to prevent crashes before data loads
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get(endpoints.products)
      .then(res => {
        // 2. SAFETY CHECK: Handle Django Pagination vs Plain Array
        let data = res.data;
        
        // If it's an object with a 'results' key, use that.
        if (!Array.isArray(data) && data.results) {
           data = data.results;
        }

        // If it's still not an array (e.g. error object), force it to empty
        if (!Array.isArray(data)) {
           console.error("API Error: Expected array but got:", res.data);
           data = []; 
        }

        setProducts(data);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load products. Ensure backend is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-20">Loading products...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      {error && <div className="p-4 bg-red-100 text-red-700 mb-6 rounded">{error}</div>}
      
      {products.length === 0 && !error ? (
        <p className="text-gray-500">No products found. (Try adding some in the Admin panel!)</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}