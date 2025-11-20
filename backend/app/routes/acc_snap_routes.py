from flask import Blueprint, request, jsonify
from app.models.acc_snapshot import AccumulatingSnapshotData
from app.extensions import db

acc_snap_bp = Blueprint("acc-snapshot", __name__)

# GET all
@acc_snap_bp.route('/', methods=['GET'])
def get_all_acc_snap():
    items = AccumulatingSnapshotData.query.all()
    data = [
        {
            "nomor_penerimaan_barang": res.nomor_penerimaan_barang,
            "key_tanggal_terima": res.key_tanggal_terima, 
            "key_tanggal_inspeksi": res.key_tanggal_inspeksi,
            "tanggal_penempatan": res.key_tanggal_inspeksi
        }
        for res in items
    ]
    return jsonify({
        "message": "OK",
        "count": len(items),
        "data": data
    }), 200


# GET by nomor_acc_snap_barang (PK)
@acc_snap_bp.route('/id/<string:nomor>', methods=['GET'])
def get_acc_snap_by_id(nomor):
    item = AccumulatingSnapshotData.query.get(nomor)
    if not item:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": item.json()}), 200


# GET by key_tanggal_terima
@acc_snap_bp.route('/terima/<string:tanggal>', methods=['GET'])
def get_acc_snap_by_terima(tanggal):
    items = AccumulatingSnapshotData.query.filter_by(key_tanggal_terima=tanggal).all()
    if not items:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [i.json() for i in items]}), 200


# GET by key_tanggal_inspeksi
@acc_snap_bp.route('/inspeksi/<string:tanggal>', methods=['GET'])
def get_acc_snap_by_inspeksi(tanggal):
    items = AccumulatingSnapshotData.query.filter_by(key_tanggal_inspeksi=tanggal).all()
    if not items:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [i.json() for i in items]}), 200


# GET by tanggal_penempatan
@acc_snap_bp.route('/penempatan/<string:tanggal>', methods=['GET'])
def get_acc_snap_by_penempatan(tanggal):
    items = AccumulatingSnapshotData.query.filter_by(tanggal_penempatan=tanggal).all()
    if not items:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [i.json() for i in items]}), 200


# PUT update key_tanggal_inspeksi
@acc_snap_bp.route('/update-key-inspeksi/<string:nomor_penerimaan>', methods=['PUT'])
def update_tanggal_inspeksi(nomor_penerimaan):
    item = AccumulatingSnapshotData.query.get(nomor_penerimaan)

    if not item:
        return jsonify({"message": "Not Found"}), 404
    
    data = request.get_json()
    updated = False

    if item.key_tanggal_inspeksi is None and "key_tanggal_inspeksi" in data:
        item.key_tanggal_inspeksi = data["key_tanggal_inspeksi"]
        updated = True

    if not updated:
        return jsonify({
            "message": "No fields updated (already filled or missing input)"
        }), 400
    
    try:
        db.session.commit()
        return jsonify({
            "message": "Updated",
            "data": item.json()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error", "error": str(e)}), 400

# PUT update tanggal_penempatan
@acc_snap_bp.route('/update-key-penempatan/<string:nomor_penerimaan>', methods=['PUT'])
def update_tanggal_penempatan(nomor_penerimaan):
    item = AccumulatingSnapshotData.query.get(nomor_penerimaan)

    if not item:
        return jsonify({"message": "Not Found"}), 404
    
    data = request.get_json()
    updated = False

    if item.tanggal_penempatan is None and "tanggal_penempatan" in data:
        item.tanggal_penempatan = data["tanggal_penempatan"]
        updated = True

    if not updated:
        return jsonify({
            "message": "No fields updated (already filled or missing input)"
        }), 400
    
    try:
        db.session.commit()
        return jsonify({
            "message": "Updated",
            "data": item.json()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error", "error": str(e)}), 400

# POST create new record
@acc_snap_bp.route('/', methods=['POST'])
def create_acc_snap():
    data = request.get_json()
    try:
        item = AccumulatingSnapshotData(**data)
        db.session.add(item)
        db.session.commit()
        return jsonify({"message": "Created", "data": item.json()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error", "error": str(e)}), 400
