import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const globCont = useGlobalContext();
  
  const Fetch = async (url)=>{
    const resp = await fetch(url);
    const data = await resp.json();
    globCont.dispatch1({type:'FETCH_DATA', payload:data});
  }

  // React.useEffect(() => {
  //   if(globCont.state2.url!=='')
  //     Fetch(globCont.state2.url);
  //   //  NavData[1](finalData)
  //   //  return () => {
  //   //      cleanup
  //   //  }
  // }, [globCont.state2.url])

  return <></>;
}
export default SetupForm
