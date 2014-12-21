from flask import Flask
from flask.ext.mail import Mail
from flask.ext.sqlalchemy import SQLAlchemy
from config import config
from flask.ext.cache import Cache
from os import path

app = Flask(__name__)

mail = Mail()
db = SQLAlchemy()
cache = Cache()

def create_app(config_name):

    app = Flask(__name__)

    app.config.from_pyfile(path.join(path.abspath(path.dirname(__file__)), 'app.cfg'))
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)
    mail.init_app(app)
    db.init_app(app)

    cache.init_app(app)

    from .main import main as main_blueprint

    # TODO: You can register blueprints here

    app.register_blueprint(main_blueprint)
    return app
