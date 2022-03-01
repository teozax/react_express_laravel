import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ProductReducer from "./ProductReducer";
import CartReducer from "./CartReducer";

const RootReducer = combineReducers({
  userAuth: AuthReducer,
  productDetails: ProductReducer,
  cart: CartReducer
});

export default RootReducer;