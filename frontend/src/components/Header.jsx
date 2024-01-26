import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import userContext from '../utils/userContext';

function Header() {


  let {userPresent, userData} = useContext(userContext);

  return (
    <div className='p-4 flex h-16  justify-between items-center gap-4 bg-blue-500'>
        <div className='logo font-bold border-2 p-2 border-black rounded-full '>
           <Link to="/">Home </Link> 
        </div>
        <div className='buttons flex m-5 p-2 bg-blue-700 rounded-lg '>
           {
              userPresent ? <Link to={"profile/"+userData._id}><button> 👨‍🦰 My Profile </button></Link>  :   <Link to="login"><button>Login</button></Link>
           } 
        </div>
    </div>
    
  )
}

export default Header;

