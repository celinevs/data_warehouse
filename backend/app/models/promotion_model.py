from app.extensions import db


class PromotionData(db.Model):
    __tablename__ = "dim_promosi"

    # Primary Key
    id_promosi = db.Column(db.String(6), primary_key=True)

    # Descriptive Attributes
    nama_promosi = db.Column(db.String(150), nullable=False)
    tipe_promosi = db.Column(db.String(50), nullable=False)
    tipe_media_promosi = db.Column(db.String(70), nullable=False)
    kode_promosi = db.Column(db.String(50), nullable=False)
    tanggal_mulai = db.Column(db.Date, nullable=False)
    tanggal_akhir = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    jumlah_promosi = db.Column(db.Integer, nullable=False)

    def json(self):
        return {
            "id_promosi": self.id_promosi,
            "nama_promosi": self.nama_promosi,
            "tipe_promosi": self.tipe_promosi, 
            "tipe_media_promosi": self.tipe_media_promosi, 
            "kode_promosi": self.kode_promosi, 
            "tanggal_mulai": self.tanggal_mulai, 
            "tanggal_akhir": self.tanggal_akhir, 
            "status": self.status, 
            "jumlah_promosi": self.jumlah_promosi, 
        }
