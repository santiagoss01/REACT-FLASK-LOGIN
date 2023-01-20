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
    user = User.query.filter(User.email== email, User.password == password, User.is_active == True).first() 
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    
    response_body = { "email": email,
                      "access token": access_token}

    return jsonify(access_token=access_token)

@api.route("/private", methods=["GET"])
@jwt_required() 
def protected():
# Access the identity of the current user with get jwt identity
  current_user = get_jwt_identity ()
  response_body = {"email": current_user,
                   "message": "loggin ok"}
  return jsonify (response_body), 200



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200