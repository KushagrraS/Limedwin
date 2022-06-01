import * as actions from "../actions";
import fireAjax from "../../services";
import { call, put } from "redux-saga/effects";

//to get the carousel's data
export function* createTrainerRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `trainer`,
      "",
      action.payload,
    );
    const trainers = yield call(
      fireAjax,
      "GET",
      `trainer`,
      ''
    );
    yield put(actions.getTrainersSuccess(trainers.data.data));
    yield put(actions.createTrainerSuccess(response.data.data));
    yield put(actions.videoModalSuccess(false));

  } catch (e) {
    yield put(actions.createTrainerError({message:e.message}));
  }
  finally{
    yield put(actions.genericLoaderSuccess(false));
  }
}

export function* deleteTrainerRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "DELETE",
      `trainer/${action.payload.trainerId}`,
      "",
    );
    const trainers = yield call(
      fireAjax,
      "GET",
      `trainer`,
      ''
    );
    yield put(actions.getTrainersSuccess(trainers.data.data));
    yield put(actions.deleteTrainerSuccess(response.data.data));

  } catch (e) {
    yield put(actions.updateTrainerError({message:e.message}));
  }
  finally{
    yield put(actions.genericLoaderSuccess(false));
    yield put(actions.videoModalSuccess(false));
  }
}

export function* updateTrainerRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      `trainer/${action.payload.trainerId}`,
      "",
      action.payload.data,
    );
    const trainers = yield call(
      fireAjax,
      "GET",
      `trainer`,
      ''
    );
    yield put(actions.getTrainersSuccess(trainers.data.data));
    yield put(actions.updateTrainerSuccess(response.data.data));
    yield put(actions.videoModalSuccess(false));

  } catch (e) {
    yield put(actions.updateTrainerError({message:e.message}));
  }
  finally{
    yield put(actions.genericLoaderSuccess(false));
  }
}

//to get the carousel's data
export function* createCoursesrRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `courses`,
      "",
      action.payload,
    );
    const courses = yield call(
      fireAjax,
      "GET",
      `courses/temp/test`,
      ''
    );
    yield put(actions.getCourseListSuccess(courses.data.data));
    yield put(actions.createCourseSuccess(response.data.data));

  } catch (e) {
    yield put(actions.createTrainerError({message:e.message}));
  }
  finally{
    yield put(actions.videoModalSuccess(false));
    yield put(actions.genericLoaderSuccess(false));
  }
}

//to get the carousel's data
export function* updateCoursesrRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      `courses/${action.payload.courseId}`,
      "",
      action.payload.data,
    );
    const courses = yield call(
      fireAjax,
      "GET",
      `courses/temp/test`,
      ''
    );
    yield put(actions.getCourseListSuccess(courses.data.data));
    yield put(actions.updateCourseSuccess(response.data.data));
    yield put(actions.videoModalSuccess(false));

  } catch (e) {
    yield put(actions.createTrainerError({message:e.message}));
  }
  finally{
    yield put(actions.genericLoaderRequest(false));
  }
}

export function* deleteCoursesRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "DELETE",
      `courses/${action.payload.courseId}`,
      "",
      action.payload.data,
    );
    const courses = yield call(
      fireAjax,
      "GET",
      `courses/temp/test`,
      ''
    );
    yield put(actions.getCourseListSuccess(courses.data.data));
    yield put(actions.deleteTrainerSuccess(response.data.data));
  } catch (e) {

  }
  finally{
    yield put(actions.genericLoaderSuccess(false));
  }
}

export function* deleteVideoRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "DELETE",
      `videos/${action.payload.videoId}`,
      "",
      action.payload.data,
    );
    const vidoes = yield call(
      fireAjax,
      "GET",
      `videos`,
      ''
    );
    if(Array.isArray(vidoes.data) && vidoes.data.length){
      yield put(actions.getVideoSuccess(vidoes.data));
    }else{
      yield put(actions.getVideoError({ message: 'No video is available'}));
    }
    yield put(actions.deleteVideoSuccess(response.data.data));
  } catch (e) {
    yield put(actions.deleteVideoError({message: e.message}));
  }
  finally{
    yield put(actions.genericLoaderRequest(false));
  }
}

//to get the carousel's data
export function* getCourseListRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `courses/temp/test`,
      "",
    );
    if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getCourseListSuccess(response.data.data));
    }else{
      throw new Error('No Programme is available')
    }
  } catch (e) {
    yield put(actions.getCourseListError({message:e.message}));
  }
}

