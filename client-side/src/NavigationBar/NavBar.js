import React,{useState,useEffect} from 'react';
import Home from '../pages/Home'; 
import {LogoutAction} from '../Redux/Actions/AuthActions';
import {useParams,useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';
import NavBarUser from './NavBarUser';
import SideBarUser from './SideBarUser'
import SideBar from './SideBar';
import Sections from './Sections';
import frameworks from '../frameworks.json'
import NavSubmenu from './navSubmenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import cx from "classnames";

// import {NavData} from './data.json'
const SubMenuClass = '';

const NavBar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const framework = localStorage.getItem('framework');
  const nav_tog_1 = React.createRef();
  // const nav_cont_1 = React.createRef();
  const RefNavSub = React.useRef(null);
  
  const user_side_ref = React.createRef();
  const SideBarRef = React.createRef();
  const win_size = useWindowSize();
  const trig = useState(true);
  const [subContent,setSubContent] = React.useState({});

  if(win_size.width<700 && trig[0]===true){
    trig[1](trig=>!trig);
  }else if(win_size.width>700 && trig[0]===false){
    trig[1](trig=>!trig);
  }

  // useEffect(() => {
  //   if (trig[0]===true)
  //     nav_cont_2.current.className = 'nav-cont-2 d-flex flex-row justify-content-center';
  //   else
  //     nav_cont_2.current.className = 'nav-cont-2 d-inline-block justify-content-center';
      
  //   return () => {
      
  //   };
  // }, [trig[0]]);



  const align = (e,content) => {
    const element =  e.target.getBoundingClientRect();
    const center = (element.left + element.right)/2;
    const height = element.top;
    setSubContent(Object.keys(frameworks[0][content]));
    RefNavSub.current.style.left = `${center}px`; 
    RefNavSub.current.style.top = `${height-50}px`;
    RefNavSub.current.style.width = RefNavSub.current.parentElement.style.width;
    RefNavSub.current.classList.add('exists');
    RefNavSub.current.classList.remove('hidden');
  };

  const disappear = () => {
    RefNavSub.current.classList.remove('exists');
    RefNavSub.current.classList.add('hidden');
  }

  if (trig[0]===false)
    disappear();

  const slideBar = (e) => {
    SideBarRef.current.className = SideBarRef.current.classList.contains('translateX-minus')
      ? 'translateX sideBar' 
      : 'translateX-minus sideBar' ;
  }

  const slideUserBar = (e) => {
    user_side_ref.current.className =  user_side_ref.current.classList.contains('slide-right')
      ? 'slide-left  user-sb'
      : 'slide-right user-sb';
  }

 return (
   <div className='' style={{marginBottom:'140px',position:'sticky',width:'100%',zIndex:'1'}}>
 <div className='main-nav-bar'>
 <div className='nav-line'></div>
  <nav className="d-flex flex-row justify-content-between align-items-stretch ">
    <div className="nav-cont-1"></div>
    
    {trig[0]===true ? 
      <Sections trigger={trig[0]} align={(e,content)=>align(e,content)}  />
    :
    <div
      className="navbar_toggle nav-link fas fa-bars position-fixed my-fa-bars mt-1"
      onClick={slideBar}>
    </div>
    }

    {trig[0]===true?
      <NavBarUser/>
      :<><div></div>
      <div className='nav-link mr-1' >
        <a className=''><MDBIcon onClick={slideUserBar} icon="user-check"/></a>
      </div></>
    }

  </nav>
  <div className='nav-line' ></div>
  {trig[0]===false ? <SideBarUser self_ref={user_side_ref}/> : <></>}
  {trig[0]===false ? <SideBar self_ref={SideBarRef}/> : <></>}
  {<SubRef ref={RefNavSub} disappear={disappear} ><NavSubmenu content={subContent} /></SubRef>}
  
  </div></div>)
}

const SubRef = React.forwardRef((props, ref) => (
  <div ref={ref} className='nav-submenu hidden' onMouseLeave={props.disappear}>
  <div className="nav-sub-cover " style={{marginTop:'70px'}} >
    {props.children}
  </div>
  </div>
));

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}


function LogOut(dispatch,navigate) {

  const framework = localStorage.getItem('framework');
  let url = '', RequestOptions = ''; const token = localStorage.getItem("user-token");

  switch(framework){
    case 'Django':
      url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/auth/logout`;
      RequestOptions ={ 
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        }
      };
      break;
    case 'Laravel':
      url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/api/users/logout`;
      RequestOptions ={ 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type' : 'application/json'
        },
        // body : JSON.stringify({email:fields.email,password:fields.password})
      };
      break;
    case 'Express':
      url = `${JSON.parse(process.env.REACT_APP_API_URL)[framework]}/user/logout`;
      RequestOptions ={ 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      };
  }
  dispatch(LogoutAction(url, RequestOptions, navigate));
  // navigate("/home");
}

export { NavBar, LogOut }

