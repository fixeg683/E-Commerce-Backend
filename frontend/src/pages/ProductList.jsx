import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        api.get('products/')
            .then(res => setProducts(res.data.results))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={styles.pageContainer}>
            <div style={styles.contentWrapper}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Product Catalog</h2>
                
                {products.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888' }}>No products found. Login to Admin to add some!</p>
                ) : (
                    <div style={styles.grid}>
                        {products.map(product => (
                            <div key={product.id} style={styles.card}>
                                <div style={styles.imageContainer}>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} style={styles.productImage} />
                                    ) : (
                                        <div style={styles.imagePlaceholder}><span>No Image</span></div>
                                    )}
                                </div>

                                <div style={styles.cardBody}>
                                    <h3 style={styles.cardTitle}>{product.name}</h3>
                                    <p style={styles.cardDesc}>{product.description}</p>
                                    
                                    {/* DOWNLOAD BUTTON (Only shows if file exists) */}
                                    {product.executable_file && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <a 
                                                href={product.executable_file} 
                                                download 
                                                style={styles.downloadLink}
                                            >
                                                ⬇ Download .exe
                                            </a>
                                        </div>
                                    )}

                                    <div style={styles.footer}>
                                        <span style={styles.price}>${product.price}</span>
                                        <span style={styles.stock}>{product.stock} left</span>
                                    </div>
                                    <button 
                                        style={styles.buyButton}
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: { display: 'flex', justifyContent: 'center', padding: '40px 20px', minHeight: '100vh' },
    contentWrapper: { width: '100%', maxWidth: '1200px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' },
    card: { backgroundColor: '#333', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', border: '1px solid #444', display: 'flex', flexDirection: 'column' },
    imageContainer: { width: '100%', height: '200px', backgroundColor: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    productImage: { width: '100%', height: '100%', objectFit: 'cover' },
    imagePlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#2a2a2a' },
    cardBody: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
    cardTitle: { margin: '0 0 10px 0', fontSize: '1.2rem', color: '#fff' },
    cardDesc: { color: '#bbb', fontSize: '0.9rem', marginBottom: '20px', flexGrow: 1 },
    
    // NEW DOWNLOAD LINK STYLE
    downloadLink: {
        display: 'block',
        textAlign: 'center',
        padding: '8px',
        backgroundColor: '#444',
        color: '#4db6ac',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '0.9rem',
        border: '1px dashed #4db6ac'
    },

    footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    price: { fontSize: '1.4rem', fontWeight: 'bold', color: '#4caf50' },
    stock: { fontSize: '0.85rem', color: '#888' },
    buyButton: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};

export default ProductList;