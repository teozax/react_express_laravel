import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoginAction,LogoutAction} from '../Redux/Actions/AuthActions';
import {useNavigate,Link} from 'react-router-dom'; 

function Login() {
  console.log(process.env.REACT_APP_API_URL)
  const navigate = useNavigate();
  //console.log(history); 
  const dispatch = useDispatch();
  // const authResponse = useSelector(state=>state.userAuth.authResponse);
  const [fields, setState] = useState({
    username: "",
    email: "",
    password: "",
    framework: "Django"
  });

  const handleFieldChange = e => {
    setState({
      ...fields,
      [e.target.id] : e.target.value
    })
  }
  
  const UserLogin = (e) => {
    e.preventDefault();
    let url = '';
    let RequestOptions = '';
    switch(fields.framework){
      case 'Django':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[fields.framework]}/api/auth/login`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username:fields[type[0]], password:fields.password})
        };
        break;
      case 'Laravel':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[fields.framework]}/api/users/login`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({email:fields.email,password:fields.password})
        };
        break; 
      case 'Express':
        url = `${JSON.parse(process.env.REACT_APP_API_URL)[fields.framework]}/login`;
        RequestOptions ={ 
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({email:fields.email,password:fields.password})
        };
        break;
    }
    localStorage.setItem('framework', fields.framework);
    dispatch(LoginAction(url, RequestOptions, navigate));
  };

  const token = localStorage.getItem('user-token');
  const type = useState('username');

  useEffect(() => {
    switch(fields.framework){
      case 'Django':
        type[1]('username');
        break;
      case 'Laravel':
        type[1]('email');
        break;
      case 'Express':
        type[1]('email');
        break;
    }
    return () => {
      // cleanup
    }
  }, [fields.framework])

  return (<>
    {token===null ?
      <div className="row  ">
      <div className="col-md-4 m-auto">
      <div className="card card-body">
      <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
      <form onSubmit={UserLogin}>
      <div className='form-group'>
      <input
        type={type[0]}
        className="form-control my-sm-0"
        required
        margin="normal"
        variant="outlined"
        label={type[0]}
        id={type[0]}
        value={fields[type[0]]}
        onChange={handleFieldChange}
        placeholder={type[0]}
      />
      </div>
      <div>
      <div>
      <input
        className="form-control my-sm"
        label="Password"
        type="password"
        required
        id="password"
        value={fields.password}
        onChange={handleFieldChange}
        placeholder='password'
      />
      </div>
      <div>
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
      className="btn btn-primary mt-3"
      style={{width:'100%', maxHeight:'40px'}}
      variant="contained"
      color="primary"
      >
      <b>Login</b>
      </button>
      <br />
      <div >
      <Link to="/Register">Register Here</Link>
      </div>
      </div>
      <div >
      <Link to="/Home">Back To Home Page </Link>
      </div>
      <div></div>
      </div>
      </form>
    </div></div></div>
    :<h1>Already logged in</h1>}</>
  )
}

export default Login
