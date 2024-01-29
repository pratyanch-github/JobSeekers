import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import userContext from '../utils/userContext';

function Header() {


  let {userPresent, userData, loggedinUserId} = useContext(userContext);

  return (
    <div className='p-4 flex h-16  justify-between items-center gap-4 bg-blue-500'>
        <Link to="/">
        <div className='logo font-bold border-2 p-2 border-black bg-blue-500 rounded-full hover:bg-blue-400'>
           Home 
        </div>
        </Link> 
        <div >
           {
              userPresent ?
               <Link className='buttons flex m-5 p-2 bg-green-400 rounded-lg ' to={"profile/"+loggedinUserId}><button> 👨‍🦰 My Profile </button></Link>  : 
               <Link className='buttons flex m-5 p-2 bg-blue-700 rounded-lg ' to="login"><button>Login</button></Link>
           } 
        </div>
    </div>
    
  )
}

export default Header;

