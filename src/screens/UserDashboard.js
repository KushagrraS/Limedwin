import React, {useEffect, useMemo} from 'react';
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
import { getDashboardRequest } from '../redux/actions';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '80vh',
    },

    paperOne: {
        width: '18%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        marginBottom: 10
    },

    paperView: {
        // width: '50%',
        display:"flex",
        // justifyContent:"space-evenly",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    detailsView: {
        marginTop: 20,
        marginBottom: 20
    }
  }));

export default function UserDashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userDashboardData = useSelector(state => state.auth.userDashboardData)

    useEffect(() => {
        (async() => {
            dispatch(getDashboardRequest())
        })()
    }, [])

    const numberOfActiveUsers =  useMemo(() => {
        if(userDashboardData.isSuccess){
            // return userDashboardData.data.filter(a => {
            //
            // } )
        }
        return 'NA'
    }, [userDashboardData])

    return (
        <Container className={classes.container} >
        {userDashboardData.isLoading &&  <Loader variant='big' />}
            {userDashboardData.isSuccess &&
            <div>
                <h1>
                    Dashboard
                </h1>
            <div className={classes.paperView} >
                <Paper className={classes.paperOne}>
                    <div className={classes.detailsView} >
                         <h2>Total Users</h2>
                         <p> {userDashboardData.data.total}</p>
                    </div>
                </Paper>

                <Paper className={classes.paperOne}>
                    <div className={classes.detailsView} >
                        <h2> Paid Users </h2><p> {userDashboardData.data.paid}</p>
                    </div>
                </Paper>
                <Paper className={classes.paperOne}>
                    <div className={classes.detailsView} >
                        <h2> Free Users</h2> <p> {userDashboardData.data.free}</p>
                    </div>
                </Paper>
                <Paper className={classes.paperOne}>
                    <div className={classes.detailsView} >
                         <h2>Book Downloaded</h2> <p>{userDashboardData.data.bookDownloadCount}</p>
                    </div>
                </Paper>
                <Paper className={classes.paperOne}>
                    <div className={classes.detailsView} >
                        <h2>Active User</h2> <p>{userDashboardData.data.active_users}</p>
                    </div>
                </Paper>
                <Paper className={classes.paperOne}>
                    <div className={classes.detailsView} >
                        <h2>Android User</h2> <p>{userDashboardData.data.android_users}</p>
                    </div>
                </Paper>
                <Paper className={classes.paperOne}>
                    <div className={classes.detailsView} >
                        <h2>iOS User</h2> <p>{userDashboardData.data.ios_users}</p>
                    </div>
                </Paper>
            </div>
            </div>
            }
        </Container>
    )
}
