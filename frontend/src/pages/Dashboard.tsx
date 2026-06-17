import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          Welcome {user?.name}
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <p className="mt-4">
        Email: {user?.email}
      </p>
    </div>
  );
};

export default Dashboard;