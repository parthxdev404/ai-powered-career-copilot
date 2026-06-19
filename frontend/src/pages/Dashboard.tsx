import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";

import Sidebar from "../layouts/Sidebad"
import Header from "../layouts/Header";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
  <Sidebar onLogOut={handleLogout} />

  <div className="flex-1 flex flex-col">
    <Header/>
    <main className="p-6 flex flex-col">
    
    </main>
  </div>
</div>
  );
};

export default Dashboard;