import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ForwardIcon from '@material-ui/icons/Forward';
import CloseIcon from '@material-ui/icons/Close';
import GenericTextArea from './GenericTextArea';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import MultipleSelect from './Select';
import { useSelector, useDispatch } from "react-redux";
import { videoModalRequest, updateVideoRequest, setModalDataRequest, getCourseListRequest, uploadVideoRequest } from '../redux/actions';
import CommonModal from "./CommonModal";
import ErrorMessage from './ErrorMessage';
import validator from '../utils/validation';
import Loader from './Loader';
import Checkbox from '@material-ui/core/Checkbox';
import VideoBankSelectType from './VideoBankSelectType';

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderBottom: '1px solid rgba(0,0,0, 0.2)'
  },
  closeIcon: {
    cursor: 'pointer'
  },
  uploadWrapper: {
    display: 'flex',
    flex: 1,
    padding: 30,
    overflowY: 'scroll'
  },
  uploadingWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconUnderline: {
    borderBottom: '5px solid rgba(0,0,0,0.5)',
    height: "1px",
    width: '41px',
  },
  uploadIconUnderlineSmall: {
    borderBottom: '3px solid #065fd4',
    height: "1px",
    width: '20px',
  },
  uploadIcon: {
    transform: 'rotate(-90deg)',
    fontSize: '3.5rem',
    color: 'rgba(0,0,0,0.5)'
  },
  uploadIconSmall: {
    transform: 'rotate(-90deg)',
    fontSize: '1.5rem',
    color: '#065fd4',
  },
  uploadIconContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f4f4',
    height: 136,
    width: 136,
    borderRadius: 136 / 2,
    marginBottom: 20,
    cursor: 'pointer'
  },
  uploadIconContainerSmall: {
    position: ' relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  dragTag: {

  },
  footer: {
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0,0,0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    outline: 'none',
    border: 'none',
    background: '#065fd4',
    color: '#fff',
    width: 70,
    height: 40,
    cursor: 'pointer'
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#065fd4'
  },
  inputsWrapper: {
    width: '100%'
  },
  details: {
    fontWeight: '500',
    fontSize: '1.2rem',
    marginBottom: 10
  },
  sectionTitle: {
    fontWeight: '500'
  },
  thumbnailDescription: {
    fontWeight: 'normal',
    fontSize: '13px',
    color: '#808080c9'
  },
  descriptionWrapper: {
    margin: '25px 0px',
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    },
    width: '50%'
  },
  titleAreaWrapper: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    },
  },
  addThumbnail: {
    border: '1px dotted rgba(0,0,0,0.2)',
    position: 'relative',
    borderRadius: 5,
    display: 'flex',
    width: '35%',
    padding: '2rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '20px 0px',
    [theme.breakpoints.down('sm')]: {
      width: '55%'
    },
  },
  uploadThumbnailText: {
    fontSize: '13px',
    color: 'grey'
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
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    left: 0,
    cursor: 'pointer',
    background: '#fff'
  },
  checkboxWrapperCarousel: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxWrapperVideoBank: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  videoBankTypeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  }
}));

const initialState = {
  uploading: false,
  file: '',
  type: '',
  title: '',
  subtitle: '',
  description: '',
  courseIds: [],
  errors: {},
  thumbnail: '',
  url: '',
  addToHeroCarousel: false,
  addToBank: false,
  isPdf: false,
  videoBankType: 'monthlyQa'
}

