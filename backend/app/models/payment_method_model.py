from app.extensions import db


class PaymentMethodData(db.Model):
    __tablename__ = "dim_metode_pembayaran"

    # Surrogate Key (Primary)
    metode_pembayaran_sk = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Natural Key
    metode_pembayaran_id = db.Column(db.String(50), unique=True, nullable=False)

    # Descriptive Attributes
    nama_metode_pembayaran = db.Column(db.String(100), nullable=False)
    jenis_pembayaran = db.Column(db.String(50), nullable=False)
    penyedia = db.Column(db.String(50), nullable=True)
    apakah_digital = db.Column(db.Boolean, nullable=False)

    def json(self):
        return {
            "metode_pembayaran_sk": self.metode_pembayaran_sk,
            "metode_pembayaran_id": self.metode_pembayaran_id,
            "nama_metode_pembayaran": self.nama_metode_pembayaran,
            "jenis_pembayaran": self.jenis_pembayaran,
            "penyedia": self.penyedia,
            "apakah_digital": self.apakah_digital
        }
