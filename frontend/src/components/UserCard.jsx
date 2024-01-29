import React ,{useContext}from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { base_url } from '../assets/urls';
import userContext from '../utils/userContext';

export default function UserCard({ user }) {
//   console.log(user);
  let navigate = useNavigate();
  let {loggedinUserId, setUserData, setUserPresent ,token} = useContext(userContext);

  const handleDelete = async() =>{
    try {
      // Send updated data to the backend
      const response = await fetch(`${base_url}profile/${user._id}`, {
        method: "DELETE",
        headers: {
          "authorization": `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
         // rerender the home 
         setUserPresent(false);
         setUserData({});
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }
  console.log(user.username);
  return (
    <div className='flex flex-col m-2 p-4 rounded-lg bg-gray-700 border-2 border-gray-600'>
      <div className='flex flex-col gap-2 justify-between items-center mb-4'>
       
        <div className='name  w-[100%]'>
          <h2 className='text-xl w-[100%]  text-white font-bold'>{user.username?user.username.toUpperCase():"No Name"}</h2>
          <p className='text-gray-500 w-[100%]'>{user.bio}</p>
        </div>

        <div className='techstack w-[100%] flex justify-items-start flex-wrap'>
        {user.techStack.map((tech, index) => (
          <div key={index} className='bg-green-500 rounded-md p-1 mr-2 mb-2'>
            {tech}
          </div>
        ))}
       </div>

        <div className='buttons w-[100%] flex gap-2'>
          
          {/* {
            loggedinUserId===user._id && 
            <button 
            onClick={handleDelete}
            className='rounded-lg p-2 bg-red-500 text-white'>Delete</button>
          } */}

          <button className='bg-blue-500 w-[100%] rounded-lg p-2 text-white'>DM Student</button>
          <Link to={"/profile/"+ user._id}>
          <button className='bg-gray-800 w-[100%] rounded-lg p-2 text-white'>View Profile</button>
          </Link> 
        </div>

      </div>
    </div>
  );
}
