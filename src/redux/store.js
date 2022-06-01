import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import logger from 'redux-logger';

const middleware = [];
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

//logger to log the firing actions
middleware.push(sagaMiddleware);
if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

// mount it on the Store
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

// then run the saga
sagaMiddleware.run(rootSaga);
// render the application
