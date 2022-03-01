import React from 'react';
import Home from './pages/Home'; 
import {LogoutAction} from './Redux/Actions/AuthActions';
import {useParams,useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { MDBIcon} from 'mdbreact';
import {NavBar} from './NavigationBar/NavBar.js'
import {LoadCartAction} from './Redux/Actions/CartActions';

export default function Header(props) {
  const authResponse = useSelector(state=>state.userAuth.authResponse);
  const framework = localStorage.getItem('framework');
  const add_trigger = useSelector(state => state.productDetails.add_trigger);
  const trigger = useSelector(state => state.cart.trigger);
  const token = localStorage.getItem('user-token');
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if(authResponse !== "" && authResponse.success === true){
  //     // alert(authResponse.message);
  //     localStorage.removeItem('user-token');
  //   } 
  //   return () => {
  //   };
  // },[authResponse])

  React.useEffect(() => {
    let url; let RequestOptions;
    switch (framework){
      case 'Django':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/cart/`;
        RequestOptions = { 
          method: 'POST',
          headers: {
            'Authorization' : `Token ${token}`,
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({'type':'retrieve data'})
        };
        break;
      case 'Express':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/cart`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
          },
        };
        break;
    }
    // if (cart.length > 0) return;
    dispatch(LoadCartAction(url, RequestOptions));
    
  },[add_trigger,trigger]);
  

  return (<><NavBar/></>
  );
}