//to create the hero carousel's data
export function* createCarouselDataRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `content/sliderData`,
      "",
      action.payload.formdata
    );
    const sliderData = yield call(
      fireAjax,
      "GET",
      `content/listSliderData?webapp=true`,
      "",
    );
    if(Array.isArray(sliderData.data.data) && sliderData.data.data.length){
      yield put(actions.getCarouselDataSuccess(sliderData.data.data.reverse()));
    }else{
      throw new Error('No data is available')
    }
    // if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.createCarouselDataSuccess(response.data.data));
    // }else{
    //   throw new Error('No Programme is available')
    // }
  } catch (e) {
    yield put(actions.createCarouselDataError({message:e.message}));
  }
  finally {
    yield put(actions.genericLoaderRequest(false));
    yield put(actions.videoModalSuccess(false));
  }
}

//to create the hero carousel's data
export function* deleteCarouselDataRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "DELETE",
      `content/sliderData/${action.payload.id}`,
      "",
      ""
    );
    const sliderData = yield call(
      fireAjax,
      "GET",
      `content/listSliderData?webapp=true`,
      "",
    );
    if(Array.isArray(sliderData.data.data) && sliderData.data.data.length ){
      yield put(actions.getCarouselDataSuccess(sliderData.data.data.reverse()));
    }else{
      throw new Error('No data is available')
    }
      yield put(actions.deleteCarouselDataSuccess(response.data.data));
  } catch (e) {

  }
  finally {
    yield put(actions.genericLoaderRequest(false));
    yield put(actions.videoModalSuccess(false));
  }
}

//to update the hero carousel's data
export function* updateCarouselDataRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      `content/sliderData/${action.payload.id}`,
      "",
      action.payload.formdata
    );
    const sliderData = yield call(
      fireAjax,
      "GET",
      `content/listSliderData?webapp=true`,
      "",
    );
    if(Array.isArray(sliderData.data.data) && sliderData.data.data.length ){
      yield put(actions.getCarouselDataSuccess(sliderData.data.data.reverse()));
    }else{
      throw new Error('No data is available')
    }
      yield put(actions.updateCarouselDataSuccess(response.data.data));
  } catch (e) {

  }
  finally {
    yield put(actions.genericLoaderRequest(false));
    yield put(actions.videoModalSuccess(false));
  }
}

//to get the hero carousel's data
export function* getCarouselDataRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `content/listSliderData?webapp=true`,
      "",
    );
    // if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getCarouselDataSuccess(response.data.data.reverse()));
    // }else{
    //   throw new Error('No Programme is available')
    // }
  } catch (e) {
    yield put(actions.getCarouselDataError({message:e.message}));
  }
}

//to get the carousel's data
export function* getTrainersRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `trainer`,
      ''
    );
    if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getTrainersSuccess(response.data.data));
    }else{
      throw new Error('No Trainer is available')
    }

  } catch (e) {
    yield put(actions.getTrainersError({message:e.message}));
  }
}


//to upload video
export function* uploadVideoRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `videos`,
      "",
      action.payload.formData,
    );
    const videos = yield call(
      fireAjax,
      "GET",
      `videos`,
      "",
    );
    yield put(actions.getVideoSuccess(videos.data));
    yield put(actions.uploadVideoSuccess(response.data.data));

  } catch (e) {
    yield put(actions.uploadVideoError({message:e.message}));
  }
  finally{
    yield put(actions.videoModalSuccess(false));
    yield put(actions.genericLoaderSuccess(false));
  }
}

//to update video info
export function* updateVideoRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      `videos/${action.payload.videoId}`,
      "",
      action.payload.formData,
    );
    const videos = yield call(
      fireAjax,
      "GET",
      `videos`,
      "",
    );
    yield put(actions.getVideoSuccess(videos.data));
    yield put(actions.updateVideoSuccess(response.data.data));

  } catch (e) {
    yield put(actions.updateVideoError({message:e.message}));
  }
  finally{
    yield put(actions.videoModalSuccess(false));
    yield put(actions.genericLoaderSuccess(false));
  }
}

export function* getViodesRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `videos`,
      "",
    );
    if(Array.isArray(response.data) && response.data.length){
      yield put(actions.getVideoSuccess(response.data));
    }else{
     throw new Error('No video is available')
    }
  } catch (e) {
    yield put(actions.getVideoError({ message: e.message }));
  }
}

export function* createQuestionRequest(action) {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `content/createQuestion`,
      headers,
      action.payload
    );

    yield put(actions.createQuestionSuccess({ data: response.data, ...action.payload}));

  } catch (e) {
    yield put(actions.createQuestionError({ message: e.message }));
  }
  finally {
    yield put(actions.videoModalSuccess(false));
    yield put(actions.genericLoaderRequest(false));
  }
}

//to get the video bank
export function* getVideoBankRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `videoBank`,
      ''
    );
    if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getVideoBankSuccess(response.data.data));
    }else{
      throw new Error('Video bank is empty')
    }

  } catch (e) {
    yield put(actions.getVideoBankError({message:e.message}));
  }
}

