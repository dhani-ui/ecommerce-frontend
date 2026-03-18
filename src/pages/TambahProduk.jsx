import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TambahProduk() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nama_barang: '', kuantiti: 0, harga: 0, tanggal_masuk: '', tanggal_keluar: ''
  });
  const [fileGambar, setFileGambar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFileGambar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataKirim = new FormData();
    dataKirim.append('nama_barang', formData.nama_barang);
    dataKirim.append('kuantiti', formData.kuantiti);
    dataKirim.append('harga', formData.harga); // Pastikan harga ikut dikirim
    dataKirim.append('tanggal_masuk', formData.tanggal_masuk);
    dataKirim.append('tanggal_keluar', formData.tanggal_keluar);
    if (fileGambar) {
      dataKirim.append('gambar_barang', fileGambar);
    }

    // Ambil token dari localStorage
    const token = localStorage.getItem('token');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/barang`, dataKirim, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // <--- TOKEN DISISIPKAN DI SINI
        }
      });
      alert('Barang berhasil ditambahkan!');
      navigate('/produk');
    } catch (error) {
      console.error("Error:", error);
      alert('Gagal menambahkan barang. Pastikan Anda sudah login!');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Tambah Barang Baru</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Barang:</label>
            <input type="text" name="nama_barang" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Harga (Rp):</label>
            <input type="number" name="harga" onChange={handleChange} required min="0" />
          </div>
          <div className="form-group">
            <label>Kuantiti:</label>
            <input type="number" name="kuantiti" onChange={handleChange} required min="0" />
          </div>
          <div className="form-group">
            <label>Tanggal Masuk:</label>
            <input type="date" name="tanggal_masuk" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Tanggal Keluar:</label>
            <input type="date" name="tanggal_keluar" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Upload Gambar:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn-cart">Simpan Barang</button>
        </form>
      </div>
    </div>
  );
}
