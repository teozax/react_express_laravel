import * as ActionTypes from '../ActionsRed';
import {HandleRequest} from '../Services/PrepareService';
import { useNavigate } from 'react-router-dom';

export const RegisterAction = (url, RequestOptions, navigate) => {
  return (dispatch) => {
    dispatch({type: ActionTypes.RESTART_AUTH_RESPONSE});
    dispatch({type: ActionTypes.LOADING});
    
    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      console.log(res)
      if(res.hasOwnProperty('success') && res.success === true){
        dispatch({type: ActionTypes.SIGNUP_SUCCESS, res});
        navigate('/Login');
      }else if(res.hasOwnProperty('success') && res.success === false){
        if(res.hasOwnProperty('errors')){
          const errors = Object.values(res.errors).map(err=>`${err}\n`) 
          alert(errors)
        }
        dispatch({type: ActionTypes.SIGNUP_ERROR,res});
      }
    }, error => {
      alert('server error');
      dispatch({type : ActionTypes.CODE_ERROR, error})
    })
  }
}

export const LoginAction = (url, RequestOptions, navigate) => {
  return (dispatch) => {
    dispatch({type: ActionTypes.RESTART_AUTH_RESPONSE});
    dispatch({type: ActionTypes.LOADING});

    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      console.log(res);
      let user;
      const framework = localStorage.getItem('framework');
      if(res.hasOwnProperty('success') && res.success === true){
        user = (framework==='Laravel') ? res.data : res.user;
        user =  JSON.stringify({email:user.email, username:user.name});
        localStorage.setItem('user-token', res.token);
        localStorage.setItem('user', user);
        dispatch({type: ActionTypes.LOGIN_SUCCESS, framework:res.framework, user});
        navigate('/Home');
      }else if(res.hasOwnProperty('success') && res.success === false){
        if(res.hasOwnProperty('errors')){
          const errors = Object.values(res.errors).map(err=>`${err}\n`) 
          alert(errors)
        }
        dispatch({type: ActionTypes.LOGIN_ERROR,res});
      }
    }, error => {
      alert('error');
      dispatch({type : ActionTypes.CODE_ERROR, error})
    })
  }
}

export const LogoutAction = (url, RequestOptions, navigate) => {
  return (dispatch) => {
    dispatch({type: ActionTypes.RESTART_AUTH_RESPONSE});

    HandleRequest(url, RequestOptions).then((res) => {
        if((res.hasOwnProperty('success') && res.success === true)||(res.ok===true)){
          localStorage.clear();
          dispatch({type: ActionTypes.LOGOUT_SUCCESS,res});
          navigate('/Login');
        }else if((res.hasOwnProperty('success') && res.success === false)||(res===false)){
          if(res.hasOwnProperty('errors')){
            const errors = Object.values(res.errors).map(err=>`${err}\n`) 
            alert(errors)
          }
          dispatch({type: ActionTypes.LOGOUT_ERROR,res});
        }
    }, error => {
      alert('error');
      dispatch({type : ActionTypes.CODE_ERROR, error})
    })
  }
}

export const Update_User_Action = (url, RequestOptions, edit) => {
  return (dispatch) => {
    HandleRequest(url, RequestOptions).then(res=>res.json())
    .then((res) => {
      console.log(res);
      if(res.hasOwnProperty('success') && res.success === true){
        const user = JSON.stringify({email:res.user.email, username:res.user.name});
        localStorage.setItem('user', user);
        edit[1](prev=>prev*(-1));
        dispatch({type: 'UPDATE_USER_SUCCESS',res:user});
      }else if((res.hasOwnProperty('success') && res.success === false)||(res===false)){
        if(res.hasOwnProperty('errors')){
          const errors = Object.values(res.errors).map(err=>`${err}\n`);
          alert(errors);
        }
        dispatch({type: 'UPDATE_NAME_ERROR', res});
      }
    }, error => {
      alert('error');
      dispatch({type : ActionTypes.CODE_ERROR, error});
    })
  }
}

