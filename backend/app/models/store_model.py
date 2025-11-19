from app.extensions import db


class StoreData(db.Model):
    __tablename__ = "dim_toko"

    # Primary Key
    id_toko = db.Column(db.String(10), primary_key=True)

    # Descriptive Attributes
    nama_toko = db.Column(db.String(50), nullable=False)
    alamat_jalan = db.Column(db.String(100), nullable=False)
    kelurahan = db.Column(db.String(50), nullable=False)
    kecamatan = db.Column(db.String(50), nullable=False)
    kota = db.Column(db.String(50), nullable=False)
    kode_pos = db.Column(db.String(10), nullable=False)
    provinsi = db.Column(db.String(50), nullable=False)
    alamat_lengkap = db.Column(db.String(255), nullable=False)
    nomor_telepon_toko = db.Column(db.String(20), nullable=False)
    email_toko = db.Column(db.String(100), nullable=False)

    def json(self):
        return {
            "id_toko": self.id_toko,
            "nama_toko": self.nama_toko,
            "alamat_jalan": self.alamat_jalan, 
            "kelurahan": self.kelurahan, 
            "kecamatan": self.kecamatan, 
            "kota": self.kota, 
            "kode_pos": self.kode_pos, 
            "alamat_lengkap": self.alamat_lengkap, 
            "nomor_telepon_toko": self.nomor_telepon_toko, 
            "email_toko": self.email_toko
        }
