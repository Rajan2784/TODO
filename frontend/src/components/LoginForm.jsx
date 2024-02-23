import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchDataFromApi(
        "POST",
        "/auth/signin",
        loginData
      );
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="pr-20 pl-20 flex items-center justify-center h-[100vh]">
      <div className="border border-blue-500 rounded-lg p-6 w-[300px]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-2 text-lg text-white">Login here:</h1>
          <div>
            <input
              type="email"
              name="email"
              className="w-full border focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
              placeholder="Email id"
              value={loginData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="w-full border focus:border-cyan-400 p-2 focus:outline-none mb-3 rounded-md"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="mt-3 text-center w-full bg-slate-600 hover:bg-green-500 duration-300 rounded-md p-2 text-white"
            type="submit"
          >
            Login
          </button>

          {errorMessage && (
            <div className="mt-3 text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
        <div className="mt-3">
          <p className="text-white">
            Don't have an account?{" "}
            <Link
              className="font-bold underline hover:no-underline duration-1000"
              to={"/"}
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
