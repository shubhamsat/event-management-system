import eventsReducer from "./events";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  event: eventsReducer,
});

export default rootReducer;
