import {HandleRequest} from '../Services/PrepareService';
import * as ActionTypes from '../ActionsRed';
import { useSelector } from 'react-redux';

export const AddToCartAction = (url, RequestOptions, add_trigger) => {
  return (dispatch) => {
    // dispatch({type: ActionTypes.LOADING});
  
    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      if(res.hasOwnProperty('success') && res.success === true){
        dispatch({type: ActionTypes.CART_ITEM_ADDED, trigger:add_trigger});
      }else if(res.hasOwnProperty('success') && res.success === false){
        dispatch({type: ActionTypes.LOAD_PROFILE_ERROR,res});
      }
    }, error => {
      dispatch({type : ActionTypes.CODE_ERROR, error})
    })
  }
}

export const LoadCartAction = (url, RequestOptions) => {
  return (dispatch) => {
    // dispatch({type: ActionTypes.LOADING});

    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      if(res.hasOwnProperty('success') && res.success === true){
        
        const cart = res.user_cart_items;
        dispatch({type: 'LOAD_CART_SUCCESS', res:cart});
      }else if(res.hasOwnProperty('success') && res.success === false){
        dispatch({type: 'LOAD_CART_ERROR'});
      }
    }, error => {
      dispatch({type : ActionTypes.CODE_ERROR, error})
    })
  }
}

export const Update_Cart_Action = (url, RequestOptions) => {
  return (dispatch) => {
    // dispatch({type: ActionTypes.LOADING});

    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      if(res.hasOwnProperty('success') && res.success === true){
        alert('quantity updated');
      }else if(res.hasOwnProperty('success') && res.success === false){
        alert('error')
      }
    }, error => {
      dispatch({type : ActionTypes.CODE_ERROR, error})
    })
  }
}

export const Remove_From_Cart_Action = (url, RequestOptions) => {
  return (dispatch) => {
    // dispatch({type: ActionTypes.LOADING});

    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      if(res.hasOwnProperty('success') && res.success === true){
        dispatch({type: 'REMOVE_FROM_CART_SUCCESS'});
        alert('item removed')
        
      }else if(res.hasOwnProperty('success') && res.success === false){
        alert('error')
        // dispatch({type: 'REMOVE_FROM_CART_ERROR'});
      }
    }, error => {
      dispatch({type : ActionTypes.CODE_ERROR, error});
    })
  }
}
