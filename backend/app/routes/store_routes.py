from flask import Blueprint, request, jsonify
from app.models.store_model import StoreData
from app.extensions import db

store_bp = Blueprint("stores", __name__)

@store_bp.route('/', methods=['GET'])
def get_stores():
    stores = StoreData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(stores),
        "data": [d.json() for d in stores]
    }), 200

@store_bp.route('/', methods=['POST'])
def create_store():
    data = request.get_json()
    store = StoreData(**data)
    db.session.add(store)
    db.session.commit()
    return jsonify({"message": "Created", "data": store.json()}), 201

@store_bp.route('/id/<string:id>', methods=['GET'])
def get_store_by_sk(id):
    store = StoreData.query.get(id)
    if not store:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": store.json()}), 200