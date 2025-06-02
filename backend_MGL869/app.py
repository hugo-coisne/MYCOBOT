from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from APIS.mushroom_api import mushroom_namespace

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    api = Api(
        app,
        version="1.0",
        title="MycoBot Backend Server",
        description="API de prédiction pour les champignons"
    )

    api.add_namespace(mushroom_namespace)

    return app

if __name__ == "__main__":
    app = create_app()
    
    app.run(debug=True)
