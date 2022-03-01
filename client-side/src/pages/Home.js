import React, { useState, useContext, useEffect, useReducer } from 'react'
import { fetch_method } from '../context'
import axios from 'axios';
import { useHistory, useParams, Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { LoadProductsAction } from '../Redux/Actions/ProductsActions';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Wrapper,Grid} from "react-auto-grid";
import { Grid } from '@material-ui/core';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { BsFillBagFill } from "react-icons/bs";

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';


const Home = () => {
  

  const dispatch = useDispatch();
  const products = useSelector(state=>state.productDetails.products);
  const framework = localStorage.getItem('framework');
  let url = ''; let RequestOptions = {};
  
  switch(framework){
    case 'Django':
      url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/products/`;
      RequestOptions ={
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        },
      };break;
    case 'Laravel':
      url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/products`;
      RequestOptions ={ 
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        },
      };break;
    case'Express':
      url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/products`;
  }

  useEffect(() => {
    if (products.length>0) return;
    dispatch(LoadProductsAction(url,RequestOptions));
  }, []);

  let j = 0;

  const price_hover = (e,ref)=>{
    console.log(ref);
    ref.current.style.MouseOver=true;
    // ref.current.classList.add('img-priceh');
    // ref.current.classList.remove('img-price');
  }

  const price = (e,ref)=>{
    console.log(ref);
    ref.current.MouseOver=false;
    // ref.current.classList.add('img-price');
    // ref.current.classList.remove('img-priceh');
  }

  const img_urls = process.env.GIT_URL;
console.log(process.env)
  return (
  <div className=''>
  <div className="position-relative container ">


  <Grid container  justifyContent="center" className='text-center'>
  {products.map((prod,i)=>{const ref=React.createRef();
  return (
    <Grid item xs={2} sm={4} md={3} key={i}  className='grid-item m-4 '  style={{borderRadius: '15px 50px 30px', height:'300px'}}>
      <div className='container top-50 position-relative translate-middle-y'>

        <div className="position-relative mx-auto  " 
          style={{width:'50%',height:'100%'}} 
          onMouseOver={(e)=>price_hover(e,ref)} 
          onMouseOut={(e)=>price(e,ref)}>
          
            <Link to={`/Product/${prod.id}`} >
              <div ref={ref} className='img_cover'><h3 className='img-price  position-absolute'>{prod.price}$</h3></div>
              <img className="img-fluid img_cont "   src={`https://github.com/teozax/Data/blob/gh-pages/images/${i}.jpg?raw=true`}  />
            </Link>
          
        </div>
        <hr className='bg-white'/>
        <div className='mt-100 descr position-relative'>
          <p className='text-white opacity-75'>{prod.title}</p>
        </div>

      </div>
    </Grid>
  )})}
  </Grid>
    
  </div></div>
  )
}

export default Home
