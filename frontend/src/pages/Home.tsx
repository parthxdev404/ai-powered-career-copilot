import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import Landing from "./Landing";
import Dashboard from "./Dashboard";

const Home = () => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!loading) {
    <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return isAuthenticated ? <Dashboard /> : <Landing />;
};

export default Home;
