import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('products/').then(res => setProducts(res.data.results));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`products/${id}/`);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                alert("Failed to delete. You may not have permission.");
            }
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.dashboardCard}>
                <div style={styles.header}>
                    <h2>Inventory Management</h2>
                    {/* Placeholder for an Add button if you add that feature later */}
                    <button style={styles.addButton}>+ Add Product</button> 
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeaderRow}>
                            <th style={styles.th}>Product Name</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Stock</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} style={styles.tableRow}>
                                <td style={styles.td}>{p.name}</td>
                                <td style={styles.td}>${p.price}</td>
                                <td style={styles.td}>{p.stock}</td>
                                <td style={styles.td}>
                                    <button 
                                        onClick={() => handleDelete(p.id)} 
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                        No products found.
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '60px 20px', // Top padding clears the navbar
    },
    dashboardCard: {
        width: '100%',
        maxWidth: '900px',
        backgroundColor: '#333',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        border: '1px solid #444',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #555',
        paddingBottom: '15px'
    },
    addButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderRow: {
        backgroundColor: '#444',
        textAlign: 'left',
    },
    th: {
        padding: '15px',
        color: '#fff',
        fontWeight: 'bold',
        borderBottom: '2px solid #555'
    },
    tableRow: {
        borderBottom: '1px solid #555',
    },
    td: {
        padding: '15px',
        color: '#ddd',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem'
    }
};

export default AdminDashboard;