import {createAction} from 'redux-actions';
import * as constants from './constants'


export const manualAuthRequest= createAction(constants.MANUAL_AUTH_REQUEST);
export const manualAuthSuccess= createAction(constants.MANUAL_AUTH_SUCCESS);
export const manualAuthError= createAction(constants.MANUAL_AUTH_ERROR);

export const socialAuthRequest= createAction(constants.SOCIAL_AUTH_REQUEST);
export const socialAuthSuccess= createAction(constants.SOCIAL_AUTH_SUCCESS);
export const socialAuthError= createAction(constants.SOCIAL_AUTH_ERROR);

export const createCourseRequest= createAction(constants.CREATE_COURSE_REQUEST);
export const createCourseSuccess= createAction(constants.CREATE_COURSE_SUCCESS);
export const createCourseError= createAction(constants.CREATE_COURSE_ERROR);

export const updateCourseRequest= createAction(constants.UPDATE_COURSE_REQUEST);
export const updateCourseSuccess= createAction(constants.UPDATE_COURSE_SUCCESS);
export const updateCourseError= createAction(constants.UPDATE_COURSE_ERROR);

export const createTrainerRequest= createAction(constants.CREATE_TRAINER_REQUEST);
export const createTrainerSuccess= createAction(constants.CREATE_TRAINER_SUCCESS);
export const createTrainerError= createAction(constants.CREATE_TRAINER_ERROR);

export const createQuestionRequest= createAction(constants.CREATE_QUESTION_REQUEST);
export const createQuestionSuccess= createAction(constants.CREATE_QUESTION_SUCCESS);
export const createQuestionError= createAction(constants.CREATE_QUESTION_ERROR);

export const updateTrainerRequest= createAction(constants.UPDATE_TRAINER_REQUEST);
export const updateTrainerSuccess= createAction(constants.UPDATE_TRAINER_SUCCESS);
export const updateTrainerError= createAction(constants.UPDATE_TRAINER_ERROR);

export const getVideoBankRequest= createAction(constants.GET_VIDEOBANK_REQUEST);
export const getVideoBankSuccess= createAction(constants.GET_VIDEOBANK_SUCCESS);
export const getVideoBankError= createAction(constants.GET_VIDEOBANK_ERROR);

export const deleteVideobankRequest = createAction(constants.DELETE_VIDEOBANK_REQUEST);
export const deleteVideobankSuccess = createAction(constants.DELETE_VIDEOBANK_SUCCESS);

export const getCourseListRequest= createAction(constants.GET_COURSELIST_REQUEST);
export const getCourseListSuccess= createAction(constants.GET_COURSELIST_SUCCESS);
export const getCourseListError= createAction(constants.GET_COURSELIST_ERROR);

export const addItemToVideobankRequest= createAction(constants.ADD_ITEM_VIDEOBANK_REQUEST);
export const addItemToVideobankSuccess= createAction(constants.ADD_ITEM_VIDEOBANK_SUCCESS);
export const addItemToVideobankError= createAction(constants.ADD_ITEM_VIDEOBANK_ERROR);

export const deleteVideoRequest= createAction(constants.DELETE_VIDEO_REQUEST);
export const deleteVideoSuccess= createAction(constants.DELETE_VIDEO_SUCCESS);
export const deleteVideoError= createAction(constants.DELETE_VIDEO_ERROR);

export const updateVideoRequest= createAction(constants.UPDATE_VIDEO_REQUEST);
export const updateVideoSuccess= createAction(constants.UPDATE_VIDEO_SUCCESS);
export const updateVideoError= createAction(constants.UPDATE_VIDEO_ERROR);

export const getCarouselDataRequest= createAction(constants.GET_CAROUSEL_DATA_REQUEST);
export const getCarouselDataSuccess= createAction(constants.GET_CAROUSEL_DATA_SUCCESS);
export const getCarouselDataError= createAction(constants.GET_CAROUSEL_DATA_ERROR);

export const createCarouselDataRequest= createAction(constants.CREATE_CAROUSEL_DATA_REQUEST);
export const createCarouselDataSuccess= createAction(constants.CREATE_CAROUSEL_DATA_SUCCESS);
export const createCarouselDataError= createAction(constants.CREATE_CAROUSEL_DATA_ERROR);

export const getUserListRequest= createAction(constants.GET_USER_LIST_REQUEST);
export const getUserListSuccess= createAction(constants.GET_USER_LIST_SUCCESS);
export const getUserListError= createAction(constants.GET_USER_LIST_ERROR);

export const getQuestionCategoryRequest= createAction(constants.GET_QUESTION_CATEGORY_REQUEST);
export const getQuestionCategorySuccess = createAction(constants.GET_QUESTION_CATEGORY_SUCCESS);
export const getQuestionCategoryError= createAction(constants.GET_QUESTION_CATEGORY_ERROR);

export const createQuestionCategoryRequest= createAction(constants.CREATE_QUESTION_CATEGORY_REQUEST);
export const createQuestionCategorySuccess = createAction(constants.CREATE_QUESTION_CATEGORY_SUCCESS);
export const createQuestionCategoryError= createAction(constants.CREATE_QUESTION_CATEGORY_ERROR);

