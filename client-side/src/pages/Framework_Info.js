import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

function Framework_Info(props) {
  const params = useParams();
  switch(params.fw_info){
    case 'react':
      return <p>React is based on Redux middleware to communicate with one of the proposed backend frameworks </p>
    case 'laravel':
      return <p>Laravel supports the user login and manipulation part where the user can view and edit his profile info. It is also used for globally fetching the images.</p>
    case 'django':
      return <p>Django achieves user login (but without message warnings) and contains a cart interface where each user can see his own items in the cart. </p>
    case 'express':
      return <p>Node js - Express achieves user login and contains a cart interface where each user can see and fully edit his own items in the cart. </p>
    default:
      return <></>
  }

}

export default Framework_Info;
