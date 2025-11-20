from app.extensions import db
from sqlalchemy import Integer, String, ForeignKey

class PromotionCoverageFact(db.Model):
    __tablename__ = "fakta_jangkauan_promosi"

    # Primary Key: Surrogate Key
    coverage_id = db.Column(Integer, primary_key=True, autoincrement=True)

    # Foreign Keys
    tanggal_id = db.Column(String(8), ForeignKey("dim_tanggal.tanggal_id"), nullable=False)
    id_produk = db.Column(String(4), ForeignKey("dim_produk.id_produk"), nullable=False)
    id_toko = db.Column(String(10), ForeignKey("dim_toko.id_toko"), nullable=False)
    id_promosi = db.Column(String(6), ForeignKey("dim_promosi.id_promosi"), nullable=False)

    # indikator promosi -> dummy measure
    indikator_promosi = db.Column(Integer, nullable=False)

    def json(self):
        return {
            "tanggal_id": self.tanggal_id,
            "id_produk": self.id_produk,
            "id_toko": self.id_toko,
            "id_promosi": self.id_promosi,
            "indikator_promosi": self.indikator_promosi
        }
