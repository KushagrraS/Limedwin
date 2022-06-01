import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      padding:10,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    routeWrapper:{
        display:'flex',
        flexDirection:'column'
    },
    link:{
        textDecoration:"none",
        padding:10, 
        color:'#3ea8ad'
    }
  }));

  const route = [
      {name:'Dashboard', route:'/'},
      {name:'Course List', route:'/playlist'},
      {name:'Trainers', route:'/trainers'}
    ]

export default function Sidebar() {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <div className={classes.routeWrapper} >
                {
                    route.map(element=>(
                        <Link className={classes.link} to={element.route} >{element.name}</Link>
                    ))
                }
            </div>
        </div>
    )
}
