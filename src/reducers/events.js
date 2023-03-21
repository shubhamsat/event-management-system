import helperFxn from "./helper";
const initialState = {
  events: [],
  eventToEdit: {},
  editEvent: false,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      helperFxn.saveToDB(action.payload);
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "FETCH_EVENT":
      return {
        ...state,
        events: action.payload,
      };
    case "DELETE_EVENT":
      helperFxn.deleteEvent(action.payload);
      const requireEvents = state.events.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        events: requireEvents,
      };
    case "EDIT_EVENT":
      const updatedList = state.events.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return {
        ...state,
        events: updatedList,
        editEvent: false,
        eventToEdit: {},
      };

    case "EVENT_TO_EDIT":
      return {
        ...state,
        editEvent: true,
        eventToEdit: action.payload,
      };

    default:
      return state;
  }
};

export default eventsReducer;
