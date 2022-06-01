import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constants";
const initialState = {
  createTrainer: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  allTrainers: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  courses: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  createCourses: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  videos: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  createQuestion: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  heroCarousel: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  videobank: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  addItemTovideobank: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  userlist: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  questionCategories: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
  selectedQuestionCategory: {
    data: {}
  },

  updateQuestion: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message:''
  },
};

    const createTrainerRequest = (state, action) => {
      return update(state, {
        createTrainer: {
          isLoading: { $set: true },
          isError: { $set: false },
          isSuccess: { $set: false },
          message:{$set:''},
          data: { $set:{} }
        }
      });
    };

const createTrainerSuccess = (state, action) => {
  return update(state, {
    createTrainer: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const createTrainerError = (state, action) => {
  return update(state, {
    createTrainer: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};
    //end

    const getTrainersRequest = (state, action) => {
      return update(state, {
        allTrainers: {
          isLoading: { $set: true },
          isError: { $set: false },
          isSuccess: { $set: false },
          message:{$set:''},
          data: { $set:{} }
        }
      });
    };

const getTrainersSuccess = (state, action) => {
  return update(state, {
    allTrainers: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const getTrainersError = (state, action) => {
  return update(state, {
    allTrainers: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set: action.payload.message},
      data: { $set:{} }
    }
  });
};
    //end

    const getCoursesRequest = (state, action) => {
      return update(state, {
        courses: {
          isLoading: { $set: true },
          isError: { $set: false },
          isSuccess: { $set: false },
          message:{$set:''},
          data: { $set:{} }
        }
      });
    };

const getCoursesSuccess = (state, action) => {
  return update(state, {
    courses: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const getCoursesError = (state, action) => {
  return update(state, {
    courses: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set: action.payload.message},
      data: { $set: {} }
    }
  });
};
    //end

    const createCoursesRequest = (state, action) => {
      return update(state, {
        createCourses: {
          isLoading: { $set: true },
          isError: { $set: false },
          isSuccess: { $set: false },
          message:{$set:''},
          data: { $set:{} }
        }
      });
    };

const createCoursesSuccess = (state, action) => {
  return update(state, {
    createCourses: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const createCoursesError = (state, action) => {
  return update(state, {
    createCourses: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};
    //end

const getVidoesRequest = (state, action) => {
  return update(state, {
    videos: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const getVidoesSuccess = (state, action) => {
  return update(state, {
    videos: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const getVidoesError = (state, action) => {
  return update(state, {
    videos: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message},
      data: { $set:{} }
    }
  });
};

//end

const createQuestionRequest = (state, action) => {
  return update(state, {
    createQuestion: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const createQuestionSuccess = (state, action) => {
  const { categoryId, parentCategoryId, data} = action.payload
  let questionCategories = {...state.questionCategories}
  const parentIndex= questionCategories.data.findIndex(a => a._id === parentCategoryId )
  const categoryIndex = questionCategories.data[parentIndex].subCategories.findIndex(a => a._id === categoryId)
  questionCategories.data[parentIndex].subCategories[categoryIndex].questions.push(data)

  return update(state, {
    createQuestion: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set: action.payload }
    },
    questionCategories: { $set: questionCategories }
  });
};

const createQuestionError = (state, action) => {
  return update(state, {
    createQuestion: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message},
      data: { $set:{} }
    }
  });
};

//end

const getcCarouselDataRequest = (state, action) => {
  return update(state, {
    heroCarousel: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const getcCarouselDataSuccess = (state, action) => {
  return update(state, {
    heroCarousel: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const getcCarouselDataError = (state, action) => {
  return update(state, {
    heroCarousel: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message},
      data: { $set: action.payload.message }
    }
  });
};

//end


const getVideobankRequest = (state, action) => {
  return update(state, {
    videobank: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const getVideobankSuccess = (state, action) => {
  const data = action.payload.filter((item)=> item.video)
  return update(state, {
    videobank: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set: data }
    }
  });
};

const getVideobankError = (state, action) => {
  return update(state, {
    videobank: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message},
      data: { $set: action.payload.message }
    }
  });
};

//end


const addItemTovideobankRequest = (state, action) => {
  return update(state, {
    addItemTovideobank: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const addItemTovideobankSuccess = (state, action) => {
  return update(state, {
    addItemTovideobank: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const addItemTovideobankError = (state, action) => {
  return update(state, {
    addItemTovideobank: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message},
      data: { $set: action.payload.message }
    }
  });
};

//end

const getUserListRequest = (state, action) => {
  return update(state, {
    userlist: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      // data: { $set:{} }
    }
  });
};

const getUserListSuccess = (state, action) => {
  return update(state, {
    userlist: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set:action.payload }
    }
  });
};

const getUserListError = (state, action) => {
  return update(state, {
    userlist: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message},
      data: { $set: action.payload.message }
    }
  });
};

//end

const getQuestionCategoryRequest = (state, action) => {
  return update(state, {
    questionCategories: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set:{} }
    }
  });
};

const getQuestionCategorySuccess = (state, action) => {
  let selectedQuestionCategory= {}
  if(state.selectedQuestionCategory.data._id){
     selectedQuestionCategory = action.payload.find(a => a._id === state.selectedQuestionCategory.data._id)
  }else{
    selectedQuestionCategory = action.payload[0]
  }


  return update(state, {
    questionCategories: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set: action.payload }
    },
    selectedQuestionCategory: {
      data: { $set: selectedQuestionCategory }
    }
  });
};

const getQuestionCategoryError = (state, action) => {
  return update(state, {
    questionCategories: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{$set:action.payload.message},
      data: { $set: [] }
    }
  });
};

const createQuestionCategorySuccess = (state, action) => {
  const { parentCategoryId } = action.payload;
  const data = [...state.questionCategories.data]
  const parentIndex = state.questionCategories.data.findIndex(a => a._id === parentCategoryId )
  let payload = {...action.payload}
  payload.questions = action.payload.questions || []
  data[parentIndex].subCategories.push(payload)

  return update(state, {
    questionCategories: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set: data }
    }
  });
};

const deleteQuestionCategorySuccess = (state, action) => {
  const { categoryId, parentCategoryId } = action.payload
  let questionCategories = {...state.questionCategories}
  const parentIndex = questionCategories.data.findIndex(a => a._id === parentCategoryId )
  questionCategories.data[parentIndex].subCategories = questionCategories.data[parentIndex].subCategories.filter(a => a._id !== categoryId )
  if(!questionCategories.data.length){
    questionCategories.isSuccess = false
    questionCategories.isError = true
    questionCategories.message = "No Question Category has been added yet."
  }
  return update(state, {
    questionCategories:{ $set: questionCategories }
  })
}


const updateQuestionCategorySuccess = (state, action) => {
  const { categoryId, data } = action.payload
  const { name, parentCategoryId } = data
  let questionCategories = {...state.questionCategories}
  const parentIndex = questionCategories.data.findIndex(a => a._id === parentCategoryId )
  const categoryIndex = questionCategories.data[parentIndex].subCategories.findIndex(a => a._id == categoryId )
  questionCategories.data[parentIndex].subCategories[categoryIndex].name = name

  return update(state, {
    questionCategories:{ $set: questionCategories }
  })
}

const selectQuestionCategorySuccess = (state, action) => {
  const data = state.questionCategories.data.find(a => a._id === action.payload._id)
  return update(state, {
    selectedQuestionCategory:{
      data: { $set: data }
     }
  })
}

//end


const updateQuestionRequest = (state, action) => {
  return update(state, {
    updateQuestion: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message:{$set:''},
      data: { $set: action.payload }
    }
  });
};

const updateQuestionSuccess = (state, action) => {
  return update(state, {
    updateQuestion: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message:{$set:''},
      data: { $set: {} }
    },
  });
};

const updateQuestionError = (state, action) => {
  return update(state, {
    updateQuestion: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message:{ $set: action.payload.message },
      data: { $set: {} }
    }
  });
};


export default handleActions(
  {
    [constants.CREATE_TRAINER_REQUEST]: createTrainerRequest,
    [constants.CREATE_TRAINER_SUCCESS]: createTrainerSuccess,
    [constants.CREATE_TRAINER_ERROR]: createTrainerError,

    [constants.GET_TRAINERS_REQUEST]: getTrainersRequest,
    [constants.GET_TRAINERS_SUCCESS]: getTrainersSuccess,
    [constants.GET_TRAINERS_ERROR]: getTrainersError,

    [constants.GET_COURSELIST_REQUEST]: getCoursesRequest,
    [constants.GET_COURSELIST_SUCCESS]: getCoursesSuccess,
    [constants.GET_COURSELIST_ERROR]: getCoursesError,

    [constants.CREATE_COURSE_REQUEST]: createCoursesRequest,
    [constants.CREATE_COURSE_SUCCESS]: createCoursesSuccess,
    [constants.CREATE_COURSE_ERROR]: createCoursesError,

    [constants.GET_CAROUSEL_DATA_REQUEST]: getcCarouselDataRequest,
    [constants.GET_CAROUSEL_DATA_SUCCESS]: getcCarouselDataSuccess,
    [constants.GET_CAROUSEL_DATA_ERROR]: getcCarouselDataError,

    [constants.GET_VIDEO_REQUEST]: getVidoesRequest,
    [constants.GET_VIDEO_SUCCESS]: getVidoesSuccess,
    [constants.GET_VIDEO_ERROR]: getVidoesError,

    [constants.CREATE_QUESTION_REQUEST]: createQuestionRequest,
    [constants.CREATE_QUESTION_SUCCESS]: createQuestionSuccess,
    [constants.CREATE_QUESTION_ERROR]: createQuestionError,

    [constants.GET_VIDEOBANK_REQUEST]: getVideobankRequest,
    [constants.GET_VIDEOBANK_SUCCESS]: getVideobankSuccess,
    [constants.GET_VIDEOBANK_ERROR]: getVideobankError,

    [constants.ADD_ITEM_VIDEOBANK_REQUEST]: addItemTovideobankRequest,
    [constants.ADD_ITEM_VIDEOBANK_SUCCESS]: addItemTovideobankSuccess,
    [constants.ADD_ITEM_VIDEOBANK_ERROR]: addItemTovideobankError,

    [constants.GET_USER_LIST_REQUEST]: getUserListRequest,
    [constants.GET_USER_LIST_SUCCESS]: getUserListSuccess,
    [constants.GET_USER_LIST_ERROR]: getUserListError,

    [constants.GET_QUESTION_CATEGORY_REQUEST]: getQuestionCategoryRequest,
    [constants.GET_QUESTION_CATEGORY_SUCCESS]: getQuestionCategorySuccess,
    [constants.GET_QUESTION_CATEGORY_ERROR]: getQuestionCategoryError,

    [constants.UPDATE_QUESTION_REQUEST]: updateQuestionRequest,
    [constants.UPDATE_QUESTION_SUCCESS]: updateQuestionSuccess,
    [constants.UPDATE_QUESTION_ERROR]: updateQuestionError,

    [constants.CREATE_QUESTION_CATEGORY_SUCCESS]: createQuestionCategorySuccess,

    [constants.DELETE_QUESTION_CATEGORY_SUCCESS]: deleteQuestionCategorySuccess,

    [constants.UPDATE_QUESTION_CATEGORY_SUCCESS]: updateQuestionCategorySuccess,

    [constants.SELECT_QUESTION_CATEGORY_SUCCESS]: selectQuestionCategorySuccess,

  },
  initialState
);
