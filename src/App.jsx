import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import Semua Halaman
import Home from './pages/Home';
import Produk from './pages/Produk';
import TambahProduk from './pages/TambahProduk';
import EditProduk from './pages/EditProduk';
import Keranjang from './pages/Keranjang';
import Checkout from './pages/Checkout';
import Login from './pages/Login'; // Halaman Login Baru
import './App.css';

function App() {
  // ==========================================
  // 1. STATE & FUNGSI UNTUK KERANJANG BELANJA
  // ==========================================
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (produk) => {
    setCart(prevCart => {
      const cekBarang = prevCart.find(item => item.id === produk.id);
      if (cekBarang) {
        return prevCart.map(item => 
          item.id === produk.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...produk, qty: 1 }];
    });
    alert(`${produk.nama_barang} berhasil ditambahkan ke keranjang!`);
  };

  const totalItemDiKeranjang = cart.reduce((total, item) => total + item.qty, 0);

  // ==========================================
  // 2. STATE & FUNGSI UNTUK AUTH (LOGIN/LOGOUT)
  // ==========================================
  
  // Cek apakah ada token JWT di LocalStorage
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; // Mengubah token menjadi boolean (true jika ada, false jika kosong)

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar dari mode Admin?");
    if (confirmLogout) {
      localStorage.removeItem('token'); // Menghapus token dari browser
      window.location.href = '/';       // Memaksa browser ke halaman Home dan refresh state
    }
  };

  // ==========================================
  // 3. TAMPILAN UI & ROUTING
  // ==========================================
  return (
    <Router>
      <div>
        {/* --- FULL NAVBAR --- */}
        <nav className="navbar">
          <h2>Toko Online Ku</h2>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/produk">Daftar Barang</Link></li>
            
            {/* Menu Tambah Barang HANYA MUNCUL JIKA ADMIN LOGIN */}
            {isLoggedIn && (
              <li><Link to="/tambah">Tambah Barang</Link></li>
            )}
            
            {/* Menu Keranjang */}
            <li>
              <Link to="/keranjang" style={{ color: '#f59e0b', fontWeight: 'bold' }}>
                🛒 Keranjang ({totalItemDiKeranjang})
              </Link>
            </li>

            {/* Tombol Login / Logout Otomatis */}
            {isLoggedIn ? (
              <li>
                <button 
                  onClick={handleLogout} 
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginLeft: '10px' }}
                >
                  Logout Admin
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" style={{ color: '#3b82f6' }}>Login Admin</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* --- DAFTAR RUTE HALAMAN --- */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produk" element={<Produk onAddToCart={handleAddToCart} />} />
            <Route path="/keranjang" element={<Keranjang cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
            
            {/* Rute Admin */}
            <Route path="/tambah" element={<TambahProduk />} />
            <Route path="/edit/:id" element={<EditProduk />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
