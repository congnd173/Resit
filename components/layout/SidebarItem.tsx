import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  auth,
}: SidebarItemProps) => {
  const loginModal = useLoginModal();
  const { data: current } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !current?.currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, router, href, current?.currentUser, auth, loginModal]);

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div
        className="relative rounded-full h-14 w-14 flex items-center justify-center 
        p-4 hover:bg-slate-300/10 cursor-pointer lg:hidden"
      >
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full  hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
