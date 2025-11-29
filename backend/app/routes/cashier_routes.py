from flask import Blueprint, request, jsonify
from app.models.cashier_model import CashierData
from app.extensions import db

cashier_bp = Blueprint("cashiers", __name__)

@cashier_bp.route('/', methods=['GET'])
def get_cashiers():
    cashiers = CashierData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(cashiers),
        "data": [d.json() for d in cashiers]
    }), 200

@cashier_bp.route('/', methods=['POST'])
def create_cashier():
    data = request.get_json()
    cashier = CashierData(**data)
    db.session.add(cashier)
    db.session.commit()
    return jsonify({"message": "Created", "data": cashier.json()}), 201

@cashier_bp.route('/id/<string:id>', methods=['GET'])
def get_cashier_by_sk(id):
    cashier = CashierData.query.get(id)
    if not cashier:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": cashier.json()}), 200