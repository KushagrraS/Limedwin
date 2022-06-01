import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from  'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:'80vh'
  },
  small:{
      width:'20px !important',
      height:'20px !important'
  },
  big:{
    width:'40px !important',
    height:'40px !important'
  }
}));

export default function Loader({value = 10, color ='#3ea8ad',  variant = 'small', style={}, className}) {
  const classes = useStyles();

  return (
    <div className={clsx(variant !== 'small' ?  classes.root : {}, className)}>
      <CircularProgress 
        color={"red"} 
        style={{color}} 
        className={ variant === 'small' ? classes.small : classes.big} 
        value={value}
      />
    </div>
  );
}