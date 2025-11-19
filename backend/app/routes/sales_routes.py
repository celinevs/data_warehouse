from flask import Blueprint, request, jsonify
from app.models.sales_fact import SalesFact
from app.models.product_model import ProductData
from app.models.store_model import StoreData
from app.extensions import db

faktur_bp = Blueprint("fact-sales", __name__)

# GET all faktur
@faktur_bp.route('/', methods=['GET'])
def get_all_faktur():
    faktur_list = SalesFact.query.all()
    return jsonify({
        "message": "OK",
        "count": len(faktur_list),
        "data": [f.json() for f in faktur_list]
    }), 200

# GET by id_fakta_penjualan
@faktur_bp.route('/id/<int:id_fakta>', methods=['GET'])
def get_faktur_by_id(id_fakta):
    faktur = SalesFact.query.get(id_fakta)
    if not faktur:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": faktur.json()}), 200

# GET by tanggal_id
@faktur_bp.route('/tanggal/<string:tanggal_id>', methods=['GET'])
def get_faktur_by_tanggal(tanggal_id):
    faktur = SalesFact.query.filter_by(tanggal_id=tanggal_id)
    if not faktur:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": faktur.json()}), 200

# GET by id_waktu
@faktur_bp.route('/waktu/<string:id_waktu>', methods=['GET'])
def get_faktur_by_waktu(id_waktu):
    faktur_list = SalesFact.query.filter_by(id_waktu=id_waktu).all()
    if not faktur_list:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [f.json() for f in faktur_list]}), 200

# GET by id_produk
@faktur_bp.route('/produk/<string:id_produk>', methods=['GET'])
def get_faktur_by_produk(id_produk):
    faktur_list = SalesFact.query.filter_by(id_produk=id_produk).all()
    if not faktur_list:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [f.json() for f in faktur_list]}), 200

# GET by id_toko
@faktur_bp.route('/toko/<string:id_toko>', methods=['GET'])
def get_faktur_by_toko(id_toko):
    faktur_list = SalesFact.query.filter_by(id_toko=id_toko).all()
    if not faktur_list:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [f.json() for f in faktur_list]}), 200


# GET by id_promosi
@faktur_bp.route('/promosi/<string:id_promosi>', methods=['GET'])
def get_faktur_by_promosi(id_promosi):
    faktur_list = SalesFact.query.filter_by(id_promosi=id_promosi).all()
    if not faktur_list:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [f.json() for f in faktur_list]}), 200

# GET by id_kasir
@faktur_bp.route('/kasir/<string:id_kasir>', methods=['GET'])
def get_faktur_by_kasir(id_kasir):
    faktur_list = SalesFact.query.filter_by(id_kasir=id_kasir).all()
    if not faktur_list:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": [f.json() for f in faktur_list]}), 200

# GET by metode_pembayaran_sk
@faktur_bp.route('/sk/<int:sk>', methods=['GET'])
def get_faktur_by_sk(sk):
    faktur = SalesFact.query.filter_by(metode_pembayaran_sk=sk).all()
    if not faktur:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": faktur.json()}), 200

# GET by nomor struk
@faktur_bp.route('/struk/<string:struk>', methods=['GET'])
def get_faktur_by_struk(struk):
    faktur = SalesFact.query.filter_by(nomor_struk=struk).all()
    if not faktur:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": faktur.json()}), 200

# GET store's gross margin by product by date
@faktur_bp.route('/penjualan/toko-produk', Methods=['GET'])
def get_toko_by_product_and_date():
    id_produk = request.args.get('id_produk')
    tanggal_mulai = request.args.get('start')
    tanggal_akhir = request.args.get('end')

    if not id_produk or not tanggal_mulai or not tanggal_akhir:
        return jsonify({"error": "Harus ada produk_id, tanggal mulai, dan tanggal akhir"}), 400
    
    results = (
        db.session.query(
            StoreData.id_toko, 
            StoreData.nama_toko, 
            db.func.sum((SalesFact.harga_satuan_jual - SalesFact.harga_satuan_beli) * SalesFact.jumlah_penjualan)
            .label("gross_margin")
        )
        .join(StoreData, SalesFact.id_toko == StoreData.id_toko)
        .filter(SalesFact.id_produk == id_produk)
        .filter(SalesFact.tanggal_id.between(tanggal_mulai, tanggal_akhir))
        .group_by(StoreData.id_toko, StoreData.nama_toko)
        .all()
    )

    data = [
        {
            "id_toko": r.id_toko,
            "nama_toko": r.nama_toko,
            "gross_margin": float(r.gross_margin or 0)
        } 
        for r in results
    ]

    return jsonify({
        "id_produk": id_produk, 
        "tanggal_mulai": tanggal_mulai, 
        "tanggal_akhir": tanggal_akhir, 
        "gross_margin_per_toko": data
    }), 200

# POST create new faktur
@faktur_bp.route('/', methods=['POST'])
def create_faktur():
    data = request.get_json()
    try:
        faktur = SalesFact(**data)
        db.session.add(faktur)
        db.session.commit()
        return jsonify({"message": "Created", "data": faktur.json()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error", "error": str(e)}), 400
