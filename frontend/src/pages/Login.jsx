import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/admin');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={styles.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh', // Uses viewport height to center vertically
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: '#333',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        border: '1px solid #444'
    },
    form: {
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px' 
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '4px',
    },
    button: {
        padding: '12px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
        marginTop: '10px'
    }
};

export default Login;