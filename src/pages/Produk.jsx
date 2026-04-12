import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Produk({ onAddToCart }) {
  const [barang, setBarang] = useState([]);
  
  // Ambil URL API dari env (Cloudflare/Vercel) atau fallback ke localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // CEK LOGIN: Jika ada token di LocalStorage, berarti ini Admin
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const fetchData = () => {
    // GET tidak butuh token karena ini publik
    axios.get(`${API_BASE_URL}/api/barang`)
      .then(response => {
        // Pastikan data yang masuk adalah array
        setBarang(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi menghapus barang (Hanya bisa dilakukan Admin)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus barang ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/api/barang/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Token dikirim agar diizinkan Middleware Golang
          }
        });
        alert("Barang berhasil dihapus!");
        fetchData(); // Refresh data setelah dihapus
      } catch (error) {
        console.error("Gagal menghapus barang:", error);
        alert("Gagal menghapus! Pastikan Anda sudah login sebagai Admin.");
      }
    }
  };

  // Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: '20px' }}>Daftar Barang Tersedia</h2>
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {barang.length > 0 ? (
          barang.map(item => (
            <div className="card" key={item.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              
              {/* LOGIKA GAMBAR: Menggabungkan URL API dengan path dari DB */}
              <img 
                src={
                  item.gambar_url 
                    ? (item.gambar_url.startsWith('http') ? item.gambar_url : `${API_BASE_URL}${item.gambar_url}`) 
                    : 'https://via.placeholder.com/300x200?text=No+Image'
                } 
                alt={item.nama} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }}
              />

              <h3 style={{ marginTop: '10px' }}>{item.nama}</h3>
              
              <h4 style={{ color: '#10b981', margin: '10px 0' }}>
                {formatRupiah(item.harga || 0)}
              </h4>
              
              <span className="badge-stok" style={{ display: 'block', marginBottom: '15px', fontSize: '0.9em', color: '#666' }}>
                Stok: {item.stok}
              </span>
              
              {/* Tombol Add to Cart (Tampil untuk semua orang) */}
              <button 
                onClick={() => onAddToCart(item)} 
                className="btn-cart"
                style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                + Masukkan Keranjang
              </button>

              {/* Tombol Aksi Admin: HANYA MUNCUL JIKA ADMIN LOGIN */}
              {isLoggedIn && (
                <div className="action-buttons" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <Link 
                    to={`/edit/${item.id}`} 
                    className="btn-edit" 
                    style={{ flex: 1, textAlign: 'center', padding: '8px', backgroundColor: '#f59e0b', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="btn-delete" 
                    style={{ flex: 1, padding: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Memuat barang atau stok sedang kosong...</p>
        )}
      </div>
    </div>
  );
}
