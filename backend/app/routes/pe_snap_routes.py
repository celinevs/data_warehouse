from flask import Blueprint, request, jsonify
from app.models.pe_snapshot import PeriodicSnapshotData
from app.models.date_model import DateData
from app.models.store_model import StoreData
from app.models.product_model import ProductData
from app.extensions import db

pe_snap_bp = Blueprint("pe-snapshot", __name__)

# GET all
@pe_snap_bp.route('/', methods=['GET'])
def get_all_pe_snap():
    items = PeriodicSnapshotData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(items),
        "data": [i.json() for i in items]
    }), 200


# GET by nomor_pe_snap_barang (PK)
@pe_snap_bp.route('/id/<int:nomor>', methods=['GET'])
def get_pe_snap_by_id(nomor):
    item = PeriodicSnapshotData.query.get(nomor)
    if not item:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": item.json()}), 200


# GET by tanggal_id
@pe_snap_bp.route('/jumlah-stok/<string:tanggal>', methods=['GET'])
def get_pe_snap_by_tanggal(tanggal):
    items = PeriodicSnapshotData.query.filter_by(tanggal_id=tanggal).all()
    if not items:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [i.json() for i in items]}), 200


# GET by id_toko
@pe_snap_bp.route('/jumlah-stok/<string:toko>', methods=['GET'])
def get_pe_snap_by_toko(toko):
    items = PeriodicSnapshotData.query.filter_by(id_toko=toko).all()
    if not items:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [i.json() for i in items]}), 200


# GET by tanggal_penempatan
@pe_snap_bp.route('/jumlah-stok/<string:produk>', methods=['GET'])
def get_pe_snap_by_produk(produk):
    items = PeriodicSnapshotData.query.filter_by(id_produk=produk).all()
    if not items:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [i.json() for i in items]}), 200

# GET stock per date by product by store
@pe_snap_bp.route('/jumlah-stok/', methods=['GET'])
def get_jumlah_stok():
    id_produk = request.args.get('id_produk')
    id_toko = request.args.get('id_toko')
    tanggal_mulai = request.args.get('tanggal_mulai')
    tanggal_akhir = request.args.get('tanggal_akhir')

    # base query
    query = PeriodicSnapshotData.query

    # filter by produk
    if id_produk:
        query = query.filter(PeriodicSnapshotData.id_produk==id_produk)
    
    if id_toko:
        query = query.filter(PeriodicSnapshotData.id_toko==id_toko)
    
    if tanggal_mulai and tanggal_akhir:
        query = query.filter(PeriodicSnapshotData.tanggal_id.between(tanggal_mulai, tanggal_akhir)).order_by(PeriodicSnapshotData.tanggal_id.asc())
    
    else:
        return jsonify({"error": "Parameter id_produk, id_toko, tanggal_mulai, tanggal_akhir wajib"}), 400

    query = query.all()

    data = [
        {
            "tanggal_id": r.tanggal_id,
            "cap_waktu_sql": r.cap_waktu_sql,
            "jumlah_stok": int(r.jumlah_stok)
        } 
        for r in query
    ]

    return jsonify({
        "id_produk": id_produk, 
        "tanggal_mulai": tanggal_mulai, 
        "tanggal_akhir": tanggal_akhir, 
        "jumlah_stok_per_tanggal": data
    }), 200


# POST create new record
@pe_snap_bp.route('/', methods=['POST'])
def create_pe_snap():
    data = request.get_json()
    try:
        item = PeriodicSnapshotData(**data)
        db.session.add(item)
        db.session.commit()
        return jsonify({"message": "Created", "data": item.json()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error", "error": str(e)}), 400
