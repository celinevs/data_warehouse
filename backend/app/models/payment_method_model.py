from app.extensions import db


class DateData(db.Model):
    __tablename__ = "dim_tanggal"

    # Primary Key (format: YYYYMMDD)

    def json(self):
        return {
        }
