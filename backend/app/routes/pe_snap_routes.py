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
@pe_snap_bp.route('/hitung/jumlah-stok', methods=['GET'])
def get_jumlah_stok():
    id_produk = request.args.get('id_produk')
    id_toko = request.args.get('id_toko')
    tanggal_mulai = request.args.get('start')
    tanggal_akhir = request.args.get('end')

    # base query

    if not id_produk or not id_toko or not tanggal_mulai or not tanggal_akhir:
        return jsonify({"error": "Harus ada produk_id, tanggal mulai, dan tanggal akhir"}), 400


    # filter by produk
    results = (
        db.session.query(
            StoreData.id_toko,
            StoreData.nama_toko,
            PeriodicSnapshotData.jumlah_stok,
            PeriodicSnapshotData.tanggal_id,
            DateData.tanggal
        )
        .join(StoreData, PeriodicSnapshotData.id_toko == StoreData.id_toko)
        .join(DateData, PeriodicSnapshotData.tanggal_id == DateData.tanggal_id)
        .filter(PeriodicSnapshotData.id_produk == id_produk)
        .filter(PeriodicSnapshotData.id_toko == id_toko)
        .filter(PeriodicSnapshotData.tanggal_id.between(tanggal_mulai, tanggal_akhir))
        .order_by(PeriodicSnapshotData.tanggal_id.asc())
        .all()
    )

    data = [
        {
            "tanggal_id": r.tanggal_id,
            "tanggal": r.tanggal,
            "jumlah_stok": int(r.jumlah_stok), 
            "id_toko": r.id_toko, 
            "nama_toko": r.nama_toko
        } 

        for r in results
    ]

    return jsonify({
        "id_produk": id_produk, 
        "id_toko": id_toko,
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
