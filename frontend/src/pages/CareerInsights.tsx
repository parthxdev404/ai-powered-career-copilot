import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const CareerInsights = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <DashboardLayout onLogOut={handleLogout}>
        <section className="bg-white p-6 border-b-4">
          <h1 className="text-3xl font-bold">Career Insights</h1>
          <p className="text-gray-500 mt-2">
            Get your career insights and get more opportunities
          </p>
        </section>
      </DashboardLayout>
    </>
  );
};

export default CareerInsights;
