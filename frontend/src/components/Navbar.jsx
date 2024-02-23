import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <div className="lg:pl-20 lg:pr-20 md:pl-5 md:pr-5 sm:pr-5 sm:pl-5 absolute top-0 w-full dark:bg-slate-800">
      <div className="flex items-center justify-between pb-1">
        <div className="logo">
          <h1
            className="text-white text-xl font-serif cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Todo.
          </h1>
        </div>
        <div className="text flex gap-2 relative">
          <button
            className="mt-3 text-center bg-slate-600 hover:bg-green-500 duration-300 rounded-md p-2 text-white"
            onClick={() => navigate("/addTodo")}
          >
            Add Todo
          </button>

          <button
            className="mt-3 text-center bg-slate-600 hover:bg-blue-400 duration-300 rounded-md p-2 text-white"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide Profile" : "Show Profile"}
          </button>
          <div
            className={`absolute top-14 ${
              show ? "right-[0]" : "right-[-300px]"
            } duration-300`}
          >
            <Profile show={setShow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
