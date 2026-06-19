import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Header = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  return (
    <nav className="h-16 bg-white border-b-4 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">
        Track your resume performance, job opportunities and career growth.
      </h1>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-medium">
            {user?.name}
          </p>

       
        </div>
      </div>
    </nav>
  );
};

export default Header;