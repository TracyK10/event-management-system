#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker
from werkzeug.security import generate_password_hash

# Local imports
from app import app
from models import db, User, Event, Speaker, event_speakers

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()

        # Create users
        users = []
        for _ in range(5):
            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                password_hash=generate_password_hash(fake.password()),
                phone_number=fake.phone_number()[:10].replace('-', ''),
                role=rc(['organizer', 'attendee'])
            )
            users.append(user)
            db.session.add(user)
        
        db.session.commit()

        # Create speakers
        speakers = []
        for _ in range(10):
            speaker = Speaker(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                phone_number=fake.phone_number()[:10].replace('-', ''),
                image=fake.image_url()
            )
            speakers.append(speaker)
            db.session.add(speaker)

        db.session.commit()

        # Create events
        events = []
        for _ in range(5):
            event = Event(
                name=fake.catch_phrase(),
                description=fake.text(),
                location=fake.address(),
                start_time=fake.date_time_between(start_date='now', end_date='+30d'),
                end_time=fake.date_time_between(start_date='+30d', end_date='+60d'),
                created_by=rc(users).user_id
            )
            events.append(event)
            db.session.add(event)

        db.session.commit()

        # Add speakers to events
        for event in events:
            num_speakers = randint(1, 4)
            selected_speakers = rc(speakers, k=num_speakers)
            for speaker in selected_speakers:
                db.session.execute(event_speakers.insert().values(
                    event_id=event.event_id,
                    speaker_id=speaker.id,
                    role=fake.job()
                ))

        db.session.commit()

        print("Database seeded successfully.")
