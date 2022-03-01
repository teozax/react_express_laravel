import React from 'react'
import { useGlobalContext } from '../context'
import {useParams,useNavigate,Link} from 'react-router-dom';
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';
import frameworks from '../frameworks.json'

const SideBar = (props) => {
  const navigate = useNavigate();
  let Refs = [];
  let fws;

  const open_close = (e,i) =>{
    console.log(i)
    const el = Refs[i];
    // console.log(el.current.className)
    el.current.className = el.current.className==='d-none'?'d-block':'d-none';
    return;
  }

  fws = <>{Object.keys(frameworks[0]).map(
    (fw,i)=>{Refs=[...Refs,React.createRef()];return (
      <div key={i} className='mt-1'>
        <span type='button' className='d-block nav-link2 m-2' onClick={(e)=>open_close(e,i)}>
          {fw}
          <i className="fas fa-plus mr-2 float-end  ml-3 mt-1" ></i>
        </span>
        <div ref={Refs[i]} className='d-none' id={`fw ${i}`}>
          {Object.keys(frameworks[0][fw]).map(
            (item,j)=>{console.log(Refs); return <div key={j} type='button' className='sb-item' onClick={e=>{e.preventDefault();navigate(`/frameworks/${item}`)}}>{item}</div>}
          )}
        </div>
      </div>)})}
  </>
  
  return(
    <div className="translateX-minus sideBar " ref={props.self_ref} id="navbarSupportedContent">
      <ul className="ul1">
        <li className="nav-item">
          <span type='button' className="nav-link2" onClick={e=>{e.preventDefault(); navigate("/Home")}}>Products</span>
        </li>
        {fws}
      </ul>
    </div>
  )
}

export default SideBar;