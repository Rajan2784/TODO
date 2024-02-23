import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Home from "./components/Home";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";
import User from "./components/User";

function App() {
  return (
    <div className="dark:bg-slate-800">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addTodo" element={<AddTodo />} />
          <Route path="/todo/:todoId" element={<UpdateTodo />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
