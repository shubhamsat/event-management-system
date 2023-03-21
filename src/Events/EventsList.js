import React from "react";
import "./EventForm.css";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../actions/index";
import { editEventStart } from "../actions/index";

const EventsList = (props) => {
  const dispatch = useDispatch();
  const data =
    props.newEvent.length > 0
      ? props.newEvent.filter((item) => item.user_id === props.email)
      : [];

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  const handleEdit = (event) => {
    dispatch(editEventStart(event));
  };

  return (
    <div className="listOfEvents">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((event) => {
              return (
                <tr
                  key={event.id}
                  style={
                    event.bookingType === "premium"
                      ? { border: "2px solid #b4993f" }
                      : {}
                  }
                >
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.price}</td>
                  <td>{event.description}</td>
                  <td>
                    <button onClick={() => handleEdit(event)}>Edit</button>
                    <button onClick={() => handleDelete(event.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EventsList;
