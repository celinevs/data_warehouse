from flask import Blueprint, request, jsonify
from app.models.promo_cov_fact import PromotionCoverageFact
from app.models.sales_fact import SalesFact
from app.models.product_model import ProductData
from app.extensions import db
from sqlalchemy import and_

promo_cov_bp = Blueprint("promo-cov", __name__)

# GET promotion coverage table
@promo_cov_bp.route('/', methods=['GET'])
def get_promo_cov_table():
    items = PromotionCoverageFact.query.order_by(
        PromotionCoverageFact.coverage_id.asc()
    ).all()

    data = [i for i in items.json()]
    
    return jsonify({
        "message": "OK",
        "count": len(items),
        "data": data
    }), 200


# GET product that did not sold within promotion's date
@promo_cov_bp.route('/produk-tidak-laku', methods=['GET'])
def get_unsold_product():
    results = (
        db.session.query(PromotionCoverageFact, ProductData.nama_produk)
        .join(ProductData, PromotionCoverageFact.id_produk == ProductData.id_produk)
        .filter(
            ~db.session.query(SalesFact)
            .filter(
                SalesFact.tanggal_id == PromotionCoverageFact.tanggal_id,
                SalesFact.id_produk == PromotionCoverageFact.id_produk,
                SalesFact.id_toko == PromotionCoverageFact.id_toko,
                SalesFact.id_promosi == PromotionCoverageFact.id_promosi
            ).exists()
        )
        .order_by(PromotionCoverageFact.coverage_id.asc())
        .all()
    )

    if not results:
        return jsonify({"unsold_product": []}), 400

    data = [
        {
            "coverage_id": r[0].coverage_id, 
            "tanggal_id": r[0].tanggal_id,   
            "id_produk": r[0].id_produk, 
            "nama_produk": r[1],
            "id_toko": r[0].id_toko,
            "id_promosi": r[0].id_promosi
        } 
        for r in results
    ]

    return jsonify({
        "count": len(data),
        "unsold_product": data
    }), 200