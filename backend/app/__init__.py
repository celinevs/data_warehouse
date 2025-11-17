from flask import Flask
from app.extensions import db, cors
from app.routes.date_routes import date_bp
from app.routes.payment_method_routes import payment_method_bp
from app.routes.cashier_routes import cashier_bp
from os import environ

def create_app():
    app = Flask(__name__)

    # config
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')

    # init extensions
    cors.init_app(app)
    db.init_app(app)

    # register blueprints
    app.register_blueprint(date_bp, url_prefix="/api/flask/dates")
    app.register_blueprint(payment_method_bp, url_prefix="/api/flask/payment-methods")
    app.register_blueprint(cashier_bp, url_prefix="/api/flask/cashiers")

    # create tables
    with app.app_context():
        db.create_all()
    
    return app

