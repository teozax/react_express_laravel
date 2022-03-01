import React from 'react';
import {Routes as TheRoutes,Route,Navigate ,useParams  } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Error from "../pages/Error";
import Framework_Info from '../pages/Framework_Info'
import Header from '../Header';
import Profile from '../pages/Profile';

const userpaths = {
  Profile,
  Cart
};

const entrypaths = {
  // Laravel,
  Home
};

const AuthPaths = {
  Login,
  Register,
}

const Routes =()=>{
  return (
    <>
    <TheRoutes>
      <Route path="/" element={<Navigate  to="/Home" />}/>
      <Route path="/frameworks/:fw_info" element={<Framework_Info/>}/>
      <Route path="/:basic_route" element={<Guard/>}/>
      <Route path="/Product/:prod_id" element={<Guard/>}/>
      <Route path="/user/:user_inf" element={<Guard/>}/>
      {/* <Route path='*' exact=true element={<Navigate  to='/404' />} /> */}
    </TheRoutes>
    </>
  );
};

const Guard = (props) => {
  const params = useParams();
  const token = localStorage.getItem('user-token') || null;
  let Component;

  if (params.basic_route){
    if (token && AuthPaths[params.basic_route])
      return( <><Header/><p>Already Logged in</p></>);
    else if ((token && entrypaths[params.basic_route]) || (!token && AuthPaths[params.basic_route])){
      Component = entrypaths[params.basic_route]||AuthPaths[params.basic_route];
      return( <><Header/><Component/></>);
    }else if(!token && entrypaths[params.basic_route]){
      return( <><Header/><p>Please log in to view this page, because the platform must have a selected framework to fetch data</p></>);
    }

  }

  if (params.prod_id){
    return( <><Header/><Product id={params.prod_id} /></>);
  }

  if (params.user_inf){
    if (token && userpaths[params.user_inf]){
      Component = userpaths[params.user_inf];
      return( <><Header/><Component/></>);
    }
    else if (!token && userpaths[params.user_inf])
      return( <><Header/><p>Please log in to view this page</p></>);
  }

  return (<Error/>);

};

export default Routes;