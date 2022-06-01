import React, {useEffect} from 'react';
import {Container} from '@material-ui/core';
import FileUploader from '../Components/FileUploader';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import videocamera from '../assets/videocamera.jpg'
import VideoList from '../Components/VideoList';
import {  useSelector, useDispatch} from "react-redux";
import {videoModalRequest, getVideoRequest} from '../redux/actions';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import { io } from "socket.io-client";
// var socket = require('socket.io-client')('http://ec2-13-233-245-254.ap-south-1.compute.amazonaws.com:3000/', {transports: ['polling']});

// socket.on('connect', function(){
//     console.log("connection made")
// });
// socket.on('videoProgress', function(data){
//     console.log("video upload progress: ",data);
// });
// socket.on('disconnect', function(){
//     console.log("disconnected...")
// });


const useStyles = makeStyles((theme) => ({
    root: {
    //   flexGrow: 1,
    },
    paperOne: {
      padding: '40px 60px',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      position:'fixed',
      top:'30vh'
    },
    container:{
        // height:'100%', 
        overflowY:'hidden'
    },
    childContainer:{
        height:'inherit'
    },
    paperWrapper:{
        height:'inherit',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        outline:'none',
        border:'none',
        background:"#065fd4",
        color:'#fff',
        padding:10,
        cursor:'pointer'
    },
    title:{
        fontWeight:700,
        color:'#000000'
    },
    description:{
        margin:'6px 0px 35px 0px',
        fontSize:'.8rem'
    },
    videocamera:{
        width:120,
        height:120,
        borderRadius:60,
        marginBottom:35
    },
    paperWrapperTwo:{
        // height:'95%'
    },
    paperTwo:{
        minHeight:'85vh',
        padding:10,
        margin:10
    },
    loaderWrapper:{
        // height:'100%',
    }
  }));

export default function Dashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const videoModal = useSelector(state => state.config.videoModal.isVisible);
    const videos = useSelector(state => state.course.videos);

    useEffect(() => {
        if(!videos.isSuccess){
            dispatch(getVideoRequest())
        }
    }, [])

    const handleModal = (status) => {
        dispatch(videoModalRequest(status))
    }

    const connect = () => {
      
       
    }
    return (
        <Container className={classes.container} > 
        <FileUploader/>
            <Grid container className={classes.childContainer} spacing={3}>
                <Grid className={classes.paperWrapper} item xs={6}>
                    <Paper className={classes.paperOne}>
                        <img className={classes.videocamera} src={videocamera} />
                        <div className={classes.title}      onClick={connect} >Upload a video to get started</div>
                        <div className={classes.description} >Videos you upload will show up here.</div>
                        <button onClick={()=>handleModal(true)} className={classes.button} >UPLOAD CONTENT</button>
                    </Paper>
                </Grid>
                <Grid className={classes.paperWrapperTwo} item xs={6}>
                    <Paper className={classes.paperTwo}>
                        {videos.isLoading && <Loader variant='large' />} 
                        {videos.isError && <Error message={videos.message} />} 
                        {videos.isSuccess && <VideoList list={videos.data} />}
                    </Paper>
                </Grid>
            </Grid>
                    {/* <Document
                        file={"https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"}
                        // onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={1} />
                      </Document> */}
        </Container>
    )
}
