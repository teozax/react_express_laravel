import * as ActionTypes from '../ActionsRed';

const initState = {
  authResponse: "",
  framework: "Django",
  user:{},
  prof_trigger:1
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.RESTART_AUTH_RESPONSE:
      return {
        ...state,
        authResponse: "",
        user:{}
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        authResponse: "loading..."
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        // authResponse: action.res,
      };
    case ActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authResponse: "redirecting to dashboard...",
        framework: action.framework,
        user: action.user
      };
    case ActionTypes.LOGIN_ERROR:
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        authResponse: action.res,
        prof_trigger:state.prof_trigger*(-1)
      }; 
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        authResponse: action.res,
        framework:''
      };
    case ActionTypes.LOGOUT_ERROR:
      return {
        ...state,
        authResponse: action.res,
      }; 
    case ActionTypes.CODE_ERROR:
      return {
        ...state,
        authResponse:
        "There seems to be a problem, please refresh your browser",
      };
    default:
      return state;
  }
};
export default AuthReducer;