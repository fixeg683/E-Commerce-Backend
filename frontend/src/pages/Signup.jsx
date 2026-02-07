import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('register/', { username, email, password });
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (error) {
            console.error("Signup failed", error);
            
            // IMPROVED ERROR HANDLING
            if (error.response && error.response.data) {
                // Combine all error messages into a single string for the alert
                const errorData = error.response.data;
                let errorMessage = "Registration Failed:\n";

                if (errorData.username) {
                    errorMessage += `Username: ${errorData.username[0]}\n`;
                }
                if (errorData.password) {
                    errorMessage += `Password: ${errorData.password[0]}\n`;
                }
                if (errorData.email) {
                    errorMessage += `Email: ${errorData.email[0]}\n`;
                }
                
                // Fallback for other errors
                if (!errorData.username && !errorData.password && !errorData.email) {
                    errorMessage += JSON.stringify(errorData);
                }

                alert(errorMessage);
            } else {
                alert("Registration failed. Please check your internet connection.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={styles.input}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={styles.input}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>
                        Register
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
        minHeight: '80vh',
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
        backgroundColor: '#444', // slightly lighter background for inputs
        color: '#fff',
        border: '1px solid #555'
    },
    button: {
        padding: '12px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '4px',
        marginTop: '10px'
    }
};

export default Signup;