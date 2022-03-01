import axios from 'axios'
import React, { useState, useContext, useEffect, useReducer } from 'react'
import * as theReducer from './reducer'

// Example POST method implementation:
export async function fetch_method(url = '', type = '', data = {}) {
  if(type==='GET_M'){
    // Default options are marked with *
    const res = await fetch(url);
    const response = await res.json();
    // console.log(response);
    return (response) // parses JSON response into native JavaScript objects    
  }
}

const defaultState1 = {
  data: null,
  nav_sub_ref: null
}

const defaultState2 = {
  url: '',
  host_port: 80
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    // const [amount, setAmount] = useState(10)
  // const [category, setCategory] = useState(table[Object.keys(table)[0]])
  const [state1, dispatch1] = useReducer(theReducer.reducer1, defaultState1)
  const [state2, dispatch2] = useReducer(theReducer.reducer2, defaultState2)
  
  return <AppContext.Provider value={{state2, dispatch2, state1, dispatch1}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
