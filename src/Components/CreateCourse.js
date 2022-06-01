import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import GenericTextArea from './GenericTextArea';
import CommonModal from "./CommonModal";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from '@material-ui/icons/Create';
import tempAvatar from '../assets/avatar.jpeg';
import Checkbox from '@material-ui/core/Checkbox';
import {createCourseRequest, videoModalRequest,getTrainersRequest, updateCourseRequest} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import MultipleSelect from "./Select";
import Loader from './Loader'
import validator from "../utils/validation";
import ErrorMessage from "./ErrorMessage";
import appLogo from '../assets/logo.png'

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
    contentWrapper:{
        display:'flex',
        flex:1,
        flexDirection:'column',
    },
    content:{
        display: 'flex',
        flex: 1,
        padding: 30,
        overflowY: 'scroll'
    },
    mainContent:{
        padding:'1rem',
        width:'55%',
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        },
    },
    lable:{
        fontWeight:'500',
        marginBottom:'1rem',
        marginTop:'1rem'
    },
    avatarWrapper:{
        position:'relative',
        width:150,
        height:100,
        marginBottom:'1rem'
    },
    tempAvatar:{
        width:'100%',
        height:'100%',
        borderRadius:5
    },
    pencilWrapper:{
        position:'absolute',
        right:-10,
        top:35,
        width:30,
        height:30,
        borderRadius:15,
        background:'rgba(0,0,0, .5)',
        color:'#fff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer'
    },
    pencilIcon:{
        fontSize:'1.2em'
    },
    inputsWrapper:{
        width: '55%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    checkboxWrapper:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
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
      input:{
        width:'100%',
        height:'100%',
        position:'absolute',
        zIndex:100,
        left:0,
        opacity:0
    }
}))


const initialState = {
    title:'',
    description:'',
    trainerId:'',
    subtitle:'',
    image:'',
    file:'',
    url:'',
    errors: {},
    videos:[]
}

export default  function CreateTrainerModal(){
    const  classes = useStyles();
    const dispatch = useDispatch();
    const trainersList = useSelector(state => state.course.allTrainers)
    const isLoading = useSelector(state => state.config.isLoading)
    const modalData = useSelector(state => state.config.modalData)
    const [state, setState] = useState(initialState)
    const videos = useSelector(state => state.course.videos);
    const isToUpdate = Object.keys(modalData).length > 0

    const handleReset = () => {
        setState(initialState)
    }

    const handleCreateTrainer = () => {
        const errors = validator(state)
        delete errors.videos
        delete errors.subtitle
        setState({...state, errors})
        if(Object.keys(errors).length){
            return;
        }
        var formdata = new FormData();
        formdata.append('title',state.title); 
        formdata.append('description', state.description)
        // formdata.append('subtitle', state.subtitle)
        formdata.append('trainerId', state.trainerId)
        formdata.append('image', state.file)
        for (var i = 0; i < state.videos.length; i++) {
            formdata.append('videos[]', state.videos[i]);
        }
        if(isToUpdate){
            if(state.file === ''){
                formdata.delete('image');
            }
            formdata.delete('trainerId');
            dispatch(updateCourseRequest({data:formdata, courseId:modalData._id}))
            return;
        }
        dispatch(createCourseRequest(formdata))
    }

    useEffect(() => {
        if(isToUpdate){
            setState({
                title:modalData.title,
                description:modalData.description,
                subtitle:modalData.subtitle || '',
                url:modalData.imageUrl,
                videos:modalData.videos,
                trainerId:modalData.aboutTrainer,
                videos:modalData.videos
            })
        }
    }, [modalData])

    useEffect(() => {
        if(!trainersList.isSuccess){
            dispatch(getTrainersRequest())
        }
    }, [])

    const handleChange = (value, name) => {
        let stateData = {...state};
        stateData[name] = value;
        setState(stateData);
    }

    function onChange(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
          setState({...state, file, url: event.target.result})
        };
      
        file && reader.readAsDataURL(file);
      }

    const handleClose = () => {
        dispatch(videoModalRequest(false));
    };

    return(
       <CommonModal onClose={handleReset}>
               <div className={classes.modalHeader} >
                   <span>{ "Create Course"}</span>
                   <CloseIcon  onClick={handleClose} className={classes.closeIcon} />
               </div>
               <div className={classes.content} >
                   <div className={classes.inputsWrapper} >
                       <div className={classes.avatarWrapper} >
                           <img  className={classes.tempAvatar} src={state.url || tempAvatar} />
                           <input onChange={onChange} className={classes.input} type='file' />
                           <div className={classes.pencilWrapper} >
                               <CreateIcon className={classes.pencilIcon} />
                           </div>
                       </div>
                       <ErrorMessage error={state?.errors?.file} />
                       <div className={classes.lable}  >Title:</div>
                       <GenericTextArea
                           value={state.title}
                           name='title'
                           handleChange={handleChange}
                           error = {state?.errors?.title}
                       />
                       <div className={classes.lable}>Description:</div>
                       <GenericTextArea
                           name = 'description'
                           value={state.description}
                           handleChange={handleChange}
                           error = {state?.errors?.description}
                       />
                       <div className={classes.lable}>Subtitle:</div>
                       <GenericTextArea
                           value={state.subtitle}
                           name='subtitle'
                           handleChange={handleChange}
                           error = {state?.errors?.subtitle}
                       />
                      {(Array.isArray(videos.data) && videos.data.length > 0) &&
                        <>
                                <div className={classes.checkboxWrapper} >
                                    <div className={classes.lable}>Content:</div>
                                    <MultipleSelect 
                                            isToUpdate={isToUpdate}
                                            selectedKeys={state.videos} 
                                            type='video' 
                                            multiple={true} 
                                            nameKey='title' 
                                            name='videos' 
                                            onSelect={handleChange} 
                                            list={videos.data} 
                                        />
                                </div>
                                <ErrorMessage error={state?.errors?.videos} />
                        </>
                       }
                       <div className={classes.checkboxWrapper} >
                           <div className={classes.lable}>Trainer:</div>
                           <MultipleSelect 
                                isToUpdate={isToUpdate} 
                                nameKey='name' 
                                name='trainerId' 
                                selectedKeys={state.trainerId}
                                onSelect={handleChange} 
                                list={trainersList.data} 
                            />
                       </div>
                       <ErrorMessage error={state?.errors?.trainerId} />
                   </div>
                   </div>
                <div className={classes.footer} >
                    <button disabled={isLoading} onClick={handleCreateTrainer} className={classes.button} >
                        {isLoading ?  <Loader style={{color:'#fff'}} /> : isToUpdate ? 'UPDATE' : "ADD" }
                    </button>
                </div>
       </CommonModal>
    )
} 