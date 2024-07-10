from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!
class Speaker(db.Model, SerializerMixin):
    __tablename__ = 'speakers'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    phone_number = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(80), nullable=True)
    
    # Relationship with Event model
    events = db.relationship('Event', back_populates='speaker', cascade='all, delete-orphan')

    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError('First name is required')
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name:
            raise ValueError('Last name is required')
        return last_name
    
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('Invalid email address')
        return address
    
    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        if len(phone_number) != 10 or not phone_number.isdigit():
            raise ValueError('Phone number must be 10 digits long')
        return phone_number

    def __repr__(self):
        return f'<Speaker {self.first_name} {self.last_name}>'

