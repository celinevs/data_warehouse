from flask import Blueprint, request, jsonify
from app.models.product_model import ProductData
from app.extensions import db

product_bp = Blueprint("products", __name__)

@product_bp.route('/', methods=['GET'])
def get_products():
    products = ProductData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(products),
        "data": [d.json() for d in products]
    }), 200

@product_bp.route('/', methods=['POST'])
def create_product():
    data = request.get_json()
    product = ProductData(**data)
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Created", "data": product.json()}), 201

@product_bp.route('/id/<string:id>', methods=['GET'])
def get_product_by_sk(id):
    product = ProductData.query.get(id)
    if not product:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": product.json()}), 200