import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constants";
const initialState = {
  subscriptionStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },

  loginData: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },

  userDashboardData: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },


  sendNotification: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  notificationList: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  }
};

//functions to update user subscription
const updateUserSubscriptionRequest = (state, action) => {
  return update(state, {
    subscriptionStatus: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const updateUserSubscriptionSuccess = (state, action) => {
  return update(state, {
    subscriptionStatus: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

const updateUserSubscriptionError = (state, action) => {
  return update(state, {
    subscriptionStatus: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

//functions to login
const loginRequest = (state, action) => {
  return update(state, {
    loginData: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const loginSuccess = (state, action) => {
  return update(state, {
    loginData: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

const loginError = (state, action) => {
  return update(state, {
    loginData: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};


//end
//functions to login
const getDashboardRequest = (state, action) => {
  return update(state, {
    userDashboardData: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const getDashboardSuccess = (state, action) => {
  return update(state, {
    userDashboardData: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

const getDashboardError = (state, action) => {
  return update(state, {
    userDashboardData: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

//emd

const sendNotificationdRequest = (state, action) => {
  return update(state, {
    sendNotification: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const sendNotificationSuccess = (state, action) => {
  return update(state, {
    sendNotification: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

const sendNotificationError = (state, action) => {
  return update(state, {
    sendNotification: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};



const getNotificationdRequest = (state, action) => {
  return update(state, {
    notificationList: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      // data: { $set:{} }
    }
  });
};

const getNotificationSuccess = (state, action) => {
  return update(state, {
    notificationList: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

const getNotificationError = (state, action) => {
  return update(state, {
    notificationList: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message || ''},
      data: { $set: action.payload }
    }
  });
};

export default handleActions(
  {
    [constants.UPDATE_USER_SUBSCRIPTION_REQUEST]: updateUserSubscriptionRequest,
    [constants.UPDATE_USER_SUBSCRIPTION_SUCCESS]: updateUserSubscriptionSuccess,
    [constants.UPDATE_USER_SUBSCRIPTION_ERROR]: updateUserSubscriptionError,

    [constants.LOGIN_REQUEST]: loginRequest,
    [constants.LOGIN_SUCCESS]: loginSuccess,
    [constants.LOGIN_ERROR]: loginError,

    [constants.GET_DASHBOARD_REQUEST]: getDashboardRequest,
    [constants.GET_DASHBOARD_SUCCESS]: getDashboardSuccess,
    [constants.GET_DASHBOARD_ERROR]: getDashboardError,

    [constants.SEND_NOTIFICATION_REQUEST]: sendNotificationdRequest,
    [constants.SEND_NOTIFICATION_SUCCESS]: sendNotificationSuccess,
    [constants.SEND_NOTIFICATION_ERROR]: sendNotificationError,

    [constants.GET_NOTIFICATION_REQUEST]: getNotificationdRequest,
    [constants.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
    [constants.GET_NOTIFICATION_ERROR]: getNotificationError,

  },
  initialState
);
