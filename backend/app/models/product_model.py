from app.extensions import db


class ProductData(db.Model):
    __tablename__ = "dim_produk"

    # Primary Key
    id_produk = db.Column(db.String(4), primary_key=True)

    # Descriptive Attributes
    nama_produk = db.Column(db.String(150), nullable=False)
    nama_brand = db.Column(db.String(150), nullable=False)
    kode_SKU = db.Column(db.String(20), nullable=False)
    kategori = db.Column(db.String(60), nullable=False)
    subkategori = db.Column(db.String(60), nullable=False)

    def json(self):
        return {
            "id_produk": self.id_produk,
            "nama_produk": self.nama_produk,
            "nama_brand": self.nama_brand, 
            "kode_SKU": self.kode_SKU, 
            "kategori": self.kategori, 
            "subkategori": self.subkategori
        }
