import React from 'react';
import {LogOut} from './NavBar.js';
import {useParams,useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';

function SideBarUser(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('user-token');
  const framework = localStorage.getItem('framework');
  
  return (<>
    {token !== null && token !== "" ? 
      <div ref={props.self_ref} className='slide-right user-sb' style={{minWidth:'70px'}}>
      <div className='float-right'>
        {framework==='Laravel' && 
        <Link to='/user/Profile' className="btn-secondary dropdown-item text-right">Profile</Link>}
        <Link to='' className='btn-secondary dropdown-item text-right' onClick={()=>LogOut(dispatch,navigate)}>Logout</Link>
      </div>
      </div>  :
      <div ref={props.self_ref}  className='slide-right user-sb' style={{minWidth:'70px'}}>
      <ul className="">
      <li>
        <Link to="/Register" className="nav-link">Register</Link>
      </li>
      <li>
        <Link to="/Login" className="nav-link">Login</Link>
      </li>
      </ul>
      </div>
   }

  </>);
}

export default SideBarUser;
