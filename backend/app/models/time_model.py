from app.extensions import db
from sqlalchemy import Float, Integer, String, ForeignKey, Date

class SalesFact(db.Model):
    __tablename__ = "fakta_penjualan"

    # Primary Key
    id_fakta_penjualan = db.Column(Integer, primary_key=True)

    # Foreign Keys
    tanggal_id = db.Column(Integer, nullable=False)
    id_waktu = db.Column(String(4), db.ForeignKey("dim_waktu.id_waktu"), nullable=False)
    id_produk = db.Column(String(10), nullable=False)
    id_toko = db.Column(String(10), nullable=False)
    id_promosi = db.Column(String(10), nullable=True)
    id_kasir = db.Column(String(10), nullable=False)
    metode_pembayaran_sk = db.Column(Integer, nullable=False)
    nomor_struk = db.Column(String(20), nullable=False)

    # Measures / numeric
    jumlah_penjualan = db.Column(Integer, nullable=False)
    harga_satuan_jual = db.Column(Float, nullable=False)
    harga_satuan_beli = db.Column(Float, nullable=False)
    harga_diskon = db.Column(Float, nullable=False)
    harga_satuan_jual_bersih = db.Column(Float, nullable=False)
    total_nilai_diskon = db.Column(Float, nullable=False)
    total_nilai_jual = db.Column(Float, nullable=False)
    total_nilai_beli = db.Column(Float, nullable=False)

    def json(self):
        return {
            "id_fakta_penjualan": self.id_fakta_penjualan,
            "tanggal_id": self.tanggal_id,
            "id_waktu": self.id_waktu,
            "id_produk": self.id_produk,
            "id_toko": self.id_toko,
            "id_promosi": self.id_promosi,
            "id_kasir": self.id_kasir,
            "metode_pembayaran_sk": self.metode_pembayaran_sk,
            "nomor_struk": self.nomor_struk,
            "jumlah_penjualan": self.jumlah_penjualan,
            "harga_satuan_jual": self.harga_satuan_jual,
            "harga_satuan_beli": self.harga_satuan_beli,
            "harga_diskon": self.harga_diskon,
            "harga_satuan_jual_bersih": self.harga_satuan_jual_bersih,
            "total_nilai_diskon": self.total_nilai_diskon,
            "total_nilai_jual": self.total_nilai_jual,
            "total_nilai_beli": self.total_nilai_beli
        }
