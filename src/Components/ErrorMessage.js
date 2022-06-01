import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    errorMessage:{
        fontSize: 12,
        color: 'red',
      }
  }));

  const route = [
      {name:'Dashboard', route:'/'},
      {name:'Course List', route:'/playlist'},
      {name:'Trainers', route:'/trainers'}
    ]

export default function ErrorMessage({error}) {
    const classes = useStyles();
    return (
       <>
       {(error && error !=='') && <div className={classes.errorMessage} >{error}</div>}
       </>
    )
}
