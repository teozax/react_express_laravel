import {HandleRequest} from '../Services/PrepareService';
import * as ActionTypes from '../ActionsRed';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const LoadProductsAction = (url, RequestOptions) => {
  return (dispatch) => {
    dispatch({type: ActionTypes.LOADING});

    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      if(res.hasOwnProperty('success') && res.success === true){
        const data = res.products;
        dispatch({type: ActionTypes.LOAD_PRODUCTS_SUCCESS,res:data});
      }else if(res.hasOwnProperty('success') && res.success === false){
        dispatch({type: ActionTypes.LOAD_PROFILE_ERROR,res});
      }
      }, error => {
        dispatch({type : ActionTypes.CODE_ERROR, error});
      })

    // axios.get(url2, RequestOptions2).then((res) => {
    //   console.log('res2',res.data); 
    //   if(res){
    //     // const data = res.is_added_to_cart;
    //     dispatch({type: 'LOAD_IMG_URLS_SUCCESS', res:res.data});
    //   }else {
    //     dispatch({type: 'LOAD_IMG_URLS_ERROR',res});
    //   }
    //   }, error => {
    //     dispatch({type : ActionTypes.CODE_ERROR, error})
    //   })
  }
}

export const LoadProductAction = (url, RequestOptions, url2, RequestOptions2, framework) => {
  return (dispatch) => {
    dispatch({type: ActionTypes.LOADING});

    HandleRequest(url, RequestOptions).then(res=>res.json()).then((res) => {
      if(res.hasOwnProperty('success') && res.success === true){
        const data = res.products;
        dispatch({type: ActionTypes.LOAD_PRODUCT_SUCCESS,res:data});
        if (framework==='Express'){
          const data = res.is_added_to_cart;
          dispatch({type: ActionTypes.CHECK_ADDED_SUCCESS, res:data});}
      }else if(res.hasOwnProperty('success') && res.success === false){
        dispatch({type: ActionTypes.LOAD_PROFILE_ERROR,res});
      }
      }, error => {
        dispatch({type : ActionTypes.CODE_ERROR, error})
      })
    

  }
}