import { useState } from 'react';
import './App.css'
import Header from './components/Header.jsx';
import { Outlet } from 'react-router-dom';
import userContext from "./utils/userContext.js";

function App() {
 
  let [userPresent, setUserPresent]= useState(false);
  let [userData, setUserData] = useState({});
  let [loggedinUserId, setLoggedinUserId] = useState("");
  let [token, setToken] = useState("");

  return (
    <> 
       <userContext.Provider value={{userPresent, setUserPresent, userData, setUserData, token, setToken, setLoggedinUserId, loggedinUserId}}>
          <div className='App bg-gray-800 flex flex-col justify-start min-h-[100vh]'>
          <Header></Header>
          <Outlet></Outlet>
          </div>
       </userContext.Provider>
    </>
  );
}




export default App
