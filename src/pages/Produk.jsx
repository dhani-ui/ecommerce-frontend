import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Produk({ onAddToCart }) {
  const [barang, setBarang] = useState([]);
  
  // CEK LOGIN: Jika ada token di LocalStorage, berarti ini Admin
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const fetchData = () => {
    // GET tidak butuh token karena ini publik
    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/barang`)
      .then(response => setBarang(response.data || []))
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
        await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/barang/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // <--- TOKEN DISISIPKAN DI SINI
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
    <div>
      <h2>Daftar Barang Tersedia</h2>
      <div className="grid">
        {barang.map(item => (
          <div className="card" key={item.id}>
            <img 
              src={item.gambar_barang ? (item.gambar_barang.startsWith('http') ? item.gambar_barang : `http://localhost:8080${item.gambar_barang}`) : 'https://via.placeholder.com/300x200?text=No+Image'} 
              alt={item.nama_barang} 
            />
            <h3>{item.nama_barang}</h3>
            <h4 style={{ color: '#10b981', marginBottom: '10px' }}>
              {formatRupiah(item.harga || 0)}
            </h4>
            <span className="badge-stok">Stok: {item.kuantiti}</span>
            
            {/* Tombol Add to Cart (Tampil untuk semua orang) */}
            <button 
              onClick={() => onAddToCart(item)} 
              className="btn-cart"
            >
              + Masukkan Keranjang
            </button>

            {/* Tombol Aksi Admin: HANYA MUNCUL JIKA ADMIN LOGIN */}
            {isLoggedIn && (
              <div className="action-buttons" style={{ marginTop: '10px' }}>
                <Link to={`/edit/${item.id}`} className="btn-edit">Edit</Link>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">Hapus</button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
