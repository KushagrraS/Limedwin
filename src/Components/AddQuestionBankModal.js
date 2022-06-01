import React, {useState} from "react";
import CommonModal from "./CommonModal";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { videoModalRequest, addItemToVideobankRequest } from "../redux/actions";
import Loader from './Loader';
import validator from '../utils/validation';
import MultipleSelect from "./Select";
import ErrorMessage from "./ErrorMessage";
import VideoBankSelectType from "./VideoBankSelectType";

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: "1px solid rgba(0,0,0, 0.2)",
  },
  closeIcon: {
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: 30,
    overflowY: "scroll",
  },
  footer: {
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0,0,0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    outline: 'none',
    border: 'none',
    background: '#065fd4',
    color: '#fff',
    width:70,
    height:40,
    cursor: 'pointer'
  },
  selectWrapper:{
      display: 'flex',
      alignItems: 'center'
  },
  videoBankTypeWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20
  }
}));

const initialState = {
  videoIds: [],
  errors: {},
  videoBankType: 'monthlyQa'
}

export default function AddVideoBankModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const createQuestion = useSelector(state => state.course.createQuestion)
  const isLoading = useSelector(state => state.config.isLoading)
  const [state, setState] = useState(initialState)
  const videos = useSelector(state => state.course.videos);

  const handleClose = () => {
    dispatch(videoModalRequest(false));
    handleReset()
  };

  const handleAddToVideobank = () => {
    const errors = validator(state)
    setState({...state, errors})
    if(Object.keys(errors).length){
      //do something
      return
    }
    const { videoIds, videoBankType } = state;
    dispatch(addItemToVideobankRequest({ data:  { video: videoIds, bankType: videoBankType } }))
  }

  const handleChange = (value, name) => {
    setState({...state, [name]: value})
  }

  const handleReset = () => {
    setState(initialState)
  }

  return (
    <CommonModal onClose={handleReset} style={{height:'50vh'}} >
      <div className={classes.modalHeader}>
        <span>Add to Video Bank</span>
        <CloseIcon onClick={handleClose} className={classes.closeIcon} />
      </div>
      <div className={classes.content}>
        <div className={classes.selectWrapper} >
            <div className={classes.lable}>Videos:</div>
            <MultipleSelect
                isToUpdate={false}
                // selectedKeys={state.videos} 
                type='video' 
                multiple={true} 
                nameKey='title' 
                name='videoIds' 
                onSelect={handleChange} 
                list={videos.data} 
            />
        </div>
        <ErrorMessage error={state?.errors?.videoIds} />
        <div className={classes.videoBankTypeWrapper}>
          Video Bank Type: 
          <VideoBankSelectType onSelect={handleChange} name='videoBankType' />
        </div>
      </div>
      <div className={classes.footer}>
        <button
          disabled={createQuestion.isLoading}
          onClick={handleAddToVideobank}
          className={classes.button}
        >
          {isLoading ?  <Loader style={{color:'#fff'}} /> : "ADD"}
        </button>
      </div>
    </CommonModal>
  );
}
