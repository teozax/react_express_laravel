import React from 'react';
import {LogOut} from './NavBar.js';
import {useParams,useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';

function NavBarUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart.cart);
  const token = localStorage.getItem('user-token');
  const framework = localStorage.getItem('framework');
  
  return (
  <div className="d-flex align-items-center">
  {token !== null && token !== "" ?<>
  <Link to="/user/Cart" className="text-reset me-3 position-relative">
    <i className="fas fa-shopping-cart"/>
    <span className="position-absolute top-0 start-100 translate-middle-y badge rounded-pill bg-danger">
    {cart.length}
    <span className="visually-hidden">unread messages</span>
  </span>
  </Link>

  <div className=''>
    <a
      className='dropdown-toggle d-flex align-items-center hidden-arrow nav-link'
      id="navbarDropdownMenuAvatar"
      role="button"
      data-mdb-toggle="dropdown"
      aria-expanded="false"
      style={{borderRadius:'50%'}}
    >
      <MDBIcon icon="user-check"  />
    </a>
    <ul className="dropdown-menu dropdown-menu-middle">
      {framework==='Laravel' && 
      <li>
      <Link to='/user/Profile' className="dropdown-item text-right">Profile</Link>
      </li>}
      <li>
      <Link to='' className="dropdown-item text-right" onClick={()=>LogOut(dispatch,navigate)}>Logout</Link>
      </li>
    </ul>
  </div></>
  :<>
  <div className="dropdown">
    <a
      className="dropdown-toggle d-flex align-items-center hidden-arrow"
      href="#"
      id="navbarDropdownMenuAvatar"
      role="button"
      data-mdb-toggle="dropdown"
      aria-expanded="false"
    >
      <MDBIcon icon="user" />
    </a>
    <ul className="dropdown-menu dropdown-menu-end"
      aria-labelledby="navbarDropdownMenuAvatar">
    <li>
      <Link to="/Register" className="nav-link">Register</Link>
    </li>
    <li>
      <Link to="/Login" className="nav-link">Login</Link>
    </li>
    </ul>
  </div>
  </>}</div> )
}

export default NavBarUser;
