import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:'80vh'
  },
  message:{
      fontSize:'1rem'
  }
}));

export default function Error({ color ='#3ea8ad', message = '' }) {
  const classes = useStyles();

  return (
    <div className={classes.root} >
        <div className={classes.message} >{message}</div>
    </div>
  );
}