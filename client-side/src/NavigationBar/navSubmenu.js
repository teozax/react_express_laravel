import React from 'react'
import { useGlobalContext } from '../context'
import frameworks from '../frameworks.json'
import {Link,useNavigate} from 'react-router-dom';

const NavSubmenu = (props) => {
  const navigate = useNavigate();
 return (<>
    {props.content.length>0 && 
    props.content.map((fw,i)=>
    <div className='nav-sub-box' key={i}>
      <a type='button' onClick={e=>{e.preventDefault();navigate(`/frameworks/${fw}`)}} >
      <div className='mb-2 ' style={{}}>{fw}</div>
      </a>
    </div>)}
  </>);
  
}

export default NavSubmenu