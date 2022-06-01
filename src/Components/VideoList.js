import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import sampleVideo from '../assets/videos/mov_bbb.mp4'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { setModalDataRequest, videoModalRequest, deleteVideoRequest } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader';
import PdfViewer from './PdfViewer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  deleteIcon: {
    cursor: 'pointer',
  },
  videoDetailsDiv: {
    padding: 10,
    paddingRight: 30
  },
  videoTitle: {
    fontSize: '.9rem'
  },
  uploadedTime: {
    fontSize: '.7rem'
  },
  createIcon: {
    cursor: 'pointer',
    marginLeft: 10
  },
  iconWrapper: {
    display: 'flex',
    transform: 'unset'
  },
  pdfViewer: {
    width: 150,
    height: 150
  }
}));

export default function VideoList({ list }) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [itemToDelete, setItemToDelete] = useState('')
  const isLoading = useSelector(state => state.config.isLoading)

  const handleEdit = (item) => {
    dispatch(setModalDataRequest(item))
    dispatch(videoModalRequest(true))
  }

  const handelDeleteVideo = (videoId) => {
    dispatch(deleteVideoRequest({ videoId }))
  }

  return (
    <List className={classes.root}>

      {list.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${item}`;
        const isPdf = item?.videoLink?.includes('.pdf')
        return (
          <ListItem key={item._id + index} button>
            <ListItemAvatar>
              {isPdf ? <PdfViewer file={item.videoLink} className={classes.pdfViewer} /> :
                <video width="150" controls>
                  <source src={item.videoLink} type="video/mp4" />
                </video>}
            </ListItemAvatar>
            <div className={classes.videoDetailsDiv} >
              <div className={classes.videoTitle} >
                {item.title} {'\n'}
              </div>
              <div className={classes.uploadedTime} >
                {item.description}s,dbvsbdv sdkvbsd vlksdv sldkv sdlvks dvlskd vlsdjv sldvj sdv sd vs dvhjsdv jshdv shdjv sdjvhs
                  </div>
            </div>
            <ListItemSecondaryAction className={classes.iconWrapper} >
              {isLoading && itemToDelete === item._id ? <Loader variant='small' /> :
                <DeleteIcon
                  onClick={() => {
                    setItemToDelete(item._id)
                    handelDeleteVideo(item._id)
                  }}
                  className={classes.deleteIcon}
                />
              }
              <CreateIcon onClick={() => handleEdit(item)} className={classes.createIcon} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}