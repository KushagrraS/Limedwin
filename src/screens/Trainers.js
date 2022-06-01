import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GenericTable from '../Components/Table';
import CreateTrainerModal from "../Components/CreateTrainer";
import {getTrainersRequest, videoModalRequest, deleteTrainerRequest} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {ReactComponent as VerifiedBadge} from '../assets/svgs/check.svg';
import {ReactComponent as UnverifiedBadge} from '../assets/svgs/cancel.svg';
import defaultAvtar from '../assets/avatar.jpeg'
import Loader from '../Components/Loader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Error from '../Components/Error';

const useStyles = makeStyles((theme) => ({
    root: {
        '&:-webkit-scrollbar':{
            width: 0, 
            background: 'transparent'
        },
        padding:10
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
        width:60,
        height:60,
        borderRadius:30
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


export default function Trainers() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const trainersList = useSelector(state => state.course.allTrainers)
    const [state, setState] = useState({

    })

    const handleOpenModal = () =>{
        if(trainersList.isLoading){
            return;
        }
        dispatch(videoModalRequest(true));
    }

    useEffect(() => {
        if(!trainersList.isSuccess){
            dispatch(getTrainersRequest())
        }
    }, [])

    const getRating = (rating) => {
        if(rating.length){
            return rating.reduce((a, b)=> a+b)
        }
        return 'NA'
    }

    const makeTableData = (rows=[]) => {
        if(!rows.length){
            return []
        }
        let data = [];
        rows.map((item) => {
            let a = {
                profile: <img src={item.profilePicture || defaultAvtar} className={classes.avtar} />,
                name: item.name,
                about: item.about, 
                rating: getRating(item.rating) , 
                verified: item.verified ? <VerifiedBadge width="20px" height='20px' /> : <UnverifiedBadge width='17px' height='17px' />,
                profilePicture: item.profilePicture,
                _id: item._id,
                isVerified: item.verified,
                role: item.role
            }
            data.push(a)
        })
        return data
    }

    const handleDeleteTainer = (trainerId) => {
        dispatch(deleteTrainerRequest({trainerId}))
    }

    return (
        <div className={classes.root}>
            <CreateTrainerModal />
            <div className={classes.titleWrapper} >
                <div className={classes.playlistTitle} >Trainers</div>
                {/* <div className={classes.newPlaylistTitle} onClick={handleOpenModal} >CREATE NEW TRAINER</div> */}
            </div>
            {trainersList.isLoading &&  <Loader variant='big' />}
            {trainersList.isSuccess && 
                <GenericTable
                    headers={['Profile', 'Name', 'About', 'Rating', 'Role', 'Verified']}
                    cellData={makeTableData(trainersList.data)}
                    keys={['profile', 'name', 'about', 'rating', 'role',  'verified']}
                    handleDelete ={handleDeleteTainer}
            />}
            {trainersList.isError && <Error message={trainersList.message} />}
             <Fab size="small" onClick={handleOpenModal} color="secondary" aria-label="add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </div>
    )
}