export function* deleteVideoBankRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "DELETE",
      `videoBank/${action.payload.videobankId}`,
      "",
      '',
    );
    const vidoes = yield call(
      fireAjax,
      "GET",
      `videoBank`,
      ''
    );
    if(Array.isArray(vidoes.data.data) && vidoes.data.data.length){
      yield put(actions.getVideoBankSuccess(vidoes.data.data));
    }else{
      yield put(actions.getVideoBankError({ message: 'Video bank is empty'}));
    }
    yield put(actions.deleteVideobankSuccess(response.data.data));
  } catch (e) {

  }
  finally{
    yield put(actions.genericLoaderRequest(false));
  }
}

export function* addItemToVideoBankRequest(action) {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `videoBank`,
      headers,
      action.payload.data,
    );
    const vidoes = yield call(
      fireAjax,
      "GET",
      `videoBank`,
      ''
    );
    if(Array.isArray(vidoes.data.data) && vidoes.data.data.length){
      yield put(actions.getVideoBankSuccess(vidoes.data.data));
    }else{
      yield put(actions.getVideoBankError({ message: 'Video bank is empty'}));
    }
    yield put(actions.addItemToVideobankSuccess(response.data.data));
  } catch (e) {

  }
  finally{
    yield put(actions.videoModalSuccess(false));
    yield put(actions.genericLoaderRequest(false));
  }
}


//to get the user list bank
export function* getUserListRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `users`,
      ''
    );

    if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getUserListSuccess(response.data.data));
    }else{
      throw new Error('User List is empty')
    }

  } catch (e) {
    yield put(actions.getUserListError({ message: e.message }));
  }
}

//to get the question category
export function* getQuestionCategoryRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `content/getQuestionCategory`,
      ''
    );

    if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getQuestionCategorySuccess(response.data.data.map((a) => ({...a, }))));
    }else{
      throw new Error('No Question Category has been added yet.')
    }

  } catch (e) {
    yield put(actions.getQuestionCategoryError({ message: e.message }));
  }
}

//to create the question category
export function* createQuestionCategoryRequest(action) {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "POST",
      `content/createQuestionCategory`,
      headers,
      action.payload
    );

    yield put(actions.createQuestionCategorySuccess(response.data.data));

  } catch (e) {
    yield put(actions.createQuestionCategoryError({ message: e.message }));
  } finally{
    yield put(actions.genericLoaderRequest(false));
  }
}

//to delete the question category
export function* deleteQuestionCategoryRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "DELETE",
      `content/deleteQuestionCategory/${action.payload.categoryId}`,
      ''
    );

      yield put(actions.deleteQuestionCategorySuccess(action.payload));

  } catch (e) {

  }
}


//to update the question category
export function* updateQuestionCategoryRequest(action) {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  yield put(actions.genericLoaderRequest(true));
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      `content/updateQuestionCategory/${action.payload.categoryId}`,
      headers,
      action.payload.data
    );

    yield put(actions.updateQuestionCategorySuccess(action.payload));

  } catch (e) {
    // yield put(actions.createQuestionCategoryError({ message: e.message }));
  } finally{
    yield put(actions.videoModalSuccess(false));
    yield put(actions.genericLoaderRequest(false));
  }
}


//to select the question category
export function* selectQuestionCategoryRequest(action) {
  try {
    yield put(actions.selectQuestionCategorySuccess({ _id: action.payload._id }));
  } catch (e) {

  }
}


//to update the question category
export function* updateQuestionyRequest(action) {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    yield call(
      fireAjax,
      "PUT",
      `content/updateQuestion/${action.payload.questionId}`,
      headers,
      action.payload.data
    );

    const response = yield call(
        fireAjax,
        "GET",
        `content/getQuestionCategory`,
        "",
    );

    if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getQuestionCategorySuccess(response.data.data));
    }

    yield put(actions.updateQuestionSuccess(action.payload));

  } catch (e) {
    // yield put(actions.createQuestionCategoryError({ message: e.message }));
  } finally{
    yield put(actions.updateQuestionError(false));
  }
}


//to create the hero carousel's data
export function* setPaidContentRequest(action) {
  yield put(actions.genericLoaderRequest(true));
  try {
    yield call(
        fireAjax,
        "PUT",
        `content/setFreeContent`,
        "",
        action.payload.data
    );
    const response = yield call(
        fireAjax,
        "GET",
        `content/getQuestionCategory`,
        "",
    );

    if(Array.isArray(response.data.data) && response.data.data.length ){
      yield put(actions.getQuestionCategorySuccess(response.data.data));
    }else{
      throw new Error('No Question Category has been added yet.')
    }


  } catch (e) {
    yield put(actions.createCarouselDataError({message:e.message}));
  }
  finally {
    yield put(actions.genericLoaderRequest(false));
    yield put(actions.videoModalSuccess(false));
  }
}
