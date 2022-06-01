import { takeLatest, takeEvery, all } from "redux-saga/effects";
import * as constants from "./constants";
import { updateUserSubscriptionRequest, loginRequest, getDashboardRequest, sendNotificationRequest ,getNotificationRequest} from './auth/actions'
import {videoModalRequest, setModalDataRequest, genericLoaderRequest} from './config/actions';
import {createTrainerRequest, setPaidContentRequest, getUserListRequest, selectQuestionCategoryRequest, updateQuestionCategoryRequest, updateQuestionyRequest, deleteQuestionCategoryRequest, createQuestionCategoryRequest, getQuestionCategoryRequest, deleteCarouselDataRequest, updateCarouselDataRequest, createCarouselDataRequest, updateVideoRequest, addItemToVideoBankRequest, deleteVideoBankRequest, getVideoBankRequest,  getCarouselDataRequest, deleteVideoRequest,  getTrainersRequest, createQuestionRequest, getViodesRequest, getCourseListRequest, uploadVideoRequest, deleteCoursesRequest,  deleteTrainerRequest, createCoursesrRequest,updateTrainerRequest, updateCoursesrRequest} from './course/actions';

export function* watchActions() {
  yield takeLatest(constants.VIDEO_MODAL_REQUEST, videoModalRequest);
  yield takeLatest(constants.CREATE_TRAINER_REQUEST, createTrainerRequest);
  yield takeLatest(constants.LOGIN_REQUEST, loginRequest);
  yield takeLatest(constants.GET_TRAINERS_REQUEST, getTrainersRequest);
  yield takeLatest(constants.GET_COURSELIST_REQUEST, getCourseListRequest);
  yield takeLatest(constants.CREATE_COURSE_REQUEST, createCoursesrRequest);
  yield takeLatest(constants.UPDATE_COURSE_REQUEST, updateCoursesrRequest);
  yield takeLatest(constants.SET_MODALDATA_REQUEST, setModalDataRequest);
  yield takeLatest(constants.GENERIC_LOADER_REQUEST, genericLoaderRequest);
  yield takeLatest(constants.UPDATE_TRAINER_REQUEST, updateTrainerRequest);
  yield takeLatest(constants.DELETE_TRAINER_REQUEST, deleteTrainerRequest);
  yield takeLatest(constants.DELETE_COURSE_REQUEST, deleteCoursesRequest);
  yield takeLatest(constants.UPLOAD_VIDEO_REQUEST, uploadVideoRequest);
  yield takeLatest(constants.GET_VIDEO_REQUEST, getViodesRequest);
  yield takeLatest(constants.CREATE_QUESTION_REQUEST, createQuestionRequest);
  yield takeLatest(constants.DELETE_VIDEO_REQUEST, deleteVideoRequest);
  yield takeLatest(constants.GET_CAROUSEL_DATA_REQUEST, getCarouselDataRequest);
  yield takeLatest(constants.CREATE_CAROUSEL_DATA_REQUEST, createCarouselDataRequest);
  yield takeLatest(constants.GET_VIDEOBANK_REQUEST, getVideoBankRequest);
  yield takeLatest(constants.DELETE_VIDEOBANK_REQUEST, deleteVideoBankRequest);
  yield takeLatest(constants.ADD_ITEM_VIDEOBANK_REQUEST, addItemToVideoBankRequest);
  yield takeLatest(constants.UPDATE_VIDEO_REQUEST, updateVideoRequest);
  yield takeLatest(constants.DELETE_CAROUSEL_REQUEST, deleteCarouselDataRequest);
  yield takeLatest(constants.UPDATE_CAROUSEL_DATA_REQUEST, updateCarouselDataRequest);
  yield takeLatest(constants.GET_USER_LIST_REQUEST, getUserListRequest);
  yield takeLatest(constants.GET_QUESTION_CATEGORY_REQUEST, getQuestionCategoryRequest);
  yield takeLatest(constants.CREATE_QUESTION_CATEGORY_REQUEST, createQuestionCategoryRequest);
  yield takeLatest(constants.DELETE_QUESTION_CATEGORY_REQUEST, deleteQuestionCategoryRequest);
  yield takeLatest(constants.UPDATE_QUESTION_CATEGORY_REQUEST, updateQuestionCategoryRequest);
  yield takeLatest(constants.SELECT_QUESTION_CATEGORY_REQUEST, selectQuestionCategoryRequest);
  yield takeLatest(constants.UPDATE_USER_SUBSCRIPTION_REQUEST, updateUserSubscriptionRequest);
  yield takeLatest(constants.UPDATE_QUESTION_REQUEST, updateQuestionyRequest);
  yield takeLatest(constants.GET_DASHBOARD_REQUEST, getDashboardRequest);
  yield takeLatest(constants.SEND_NOTIFICATION_REQUEST, sendNotificationRequest);
  yield takeLatest(constants.GET_NOTIFICATION_REQUEST, getNotificationRequest);
  yield takeLatest(constants.SET_PAID_CONTENT_REQUEST, setPaidContentRequest);

}

export default function* rootSaga() {
  yield all([watchActions()]);
}
