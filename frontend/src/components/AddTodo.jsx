import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AddTodo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const JWT = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/user/createTodo", formData, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="w-[40%]">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center mb-2 text-lg text-white">
              Add the Todo Items!!
            </h1>
            <div>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  className="w-full border-2 focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
                  value={formData.username}
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
                  value={formData.fullname}
                  onChange={handleChange}
                />
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
    </div>
  );
};

export default AddTodo;
