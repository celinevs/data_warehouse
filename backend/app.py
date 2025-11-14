from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URL'] = environ.get('DATABASE_URL')

db = SQLAlchemy(app)

############# TABLE ###############
class DateDimension(db.Model):
    __tablename__ = "dim_tanggal"

    # Primary Key (format: YYYYMMDD)
    tanggal_id = db.Column(db.String(8), primary_key=True)

    # Tanggal asli
    tanggal = db.Column(db.Date)

    # Deskripsi tanggal lengkap (contoh: "Januari 1, 2024")
    deskripsi_tanggal_lengkap = db.Column(db.String(50))

    # Hari dalam minggu (Senin, Selasa, ...)
    hari_dalam_minggu = db.Column(db.String(10))

    # Nomor hari dalam bulan
    nomor_hari_dalam_bulan = db.Column(db.Integer)

    # Nomor hari dalam tahun
    nomor_hari_dalam_tahun = db.Column(db.Integer)

    # Nomor hari dalam bulan fiskal
    nomor_hari_dalam_bulan_fiskal = db.Column(db.Integer)

    # Nomor hari dalam tahun fiskal
    nomor_hari_dalam_tahun_fiskal = db.Column(db.Integer)

    # Indikator hari terakhir dalam bulan (TRUE/FALSE)
    indikator_hari_terakhir_dalam_bulan = db.Column(db.Boolean)

    # Tanggal akhir minggu kalender
    tanggal_akhir_minggu_kalender = db.Column(db.Date)

    # Nomor minggu dalam tahun (kalender)
    nomor_minggu_dalam_tahun_kalender = db.Column(db.Integer)

    # Nama bulan kalender (Januari, Februari…)
    nama_bulan_kalender = db.Column(db.String(20))

    # Nomor bulan dalam tahun (1–12)
    nomor_bulan_dalam_tahun_kalender = db.Column(db.Integer)

    # Tahun-bulan kalender (2024-01)
    tahun_bulan_kalender = db.Column(db.String(7))

    # Kuartal kalender (Q1, Q2…)
    kuartal_kalender = db.Column(db.String(5))

    # Tahun-kuartal kalender (2024-Q1)
    tahun_kuartal_kalender = db.Column(db.String(10))

    # Tahun kalender 4 digit (2024)
    tahun_kalender = db.Column(db.Integer)

    # Minggu fiskal (FW01, FW02…)
    minggu_fiskal = db.Column(db.String(10))

    # Nomor minggu dalam tahun fiskal
    nomor_minggu_dalam_tahun_fiskal = db.Column(db.Integer)

    # Bulan fiskal (FM01, FM02…)
    bulan_fiskal = db.Column(db.String(10))

    # Nomor bulan dalam tahun fiskal
    nomor_bulan_dalam_tahun_fiskal = db.Column(db.Integer)

    # Tahun-bulan fiskal (FY2024-FM01)
    tahun_bulan_fiskal = db.Column(db.String(20))

    # Kuartal fiskal
    kuartal_fiskal = db.Column(db.String(10))

    # Tahun-kuartal fiskal
    tahun_kuartal_fiskal = db.Column(db.String(20))

    # Setengah tahun fiskal
    setengah_tahun_fiskal = db.Column(db.String(20))

    # Tahun fiskal final (FY2024)
    tahun_fiskal = db.Column(db.String(10))

    # Indikator hari libur
    indikator_hari_libur = db.Column(db.Boolean)

    # Indikator hari kerja
    indikator_hari_kerja = db.Column(db.Boolean)

    # Timestamp versi SQL (format YYYY-MM-DD)
    cap_waktu_sql = db.Column(db.Date)

    def json(self):
        return {
            "tanggal_id": self.tanggal_id,
            "tanggal": self.tanggal.isoformat() if self.tanggal else None,
            "deskripsi_tanggal_lengkap": self.deskripsi_tanggal_lengkap,
            "hari_dalam_minggu": self.hari_dalam_minggu,
            "nomor_hari_dalam_bulan": self.nomor_hari_dalam_bulan,
            "nomor_hari_dalam_tahun": self.nomor_hari_dalam_tahun,
            "nomor_hari_dalam_bulan_fiskal": self.nomor_hari_dalam_bulan_fiskal,
            "nomor_hari_dalam_tahun_fiskal": self.nomor_hari_dalam_tahun_fiskal,
            "indikator_hari_terakhir_dalam_bulan": self.indikator_hari_terakhir_dalam_bulan,
            "tanggal_akhir_minggu_kalender": self.tanggal_akhir_minggu_kalender.isoformat() if self.tanggal_akhir_minggu_kalender else None,
            "nomor_minggu_dalam_tahun_kalender": self.nomor_minggu_dalam_tahun_kalender,
            "nama_bulan_kalender": self.nama_bulan_kalender,
            "nomor_bulan_dalam_tahun_kalender": self.nomor_bulan_dalam_tahun_kalender,
            "tahun_bulan_kalender": self.tahun_bulan_kalender,
            "kuartal_kalender": self.kuartal_kalender,
            "tahun_kuartal_kalender": self.tahun_kuartal_kalender,
            "tahun_kalender": self.tahun_kalender,
            "minggu_fiskal": self.minggu_fiskal,
            "nomor_minggu_dalam_tahun_fiskal": self.nomor_minggu_dalam_tahun_fiskal,
            "bulan_fiskal": self.bulan_fiskal,
            "nomor_bulan_dalam_tahun_fiskal": self.nomor_bulan_dalam_tahun_fiskal,
            "tahun_bulan_fiskal": self.tahun_bulan_fiskal,
            "kuartal_fiskal": self.kuartal_fiskal,
            "tahun_kuartal_fiskal": self.tahun_kuartal_fiskal,
            "setengah_tahun_fiskal": self.setengah_tahun_fiskal,
            "tahun_fiskal": self.tahun_fiskal,
            "indikator_hari_libur": self.indikator_hari_libur,
            "indikator_hari_kerja": self.indikator_hari_kerja,
            "cap_waktu_sql": self.cap_waktu_sql.isoformat() if self.cap_waktu_sql else None
        }
    
