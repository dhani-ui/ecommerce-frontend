import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Produk() {
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
              src={item.gambar_barang || 'https://via.placeholder.com/300x200?text=No+Image'} 
              alt={item.nama_barang} 
            />
            <h3>{item.nama_barang}</h3>
            <span className="badge-stok">Stok: {item.kuantiti}</span>
            <p className="date-text">📥 Masuk: {item.tanggal_masuk ? item.tanggal_masuk.substring(0, 10) : '-'}</p>
            {item.tanggal_keluar && (
              <p className="date-text">📤 Keluar: {item.tanggal_keluar.substring(0, 10)}</p>
            )}
            
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
