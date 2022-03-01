import React from 'react';
import frameworks from '../frameworks.json'
import {useParams,useNavigate,Link} from 'react-router-dom';

function Sections(props) {
  const [subCont,setSubCont] = React.useState(null);
  let Refs = [];

  const fws = <>{Object.keys(frameworks[0]).map(
    (fw,i)=>{return (
      <div key={i} className='nav-link nav_sec'>
        <span className="align-middle" onMouseOver={(e)=>{props.align(e,fw)}}>
          {fw}
        </span>
      </div>)})}
  </>;

  return  (<>
    
    <Link className="nav-link nav_sec" to='/Home'>
      <span className="align-middle">Products</span>
    </Link>
    
    {fws}
  </>);
}





export default Sections;