####################################

db.create_all()

# create a test route
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'The server is running'})

## create dimensions
# Date Dimension
@app.route('/api/flask/dates', methods=['POST'])
def create_date_dim():
    try:
        data = request.get_json()

        new_date = DateDimension(
            tanggal_id=data.get("tanggal_id"),
            tanggal=data.get("tanggal"),
            deskripsi_tanggal_lengkap=data.get("deskripsi_tanggal_lengkap"),
            hari_dalam_minggu=data.get("hari_dalam_minggu"),
            nomor_hari_dalam_bulan=data.get("nomor_hari_dalam_bulan"),
            nomor_hari_dalam_tahun=data.get("nomor_hari_dalam_tahun"),
            nomor_hari_dalam_bulan_fiskal=data.get("nomor_hari_dalam_bulan_fiskal"),
            nomor_hari_dalam_tahun_fiskal=data.get("nomor_hari_dalam_tahun_fiskal"),
            indikator_hari_terakhir_dalam_bulan=data.get("indikator_hari_terakhir_dalam_bulan"),
            tanggal_akhir_minggu_kalender=data.get("tanggal_akhir_minggu_kalender"),
            nomor_minggu_dalam_tahun_kalender=data.get("nomor_minggu_dalam_tahun_kalender"),
            nama_bulan_kalender=data.get("nama_bulan_kalender"),
            nomor_bulan_dalam_tahun_kalender=data.get("nomor_bulan_dalam_tahun_kalender"),
            tahun_bulan_kalender=data.get("tahun_bulan_kalender"),
            kuartal_kalender=data.get("kuartal_kalender"),
            tahun_kuartal_kalender=data.get("tahun_kuartal_kalender"),
            tahun_kalender=data.get("tahun_kalender"),
            minggu_fiskal=data.get("minggu_fiskal"),
            nomor_minggu_dalam_tahun_fiskal=data.get("nomor_minggu_dalam_tahun_fiskal"),
            bulan_fiskal=data.get("bulan_fiskal"),
            nomor_bulan_dalam_tahun_fiskal=data.get("nomor_bulan_dalam_tahun_fiskal"),
            tahun_bulan_fiskal=data.get("tahun_bulan_fiskal"),
            kuartal_fiskal=data.get("kuartal_fiskal"),
            tahun_kuartal_fiskal=data.get("tahun_kuartal_fiskal"),
            setengah_tahun_fiskal=data.get("setengah_tahun_fiskal"),
            tahun_fiskal=data.get("tahun_fiskal"),
            indikator_hari_libur=data.get("indikator_hari_libur"),
            indikator_hari_kerja=data.get("indikator_hari_kerja"),
            cap_waktu_sql=data.get("cap_waktu_sql")
        )

        db.session.add(new_date)
        db.session.commit()

        return jsonify({
            "message": "Date dimension created successfully.",
            "data": new_date.json()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# get data
@app.route('/api/flask/dates', methods=['GET'])
def get_date_dim():
    try:
        dates = DateDimension.query.all()
        dates_data = [d.json() for d in dates]

        return jsonify({
            "message": "Success",
            "count": len(dates_data),
            "data": dates_data
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500