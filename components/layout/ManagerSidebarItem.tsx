import { LucideIcon } from "lucide-react";
import { useRouter } from "next/router";

interface ManagerSidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const ManagerSidebarItem = ({
  icon: Icon,
  label,
  href,
}: ManagerSidebarItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-x-2 text-slate-800 text-sm pl-6 transition-all hover:bg-gray-700 text-white"
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
    </button>
  );
};
