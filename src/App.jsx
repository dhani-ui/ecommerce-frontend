import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Produk from './pages/Produk';
import TambahProduk from './pages/TambahProduk';
import EditProduk from './pages/EditProduk'; // IMPORT INI
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2>Toko Online Ku</h2>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/produk">Daftar Barang</Link></li>
            <li><Link to="/tambah">Tambah Barang</Link></li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/tambah" element={<TambahProduk />} />
            <Route path="/edit/:id" element={<EditProduk />} /> {/* ROUTE BARU INI */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
