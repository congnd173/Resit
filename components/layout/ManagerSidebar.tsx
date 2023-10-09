import { Layout, ListOrdered } from "lucide-react";
import { ManagerSidebarItem } from "./ManagerSidebarItem";
import SidebarLogo from "./SidebarLogo";

export const ManagerSidebar = () => {
  const routes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/manager/dashboard",
    },
    {
      icon: ListOrdered,
      label: "Category",
      href: "/manager/category",
    },
  ];
  return (
    <div className="h-full border-r-2 border-white flex flex-col overflow-y-auto bg-gray-900 shadow-sm w-56">
      <div className="p-6">
        <SidebarLogo />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full">
          {routes.map((route) => (
            <ManagerSidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
