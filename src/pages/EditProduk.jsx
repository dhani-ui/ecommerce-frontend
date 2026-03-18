import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. Tambahkan harga: 0 di state awal
  const [formData, setFormData] = useState({
    nama_barang: '', kuantiti: 0, harga: 0, tanggal_masuk: '', tanggal_keluar: '', gambar_barang: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/barang')
      .then(response => {
        const dataBarang = response.data || [];
        const barangEdit = dataBarang.find(b => b.id === parseInt(id));
        if (barangEdit) {
          // 2. Masukkan data harga dari database saat form dimuat
          setFormData({
            nama_barang: barangEdit.nama_barang,
            kuantiti: barangEdit.kuantiti,
            harga: barangEdit.harga || 0, // Tarik data harga
            tanggal_masuk: barangEdit.tanggal_masuk ? barangEdit.tanggal_masuk.substring(0, 10) : '',
            tanggal_keluar: barangEdit.tanggal_keluar ? barangEdit.tanggal_keluar.substring(0, 10) : '',
            gambar_barang: barangEdit.gambar_barang || ''
          });
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // 3. Pastikan input harga (dan kuantiti) diubah menjadi angka (integer)
      [name]: (name === 'kuantiti' || name === 'harga') ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/barang/${id}`, formData);
      alert('Barang berhasil diperbarui!');
      navigate('/produk');
    } catch (error) {
      console.error("Error mengupdate barang:", error);
      alert('Gagal mengupdate barang.');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Edit Barang</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Nama Barang:</label>
            <input type="text" name="nama_barang" value={formData.nama_barang} onChange={handleChange} required />
          </div>

          {/* 4. Tambahkan Input HTML untuk Harga */}
          <div className="form-group">
            <label>Harga (Rp):</label>
            <input type="number" name="harga" value={formData.harga} onChange={handleChange} required min="0" />
          </div>

          <div className="form-group">
            <label>Kuantiti (Stok):</label>
            <input type="number" name="kuantiti" value={formData.kuantiti} onChange={handleChange} required min="0" />
          </div>

          <div className="form-group">
            <label>Tanggal Masuk:</label>
            <input type="date" name="tanggal_masuk" value={formData.tanggal_masuk} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Tanggal Keluar:</label>
            <input type="date" name="tanggal_keluar" value={formData.tanggal_keluar} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>URL Gambar:</label>
            <input type="text" name="gambar_barang" value={formData.gambar_barang} onChange={handleChange} />
            <small style={{ color: '#6b7280', marginTop: '5px' }}>
              *Jika sebelumnya menggunakan gambar upload, biarkan teks (/uploads/...) ini apa adanya.
            </small>
          </div>

          <button type="submit" className="btn-submit" style={{ backgroundColor: '#3b82f6' }}>
            Update Barang
          </button>
        </form>
      </div>
    </div>
  );
}
