#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import datetime
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from werkzeug.security import generate_password_hash

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
db.init_app(app)
migrate = Migrate(app, db)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

# Add your model imports
from models import User, Event, Speaker

# Views go here!

@app.route('/')
def index():
    return '<h1>Hello! Welcome to our event management app.</h1>'

# users' views
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)

    elif request.method == 'POST':
        data = request.get_json()
        password_hash = generate_password_hash(data.get('password'))
        new_user = User(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            phone_number=data.get('phone_number'),
            role=data.get('role'),
            password_hash=password_hash
        )
        db.session.add(new_user)
        db.session.commit()

        user_dict = new_user.to_dict()
        return make_response(jsonify(user_dict), 201)

@app.route('/users/<int:user_id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(user_id):
    user = User.query.filter(User.id == user_id).first()

    if user is None:
        response_body = {"message": "User not found. Please try again."}
        return make_response(jsonify(response_body), 404)
    
    if request.method == 'GET':
        return make_response(jsonify(user.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            if key == 'password':
                user.set_password(value)
            else:
                setattr(user, key, value)

        db.session.commit()
        return make_response(jsonify(user.to_dict()), 200)

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body = {"delete_successful": True, "message": "User deleted successfully."}
        return make_response(jsonify(response_body), 200)


# events views
@app.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        events = [event.to_dict() for event in Event.query.all()]
        return make_response(jsonify(events), 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_event = Event(
            name=data.get("name"),
            description=data.get("description"),
            location=data.get("location"),
            start_time=data.get("start_time"),
            end_time=data.get("end_time"),
            created_by=data.get("created_by")
        )
        db.session.add(new_event)
        db.session.commit()
        return make_response(jsonify(new_event.to_dict()), 201)

@app.route('/events/<int:event_id>', methods=['GET', 'PATCH', 'DELETE'])
def event_by_id(event_id):
    event = Event.query.filter(Event.id == event_id).first()

    if event is None:
        response_body = {"message": "This event does not exist. Please try again."}
        return make_response(jsonify(response_body), 404)
    
    if request.method == 'GET':
        return make_response(jsonify(event.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(event, key, value)

        db.session.commit()
        return make_response(jsonify(event.to_dict()), 200)

    elif request.method == 'DELETE':
        db.session.delete(event)
        db.session.commit()
        response_body = {"delete_successful": True, "message": "Event deleted successfully."}
        return make_response(jsonify(response_body), 200)
    
# views for speakers
@app.route('/speakers', methods=['GET', 'POST'])
def speakers():
    if request.method == 'GET':
        speakers = [speaker.to_dict() for speaker in Speaker.query.all()]
        return make_response(jsonify(speakers), 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_speaker = Speaker(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            phone_number=data.get("phone_number"),
            image=data.get("image")
        )
        db.session.add(new_speaker)
        db.session.commit()
        return make_response(jsonify(new_speaker.to_dict()), 201)

@app.route('/speakers/<int:speaker_id>', methods=['GET', 'PATCH', 'DELETE'])
def speaker_by_id(speaker_id):
    speaker = Speaker.query.filter(Speaker.id == speaker_id).first()

    if speaker is None:
        response_body = {"message": "This speaker does not exist. Please try again."}
        return make_response(jsonify(response_body), 404)
    
    if request.method == 'GET':
        return make_response(jsonify(speaker.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(speaker, key, value)

        db.session.commit()
        return make_response(jsonify(speaker.to_dict()), 200)

    elif request.method == 'DELETE':
        db.session.delete(speaker)
        db.session.commit()
        response_body = {"delete_successful": True, "message": "Speaker deleted successfully."}
        return make_response(jsonify(response_body), 200)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
