import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/home")
    }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = fetchDataFromApi("POST", "/auth/register", formData);
      console.log((await response).data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="border-2 p-4 border-cyan-400 rounded-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-2 text-lg text-white">Register here:</h1>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full border-2 focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="fullName"
              className="w-full border-2 focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full border-2 focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border-2 focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="hover:bg-green-500 hover:text-white duration-300 p-2 mt-3 mb-3 bg-gray-700 text-white rounded-md w-full"
          >
            Register
          </button>
        </form>

        <div>
          <p className="text-white">Already have account? <Link className="font-bold underline hover:no-underline duration-1000" to={"/login"}>Login</Link> </p>
        </div>

      </div>
    </div>
  );
}

export default RegistrationForm;
