import * as actions from "../actions";
import fireAjax from "../../services";
import { call, put } from "redux-saga/effects";


export function* videoModalRequest(action) {
  try {
   
    yield put(actions.videoModalSuccess(action.payload));

  } catch (e) {      
  }
}

export function* setModalDataRequest(action) {
  try {
   
    yield put(actions.setModalDataSuccess(action.payload));

  } catch (e) {      
  }
}

export function* genericLoaderRequest(action) {
  try {
   
    yield put(actions.genericLoaderSuccess(action.payload));

  } catch (e) {      
  }
}