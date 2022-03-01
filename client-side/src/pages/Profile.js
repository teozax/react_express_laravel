import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { fetch_method } from '../context';
import {Update_User_Action} from '../Redux/Actions/AuthActions'

function Profile() {
  const trigger = useSelector(state=>state.userAuth.prof_trigger);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const en = useState(false); 
  const refName = React.createRef();
  const framework = localStorage.getItem('framework');
  const token = localStorage.getItem('user-token');
  let url, RequestOptions;
console.log('trig',trigger)
  useEffect(() => {
  
    return () => {
      
    }
  }, [trigger])
  

  const handleDelete = (id)=>{
    fetch_method("http://localhost/php_mysql_connect/main.php",'DELETE_M',{'id':id})
    .then(res=>en[1](!en[0]))
  }

  const handleSave = (type)=>{
    let data;
    if (type==='username' && framework==='Laravel')
      data = {type:'name',value:obj2[type][0]};
    else
      data = {type,value:obj2[type][0]};
    

    switch (framework){
      case 'Laravel':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/users/update`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
            'Accept':'application/json'
          },
          body:JSON.stringify(data)
        };
        break;
    }
    dispatch(Update_User_Action(url, RequestOptions, obj1[type]));
  }

  const edit_name = useState(-1); 
  const edit_email = useState(-1);
  const obj1 = {username:edit_name,email:edit_email};
  const show_hide = (key) => {
    obj1[key][1](prev=>prev*(-1))
    obj2[key][1]("")
  }
  const select_type = (key) => {
    return obj1[key][0];
  }

  const name = useState('');
  const email = useState('');
  const obj2 = {username:name,email};

  
  return (<>
  <div className='' style={{top:'120px',position:'absolute',height:'100%',width:'100%'}} >
  <div className='user-inf text-center col-6 mt-4'>
  <div className='d-flex flex-row justify-content-center align-items-center' >
    
  <div className='d-block'>
      {Object.keys(user).map((key,i)=>
      <div key={i} className='d-block text-start'>
      <div className=''><b>{key}</b></div>
      <div className="d-flex  align-items-center">
      {select_type(key)===1 ? <>
        <input 
          style={{maxWidth:'200px'}}
          ref = {refName}
          type="text" 
          className="form-control" 
          id="exampleFormControlInput1" 
          placeholder="username"
          value={obj2[key][0]} 
          onChange={e=>obj2[key][1](e.target.value)}
        />
        <i type="button" className="far fa-check-circle" 
        onClick={(e)=>{handleSave(key);}}/>
        <i className="far fa-times-circle" 
        type="button" 
        onClick={(e)=>show_hide(key)}/> 
        </>  
        :<><span className='mr-2'>{user[key]}</span>
        <i className="fas fa-edit mt-1"
        type="button" 
        onClick={(e)=>show_hide(key)} /></>   
      }
      </div>
      </div>)}
    </div>

    </div> 
    
    </div>
    <div className="user-inf-2 col-3 position-absolute  mt-4 " style={{height:'100%'}} >
      <h3>Welcome back !</h3>
    </div>

    </div>
  </>);
}

export default Profile;