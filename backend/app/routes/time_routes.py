from flask import Blueprint, request, jsonify
from app.models.time_model import TimeData
from app.extensions import db

time_bp = Blueprint("times", __name__)

@time_bp.route('/', methods=['GET'])
def get_times():
    times = TimeData.query.all()
    return jsonify({
        "message": "OK",
        "count": len(times),
        "data": [d.json() for d in times]
    }), 200

@time_bp.route('/', methods=['POST'])
def create_time():
    data = request.get_json()
    time = TimeData(**data)
    db.session.add(time)
    db.session.commit()
    return jsonify({"message": "Created", "data": time.json()}), 201

@time_bp.route('/id/<string:id>', methods=['GET'])
def get_time_by_sk(id):
    time = TimeData.query.get(id)
    if not time:
        return jsonify({"message": "Not Found"}), 404
    return jsonify({"message": "OK", "data": time.json()}), 200