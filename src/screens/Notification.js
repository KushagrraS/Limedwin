import React, {useEffect} from 'react';
import {Container} from '@material-ui/core';
import FileUploader from '../Components/FileUploader';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import videocamera from '../assets/videocamera.jpg'
import VideoList from '../Components/VideoList';
import {  useSelector, useDispatch} from "react-redux";
import {videoModalRequest, getVideoRequest, getUserListRequest, sendNotificationdRequest} from '../redux/actions';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import { Document, Page, pdfjs } from 'react-pdf';
import { getDashboardRequest } from '../redux/actions';
import GenericTextArea from '../Components/GenericTextArea';
import { useState } from 'react';
import MultipleSelect from '../Components/Select';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import NotificationList from "../Components/NotificationList"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '80vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    tabContainer:{
justifyContent:"space-between"
    },
    paperOne: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },

    paperView: {
        width: '50%',
    },

    detailsView: {
        marginTop: 20,
        marginBottom: 20
    },

    fileImg: {
        width: 200,
        height: 100,
        marginBottom: 10,
        marginTop: 20
    },

    button: {
        outline: 'none',
        border: 'none',
        background: '#065fd4',
        color: '#fff',
        width: 150,
        height: 40,
        cursor: 'pointer',
        marginTop: 20
      },

      selectUser: {
          marginTop: 30
      }
  }));

export default function SendNotification() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sendNotification = useSelector(state => state.auth.sendNotification)
    const userlist = useSelector(state => state.course.userlist)
    const [state, setState] = useState({
        title: '',
        body: '',
        data: {},
        file: null,
        fileUrl: '',
        userId: ''
    })
    const [value, setValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
      };
    console.log(state, 'kkkkkkkk');

    useEffect(() => {
        (async() => {
            dispatch(getDashboardRequest())
            if(!userlist.isSccuess){
                dispatch(getUserListRequest())
            }
        })()
    }, [])


    const handleSubmit = () => {

        const formData = new FormData()
        formData.append('title', state.title)
        formData.append('body', state.body)
        formData.append('data', JSON.stringify(state.data))
        state.file && formData.append('file', state.file)
        var userIds = Array.isArray(state.userId) ? state.userId : [state.userId];
        for (var i = 0; i < userIds.length; i++) {
            userIds[i] && formData.append('userId[]', userIds[i]);
        }

        dispatch(sendNotificationdRequest(formData))
    }

    const handleChange = (value, name) => {
        let data = { ...state }
        data[name] = value
        setState(data)
    }

    const onChange = (event, name) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            console.log(file,'event.target.result');
          setState({ ...state, [name]: file, fileUrl: event.target.result })
        };

        file && reader.readAsDataURL(file);
      }


      console.log(value,'valuevalue');
    return (
        <Container className={classes.container} >
        <AppBar position="static">
        <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example" className={classes.tabContainer} >
          <Tab label="Send Notification" {...a11yProps(0)} />
          <Tab label="Notification List" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
            {value ===0 &&<div className={classes.paperView} >
                <h3>Send Notification</h3>
                <Paper className={classes.paperOne}>
                   <GenericTextArea placeholder='Title' name='title'  handleChange={handleChange} />
                   <GenericTextArea placeholder='Description' name='body' handleChange={handleChange}/>
                   {/* <GenericTextArea placeholder='Data (Optional)' name='data'handleChange={handleChange} /> */}
                   {state.fileUrl &&<div><img className={classes.fileImg} src={state.fileUrl} /></div>}
                    <input onChange={(e) => onChange(e, 'file')} accept="image/*" className={classes.input} type='file' capture />
                   <div className={classes.selectUser} >Select User</div>
                   <MultipleSelect
                        name='name'
                        onSelect={(value) => handleChange(value, 'userId')}
                        nameKey={'name'}
                        returnKey={'_id'}
                        defaultSelect={true}
                        // defaultSelectIndex={defaultSelectIndex}
                        multiple={true}
                        invokeOnSelectOnInitialisation={false}
                        list={userlist.data}
                        // disabled={usersSubscription.isLoading}
                    />

                        <button disabled={sendNotification.isLoading} onClick={handleSubmit} className={classes.button}>
                           {sendNotification.isLoading? "...Sending":"Send Notification"}
                        </button>
                </Paper>
            </div>
}

{value ===1 &&<NotificationList/>}
        </Container>
    )
}
