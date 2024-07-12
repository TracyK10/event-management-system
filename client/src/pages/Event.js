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
      <div className="bg-white text-center w-full p-10 event-page">
        <h1 className="text-center text-4xl mb-4">{event.name}</h1>
        <p className="text-2xl mb-4">{event.description}</p>
        <p className="text-lg">Location: {event.location}</p>
        <p className="text-lg">Start Time: {new Date(event.start_time).toLocaleString()}</p>
        <p className="text-lg">End Time: {new Date(event.end_time).toLocaleString()}</p>
        <div className="m-2 my-9">
          <button className="py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200 bg-sky-800 text-white">
            Edit
          </button>
          <button className="py-2 px-5 rounded-2xl mx-3 ease-in-out duration-200 bg-sky-800 text-white">
            Delete
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Event;
