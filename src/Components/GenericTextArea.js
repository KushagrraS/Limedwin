import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ErrorMessage from './ErrorMessage';


const useStyles = makeStyles((theme) => ({
    inputWrapper:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        padding:10,
        border:'1px solid rgba(0,0,0,0.2)',
        borderRadius:5,
        marginBottom:10,
        '&:hover':{
          border:'1px solid rgba(0,0,0,0.5)',
        },
        '&:focus-within':{
          border:'1px solid rgba(0,0,0,0.5)',
        }
      },
      textarea:{
        border:'none',
        outline:'none',
        display:'flex',
        flex:1,
        fontFamily:'unset',
        marginTop:10
      },
      textareaHeight:{
          height:'10vh'
      },
      title:{
          fontSize:'14px'
      }
}))

export default function GenericTextArea({
    handleChange =()=> null ,
    value,
    placeholder,
    title,
    name,
    isBigger = false,
    error,
    style = {}
}) {
    const classes = useStyles();

    const onChange = (e) => {
        handleChange(e.target.value, name)
    }

    return (<>
        <div style={isBigger ? {height:'12vh', ...style} : {...style}} className={classes.inputWrapper} >
            {title && <div className={classes.title}>{title}</div>}
        <textarea name={name} onChange={onChange} value={value} placeholder={placeholder} className={classes.textarea} />
      </div>
        <ErrorMessage error={error} />
        </>
    )
}
