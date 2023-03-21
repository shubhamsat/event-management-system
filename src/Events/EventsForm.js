import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, editEventEnd } from "../actions/index";
import helperFxn from "../reducers/helper";
// import axios from "axios";

const EventsForm = (props) => {
  const [formData, setFormData] = useState({
    id: null,
    user_id: "",
    name: "",
    date: "",
    description: "",
    price: "",
    bookingType: "",
    termsAccepted: false,
  });
  let eventToEdit = useSelector((state) => state.event.eventToEdit);
  let editing = useSelector((state) => state.event.editEvent);

  useEffect(() => {
    if (editing === true) {
      setFormData({ ...eventToEdit, termsAccepted: false });
    }
    // eslint-disable-next-line
  }, [editing]);

  const setDefaultFormData = () => {
    setFormData({
      id: null,
      user_id: "",
      name: "",
      date: "",
      description: "",
      price: "",
      bookingType: "",
      termsAccepted: false,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing === true) {
      dispatch(editEventEnd(formData));
      helperFxn.updateEvent(formData);
      setDefaultFormData();
    } else {
      const newEvent = {
        id: props.eventsLength + 1,
        user_id: props.email,
        name: formData.name,
        date: formData.date,
        description: formData.description,
        price: formData.price,
        bookingType: formData.bookingType,
        termsAccepted: formData.termsAccepted,
      };
      if (formData.termsAccepted === true) {
        dispatch(createEvent(newEvent));
        setDefaultFormData();
      } else {
        alert("please accept terms.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="events-form">
      <form onSubmit={handleSubmit}>
        <h3>{editing ? "Update" : "Create a new"} Event</h3>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Event Date:</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Event Description:</label>
          <textarea
            name="description"
            rows="7"
            cols="30"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Event Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            min="1"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group radio-btn">
          <input
            type="radio"
            id="premium"
            name="bookingType"
            value="premium"
            checked={formData.bookingType === "premium"}
            onChange={handleChange}
          />
          <label htmlFor="premium">Premium</label>
          <input
            type="radio"
            id="normal"
            name="bookingType"
            value="normal"
            checked={formData.bookingType === "normal"}
            onChange={handleChange}
          />
          <label htmlFor="normal">Normal</label>
        </div>
        <div className="form-group terms">
          <input
            type="checkbox"
            id="acceptTerms"
            name="termsAccepted"
            value={formData.termsAccepted}
            onChange={handleChange}
          />
          <label htmlFor="acceptTerms"> I accept the terms & conditions</label>
        </div>

        <button className="create-event" type="submit">
          {editing ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventsForm;
