# periodic snapshot
from app.extensions import db
from sqlalchemy import String, ForeignKey

class PeriodicSnapshotData(db.Model):
    __tablename__ = "periodic_snapshot"

    # Primary Key
    snapshot_id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Foreign Keys (ke dim_tanggal)
    tanggal_id = db.Column(String(8), ForeignKey("dim_tanggal.tanggal_id"), nullable=False)
    id_toko = db.Column(String(10), ForeignKey("dim_toko.id_toko"), nullable=False)
    id_produk = db.Column(String(4), ForeignKey("dim_produk.id_produk"), nullable=False)

    # jumlah stok
    jumlah_stok = db.Column(db.Integer, nullable=False)

    def json(self):
        return {
            "snapshot_id": self.snapshot_id, 
            "tanggal_id": self.tanggal_id, 
            "id_toko": self.id_toko, 
            "id_produk": self.id_produk, 
            "jumlah_stok": self.jumlah_stok
        }
