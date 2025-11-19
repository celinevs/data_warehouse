from flask import Flask
from app.extensions import db, cors
from app.routes.date_routes import date_bp
from app.routes.payment_method_routes import payment_method_bp
from app.routes.cashier_routes import cashier_bp
from app.routes.promotion_routes import promotion_bp
from app.routes.product_routes import product_bp
from app.routes.store_routes import store_bp
from app.routes.time_routes import time_bp
from app.routes.sales_routes import faktur_bp
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
    app.register_blueprint(promotion_bp, url_prefix="/api/flask/promotions")
    app.register_blueprint(product_bp, url_prefix="/api/flask/products")
    app.register_blueprint(store_bp, url_prefix="/api/flask/stores")
    app.register_blueprint(time_bp, url_prefix="/api/flask/times")
    app.register_blueprint(faktur_bp, url_prefix="/api/flask/fact-sales")

    # create tables
    with app.app_context():
        db.create_all()
    
    return app

