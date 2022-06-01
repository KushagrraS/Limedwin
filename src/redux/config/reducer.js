import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constants";
const initialState = {
  videoModal: {
    isVisible: false,
  },
  modalData:{},
  isLoading: false
}


const videoModalRequest = (state, action) => {
    return update(state, {
      videoModal: {
        isVisible: { $set: state.videoModal.isVisible },
      }
    });
  };
  
  const videoModalSuccess = (state, action) => {
      return update(state, {
        videoModal: {
            isVisible: { $set: action?.payload},
        }
      });
    };

    const setModalDataRequest = (state, action) => {
      return update(state, {
        modalData: { $set: {} },
      });
    };
    
    const setModalDataSuccess = (state, action) => {
        return update(state, {
          modalData: { $set: action?.payload},
        });
      };

      const genericLoaderRequest = (state, action) => {
        return update(state, {
          isLoading: { $set: state.isLoading },
        });
      };
      
      const genericLoaderSuccess = (state, action) => {
          return update(state, {
            isLoading: { $set: action.payload },
          });
      };

export default handleActions(
    {
      [constants.VIDEO_MODAL_REQUEST]: videoModalRequest,
      [constants.VIDEO_MODAL_SUCCESS]: videoModalSuccess,

      [constants.SET_MODALDATA_REQUEST]: setModalDataRequest,
      [constants.SET_MODALDATAL_SUCCESS]: setModalDataSuccess,

      [constants.GENERIC_LOADER_REQUEST]: genericLoaderRequest,
      [constants.GENERIC_LOADER_SUCCESS]: genericLoaderSuccess,
  
    },
    initialState
  );