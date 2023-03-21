import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./EventForm.css";
import EventsForm from "./EventsForm";
import EventsList from "./EventsList";
import helperFxn from "../reducers/helper";
import { fetchEvent } from "../actions/index";
import { useNavigate, useLocation } from "react-router-dom";

const EventForm = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const email = sessionStorage.getItem("email");
  const [eventsList, setEventsList] = useState([]);
  const [checkFile, setCheckFile] = useState(false);
  const [eventId, setEventId] = useState(0);
  const dispatch = useDispatch();

  let newEvent = useSelector((state) => state.event);
  const getEvents = async () => {
    let data = await helperFxn.getFromDB().then((d) => d);
    setEventId(data[data.length - 1]?.id);
    dispatch(fetchEvent(data));
  };
  useEffect(() => {
    if (newEvent.events.length === 0 && checkFile === false) {
      getEvents();
      setCheckFile(true);
    } else {
      setEventId(newEvent.events[newEvent.events.length - 1]?.id);
      setEventsList(newEvent.events);
      setCheckFile(true);
    }
    // eslint-disable-next-line
  }, [newEvent]);

  useEffect(() => {
    if (location.state && location.state.clearData) {
      // Clear the component data
      navigate("/", { state: { clearData: true } });
      setEventsList([]);
      setEventId(0);
      sessionStorage.clear();
    }
    // eslint-disable-next-line
  }, [location.state]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h1>Hi {email}, Login Successful</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className="event-table">
        <h3>List of Events</h3>
        <EventsList newEvent={eventsList} email={email} />
        <EventsForm email={email} eventsLength={eventId} />
      </div>
    </div>
  );
};

export default EventForm;
