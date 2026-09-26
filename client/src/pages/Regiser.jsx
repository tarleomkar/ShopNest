import React, { useContext, useState } from 'react'
import '../styles/Regiser.css'
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Regiser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                alert('User registered successfully');
                login(data);
                navigate('/')
            } else {
                alert(data.message);
                console.error(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='auth-container'>
        <form onSubmit={handleSubmit} className='auth-form'>
            <h2>Register</h2>
            <input 
            type="text"
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input 
            type="email" 
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input 
            type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='btn'>Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default Regiser