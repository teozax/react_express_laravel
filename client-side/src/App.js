import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import NavBar from './NavigationBar/NavBar'
import SideNav from './NavigationBar/SideBar'
import Home from './pages/Home'
import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./Routing/Routes";

const App = () => {
  const globCont = useGlobalContext();
  return (
    <Router> 
      <Routes/>
    </Router>
  )
}

export default App
