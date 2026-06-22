import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Resume from "../pages/Resume";
import Analysis from "../pages/Analysis";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<SignUp />} />

        <Route path="/resume" element={<Resume />} />
        <Route path="/analysis" element={<Analysis/>}/>
        <Route
  path="/analysis/:resumeId"
  element={<Analysis />}
/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;