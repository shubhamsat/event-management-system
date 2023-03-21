export const createEvent = (newEvent) => {
  return {
    type: "CREATE_EVENT",
    payload: newEvent,
  };
};

export const saveEvent = (newEvent) => {
  return {
    type: "SAVE_EVENT",
    payload: newEvent,
  };
};

export const fetchEvent = (event) => {
  return {
    type: "FETCH_EVENT",
    payload: event,
  };
};

export const editEventStart = (event) => {
  return {
    type: "EVENT_TO_EDIT",
    payload: event,
  };
};

export const editEventEnd = (event) => {
  return {
    type: "EDIT_EVENT",
    payload: event,
  };
};

export const deleteEvent = (event) => {
  return {
    type: "DELETE_EVENT",
    payload: event,
  };
};
