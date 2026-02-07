import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext'; // Import CartContext

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext); // Get cart state

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>My E-Commerce</Link>
            
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Catalog</Link>
                
                {/* Cart Link with Item Count */}
                <Link to="/cart" style={styles.link}>
                    Cart ({cart.length})
                </Link>

                {token ? (
                    <>
                        <Link to="/admin" style={styles.link}>Admin Dashboard</Link>
                        <button onClick={logout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/signup" style={styles.link}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: { padding: '1rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo: { color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' },
    links: { display: 'flex', gap: '20px', alignItems: 'center' },
    link: { color: '#ccc', textDecoration: 'none' },
    button: { background: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }
};

export default Navbar;