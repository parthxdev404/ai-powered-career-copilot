import  { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Briefcase,
  Target,
  Mic,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
interface SidebarProps {
  onLogOut: () => void;
}
const Sidebar = ({ onLogOut }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Resume",
    icon: FileText,
    path: "/resume",
  },
  {
    name: "ATS Analysis",
    icon: BarChart3,
    path: "/analysis",
  },
  {
    name: "Job Matches",
    icon: Briefcase,
    path: "/jobs",
  },
  {
    name: "Career Insights",
    icon: Target,
    path: "/career",
  },
  {
    name: "Interview Prep",
    icon: Mic,
    path: "/interview",
  },
];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg border bg-white"
      >
        <Menu size={22} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static
        top-0 left-0
        min-h-screen
        w-64
        bg-white
        border-r-4
        z-50
        transition-transform duration-300
        flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    key={item.name}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `
    w-full
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-lg
    transition
    ${
      isActive
        ? "bg-violet-100 text-violet-600"
        : "text-gray-700 hover:bg-gray-100"
    }
    `
                    }
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t-4 border-black p-4 space-y-2">
          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              hover:bg-gray-100
              transition
              cursor-pointer
            "
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button
            onClick={onLogOut}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              text-red-500
              hover:bg-red-50
              transition
              cursor-pointer
            "
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
