import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appLogo from '../assets/logo.png'
import { loginRequest } from '../redux/actions'
import validator from '../utils/validation'
import '../styles/login.scss'
import Loader from '../Components/Loader'

export default function Login() {

    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.loginData)
    const [state, setState] = useState({ 
        email: '',
        password: '',
        errors: {}
     })

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validator(state)
        setState({ ...state, errors })
        if(Object.keys(errors).length){

        }else{
            const payload = { email: state.email, password: state.password }
            dispatch(loginRequest(payload))
        }
    }

    const handleChange = (value, name) => {
        let data = { ...state }
        data[name] = value
        setState(data)
    }
    
    return (
        <div className="wrapper fadeInDown">
           
            <div id="formContent">
                <h2 className="active"> Sign In </h2>
                {/* <h2 className="inactive underlineHover">Sign Up </h2> */}

                <div className="fadeIn first">
                    <img src={appLogo} id="icon" alt="User Icon" />
                </div>

                <form contentEditable={false} onSubmit={handleSubmit}>
                    <input onChange={(e) => handleChange(e.target.value, 'email')} type="text" id="login" className="fadeIn second" name="login" placeholder="email / username"/>
                    <div style={{ color: 'red', textAlign: 'left', marginLeft: '3rem', fontSize: 15, marginBottom: 10 }} >{loginData.message}</div>
                    <input onChange={(e) => handleChange(e.target.value, 'password')} type="password" id="password" className="fadeIn third" name="login" placeholder="password"/>
                    {loginData.isLoading ? <div className='loader-wrapper'><Loader /></div> :
                    <input type="submit" className="fadeIn fourth" value="Log In"/>}
                </form>

                <div id="formFooter">
                {/* <a className="underlineHover" href="#">Forgot Password?</a> */}
                </div>

            </div>
        </div>
    )
}
