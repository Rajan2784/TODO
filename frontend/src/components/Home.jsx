import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const JWT = localStorage.getItem("token");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/all/todo",
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      if (error.response) {
        setData([]);
        console.log("Server responded with an error:", error.response.data);
      } else {
        console.log("Error while making the request:", error.message);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8080/api/user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        })
      .then((res) => alert(res.data));
      if (data.length === 0) {
        setData([]);
        console.log(data.length);
      }
      fetchData();
    } catch (error) {
      fetchData();
      console.log(error);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="w-full h-[100vh] lg:pl-20 lg:pr-20 md:pl-5 md:pr-5 sm:pr-5 sm:pl-5">
        <main className="mt-14 pt-3 w-full h-full">
          <div className="w-full">
            {data?.length === 0 ? (
              <p className="text-white font-bold items-center animate-bounce text-center transformProperty">
                No todo Items found please create some items to show !!!
              </p>
            ) : (
              <table className="w-full text-center border text-white">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th className="hide">Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td
                        className={`${
                          item.isCompleted === "true" ? "text-green-400" : ""
                        }`}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`${
                          item.isCompleted === "true" ? "text-green-400" : ""
                        }`}
                      >
                        {item.title}
                      </td>
                      <td
                        className={`${
                          item.isCompleted === "true" ? "text-green-400" : ""
                        }`}
                      >
                        {item.description}
                      </td>
                      <td
                        className={`${
                          item.isCompleted === "true" ? "text-green-400" : ""
                        } hide`}
                      >
                        {formatTimestamp(item.timeStamp)}
                      </td>
                      <td className="small">
                        <div className="flex items-center flexCol justify-center gap-1 p-2">
                          <button
                            className="bg-green-500 hover:text-white duration-300 p-2  text-white rounded-md w-[80%]"
                            onClick={() => navigate(`/todo/${item.id}`)}
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:text-white duration-300 p-2  text-white rounded-md w-[80%]"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
