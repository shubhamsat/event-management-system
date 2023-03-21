import axios from "axios";

const saveToDB = (event) => {
  axios.post("http://localhost:4000/events", event);
};

const getFromDB = async () => {
  const data = await axios
    .get("http://localhost:4000/events")
    .then((events) => events.data);
  return data;
};

const deleteEvent = async (id) => {
  axios.delete(`http://localhost:4000/events/${id}`);
};

const updateEvent = async (event) => {
  axios.put(`http://localhost:4000/events/${event.id}`, event);
};

const helperFxn = { saveToDB, getFromDB, deleteEvent, updateEvent };

export default helperFxn;
