import React, { createRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadCartAction,Update_Cart_Action,Remove_From_Cart_Action} from '../Redux/Actions/CartActions';
import InputMask from "react-input-mask";
import NumericInput from 'react-numeric-input';

function Cart() {
  const framework = localStorage.getItem('framework');
  const token = localStorage.getItem('user-token');
  const dispatch = useDispatch(); 
  const cart = useSelector(state => state.cart.cart);
  
  console.log('cart',cart.length);
  const [updCart,setUpdCart] = React.useState([]);
  // const []
  



  React.useEffect(() => {
    setUpdCart({cart,refs:new Array(cart.length)});
  
    return () => {
      
    };
  }, [cart]);

  const update_cart = (pos) =>{
    let url, RequestOptions;
    const res = updCart.cart.filter((item,i)=>i===pos);
    if (res.length!==1) return;

    switch (framework){
      case 'Express':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/cart/update`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({title:res[0].title,quantity:res[0].quantity})
        };
        break;
    }
    dispatch(Update_Cart_Action(url, RequestOptions));
  }

  const remove_from_cart = (pos) =>{
    let url, RequestOptions;
    const res = updCart.cart.filter((item,i)=>i===pos);
    if (res.length!==1) return;

    switch (framework){
      case 'Express':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/cart/remove`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({title:res[0].title})
        };
        break;
    }
    dispatch(Remove_From_Cart_Action(url, RequestOptions));
  }

  const change_quantity = (e,i) =>{
    const NEWCART = updCart.cart.map((item,j)=>{console.log(e.target.value)
      if (i!==j) return item;
      // if (e.target.value<e.target.min || e.target.value>e.target.max) return item;
      const Nitem = {...item,quantity:e.target.value}
      return Nitem;
    });
    setUpdCart({...updCart,cart:NEWCART});
  }

  const increase = (i,ref) => {
    const NEWCART = updCart.cart.map((item,j)=>{
      if (i!==j) return item;
      if (parseInt(item.quantity,10)+1<parseInt(ref.current.min,10) || parseInt(item.quantity,10)+1>parseInt(ref.current.max,10)) return item;
      const Nitem = {...item,quantity:parseInt(item.quantity,10)+1}
      return Nitem;
    });
    setUpdCart({...updCart,cart:NEWCART});
  }

  const decrease = (i,ref) => {
    const NEWCART = updCart.cart.map((item,j)=>{
      if (i!==j) return item;
      if (parseInt(item.quantity,10)-1<parseInt(ref.current.min,10) || parseInt(item.quantity,10)-1>parseInt(ref.current.max,10)) return item;
      const Nitem = {...item,quantity:parseInt(item.quantity,10)-1}
      return Nitem;
    });
    setUpdCart({...updCart,cart:NEWCART});
  }
  let grandTotal=0;
  return (
    <div className='d-block text-center m-4'>
      <h1>Cart</h1>
    <table className="table table-bordered" style={{borderWidth:'20px'}}>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Qty</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {updCart.cart && updCart.cart.map((item,i)=>{
          const ref = createRef();
          grandTotal+=updCart.cart[i].quantity * item.price;
          return( 
          <tr key={i}>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.price} $</td>

            {framework==='Express' && <>
              <td>
              <div className="input-group d-block">
                <button className="btn-warning" onClick={(e)=>decrease(i,ref)}>
                  <i className="fas fa-minus text-blue"></i>
                </button>
                <input 
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    } 
                    if ((parseInt(`${event.target.value}` + `${event.key}`,10) < parseInt(event.target.min,10))||(parseInt(`${event.target.value}` + `${event.key}`,10) > parseInt(event.target.max,10))){
                      event.preventDefault();
                    }
                  }} 
                  onKeyUpCapture={(event) => {
                    if (event.target.value==='') {
                      event.target.value = event.target.min;
                    }
                  }}
                  style={{maxWidth:'30px'}}
                  type="text" 
                  id="quantity" 
                  name="quantity" 
                  className="input-number text-dark text-center" 
                  value={updCart.cart[i].quantity} 
                  min="1" 
                  max="100" 
                  onChange={(e)=>change_quantity(e,i)}
                  ref={ref} />

                  <button className="btn-danger" onClick={(e)=>increase(i,ref)}>
                    <i className="fas fa-plus"></i>
                  </button>
              </div>
            {/* </td>
            <td> */}
            <button 
              type="button" 
              className="btn-cart"
              data-bs-toggle="tooltip" 
              data-bs-placement="top position-relative" 
              title="Submit to database" 
              onClick={()=>update_cart(i)}>
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className="btn-danger"
              type="button" 
              className="btn-cart"
              data-bs-toggle="tooltip" 
              data-bs-placement="top position-relative" 
              title="Remove from cart" 
              onClick={()=>remove_from_cart(i)}>
              <i className="fas fa-trash"></i>
            </button>
            </td>
            <td>{updCart.cart[i].quantity * item.price}</td></>}
          </tr>)})}
        <tr>
          <td colSpan="4" className='text-right'><b>Grand Total {grandTotal}</b></td>
        </tr>
      </tbody>
    </table>

        

    </div>)
}

export default Cart

