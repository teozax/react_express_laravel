import React,{useState} from "react";
import {Link,useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {RegisterAction} from '../Redux/Actions/AuthActions';


function RegisterComponent() {
  const token = useSelector(state => state.userAuth.authResponse.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const authResponse = useSelector(state=>state.userAuth.authResponse);
  const [fields, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    framework: "Django"
  });
  const handleFieldChange = e => {
    setState({
    ...fields,
    [e.target.id] : e.target.value
    })
  }
  const UserRegister = (e) => {
    e.preventDefault();
    console.log(fields);
    const passwordMatch = checkPasswordMatch(fields.password, fields.password_confirmation);
    if(passwordMatch === true){
      alert('passwords dont match. please check your password again');
      return;
    }
    let url = ''; let RequestOptions = {};
    
    switch(fields.framework){
      case 'Django':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[fields.framework]}/api/auth/register`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            // 'Authorization': token,
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username:fields.name,email:fields.email,password:fields.password})
        };break;
      case 'Laravel': 
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[fields.framework]}/api/users/register`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            // 'Authorization': token,
            Accept : "application/json",
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({name:fields.name,email:fields.email,password:fields.password})
        };
        break;
      case 'Express':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[fields.framework]}/signup`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            // 'Authorization': token,
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username:fields.name,email:fields.email,password:fields.password})
        };
        break;
    }

    dispatch(RegisterAction(url, RequestOptions, navigate));
    
  };

  const checkPasswordMatch = (password,password_confirmation) => {
    return password !== password_confirmation ? true : false; 
  }

  return (
    <div className="row mt-5">
    <div className="col-md-4 m-auto">
    <div className="card card-body">
    <h1 className="text-center mb-3">
    <i className="fas fa-user-plus"></i> Register
    </h1>
    <div>
    <h2>
    </h2>
    <form onSubmit={UserRegister}>
    <div className='form-group'>
    <input 
      type="text"
      className="form-control my-sm-0"
      required
      label="name"
      id="name"
      value={fields.name}
      onChange={handleFieldChange}
      placeholder='name'
    />
    </div>
    <div className='form-group'>
    <input
      type="email"
      className="form-control my-sm-0"
      required
      label="email"
      id="email"
      value={fields.email}
      onChange={handleFieldChange}
      placeholder='email'
    />
    </div>
    <div className='form-group'>
    <input
      className="form-control my-sm-0"
      label="Password"
      type="password"
      required
      id="password"
      value={fields.password}
      onChange={handleFieldChange}
      placeholder='password'
    />
    </div>
    <div className='form-group'>
    <input
      className="form-control"
      label="Confirm Password"
      type="password"
      required
      margin="normal"
      variant="outlined"
      id="password_confirmation"
      value={fields.password_confirmation}
      onChange={handleFieldChange}
      placeholder='retype password'
    />
    </div>
    <div className='form-group'>
    <label>Select framework</label>
    <select className="form-select" 
      label="framework"
      type="framework"
      required
      margin="normal"
      variant="outlined"
      id="framework"
      value={fields.framework}
      onChange={handleFieldChange}>
      <option value="Django">Django</option>
      <option value="Laravel">Laravel</option>
      <option value="Express">Express</option>
    </select>
    </div>
    <div>
    <button
      type="submit"
      variant="contained"
      className="btn btn-primary" 
      style={{width:'100%', maxHeight:'40px'}}>
      <b>Register</b>
    </button>
    </div>
    <br />
    <div>
    <Link to="/Login">Login Here</Link>
    </div>
    
    <div>
    <Link to="/Home">Back To Home Page </Link>
    </div>
    <div></div>
    </form>
    </div>
    </div>
    </div>
    </div>
  );
}
export default RegisterComponent;