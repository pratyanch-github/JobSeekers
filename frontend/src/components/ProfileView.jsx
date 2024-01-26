
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_url } from "../assets/urls";
import userContext from "../utils/userContext";

function ProfileView() {

  const { id } = useParams();

  let { userPresent, setUserPresent, userData, setUserData, loggedinUserId } = useContext(userContext);
  let [newData, setNewData] = useState({});
  let [deleting, showDeleting] = useState(false);
  let [renderNewData, setRenderNewData] = useState(1);
 
  let {token} = useContext(userContext);

  let navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${base_url}profile/${id}`);
      if (response.ok) {
        const data = await response.json();
        // setUserPresent(true);
        setUserData(data);
        setNewData(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id, renderNewData]);

  const handleInputChange = (field, value) => {
    setNewData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Send updated data to the backend
      const response = await fetch(`${base_url}profile/${id}`, {
        method: "PUT",
        headers: {
          "authorization": `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        // Update the user context with the new data
        setUserData(newData);
        // Trigger a re-render to fetch the updated data
        setRenderNewData((prev) => prev + 1);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async() =>{
    try {
      // Send updated data to the backend
      const response = await fetch(`${base_url}profile/${id}`, {
        method: "DELETE",
        headers: {
          "authorization": `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
         // NAVIGATE TO HOME
         showDeleting(true);
         setUserPresent(false);
         setUserData({});
         navigate("../"); 
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <>
      { !deleting && <div className="container mx-auto mt-10 p-8 bg-gray-800 text-white">
        { Object.entries(userData).length ? (
          <div>

            <div className="mb-4">
              <h2 className="text-3xl font-bold mb-2">Data: {userData.name}</h2>
              { userData._id===loggedinUserId && <input
                type="text"
                value={newData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">Bio: {userData.bio}</p>
              { userData._id===loggedinUserId && <input
                type="text"
                value={newData.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">Location: {userData.location}</p>
              { userData._id===loggedinUserId && <input
                type="text"
                value={newData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">Github: {userData.github_url}</p>
              { userData._id===loggedinUserId && <input
                type="text"
                value={newData.github_url || ""}
                onChange={(e) => handleInputChange("github_url", e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">Gravatar: {userData.gravatar}</p>
              { userData._id===loggedinUserId && <input
                type="text"
                value={newData.gravatar || ""}
                onChange={(e) => handleInputChange("gravatar", e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">Twitter: {userData.twitter_url}</p>
              { userData._id===loggedinUserId && <input
                type="text"
                value={newData.twitter_url || ""}
                onChange={(e) => handleInputChange("twitter_url", e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">Website: {userData.website_url}</p>
              { userData._id===loggedinUserId && <input
                type="text"
                value={newData.website_url || ""}
                onChange={(e) => handleInputChange("website_url", e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">
                Field of Interest: {userData.fieldOfInterest.join(", ")}
              </p>
            { userData._id===loggedinUserId && <input
                type="text"
                value={
                  newData.fieldOfInterest
                    ? newData.fieldOfInterest.join(", ")
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("fieldOfInterest", e.target.value.split(", "))
                }
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>
            
            <div className="mb-4">
              <p className="mb-2">Seeking: {userData.seeking.join(", ")}</p>
            { userData._id===loggedinUserId && <input
                type="text"
                value={newData.seeking ? newData.seeking.join(", ") : ""}
                onChange={(e) =>
                  handleInputChange("seeking", e.target.value.split(", "))
                }
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            <div className="mb-4">
              <p className="mb-2">TechStack: {userData.techStack.join(", ")}</p>
            { userData._id===loggedinUserId && <input
                type="text"
                value={newData.techStack ? newData.techStack.join(", ") : ""}
                onChange={(e) =>
                  handleInputChange("techStack", e.target.value.split(", "))
                }
                className="bg-gray-700 text-white px-3 py-1 rounded"
              />}
            </div>

            {/* Save Button */}
            { userData._id===loggedinUserId && <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={handleSave}
            >
              Save
            </button>}

            { userData._id===loggedinUserId && <button
              className="bg-red-500 m-3 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
              onClick={handleDelete}
            >
              Delete Profile
            </button>}
          </div>
        ) : (

          <div className="shimmer-container flex flex-wrap gap-3">
              <div className="shimmer-box bg-gray-500 w-full md:w-[70%] h-50 rounded-xl">
                <p className="m-3 text-2xl">Name</p>
              </div>
              <div className="shimmer-box bg-gray-500 w-full md:w-[70%] h-20 rounded-xl">
                <p className="m-3 text-2xl">Data...</p>
              </div>
              <div className="shimmer-box bg-gray-500 w-full md:w-[70%] h-20 rounded-xl">
                <p className="m-3 text-2xl">.....</p>
              </div>
          </div>
        )}
      </div>}
    </>
  );
}

export default ProfileView;