export default function TransitionsModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.config.isLoading);
  const courses = useSelector(state => state.course.courses)
  const [state, setState] = useState(initialState)
  const modalData = useSelector(state => state.config.modalData)
  const isToUpdate = Object.keys(modalData).length > 0

  const handleOpen = () => {
    dispatch(videoModalRequest(true));
  };

  const handleClose = () => {
    dispatch(videoModalRequest(false));
    handleResetHandle()
  };

  const handleResetHandle = () => {
    setState(initialState)
    dispatch(setModalDataRequest({}))
  }

  const handleUploadVideo = () => {

    const errors = validator(state)
    delete errors.courseIds
    if (isToUpdate /* || state.isPdf */) {
      delete errors.thumbnail
    }
    setState({ ...state, errors })
    if (Object.keys(errors).length) {
      return;
    }
    const formData = new FormData()
    formData.append('video', state.file)
    formData.append('bankType', state.videoBankType)
    formData.append('title', state.title)
    formData.append('subTitle', state.subtitle)
    formData.append('description', state.description)
    formData.append('image', state.thumbnail)
    formData.append('addToBank', state.addToBank)
    formData.append('addToHeroCarousel', state.addToHeroCarousel)
    var courseIds = state.courseIds;
    for (var i = 0; i < courseIds.length; i++) {
      formData.append('courseId[]', courseIds[i]);
    }
    if (isToUpdate) {
      state.thumbnail === '' && formData.delete('image')
      formData.delete('video')
      dispatch(updateVideoRequest({ formData, videoId: modalData._id }))
      return
    }
    if (state.isPdf) {
      // formData.delete('image')
    }
    dispatch(uploadVideoRequest({ formData }))
  }

  function handleChange(value, name) {
    let stateData = { ...state };
    stateData[name] = value;
    setState(stateData);
  }

  function onChange(event, name) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      let isPdf = state.isPdf
      if (file.type.includes('pdf')) {
        isPdf = true
      }
      setState({ ...state, [name]: file, uploading: true, isPdf, url: name === 'thumbnail' ? event.target.result : '' })
    };

    file && reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (isToUpdate) {
      setState({
        ...state,
        uploading: true,
        description: modalData.description,
        title: modalData.title,
        subtitle: modalData.subTitle,
        url: modalData.image,
        addToBank: modalData.addToBank || state.addToBank,
        addToHeroCarousel: modalData.addToHeroCarousel || state.addToHeroCarousel,
        isPdf: modalData?.videoLink?.includes('pdf')
      })
    }
  }, [isToUpdate])

  useEffect(() => {
    if (!courses.isSuccess) {
      dispatch(getCourseListRequest())
    }
  }, [])

  return (
    <CommonModal onClose={handleResetHandle}>
      <div className={classes.modalHeader} >
        <span>{!state.uploading && "Upload Videos"}</span>
        <CloseIcon onClick={handleClose} className={classes.closeIcon} />
      </div>
      <div className={state.uploading ? classes.uploadWrapper : classes.uploadingWrapper} >
        {state.uploading &&
          <div className={classes.inputsWrapper} >
            <div className={classes.details} >Details</div>
            <div className={classes.titleAreaWrapper} >
              <GenericTextArea
                value={state.title}
                handleChange={handleChange}
                name='title'
                title='Title (required)'
                placeholder='Add a title that describe your video'
                error={state?.errors?.title}
              />
            </div>
            <div className={classes.descriptionWrapper} >
              <GenericTextArea
                value={state.subtitle}
                handleChange={handleChange}
                name='subtitle'
                title='Subtitle (required)'
                placeholder='Add a subtitle '
                error={state?.errors?.subtitle}
              />
            </div>
            <div className={classes.descriptionWrapper} >
              <GenericTextArea
                value={state.description}
                handleChange={handleChange}
                name='description'
                isBigger={true}
                title='Description'
                placeholder='Tell viewers about your video'
                error={state?.errors?.description}
              />

            </div>
            {/* !state.isPdf && */
              <>
                <div className={classes.sectionTitle} >Thumbnail</div>
                <span className={classes.thumbnailDescription} >Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</span>
                <div className={classes.addThumbnail} >
                  {state.url !== '' && <img className={classes.thumbnail} src={state.url} />}
                  <input onChange={(e) => onChange(e, 'thumbnail')} accept="image/*" className={classes.input} type='file' capture />
                  <AddPhotoAlternateIcon />
                  <div className={classes.uploadThumbnailText} >Upload Thumbnail</div>
                </div>
              </>}
            <ErrorMessage error={state?.errors?.thumbnail} />
            {(Array.isArray(courses.data) && courses.data.length > 0) &&
              <>
                <div className={classes.sectionTitle} >Courses</div>
                <span className={classes.thumbnailDescription} >Add your video to one or more courses. Courses can help viewers to discover your content faster.  </span>
                <MultipleSelect name='courseIds' onSelect={handleChange} nameKey={'title'} multiple={true} list={courses.data} />
                <ErrorMessage error={state?.errors?.courseIds} />
              </>
            }
            {!state.isPdf &&
              <div className={classes.checkboxWrapperCarousel}  >
                <Checkbox
                  checked={state.addToHeroCarousel}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onChange={(e) => handleChange(!state.addToHeroCarousel, 'addToHeroCarousel')}
                />
                <div className={classes.sectionTitle} >Add to Hero Carousel</div>
              </div>}
            {!state.isPdf &&
              <>
                <div className={classes.checkboxWrapperVideoBank}>
                  <Checkbox
                    checked={state.addToBank}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={(e) => handleChange(!state.addToBank, 'addToBank')}
                  />
                  <div className={classes.sectionTitle} >Add to Video Bank</div>
                </div>
                {state.addToBank && 
                <div className={classes.videoBankTypeWrapper} >
                  Video Bank Type:
                  <VideoBankSelectType onSelect={handleChange} name='videoBankType' />
                </div> }
              </>}
          </div>
        }
        {!state.uploading &&
          <React.Fragment>
            <div className={classes.uploadIconContainer} >
              <input onChange={(e) => onChange(e, 'file')} accept="video/*,.pdf" className={classes.input} type='file' capture />
              <ForwardIcon className={classes.uploadIcon} />
              <div className={classes.uploadIconUnderline} />
            </div>
            <div className={classes.dragTag}  >Drag and drop Video/PDF files to upload</div>
          </React.Fragment>
        }
      </div>
      {state.uploading &&
        <div className={classes.footer} >
          <div className={classes.footerContent} >
            {isLoading &&
              <>
                <div className={classes.uploadIconContainerSmall} >
                  <ForwardIcon className={classes.uploadIconSmall} />
                  <div className={classes.uploadIconUnderlineSmall} />
                </div>
                <span>Uploading...</span>
              </>}
          </div>
          <button disabled={isLoading} onClick={handleUploadVideo} className={classes.button} >
            {isLoading ? <Loader style={{ color: '#fff' }} /> : "UPLOAD"}
          </button>
        </div>}
    </CommonModal>
  );
}
