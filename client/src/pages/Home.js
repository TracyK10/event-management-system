import React from 'react'
import NavBar from '../components/NavBar'
import '../index.css'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <NavBar />
      <div className="flex hero-section">
        <div class=" py-40 pl-8">
          <div class="text-6xl">Welcome to your event management system</div>
          <p class="py-3 text-lg">
            Organize, manage, and track your events effortlessly with our
            intuitive platform. From start to finish, we've got you covered to
            ensure a seamless event experience.
          </p>
        </div>
      </div>
      <div className="browse-section">
        <section className="content">
          <h1>Ready to look around?</h1>
          <div className="m-2 my-9">
            <Link to="/events">
              <button class="py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200">
                Browse events
              </button>
            </Link>
            <Link to="/event-form">
              <button class=" py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200">
                Create event
              </button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home
