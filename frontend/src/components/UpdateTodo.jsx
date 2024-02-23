import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const UpdateTodo = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const JWT = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/todo/${todoId}`,
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
          }
        );
        setFormData({
          title: response.data.title,
          description: response.data.description,
          isCompleted:response.data.isCompleted
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [todoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const JWT = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/user/update/${todoId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      alert("Todo Updated Successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  if (!formData && loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Navbar />
      <div className="w-[40%]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-2 text-lg text-white">
            Update the Todo Items!!
          </h1>
          <div>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Title"
                required
                className="w-full border-2 focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <textarea
                type="text"
                name="description"
                className="w-full border-2 focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 mb-2">
              <label className="text-white">
                Completed:
                <input
                  type="radio"
                  name="isCompleted"
                  value="true"
                  checked={formData.isCompleted === "true"}
                  onChange={handleChange}
                  className="ml-2"
                />
                True
              </label>

              <label className="text-white">
                <input
                  type="radio"
                  name="isCompleted"
                  value="false"
                  checked={formData.isCompleted === "false"}
                  onChange={handleChange}
                />
                False
              </label>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                type="submit"
                className="hover:bg-green-500 hover:text-white duration-300 p-2 bg-gray-700 text-white rounded-md w-[80%]"
              >
                Submit
              </button>

              <button
                onClick={() => navigate("/home")}
                className="hover:bg-red-500 hover:text-white duration-300 p-2 bg-gray-700 text-white rounded-md w-[80%]"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodo;
