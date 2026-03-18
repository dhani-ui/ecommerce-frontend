import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Produk({ onAddToCart }) { // Tambahkan parameter ini

  const [barang, setBarang] = useState([]);

  // Fungsi untuk mengambil data
  const fetchData = () => {
    axios.get('http://localhost:8080/api/barang')
      .then(response => setBarang(response.data || []))
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData(); // Panggil saat pertama kali load
  }, []);

  // Fungsi untuk menghapus barang
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus barang ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/barang/${id}`);
        alert("Barang berhasil dihapus!");
        fetchData(); // Refresh data setelah dihapus
      } catch (error) {
        console.error("Gagal menghapus barang:", error);
      }
    }
  };

  return (
    <div>
      <h2>Daftar Barang Tersedia</h2>
      <div className="grid">
        {barang.map(item => (
          <div className="card" key={item.id}>
            <img 
              // Jika gambar dari upload (dimulai dengan /uploads), tambahkan URL backend
              src={item.gambar_barang 
                    ? (item.gambar_barang.startsWith('http') ? item.gambar_barang : `http://localhost:8080${item.gambar_barang}`) 
                    : 'https://via.placeholder.com/300x200?text=No+Image'} 
              alt={item.nama_barang} 
            />
            <h3>{item.nama_barang}</h3>
            {/* Format Harga */}
            <h4 style={{ color: '#10b981', marginBottom: '10px' }}>
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.harga || 0)}
            </h4>
            <span className="badge-stok">Stok: {item.kuantiti}</span>

            <span className="badge-stok">Stok: {item.kuantiti}</span>
            <p className="date-text">📥 Masuk: {item.tanggal_masuk ? item.tanggal_masuk.substring(0, 10) : '-'}</p>
            {item.tanggal_keluar && (
              <p className="date-text">📤 Keluar: {item.tanggal_keluar.substring(0, 10)}</p>
            )}
                        {/* Tombol Add to Cart untuk Pembeli */}
            <button 
              onClick={() => onAddToCart(item)} 
              className="btn-cart"
            >
              + Masukkan Keranjang
            </button>

            {/* Tombol Aksi */}
            <div className="action-buttons">
              <Link to={`/edit/${item.id}`} className="btn-edit">Edit</Link>
              <button onClick={() => handleDelete(item.id)} className="btn-delete">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
