from flask import Blueprint, request, jsonify
from app.models.promo_cov_fact import PromotionCoverageFact
from app.models.sales_fact import SalesFact
from app.extensions import db
from sqlalchemy import and_

promo_cov_bp = Blueprint("promo-cov", __name__)

# GET product that did not sold within promotion's date
@promo_cov_bp.route('/produk-tidak-laku', methods=['GET'])
def get_unsold_product():
    results = (
        db.session.query(PromotionCoverageFact)
        .outerjoin(
            SalesFact, 
            and_(
                PromotionCoverageFact.tanggal_id == SalesFact.tanggal_id, 
                PromotionCoverageFact.id_produk == SalesFact.id_produk, 
                PromotionCoverageFact.id_toko == SalesFact.id_toko, 
                PromotionCoverageFact.id_promosi == SalesFact.id_promosi
            )
        )
        .filter(SalesFact.id_fakta_penjualan == None)
        .all()
    )

    if not results:
        return jsonify({"unsold_product": []}), 400

    data = [
        {
            "coverage_id": r.coverage_id, 
            "tanggal_id": r.tanggal_id,   
            "id_produk": r.id_produk, 
            "id_toko": r.id_toko,
            "id_promosi": r.id_promosi
        } 
        for r in results
    ]

    return jsonify({
        "unsold_product": data
    }), 200