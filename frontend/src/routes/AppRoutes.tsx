import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<SignUp />} />


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;