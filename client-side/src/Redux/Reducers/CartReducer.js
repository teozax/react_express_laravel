const initState = {
  cart: [],
  trigger: 1
};

const CartReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        // cart: [],
      };
    case 'RESTART_CART_RESPONSE':
      return {
        ...state,
        cart: [],
      };
    case 'LOAD_CART_SUCCESS':
      return {
        ...state,
        cart: action.res
      };
    case 'LOAD_CART_ERROR':
      return {
        ...state,
        cart: [],
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        cart: []
      };
    case 'REMOVE_FROM_CART_SUCCESS':
      return {
        ...state,
        trigger: state.trigger*(-1)
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        trigger: state.trigger*(-1)
      };
    default:
      return state;
  }
};
export default CartReducer;