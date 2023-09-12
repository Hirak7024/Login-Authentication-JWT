import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import Dashboard from "./Components/Dashboard";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path={"/home"} element={<Home/>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/register"} element={<Register/>} />
      <Route path={"/forgot-password"} element={<ForgotPassword/>} />
      <Route path={"/reset-password/:id/:token"} element={<ResetPassword/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
