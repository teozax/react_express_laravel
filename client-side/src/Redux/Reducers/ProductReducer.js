import * as ActionTypes from '../ActionsRed';
const initState = {
  products: [],
  product:{},
  is_added: false,
  add_trigger:1,
  img_urls: []
};
const ProductReducer = (state = initState, action) => {
switch (action.type) {
case ActionTypes.LOADING:
return {
...state,
products: [],
product:{},
is_added:false
};
case ActionTypes.LOAD_PRODUCTS_SUCCESS:
return {
...state,
products: action.res,
};
case ActionTypes.LOAD_PRODUCT_SUCCESS:
return {
...state,
product: action.res,
};
case ActionTypes.LOAD_PROFILE_ERROR:
return {
...state,
// products: action.res,
};
case ActionTypes.CODE_ERROR:
return {
...state,
// products:
// "There seems to be a problem, please refresh your browser",
};
case ActionTypes.CHECK_ADDED_SUCCESS:
return {
...state,
is_added: action.res,
};
case ActionTypes.CART_ITEM_ADDED:
return {
...state,
is_added: true,
add_trigger: action.trigger * (-1)
};
case 'LOAD_IMG_URLS_SUCCESS':
return {...state,img_urls:action.res};
case 'LOAD_IMG_URLS_ERROR':
return {...state,img_urls:[]}
default:
return state;
}
};
export default ProductReducer;