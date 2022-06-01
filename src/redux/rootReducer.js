import { combineReducers } from "redux";
import auth from './auth/reducer';
import course from './course/reducer';
import { LOGOUT_SUCCESS } from "./constants";
import config from './config/reducer';

 const appReducer = combineReducers({
  auth,
  course,
  config
});

// HERE, CLEAERING THE WHOLE STATE AS FRESH WHILE LOGGING OUT THE USER.
const makeRootReducer = (state, action) => {  
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default makeRootReducer;