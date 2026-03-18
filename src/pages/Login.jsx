import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/login`, {
        username,
        password
      });

      // Simpan token JWT ke LocalStorage
      localStorage.setItem('token', response.data.token);
      alert('Login Berhasil!');

      // Refresh halaman agar state berubah
      window.location.href = '/'; 
    } catch (error) {
      alert('Login Gagal: Username atau Password salah');
    }
  };

  return (
    <div className="form-container" style={{ marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Login Admin</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-cart">Masuk</button>
      </form>
    </div>
  );
}
