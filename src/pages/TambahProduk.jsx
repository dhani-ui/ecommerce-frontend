import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TambahProduk() {
  const navigate = useNavigate();
  
  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    nama_barang: '',
    kuantiti: 0,
    tanggal_masuk: '',
    tanggal_keluar: '',
    gambar_barang: ''
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'kuantiti' ? parseInt(value) || 0 : value
    });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/barang', formData);
      alert('Barang berhasil ditambahkan!');
      navigate('/produk'); // Redirect ke halaman daftar barang
    } catch (error) {
      console.error("Error menambahkan barang:", error);
      alert('Gagal menambahkan barang.');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Tambah Barang Baru</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Nama Barang:</label>
            <input type="text" name="nama_barang" value={formData.nama_barang} onChange={handleChange} required placeholder="Contoh: Sepatu Sneakers" />
          </div>

          <div className="form-group">
            <label>Kuantiti:</label>
            <input type="number" name="kuantiti" value={formData.kuantiti} onChange={handleChange} required min="0" />
          </div>

          <div className="form-group">
            <label>Tanggal Masuk:</label>
            <input type="date" name="tanggal_masuk" value={formData.tanggal_masuk} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Tanggal Keluar (Opsional):</label>
            <input type="date" name="tanggal_keluar" value={formData.tanggal_keluar} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>URL Gambar:</label>
            <input type="text" name="gambar_barang" value={formData.gambar_barang} onChange={handleChange} placeholder="https://link-gambar.com/img.jpg" />
          </div>

          <button type="submit" className="btn-submit">
            Simpan Barang
          </button>
        </form>
      </div>
    </div>
  );
}
