import { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import UserCard from './UserCard';
import { base_url } from '../assets/urls';

export default function UsersList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserList = async () => {
    try {
      let response = await fetch(base_url + 'profile/all');
      if (!response.ok) {
        console.log('Error fetching user list ', response);
      } else {
        let data = await response.json();
        console.log(data);
        setUserList(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user list:', error);
      setLoading(true);
    }
  };

  useEffect(() => {
    console.log('In useEffect');
    fetchUserList();
  }, []);

  return (
    <div>
      <div className='m-4 p-2 font-bold text-white text-xl rounded-lg bg-blue-700'>Users List</div>
      {loading ? (
        // Shimmer UI while loading
        <>
          <Shimmer count={10} ></Shimmer>
        </>
      ) : (
        // Actual user cards when data is available
        userList.map((user, index) => <UserCard key={index} user={user} />)
      )}
    </div>
  );
}
