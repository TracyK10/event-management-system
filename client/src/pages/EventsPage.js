import React, { useEffect, useState } from 'react'
// import EventCard from '../components/EventCard'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import EventCard from '../components/EventCard'

function EventsPage() {
  const [event, setEvent] = useState([])

  useEffect(() => {
    fetch('url')
      .then((res) => res.json())
      .then((data) => {
        setEvent(data)
      })
  }, [])

  return (
    <div>
      <NavBar />
      <h1 className="text-center text-white text-5xl p-10">My events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols
      -3 gap-4 p-10">
        {event.map((event) => (
            <EventCard key={event.id} event={event}/>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default EventsPage
