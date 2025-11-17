from flask import Blueprint, request, jsonify
from app.models.cashier_model import CashierData
from app.extensions import db

payment_method_bp = Blueprint("cashiers", __name__)

@payment_method_bp.route('/', methods=['GET'])
def get_payment_methods():
    payment_methods = CashierData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(payment_methods),
        "data": [d.json() for d in payment_methods]
    }), 200

@payment_method_bp.route('/', methods=['POST'])
def create_payment_method():
    data = request.get_json()
    cashier = CashierData(**data)
    db.session.add(cashier)
    db.session.commit()
    return jsonify({"message": "Created", "data": cashier.json()}), 201

@payment_method_bp.route('/id/<string:id>', methods=['GET'])
def get_payment_method_by_sk(id):
    payment_method = CashierData.query.get(id)
    if not payment_method:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": payment_method.json()}), 200