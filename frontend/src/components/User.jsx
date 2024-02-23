import axios from "axios";
import React, { useEffect, useState } from "react";

const User = () => {
  const JWT = localStorage.getItem("token");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchData();
  }, [JWT]);

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost:8080/api/user", {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        })
        .then((res) => setUserData(res.data));
    } catch (error) {
      if (error.response) {
        console.log("Server responded with an error:", error.response.data);
      } else {
        console.log("Error while making the request:", error.message);
      }
    }
  };
  console.log(userData)
  return (
    <div>
      <h1>{userData.username}</h1>
      <h1>{userData.email}</h1>
    </div>
  );
};

export default User;
