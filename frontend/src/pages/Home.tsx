import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

const Home = () => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return isAuthenticated ? <Dashboard /> : <Landing />;
};

export default Home;