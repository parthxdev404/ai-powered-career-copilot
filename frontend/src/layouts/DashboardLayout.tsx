import Sidebar from "./Sidebad";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogOut: () => void;
}

const DashboardLayout = ({
  children,
  onLogOut,
}: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar onLogOut={onLogOut} />

      <div className="flex-1 flex flex-col bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;