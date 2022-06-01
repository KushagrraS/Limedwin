import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CreatePlayListModal from '../Components/CreateCourse';
import GenericTable from '../Components/Table';
import {useSelector, useDispatch} from 'react-redux';
import {getTrainersRequest, setModalDataRequest,deleteCourseRequest, getVideoRequest,  videoModalRequest, getCourseListRequest} from '../redux/actions';
import defaultAvtar from '../assets/avatar.jpeg'
import Loader from '../Components/Loader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Error from '../Components/Error';

const useStyles = makeStyles((theme) => ({
    root: {
        padding:10,
      },
    titleWrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      playlistTitle:{
          fontWeight:'bold',
          fontSize:'1.2rem'
      },
      newPlaylistTitle:{
          color:'#065fd4',
          fontWeight:'500',
          cursor:'pointer'
      },
      avtar:{
        width:80,
        height:50,
        borderRadius:5
    },
    fab:{
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
        background:'#3ea8ad', 
        '&:hover':{
            background:'#3ea8ad'
        }
    }
}))

export default function     () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const courses = useSelector(state => state.course.courses)
    const videos = useSelector(state => state.course.videos)
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({

    })

    useEffect(() => {
            dispatch(getCourseListRequest())
        if(!videos.isSuccess){
            dispatch(getVideoRequest())
        }
    }, [])
    
    const handleOpenModal = () =>{
        if(courses.isLoading){
            return
        }
        dispatch(videoModalRequest(true));
    }

    const handleCloseModal = () =>{
        setOpen(false);
    }

    const makeTableData = (rows=[]) => {
        if(!rows.length){
            return []
        }
        let data = [];
        rows.map((item) => {
            let a = {
                image:<img src={item.image || defaultAvtar} className={classes.avtar} />,
                title:item.title,
                subtitle:item.subtitle, 
                description:item.description , 
                imageUrl:item.image,
                _id:item._id,
                aboutTrainer:item.aboutTrainer,
                videos:item.videos
            }
            data.push(a)
        })
        return data
    }

    const handleEdit = (item) => {
        dispatch(setModalDataRequest(item))
        handleOpenModal()
    }

    const handleDeleteTainer = (courseId) => {
        dispatch(deleteCourseRequest({courseId}))
    }
    
    return (
        <div className={classes.root}>
            <CreatePlayListModal />
            <div className={classes.titleWrapper} >
                <div className={classes.playlistTitle} >Programmes</div>
                {/* <div className={classes.newPlaylistTitle} onClick={handleOpenModal} >NEW CREATE COURSE</div> */}
            </div>
            {courses.isLoading &&  <Loader variant='big' />}
            {courses.isSuccess && 
            <GenericTable
                headers={['Poster', 'Title', 'Sub Title', 'Description']}
                cellData={makeTableData(courses.data)}
                keys={['image', 'title', 'subtitle', 'description']}
                handleEdit={handleEdit}
                handleDelete ={handleDeleteTainer}
            />}
            {courses.isError && <Error message={courses.message} />}
            <Fab size="small" onClick={handleOpenModal} color="secondary" aria-label="add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </div>
    )
}
