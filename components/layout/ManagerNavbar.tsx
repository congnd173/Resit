import { signOut } from "next-auth/react";
import Button from "../Button";
import useCurrentUser from "@/hooks/useCurrentUser";

export const ManagerNavbar = () => {
  const { data: current } = useCurrentUser();
  return (
    <div className="p-4 border-b-2 border-white h-full bg-gray-900 flex justify-end items-center gap-2 text-white">
      <div>
        Welcome Manager{" "}
        <span className="text-blue-500">{current?.currentUser.name}</span>
      </div>
      <Button label="Logout" onClick={() => signOut()} />
    </div>
  );
};
