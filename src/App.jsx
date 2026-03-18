import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Produk from './pages/Produk';
import TambahProduk from './pages/TambahProduk';
import EditProduk from './pages/EditProduk';
import Keranjang from './pages/Keranjang'; // Import halaman baru
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  // Mengambil data keranjang dari LocalStorage (jika ada)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Setiap kali 'cart' berubah, simpan ke LocalStorage agar tidak hilang saat refresh
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fungsi menambah ke keranjang
  const handleAddToCart = (produk) => {
    setCart(prevCart => {
      const cekBarang = prevCart.find(item => item.id === produk.id);
      if (cekBarang) {
        // Jika barang sudah ada di keranjang, tambah qty-nya saja
        return prevCart.map(item => 
          item.id === produk.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // Jika barang belum ada, masukkan ke keranjang dengan qty 1
      return [...prevCart, { ...produk, qty: 1 }];
    });
    alert(`${produk.nama_barang} berhasil ditambahkan ke keranjang!`);
  };

  // Menghitung total barang di Navbar
  const totalItemDiKeranjang = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2>Toko Online Ku</h2>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/produk">Daftar Barang</Link></li>
            <li><Link to="/tambah">Tambah Barang</Link></li>
            {/* Menu Keranjang dengan Badge Angka */}
            <li>
              <Link to="/keranjang" style={{ color: '#f59e0b' }}>
                🛒 Keranjang ({totalItemDiKeranjang})
              </Link>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Kirim fungsi handleAddToCart ke halaman Produk */}
            <Route path="/produk" element={<Produk onAddToCart={handleAddToCart} />} />
            <Route path="/tambah" element={<TambahProduk />} />
            <Route path="/edit/:id" element={<EditProduk />} />
            {/* Rute untuk halaman Keranjang */}
            <Route path="/keranjang" element={<Keranjang cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
