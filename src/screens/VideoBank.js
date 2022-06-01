import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux'
import { getVideoBankRequest, deleteVideobankRequest, videoModalRequest, getVideoRequest } from '../redux/actions'
import Loader from "../Components/Loader";
import DeleteIcon from '@material-ui/icons/Delete';
import Error from "../Components/Error";
import AddVideoBankModal from "../Components/AddQuestionBankModal";
import PdfViewer from "../Components/PdfViewer";
import VideoBankSelectType from "../Components/VideoBankSelectType";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    background: "#3ea8ad",
    "&:hover": {
      background: "#3ea8ad",
    },
  },
  videoWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: "1rem",
    [theme.breakpoints.down('sm')]: {

    }
  },
  subtitle: {
    fontSize: "1.1rem",
  },
  videoDetailsWrapper: {
    marginLeft: "1rem",
    [theme.breakpoints.down('sm')]: {

    }
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  playlistTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  deleteIcon: {
    cursor: 'pointer',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pdfIcon: {
    width: 100
  },
  pdfIconWrapper: {
    minWidth: 250
  },
  videoBankTypeWrapper: {

  },
  emptyContent: {
    textAlign: 'center',
    marginTop: '20vh'
  }
}));

export default function VideoBank() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const videobank = useSelector(state => state.course.videobank)
  const [itemToDelete, setItemToDelete] = useState('')
  const videos = useSelector(state => state.course.videos)
  const isLoading = useSelector(state => state.config.isLoading)
  const [state, setState] = useState({ videoBankType: 'monthlyQa' })


  useEffect(() => {
    if (!videos.isSuccess) {
      dispatch(getVideoRequest())
    }
    dispatch(getVideoBankRequest())
  }, [])

  const handelDeleteVideo = (videobankId) => {
    dispatch(deleteVideobankRequest({ videobankId }))
  }

  const renderVideoBank = (data) => {
    const list = data.filter(a => a.type === state.videoBankType)
    if(!list.length){
      return  <div className={classes.emptyContent} >No content available for the selected category.</div>
    }
    return (
      <div>
        {list.map((item, index) => {
          const isPdf = item?.video?.videoLink?.includes('.pdf')
          return (
            <div
              className={classes.videoWrapper}
              style={index === 0 ? { marginTop: 0 } : {}}
            >
              <div className={classes.contentWrapper} >

                {isPdf ?
                  <PdfViewer />
                  // <div className={classes.pdfIconWrapper} >
                  //   <img className={classes.pdfIcon}  src={pdfIcon}/> 
                  // </div>
                  :
                  <video poster={item.video.image} width="250" controls>
                    <source src={item.video.videoLin} type="video/mp4" />
                  </video>}

                <div className={classes.videoDetailsWrapper}>
                  <div className={classes.subtitle}>{item.video.subTitle}</div>
                  <div className={classes.description}>
                    {item.video.description}
                  </div>
                </div>
              </div>
              {isLoading && itemToDelete === item._id ? <Loader variant='small' /> :
                <DeleteIcon
                  onClick={() => {
                    setItemToDelete(item._id)
                    handelDeleteVideo(item._id)
                  }}
                  className={classes.deleteIcon}
                />}
            </div>
          );
        })}
      </div>
    );
  };

  const handleOpenModal = () => {
    dispatch(videoModalRequest(true));
  }

  return (
    <div className={classes.root}>
      <AddVideoBankModal />
      <div className={classes.titleWrapper}>
        <div className={classes.playlistTitle}>Video Bank</div>
      </div>
      {videobank.isSuccess &&
        <div className={classes.videoBankTypeWrapper}>
          <VideoBankSelectType name='videoBankType' onSelect={(videoBankType) => setState({ ...state, videoBankType })} />
        </div>}
      {videobank.isLoading && <Loader variant='big' />}
      {videobank.isSuccess && renderVideoBank(videobank.data)}
      {videobank.isError && <Error message={videobank.message} />}
      <Fab
        size="small"
        onClick={handleOpenModal} color="secondary"
        aria-label="add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
