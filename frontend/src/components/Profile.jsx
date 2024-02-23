import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ show }) => {
  const [data, setData] = useState();
  const JWT = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await axios
        .get("http://localhost:8080/api/user", {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    show(false);
  };

  return (
    <div className="bg-orange-300 rounded-lg p-3 flex flex-col gap-3 w-[200px] h-[250px]">
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-3 border-s-2 rounded-full border-white"
          viewBox="0 0 24 24"
        ></svg>
      ) : (
        <>
          <h2>
            <span className="font-semibold">Username :</span>{" "}
            <p className="font-bold font-sans">{data?.username}</p>{" "}
          </h2>
          <h2>
            <span className="font-semibold">Full Name :</span>{" "}
            <p className="font-bold font-sans">{data?.fullName}</p>{" "}
          </h2>
          <h2>
            <span className="font-semibold">Email :</span>{" "}
            <p className="font-bold font-sans">{data?.email}</p>{" "}
          </h2>

          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:text-white duration-300 p-2  text-white rounded-md w-[80%]"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
