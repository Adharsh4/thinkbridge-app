import React, { useState, useEffect } from 'react';
import './Login.css'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import  validator  from "validator";
import {connect} from 'react-redux';
import * as actions from "../store/actions"
import Loader from "react-loader-spinner"

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [userToken, setUserToken] = useState(localStorage.getItem("user"));
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        props.changeIsLoading();
        localStorage.removeItem("email");
    }, [])

    const signinOrRegister = (e, type) => {
        e.preventDefault();
        if (email === "" || password === "" ) {
            const errorMessage = "Please fill all fields"
            props.setErrorMessage(errorMessage)
            alert(errorMessage);
            return;
        }else if(!validator.isEmail(email)){
            const errorMessage = "Please enter valid email"
            props.setErrorMessage(errorMessage)
            alert(errorMessage);
            return;
        } else {
            props.singinOrRegisterUser({email, password, type, history: props.history })
            if(type !== "signin"){
                setEmail("");
                setPassword("");
                setIsClicked(prevState => !prevState);
            }
        }
    }

    const setIsClickedHandler = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked)
    }

    return (
        props.isLoading ? <div className="loading"><h3>Please wait...</h3><Loader type = "Oval" color="#00BFFF" height={30} width={30}/></div> :
            <div className='login__container'>
                {!isClicked ? <h1 className="text-center">Sign-in</h1> : <h1 className="text-center">Sign-up</h1>}

                <form className="form__alingment">
                    <div class="form-group">
                        <input type="email" class="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                        
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div  className="text-center">
                        {!isClicked ? <button  type='submit' onClick={(e) => signinOrRegister(e, "singin")} className='login__signInButton'>Sign In</button> : <button onClick={(e) => signinOrRegister(e, "register")} className='login__RegisterButton'>Register</button>}
                        {!isClicked ? <button className='custom-button' onClick={e => setIsClickedHandler(e)}>Switch to sign up</button> :
                        <button className='custom-button' onClick={e => setIsClickedHandler(e)}>Switch to sign in</button>}
                    </div>
                </form>
            </div>
          
    )

    

}
const mapStateToProps = (state) => {
    return{
        isLoading: state.isLoading
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return{
        changeIsLoading: () => dispatch(actions.changeIsLoading()),
        singinOrRegisterUser : (postObject) => dispatch(actions.singinOrRegisterUser(postObject)),
        setErrorMessage: (message) => dispatch(actions.setErrorMessage(message))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

