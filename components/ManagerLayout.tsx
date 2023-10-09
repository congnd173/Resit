import { ManagerNavbar } from "./layout/ManagerNavbar";
import { ManagerSidebar } from "./layout/ManagerSidebar";

interface ManagerLayoutProps {
  children: React.ReactNode;
}

const ManagerLayout = ({ children }: ManagerLayoutProps) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <ManagerNavbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <ManagerSidebar />
      </div>
      <main className="md:pl-56 mt-[80px] h-ful">{children}</main>
    </div>
  );
};

export default ManagerLayout;
