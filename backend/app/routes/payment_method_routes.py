from flask import Blueprint, request, jsonify
from app.models.payment_method_model import PaymentMethodData
from app.extensions import db

payment_method_bp = Blueprint("payment-methods", __name__)

@payment_method_bp.route('/', methods=['GET'])
def get_payment_methods():
    payment_methods = PaymentMethodData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(payment_methods),
        "data": [d.json() for d in payment_methods]
    }), 200

@payment_method_bp.route('/', methods=['POST'])
def create_payment_method():
    data = request.get_json()
    payment_method = PaymentMethodData(**data)
    db.session.add(payment_method)
    db.session.commit()
    return jsonify({"message": "Created", "data": payment_method.json()}), 201

@payment_method_bp.route('/sk/<int:sk>', methods=['GET'])
def get_payment_method_by_sk(sk):
    payment_method = PaymentMethodData.query.get(sk)
    if not payment_method:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": payment_method.json()}), 200

@payment_method_bp.route('/bk/<string:bk>', methods=['GET'])
def get_payment_method_by_business_key(bk):
    payment_method = PaymentMethodData.query.filter_by(metode_pembayaran_id=bk).first()

    if not payment_method:
        return jsonify({"message": "Not Found"}), 404

    return jsonify({"message": "OK", "data": payment_method.json()}), 200
