import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  // State untuk menyimpan data pembeli
  const [pembeli, setPembeli] = useState({
    nama: '',
    noHp: '',
    alamat: ''
  });

  const handleChange = (e) => {
    setPembeli({ ...pembeli, [e.target.name]: e.target.value });
  };

  // Fungsi memformat Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  // Menghitung Total Harga
  const totalHarga = cart.reduce((total, item) => total + (item.harga * item.qty), 0);

  const handleProsesPembayaran = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert("Keranjang kamu kosong!");
      return;
    }

    // Simulasi pesanan berhasil diproses
    alert(`🎉 Pesanan Berhasil Dibuat!\n\nTerima kasih ${pembeli.nama}.\nTotal tagihan: ${formatRupiah(totalHarga)}\nBarang akan segera dikirim ke: ${pembeli.alamat}`);
    
    // Kosongkan keranjang setelah berhasil dibeli
    setCart([]); 
    
    // Arahkan pembeli kembali ke halaman utama
    navigate('/'); 
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Pengiriman & Pembayaran</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        
        {/* Bagian Kiri: Form Data Diri */}
        <div className="form-container" style={{ flex: '1', minWidth: '300px', margin: '0' }}>
          <h3>Data Pengiriman</h3>
          <form onSubmit={handleProsesPembayaran} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>Nama Lengkap:</label>
              <input type="text" name="nama" value={pembeli.nama} onChange={handleChange} required placeholder="Contoh: Budi Santoso" />
            </div>
            <div className="form-group">
              <label>Nomor HP / WhatsApp:</label>
              <input type="tel" name="noHp" value={pembeli.noHp} onChange={handleChange} required placeholder="Contoh: 08123456789" />
            </div>
            <div className="form-group">
              <label>Alamat Lengkap:</label>
              <textarea 
                name="alamat" 
                value={pembeli.alamat} 
                onChange={handleChange} 
                required 
                placeholder="Nama Jalan, RT/RW, Kelurahan, Kecamatan, Kota"
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', minHeight: '80px', fontFamily: 'inherit' }}
              />
            </div>
            <button type="submit" className="btn-cart" style={{ marginTop: '20px' }}>
              Proses Pesanan Sekarang
            </button>
          </form>
        </div>

        {/* Bagian Kanan: Ringkasan Pesanan */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', alignSelf: 'flex-start' }}>
          <h3>Ringkasan Belanja</h3>
          <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
          
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.nama_barang} (x{item.qty})</span>
              <strong>{formatRupiah(item.harga * item.qty)}</strong>
            </div>
          ))}

          <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', color: '#10b981' }}>
            <strong>Total Tagihan:</strong>
            <strong>{formatRupiah(totalHarga)}</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
