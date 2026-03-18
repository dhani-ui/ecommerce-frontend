import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TambahProduk() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
  nama_barang: '', kuantiti: 0, harga: 0, tanggal_masuk: '', tanggal_keluar: ''
});

  const [fileGambar, setFileGambar] = useState(null); // State khusus untuk file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFileGambar(e.target.files[0]); // Mengambil file yang dipilih user
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kita gunakan FormData untuk mengirim file + teks bersamaan
    const dataKirim = new FormData();
    dataKirim.append('nama_barang', formData.nama_barang);
dataKirim.append('harga', formData.harga); // Baris baru

    dataKirim.append('kuantiti', formData.kuantiti);
    dataKirim.append('tanggal_masuk', formData.tanggal_masuk);
    dataKirim.append('tanggal_keluar', formData.tanggal_keluar);
    if (fileGambar) {
      dataKirim.append('gambar_barang', fileGambar);
    }

    try {
      // Perhatikan header khusus untuk multipart/form-data
      await axios.post('http://localhost:8080/api/barang', dataKirim, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Barang dan Gambar berhasil ditambahkan!');
      navigate('/produk');
    } catch (error) {
      console.error("Error:", error);
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
            {/* Input ini diubah menjadi type="file" */}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn-submit">Simpan Barang</button>
        </form>
      </div>
    </div>
  );
}
