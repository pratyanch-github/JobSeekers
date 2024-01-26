import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../utils/userContext';
import { base_url } from '../assets/urls';

function Login() {
  
  let navigate = useNavigate();
  let [username, setUsername]= useState("");
  let [password, setPassword]= useState("");
  let baseURL= base_url;

  let {setToken, setUserPresent, setLoggedinUserId } = useContext(userContext);
  let handleLogin = async () => {
    try {
      // Check if username and password are not empty
      if (!username || !password) {
        console.error("Username and password are required");
        return;
      }

      let payload = { username, password };
      payload = JSON.stringify(payload);

      let response = await fetch(`${baseURL}auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        // Handle server-side errors
        console.error("Registration failed:", response.statusText);
        return;
      }
      let data = await response.json();
      console.log(data);

      if (data.Token!=null){
        setToken(data.Token);
        setLoggedinUserId(data.id);
        setUserPresent(true);
        navigate("../profile/"+data.id);
        
      } 
      else console.error("Registration failed:", data.msg);
      
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className='inputcontainer  self-center m-5 p-10 gap-3 flex flex-col rounded-xl bg-blue-400'>
         
         <div>
            <label htmlFor="">Username</label> 
            <br />
            <input onChange={(e)=>{setUsername(e.target.value)}} value={username} className=' rounded-lg w-[100%]' type="text" />
         </div>

         <div>
            <label htmlFor="">Password</label> 
            <br />
            <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className=' rounded-lg w-[100%]' type="text" />
         </div>

         <div className=' flex gap-4'>
             <button onClick={handleLogin} className='rounded-xl p-2 bg-blue-500 hover:bg-blue-700'> Login </button>
             <Link to="../signup">
               <button className='rounded-xl p-2 bg-amber-700 hover:bg-amber-400'> Register </button>
             </Link>
            
          </div> 

    </div>
  )
}

export default Login;
