"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route("/login", methods =['POST'])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    #Reemplazar la logica consultando la DB. 
    user = db.session.execute(db.select(User).where(User.email == email)).scalar()
    print(user)
    if user and password == user.password and user.is_active: 
        access_token = create_access_token ( identity= [user.email, user.username, user.name])
        response_body['access_token'] = access_token
        response_body['message'] = "User logged sucesfully!"
        response_body['results'] = user.serialize()
        return response_body, 200
    else:
        response_body['message'] = "Quieto parao!"
    return response_body, 400


# Api signup + login + private
@api.route('/signup', methods=['POST'])
def signup():
     response_body = {}
     data = request.json
     user = User( email=data['email'],
                  name=data['name'],
                  password=data['password'],
                  username=data['username'],
                  is_active=True)
     db.session.add(user)
     db.session.commit()
     response_body['message'] = 'User created successfully!'
     return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200