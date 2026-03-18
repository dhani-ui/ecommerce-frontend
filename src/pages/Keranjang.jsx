import React from 'react';
import { Link } from 'react-router-dom';

export default function Keranjang({ cart, setCart }) {
  const hapusDariKeranjang = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Fungsi memformat Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  // Menghitung Total Harga Semua Barang
  const totalHarga = cart.reduce((total, item) => total + (item.harga * item.qty), 0);

  return (
    <div>
      <h2>🛒 Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <p>Keranjang kamu masih kosong. Yuk belanja dulu!</p>
      ) : (
        <div>
          <div className="grid">
            {cart.map(item => (
              <div className="card" key={item.id}>
                <img 
                  src={item.gambar_barang ? (item.gambar_barang.startsWith('http') ? item.gambar_barang : `http://localhost:8080${item.gambar_barang}`) : 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={item.nama_barang} 
                  style={{ height: '100px' }}
                />
                <h3>{item.nama_barang}</h3>
                <p style={{ color: '#6b7280' }}>{formatRupiah(item.harga)} x {item.qty}</p>
                <h4 style={{ color: '#10b981', marginTop: '5px' }}>Subtotal: {formatRupiah(item.harga * item.qty)}</h4>
                
                <button onClick={() => hapusDariKeranjang(item.id)} className="btn-delete" style={{ marginTop: '10px' }}>
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Bagian Total Pembayaran */}
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'right' }}>
            <h3>Total Belanja: <span style={{ color: '#10b981', fontSize: '1.5rem' }}>{formatRupiah(totalHarga)}</span></h3>
{/* Bagian Total Pembayaran */}
<div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'right' }}>
  <h3>Total Belanja: <span style={{ color: '#10b981', fontSize: '1.5rem' }}>{formatRupiah(totalHarga)}</span></h3>

  {/* Tombol yang mengarah ke halaman Checkout */}
  <Link to="/checkout" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '15px' }}>
    <button className="btn-cart" style={{ width: 'auto', padding: '10px 30px', margin: '0' }}>
      Lanjut ke Pengiriman
    </button>
  </Link>
</div>

          </div>
        </div>
      )}
    </div>
  );
}
