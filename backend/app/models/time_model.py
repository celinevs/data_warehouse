from app.extensions import db
from sqlalchemy import Time


class TimeData(db.Model):
    __tablename__ = "dim_waktu"

    # Primary Key
    id_waktu = db.Column(db.String(4), primary_key=True)

    # Descriptive Attributes
    waktu = db.Column(Time)

    def json(self):
        return {
            "id_waktu": self.id_waktu,
            "waktu": self.waktu
        }
