from flask import Blueprint, request, jsonify
from app.models.promo_cov_fact import PromotionCoverageFact
from app.extensions import db

promo_cov_bp = Blueprint("promo-cov", __name__)

# GET all faktur
@promo_cov_bp.route('/', methods=['GET'])
def get_all_promo_cov():
    faktur_list = PromotionCoverageFact.query.all()
    return jsonify({
        "message": "OK",
        "count": len(faktur_list),
        "data": [f.json() for f in faktur_list]
    }), 200
