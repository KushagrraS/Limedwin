import React, { useState, useEffect } from "react";
import CommonModal from "./CommonModal";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { videoModalRequest, updateCarouselDataRequest, createCarouselDataRequest } from "../redux/actions";
import GenericTextArea from "./GenericTextArea";
import Loader from './Loader';
import validator from '../utils/validation';
import MultipleSelect from "./Select";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ErrorMessage from "./ErrorMessage";
import Checkbox from '@material-ui/core/Checkbox';

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
  inputsWrapper:{
    width: '55%',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    },
},
divider:{
    // marginBottom: 10
},
selectWrapper:{
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: -theme.spacing(1)
},
thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    left: 0,
    cursor: 'pointer',
    background:'#fff'
  },
  addThumbnail: {
    border: '1px dotted rgba(0,0,0,0.2)',
    position: 'relative',
    borderRadius: 5,
    display: 'flex',
    width: '35%',
    padding: '2rem',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '20px 0px',
    [theme.breakpoints.down('sm')]: {
      width: '55%'
    },
  },
  input: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },
  imageUploadWrapper:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing(8),
      flexDirection: 'column'
  },
  checkboxWrapperCarousel:{
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
}));

const initialState = {
  errors: {},
  type: 'video',
  title: '',
  subtitle: '',
  description: '',
  content: '',
  image: '',
  url: '',
  videoId: '',
  file: '',
  addToMainCarousel: true,
  caption: ''
}

const selectionType = [
    {name: 'Video', type: 'video'},
    {name: 'Image', type: 'image'},
    {name: 'Text', type: 'text'},
]

export default function HeroCarouselModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const createQuestion = useSelector(state => state.course.createQuestion)
  const isLoading = useSelector(state => state.config.isLoading)
  const videos = useSelector(state => state.course.videos);
  const [state, setState] = useState(initialState)
  const modalData = useSelector(state => state.config.modalData)
  const isToUpdate = Object.keys(modalData).length > 0


  const handleClose = () => {
    dispatch(videoModalRequest(false));
    handleReset()
  };

  useEffect(() => {
    return () => {
      handleClose()
    }
  }, [])


  const handleCreateCarouselData = () => {
      let statedata = {...state}
      if(state.type === 'text'){
          delete statedata.url
          delete statedata.image
          delete statedata.videoId
      }
      if(state.type === 'video'){
          statedata = { videoId: statedata.videoId }
      }

      if(state.type === 'image'){
        statedata = { url: statedata.url, file: statedata.file }
      }
      const errors = validator(statedata)
      if(state.type === 'text' && isToUpdate){
        delete errors.file
        delete errors.videoId
      }
    setState({...state, errors})
    if(Object.keys(errors).length){
      //do something
      return
    }
    let formdata = new FormData()
    formdata.append('type', state.type)
    formdata.append('appearInCarousel', state.addToMainCarousel)
    if(state.type === 'text'){
        formdata.append('title', state.title)
        formdata.append('subTitle', state.subtitle)
        formdata.append('description', state.description)
        formdata.append('content', state.content)
    }
    if(state.type === 'video'){
        formdata.append('videoId', state.videoId)
    }
    if(state.type === 'image'){
        formdata.append('image', state.image)
        formdata.append('caption', state.caption)
    }
    if(isToUpdate){
      dispatch(updateCarouselDataRequest({ id: modalData._id, formdata}))
      return
    }
    dispatch(createCarouselDataRequest({formdata}))
  }

  useEffect(() => {
    if(isToUpdate){
      if(modalData.type === 'video'){
        setState({
          ...state,
          type: modalData.type,
        })
      }
      else if(modalData.type === 'text'){
        setState({
          ...state,
          type: modalData.type,
          title: modalData.title,
          subtitle: modalData.subTitle,
          description: modalData.description,
          content: modalData.content || '',
        })
      }
      else if(modalData.type === 'image'){
        setState({
          ...state,
          type: modalData.type,
          url: modalData.image,
          caption: modalData.caption || ''
        })
      }
    }
  }, [isToUpdate])

  const handleChange = (value, name) => {
    setState({...state, [name]: value})
  }

  const handleReset = () => {
    setState(initialState)
  }

  function onChange(event, name) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setState({ ...state, [name]: file, url: event.target.result })
    };

    file && reader.readAsDataURL(file);
  }

  return (
    <CommonModal onClose={handleReset} >
      <div className={classes.modalHeader}>
        <span>Hero Carousel</span>
        <CloseIcon onClick={handleClose} className={classes.closeIcon} />
      </div>
      <div className={classes.content}>
          <div className={classes.selectWrapper} >
            <MultipleSelect
                isToUpdate={isToUpdate}
                selectedKeys={state.type}
                // type='video'
                multiple={false}
                nameKey='name'
                name='type'
                onSelect={handleChange}
                list={selectionType}
                returnKey='type'
                defaultSelect={true}
            />
            <div className={classes.checkboxWrapperCarousel}  >
                <Checkbox
                    checked={state.addToMainCarousel}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={(e)=>  handleChange(!state.addToMainCarousel, 'addToMainCarousel')}
                />
                <div className={classes.sectionTitle} >Add to main Carousel</div>
            </div>
        </div>
        <div className={classes.divider} />
        {state.type == 'text' &&
        <div className={classes.inputsWrapper} >
          <GenericTextArea
            isBigger={false}
            placeholder='title here...'
            handleChange={handleChange}
            name='title'
            value={state.title}
            error={state?.errors?.title}
           />
           <GenericTextArea
            isBigger={false}
            placeholder='subtitle here...'
            handleChange={handleChange}
            name='subtitle'
            value={state.subtitle}
            error={state?.errors?.subtitle}
           />
           <GenericTextArea
            isBigger={true}
            placeholder='description here...'
            handleChange={handleChange}
            name='description'
            value={state.description}
            error={state?.errors?.description}
           />
           <GenericTextArea
            isBigger={true}
            style={{height: '22vh'}}
            placeholder='content here...'
            handleChange={handleChange}
            name='content'
            value={state.content}
            error={state?.errors?.content}
           />
        </div>}
        {state.type === 'image' &&
            <div className={classes.imageUploadWrapper} >
                <div className={classes.addThumbnail} >
                {state.url !== '' && <img className={classes.thumbnail} src={state.url} />}
                <input onChange={(e) => onChange(e, 'image')} accept="image/*"  className={classes.input} type='file' capture/>
                <AddPhotoAlternateIcon />
                <div className={classes.uploadThumbnailText} >Upload Image</div>
                </div>
                <ErrorMessage error={state?.errors?.file} />
                <GenericTextArea
                    value={state.caption}
                    name={'caption'}
                    handleChange={handleChange}
                    style={{ width: '50%'}}
                    isBigger={true}
                    placeholder={'Image caption...'}
                />
            </div>
        }
        {state.type === 'video' &&
        <div className={classes.imageUploadWrapper} >
            Select Video:
            <MultipleSelect
                isToUpdate={false}
                // selectedKeys={state.videos}
                type='video'
                multiple={false}
                nameKey='title'
                name='videoId'
                onSelect={handleChange}
                list={videos.data}
            />
            <ErrorMessage error={state?.errors?.videoId} />
        </div>}
      </div>
      <div className={classes.footer}>
        <button
        //   disabled={createQuestion.isLoading}
          onClick={handleCreateCarouselData}
          className={classes.button}
        >
          {isLoading ?  <Loader style={{color:'#fff'}} /> : "UPLOAD"}
        </button>
      </div>
    </CommonModal>
  );
}
