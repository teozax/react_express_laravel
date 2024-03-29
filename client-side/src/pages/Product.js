import React from 'react'
import { LoadProductAction  } from '../Redux/Actions/ProductsActions';
import {AddToCartAction} from '../Redux/Actions/CartActions';
import {useDispatch, useSelector} from 'react-redux';

const Product = (props) => {
  const id = props.id;
  const framework = localStorage.getItem('framework');
  const product = useSelector(state=>state.productDetails.product);
  const added = useSelector(state=>state.productDetails.is_added);

  const dispatch = useDispatch();
  const trigger = useSelector(state=>state.productDetails.add_trigger);

  React.useEffect(() => {
    let url, url2, RequestOptions, RequestOptions2;
    switch(framework){
      case 'Django':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/products/${id}/`;
        url2 = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/cart/`;
        break;
      case 'Laravel':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/products/${id}`;
        break;
      case 'Express':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/products/${id}`;
        break;
      default:
    }
    const token = localStorage.getItem('user-token');
    RequestOptions ={ 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type' : 'application/json'
      },
    };

    RequestOptions2 ={ 
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({id,type:'check single item if added to cart'})
    };

    dispatch(LoadProductAction(url, RequestOptions, url2, RequestOptions2, framework));
    return () => {
      // cleanup
    }
  }, [framework,dispatch,id])

  const add_to_cart = (e)=>{
    let url, RequestOptions;
    const token = localStorage.getItem('user-token');
    switch(framework){
      case 'Django':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/cart/`;
        RequestOptions = {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({type:'add item to cart',title:product.title})
        };
        break;
      case 'Laravel':
        // url = `http://localhost:8000/api/products/${params.id}`;
        break;
      case 'Express':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/cart/add`;
        RequestOptions = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({type:'add item to cart',title:product.title})
        };break;
      default:
    }

    
    dispatch(AddToCartAction(url, RequestOptions, trigger));
  }
  const btn_name = 'btn btn-danger mb-2';

  // let img_tr = 'product_img';
  // React.useEffect(() => {
  //   img_tr = 'product_img2';
  
  //   return () => {
  //     // second;
  //   };
  // }, []);

  return (
    <div className='d-inline-flex justify-content-end align-items-end m-5' style={{width:'100%'}} >
      <div className='slide-from-left position-relative ' >
        <img className='position-relative float-end ' alt=""
          src={require(`../images/${id-1}.jpg`)} style={{maxHeight:'300px'}} />
      </div>
      <div className='position-relative ml-2 slide-from-right' style={{width:'50%'}}>
        <p>{product.description}</p>
        <input className={added===true?"disabled "+btn_name:""+btn_name} style={{height:'10%'}} type='button' onClick={add_to_cart} value='Add to cart'/>
      </div>
    </div>
  )
}

export default Product
