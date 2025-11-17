from flask import Blueprint, request, jsonify
from app.models.promotion_model import PromotionData
from app.extensions import db

promotion_bp = Blueprint("promotions", __name__)

@promotion_bp.route('/', methods=['GET'])
def get_promotions():
    promotions = PromotionData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(promotions),
        "data": [d.json() for d in promotions]
    }), 200

@promotion_bp.route('/', methods=['POST'])
def create_promotion():
    data = request.get_json()
    promotion = PromotionData(**data)
    db.session.add(promotion)
    db.session.commit()
    return jsonify({"message": "Created", "data": promotion.json()}), 201

@promotion_bp.route('/id/<string:id>', methods=['GET'])
def get_promotion_by_sk(id):
    promotion = PromotionData.query.get(id)
    if not promotion:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": promotion.json()}), 200