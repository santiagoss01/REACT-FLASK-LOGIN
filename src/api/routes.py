"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter(User.email == email, User.password == password, User.is_active == True).first() 
    if user:
        access_token = create_access_token(identity=email)
        return jsonify(access_token = access_token)
        
    return jsonify({"msg": "Bad email or password"}), 40


@api.route("/private", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter(User.email == current_user).first()
    return jsonify(user.serialize()), 200

@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.get_json()
    user = User(email = request_body['email'],
                password = request_body['password'],
                is_active = True,
                )
    db.session.add(user)
    db.session.commit()
    return jsonify(request_body), 200



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200