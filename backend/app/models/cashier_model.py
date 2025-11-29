from app.extensions import db


class CashierData(db.Model):
    __tablename__ = "dim_orang_kasir"

    # Primary Key
    id_orang_kasir = db.Column(db.String(6), primary_key=True)

    # Descriptive Attributes
    nama_orang_kasir = db.Column(db.String(100), nullable=False)

    def json(self):
        return {
            "id_orang_kasir": self.id_orang_kasir,
            "nama_orang_kasir": self.nama_orang_kasir,
        }
