import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div>
        <h1 className="text-center">{event.name}</h1>
        <p>{event.description}</p>
        <p>Location: {event.location}</p>
        <p>Start Time: {new Date(event.start_time).toLocaleString()}</p>
        <p>End Time: {new Date(event.end_time).toLocaleString()}</p>
      </div>
      <Footer />
    </>
  );
}

export default Event;
