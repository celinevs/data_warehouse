from app.extensions import db
from sqlalchemy import String, ForeignKey, Date

class AccumulatingSnapshotData(db.Model):
    __tablename__ = "accumulating_snapshot"

    # Primary Key
    nomor_penerimaan_barang = db.Column(String(8), primary_key=True)

    # Foreign Keys (ke dim_tanggal)
    key_tanggal_terima = db.Column(String(8), ForeignKey("dim_tanggal.tanggal_id"), nullable=False)
    key_tanggal_inspeksi = db.Column(String(8), ForeignKey("dim_tanggal.tanggal_id"), nullable=True)

    # Tanggal penempatan
    tanggal_penempatan = db.Column(String(8), ForeignKey("dim_tanggal.tanggal_id"), nullable=True)

    def json(self):
        return {
            "nomor_penerimaan_barang": self.nomor_penerimaan_barang,
            "key_tanggal_terima": self.key_tanggal_terima,
            "key_tanggal_inspeksi": self.key_tanggal_inspeksi,
            "tanggal_penempatan": self.tanggal_penempatan,
        }
