import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import GenericTextArea from './GenericTextArea';
import CommonModal from "./CommonModal";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from '@material-ui/icons/Create';
import tempAvatar from '../assets/avatar.jpeg';
import Checkbox from '@material-ui/core/Checkbox';
import {createTrainerRequest, videoModalRequest, updateTrainerRequest} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import Loader from "./Loader";
import validator from "../utils/validation";
import ErrorMessage from "./ErrorMessage";

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
        width:100,
        height:100,
        marginBottom:'1rem'
    },
    tempAvatar:{
        width:'100%',
        height:'100%',
        borderRadius:'50%',
        // border:'1px solid rgba(0,0,0, .3)'
    },
    pencilWrapper:{
        position:'absolute',
        right:-10,
        top:50,
        width:30,
        height:30,
        borderRadius:15,
        background:'rgba(0,0,0, .5)',
        color:'#fff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
        zIndex:0
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
        width:80,
        height:40,
        cursor: 'pointer'
      },
      input:{
          width:'100%',
          height:'100%',
          position:'absolute',
          zIndex:100,
          left:0,
          opacity:0,
          cursor:'pointer'
      }
}))

const initialState = {
    url:'',
    verified:true,
    name:'',
    about:'',
    role:'',
    file:'',
    errors:{}
}

export default  function CreateTrainerModal(){
    const  classes = useStyles();
    const dispatch = useDispatch();
    const trainersList = useSelector(state => state.course.trainersList)
    const isLoading = useSelector(state => state.config.isLoading)
    const modalData = useSelector(state => state.config.modalData)
    const [state, setState] = useState(initialState)
    const isToUpdate = Object.keys(modalData).length > 0

    const handleReset = () => {
        setState(initialState)
    }

    const handleCreateTrainer = () =>{
        const errors = validator(state)
        setState({...state, errors})
        if(Object.keys(errors).length){
            return;
        }
        var formdata = new FormData();
        formdata.append('name',state.name);
        formdata.append('about', state.about)
        formdata.append('role', state.role)
        formdata.append('verified', state.verified)
        formdata.append('avtar', state.file)
        if(isToUpdate){
            dispatch(updateTrainerRequest({data:formdata, trainerId:modalData._id}))
            return;
        }
        dispatch(createTrainerRequest(formdata))
        
    }

    useEffect(() => {
        if(isToUpdate){
            setState({
                name:modalData.name,
                about:modalData.about,
                role:modalData.role,
                url:modalData.profilePicture,
                verified:modalData.isVerified
            })
        }
    }, [modalData])

    function onChange(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
        setState({...state, file, url: event.target.result})
        };
        file && reader.readAsDataURL(file);
    }

    const handleChange = (value, name) => {
        let stateData = {...state};
        stateData[name] = value;
        setState(stateData);
    }
    const handleClose = () => {
        dispatch(videoModalRequest(false));
    };

    return(
       <CommonModal onClose={handleReset}>
               <div className={classes.modalHeader} >
                   <span>{ "Trainer Details"}</span>
                   <CloseIcon onClick={handleClose}  className={classes.closeIcon} />
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
                       <div className={classes.lable}  >Name:</div>
                       <GenericTextArea
                           value={state.name}
                           name='name'
                           handleChange={handleChange}
                           error = {state?.errors?.name}
                       />
                       <div className={classes.lable}>About:</div>
                       <GenericTextArea
                           name = 'about'
                           value={state.about}
                           handleChange={handleChange}
                           isBigger={true}
                           error = {state?.errors?.about}
                       />
                       <div className={classes.lable}>Role:</div>
                       <GenericTextArea
                           value={state.role}
                           name='role'
                           handleChange={handleChange}
                           error = {state?.errors?.role}
                       />
                       <div className={classes.checkboxWrapper} >
                           <div className={classes.lable}>Verified:</div>
                           <Checkbox
                               checked={state.verified}
                               color="primary"
                               inputProps={{ 'aria-label': 'secondary checkbox' }}
                               onChange={(e)=>  handleChange(!state.verified, 'verified')}
                           />
                       </div>
                   </div>
                   </div>
                <div className={classes.footer} >
                    <button disabled={isLoading} onClick={handleCreateTrainer} className={classes.button} >
                       {isLoading ?  <Loader color = '#fff' /> : isToUpdate ? "UPDATE" : 'CREATE' }
                    </button>
                </div>
       </CommonModal>
    )
}