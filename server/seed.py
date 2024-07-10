#!/usr/bin/env python3

import random
from faker import Faker
from app import app, db
from models import User, Event, Speaker, event_speakers
from werkzeug.security import generate_password_hash

fake = Faker()

def generate_phone_number():
    # Generate a random 10-digit phone number
    return ''.join(fake.random_choices(elements='0123456789', length=10))

def create_users(num_users=10):
    users = []
    for _ in range(num_users):
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            phone_number=generate_phone_number(),
            role=random.choice(['admin', 'attendee']),
            password_hash=generate_password_hash("password")
        )
        users.append(user)
        db.session.add(user)
    db.session.commit()
    return users

def create_events(users, num_events=50):
    events = []
    for _ in range(num_events):
        user = random.choice(users)
        event = Event(
            name=fake.sentence(nb_words=5),
            description=fake.text(max_nb_chars=200),
            location=fake.city(),
            start_time=fake.date_time_between(start_date='-1y', end_date='now'),
            end_time=fake.date_time_between(start_date='now', end_date='+1y'),
            created_by=user.user_id
        )
        events.append(event)
        db.session.add(event)
    db.session.commit()
    return events

def create_speakers(num_speakers=10):
    speakers = []
    for _ in range(num_speakers):
        speaker = Speaker(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            phone_number=generate_phone_number(),
            image=fake.image_url()
        )
        speakers.append(speaker)
        db.session.add(speaker)
    db.session.commit()
    return speakers

def create_event_speakers(events, speakers, num_event_speakers=100):
    for _ in range(num_event_speakers):
        event = random.choice(events)
        speaker = random.choice(speakers)
        stmt = event_speakers.insert().values(
            event_id=event.event_id,
            speaker_id=speaker.id,
            role=random.choice(['Keynote Speaker', 'Guest Speaker', 'Panelist'])
        )
        db.session.execute(stmt)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()

        users = create_users(10)
        events = create_events(users, 50)
        speakers = create_speakers(10)
        create_event_speakers(events, speakers, 100)

        print("Seeding complete!")
