import React from 'react'
import {useNavigate} from 'react-router-dom';

const NavSubmenu = (props) => {
  const navigate = useNavigate();
 return (<>
    {props.content.length>0 && 
    props.content.map((fw,i)=>
    <div className='nav-sub-box' key={i}>
      <span type='button' onClick={e=>{e.preventDefault();navigate(`/frameworks/${fw}`)}} >
      <div className='mb-2 ' style={{}}>{fw}</div>
      </span>
    </div>)}
  </>);
  
}

export default NavSubmenu