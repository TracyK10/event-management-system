import React from 'react'
// import EventCard from '../components/EventCard'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

function EventsPage() {
  return (
    <div>
      <NavBar />
      <h1 className="text-center text-white text-5xl p-10">My events</h1>
      {/* <EventCard /> */}
      <Footer />
    </div>
  )
}

export default EventsPage
