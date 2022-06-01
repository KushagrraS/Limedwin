import * as actions from "../actions";
import fireAjax from "../../services";
import { call, put } from "redux-saga/effects";
import Error from "../../Components/Error";
import {  toast } from 'react-toastify';
toast.configure();



//function to update user subscription
export function* updateUserSubscriptionRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      `users/updateProfile/${action.payload.userId}`,
      "",
      {...action.payload}
    );    
    yield put(actions.updateUserSubscriptionSuccess({...response.data}));

  } catch (e) {      
    yield put(actions.updateUserSubscriptionError({ message: e.message }));
  }
}

//function to update user subscription
export function* loginRequest(action) {
  const headers = {
      "loginType": "admin"
  }
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `users/login`,
      headers,
      {...action.payload}
    );    
    window.localStorage.setItem('token', response.data.token)
    yield put(actions.loginSuccess({...response.data}));

  } catch (e) {      
    yield put(actions.loginError({ message: e?.response?.data?.message || e?.message }));
  }
}


//function to update user subscription
export function* getDashboardRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `users/dashboard`,
      '',
      {...action.payload}
    );    
    yield put(actions.getDashboardSuccess({...response.data}));

  } catch (e) {      
    yield put(actions.getDashboardError({ message: e?.response?.data?.message || e?.message }));
  }
}

export function* sendNotificationRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `users/sendNotification`,
      '',
      action.payload
    );    
    if(response.data.message === 'device token not available!'){
      throw new Error(response.data.message)
    }
    yield put(actions.sendNotificationSuccess({...response.data}));
    
    toast.success('Notification Send Successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

  } catch (e) {      
    // alert( e?.response?.data?.message || e?.message)
    toast.error('Something went wrong', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    yield put(actions.sendNotificationError({ message: e?.response?.data?.message || e?.message }));
  }
}


export function* getNotificationRequest(action) {
  console.log('sssssssssssss');

  try {
    const response = yield call(
      fireAjax,
      "GET",
      `users/admin/listNotifications`,
      '',
      action.payload
    );    
    if(response.data.message === 'device token not available!'){
      throw new Error(response.data.message)
    }
    yield put(actions.getNotificationSuccess({...response.data}));
    


  } catch (e) {      
    // alert( e?.response?.data?.message || e?.message)
 
    yield put(actions.getNotificationError({ message: e?.response?.data?.message || e?.message }));
  }
}