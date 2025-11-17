from flask import Blueprint, request, jsonify
from app.models.date_model import DateData
from app.extensions import db

date_bp = Blueprint("dates", __name__)

@date_bp.route('/', methods=['GET'])
def get_dates():
    dates = DateData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(dates),
        "data": [d.json() for d in dates]
    }), 200

@date_bp.route('/', methods=['POST'])
def create_date():
    data = request.get_json()
    date = DateData(**data)
    db.session.add(date)
    db.session.commit()
    return jsonify({"message": "Created", "data": date.json()}), 201