export const deleteQuestionCategoryRequest= createAction(constants.DELETE_QUESTION_CATEGORY_REQUEST);
export const deleteQuestionCategorySuccess = createAction(constants.DELETE_QUESTION_CATEGORY_SUCCESS);

export const updateQuestionCategoryRequest= createAction(constants.UPDATE_QUESTION_CATEGORY_REQUEST);
export const updateQuestionCategorySuccess = createAction(constants.UPDATE_QUESTION_CATEGORY_SUCCESS);

export const updateCarouselDataRequest= createAction(constants.UPDATE_CAROUSEL_DATA_REQUEST);
export const updateCarouselDataSuccess= createAction(constants.UPDATE_CAROUSEL_DATA_SUCCESS);

export const deleteCarouselDataRequest= createAction(constants.DELETE_CAROUSEL_REQUEST);
export const deleteCarouselDataSuccess= createAction(constants.DELETE_CAROUSEL_SUCCESS);

export const uploadVideoRequest= createAction(constants.UPLOAD_VIDEO_REQUEST);
export const uploadVideoSuccess= createAction(constants.UPLOAD_VIDEO_SUCCESS);
export const uploadVideoError= createAction(constants.UPLOAD_VIDEO_ERROR);

export const getVideoRequest= createAction(constants.GET_VIDEO_REQUEST);
export const getVideoSuccess= createAction(constants.GET_VIDEO_SUCCESS);
export const getVideoError= createAction(constants.GET_VIDEO_ERROR);

export const getTrainersRequest= createAction(constants.GET_TRAINERS_REQUEST);
export const getTrainersSuccess= createAction(constants.GET_TRAINERS_SUCCESS);
export const getTrainersError= createAction(constants.GET_TRAINERS_ERROR);

export const videoModalRequest = createAction(constants.VIDEO_MODAL_REQUEST);
export const videoModalSuccess = createAction(constants.VIDEO_MODAL_SUCCESS);


export const deleteTrainerRequest = createAction(constants.DELETE_TRAINER_REQUEST);
export const deleteTrainerSuccess = createAction(constants.DELETE_TRAINER_SUCCESS);

export const selectQuestionCategoryRequest = createAction(constants.SELECT_QUESTION_CATEGORY_REQUEST);
export const selectQuestionCategorySuccess = createAction(constants.SELECT_QUESTION_CATEGORY_SUCCESS);

export const deleteCourseRequest = createAction(constants.DELETE_COURSE_REQUEST);
export const deleteCourseSuccess = createAction(constants.DELETE_COURSE_SUCCESS);

export const setModalDataRequest = createAction(constants.SET_MODALDATA_REQUEST);
export const setModalDataSuccess = createAction(constants.SET_MODALDATAL_SUCCESS);

export const updateUserSubscriptionRequest = createAction(constants.UPDATE_USER_SUBSCRIPTION_REQUEST);
export const updateUserSubscriptionSuccess = createAction(constants.UPDATE_USER_SUBSCRIPTION_SUCCESS);
export const updateUserSubscriptionError = createAction(constants.UPDATE_USER_SUBSCRIPTION_ERROR);

export const updateQuestionRequest = createAction(constants.UPDATE_QUESTION_REQUEST);
export const updateQuestionSuccess = createAction(constants.UPDATE_QUESTION_SUCCESS);
export const updateQuestionError = createAction(constants.UPDATE_QUESTION_ERROR);

export const genericLoaderRequest = createAction(constants.GENERIC_LOADER_REQUEST);
export const genericLoaderSuccess = createAction(constants.GENERIC_LOADER_SUCCESS);

export const logoutRequest= createAction(constants.LOGOUT_REQUEST);
export const logoutSuccess= createAction(constants.LOGOUT_SUCCESS);

export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
export const loginError = createAction(constants.LOGIN_ERROR);

export const getDashboardRequest = createAction(constants.GET_DASHBOARD_REQUEST);
export const getDashboardSuccess = createAction(constants.GET_DASHBOARD_SUCCESS);
export const getDashboardError = createAction(constants.GET_DASHBOARD_ERROR);

export const sendNotificationdRequest = createAction(constants.SEND_NOTIFICATION_REQUEST);
export const sendNotificationSuccess = createAction(constants.SEND_NOTIFICATION_SUCCESS);
export const sendNotificationError = createAction(constants.SEND_NOTIFICATION_ERROR);

export const getNotificationRequest = createAction(constants.GET_NOTIFICATION_REQUEST);
export const getNotificationSuccess = createAction(constants.GET_NOTIFICATION_SUCCESS);
export const getNotificationError = createAction(constants.GET_NOTIFICATION_ERROR);

export const setPaidContentRequest = createAction(constants.SET_PAID_CONTENT_REQUEST);
export const setPaidContentSuccess = createAction(constants.SET_PAID_CONTENT_SUCCESS);
export const setPaidContentError = createAction(constants.SET_PAID_CONTENT_ERROR);
