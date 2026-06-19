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

    navigate("/");
  };

  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold ">
          Welcome {user?.name}
        </h1>

        <button
          onClick={handleLogout}
          className=" bg-[#7D58C2]
          font-bold
          text-white
          border-4
          border-black
          cursor-pointer
          transition-all
          shadow-[6px_6px_0px_0px_#000]
          hover:translate-x-1
          hover:translate-y-1
          hover:shadow-[3px_3px_0px_0px_#000]

          text-sm
          sm:text-base
          md:text-xl
          lg:text-2xl

          px-3
          sm:px-4
          md:px-5
          lg:px-6

          py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;