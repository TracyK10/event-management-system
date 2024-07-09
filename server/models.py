from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy.orm import validates
from config import db
import pytz

def utcnow():
    return datetime.now(pytz.utc)

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    event_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(200), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=utcnow, onupdate=utcnow)

    # Relationship with User model
    organizer = db.relationship('User', back_populates='events')

    # Relationship with Speaker model
    speakers = db.relationship('Speaker', secondary='event_speakers', back_populates='events')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Event name is required')
        return name

    @validates('location')
    def validate_location(self, key, location):
        if not location:
            raise ValueError('Event location is required')
        return location

    @validates('start_time', 'end_time')
    def validate_time(self, key, time):
        if not time:
            raise ValueError(f'{key} is required')
        return time

    def __repr__(self):
        return f'<Event {self.name}>'

# Association table for many-to-many relationship between Event and Speaker
event_speakers = db.Table('event_speakers',
    db.Column('event_id', db.Integer, db.ForeignKey('events.event_id'), primary_key=True),
    db.Column('speaker_id', db.Integer, db.ForeignKey('speakers.id'), primary_key=True),
    db.Column('role', db.String(50), nullable=False)  # User submittable attribute
)